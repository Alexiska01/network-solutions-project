import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { useEffect, useState, useRef } from "react";
import { modelPreloader } from '@/utils/modelPreloader';
import { modelCacheManager } from '@/utils/modelCacheManager';

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
    scale: 1.02, 
    y: -2,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { scale: 0.98 },
};

const Hero3530 = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    const checkModelAvailability = async () => {
      // Проверяем доступность модели в кэше или preloader
      const isPreloaded = modelPreloader.isLoaded(model3530Data.modelUrl);
      const isCached = await modelCacheManager.hasModel(model3530Data.modelUrl);
      
      console.log(`🔍 Hero3530: Модель 3530 доступна - preloader: ${isPreloaded}, cache: ${isCached}`);
      
      if (isPreloaded || isCached) {
        setIsModelLoaded(true);
        // Небольшая задержка для плавного появления
        setTimeout(() => setIsModelVisible(true), 200);
      }
    };

    checkModelAvailability();
  }, []);

  useEffect(() => {
    // Настройка автоматического вращения модели
    if (modelViewerRef.current && isModelVisible) {
      const modelViewer = modelViewerRef.current;
      
      // Настройка камеры и автоматического вращения
      modelViewer.cameraOrbit = "0deg 75deg 105%";
      modelViewer.autoRotate = true;
      modelViewer.autoRotateDelay = 1000;
      modelViewer.rotationPerSecond = "30deg";
      
      console.log(`🎬 Hero3530: Автоматическое вращение активировано для модели 3530`);
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
              IDS3530
            </motion.h1>
            
            <motion.div
              className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Server"
                  size={18}
                  strokeWidth={1.8}
                  className="text-blue-300 flex-shrink-0"
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
                  className="text-blue-300 flex-shrink-0"
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
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  QoS, SNMP, автоматизация (ZTP), удалённое управление
                </span>
              </div>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button
                className="bg-white text-[#0065B3] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 min-h-[44px] hover:scale-105 hover:shadow-lg transform-gpu"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1-4xHlvPUr7kUBCQBzgh7Lz2FGC1COfwe/view?usp=drive_link",
                    "_blank",
                  )
                }
              >
                Посмотреть документацию
              </button>
              <button className="border border-white text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg transform-gpu">
                Получить консультацию
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
              
              {/* Контейнер с 3D-моделью */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] mx-auto lg:mx-0 rounded-xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${model3530Data.gradient})`,
                  boxShadow: `0 8px 32px rgba(0, 91, 170, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)`,
                }}
              >
                {/* Фоновые эффекты */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${model3530Data.glowColor}/40 0%, transparent 50%)`
                  }}
                />
                
                {/* 3D модель */}
                {isModelLoaded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isModelVisible ? 1 : 0, 
                      scale: isModelVisible ? 1 : 0.8 
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 w-full h-full"
                  >
                    <model-viewer
                      ref={modelViewerRef}
                      src={model3530Data.modelUrl}
                      alt="3D модель коммутатора IDS3530"
                      camera-controls
                      auto-rotate
                      auto-rotate-delay="1000"
                      rotation-per-second="30deg"
                      camera-orbit="0deg 75deg 105%"
                      min-camera-orbit="auto auto 80%"
                      max-camera-orbit="auto auto 200%"
                      interaction-policy="allow-when-focused"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                      }}
                      onLoad={() => {
                        console.log(`✅ Hero3530: 3D-модель ${model3530Data.series} загружена и отображается`);
                        setIsModelVisible(true);
                      }}
                    />
                  </motion.div>
                )}
                
                {/* Лоадер для модели */}
                {!isModelVisible && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-white/80 text-sm font-medium">
                        Загрузка модели...
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Фичи-карточки */}
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
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform-gpu"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(255,255,255,0.2)",
                      border: "1px solid",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/10 flex-shrink-0">
                      <Icon
                        name={icon as any}
                        size={16}
                        strokeWidth={1.8}
                        className="text-white"
                      />
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base leading-snug">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Дополнительное описание */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.0,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform-gpu"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.15)",
                  border: "1px solid",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/10 flex-shrink-0 mt-0.5">
                  <Icon
                    name="ServerCog"
                    size={16}
                    strokeWidth={1.8}
                    className="text-white/90"
                  />
                </div>
                <span className="text-white/90 font-medium text-xs sm:text-sm leading-relaxed">
                  Лёгкая интеграция в корпоративные сети различной сложности,
                  поддержка кольцевых топологий, автоматизация и удалённое управление
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3530;