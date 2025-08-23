import React, { useEffect, useRef, useState } from "react";
import "./PartnersHero.css";

interface PartnersHeroProps {
  title?: string;
  subtitle?: string;
  typingSpeed?: number; // базовый интервал (мс)
  speedVariance?: number; // разброс (мс)
  punctuationExtraDelay?: number; // доп. задержка после .,!? или запятой
  mobileSpeedMultiplier?: number; // множитель ускорения на мобильных (<768)
  loop?: boolean; // повторять печать
  loopDelay?: number; // пауза перед стиранием
  eraseSpeed?: number; // скорость удаления символов
  highlightWordIndexes?: number[]; // индексы слов для подсветки
  instantRevealEnabled?: boolean; // клик / Esc показывает весь текст сразу
}

// Полный визуальный паритет с WarrantyHero (без 3D модели) — только префикс классов другой
const PartnersHero: React.FC<PartnersHeroProps> = ({
  title = "Наши партнёры",
  subtitle = "Мы сотрудничаем с надёжными и проверенными компаниями, которые прошли официальную авторизацию и обладают экспертизой в наших продуктах и решениях.",
  typingSpeed = 32,
  speedVariance = 36,
  punctuationExtraDelay = 380,
  mobileSpeedMultiplier = 0.7,
  loop = false,
  loopDelay = 1800,
  eraseSpeed = 18,
  highlightWordIndexes = [],
  instantRevealEnabled = true,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [instantReveal, setInstantReveal] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const words = title.split(" ");
  const lastWordIndex = words.length - 1;
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const timersRef = useRef<number[]>([]);

  const fullText = subtitle;
  const breakWords = ["прошли", "продуктах"]; // старт 2-й и 3-й строки
  const breakIndices = breakWords
    .map(w => ({ w, i: fullText.indexOf(w) }))
    .filter(o => o.i >= 0)
    .sort((a,b) => a.i - b.i)
    .map(o => o.i);
  const chars = fullText.split("");

  // Предобработка для подсветки слов
  const wordBoundaries: { start: number; end: number; index: number }[] = [];
  (() => {
    let wordIndex = 0;
    const re = /[^\s]+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(fullText))) {
      wordBoundaries.push({ start: m.index, end: m.index + m[0].length - 1, index: wordIndex });
      wordIndex++;
    }
  })();

  const isHighlightedChar = (pos: number) => {
    const wb = wordBoundaries.find(w => pos >= w.start && pos <= w.end);
    return wb ? highlightWordIndexes.includes(wb.index) : false;
  };

  const onWordAnimEnd = (i: number) => {
    if (i === lastWordIndex && !typingStarted) {
      setTypingStarted(true);
    }
  };

  // Очистка таймеров
  useEffect(() => () => { timersRef.current.forEach(id => clearTimeout(id)); timersRef.current = []; }, []);

  // Instant reveal (клик / Esc)
  useEffect(() => {
    if (!instantRevealEnabled) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInstantReveal(true); setVisibleCount(chars.length); setDone(true); setIsDeleting(false);
      }
    };
    const handleClick = () => { setInstantReveal(true); setVisibleCount(chars.length); setDone(true); setIsDeleting(false); };
    subtitleRef.current?.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      subtitleRef.current?.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [instantRevealEnabled, chars.length]);


  // Тайпрайтер / цикл
  useEffect(() => {
    if (!typingStarted || instantReveal) return;
    if (done && !loop) return;

    const base = typingSpeed * (isMobile ? mobileSpeedMultiplier : 1);
    const variance = speedVariance;
    const extra = punctuationExtraDelay;

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timersRef.current.push(id);
    };

    if (!isDeleting) {
      // Печать
      if (visibleCount < chars.length) {
        const nextIndex = visibleCount;
        const prevChar = chars[nextIndex - 1];
        let delay = base + Math.random() * variance;
        if (prevChar && /[\.,!?]/.test(prevChar)) delay += extra;
        schedule(() => {
          setVisibleCount(c => c + 1);
        }, delay);
      } else if (!done) {
        setDone(true);
        if (loop) {
          schedule(() => setIsDeleting(true), loopDelay);
        }
      } else if (done && loop && !isDeleting) {
        schedule(() => setIsDeleting(true), loopDelay);
      }
    } else {
      // Удаление
      if (visibleCount > 0) {
        schedule(() => {
          setVisibleCount(c => c - 1);
        }, eraseSpeed);
      } else {
        setIsDeleting(false);
        setDone(false);
        schedule(() => setVisibleCount(0), 60);
      }
    }
    return () => { /* таймеры чистятся внешним эффектом */ };
  }, [typingStarted, visibleCount, done, isDeleting, loop, instantReveal, chars, typingSpeed, speedVariance, punctuationExtraDelay, mobileSpeedMultiplier, eraseSpeed, loopDelay, isMobile]);

  // Автоподгон шрифта для укладки в 4 строки на мобильных
  useEffect(() => {
    if (!isMobile) return;
    const el = subtitleRef.current;
    if (!el) return;
    const resize = () => {
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight || '20');
      const maxLines = 3;
      const maxHeight = lineHeight * maxLines + 0.5; // небольшой запас
      let fontSize = parseFloat(style.fontSize || '15');
      const floor = 12; // не уменьшаем меньше 12px
      // если сейчас выше 4 строк — уменьшаем, если ниже — не растим
      // применяем только когда текст полностью показан или в процессе, чтобы не мешать анимации
      let guard = 0;
      while (el.scrollHeight > maxHeight && fontSize > floor && guard < 20) {
        fontSize -= 0.5; guard++;
        el.style.fontSize = fontSize + 'px';
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); };
  }, [isMobile, visibleCount, instantReveal]);

  // Если instantReveal активирован при смене subtitle
  useEffect(() => {
    if (instantReveal) {
      setVisibleCount(chars.length);
      setDone(true);
    }
  }, [instantReveal, chars.length]);

  return (
    <section
      id="partners-hero"
      className="partners-hero-section partners-hero-gradient partners-hero-alt partners-hero-pro relative overflow-hidden pt-8 sm:pt-9 lg:pt-10 xl:pt-12 pb-6 sm:pb-7 lg:pb-8 xl:pb-8 flex items-center min-h-[200px] sm:min-h-[210px] lg:min-h-[220px]"
    >
      <div className="partners-hero-particles minimal" aria-hidden="true">
        {[0,1,2].map(i => (<div key={i} className="partners-particle" />))}
      </div>
      <div className="partners-hero-noise-layer" aria-hidden="true" />
      <div className="partners-hero-decoration minimal" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="col-span-1 lg:col-span-6 xl:col-span-7 max-w-3xl">
            <h1
              className="partners-hero-title partners-hero-title-stagger text-white text-3xl sm:text-5xl md:text-[52px] lg:text-[58px] xl:text-[62px] font-bold leading-[1.02] tracking-tight mb-4"
              aria-label={title}
              role="text"
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="ph-word"
                  style={{ ["--wi" as any]: i }}
                  onAnimationEnd={() => onWordAnimEnd(i)}
                >
                  {word}{i < lastWordIndex ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            <div className="partners-hero-separator mb-4" aria-hidden="true" />
            <p
              ref={subtitleRef}
              className="partners-hero-description partners-hero-typewriter text-[15px] sm:text-lg md:text-xl lg:text-[19px] font-light text-white/85 max-w-none"
              aria-label={subtitle}
              lang="ru"
              role="text"
            >
              {chars.map((ch, i) => {
                if (i >= visibleCount && !instantReveal) return null;
                const highlighted = isHighlightedChar(i);
                // Avoid breaking too close to edges on narrow screens
                const needsBreak = breakIndices.includes(i) && (!isMobile || (i > 12 && i < chars.length - 12));
                return (
                  <React.Fragment key={i}>
                    {needsBreak && <br />}
                    <span
                      className={`ph-char${highlighted ? ' ph-char-highlight' : ''}`}
                      style={{ ['--ci' as any]: i }}
                    >
                      {ch}
                    </span>
                  </React.Fragment>
                );
              })}
              <span
                className={`ph-caret${done && !loop ? " done" : ""}${isDeleting ? ' deleting' : ''}`}
                aria-hidden="true"
              >
                |
              </span>
            </p>
          </div>
          {/* Пустая правая колонка для идентичного баланса сетки (замена модели) */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
