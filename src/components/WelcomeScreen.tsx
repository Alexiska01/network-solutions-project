import React, { useState, useEffect } from 'react';
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
  { id: 'data', text: 'Получение данных о сетевом оборудовании', duration: 5000 },
  { id: 'complete', text: 'Система готова к работе', duration: 2000 }
];

// Гармоничное звездное поле под стилизованную Землю
const StarField3D: React.FC = () => {
  const stars = Array.from({ length: 120 }, (_, i) => {
    const depth = Math.random();
    const brightness = 1 - depth * 0.6;
    const size = (1 - depth) * 2.5 + 0.3;
    
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      depth,
      size,
      brightness,
      twinkleSpeed: 3 + Math.random() * 3,
      twinkleDelay: Math.random() * 4,
      color: depth > 0.6 ? 'emerald' : depth > 0.3 ? 'teal' : 'green'
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => {
        const getStarColor = () => {
          switch(star.color) {
            case 'emerald': return '#10b981';
            case 'teal': return '#14b8a6';
            case 'green': return '#22c55e';
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
              filter: `blur(${star.depth * 0.3}px)`,
              boxShadow: `0 0 ${star.size * 3}px ${getStarColor()}30`
            }}
            animate={{
              opacity: [star.brightness * 0.4, star.brightness * 0.9, star.brightness * 0.4],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: star.twinkleSpeed,
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
// Стилизованная 3D Земля в современном дизайне
const Earth: React.FC = () => {
  return (
    <div className="absolute top-20 right-20 w-32 h-32" style={{ zIndex: 2 }}>
      {/* Основа Земли */}
      <motion.div
        className="absolute w-full h-full rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, #4ade80 0%, #22c55e 25%, #16a34a 50%, #15803d 75%, #166534 100%)
          `,
          boxShadow: `
            inset -8px -8px 16px rgba(0,0,0,0.2),
            inset 8px 8px 16px rgba(255,255,255,0.1),
            0 0 40px 8px rgba(34, 197, 94, 0.15)
          `
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Континенты */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute w-8 h-12 rounded-full opacity-40"
            style={{
              background: '#166534',
              top: '20%',
              left: '25%',
              transform: 'rotate(15deg)'
            }}
            animate={{ rotate: [15, 375] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-6 h-8 rounded-full opacity-40"
            style={{
              background: '#15803d',
              top: '40%',
              right: '20%',
              transform: 'rotate(-20deg)'
            }}
            animate={{ rotate: [-20, 340] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-4 h-6 rounded-full opacity-40"
            style={{
              background: '#166534',
              bottom: '25%',
              left: '30%',
              transform: 'rotate(45deg)'
            }}
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Облака */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute w-6 h-3 rounded-full bg-white/20 top-1/4 left-1/3" />
          <div className="absolute w-4 h-2 rounded-full bg-white/15 top-1/2 right-1/4" />
          <div className="absolute w-5 h-2 rounded-full bg-white/20 bottom-1/3 left-1/4" />
        </motion.div>
        
        {/* Атмосферный блик */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 40%)',
            mixBlendMode: 'overlay'
          }}
        />
      </motion.div>
      
      {/* Атмосферный ореол */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, transparent 50%, rgba(34, 197, 94, 0.1) 52%, rgba(34, 197, 94, 0.05) 60%, transparent 70%)',
          scale: 1.3
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1.3, 1.35, 1.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

const CosmicObjects: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Реалистичная Земля */}
      <Earth />

      {/* Астероидное поле */}
      {Array.from({ length: 12 }, (_, i) => (
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
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
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
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Детализированный 3D спутник
const Satellite3D: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-40 h-40 mx-auto mb-8">
      {/* Основная орбита */}
      <div className="absolute inset-0 border border-cyan-500/30 rounded-full" />
      <div className="absolute inset-2 border border-cyan-400/20 rounded-full" />
      
      {/* Вращающийся спутник */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          {/* Основной корпус */}
          <div className="relative">
            <div 
              className="w-6 h-8 rounded-sm"
              style={{
                background: 'linear-gradient(145deg, #22d3ee, #0891b2)',
                boxShadow: '0 4px 8px rgba(34, 211, 238, 0.4), inset 0 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {/* Детали корпуса */}
              <div className="absolute top-1 left-1 w-4 h-1 bg-cyan-300/60 rounded-sm" />
              <div className="absolute top-3 left-1 w-4 h-1 bg-cyan-300/40 rounded-sm" />
              <div className="absolute bottom-1 left-1 w-4 h-1 bg-cyan-300/60 rounded-sm" />
            </div>
            
            {/* Антенна параболическая */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-cyan-300"
                style={{
                  background: 'radial-gradient(circle, transparent 40%, #22d3ee 41%, #22d3ee 60%, transparent 61%)'
                }}
              />
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-cyan-300" />
            </div>
            
            {/* Солнечные панели с 3D эффектом */}
            <div className="absolute top-0 -left-4 w-3 h-8 transform perspective-1000">
              <div 
                className="w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(45deg, #1e40af, #3b82f6, #1e40af)',
                  boxShadow: '-2px 0 4px rgba(0,0,0,0.3), inset 0 0 2px rgba(59, 130, 246, 0.5)',
                  transform: 'rotateY(-15deg)'
                }}
              >
                <div className="absolute inset-1 border border-blue-300/30 rounded-sm grid grid-cols-1 gap-0.5">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-blue-400/20 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 -right-4 w-3 h-8 transform perspective-1000">
              <div 
                className="w-full h-full rounded-sm"
                style={{
                  background: 'linear-gradient(45deg, #1e40af, #3b82f6, #1e40af)',
                  boxShadow: '2px 0 4px rgba(0,0,0,0.3), inset 0 0 2px rgba(59, 130, 246, 0.5)',
                  transform: 'rotateY(15deg)'
                }}
              >
                <div className="absolute inset-1 border border-blue-300/30 rounded-sm grid grid-cols-1 gap-0.5">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-blue-400/20 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Световые индикаторы */}
            <motion.div
              className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-400 rounded-full"
              animate={{
                opacity: [1, 0.3, 1],
                boxShadow: ['0 0 4px #22c55e', '0 0 8px #22c55e', '0 0 4px #22c55e']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <motion.div
              className="absolute bottom-1 right-1 w-1 h-1 bg-red-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                boxShadow: ['0 0 2px #ef4444', '0 0 6px #ef4444', '0 0 2px #ef4444']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Центральная станция с деталями */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #22d3ee, #0891b2)',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.6), inset 0 2px 4px rgba(255,255,255,0.3)'
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 211, 238, 0.6)',
              '0 0 40px rgba(34, 211, 238, 0.9)',
              '0 0 20px rgba(34, 211, 238, 0.6)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Детали станции */}
          <div className="absolute inset-1 border border-cyan-300/50 rounded-full" />
          <div className="absolute top-2 left-2 w-4 h-4 bg-cyan-300/30 rounded-full" />
        </motion.div>
      </div>
      
      {/* Процент загрузки */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xl font-mono text-cyan-300 font-bold mt-20"
          style={{ textShadow: '0 0 10px #22d3ee' }}
          key={progress}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
      
      {/* Сигнальные волны */}
      <motion.div
        className="absolute inset-0 border border-cyan-400/20 rounded-full"
        animate={{
          scale: [1, 1.5],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      
      <motion.div
        className="absolute inset-0 border border-cyan-400/20 rounded-full"
        animate={{
          scale: [1, 1.3],
          opacity: [0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
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
      }, 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className="font-mono text-cyan-300">
      {displayedText}
      <motion.span
        className="inline-block w-2 h-5 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
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
      }, 1000);
    }
  }, [isWelcomeLoadingComplete, loadingProgress, onComplete]);

  const currentStage = LOADING_STAGES[currentStageIndex];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 70%, #0a0a0a 100%)
            `
          }}
        >
          {/* 3D звездное поле */}
          <StarField3D />
          
          {/* Космические объекты */}
          <CosmicObjects />
          
          {/* Профессиональная сетка в зеленых тонах */}
          <div 
            className="absolute inset-0 opacity-4"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
            }}
          />
          
          {/* Основной контент */}
          <div className="relative z-10 text-center px-8 max-w-2xl">
            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-6xl font-light text-white mb-12"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif', 
                letterSpacing: '0.05em',
                textShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
              }}
            >
              Добро пожаловать в{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.7))'
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
              className="text-lg mb-4 h-8 flex items-center justify-center"
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
              className="text-gray-400 text-sm font-mono"
              style={{ textShadow: '0 0 10px rgba(156, 163, 175, 0.5)' }}
            >
              Промышленная сеть нового поколения
            </motion.p>
          </div>
          
          {/* Продвинутые световые эффекты */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            {/* Мягкие световые пятна */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
            
            {/* Динамические лучи */}
            <motion.div
              className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;