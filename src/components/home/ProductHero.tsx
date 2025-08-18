// src/components/product/ProductHero.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { registerDeferredAutoRotate } from '../../utils/deferredAutoRotate';
import { AUTO_SLIDE_INTERVAL_MS, LAYER_CLEANUP_DELAY_MS, REFRESH_SAMPLING_FRAMES, REFRESH_THRESHOLDS } from './heroTokens.ts';
// Предзагрузка через кастомные менеджеры временно отключена — используем прямую загрузку
import "./ProductHero.css";

// Разрешаем web-component <model-viewer> для TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

// (Удалено) Ошибочная вставка интервала вне компонента
import { heroData, HeroItem } from './heroData.ts';
import { createLayerIdGenerator } from './layerIdGenerator';

type Refresh =
  | "60hz"
  | "90hz"
  | "120hz"
  | "144hz"
  | "240hz";

// Предвычисляем градиенты один раз для максимальной производительности
const PRECOMPUTED_GRADIENTS = heroData.map((item: HeroItem) => {
  const matches = [...item.gradient.matchAll(/#([0-9a-fA-F]{3,8})/g)].map((x) => `#${x[1]}`);
  return [matches[0] ?? "#0B3C49", matches[1] ?? "#1A237E", matches[2] ?? "#2E2E2E"];
});

const PRECOMPUTED_GLOW_COLORS = heroData.map((item: HeroItem) => 
  item.glowColor.replace("[", "").replace("]", "")
);

// Throttle функция для оптимизации mouse events
function throttle<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  return ((...args: any[]) => {
    const now = Date.now();
    if (now - previous > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        func(...args);
        timeout = null;
      }, wait - (now - previous));
    }
  }) as T;
}

