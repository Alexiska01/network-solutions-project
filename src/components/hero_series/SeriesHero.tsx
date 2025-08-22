import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import { modelPreloader } from "@/utils/modelPreloader";
import { modelCacheManager } from "@/utils/modelCacheManager";
import "./SeriesHero.css";

type FeatureItem = { icon: string; text: string };

export interface SeriesHeroProps {
  seriesTitle: string;
  modelUrl: string;
  pdfUrl: string;
  features: ReadonlyArray<FeatureItem>;
}

const SeriesHero = ({ seriesTitle, modelUrl, pdfUrl, features }: SeriesHeroProps) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modelViewerRef = useRef<any>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const hasCheckedCacheRef = useRef(false);

  // Mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile camera init
  useEffect(() => {
    if (!isMobile || !modelViewerRef.current) return;
    const mv = modelViewerRef.current as any;
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
  }, [isMobile, isModelLoaded]);

  // Preload/cache check
  useEffect(() => {
    const checkModelCacheStatus = async () => {
      if (hasCheckedCacheRef.current) return;
      hasCheckedCacheRef.current = true;

      const isPreloaded = modelPreloader.isLoaded(modelUrl);
      const isCached = await modelCacheManager.hasModel(modelUrl);

      if (isPreloaded || isCached) {
        setIsModelLoaded(true);
        setIsModelVisible(true);
        setShowLoader(false);
      } else {
        setShowLoader(true);
        try {
          const response = await modelCacheManager.loadModel(modelUrl);
          if (response) {
            setIsModelLoaded(true);
            setTimeout(() => {
              setIsModelVisible(true);
              setShowLoader(false);
            }, 300);
          }
        } catch {
          setShowLoader(false);
        }
      }
    };
    checkModelCacheStatus();
  }, [modelUrl]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (heroSectionRef.current) observer.unobserve(heroSectionRef.current);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    if (heroSectionRef.current) observer.observe(heroSectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroSectionRef}
  className={`hero-series bg-gradient-hero text-white py-1 lg:py-2 relative overflow-hidden min-h-[140px] lg:min-h-[168px] ${
        isInView ? "hero-visible" : "hero-prerender"
      }`}
      data-animated={isInView ? "true" : "false"}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center w-full">
          {/* Left: text */}
          <div className="hero-text-content lg:pr-8">
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight mt-2">
              {seriesTitle}
            </h1>
            <div className="hero-features mb-4 space-y-3" role="list">
              {features.map((f, idx) => (
                <div
                  key={f.text}
                  role="listitem"
                  className="hero-feature-item flex items-center gap-3 text-blue-100"
                  data-anim-index={idx}
                >
                  <Icon
                    name={f.icon as any}
                    size={18}
                    strokeWidth={1.8}
                    className="text-blue-300 flex-shrink-0"
                  />
                  <span className="text-sm md:text-base">{f.text}</span>
                </div>
              ))}
            </div>
            <div className="hero-button mt-2">
              <button
                className="hero-download-btn"
                onClick={() => window.open(pdfUrl, "_blank")}
              >
                Скачать PDF
              </button>
            </div>
          </div>

          {/* Right: 3D model only */}
          <div className="hero-model-section relative order-first lg:order-last mt-0 lg:mt-0 flex items-center justify-center">
            <div
              className="hero-model-container relative w-full max-w-[400px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[600px] h-[224px] sm:h-[256px] md:h-[304px] lg:h-[336px]"
              data-model-state={isModelVisible ? "ready" : isModelLoaded ? "loaded" : "loading"}
            >
              {isModelLoaded && (
                <>
                  {isMobile ? (
                    <model-viewer
                      ref={modelViewerRef}
                      src={modelUrl}
                      alt={`3D модель коммутатора ${seriesTitle}`}
                      auto-rotate
                      auto-rotate-delay="0"
                      rotation-per-second="32deg"
                      poster-color="#0a1e2f"
                      camera-orbit="0deg 80deg 1.15m"
                      min-camera-orbit="auto auto 1.1m"
                      max-camera-orbit="auto auto 1.1m"
                      field-of-view="40deg"
                      interaction-prompt="none"
                      environment-image="neutral"
                      shadow-intensity="0.2"
                      exposure="1.1"
                      disable-zoom
                      disable-pan
                      disable-tap
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        pointerEvents: "none",
                        touchAction: "none",
                      }}
                      onLoad={() => {
                        setIsModelVisible(true);
                        setShowLoader(false);
                        if (!modelPreloader.isLoaded(modelUrl)) {
                          modelPreloader.markAsLoaded?.(modelUrl);
                        }
                      }}
                      onError={() => setShowLoader(false)}
                    />
                  ) : (
                    <model-viewer
                      ref={modelViewerRef}
                      src={modelUrl}
                      alt={`3D модель коммутатора ${seriesTitle}`}
                      auto-rotate
                      auto-rotate-delay="0"
                      rotation-per-second="25deg"
                      poster-color="#0a1e2f"
                      camera-controls
                      camera-orbit="0deg 83deg 0.95m"
                      min-camera-orbit="auto auto 0.5m"
                      max-camera-orbit="auto auto 1.2m"
                      field-of-view="90deg"
                      interaction-prompt="none"
                      environment-image="neutral"
                      shadow-intensity="0.25"
                      exposure="1.05"
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        // если захочешь интерактив на десктопе — просто убери следующую строку
                        pointerEvents: "none",
                      }}
                      onLoad={() => {
                        setIsModelVisible(true);
                        setShowLoader(false);
                        if (!modelPreloader.isLoaded(modelUrl)) {
                          modelPreloader.markAsLoaded?.(modelUrl);
                        }
                      }}
                      onError={() => setShowLoader(false)}
                    />
                  )}
                </>
              )}

              {showLoader && !isModelVisible && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                    <span className="text-white/60 text-sm font-medium">Загрузка...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesHero;
