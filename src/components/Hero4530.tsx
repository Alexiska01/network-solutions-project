import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";
import { modelPreloader } from '@/utils/modelPreloader';
import { modelCacheManager } from '@/utils/modelCacheManager';

const featuresRight = [
  {
    icon: "GitBranch",
    label: "Статическая маршрутизация",
  },
  {
    icon: "Network",
    label: "Динамическая маршрутизация RIP, OSPF, BGP, ISIS",
  },
  {
    icon: "ArrowUpDown",
    label: "Модули расширения для интерфейсов 40G и 100G",
  },
];

// Данные 3D-модели 4530
const model4530Data = {
  modelUrl: '/models/4530all.glb',
  series: '4530',
  gradient: 'from-[#0f7a9c] via-[#2980b9] to-[#3498db]',
  glowColor: '[#3498db]',
  accentColor: '#27ae60'
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
  hover: { 
    scale: 1.01, 
    y: -1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { scale: 0.99 },
};

const Hero4530 = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const modelViewerRef = useRef<any>(null);
  const hasCheckedCacheRef = useRef(false);

  useEffect(() => {
    const checkModelCacheStatus = async () => {
      if (hasCheckedCacheRef.current) return;
      hasCheckedCacheRef.current = true;

      console.log('🔍 Hero4530: Проверка доступности модели 4530');
      
      // Проверяем все источники кэша
      const isPreloaded = modelPreloader.isLoaded(model4530Data.modelUrl);
      const isCached = await modelCacheManager.hasModel(model4530Data.modelUrl);
      
      console.log(`📊 Hero4530: Статус модели 4530 - preloader: ${isPreloaded}, cache: ${isCached}`);
      
      if (isPreloaded || isCached) {
        console.log('⚡ Hero4530: Модель 4530 доступна в кэше - мгновенная загрузка');
        setIsModelLoaded(true);
        setIsModelVisible(true);
        setShowLoader(false);
      } else {
        console.log('⏳ Hero4530: Модель 4530 не в кэше - показываем лоадер и загружаем');
        setShowLoader(true);
        
        // Попытка принудительной загрузки через modelCacheManager
        try {
          const response = await modelCacheManager.loadModel(model4530Data.modelUrl);
          if (response) {
            console.log('✅ Hero4530: Модель 4530 загружена через modelCacheManager');
            setIsModelLoaded(true);
            setTimeout(() => {
              setIsModelVisible(true);
              setShowLoader(false);
            }, 300);
          }
        } catch (error) {
          console.warn('⚠️ Hero4530: Ошибка загрузки через modelCacheManager', error);
          setShowLoader(false);
        }
      }
    };

    checkModelCacheStatus();
  }, []);

  useEffect(() => {
    // Настройка камеры, вращения и отключение touch-взаимодействий
    if (modelViewerRef.current && isModelVisible) {
      const modelViewer = modelViewerRef.current;
      
      // Настройка камеры - приближаем для большего размера модели
      modelViewer.cameraOrbit = "0deg 75deg 85%"; // Уменьшили с дефолтного до 85% для увеличения модели
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
      
      console.log(`🎬 Hero4530: Модель настроена - touch отключен, камера приближена (85%)`);
    }
  }, [isModelVisible]);

  return (
    <section className="bg-gradient-hero text-white py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 relative overflow-hidden min-h-[420px] md:min-h-[480px]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start lg:items-center w-full">
          
          {/* Левая часть - Текстовый контент */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              type: "spring",
              stiffness: 120,
            }}
            className="lg:pr-4 xl:pr-8"
          >
            <motion.p
              className="text-xs sm:text-sm text-blue-200 font-medium mb-1 sm:mb-2 md:mb-3 uppercase tracking-wide"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Серия корпоративных коммутаторов
            </motion.p>
            
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: "spring",
                stiffness: 140,
              }}
            >
              IDS4530
            </motion.h1>
            
            <motion.div
              className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Zap"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  До 688 Гбит/сек производительность
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Layers"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  Два слота расширения
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Shield"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  Двойное питание и PoE+ до 1440 Вт
                </span>
              </div>
            </motion.div>
            
            {/* Обновленная кнопка - только одна */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button
                className="bg-white text-[#0065B3] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 min-h-[44px] hover:scale-105 hover:shadow-lg transform-gpu"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/14LsavLKoXR3eiJiTnnLzza9VnKKoU993/view?usp=drive_link",
                    "_blank",
                  )
                }
              >
                Скачать PDF
              </button>
            </motion.div>
          </motion.div>

          {/* Правая часть - 3D модель и фичи */}
          <motion.div
            className="relative mt-4 sm:mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
              
              {/* Контейнер с 3D-моделью - ПОЛНОСТЬЮ ПРОЗРАЧНЫЙ */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] mx-auto lg:mx-0"
              >
                {/* 3D модель - БЕЗ ФОНА, ГРАНИЦ И КОНТЕЙНЕРОВ, С ОТКЛЮЧЕННЫМ TOUCH */}
                {isModelLoaded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: isModelVisible ? 1 : 0, 
                      scale: isModelVisible ? 1 : 0.9 
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 w-full h-full"
                  >
                    <model-viewer
                      ref={modelViewerRef}
                      src={model4530Data.modelUrl}
                      alt="3D модель коммутатора IDS4530"
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
                        console.log(`✅ Hero4530: 3D-модель ${model4530Data.series} загружена и отображается`);
                        setIsModelVisible(true);
                        setShowLoader(false);
                        
                        // Дополнительная синхронизация с preloader
                        if (!modelPreloader.isLoaded(model4530Data.modelUrl)) {
                          console.log(`🔄 Hero4530: Синхронизируем модель ${model4530Data.series} с preloader`);
                          modelPreloader.markAsLoaded && modelPreloader.markAsLoaded(model4530Data.modelUrl);
                        }
                      }}
                      onError={(e) => {
                        console.error(`❌ Hero4530: Ошибка загрузки модели ${model4530Data.series}`, e);
                        setShowLoader(false);
                      }}
                    />
                  </motion.div>
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
              </motion.div>

              {/* Обновленные фичи-карточки - МИНИМАЛИСТИЧНЫЕ БЕЗ ГРАНИЦ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {featuresRight.map(({ icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform-gpu"
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
                        className="text-white/90"
                      />
                    </div>
                    <span className="text-white/90 font-medium text-sm sm:text-base leading-snug">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Обновленное дополнительное описание - БЕЗ ГРАНИЦ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.0,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.005 }}
                className="flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform-gpu"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/8 flex-shrink-0 mt-0.5">
                  <Icon
                    name="Layers"
                    size={16}
                    strokeWidth={1.8}
                    className="text-white/80"
                  />
                </div>
                <span className="text-white/80 font-medium text-xs sm:text-sm leading-relaxed">
                  Расширяемые коммутаторы уровня доступа и агрегации для небольших корпоративных сетей
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero4530;