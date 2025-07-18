import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import ModelViewer3D from '@/components/ModelViewer3D';
import { useModelPreloader } from '@/hooks/useModelPreloader';
import WelcomeScreen from '@/components/WelcomeScreen';
import PlayStationTransition from '@/components/PlayStationTransition';

const heroData = [
  {
    id: 'IDS3530',
    title: 'Коммутаторы IDS3530',
    description: 'Промышленные коммутаторы для критически важных применений',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3530all.glb',
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
    title: 'Коммутаторы IDS3730',
    description: 'Высокопроизводительные коммутаторы для корпоративных сетей',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3730all.glb',
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
    title: 'Коммутаторы IDS4530',
    description: 'Модульные коммутаторы с расширенными возможностями',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/4530all.glb',
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
    title: 'Коммутаторы IDS6010',
    description: 'Высокопроизводительные коммутаторы для дата-центров',
    modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/6010all.glb',
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
  const { preloadModels, isModelReady } = useModelPreloader();

  // Отслеживание размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Предзагрузка моделей
  useEffect(() => {
    const allUrls = heroData.map(item => item.modelUrl);
    preloadModels(allUrls);
  }, [preloadModels]);

  // Автоматическая смена слайдов
  useEffect(() => {
    if (!showWelcome) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % heroData.length);
          setIsTransitioning(false);
        }, 500);
      }, 8000);
      
      intervalRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [showWelcome]);

  const currentData = heroData[currentIndex];

  const handleWelcomeComplete = () => {
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowWelcome(false);
    setShowTransition(false);
  };

  if (showWelcome) {
    return (
      <>
        <WelcomeScreen onComplete={handleWelcomeComplete} />
        <PlayStationTransition 
          isVisible={showTransition}
          onComplete={handleTransitionComplete}
        />
      </>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.320, 1] }}
      className="relative h-[70vh] md:h-[70vh] bg-gradient-to-br from-[#0B3C49] via-[#1A237E] to-[#2E2E2E] overflow-hidden"
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
        className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-black/20 backdrop-blur-xl rounded-full text-white hover:bg-black/40 transition-all duration-300 group border border-white/10"
      >
        <Icon name="ChevronLeft" size={18} className="md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm md:text-base">Назад</span>
      </motion.button>

      {/* Основной контент */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Левая колонка - контент */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.320, 1] }}
              className="space-y-4 md:space-y-6 order-2 lg:order-1"
            >
              {/* Заголовок */}
              <div className="space-y-2 md:space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="inline-block px-2.5 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-[10px] md:text-sm font-medium text-white/80 border border-white/20"
                >
                  ТЕЛЕКОММУНИКАЦИОННОЕ ОБОРУДОВАНИЕ
                </motion.div>
                
                <motion.h1
                  key={currentData.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
                  className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
                >
                  {currentData.title}
                </motion.h1>
                
                <motion.p
                  key={`${currentData.id}-desc`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-sm md:text-lg text-white/70 leading-relaxed"
                >
                  {currentData.description}
                </motion.p>
              </div>

              {/* Особенности */}
              <motion.div
                key={`${currentData.id}-features`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-1.5 md:space-y-3"
              >
                {currentData.features.map((feature, index) => (
                  <motion.div
                    key={`${currentData.id}-feature-${index}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.6 + index * 0.1, 
                      duration: 0.6,
                      ease: [0.23, 1, 0.320, 1]
                    }}
                    className="flex items-center gap-2.5 md:gap-4 p-2.5 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div 
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full shadow-lg`}
                      style={{
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      }}
                    />
                    <span className="text-white font-medium text-xs md:text-base">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Индикатор прогресса */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-2.5 md:gap-4 pt-2.5 md:pt-4"
              >
                <div className="flex gap-2">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-0.5 md:h-1 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? `w-8 md:w-12 shadow-lg` 
                          : 'w-2.5 md:w-4 bg-white/20'
                      }`}
                      style={index === currentIndex ? {
                        backgroundColor: currentData.glowColor.replace('[', '').replace(']', ''),
                        boxShadow: `0 0 10px ${currentData.glowColor.replace('[', '').replace(']', '')}80`
                      } : {}}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-white/50 font-mono">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                </span>
              </motion.div>
            </motion.div>

            {/* Правая колонка - 3D модель */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.320, 1] }}
              className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 lg:order-2"
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
              
              {/* Контейнер модели */}
              <motion.div
                key={currentData.id}
                initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.320, 1] }}
                className="relative w-full h-full"
                style={{
                  transform: !isMobile ? `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)` : 'none',
                  transformStyle: 'preserve-3d'
                }}
              >
                <ModelViewer3D 
                  src={currentData.modelUrl}
                  alt={currentData.title}
                  isPreloaded={isModelReady(currentData.modelUrl)}
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Переходные эффекты */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}
    </motion.div>
  );
};

export default ProductHero;