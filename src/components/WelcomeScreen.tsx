import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState<'loading' | 'ready' | 'launching'>('loading');

  React.useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 0.5);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setPhase('ready');
          return 100;
        }
        return newProgress;
      });
    }, 120);

    const fallbackTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setPhase('ready');
    }, 15000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleLaunch = () => {
    setPhase('launching');
    setTimeout(onComplete, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 bg-gradient-to-br from-[#0B3C49] via-[#1A237E] to-[#2E2E2E] flex items-center justify-center z-50 overflow-hidden"
      >
        {/* Звёздное поле */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3] }}
              transition={{
                duration: Math.random() * 3 + 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Центральный контент */}
        <div className="relative z-10 text-center px-6">
          {/* 3D орбита со спутником */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Орбитальные кольца */}
            <div className="absolute inset-4 border border-white/10 rounded-full"></div>
            <div className="absolute inset-8 border border-white/5 rounded-full"></div>
            <div className="absolute inset-12 border border-white/5 rounded-full"></div>
            
            {/* Земля в центре */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 rounded-full shadow-lg"
            >
              <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-80"></div>
              <div className="absolute top-2 left-3 w-2 h-2 bg-green-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-3 right-2 w-1.5 h-1.5 bg-green-300 rounded-full opacity-60"></div>
            </motion.div>

            {/* Спутник на орбите */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <motion.div
                  className="absolute top-0 left-1/2 w-4 h-4 -ml-2 -mt-2"
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
                  <div className="w-3 h-3 bg-gradient-to-br from-gray-300 to-gray-500 rounded-sm shadow-lg relative">
                    {/* Солнечные панели */}
                    <div className="absolute -left-1 top-0.5 w-1 h-2 bg-blue-400 opacity-80"></div>
                    <div className="absolute -right-1 top-0.5 w-1 h-2 bg-blue-400 opacity-80"></div>
                    {/* Антенна */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-white -translate-x-0.5 -translate-y-1"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Световые эффекты */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
            ></motion.div>
          </div>

          {/* Логотип */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            poehali.dev
          </motion.h1>

          {/* Статус */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="text-white/60 text-lg">
              {phase === 'loading' && 'Инициализация системы...'}
              {phase === 'ready' && 'Система готова к запуску'}
              {phase === 'launching' && 'Запуск...'}
            </div>

            {/* Прогресс-бар */}
            {phase !== 'launching' && (
              <div className="w-80 max-w-full mx-auto">
                <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
                <div className="text-white/40 text-sm mt-2">
                  {Math.round(progress)}%
                </div>
              </div>
            )}

            {/* Кнопка запуска */}
            {phase === 'ready' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLaunch}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Поехали! 🚀
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Индикатор загрузки */}
        {phase === 'launching' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;