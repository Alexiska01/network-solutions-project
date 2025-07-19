import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
import { modelPreloader } from '@/utils/modelPreloader';
import StarField3D from './StarField3D';
import CosmicObjects from './CosmicObjects';
import Satellite3D from './Satellite3D';
import TypewriterText from './TypewriterText';

interface WelcomeScreenProps {
  onComplete: () => void;
}

interface LoadingStage {
  id: string;
  text: string;
  duration: number;
}

const LOADING_STAGES: LoadingStage[] = [
  { id: 'connect', text: 'Установление защищённого соединения', duration: 3500 },
  { id: 'station', text: 'Подключение к центральной станции управления', duration: 4000 },
  { id: 'data', text: 'Получение данных о корпоративном оборудовании', duration: 5000 },
  { id: 'complete', text: 'Система готова к работе', duration: 2500 }
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const heroData = [
    { modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3530all.glb' },
    { modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/3730all.glb' },
    { modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/4530all.glb' },
    { modelUrl: 'https://s3.twcstorage.ru/c80bd43d-3dmodels/6010all.glb' }
  ];

  const { isWelcomeLoadingComplete, loadingProgress } = useWelcomePreloader(heroData);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  // Запускаем предзагрузку моделей сразу при монтировании
  useEffect(() => {
    const modelUrls = heroData.map(item => item.modelUrl);
    
    // Приоритетная загрузка первых двух моделей (3530 и 3730)
    modelPreloader.preloadMultiple(modelUrls, 2).then(() => {
      console.log('✅ WelcomeScreen: Модели предзагружены');
    });
    
    return () => {
      // Не очищаем модели при размонтировании, они понадобятся в ProductHero
    };
  }, []);

  useEffect(() => {
    if (currentStageIndex < LOADING_STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStageIndex(currentStageIndex + 1);
      }, LOADING_STAGES[currentStageIndex].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStageIndex]);

  useEffect(() => {
    if (isWelcomeLoadingComplete && loadingProgress >= 100) {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [isWelcomeLoadingComplete, loadingProgress, onComplete]);

  const currentStage = LOADING_STAGES[currentStageIndex];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px) brightness(2)"
          }}
          transition={{ 
            duration: 2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 20% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
              radial-gradient(ellipse 600px 800px at 80% 60%, rgba(147, 51, 234, 0.12) 0%, transparent 45%),
              radial-gradient(ellipse 1000px 1000px at 50% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
              linear-gradient(180deg, #000000 0%, #0a0a1a 20%, #0f0f2e 50%, #0a0a1a 80%, #000000 100%)
            `,
            backgroundAttachment: 'fixed'
          }}
        >
          {/* 3D звездное поле */}
          <StarField3D />
          
          {/* Космические объекты */}
          <CosmicObjects />
          
          {/* Кинематографичная сетка PS5 стиль */}
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
                  linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '80px 80px'],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(147, 51, 234, 0.05) 25%, transparent 25%),
                  linear-gradient(-45deg, rgba(147, 51, 234, 0.05) 25%, transparent 25%)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px'
              }}
              animate={{
                opacity: [0, 0.3, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>
          
          {/* Основной контент */}
          <div className="relative z-10 text-center w-full max-w-sm sm:max-w-2xl">
            {/* Заголовок PS5 стиль */}
            <motion.h1
              initial={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 sm:mb-12 leading-tight tracking-wider"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 200,
                textShadow: `
                  0 0 40px rgba(34, 211, 238, 0.5),
                  0 0 80px rgba(34, 211, 238, 0.3),
                  0 0 120px rgba(34, 211, 238, 0.1)
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
                    filter: 'drop-shadow(0 0 30px rgba(34, 211, 238, 0.6))'
                  }}
                >
                  iDATA
                </motion.span>
                <motion.div
                  className="absolute inset-0 blur-xl"
                  animate={{
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.4), rgba(147, 51, 234, 0.4))',
                    zIndex: -1
                  }}
                />
              </motion.span>
            </motion.h1>
            
            {/* 3D спутниковый загрузчик PS5 стиль */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent 70%)',
                  transform: 'scale(1.5)'
                }}
              />
              <Satellite3D progress={loadingProgress} />
            </motion.div>
            
            {/* Статус загрузки PS5 стиль */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ 
                duration: 0.8, 
                delay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-sm sm:text-base md:text-lg mb-6 h-10 sm:h-12 flex items-center justify-center px-4 relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <TypewriterText text={currentStage.text} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Подзаголовок PS5 стиль */}
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-gray-300/80 text-xs sm:text-sm font-light tracking-[0.2em] uppercase px-4"
              style={{ 
                textShadow: '0 2px 20px rgba(156, 163, 175, 0.3)',
                letterSpacing: '0.15em'
              }}
            >
              Корпоративная сеть нового поколения
            </motion.p>
          </div>
          
          {/* Продвинутые световые эффекты */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            {/* Кинематографичные световые эффекты PS5 */}
            <motion.div 
              className="absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96" 
              animate={{
                x: [-50, 50, -50],
                y: [-30, 30, -30],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-cyan-400/10 rounded-full blur-3xl" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96"
              animate={{
                x: [50, -50, 50],
                y: [30, -30, 30],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-purple-400/8 rounded-full blur-3xl" />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem]"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />
            </motion.div>
            
            {/* Кинематографичные лучи PS5 */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-[2px] h-full"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(34, 211, 238, 0.3) 50%, transparent 100%)',
                  filter: 'blur(1px)'
                }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scaleY: [0.5, 1, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-0 h-[2px] w-full"
                style={{
                  background: 'linear-gradient(to right, transparent 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%)',
                  filter: 'blur(1px)'
                }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scaleX: [0.5, 1, 0.5]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;