const ProductHero = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const layerIdGenRef = useRef(createLayerIdGenerator());
  const [layers, setLayers] = useState<Array<{ idx:number; phase:'enter'|'active'|'leave'; lid:number }>>([
    { idx: 0, phase: 'active', lid: layerIdGenRef.current() }
  ]);
  // const [nextIndex, setNextIndex] = useState(0);
  // Морфинг убран - остается только обычная смена контента
  const isInitialized = true; // упрощено
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [refreshRate, setRefreshRate] = useState<Refresh>("60hz");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedRef = useRef(false); // состояние паузы из-за visibility
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});
  const [highResLoaded, setHighResLoaded] = useState<Record<string, boolean>>({});
  const [autoRotateStarted, setAutoRotateStarted] = useState(false);
  // Управление ручной сменой слайда
  const changeSlide = useCallback((nextIdx: number) => {
    if (nextIdx === currentIndex) return;
    if (nextIdx < 0) nextIdx = heroData.length - 1;
    if (nextIdx >= heroData.length) nextIdx = 0;
    setCurrentIndex(nextIdx);
    setLayers(ls => {
      const updated = ls.map(l => l.idx === currentIndex ? { ...l, phase: 'leave' as const } : l);
  return [...updated, { idx: nextIdx, phase: 'enter' as const, lid: layerIdGenRef.current() }];
    });
  }, [currentIndex]);
  // Агрегированный лог цикла (п.7)
  const cycleEventsRef = useRef<Array<{url:string; ok:boolean; t:number}>>([]);
  const lastFlushedIndexRef = useRef<number>(0);
  const flushCycleLog = useCallback((reason: string) => {
    if (cycleEventsRef.current.length === 0) return;
    const success = cycleEventsRef.current.filter(e => e.ok).length;
    const fail = cycleEventsRef.current.length - success;
    const details = cycleEventsRef.current.map(e => `${e.url.split('/').pop()}:${e.ok?'ok':'err'}`).join(',');
    // Одна строка на цикл
    // eslint-disable-next-line no-console
    console.info(`🧩 HeroCycle[${lastFlushedIndexRef.current}] ${reason} models=${cycleEventsRef.current.length} ok=${success} fail=${fail} [${details}]`);
    cycleEventsRef.current = [];
  }, []);

  const currentData = heroData[currentIndex];
  
  // Мемоизированные вычисления для максимальной производительности
  const gradientStops = useMemo(() => PRECOMPUTED_GRADIENTS[currentIndex], [currentIndex]);
  const glowColor = useMemo(() => PRECOMPUTED_GLOW_COLORS[currentIndex], [currentIndex]);

  // Оптимизированная проверка mobile с debounce
  useEffect(() => {
    const checkMobile = throttle(() => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    }, 100);
    
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Оптимизированное определение refresh rate (меньше кадров)
  useEffect(() => {
    let id = 0;
    let frames = 0;
    let t0 = 0;

    const tick = (t: number) => {
      if (!t0) t0 = t;
      frames++;
      if (frames >= REFRESH_SAMPLING_FRAMES) {
        const fps = Math.round((frames * 1000) / (t - t0));
        let rate: Refresh = "60hz";
        if (fps >= REFRESH_THRESHOLDS['240hz']) rate = '240hz';
        else if (fps >= REFRESH_THRESHOLDS['144hz']) rate = '144hz';
        else if (fps >= REFRESH_THRESHOLDS['120hz']) rate = '120hz';
        else if (fps >= REFRESH_THRESHOLDS['90hz']) rate = '90hz';
        
        if (rate !== refreshRate) {
          setRefreshRate(rate);
          // Оптимизируем работу с classList
          document.body.className = document.body.className.replace(/refresh-\d+hz/g, '') + ` refresh-${rate}`;
        }
        return;
      }
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [refreshRate]);

  // Упрощённо: не делаем асинхронной инициализации / кэширующих проверок
  
  // Убрана кастомная предзагрузка — браузер сам загрузит src при появлении слоя

  // mobile init для <model-viewer>
  useEffect(() => {
    if (!isMobile || !modelRef.current) return;
    const mv = modelRef.current as any;
    const init = () => {
      mv.cameraOrbit = "0deg 80deg 1.1m";
      mv.fieldOfView = "40deg";
      mv.minCameraOrbit = "auto auto 1.1m";
      mv.maxCameraOrbit = "auto auto 1.1m";
      mv.jumpCameraToGoal?.();
    };
    init();
    const t = window.setTimeout(init, 50);
    return () => window.clearTimeout(t);
  }, [isMobile, currentIndex]);

  // ОПТИМИЗИРОВАННЫЙ mouse parallax с throttling
  const throttledMouseMove = useCallback(
    throttle((x: number, y: number) => {
      setMousePosition({ x, y });
    }, 16), // ~60fps
    []
  );
  
  useEffect(() => {
    if (isMobile) return;
    
    const onMove = (e: MouseEvent) => {
      throttledMouseMove(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
    };
    
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, throttledMouseMove]);

  // ПЛАВНАЯ автосмена серий с фазированной анимацией
  useEffect(() => {
    if (!isInitialized) return;

    const autoSlide = () => {
      const nextIdx = (currentIndex + 1) % heroData.length;
      flushCycleLog('slide-change');
      lastFlushedIndexRef.current = nextIdx;
      changeSlide(nextIdx);
    };

    intervalRef.current = setInterval(autoSlide, AUTO_SLIDE_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        pausedRef.current = true;
        if (modelRef.current) {
          try { (modelRef.current as any).autoRotate = false; } catch {/* noop */}
        }
      } else if (pausedRef.current && !intervalRef.current) {
        intervalRef.current = setInterval(autoSlide, AUTO_SLIDE_INTERVAL_MS);
        pausedRef.current = false;
        if (modelRef.current) {
          try { (modelRef.current as any).autoRotate = true; } catch {/* noop */}
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); changeSlide(currentIndex + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(currentIndex - 1); }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      flushCycleLog('unmount');
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('keydown', handleKey);
    };
  }, [currentIndex, changeSlide, flushCycleLog]);

  // МЕМОИЗИРОВАННЫЕ CSS переменные для оптимальной производительности
  const cssVars: React.CSSProperties = useMemo(() => ({
    ["--current-glow-color" as any]: glowColor,
    ["--current-accent-color" as any]: currentData.accentColor,
    ["--grad-1" as any]: gradientStops[0],
    ["--grad-2" as any]: gradientStops[1],
    ["--grad-3" as any]: gradientStops[2],
    ["--mouse-x" as any]: mousePosition.x.toString(),
    ["--mouse-y" as any]: mousePosition.y.toString(),
    // Morphing переменная убрана
  }), [glowColor, currentData.accentColor, gradientStops, mousePosition]);

  // Переводим новые enter слои в active на следующий кадр (чтобы сработал transition)
  useEffect(() => {
    if (!layers.some(l => l.phase === 'enter')) return;
    const raf = requestAnimationFrame(() => {
  setLayers(ls => ls.map(l => l.phase === 'enter' ? { ...l, phase: 'active' as const } : l));
    });
    return () => cancelAnimationFrame(raf);
  }, [layers]);

  // Очищаем leave слои после окончания анимации
  useEffect(() => {
    if (!layers.some(l => l.phase === 'leave')) return;
    const t = setTimeout(() => {
      setLayers(ls => ls.filter(l => l.phase !== 'leave'));
    }, LAYER_CLEANUP_DELAY_MS); // длительность transition + небольшой запас (токенизировано)
    return () => clearTimeout(t);
  }, [layers]);

  // Отложенный запуск авто-ротации
  useEffect(() => {
    const cleanup = registerDeferredAutoRotate(() => {
      setAutoRotateStarted(true);
      document.querySelectorAll('model-viewer').forEach(el => {
        try { (el as any).autoRotate = true; } catch {/* noop */}
      });
    }, 4500);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!autoRotateStarted || !modelRef.current) return;
    try { (modelRef.current as any).autoRotate = true; } catch {/* noop */}
  }, [autoRotateStarted, currentIndex]);

  return (
    <div
      className={`ph-container refresh-${refreshRate}`}
      data-loaded={isInitialized}
      style={cssVars}
    >
      {/* Фоновые слои */}
      <div className="ph-bg" />
      <div className="ph-parallax">
        <div className="ph-glow-main" />
        <div className="ph-glow-secondary" />
        <div className="ph-geo-1" />
        <div className="ph-geo-2" />
      </div>

      {/* Контентная сетка */}
      <div className="ph-main">
        <div className="ph-wrapper">
          <div className="ph-grid">
            {/* Левая колонка */}
            <div className="ph-content-stack">
              {layers.map(layer => {
                const data = heroData[layer.idx];
                return (
                  <div key={`${data.id}-${layer.lid}`} className={`ph-content-layer ${layer.phase}`}>
                    <div className="ph-content">
                      <div className="ph-header">
                        <h1 className="ph-title">{data.title}</h1>
                      </div>
                      <div className="ph-features">
                        {data.features.map((feature: string, index: number) => (
                          <div key={index} className="ph-feature" style={{ ["--feature-index" as any]: index }}>
                            <div className="ph-feature-dot" />
                            <span className="ph-feature-text">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="ph-progress">
                        <div className="ph-progress-dots">
                          {heroData.map((_, idx: number) => (
                            <div
                              key={idx}
                              role="button"
                              tabIndex={0}
                              aria-label={`Показать серию ${idx + 1}`}
                              aria-pressed={idx === currentIndex}
                              className={`ph-progress-dot ${idx === currentIndex ? 'active' : ''}`}
                              onClick={() => changeSlide(idx)}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); changeSlide(idx); } }}
                            />
                          ))}
                        </div>
                        <span className="ph-progress-counter">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Правая колонка — 3D модель (структура как в Hero3530, но с OptimizedModelViewer) */}
            <div className="ph-hero-model-section ph-model-center relative order-first lg:order-last mt-0 lg:mt-0">
              {/* уменьшено ~на 5%: 240->228, 275->261, 326->310, 360->342 */}
              <div className="ph-hero-model-container ph-model-stack relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] h-[240px] sm:h-[270px] md:h-[330px] lg:h-[360px] xl:h-[400px]" style={{ transform: isMobile ? 'none' : 'translateY(-12px)' }}>
        {layers.map(layer => {
                  const data = heroData[layer.idx];
                  const failed = modelLoadStatus[data.modelUrl] === false;
                  const showHigh = highResLoaded[data.modelUrl];
                  return (
          <div key={`${data.id}-${layer.lid}`} className={`ph-model-layer ${layer.phase} relative w-full h-full`}>
                      {!failed && (
                        <div className="ph-hero-model relative z-10 w-full h-full">
                          <model-viewer
                            ref={layer.idx === currentIndex ? modelRef : undefined}
                            src={showHigh ? data.modelUrl : (data.previewModelUrl || data.modelUrl)}
                            alt={data.title}
                            auto-rotate
                            auto-rotate-delay="0"
                            rotation-per-second={isMobile ? '32deg' : '32deg'}
                            camera-controls={!isMobile}
                            camera-orbit={isMobile ? '0deg 80deg 1.0m' : '0deg 82deg 1.0m'}
                            min-camera-orbit={isMobile ? 'auto auto 1.1m' : 'auto auto 0.5m'}
                            max-camera-orbit={isMobile ? 'auto auto 1.1m' : 'auto auto 1.2m'}
                            field-of-view={isMobile ? '40deg' : '40deg'}
                            interaction-prompt='none'
                            environment-image='neutral'
                            shadow-intensity={isMobile ? '0.2' : '0.25'}
                            exposure={isMobile ? '1.1' : '1.1'}
                            disable-zoom={isMobile ? true : undefined}
                            disable-pan={isMobile ? true : undefined}
                            disable-tap={isMobile ? true : undefined}
                            style={{
                              width:'100%',height:'100%',background:'transparent',border:'none',outline:'none',boxShadow:'none',borderRadius:isMobile ? '1rem':'0rem',pointerEvents:'none',touchAction:isMobile ? 'none':undefined,'--progress-bar-color':'transparent','--progress-mask':'transparent'
                            } as React.CSSProperties}
                            onLoad={(e: any) => {
                              const src = (e?.target?.src || data.modelUrl) as string;
                              if (src.endsWith(data.modelUrl) || src.includes(data.modelUrl)) {
                                setModelLoadStatus(p => ({...p,[data.modelUrl]:true}));
                                setHighResLoaded(p => ({...p,[data.modelUrl]:true}));
                                cycleEventsRef.current.push({url: data.modelUrl, ok:true, t: performance.now()});
                              } else if (data.previewModelUrl && (src.endsWith(data.previewModelUrl) || src.includes(data.previewModelUrl))) {
                                // После загрузки превью — параллельно грузим high-res, если ещё нет
                                if (!highResLoaded[data.modelUrl]) {
                                  const link = document.createElement('link');
                                  link.rel = 'preload';
                                  link.as = 'fetch';
                                  link.href = data.modelUrl;
                                  link.crossOrigin = 'anonymous';
                                  document.head.appendChild(link);
                                  fetch(data.modelUrl).catch(()=>{});
                                }
                              }
                            }}
                            onError={(e: any) => {
                              console.warn('❌ model-viewer error', data.modelUrl, e?.detail);
                              setModelLoadStatus(p => ({...p,[data.modelUrl]:false}));
                              cycleEventsRef.current.push({url: data.modelUrl, ok:false, t: performance.now()});
                            }}
                          />
                        </div>
                      )}
                      {failed && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="flex flex-col items-center gap-3">
                            <div className="text-3xl">⚠️</div>
                            <span className="text-white/60 text-sm font-medium">Модель недоступна</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Морфинг убран */}
    </div>
  );
});

export default ProductHero;