import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

const LOADING_PHASES = [
  { text: "Инициализация защищенного соединения...", duration: 3000 },
  { text: "Загрузка данных сетевого оборудования...", duration: 4000 },
  { text: "Подключение к системе управления...", duration: 3500 },
  { text: "Подготовка интерфейса...", duration: 2500 },
  { text: "Система готова к работе", duration: 2000 }
];

const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

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

export default function WelcomeScreenEnhanced({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isHyperspace, setIsHyperspace] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  console.log('🎬 WelcomeScreen Enhanced рендерится:', { progress, currentPhase, isHyperspace });

  useEffect(() => {
    console.log('🚀 WelcomeScreen Enhanced запущен');
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 150);
        
        // Гиперпространство на 85%
        if (newProgress > 85 && !isHyperspace) {
          setIsHyperspace(true);
          console.log('🌌 Гиперпространство активировано!');
        }
        
        if (newProgress >= 100) {
          console.log('✅ Прогресс завершён');
          clearInterval(progressInterval);
          
          setProgress(100);
          setShowFlash(true);
          
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              console.log('🎯 Вызываю onComplete');
              onComplete?.();
            }, 500);
          }, 800);
          
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      console.log('🧹 WelcomeScreen Enhanced cleanup');
      clearInterval(progressInterval);
    };
  }, [onComplete, isHyperspace]);

  // Смена фаз загрузки
  useEffect(() => {
    const phaseTimer = setTimeout(() => {
      if (currentPhase < LOADING_PHASES.length - 1) {
        setCurrentPhase(prev => prev + 1);
      }
    }, LOADING_PHASES[currentPhase]?.duration || 2000);

    return () => clearTimeout(phaseTimer);
  }, [currentPhase]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Псевдо-3D звёздное поле */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {Array.from({ length: 400 }).map((_, i) => {
              const speed = Math.random() * 3 + 1;
              const size = Math.random() * 4 + 1;
              const initialX = Math.random() * 100;
              const initialY = Math.random() * 100;
              const depth = Math.random() * 100 + 10;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    left: `${initialX}%`,
                    top: `${initialY}%`,
                    background: depth > 70 ? '#60a5fa' : depth > 40 ? '#a78bfa' : '#ffffff',
                    filter: `blur(${depth > 60 ? '1px' : '0px'})`,
                  }}
                  animate={isHyperspace ? {
                    // Гиперпространство - звёзды летят к камере
                    scale: [1, 5, 1],
                    opacity: [0.3, 1, 0],
                    x: [(initialX - 50) * -3, (initialX - 50) * 3],
                    y: [(initialY - 50) * -3, (initialY - 50) * 3],
                  } : {
                    // Обычное мерцание с орбитальным движением
                    opacity: [0.2, 1, 0.2],
                    scale: [0.5, 1.2, 0.5],
                    x: [0, Math.sin(i * 0.1) * 15, 0],
                    y: [0, Math.cos(i * 0.1) * 15, 0],
                  }}
                  transition={isHyperspace ? {
                    duration: 0.6,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                  } : {
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    delay: Math.random() * 8,
                  }}
                />
              );
            })}
          </div>

          {/* Космическая станция в центре */}
          {!isHyperspace && (
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: (progress / 100) * 360 * 2,
              }}
              transition={{ duration: 1, ease: "linear" }}
            >
              {/* Орбитальные кольца */}
              <div className="w-80 h-80 border border-blue-400/20 rounded-full" />
              <div className="absolute inset-4 border border-purple-400/15 rounded-full" />
              <div className="absolute inset-8 border border-cyan-400/10 rounded-full" />
              
              {/* Вращающийся спутник */}
              <motion.div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="relative">
                  {/* Основной корпус */}
                  <div className="w-8 h-6 bg-gradient-to-b from-gray-200 to-gray-700 rounded-md shadow-xl border border-gray-400" />
                  
                  {/* Солнечные панели */}
                  <div className="absolute -left-6 top-0 w-4 h-6 bg-gradient-to-b from-blue-600 to-blue-900 rounded-sm shadow-lg transform rotate-12" />
                  <div className="absolute -right-6 top-0 w-4 h-6 bg-gradient-to-b from-blue-600 to-blue-900 rounded-sm shadow-lg transform -rotate-12" />
                  
                  {/* Антенны */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-0.5 h-4 bg-white shadow-lg" />
                  <div className="absolute top-0 left-2 transform -translate-y-3 w-0.5 h-3 bg-gray-300" />
                  <div className="absolute top-0 right-2 transform -translate-y-3 w-0.5 h-3 bg-gray-300" />
                  
                  {/* Мигающие сигналы */}
                  <motion.div
                    className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg"
                    animate={{
                      opacity: [1, 0.2, 1],
                      scale: [1, 1.8, 1],
                      boxShadow: [
                        "0 0 5px rgba(34, 211, 238, 0.5)",
                        "0 0 15px rgba(34, 211, 238, 0.8)",
                        "0 0 5px rgba(34, 211, 238, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1 left-1 w-1 h-1 bg-red-400 rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Туманности */}
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          />

          {/* Гиперпространство лучи */}
          {isHyperspace && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 150 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: Math.random() * 300 + 100,
                    height: 3,
                    transformOrigin: 'left center',
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                  }}
                />
              ))}
            </div>
          )}

          {/* Финальная вспышка */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white"
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* UI контент */}
          <div className="relative z-10 text-center px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ 
                opacity: isHyperspace ? 0.7 : 1, 
                y: 0,
                scale: isHyperspace ? 0.9 : 1
              }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-7xl font-thin text-white mb-6">
                Добро пожаловать в{" "}
                <motion.span
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  iDATA
                </motion.span>
              </h1>
              <p className="text-xl text-slate-300 font-light">
                Корпоративная сеть нового поколения
              </p>
            </motion.div>

            {/* Прогресс-бар */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHyperspace ? 0.5 : 1, 
                scale: isHyperspace ? 0.8 : 1 
              }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8"
            >
              <div className="w-80 h-3 bg-slate-800/50 rounded-full mx-auto mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
              <div className="text-lg font-mono text-cyan-300">
                {Math.round(progress)}%
              </div>
            </motion.div>

            {/* Статус с печатной машинкой */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHyperspace ? 0.6 : 1, 
                y: 0 
              }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="h-12 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <TypewriterText text={LOADING_PHASES[currentPhase]?.text || ""} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Индикаторы фаз */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isHyperspace ? 0.4 : 1 
              }}
              transition={{ delay: 2 }}
              className="flex justify-center gap-2 mt-8"
            >
              {LOADING_PHASES.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index <= currentPhase 
                      ? 'w-8 bg-cyan-400' 
                      : 'w-4 bg-slate-600'
                  }`}
                  animate={{
                    scale: index === currentPhase ? 1.2 : 1,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}