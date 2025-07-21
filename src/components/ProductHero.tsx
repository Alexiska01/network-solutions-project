import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { modelPreloader } from '@/utils/modelPreloader';

import WelcomeScreen from '@/components/WelcomeScreen';
import PlayStationTransition from '@/components/PlayStationTransition';

// Конфигурация моделей коммутаторов - только "all" версии
const heroData = [
  {
    id: 'IDS3530',
    series: '3530',
    title: 'Коммутаторы IDS3530',
    description: 'Промышленные коммутаторы для критически важных применений',
    modelUrl: '/models/3530all.glb',
    features: [
      'Встроенные блоки питания',
      'Поддержка РоЕ/РоЕ+',
      'Статическая и динамическая маршрутизация'
    ],
    gradient: 'from-[#32398e] via-[#005baa] to-[#0079b6]',
    glowColor: '[#005baa]',
    accentColor: '#53c2a4'
  },
  {
    id: 'IDS3730',
    series: '3730',
    title: 'Коммутаторы IDS3730',
    description: 'Высокопроизводительные коммутаторы для корпоративных сетей',
    modelUrl: '/models/3730all.glb',
    features: [
      'Два модульных блока питания',
      'Поддержка РоЕ/РоЕ+',
      'Статическая и динамическая маршрутизация'
    ],
    gradient: 'from-[#32398e] via-[#8338EC] to-[#B5179E]',
    glowColor: '[#8338EC]',
    accentColor: '#FF6B35'
  },
  {
    id: 'IDS4530',
    series: '4530',
    title: 'Коммутаторы IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями',
    modelUrl: '/models/4530all.glb',
    features: [
      'Два модульных блока питания',
      'Поддержка РоЕ/РоЕ+',
      'Поддержка технологии VxLAN'
    ],
    gradient: 'from-[#0093b6] via-[#00acad] to-[#53c2a4]',
    glowColor: '[#00acad]',
    accentColor: '#A0EEC0'
  },
  {
    id: 'IDS6010',
    series: '6010',
    title: 'Коммутаторы IDS6010',
    description: 'Высокопроизводительные коммутаторы для дата-центров',
    modelUrl: '/models/6010all.glb',
    features: [
      'Два модульных блока питания',
      'Поддержка РоЕ/РоЕ+',
      'Поддержка технологии VxLAN'
    ],
    gradient: 'from-[#FF6B35] via-[#F5B700] to-[#FF8C7A]',
    glowColor: '[#FF6B35]',
    accentColor: '#FFD6C2'
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modelRef = useRef<any>(null);
  const [modelLoadStatus, setModelLoadStatus] = useState<Record<string, boolean>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const preloadedViewers = useRef<Map<string, any>>(new Map());

  // Отслеживание размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Интеллектуальная предзагрузка моделей
  useEffect(() => {
    if (!showWelcome) {
      // Предзагружаем следующую модель заранее
      const preloadNextModel = () => {
        const nextIndex = (currentIndex + 1) % heroData.length;
        const nextModel = heroData[nextIndex];
        
        if (!modelPreloader.isLoaded(nextModel.modelUrl)) {
          modelPreloader.preloadModel(nextModel.modelUrl, 'high');
        }
      };
      
      // Предзагружаем текущую и следующую модели
      const currentModel = heroData[currentIndex];
      if (!modelPreloader.isLoaded(currentModel.modelUrl)) {
        modelPreloader.preloadModel(currentModel.modelUrl, 'high').then(() => {
          setModelLoadStatus(prev => ({ ...prev, [currentModel.modelUrl]: true }));
          preloadNextModel();
        });
      } else {
        setModelLoadStatus(prev => ({ ...prev, [currentModel.modelUrl]: true }));
        preloadNextModel();
      }
    }
  }, [currentIndex, showWelcome]);

  // Мобильная инициализация model-viewer
  useEffect(() => {
    if (isMobile && modelRef.current) {
      const initMobileModel = () => {
        const mv = modelRef.current as any;
        if (mv && mv.cameraOrbit) {
          // Принудительная инициализация для мобильных - отдаленная камера без взаимодействий
          mv.cameraOrbit = "0deg 75deg 1.6m";
          mv.fieldOfView = "40deg";
          mv.minCameraOrbit = "auto auto 1.6m";
          mv.maxCameraOrbit = "auto auto 1.6m";
          if (mv.jumpCameraToGoal) {
            mv.jumpCameraToGoal();
          }
        }
      };

      // Мгновенная инициализация
      initMobileModel();
      const timer = setTimeout(initMobileModel, 50);
      return () => clearTimeout(timer);
    }
  }, [isMobile, currentIndex]);

  // Трекинг мыши для параллакс эффектов (только на десктопе)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Автоматическая смена слайдов с оптимизацией
  useEffect(() => {
    if (!showWelcome) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        
        // Предзагружаем модель за 2 слайда вперед
        const nextNextIndex = (currentIndex + 2) % heroData.length;
        const nextNextModel = heroData[nextNextIndex];
        if (!modelPreloader.isLoaded(nextNextModel.modelUrl)) {
          modelPreloader.preloadModel(nextNextModel.modelUrl, 'low');
        }
        
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % heroData.length);
          setIsTransitioning(false);
        }, isMobile ? 100 : 300);
      }, 8000);
      
      intervalRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [showWelcome, isMobile, currentIndex]);

  const currentData = heroData[currentIndex];

  const handleWelcomeComplete = () => {
    console.log('🚀 ProductHero: WelcomeScreen завершён, запускаем переход');
    setShowTransition(true);
    
    // Добавляем fallback таймер на случай зависания PlayStationTransition
    setTimeout(() => {
      console.log('⚠️ ProductHero: Fallback таймер сработал, принудительно завершаем переход');
      setShowWelcome(false);
      setShowTransition(false);
    }, 3000); // Максимум 3 секунды на переход
  };

  const handleTransitionComplete = () => {
    console.log('✅ ProductHero: PlayStationTransition завершён');
    setShowWelcome(false);
    setShowTransition(false);
  };

  // Свайп обработчики для мобильных
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      // Haptic feedback для iOS
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      setShowSwipeHint(false);
      setIsTransitioning(true);
      
      // Сброс автоматической смены
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      setTimeout(() => {
        if (isLeftSwipe) {
          setCurrentIndex((prev) => (prev + 1) % heroData.length);
        } else {
          setCurrentIndex((prev) => (prev - 1 + heroData.length) % heroData.length);
        }
        setIsTransitioning(false);
        
        // Перезапуск автоматической смены
        const newInterval = setInterval(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % heroData.length);
            setIsTransitioning(false);
          }, 100);
        }, 8000);
        intervalRef.current = newInterval;
      }, 100);
    }
  };

  if (showWelcome) {
    return (
      <>
        <WelcomeScreen onComplete={handleWelcomeComplete} />
        {showTransition && <PlayStationTransition isVisible={showTransition} onComplete={handleTransitionComplete} />}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobile ? 0.3 : 1.2, ease: [0.23, 1, 0.320, 1] }}
      className="relative h-screen md:h-[70vh] bg-gradient-to-br from-[#0B3C49] via-[#1A237E] to-[#2E2E2E] overflow-hidden"
      onTouchStart={isMobile ? onTouchStart : undefined}
      onTouchMove={isMobile ? onTouchMove : undefined}
      onTouchEnd={isMobile ? onTouchEnd : undefined}
    >
      {/* Динамический фоновый градиент */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-30 transition-all duration-1000 ease-out`}
        style={{
          transform: !isMobile ? `scale(${1 + Math.abs(mousePosition.x) * 0.05})` : 'none',
        }}
      />
      
      {/* Параллакс элементы */}
      <div className="absolute inset-0">
        {/* Основной световой эффект */}
        <motion.div
          animate={!isMobile ? {
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
            scale: 1 + Math.abs(mousePosition.x) * 0.1
          } : {}}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className={`absolute top-1/4 left-1/3 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl`}
          style={{
            backgroundColor: `${currentData.glowColor.replace('[', '').replace(']', '')}40`
          }}
        />
        
        {/* Дополнительные световые пятна */}
        <motion.div
          animate={!isMobile ? {
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
            rotate: mousePosition.x * 10
          } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`absolute bottom-1/4 right-1/3 w-48 h-48 md:w-64 md:h-64 rounded-full blur-2xl`}
          style={{
            backgroundColor: `${currentData.accentColor}33`
          }}
        />
        
        {/* Геометрические элементы */}
        <motion.div
          animate={!isMobile ? {
            x: mousePosition.x * 5,
            y: mousePosition.y * 5,
            rotate: mousePosition.x * 5
          } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute top-16 right-8 md:top-20 md:right-20 w-20 h-20 md:w-32 md:h-32 border border-white/20 rounded-lg rotate-12"
          style={{
            borderColor: `${currentData.accentColor}40`
          }}
        />
        
        <motion.div
          animate={!isMobile ? {
            x: mousePosition.x * -8,
            y: mousePosition.y * -8,
            rotate: mousePosition.x * -8
          } : {}}
          transition={{ type: "spring", stiffness: 180, damping: 30 }}
          className="absolute bottom-24 left-8 md:bottom-32 md:left-20 w-16 h-16 md:w-24 md:h-24 border border-white/5 rounded-full"
        />
      </div>

      {/* Навигация */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 xs:top-6 xs:left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3 bg-black/20 backdrop-blur-xl rounded-full text-white hover:bg-black/40 transition-all duration-300 group border border-white/10"
      >
        <Icon name="ChevronLeft" size={20} className="w-5 h-5 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-[15px] md:text-base">Назад</span>
      </motion.button>

      {/* Основной контент */}
      <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 h-full md:h-auto">
          <div className="grid lg:grid-cols-2 gap-0 md:gap-6 lg:gap-16 items-stretch md:items-center h-full md:h-auto">
            
            {/* Левая колонка - контент */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.320, 1] }}
              className="flex flex-col justify-end md:justify-center space-y-4 md:space-y-6 order-2 lg:order-1 pb-safe pt-4 md:pt-0 md:pb-0 h-[45vh] md:h-auto"
            >
              {/* Заголовок */}
              <div className="space-y-3 md:space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-[11px] md:text-sm font-medium text-white/80 border border-white/20"
                >
                  ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ
                </motion.div>
                
                <motion.h1
                  key={currentData.id}
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.8, ease: [0.23, 1, 0.320, 1] }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
                >
                  {currentData.title}
                </motion.h1>
                
                <motion.p
                  key={`${currentData.id}-desc`}
                  initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0 : 0.2, duration: isMobile ? 0.3 : 0.8 }}
                  className="text-sm xs:text-base sm:text-lg md:text-lg text-white/70 leading-relaxed max-w-lg md:max-w-none"
                >
                  {currentData.description}
                </motion.p>
              </div>

              {/* Особенности */}
              <motion.div
                key={`${currentData.id}-features`}
                initial={{ opacity: isMobile ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0.3 : 0.8 }}
                className="space-y-2 md:space-y-3"
              >
                {currentData.features.map((feature, index) => (
                  <motion.div
                    key={`${currentData.id}-feature-${index}`}
                    initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: isMobile ? 0 : 0.6 + index * 0.1, 
                      duration: isMobile ? 0.2 : 0.6,
                      ease: [0.23, 1, 0.320, 1]
                    }}
                    className="flex items-center gap-3 md:gap-4 px-3 py-2.5 md:p-4 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div 
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full shadow-lg`}
                      style={{
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      }}
                    />
                    <span className="text-white font-medium text-[13px] xs:text-sm sm:text-base md:text-base leading-tight">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Индикатор прогресса */}
              <motion.div
                initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 0 : 0.8, duration: isMobile ? 0.3 : 0.8 }}
                className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4"
              >
                <div className="flex gap-2">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 md:h-1 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? `w-10 md:w-12 shadow-lg` 
                          : 'w-3 md:w-4 bg-white/20'
                      }`}
                      style={index === currentIndex ? {
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      } : {}}
                    />
                  ))}
                </div>
                <span className="text-[13px] md:text-sm text-white/50 font-mono tabular-nums">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                </span>
              </motion.div>
            </motion.div>

            {/* Правая колонка - 3D модель */}
            <motion.div
              initial={{ opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.8, rotateY: isMobile ? 0 : 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: isMobile ? 0 : 0.5, duration: isMobile ? 0.3 : 1.2, ease: [0.23, 1, 0.320, 1] }}
              className="relative h-[55vh] xs:h-[50vh] sm:h-[45vh] md:h-[400px] lg:h-[500px] order-1 lg:order-2 flex items-center"
            >
              {/* 3D фоновые эффекты */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-30 rounded-3xl blur-2xl`}
                />
                
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className={`absolute inset-0 bg-${currentData.glowColor}-400/20 rounded-full blur-3xl`}
                />
              </div>
              
              {/* 3D модель с интеллектуальной загрузкой */}
              <div className="w-full h-full">
                <motion.div
                  key={currentData.id}
                  initial={{ opacity: isMobile ? 1 : 0, scale: 1, rotateX: 0 }}
                  animate={{ opacity: isTransitioning && isMobile ? 0.5 : 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: isMobile ? 0.2 : 1, ease: [0.23, 1, 0.320, 1] }}
                  className="relative w-full h-full"
                >
                  {/* 3D модель для всех устройств с оптимизированными настройками */}
                  <div className="w-full h-full relative">
                    {/* Индикатор загрузки */}
                    {!modelLoadStatus[currentData.modelUrl] && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
                          <p className="text-white/60 text-sm">Загрузка модели {currentData.series}...</p>
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
                        rotation-per-second="30deg"
                        camera-orbit="0deg 75deg 1.6m"
                        min-camera-orbit="auto auto 1.6m"
                        max-camera-orbit="auto auto 1.6m"
                        field-of-view="40deg"
                        exposure="1.2"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          borderRadius: '1rem',
                          '--progress-bar-color': 'transparent',
                          '--progress-mask': 'transparent',
                          pointerEvents: 'none'
                        }}
                        onLoad={() => {
                          console.log(`✅ ProductHero: Модель загружена ${currentData.series}`);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: true }));
                        }}
                        onError={(e: any) => {
                          console.error(`❌ ProductHero: Ошибка загрузки модели ${currentData.series}:`, e);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: false }));
                        }}
                      />
                    ) : (
                      <model-viewer
                        ref={modelRef}
                        src={currentData.modelUrl}
                        alt={currentData.title}
                        auto-rotate
                        auto-rotate-delay="0"
                        rotation-per-second="30deg"
                        camera-controls
                        camera-orbit="0deg 75deg 1.2m"
                        min-camera-orbit="auto auto 0.4m"
                        max-camera-orbit="auto auto 2.5m"
                        field-of-view="30deg"
                        exposure="1.2"
                        shadow-intensity="0.3"
                        environment-image="neutral"
                        interaction-prompt="none"
                        loading="eager"
                        reveal="auto"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'transparent',
                          borderRadius: '1rem',
                          '--progress-bar-color': 'transparent',
                          '--progress-mask': 'transparent'
                        }}
                        onLoad={() => {
                          console.log(`✅ ProductHero: Модель загружена ${currentData.series}`);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: true }));
                        }}
                        onError={(e: any) => {
                          console.error(`❌ ProductHero: Ошибка загрузки модели ${currentData.series}:`, e);
                          setModelLoadStatus(prev => ({ ...prev, [currentData.modelUrl]: false }));
                        }}
                      />
                    )}
                    
                    {/* Fallback для ошибки загрузки */}
                    {modelLoadStatus[currentData.modelUrl] === false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl">
                        <div className="text-center p-8">
                          <Icon name="Wifi" size={48} className="text-white/60 mx-auto mb-4" />
                          <p className="text-white/80 text-lg font-medium mb-2">Модель {currentData.series} недоступна</p>
                          <p className="text-white/60 text-sm">Проверьте подключение к сети</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Индикатор свайпа для мобильных */}
      {isMobile && showSwipeHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/40 text-[13px] bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
        >
          <Icon name="ChevronLeft" size={16} />
          <span>Свайпните для переключения</span>
          <Icon name="ChevronRight" size={16} />
        </motion.div>
      )}

      {/* Переходные эффекты */}
      {isTransitioning && !isMobile && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent origin-left"
        />
      )}
    </motion.div>
  );
};

export default ProductHero;