// src/components/product/ProductHero.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
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

const parseGradientStops = (twLike: string) => {
  // ожидает строку формата 'from-[#xxxxxx] via-[#xxxxxx] to-[#xxxxxx]'
  const m = [...twLike.matchAll(/#([0-9a-fA-F]{3,8})/g)].map((x) => `#${x[1]}`);
  // гарантируем 3 стопа
  return [m[0] ?? "#0B3C49", m[1] ?? "#1A237E", m[2] ?? "#2E2E2E"];
};

const stripBrackets = (s: string) => s.replace("[", "").replace("]", "");

const ProductHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [refreshRate, setRefreshRate] = useState<Refresh>("60hz");
  const intervalRef = useRef<number | null>(null);
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});

  const currentData = heroData[currentIndex];

  const gradientStops = useMemo(
    () => parseGradientStops(currentData.gradient),
    [currentData.gradient]
  );

  // mobile breakpoint
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // refresh-rate detection (RAF, без странных matchMedia)
  useEffect(() => {
    let id = 0;
    let frames = 0;
    let t0 = 0;

    const tick = (t: number) => {
      if (!t0) t0 = t;
      frames++;
      if (frames >= 120) {
        const fps = Math.round((frames * 1000) / (t - t0));
        let rate: Refresh = "60hz";
        if (fps >= 230) rate = "240hz";
        else if (fps >= 140) rate = "144hz";
        else if (fps >= 115) rate = "120hz";
        else if (fps >= 85) rate = "90hz";
        setRefreshRate(rate);

        // поддерживаем класс на <body>
        document.body.classList.forEach((c) => {
          if (/^refresh-\d+hz$/.test(c)) document.body.classList.remove(c);
        });
        document.body.classList.add(`refresh-${rate}`);
        return;
      }
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  // init + кэш/предзагрузка
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Синхронизируем состояние из preloader/cache
      const status: Record<string, boolean> = {};
      for (const m of heroData) {
        const pre = modelPreloader.isLoaded(m.modelUrl);
        const cache = (await modelCacheManager.hasModel?.(m.modelUrl)) || false;
        if (pre || cache) status[m.modelUrl] = true;
      }
      if (!cancelled) {
        if (Object.keys(status).length) setModelLoadStatus((p) => ({ ...p, ...status }));
        setIsInitialized(true);
      }

      // активная предзагрузка текущей и следующей
      const cur = heroData[currentIndex];
      if (!modelPreloader.isLoaded(cur.modelUrl)) {
        modelPreloader
          .preloadModel(cur.modelUrl, "high")
          .then(() => {
            if (!cancelled) {
              setModelLoadStatus((p) => ({ ...p, [cur.modelUrl]: true }));
            }
          })
          .catch(() => {
            if (!cancelled) {
              setModelLoadStatus((p) => ({ ...p, [cur.modelUrl]: false }));
            }
          });
      } else {
        setModelLoadStatus((p) => ({ ...p, [cur.modelUrl]: true }));
      }

      const nextIndex = (currentIndex + 1) % heroData.length;
      const next = heroData[nextIndex];
      if (!modelPreloader.isLoaded(next.modelUrl)) {
        modelPreloader.preloadModel(next.modelUrl, "high").catch(() => void 0);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [currentIndex]);

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

  // mouse parallax (desktop)
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  // автосмена слайда
  useEffect(() => {
    if (!isInitialized) return;
    const id = window.setInterval(() => {
      setIsTransitioning(true);

      // подгружаем модель на 2 шага вперёд "втихую"
      const next2 = heroData[(currentIndex + 2) % heroData.length];
      if (!modelPreloader.isLoaded(next2.modelUrl)) {
        modelPreloader.preloadModel(next2.modelUrl, "low").catch(() => void 0);
      }

      window.setTimeout(async () => {
        const next = (currentIndex + 1) % heroData.length;
        const nextModel = heroData[next];

        try {
          const hasCache = (await modelCacheManager.hasModel?.(nextModel.modelUrl)) || false;
          const hasPre = modelPreloader.isLoaded(nextModel.modelUrl);
          if (hasCache || hasPre) {
            setModelLoadStatus((p) => ({ ...p, [nextModel.modelUrl]: true }));
          }
        } catch {
          /* noop */
        }

        setCurrentIndex(next);
        setIsTransitioning(false);
      }, isMobile ? 100 : 300);
    }, 11000);
    intervalRef.current = id;
    return () => window.clearInterval(id);
  }, [isInitialized, isMobile, currentIndex]);

  // CSS custom props для динамики
  const cssVars: React.CSSProperties = {
    // цвета
    ["--current-glow-color" as any]: stripBrackets(currentData.glowColor),
    ["--current-accent-color" as any]: currentData.accentColor,
    ["--grad-1" as any]: gradientStops[0],
    ["--grad-2" as any]: gradientStops[1],
    ["--grad-3" as any]: gradientStops[2],
    // параллакс
    ["--mouse-x" as any]: String(mousePosition.x),
    ["--mouse-y" as any]: String(mousePosition.y),
  };

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
                <div className="ph-badge">ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ</div>

                <h1 key={currentData.id} className="ph-title">
                  {currentData.title}
                </h1>

                <p key={`${currentData.id}-desc`} className="ph-desc">
                  {currentData.description}
                </p>
              </div>

              <div key={`${currentData.id}-features`} className="ph-features">
                {currentData.features.map((feature, index) => (
                  <div
                    key={`${currentData.id}-feature-${index}`}
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
                <div key={currentData.id} className="ph-model">
                  <div className="ph-model-inner">
                    {/* Лоадер (если нет в кэше/предзагрузчике) */}
                    {!modelLoadStatus[currentData.modelUrl] &&
                      !modelPreloader.isLoaded(currentData.modelUrl) && (
                        <div className="ph-loader">
                          <div className="ph-loader-inner">
                            <div className="ph-spinner" />
                            <p className="ph-loader-text">Загрузка 3D модели...</p>
                          </div>
                        </div>
                      )}

                    {isMobile ? (
                      <model-viewer
                        ref={modelRef}
                        src={currentData.modelUrl}
                        alt={currentData.title}
                        auto-rotate
                        auto-rotate-delay="0"
                        rotation-per-second="32deg"
                        camera-orbit="0deg 80deg 1.1m"
                        min-camera-orbit="auto auto 1.1m"
                        max-camera-orbit="auto auto 1.1m"
                        field-of-view="40deg"
                        exposure="1.2"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "transparent",
                          borderRadius: "1rem",
                          ["--progress-bar-color" as any]: "transparent",
                          ["--progress-mask" as any]: "transparent",
                          pointerEvents: "none",
                        }}
                        onLoad={() => {
                          setModelLoadStatus((p) => ({ ...p, [currentData.modelUrl]: true }));
                          if (!modelPreloader.isLoaded(currentData.modelUrl)) {
                            modelPreloader.markAsLoaded?.(currentData.modelUrl);
                          }
                        }}
                        onError={() =>
                          setModelLoadStatus((p) => ({ ...p, [currentData.modelUrl]: false }))
                        }
                      />
                    ) : (
                      <model-viewer
                        ref={modelRef}
                        src={currentData.modelUrl}
                        alt={currentData.title}
                        auto-rotate
                        auto-rotate-delay="0"
                        rotation-per-second="35deg"
                        camera-controls
                        camera-orbit="0deg 80deg 1.02m"
                        min-camera-orbit="auto auto 0.4m"
                        max-camera-orbit="auto auto 2.5m"
                        field-of-view="35deg"
                        exposure="1.1"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        style={{
                          width: "90%",
                          height: "90%",
                          background: "transparent",
                          borderRadius: "0rem",
                          ["--progress-bar-color" as any]: "transparent",
                          ["--progress-mask" as any]: "transparent",
                          pointerEvents: "none",
                        }}
                        onLoad={() => {
                          setModelLoadStatus((p) => ({ ...p, [currentData.modelUrl]: true }));
                          if (!modelPreloader.isLoaded(currentData.modelUrl)) {
                            modelPreloader.markAsLoaded?.(currentData.modelUrl);
                          }
                        }}
                        onError={() =>
                          setModelLoadStatus((p) => ({ ...p, [currentData.modelUrl]: false }))
                        }
                      />
                    )}

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

      {/* Переходная линия (desktop) */}
      {isTransitioning && !isMobile && <div className="ph-transition" />}
    </div>
  );
};

export default ProductHero;