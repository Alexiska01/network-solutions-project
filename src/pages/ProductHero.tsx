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
    gradient: 'from-blue-600 via-cyan-500 to-purple-600',
    glowColor: 'blue'
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
    gradient: 'from-purple-600 via-pink-500 to-red-600',
    glowColor: 'purple'
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
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
    glowColor: 'emerald'
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
    gradient: 'from-orange-600 via-red-500 to-pink-600',
    glowColor: 'orange'
  }
];

const ProductHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { preloadModels, isModelReady } = useModelPreloader();

  // Трекинг мыши для параллакс эффектов
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      className="relative h-[70vh] bg-black overflow-hidden"
    >
      {/* Динамический фоновый градиент */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-20 transition-all duration-1000 ease-out`}
        style={{
          transform: `scale(${1 + Math.abs(mousePosition.x) * 0.05})`,
        }}
      />
      
      {/* Параллакс элементы */}
      <div className="absolute inset-0">
        {/* Основной световой эффект */}
        <motion.div
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
            scale: 1 + Math.abs(mousePosition.x) * 0.1
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className={`absolute top-1/4 left-1/3 w-96 h-96 bg-${currentData.glowColor}-500/30 rounded-full blur-3xl`}
        />
        
        {/* Дополнительные световые пятна */}
        <motion.div
          animate={{
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
            rotate: mousePosition.x * 10
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`absolute bottom-1/4 right-1/3 w-64 h-64 bg-${currentData.glowColor}-400/20 rounded-full blur-2xl`}
        />
        
        {/* Геометрические элементы */}
        <motion.div
          animate={{
            x: mousePosition.x * 5,
            y: mousePosition.y * 5,
            rotate: mousePosition.x * 5
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-lg rotate-12"
        />
        
        <motion.div
          animate={{
            x: mousePosition.x * -8,
            y: mousePosition.y * -8,
            rotate: mousePosition.x * -8
          }}
          transition={{ type: "spring", stiffness: 180, damping: 30 }}
          className="absolute bottom-32 left-20 w-24 h-24 border border-white/5 rounded-full"
        />
      </div>

      {/* Навигация */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 z-50 flex items-center gap-3 px-6 py-3 bg-black/20 backdrop-blur-xl rounded-full text-white hover:bg-black/40 transition-all duration-300 group border border-white/10"
      >
        <Icon name="ChevronLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Назад</span>
      </motion.button>

      {/* Основной контент */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Левая колонка - контент */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.320, 1] }}
              className="space-y-6"
            >
              {/* Заголовок */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/80 border border-white/20"
                >
                  ПРОФЕССИОНАЛЬНОЕ ОБОРУДОВАНИЕ
                </motion.div>
                
                <motion.h1
                  key={currentData.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
                  className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight"
                >
                  {currentData.title}
                </motion.h1>
                
                <motion.p
                  key={`${currentData.id}-desc`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-lg text-white/70 leading-relaxed"
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
                className="space-y-3"
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
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`w-3 h-3 bg-${currentData.glowColor}-400 rounded-full shadow-lg shadow-${currentData.glowColor}-400/50`} />
                    <span className="text-white font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Индикатор прогресса */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex gap-2">
                  {heroData.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? `w-12 bg-${currentData.glowColor}-400 shadow-lg shadow-${currentData.glowColor}-400/50` 
                          : 'w-4 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/50 font-mono">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(heroData.length).padStart(2, '0')}
                </span>
              </motion.div>
            </motion.div>

            {/* Правая колонка - 3D модель */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.320, 1] }}
              className="relative h-[350px] lg:h-[400px]"
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
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
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