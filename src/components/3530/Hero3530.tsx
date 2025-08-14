// Pure CSS animations - no external animation libraries needed
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";
import { modelPreloader } from '@/utils/modelPreloader';
import { modelCacheManager } from '@/utils/modelCacheManager';
import './Hero3530.css';

// Данные 3D-модели 3530
const model3530Data = {
  modelUrl: '/models/3530all.glb',
  series: '3530',
  gradient: 'from-[#32398e] via-[#005baa] to-[#0079b6]',
  glowColor: '[#005baa]',
  accentColor: '#53c2a4'
};

// Premium CSS animations handle all interactions via classes

const Hero3530 = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modelViewerRef = useRef<any>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const hasCheckedCacheRef = useRef(false);

  // Брейкпоинт для мобилки (как в ProductHero)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Инициализация камеры на мобилке (мягкий угол / фикс. дистанция)
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


  useEffect(() => {
    const checkModelCacheStatus = async () => {
      if (hasCheckedCacheRef.current) return;
      hasCheckedCacheRef.current = true;

      console.log('🔍 Hero3530: Проверка доступности модели 3530');
      
      // Проверяем все источники кэша
      const isPreloaded = modelPreloader.isLoaded(model3530Data.modelUrl);
      const isCached = await modelCacheManager.hasModel(model3530Data.modelUrl);
      
      console.log(`📊 Hero3530: Статус модели 3530 - preloader: ${isPreloaded}, cache: ${isCached}`);
      
      if (isPreloaded || isCached) {
        console.log('⚡ Hero3530: Модель 3530 доступна в кэше - мгновенная загрузка');
        setIsModelLoaded(true);
        setIsModelVisible(true);
        setShowLoader(false);
      } else {
        console.log('⏳ Hero3530: Модель 3530 не в кэше - показываем лоадер и загружаем');
        setShowLoader(true);
        
        // Попытка принудительной загрузки через modelCacheManager
        try {
          const response = await modelCacheManager.loadModel(model3530Data.modelUrl);
          if (response) {
            console.log('✅ Hero3530: Модель 3530 загружена через modelCacheManager');
            setIsModelLoaded(true);
            setTimeout(() => {
              setIsModelVisible(true);
              setShowLoader(false);
            }, 300);
          }
        } catch (error) {
          console.warn('⚠️ Hero3530: Ошибка загрузки через modelCacheManager', error);
          setShowLoader(false);
        }
      }
    };

    checkModelCacheStatus();
  }, []);

  // Premium Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          console.log('🎬 Hero3530: Секция появилась в зоне видимости - запускаю CSS анимации');
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroSectionRef}
  className={`bg-gradient-hero text-white py-1 lg:py-2 relative overflow-hidden min-h-[175px] lg:min-h-[210px] ${isInView ? 'hero-visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center w-full">
          
          {/* Левая часть - Текстовый контент */}
          <div className="hero-text-content lg:pr-8">
            {/* Подзаголовок удалён, место освобождено */}
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight mt-2">
              IDS3530
            </h1>
            
            <div className="hero-features mb-4 space-y-3">
              <div className="hero-feature-item flex items-center gap-3 text-blue-100">
                <Icon
                  name="Server"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm md:text-base">
                  До 760 Вт PoE+, 10G uplink, модульные БП
                </span>
              </div>
              <div className="hero-feature-item flex items-center gap-3 text-blue-100">
                <Icon
                  name="Layers3"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm md:text-base">
                  Стек до 8 устройств, кольцевые топологии
                </span>
              </div>
              <div className="hero-feature-item flex items-center gap-3 text-blue-100">
                <Icon
                  name="Settings"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm md:text-base">
                  QoS, SNMP, автоматизация (ZTP), удалённое управление
                </span>
              </div>
              <div className="hero-feature-item flex items-center gap-3 text-blue-100">
                <Icon
                  name="ServerCog"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm md:text-base">
                  Высокая доступность: STP, RSTP, MSTP
                </span>
              </div>
            </div>
            
            {/* Premium CSS-анимированная кнопка */}
            <div className="hero-button mt-2">
              <button
                className="btn-cta cta-button-gpu min-h-[44px]"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1-4xHlvPUr7kUBCQBzgh7Lz2FGC1COfwe/view?usp=drive_link",
                    "_blank",
                  )
                }
              >
                Скачать PDF
              </button>
            </div>
          </div>

          {/* Правая часть - только 3D модель */}
          <div className="hero-model-section relative order-first lg:order-last mt-0 lg:mt-0 flex justify-center">
              {/* Контейнер с 3D-моделью - Premium CSS анимации */}
              <div className="hero-model-container relative w-full max-w-[400px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[600px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
                {/* 3D модель - Premium CSS анимации, прозрачная интеграция */}
                {isModelLoaded && (
                  <div className={`hero-model relative z-10 w-full h-full ${isModelVisible ? 'model-loaded' : ''}`}>
                    {isMobile ? (
                      <model-viewer
                        ref={modelViewerRef}
                        src={model3530Data.modelUrl}
                        alt="3D модель коммутатора IDS3530"
                        auto-rotate
                        auto-rotate-delay="0"
                        rotation-per-second="32deg"
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
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                          pointerEvents: 'none',
                          touchAction: 'none',
                        }}
                        onLoad={() => {
                          setIsModelVisible(true);
                          setShowLoader(false);
                          if (!modelPreloader.isLoaded(model3530Data.modelUrl)) {
                            modelPreloader.markAsLoaded?.(model3530Data.modelUrl);
                          }
                        }}
                        onError={(e: unknown) => {
                        console.error(`❌ Hero3530: Ошибка загрузки модели ${model3530Data.series}`, e);
                        setShowLoader(false);
                      }}

                      />
                    ) : (
                      <model-viewer
                        ref={modelViewerRef}
                        src={model3530Data.modelUrl}
                        alt="3D модель коммутатора IDS3530"
                        auto-rotate
                        auto-rotate-delay="0"
                        rotation-per-second="30deg"
                        camera-controls
                        camera-orbit="0deg 83deg 1.1m"
                        min-camera-orbit="auto auto 0.5m"
                        max-camera-orbit="auto auto 1.2m"
                        field-of-view="35deg"
                        interaction-prompt="none"
                        environment-image="neutral"
                        shadow-intensity="0.25"
                        exposure="1.05"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          boxShadow: 'none',
                          // если захочешь интерактив на десктопе — просто убери следующую строку
                          pointerEvents: 'none',
                        }}
                        onLoad={() => {
                          setIsModelVisible(true);
                          setShowLoader(false);
                          if (!modelPreloader.isLoaded(model3530Data.modelUrl)) {
                            modelPreloader.markAsLoaded?.(model3530Data.modelUrl);
                          }
                        }}
                        onError={(e: unknown) => {
                        console.error(`❌ Hero3530: Ошибка загрузки модели ${model3530Data.series}`, e);
                        setShowLoader(false);
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Минималистичный лоадер - ТОЛЬКО при необходимости */}
                {showLoader && !isModelVisible && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                      <span className="text-white/60 text-sm font-medium">
                        Загрузка...
                      </span>
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

export default Hero3530;