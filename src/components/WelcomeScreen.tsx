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

// Компонент космической сцены
const SpaceScene: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Туманности на заднем плане */}
      <Nebula />
      
      {/* Планета Земля */}
      <EarthPlanet />
      
      {/* Летающие звёзды */}
      <FloatingStars />
      
      {/* Спутники */}
      <Satellites />
      
      {/* Кометы */}
      <Comets />
      
      {/* Космический мусор */}
      <SpaceDebris />
      
      {/* Parallax эффект */}
      <ParallaxCamera />
    </div>
  );
};

// Туманности
const Nebula: React.FC = () => {
  const nebulae = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    x: Math.random() * 120 - 10,
    y: Math.random() * 120 - 10,
    size: 200 + Math.random() * 300,
    color: ['from-purple-500/20', 'from-blue-500/20', 'from-cyan-500/20'][i % 3],
    animationDelay: Math.random() * 5
  }));

  return (
    <>
      {nebulae.map((nebula) => (
        <motion.div
          key={nebula.id}
          className={`absolute rounded-full bg-gradient-radial ${nebula.color} to-transparent blur-xl`}
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: nebula.animationDelay,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

// Планета Земля
const EarthPlanet: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-40"
      style={{
        background: 'conic-gradient(from 0deg, #1e40af, #0ea5e9, #06b6d4, #10b981, #22c55e, #84cc16, #eab308, #f59e0b, #ef4444, #8b5cf6, #1e40af)',
        transform: 'translate(30%, 30%)',
        filter: 'blur(1px)',
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Атмосфера */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-blue-400/30 to-transparent scale-110" />
      
      {/* Облака */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 0%, transparent 40%)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

// Летающие звёзды
const FloatingStars: React.FC = () => {
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    speed: 0.5 + Math.random() * 1.5,
    direction: Math.random() * 360,
    opacity: 0.3 + Math.random() * 0.7
  }));

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
          animate={{
            x: [0, Math.cos(star.direction) * star.speed * 200],
            y: [0, Math.sin(star.direction) * star.speed * 200],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
          initial={{
            x: `${star.x}%`,
            y: `${star.y}%`,
          }}
        />
      ))}
    </>
  );
};

// Спутники
const Satellites: React.FC = () => {
  const satellites = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    orbitRadius: 150 + i * 80,
    speed: 8 + i * 2,
    size: 6 + i * 2,
    delay: i * 3
  }));

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {satellites.map((sat) => (
        <motion.div
          key={sat.id}
          className="absolute"
          style={{
            width: `${sat.orbitRadius * 2}px`,
            height: `${sat.orbitRadius * 2}px`,
            left: `-${sat.orbitRadius}px`,
            top: `-${sat.orbitRadius}px`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: sat.speed,
            repeat: Infinity,
            ease: "linear",
            delay: sat.delay
          }}
        >
          <div
            className="absolute bg-gradient-to-r from-cyan-400 to-blue-500 rounded-sm shadow-lg"
            style={{
              width: `${sat.size}px`,
              height: `${sat.size * 0.6}px`,
              top: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
            }}
          >
            {/* Антенна */}
            <div className="absolute w-0.5 h-3 bg-gray-300 -top-3 left-1/2 transform -translate-x-1/2" />
            
            {/* Солнечные панели */}
            <div className="absolute w-3 h-2 bg-blue-600 -left-4 top-1/2 transform -translate-y-1/2" />
            <div className="absolute w-3 h-2 bg-blue-600 -right-4 top-1/2 transform -translate-y-1/2" />
            
            {/* Мигающий индикатор */}
            <motion.div
              className="absolute w-1 h-1 bg-red-400 rounded-full top-1 right-1"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: sat.delay
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Кометы
const Comets: React.FC = () => {
  const comets = Array.from({ length: 2 }, (_, i) => ({
    id: i,
    startX: -50,
    startY: Math.random() * 100,
    endX: 150,
    endY: Math.random() * 100,
    duration: 8 + Math.random() * 4,
    delay: i * 6
  }));

  return (
    <>
      {comets.map((comet) => (
        <motion.div
          key={comet.id}
          className="absolute"
          initial={{
            x: `${comet.startX}%`,
            y: `${comet.startY}%`,
          }}
          animate={{
            x: `${comet.endX}%`,
            y: `${comet.endY}%`,
          }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            delay: comet.delay,
            ease: "easeOut"
          }}
        >
          {/* Ядро кометы */}
          <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
          
          {/* Хвост */}
          <div
            className="absolute w-20 h-0.5 bg-gradient-to-r from-white via-cyan-300 to-transparent blur-sm"
            style={{
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          
          {/* Внешний хвост */}
          <div
            className="absolute w-32 h-1 bg-gradient-to-r from-cyan-200/30 via-blue-200/20 to-transparent blur-md"
            style={{
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

// Космический мусор
const SpaceDebris: React.FC = () => {
  const debris = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    rotation: Math.random() * 360,
    speed: 0.3 + Math.random() * 0.7,
    opacity: 0.2 + Math.random() * 0.5
  }));

  return (
    <>
      {debris.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bg-gray-400 opacity-60"
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
            clipPath: 'polygon(0% 0%, 100% 25%, 75% 100%, 25% 75%)',
          }}
          animate={{
            rotate: [item.rotation, item.rotation + 360],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

// Parallax эффект камеры
const ParallaxCamera: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        x: [0, 10, 0, -10, 0],
        y: [0, -5, 0, 5, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Компонент спутникового загрузчика
const SatelliteLoader: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* Орбитальная траектория (тонкая) */}
      <div className="absolute inset-0 border border-blue-500/20 rounded-full" />
      
      {/* Вращающийся спутник */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {/* Основное тело спутника */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex items-center">
          <div className="w-4 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-sm shadow-lg shadow-cyan-400/50">
            {/* Антенна */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-cyan-300" />
            {/* Солнечные панели */}
            <div className="absolute top-0 -left-2 w-1.5 h-3 bg-blue-400/80 rounded-sm" />
            <div className="absolute top-0 -right-2 w-1.5 h-3 bg-blue-400/80 rounded-sm" />
            {/* Световой индикатор */}
            <motion.div
              className="absolute top-1 right-0.5 w-1 h-1 bg-cyan-300 rounded-full"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Центральная станция */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
          animate={{
            boxShadow: [
              "0 0 10px rgba(34, 211, 238, 0.5)",
              "0 0 20px rgba(34, 211, 238, 0.8)",
              "0 0 10px rgba(34, 211, 238, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Процент загрузки */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-base font-mono text-cyan-300 font-semibold mt-16"
          key={progress}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
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
              radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
            `
          }}
        >
          {/* Космическая сцена */}
          <SpaceScene />
          
          {/* Тонкая сетка */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
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
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em' }}
            >
              Добро пожаловать в{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                iDATA
              </motion.span>
            </motion.h1>
            
            {/* Спутниковый загрузчик */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <SatelliteLoader progress={loadingProgress} />
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
            >
              Промышленная сеть нового поколения
            </motion.p>
          </div>
          
          {/* Дополнительные световые эффекты */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;