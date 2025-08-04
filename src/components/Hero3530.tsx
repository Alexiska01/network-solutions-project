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

// Продвинутые анимации для мобильных
const mobileAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  model: {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1],
        delay: 0.3,
      },
    },
  },
  button: {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.98 },
  },
};

const Hero3530 = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const modelViewerRef = useRef<any>(null);
  const hasCheckedCacheRef = useRef(false);

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
      modelViewer.cameraOrbit = "0deg 75deg 85%";
      modelViewer.autoRotate = true;
      modelViewer.autoRotateDelay = 1000;
      modelViewer.rotationPerSecond = "20deg";
      
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
      modelViewer.style.pointerEvents = 'none';
      
      // Настройки освещения для интеграции с фоном
      modelViewer.setAttribute('environment-image', 'neutral');
      modelViewer.setAttribute('shadow-intensity', '0');
      modelViewer.setAttribute('exposure', '1.0');
      
      console.log(`🎬 Hero3530: Модель настроена - touch отключен, камера приближена (85%)`);
    }
  }, [isModelVisible]);

  // Компонент 3D-модели для повторного использования
  const Model3DViewer = ({ className, isMobile = false }: { className: string; isMobile?: boolean }) => (
    <motion.div
      variants={mobileAnimations.model}
      className={className}
    >
      {isModelLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isModelVisible ? 1 : 0, 
            scale: isModelVisible ? 1 : 0.9 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <model-viewer
            ref={isMobile ? null : modelViewerRef}
            src={model3530Data.modelUrl}
            alt="3D модель коммутатора IDS3530"
            auto-rotate
            auto-rotate-delay="1000"
            rotation-per-second={isMobile ? "15deg" : "20deg"}
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
              console.log(`✅ Hero3530: 3D-модель ${model3530Data.series} загружена`);
              setIsModelVisible(true);
              setShowLoader(false);
              
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
          
          {/* Мягкое свечение вокруг модели только на десктопе */}
          {!isMobile && (
            <div className="absolute inset-0 -z-10 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-xl" />
          )}
        </motion.div>
      )}
      
      {/* Элегантный лоадер */}
      {showLoader && !isModelVisible && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-b-blue-300/40 rounded-full animate-pulse" />
            </div>
            <span className="text-white/70 text-sm font-medium tracking-wide">
              Загрузка модели...
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <section className="bg-gradient-hero text-white py-6 md:py-8 lg:py-12 xl:py-16 relative overflow-hidden min-h-[500px] md:min-h-[520px] lg:min-h-[480px]">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 h-full">
        
        {/* МОБИЛЬНАЯ ВЕРСИЯ - полностью переработанная */}
        <motion.div
          variants={mobileAnimations.container}
          initial="hidden"
          animate="visible"
          className="lg:hidden flex flex-col items-center text-center space-y-6"
        >
          {/* Заголовок и подзаголовок */}
          <motion.div variants={mobileAnimations.item} className="space-y-3">
            <motion.p className="text-sm text-blue-200 font-medium uppercase tracking-wider">
              Серия корпоративных коммутаторов
            </motion.p>
            <motion.h1 className="text-4xl sm:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              IDS3530
            </motion.h1>
          </motion.div>
          
          {/* Ключевые характеристики в компактном виде */}
          <motion.div variants={mobileAnimations.item} className="grid grid-cols-1 gap-3 w-full max-w-sm">
            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-white/8 backdrop-blur-md rounded-xl border border-white/10">
              <Icon name="Server" size={18} className="text-blue-300 flex-shrink-0" />
              <span className="text-sm font-medium text-white/90">До 760 Вт PoE+</span>
            </div>
            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-white/8 backdrop-blur-md rounded-xl border border-white/10">
              <Icon name="Layers3" size={18} className="text-blue-300 flex-shrink-0" />
              <span className="text-sm font-medium text-white/90">Стек до 8 устройств</span>
            </div>
          </motion.div>
          
          {/* Кнопка скачивания - выделенная */}
          <motion.div variants={mobileAnimations.item}>
            <motion.button
              variants={mobileAnimations.button}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-r from-white to-blue-50 text-blue-900 px-8 py-4 rounded-2xl text-base font-semibold shadow-xl shadow-blue-900/20 border border-white/20 backdrop-blur-sm"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1-4xHlvPUr7kUBCQBzgh7Lz2FGC1COfwe/view?usp=drive_link",
                  "_blank",
                )
              }
            >
              <div className="flex items-center gap-2">
                <Icon name="Download" size={20} />
                Скачать PDF
              </div>
            </motion.button>
          </motion.div>
          
          {/* 3D модель - оптимизированная для мобильных */}
          <motion.div variants={mobileAnimations.item} className="w-full">
            <Model3DViewer 
              className="w-full max-w-[280px] h-[200px] mx-auto bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden"
              isMobile={true}
            />
          </motion.div>
          
          {/* Дополнительная информация - компактно */}
          <motion.div variants={mobileAnimations.item} className="w-full max-w-md">
            <div className="px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="flex items-start gap-3">
                <Icon name="ServerCog" size={20} className="text-blue-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/80 leading-relaxed">
                  Лёгкая интеграция в корпоративные сети, поддержка кольцевых топологий и удалённое управление
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ДЕСКТОПНАЯ ВЕРСИЯ - улучшенная */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-center min-h-[400px]">
          
          {/* Левая часть - Текстовый контент */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm text-blue-200 font-medium mb-4 uppercase tracking-wide">
                Серия корпоративных коммутаторов
              </p>
              <h1 className="text-6xl xl:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                IDS3530
              </h1>
            </motion.div>
            
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                { icon: "Server", text: "До 760 Вт PoE+, 10G uplink, модульные БП" },
                { icon: "Layers3", text: "Стек до 8 устройств, кольцевые топологии" },
                { icon: "Settings", text: "QoS, SNMP, автоматизация (ZTP), удалённое управление" }
              ].map((item, i) => (
                <motion.div
                  key={item.icon}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
                    <Icon name={item.icon as any} size={20} className="text-blue-300" />
                  </div>
                  <span className="text-blue-100 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-white to-blue-50 text-blue-900 px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-900/30 border border-white/20 backdrop-blur-sm hover:shadow-blue-900/40 transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1-4xHlvPUr7kUBCQBzgh7Lz2FGC1COfwe/view?usp=drive_link",
                    "_blank",
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon name="Download" size={22} />
                  Скачать PDF
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Правая часть - 3D модель и фичи */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex flex-col space-y-8">
              
              {/* 3D модель для десктопа */}
              <Model3DViewer className="w-full max-w-[420px] h-[320px] mx-auto" />

              {/* Фичи-карточки */}
              <div className="grid grid-cols-1 gap-4">
                {featuresRight.map(({ icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
                      <Icon name={icon as any} size={18} className="text-white/90 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-white/90 font-medium text-base leading-snug group-hover:text-white transition-colors duration-300">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Дополнительное описание */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
                className="px-6 py-4 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/15 to-blue-600/5 rounded-xl flex items-center justify-center border border-blue-400/20 group-hover:border-blue-400/30 transition-all duration-300 flex-shrink-0 mt-0.5">
                    <Icon name="ServerCog" size={18} className="text-white/80 group-hover:text-white/90 transition-colors duration-300" />
                  </div>
                  <p className="text-white/80 font-medium text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    Лёгкая интеграция в корпоративные сети различной сложности,
                    поддержка кольцевых топологий, автоматизация и удалённое управление
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3530;