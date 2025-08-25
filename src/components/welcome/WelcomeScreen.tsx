import React, { useEffect, useMemo, useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";

type WelcomeScreenProps = {
  onComplete: () => void;
  minDurationMs?: number; // минимальная длительность показа/длительность сцены
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, minDurationMs = 5000 }) => {
  const [visible, setVisible] = useState(true);
  const fullText = "Инновационные сетевые решения для устойчивого бизнеса";
  const [typedCount, setTypedCount] = useState(0);

  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Автозакрытие ровно через minDurationMs (по умолчанию 5с)
  useEffect(() => {
    const autoTimer = setTimeout(() => {
      // стартуем fade-out сразу по окончании таймлайна сцены
      setVisible(false);
      setTimeout(onComplete, prefersReduced ? 120 : 420);
    }, minDurationMs);
    return () => {
      clearTimeout(autoTimer);
    };
  }, [minDurationMs, prefersReduced, onComplete]);

  // Без ручного пропуска и лишних обработчиков — минимальная нагрузка

  // Печатающийся текст: рассчитываем скорость так, чтобы печать заняла ~3с
  useEffect(() => {
    if (prefersReduced) {
      setTypedCount(fullText.length);
      return;
    }
    const targetTypingMs = 3000;
    const stepMs = Math.max(25, Math.floor(targetTypingMs / Math.max(1, fullText.length)));
    let cancelled = false;
    let idx = 0;
    const tick = () => {
      if (cancelled) return;
      idx = Math.min(fullText.length, idx + 1);
      setTypedCount(idx);
      if (idx < fullText.length) {
        timer = window.setTimeout(tick, stepMs);
      }
    };
    let timer = window.setTimeout(tick, stepMs);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [fullText, prefersReduced]);

  return (
    <div
      aria-hidden={!visible}
  className={`fixed inset-0 z-[9999] ${visible ? 'pointer-events-auto' : 'pointer-events-none'} transition-opacity duration-300`}
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
  {/* Корпоративный фон: чистый градиент + мягкая виньетка, без тяжёлых эффектов */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B4A] via-[#0A4C8A] to-[#0B9EA0]" />
  <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_center,rgba(0,0,0,0.25),transparent_65%)] pointer-events-none" />

      {/* Контент */}
      <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6">
    {/* Логотип на минималистичной карточке */}
    <div className="relative rounded-2xl px-8 py-6 bg-white shadow-[0_6px_22px_rgba(16,24,40,0.14)] ring-1 ring-black/5">
          <div className="flex items-center justify-center">
            <SafeImage
              src="/img/логотип.png"
              sizes="(max-width: 640px) 60vw, 240px"
              alt="iDATA"
      width={220}
      height={220}
              decoding="async"
              loading="eager"
      className="w-[190px] h-auto md:w-[220px] select-none [image-rendering:-webkit-optimize-contrast]"
            />
          </div>
        </div>

        {/* Теглайн с печатающимся текстом (улучшенная читаемость) */}
        <div className="mt-6 md:mt-7 max-w-3xl">
          <p
            className="text-white/95 text-[clamp(16px,2.2vw,22px)] font-medium tracking-[-0.01em] leading-snug"
            aria-live="polite"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
          >
            {fullText.slice(0, typedCount)}
            <span
              className="inline-block w-[2px] h-[1em] align-[-0.12em] ml-1 bg-cyan-300 animate-[caretBlink_1s_steps(1,end)_infinite]"
              aria-hidden
              style={{ opacity: typedCount >= fullText.length ? 0.55 : 1 }}
            />
          </p>
        </div>

      </div>

      {/* Световой луч при старте: только на средних+ экранах и если не отключены анимации */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
          <div className="absolute top-1/3 left-[-50%] w-[200%] h-[2px] bg-white/50 blur-[1.5px] opacity-0 animate-[lightBeamSweep_1600ms_ease-in-out_120ms]" />
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;

// Ключевые кадры для fade-up
// Прописываем inline через глобальные стили в index.css уже есть lightBeamSweep; добавляем welcomeFadeUp там при сборке.