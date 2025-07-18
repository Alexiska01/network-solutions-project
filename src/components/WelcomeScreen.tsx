import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
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
  { id: 'connect', text: 'Установление защищённого соединения', duration: 3000 },
  { id: 'station', text: 'Подключение к центральной станции управления', duration: 4000 },
  { id: 'data', text: 'Получение данных о корпоративном оборудовании', duration: 5000 },
  { id: 'complete', text: 'Система готова к работе', duration: 2000 }
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const heroData = [
    { modelUrl: 'https://idatascan.ru/models/3530.glb' },
    { modelUrl: 'https://idatascan.ru/models/3730.glb' },
    { modelUrl: 'https://idatascan.ru/models/4530.glb' },
    { modelUrl: 'https://idatascan.ru/models/6010.glb' }
  ];

  const { isWelcomeLoadingComplete, loadingProgress } = useWelcomePreloader(heroData);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

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
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-8"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.18) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.12) 0%, transparent 60%),
              linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f0f2e 75%, #0a0a0a 100%)
            `
          }}
        >
          {/* 3D звездное поле */}
          <StarField3D />
          
          {/* Космические объекты */}
          <CosmicObjects />
          
          {/* Кинематографичная сетка - адаптивная */}
          <motion.div 
            className="absolute inset-0 opacity-3"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px),
                linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: typeof window !== 'undefined' && window.innerWidth < 768 
                ? '40px 40px, 40px 40px, 10px 10px, 10px 10px'
                : '120px 120px, 120px 120px, 30px 30px, 30px 30px'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 30, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Основной контент */}
          <div className="relative z-10 text-center w-full max-w-sm sm:max-w-2xl">
            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 sm:mb-12 leading-tight"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif', 
                letterSpacing: '0.05em',
                textShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
              }}
            >
              <span className="block sm:inline">Добро пожаловать в{' '}</span>
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 block sm:inline"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))'
                }}
              >
                iDATA
              </motion.span>
            </motion.h1>
            
            {/* 3D спутниковый загрузчик */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Satellite3D progress={loadingProgress} />
            </motion.div>
            
            {/* Статус загрузки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-sm sm:text-base md:text-lg mb-4 h-8 sm:h-10 flex items-center justify-center px-4"
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
            
            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-gray-400 text-xs sm:text-sm font-mono px-4"
              style={{ textShadow: '0 0 10px rgba(156, 163, 175, 0.5)' }}
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
            {/* Мягкие световые пятна - супер минимальные на мобильных */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 bg-blue-500/8 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 xl:w-[600px] xl:h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            
            {/* Динамические лучи */}
            <motion.div
              className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
              animate={{ opacity: [0, typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 0.8, 0] }}
              transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"
              animate={{ opacity: [0, typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 0.8, 0] }}
              transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 6, repeat: Infinity, delay: typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;