import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarField3D from "./StarField3D";

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

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isHyperspace, setIsHyperspace] = useState(false);

  console.log('🎬 WelcomeScreen рендерится:', { progress });

  useEffect(() => {
    console.log('🚀 WelcomeScreen запущен');
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 150);
        console.log('📊 Прогресс:', Math.round(newProgress));
        
        // Гиперпространство на 85%
        if (newProgress > 85 && !isHyperspace) {
          setIsHyperspace(true);
          console.log('🌌 Гиперпространство активировано!');
        }
        
        if (newProgress >= 100) {
          console.log('✅ Прогресс завершён, вызываю onComplete');
          clearInterval(progressInterval);
          
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              console.log('🎯 Вызываю onComplete');
              onComplete?.();
            }, 500);
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      console.log('🧹 WelcomeScreen cleanup');
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999]"
        >
          <StarField3D className="w-full h-full flex items-center justify-center">
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

          <div className="relative z-10 text-center px-8">
            <motion.h1 
              className="text-6xl font-thin text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Корпоративная сеть нового поколения
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="mb-8"
            >
              <div className="w-80 h-3 bg-slate-800/50 rounded-full mx-auto mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
              </div>
              <div className="text-lg font-mono text-cyan-300">
                {Math.round(progress)}%
              </div>
            </motion.div>

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
          </StarField3D>
        </motion.div>
      )}
    </AnimatePresence>
  );
}