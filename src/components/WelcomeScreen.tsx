import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [use3D, setUse3D] = useState(false); // Пока отключено

  console.log('🎬 WelcomeScreen рендерится:', { progress });

  useEffect(() => {
    console.log('🚀 WelcomeScreen запущен');
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 150);
        console.log('📊 Прогресс:', Math.round(newProgress));
        
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
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
        >
          <div className="absolute inset-0">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-cyan-300 font-mono"
            >
              Инициализация системы...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}