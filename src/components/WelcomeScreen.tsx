import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
import { modelPreloader } from '@/utils/modelPreloader';
import { ModelCache } from '@/utils/modelCache';

interface WelcomeScreenProps {
  onComplete: () => void;
}

interface LoadingStage {
  id: string;
  text: string;
  duration: number;
}

const LOADING_STAGES: LoadingStage[] = [
  { id: 'connect', text: 'Установление защищённого соединения', duration: 2500 },
  { id: 'station', text: 'Подключение к центральной станции управления', duration: 2800 },
  { id: 'data', text: 'Получение данных о корпоративном оборудовании', duration: 3200 },
  { id: 'complete', text: 'Система готова к работе', duration: 1500 }
];

const TypewriterText = React.memo(({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="text-white/90 font-light">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-cyan-400"
      >
        |
      </motion.span>
    </span>
  );
});

TypewriterText.displayName = 'TypewriterText';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const heroData = useMemo(() => [
    { modelUrl: '/models/3530all.glb' },
    { modelUrl: '/models/3730all.glb' },
    { modelUrl: '/models/4530all.glb' },
    { modelUrl: '/models/6010all.glb' }
  ], []);

  const { isWelcomeLoadingComplete, loadingProgress } = useWelcomePreloader(heroData);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const preloadModels = useCallback(async () => {
    const modelUrls = heroData.map(item => item.modelUrl);
    console.log('🚀 WelcomeScreen: Начинаем кэширование моделей через ModelCache');
    
    try {
      // Используем ModelCache для кэширования моделей на 1 год
      await ModelCache.cacheModels((progress) => {
        console.log(`📦 WelcomeScreen: Прогресс кэширования: ${Math.round(progress)}%`);
        // Обновляем прогресс через существующую систему
      });
      
      console.log('✅ WelcomeScreen: Все модели закэшированы через ModelCache');
    } catch (error) {
      console.error('❌ WelcomeScreen: Ошибка кэширования через ModelCache:', error);
      
      // Fallback к старому методу предзагрузки если кэширование не удалось
      console.log('🔄 WelcomeScreen: Переключаемся на fallback предзагрузку');
      
      const preloadContainer = document.createElement('div');
      preloadContainer.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
      document.body.appendChild(preloadContainer);
      
      modelUrls.slice(0, 2).forEach((url, index) => {
        const viewer = document.createElement('model-viewer') as any;
        viewer.src = url;
        viewer.loading = 'eager';
        viewer.reveal = 'immediate';
        viewer.style.cssText = 'width:100%;height:100%;';
        viewer.setAttribute('cache-model', 'true');
        
        viewer.addEventListener('load', () => {
          console.log(`✅ WelcomeScreen: Fallback модель ${index + 1} загружена`);
        });
        
        preloadContainer.appendChild(viewer);
      });
      
      modelPreloader.preloadMultiple(modelUrls, 2);
      
      return () => {
        setTimeout(() => {
          preloadContainer.remove();
        }, 30000);
      };
    }
  }, [heroData]);

  useEffect(() => {
    return preloadModels();
  }, [preloadModels]);

  useEffect(() => {
    if (currentStageIndex < LOADING_STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStageIndex(currentStageIndex + 1);
      }, LOADING_STAGES[currentStageIndex].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStageIndex]);

  const handleComplete = useCallback(() => {
    if (!isComplete) {
      console.log('✅ WelcomeScreen: Загрузка завершена, запускаем выход');
      setIsComplete(true);
      setIsExiting(true);
      setTimeout(() => {
        console.log('🚀 WelcomeScreen: Вызываем onComplete');
        onComplete();
      }, 800);
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    if (isWelcomeLoadingComplete && loadingProgress >= 100) {
      handleComplete();
    }
  }, [isWelcomeLoadingComplete, loadingProgress, handleComplete]);

  useEffect(() => {
    console.log('⏰ WelcomeScreen: Запускаем fallback таймер на 12 секунд');
    const fallbackTimer = setTimeout(() => {
      console.log('⚠️ WelcomeScreen: Fallback таймер сработал');
      handleComplete();
    }, 12000);

    return () => {
      console.log('🧹 WelcomeScreen: Очищаем fallback таймер');
      clearTimeout(fallbackTimer);
    };
  }, [handleComplete]);

  const currentStage = LOADING_STAGES[currentStageIndex];

  const backgroundStyle = useMemo(() => ({
    background: `
      radial-gradient(ellipse 800px 600px at 20% 40%, rgba(59, 130, 246, 0.12) 0%, transparent 40%),
      radial-gradient(ellipse 600px 800px at 80% 60%, rgba(147, 51, 234, 0.08) 0%, transparent 45%),
      radial-gradient(ellipse 1000px 1000px at 50% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 50%),
      linear-gradient(180deg, #000000 0%, #0a0a1a 20%, #0f0f2e 50%, #0a0a1a 80%, #000000 100%)
    `,
    backgroundAttachment: 'fixed'
  }), []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: "blur(8px)"
          }}
          transition={{ 
            duration: isExiting ? 0.8 : 1.5,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8"
          style={backgroundStyle}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(34, 211, 238, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(34, 211, 238, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '80px 80px'],
                opacity: [0.03, 0.1, 0.03]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <div className="relative z-10 text-center w-full max-w-sm sm:max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ 
                duration: 1,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-8 sm:mb-12 leading-tight tracking-wider"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 200,
                textShadow: `
                  0 0 40px rgba(34, 211, 238, 0.4),
                  0 0 80px rgba(34, 211, 238, 0.2)
                `
              }}
            >
              <span className="block sm:inline">Добро пожаловать в{' '}</span>
              <motion.span
                className="relative inline-block"
              >
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 block sm:inline"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundSize: '200% 200%',
                    filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))'
                  }}
                >
                  iDATA
                </motion.span>
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="relative mb-8"
            >
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                {/* Орбитальные кольца */}
                <div className="absolute inset-2 border border-cyan-400/20 rounded-full"></div>
                <div className="absolute inset-4 border border-cyan-400/10 rounded-full"></div>
                
                {/* Земля в центре */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 rounded-full shadow-lg z-10"
                >
                  <div className="absolute inset-1 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-80"></div>
                  <div className="absolute top-1 left-1.5 w-1 h-1 bg-green-300 rounded-full opacity-60"></div>
                  <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-green-300 rounded-full opacity-60"></div>
                </motion.div>
          
                {/* Спутник на орбите */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Корпус спутника */}
                      <div className="w-1.5 h-1.5 bg-gradient-to-br from-gray-300 to-gray-500 rounded-sm shadow-lg relative">
                        {/* Солнечные панели */}
                        <div className="absolute -left-0.5 top-0 w-0.5 h-1.5 bg-blue-400 opacity-80"></div>
                        <div className="absolute -right-0.5 top-0 w-0.5 h-1.5 bg-blue-400 opacity-80"></div>
                        {/* Антенна */}
                        <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-white -translate-x-0.5 -translate-y-0.5"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
          
                {/* Прогресс в центре */}
                <div className="text-center relative z-20">
                  <motion.div
                    className="text-lg font-bold text-white mb-1"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.round(loadingProgress)}%
                  </motion.div>
                  <div className="w-16 h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      style={{ width: `${loadingProgress}%` }}
                      transition={{ type: "spring", damping: 20 }}
                    />
                  </div>
                </div>
          
                {/* Световые эффекты */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg"
                ></motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-sm sm:text-base md:text-lg mb-6 h-8 sm:h-10 flex items-center justify-center px-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <TypewriterText text={currentStage.text} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1,
                delay: 1.8
              }}
              className="text-gray-300/70 text-xs sm:text-sm font-light tracking-[0.15em] uppercase px-4"
              style={{ 
                textShadow: '0 2px 20px rgba(156, 163, 175, 0.2)'
              }}
            >
              Корпоративная сеть нового поколения
            </motion.p>
          </div>
          
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <motion.div 
              className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" 
              animate={{
                x: [-30, 30, -30],
                y: [-20, 20, -20],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-cyan-400/8 rounded-full blur-3xl" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
              animate={{
                x: [30, -30, 30],
                y: [20, -20, 20],
                scale: [1.1, 1, 1.1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-purple-400/6 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;