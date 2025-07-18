import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';

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

// Кинематографичное звездное поле с оптимизацией
const StarField3D: React.FC = () => {
  const stars = useMemo(() => {
    // Оптимальное количество звезд - увеличиваем только мобильную версию
    const starCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 300;
    return Array.from({ length: starCount }, (_, i) => {
      const depth = Math.random();
      const brightness = 1 - depth * 0.4;
      const size = (1 - depth) * 5 + 0.5;
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        depth,
        size,
        brightness,
        twinkleSpeed: 1.5 + Math.random() * 4,
        twinkleDelay: Math.random() * 8,
        color: depth > 0.8 ? 'blue' : depth > 0.5 ? 'cyan' : 'white',
        parallaxSpeed: 0.3 + depth * 1.5,
        pulseIntensity: 0.5 + Math.random() * 0.5
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => {
        const getStarColor = () => {
          switch(star.color) {
            case 'blue': return '#3b82f6';
            case 'cyan': return '#22d3ee';
            case 'white': return '#ffffff';
            default: return '#ffffff';
          }
        };
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: `radial-gradient(circle, ${getStarColor()}, transparent)`,
              filter: `blur(${star.depth * 0.8}px)`,
              boxShadow: `0 0 ${star.size * 6}px ${getStarColor()}60`
            }}
            animate={{
              opacity: [star.brightness * 0.2, star.brightness * star.pulseIntensity, star.brightness * 0.2],
              scale: [0.4, 1.4, 0.4],
              x: [0, star.parallaxSpeed * 15, 0],
              y: [0, star.parallaxSpeed * 8, 0]
            }}
            transition={{
              duration: star.twinkleSpeed * (typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 1.5),
              repeat: Infinity,
              delay: star.twinkleDelay,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

// 3D планеты и астероиды


const CosmicObjects: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">


      {/* Астероидное поле - больше звезд только на мобильных */}
      {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${80 + (i % 3) * 5}%`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            boxShadow: '0 0 10px rgba(156, 163, 175, 0.5)'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            rotate: 360
          }}
          transition={{
            duration: (typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 10) + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * (typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 0.8)
          }}
        />
      ))}

      {/* Туманность */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-20"
        style={{
          background: 'radial-gradient(ellipse, #ec4899, #8b5cf6, transparent)',
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Детализированный 3D спутник - оптимизированный для мобильных
const Satellite3D: React.FC<{ progress: number }> = ({ progress }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto mb-4 sm:mb-6 md:mb-8">
      {/* Основная орбита */}
      <div className="absolute inset-0 border border-cyan-500/30 rounded-full" />
      <div className="absolute inset-1 sm:inset-2 border border-cyan-400/20 rounded-full" />
      
      {/* Вращающийся спутник - оптимизированный для плавности */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: isMobile ? 8 : 6, 
          repeat: Infinity, 
          ease: "linear"
        }}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <div className="absolute -top-1 sm:-top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
          {/* Основной корпус */}
          <div className="relative">
            <div 
              className="w-3 h-4 sm:w-4 sm:h-6 md:w-6 md:h-8 rounded-sm"
              style={{
                background: 'linear-gradient(145deg, #22d3ee, #0891b2)',
                boxShadow: isMobile ? '0 2px 4px rgba(34, 211, 238, 0.3)' : '0 4px 8px rgba(34, 211, 238, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {/* Детали корпуса - супер минимальные */}
              <div className="absolute top-0.5 left-0.5 w-2 h-px sm:w-3 sm:h-0.5 md:w-4 md:h-1 bg-cyan-300/60 rounded-sm" />
              <div className="absolute top-1.5 sm:top-2 md:top-3 left-0.5 w-2 h-px sm:w-3 sm:h-0.5 md:w-4 md:h-1 bg-cyan-300/40 rounded-sm" />
              <div className="absolute bottom-0.5 left-0.5 w-2 h-px sm:w-3 sm:h-0.5 md:w-4 md:h-1 bg-cyan-300/60 rounded-sm" />
            </div>
            
            {/* Антенна параболическая - супер мини */}
            <div className="absolute -top-1.5 sm:-top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border border-cyan-300"
                style={{
                  background: 'radial-gradient(circle, transparent 40%, #22d3ee 41%, #22d3ee 60%, transparent 61%)'
                }}
              />
              <div className="absolute top-0.5 sm:top-1 md:top-2 left-1/2 transform -translate-x-1/2 w-px sm:w-0.5 h-1 sm:h-2 md:h-4 bg-cyan-300" />
            </div>
            
            {/* Солнечные панели - супер мини */}
            <div className="absolute top-0 -left-1.5 sm:-left-2 md:-left-4 w-1.5 h-4 sm:w-2 sm:h-6 md:w-3 md:h-8 transform perspective-1000">
              <div 
                className="w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(45deg, #1e40af, #3b82f6, #1e40af)',
                  boxShadow: isMobile ? '-1px 0 2px rgba(0,0,0,0.2)' : '-2px 0 4px rgba(0,0,0,0.3), inset 0 0 2px rgba(59, 130, 246, 0.5)',
                  transform: 'rotateY(-15deg)'
                }}
              >
                {!isMobile && (
                  <div className="absolute inset-0.5 sm:inset-1 border border-blue-300/30 rounded-sm grid grid-cols-1 gap-0.5">
                    {Array.from({ length: 2 }, (_, i) => (
                      <div key={i} className="bg-blue-400/20 rounded-sm" />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute top-0 -right-1.5 sm:-right-2 md:-right-4 w-1.5 h-4 sm:w-2 sm:h-6 md:w-3 md:h-8 transform perspective-1000">
              <div 
                className="w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(45deg, #1e40af, #3b82f6, #1e40af)',
                  boxShadow: isMobile ? '1px 0 2px rgba(0,0,0,0.2)' : '2px 0 4px rgba(0,0,0,0.3), inset 0 0 2px rgba(59, 130, 246, 0.5)',
                  transform: 'rotateY(15deg)'
                }}
              >
                {!isMobile && (
                  <div className="absolute inset-0.5 sm:inset-1 border border-blue-300/30 rounded-sm grid grid-cols-1 gap-0.5">
                    {Array.from({ length: 2 }, (_, i) => (
                      <div key={i} className="bg-blue-400/20 rounded-sm" />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Световые индикаторы - минимальные */}
            <motion.div
              className="absolute top-0.5 right-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 bg-green-400 rounded-full"
              animate={{
                opacity: [1, 0.3, 1],
                boxShadow: isMobile ? ['0 0 2px #22c55e', '0 0 4px #22c55e', '0 0 2px #22c55e'] : ['0 0 4px #22c55e', '0 0 8px #22c55e', '0 0 4px #22c55e']
              }}
              transition={{ duration: isMobile ? 3 : 2, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute bottom-0.5 right-0.5 w-px h-px sm:w-0.5 sm:h-0.5 md:w-1 md:h-1 bg-red-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                boxShadow: isMobile ? ['0 0 1px #ef4444', '0 0 3px #ef4444', '0 0 1px #ef4444'] : ['0 0 2px #ef4444', '0 0 6px #ef4444', '0 0 2px #ef4444']
              }}
              transition={{ duration: isMobile ? 4 : 2.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Центральная станция - минимальная */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #22d3ee, #0891b2)',
            boxShadow: isMobile ? '0 0 10px rgba(34, 211, 238, 0.5)' : '0 0 20px rgba(34, 211, 238, 0.6), inset 0 2px 4px rgba(255,255,255,0.3)'
          }}
          animate={{
            boxShadow: isMobile ? [
              '0 0 10px rgba(34, 211, 238, 0.5)',
              '0 0 15px rgba(34, 211, 238, 0.7)',
              '0 0 10px rgba(34, 211, 238, 0.5)'
            ] : [
              '0 0 20px rgba(34, 211, 238, 0.6)',
              '0 0 30px rgba(34, 211, 238, 0.8)',
              '0 0 20px rgba(34, 211, 238, 0.6)'
            ]
          }}
          transition={{ duration: isMobile ? 4 : 3, repeat: Infinity }}
        >
          {/* Детали станции - только для десктопа */}
          {!isMobile && (
            <>
              <div className="absolute inset-0.5 sm:inset-1 border border-cyan-300/50 rounded-full" />
              <div className="absolute top-1 left-1 w-2 h-2 sm:top-2 sm:left-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-cyan-300/30 rounded-full" />
            </>
          )}
        </motion.div>
      </div>
      
      {/* Процент загрузки - уменьшенный */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xs sm:text-base md:text-xl font-mono text-cyan-300 font-bold mt-12 sm:mt-16 md:mt-20"
          style={{ textShadow: isMobile ? '0 0 5px #22d3ee' : '0 0 10px #22d3ee' }}
          key={progress}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: isMobile ? 0.2 : 0.3 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
      
      {/* Сигнальные волны - оптимизированные */}
      <motion.div
        className="absolute inset-0 border border-cyan-400/20 rounded-full"
        animate={{
          scale: [1, isMobile ? 1.2 : 1.4],
          opacity: [isMobile ? 0.3 : 0.4, 0]
        }}
        transition={{
          duration: isMobile ? 4 : 3,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      
      <motion.div
        className="absolute inset-0 border border-cyan-400/20 rounded-full"
        animate={{
          scale: [1, isMobile ? 1.1 : 1.2],
          opacity: [isMobile ? 0.15 : 0.2, 0]
        }}
        transition={{
          duration: isMobile ? 4 : 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: isMobile ? 1.5 : 1
        }}
      />
    </div>
  );
};

// Компонент текста с эффектом печати
const TypewriterText: React.FC<{ text: string; onComplete?: () => void }> = ({ 
  text, 
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className="font-mono text-cyan-300 text-center leading-relaxed">
      {displayedText}
      <motion.span
        className="inline-block w-1.5 h-4 sm:w-2 sm:h-5 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 1.5, repeat: Infinity }}
      />
    </span>
  );
};

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
      }, 2000); // Увеличиваем время для плавного перехода
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
            ease: [0.25, 0.1, 0.25, 1] // PlayStation-style easing
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