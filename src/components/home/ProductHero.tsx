// src/components/product/ProductHero.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import Icon from "@/components/ui/icon";
import OptimizedModelViewer from "@/components/OptimizedModelViewer";
import { modelPreloader } from "@/utils/modelPreloader";
import { modelCacheManager } from "@/utils/modelCacheManager";
import "./ProductHero.css";

// Разрешаем web-component <model-viewer> для TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

// Конфигурация моделей (исходные данные сохранены)
const heroData = [
  {
    id: "IDS3530",
    series: "3530",
    title: "Коммутаторы IDS3530",
    description: "Корпоративные коммутаторы уровня доступа",
    modelUrl: "/models/3530all.glb",
    features: [
      "Встроенные блоки питания",
      "Поддержка РоЕ/РоЕ+",
      "Статическая и динамическая маршрутизация",
    ],
    gradient: "from-[#32398e] via-[#005baa] to-[#0079b6]",
    glowColor: "[#005baa]",
    accentColor: "#53c2a4",
  },
  {
    id: "IDS3730",
    series: "3730",
    title: "Коммутаторы IDS3730",
    description: "Корпоративные коммутаторы уровня доступа",
    modelUrl: "/models/3730all.glb",
    features: [
      "Два модульных блока питания",
      "Поддержка РоЕ/РоЕ+",
      "Статическая и динамическая маршрутизация",
    ],
    gradient: "from-[#32398e] via-[#8338EC] to-[#B5179E]",
    glowColor: "[#8338EC]",
    accentColor: "#FF6B35",
  },
  {
    id: "IDS4530",
    series: "4530",
    title: "Коммутаторы IDS4530",
    description: "Корпоративные коммутаторы уровня доступа",
    modelUrl: "/models/4530all.glb",
    features: [
      "Два модульных блока питания",
      "Поддержка РоЕ/РоЕ+",
      "Поддержка технологии VxLAN",
    ],
    gradient: "from-[#0093b6] via-[#00acad] to-[#53c2a4]",
    glowColor: "[#00acad]",
    accentColor: "#A0EEC0",
  },
  {
    id: "IDS6010",
    series: "6010",
    title: "Коммутаторы IDS6010",
    description: "Корпоративные коммутаторы уровня распределения",
    modelUrl: "/models/6010all.glb",
    features: [
      "Два модульных блока питания",
      "Поддержка РоЕ/РоЕ+",
      "Поддержка технологии VxLAN",
    ],
    gradient: "from-[#FF6B35] via-[#F5B700] to-[#FF8C7A]",
    glowColor: "[#FF6B35]",
    accentColor: "#FFD6C2",
  },
] as const;

type Refresh =
  | "60hz"
  | "90hz"
  | "120hz"
  | "144hz"
  | "240hz";

