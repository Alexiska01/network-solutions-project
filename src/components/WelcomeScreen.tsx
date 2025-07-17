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

// Простой космический фон с звёздами
const SpaceBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
      
      {/* Анимированные звёзды */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Светящиеся орбы */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
};

// Простой орбитальный загрузчик
const OrbitalLoader = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* Орбитальная траектория */}
      <div className="absolute inset-0 border border-blue-500/20 rounded-full" />
      
      {/* Вращающийся спутник */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: (progress / 100) * 360 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex items-center">
          <div className="w-4 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-sm shadow-lg shadow-cyan-400/50">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-cyan-300" />
            <div className="absolute top-0 -left-2 w-1.5 h-3 bg-blue-400/80 rounded-sm" />
            <div className="absolute top-0 -right-2 w-1.5 h-3 bg-blue-400/80 rounded-sm" />
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

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHyperspace, setIsHyperspace] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Симуляция прогресса
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / 150); // 150 обновлений за 15 секунд
      });
    }, 100);

    // Смена фаз
    const phaseTimer = setTimeout(() => {
      if (currentPhase < LOADING_PHASES.length - 1) {
        setCurrentPhase(prev => prev + 1);
      }
    }, LOADING_PHASES[currentPhase]?.duration || 2000);

    // Гиперпространство на 85%
    if (progress > 85 && !isHyperspace) {
      setIsHyperspace(true);
    }

    // Завершение через 15 секунд
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setShowFlash(true);
      
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 800);
    }, 15000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimer);
      clearTimeout(completeTimer);
    };
  }, [currentPhase, onComplete, progress, isHyperspace]);

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
          {/* Космический фон */}
          <SpaceBackground />

          {/* Гиперпространство эффект */}
          {isHyperspace && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: Math.random() * 200 + 50,
                    height: 2,
                    transformOrigin: 'left center',
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
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

          {/* Главный контент */}
          <div className="relative z-10 text-center px-8 max-w-3xl">
            {/* Заголовок */}
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

            {/* Орбитальный прогресс-бар */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHyperspace ? 0.5 : 1, 
                scale: isHyperspace ? 0.8 : 1 
              }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8 relative"
            >
              <OrbitalLoader progress={progress} />
            </motion.div>

            {/* Текст состояния */}
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