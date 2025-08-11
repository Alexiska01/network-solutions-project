import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";
import { modelPreloader } from '@/utils/modelPreloader';
import { modelCacheManager } from '@/utils/modelCacheManager';
import "./Hero3530.css";

// Фичи для правого блока IDS3530
const featuresRight = [
  {
    icon: "Layers3",
    label: "Стек до 8 устройств (10G SFP+)",
  },
  {
    icon: "Zap",
    label: "PoE/PoE+ для питания устройств",
  },
  {
    icon: "Repeat",
    label: "Высокая доступность: STP, RSTP, MSTP",
  },
];

// Данные 3D-модели 3530
const model3530Data = {
  modelUrl: '/models/3530all.glb',
  series: '3530',
  gradient: 'from-[#32398e] via-[#005baa] to-[#0079b6]',
  glowColor: '[#005baa]',
  accentColor: '#53c2a4'
};



const Hero3530 = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [is120fps, setIs120fps] = useState(false);
  const modelViewerRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasCheckedCacheRef = useRef(false);

  // Определение мобильного устройства и FPS
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Детекция высокой частоты обновления
  useEffect(() => {
    let frameCount = 0;
    let startTime = 0;
    let animationId: number;

    const measureFPS = () => {
      if (frameCount === 0) {
        startTime = performance.now();
      }
      frameCount++;
      
      if (frameCount === 60) {
        const endTime = performance.now();
        const fps = Math.round(60000 / (endTime - startTime));
        
        if (fps >= 115) {
          setIs120fps(true);
          console.log(`🚀 Hero3530: Обнаружен ${fps} FPS дисплей - активирован режим 120 FPS!`);
        } else {
          setIs120fps(false);
          console.log(`📺 Hero3530: Стандартный ${fps} FPS дисплей`);
        }
        return;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Проверка поддержки высокой частоты через media query
    const highRefreshSupported = window.matchMedia('(min-refresh-rate: 120hz)').matches;
    if (highRefreshSupported) {
      setIs120fps(true);
      console.log('🚀 Hero3530: 120Hz+ дисплей определен через CSS media query');
    } else {
      animationId = requestAnimationFrame(measureFPS);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Intersection Observer для анимации появления при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          console.log('👁️ Hero3530: Секция попала в зону видимости - запуск анимаций');
        }
      },
      { 
        threshold: isMobile ? 0.2 : 0.3,
        rootMargin: isMobile ? '-20px' : '-50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

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

  useEffect(() => {
    // Настройка автоматического вращения и прозрачности модели
    if (modelViewerRef.current && isModelVisible) {
      const modelViewer = modelViewerRef.current;
      
      // Настройка камеры - приближаем для большего размера модели
      modelViewer.cameraOrbit = "0deg 75deg 85%"; // Уменьшили с 110% до 85% для увеличения модели
      modelViewer.autoRotate = true;
      modelViewer.autoRotateDelay = 1000;
      modelViewer.rotationPerSecond = "25deg";
      
      // Полное отключение touch и mouse взаимодействий
      modelViewer.disableZoom = true;
      modelViewer.disablePan = true;
      modelViewer.disableTap = true;
      modelViewer.interactionPolicy = 'none';
      modelViewer.cameraControls = false;
      
      // Убираем все фоны и границы
      modelViewer.style.background = 'transparent';
      modelViewer.style.border = 'none';
      modelViewer.style.outline = 'none';
      modelViewer.style.boxShadow = 'none';
      modelViewer.style.pointerEvents = 'none'; // Полностью отключаем интерактивность
      
      // Настройки освещения для интеграции с фоном
      modelViewer.setAttribute('environment-image', 'neutral');
      modelViewer.setAttribute('shadow-intensity', '0');
      modelViewer.setAttribute('exposure', '1.0');
      
      // Принудительное отключение всех touch событий
      modelViewer.addEventListener('touchstart', (e: Event) => e.preventDefault(), { passive: false });
      modelViewer.addEventListener('touchmove', (e: Event) => e.preventDefault(), { passive: false });
      modelViewer.addEventListener('touchend', (e: Event) => e.preventDefault(), { passive: false });
      modelViewer.addEventListener('gesturestart', (e: Event) => e.preventDefault(), { passive: false });
      modelViewer.addEventListener('gesturechange', (e: Event) => e.preventDefault(), { passive: false });
      modelViewer.addEventListener('gestureend', (e: Event) => e.preventDefault(), { passive: false });
      
      console.log(`🎬 Hero3530: Модель настроена - touch отключен, камера приближена (85%)`);
    }
  }, [isModelVisible]);



  return (
    <section 
      ref={sectionRef}
      className={`bg-gradient-hero text-white py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 relative overflow-hidden min-h-[420px] md:min-h-[480px] hero-gpu ${
        is120fps ? 'hero-120fps' : ''
      } ${
        isInView ? 'hero-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start lg:items-center w-full">
          
          {/* Левая часть - Текстовый контент */}
          <div
            className="lg:pr-4 xl:pr-8 text-content-gpu"
          >
            <p className="text-xs sm:text-sm text-blue-200 font-medium mb-1 sm:mb-2 md:mb-3 uppercase tracking-wide text-gpu hero-subtitle">
              Серия корпоративных коммутаторов
            </p>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight title-gpu hero-title">
              IDS3530
            </h1>
            
            <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 space-y-2 sm:space-y-3 features-list-gpu hero-features">
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Server"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0 icon-gpu"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  До 760 Вт PoE+, 10G uplink, модульные БП
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Layers3"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0 icon-gpu"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  Стек до 8 устройств, кольцевые топологии
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Settings"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0 icon-gpu"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  QoS, SNMP, автоматизация (ZTP), удалённое управление
                </span>
              </div>
            </div>
            
            {/* Обновленная кнопка - только одна */}
            <div className="button-container-gpu hero-button">
              <button
                className="bg-white text-[#0065B3] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 min-h-[44px] hover:scale-105 hover:shadow-lg transform-gpu cta-button-gpu"
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

          {/* Правая часть - 3D модель и фичи */}
          <div className="relative mt-4 sm:mt-6 lg:mt-0 model-section-gpu hero-model-section">
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
              
              {/* Контейнер с 3D-моделью - ПОЛНОСТЬЮ ПРОЗРАЧНЫЙ */}
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] mx-auto lg:mx-0 model-container-gpu hero-model-container">
                {/* 3D модель - БЕЗ ФОНА, ГРАНИЦ И КОНТЕЙНЕРОВ */}
                {isModelLoaded && (
                  <div className={`relative z-10 w-full h-full hero-model ${isModelVisible ? 'model-loaded' : ''}`}>
                    <model-viewer
                      ref={modelViewerRef}
                      src={model3530Data.modelUrl}
                      alt="3D модель коммутатора IDS3530"
                      auto-rotate
                      auto-rotate-delay="1000"
                      rotation-per-second="25deg"
                      camera-orbit="0deg 75deg 85%"
                      min-camera-orbit="auto auto 85%"
                      max-camera-orbit="auto auto 85%"
                      interaction-policy="none"
                      disable-zoom
                      disable-pan
                      disable-tap
                      environment-image="neutral"
                      shadow-intensity="0"
                      exposure="1.0"
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
                        console.log(`✅ Hero3530: 3D-модель ${model3530Data.series} загружена и отображается`);
                        setIsModelVisible(true);
                        setShowLoader(false);
                        
                        // Дополнительная синхронизация с preloader
                        if (!modelPreloader.isLoaded(model3530Data.modelUrl)) {
                          console.log(`🔄 Hero3530: Синхронизируем модель ${model3530Data.series} с preloader`);
                          modelPreloader.markAsLoaded && modelPreloader.markAsLoaded(model3530Data.modelUrl);
                        }
                      }}
                      onError={(e) => {
                        console.error(`❌ Hero3530: Ошибка загрузки модели ${model3530Data.series}`, e);
                        setShowLoader(false);
                      }}
                    />
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

              {/* Обновленные фичи-карточки - МИНИМАЛИСТИЧНЫЕ БЕЗ ГРАНИЦ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {featuresRight.map(({ icon, label }, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform-gpu feature-card-gpu hero-feature-card hero-feature-${i + 1}`}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/10 flex-shrink-0">
                      <Icon
                        name={icon as any}
                        size={16}
                        strokeWidth={1.8}
                        className="text-white/90 icon-gpu"
                      />
                    </div>
                    <span className="text-white/90 font-medium text-sm sm:text-base leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Обновленное дополнительное описание - БЕЗ ГРАНИЦ */}
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform-gpu description-card-gpu hero-description"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/8 flex-shrink-0 mt-0.5">
                  <Icon
                    name="ServerCog"
                    size={16}
                    strokeWidth={1.8}
                    className="text-white/80 icon-gpu"
                  />
                </div>
                <span className="text-white/80 font-medium text-xs sm:text-sm leading-relaxed">
                  Лёгкая интеграция в корпоративные сети различной сложности,
                  поддержка кольцевых топологий, автоматизация и удалённое управление
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3530;