// Предвычисляем градиенты один раз для максимальной производительности
const PRECOMPUTED_GRADIENTS = heroData.map(item => {
  const matches = [...item.gradient.matchAll(/#([0-9a-fA-F]{3,8})/g)].map((x) => `#${x[1]}`);
  return [matches[0] ?? "#0B3C49", matches[1] ?? "#1A237E", matches[2] ?? "#2E2E2E"];
});

const PRECOMPUTED_GLOW_COLORS = heroData.map(item => 
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
  const [nextIndex, setNextIndex] = useState(0);
  // Морфинг убран - остается только обычная смена контента
  const [isInitialized, setIsInitialized] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [refreshRate, setRefreshRate] = useState<Refresh>("60hz");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});

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
      if (frames >= 60) { // Уменьшили с 120 до 60 кадров
        const fps = Math.round((frames * 1000) / (t - t0));
        let rate: Refresh = "60hz";
        if (fps >= 230) rate = "240hz";
        else if (fps >= 140) rate = "144hz";
        else if (fps >= 115) rate = "120hz";
        else if (fps >= 85) rate = "90hz";
        
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

  // ОПТИМИЗИРОВАННАЯ инициализация (только при монтировании)
  useEffect(() => {
    let cancelled = false;
    
    const initializeApp = async () => {
      try {
        // Проверяем статус всех моделей одним батчем
        const statusPromises = heroData.map(async (item) => {
          const isPreloaded = modelPreloader.isLoaded(item.modelUrl);
          const isCached = await modelCacheManager.hasModel?.(item.modelUrl) || false;
          return { url: item.modelUrl, loaded: isPreloaded || isCached };
        });
        
        const results = await Promise.all(statusPromises);
        const status = results.reduce((acc, result) => {
          if (result.loaded) acc[result.url] = true;
          return acc;
        }, {} as Record<string, boolean>);
        
        if (!cancelled) {
          setModelLoadStatus(status);
          setIsInitialized(true);
        }
      } catch (error) {
        if (!cancelled) {
          setIsInitialized(true);
        }
      }
    };
    
    initializeApp();
    return () => { cancelled = true; };
  }, []); // Только при монтировании!
  
  // ОТДЕЛЬНАЯ предзагрузка при смене индекса
  useEffect(() => {
    if (!isInitialized) return;
    
    const preloadCurrentAndNext = () => {
      const current = heroData[currentIndex];
      const nextIndex = (currentIndex + 1) % heroData.length;
      const next = heroData[nextIndex];
      
      // Предзагружаем текущую модель с высоким приоритетом
      if (!modelPreloader.isLoaded(current.modelUrl)) {
        modelPreloader.preloadModel(current.modelUrl, "high")
          .then(() => setModelLoadStatus(prev => ({ ...prev, [current.modelUrl]: true })))
          .catch(() => setModelLoadStatus(prev => ({ ...prev, [current.modelUrl]: false })));
      }
      
      // Предзагружаем следующую модель в фоне
      if (!modelPreloader.isLoaded(next.modelUrl)) {
        modelPreloader.preloadModel(next.modelUrl, "low").catch(() => void 0);
      }
    };
    
    preloadCurrentAndNext();
  }, [currentIndex, isInitialized]);

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
      setNextIndex(nextIdx);
      
      // Предзагружаем следующую модель
      if (!modelPreloader.isLoaded(heroData[nextIdx].modelUrl)) {
        modelPreloader.preloadModel(heroData[nextIdx].modelUrl, "high").catch(() => void 0);
      }
      
      // Предзагружаем модель на 2 шага вперёд в фоне
      const next2Index = (currentIndex + 2) % heroData.length;
      const next2Model = heroData[next2Index];
      if (!modelPreloader.isLoaded(next2Model.modelUrl)) {
        modelPreloader.preloadModel(next2Model.modelUrl, "low").catch(() => void 0);
      }
      
      // Просто меняем индекс без анимаций
      setCurrentIndex(nextIdx);
    };
    
    const interval = setInterval(autoSlide, 11000);
    intervalRef.current = interval;
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInitialized, currentIndex]);

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
            <div className="ph-content">
              <div className="ph-header">

                <h1 className="ph-title">
                  {currentData.title}
                </h1>

                <p className="ph-desc">
                  {currentData.description}
                </p>
              </div>

              <div className="ph-features">
                {currentData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="ph-feature"
                    style={{ ["--feature-index" as any]: index }}
                  >
                    <div className="ph-feature-dot" />
                    <span className="ph-feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="ph-progress">
                <div className="ph-progress-dots">
                  {heroData.map((_, idx) => (
                    <div
                      key={idx}
                      className={`ph-progress-dot ${idx === currentIndex ? "active" : ""}`}
                    />
                  ))}
                </div>
                <span className="ph-progress-counter">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(heroData.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Правая колонка — 3D */}
            <div className="ph-model-container">
              <div className="ph-model-effects">
                <div className="ph-model-bg" />
                <div className="ph-model-glow" />
              </div>

              <div className="ph-model-wrapper">
                <div className="ph-model">
                  <div className="ph-model-inner">
                    {/* Убран лоадер - больше не показываем "Загрузка 3D модели..." */}

                    <OptimizedModelViewer
                      src={currentData.modelUrl}
                      alt={currentData.title}
                      isMobile={isMobile}
                      onLoad={() => {
                        setModelLoadStatus((p) => ({ ...p, [currentData.modelUrl]: true }));
                        if (!modelPreloader.isLoaded(currentData.modelUrl)) {
                          modelPreloader.markAsLoaded?.(currentData.modelUrl);
                        }
                      }}
                      onError={() => {
                        // Тихо обрабатываем ошибку без логов в консоль
                        setModelLoadStatus((p) => ({ ...p, [currentData.modelUrl]: false }));
                      }}
                    />

                    {modelLoadStatus[currentData.modelUrl] === false && (
                      <div className="ph-model-error">
                        <div className="ph-model-error-content">
                          <Icon name="Wifi" size={48} className="ph-model-error-icon" />
                          <p className="ph-model-error-title">
                            Модель {currentData.series} недоступна
                          </p>
                          <p className="ph-model-error-text">Проверьте подключение к сети</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* /Правая колонка */}
          </div>
        </div>
      </div>

      {/* Морфинг убран */}
    </div>
  );
});

export default ProductHero;