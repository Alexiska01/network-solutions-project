import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayStationTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const PlayStationTransition: React.FC<PlayStationTransitionProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [stage, setStage] = useState<'initial' | 'expanding' | 'complete'>('initial');

  useEffect(() => {
    if (isVisible) {
      console.log('🎬 PlayStationTransition: Запускаем переход');
      const timer1 = setTimeout(() => {
        console.log('📈 PlayStationTransition: expanding');
        setStage('expanding');
      }, 500);
      const timer2 = setTimeout(() => {
        console.log('✅ PlayStationTransition: complete');
        setStage('complete');
      }, 1200);
      const timer3 = setTimeout(() => {
        console.log('🚀 PlayStationTransition: вызываем onComplete');
        onComplete();
      }, 2000);
      
      // Добавляем абсолютный fallback на 3 секунды
      const fallbackTimer = setTimeout(() => {
        console.log('⚠️ PlayStationTransition: Fallback таймер сработал');
        onComplete();
      }, 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(fallbackTimer);
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        {/* Основной фон перехода */}
        <motion.div
          className="absolute inset-0"
          initial={{ 
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)'
          }}
          animate={{
            background: stage === 'initial' 
              ? 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)'
              : stage === 'expanding'
              ? 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
              : 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)'
          }}
          transition={{ 
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />

        {/* Кинематографичные полосы */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"
              style={{
                top: `${5 + i * 4.5}%`,
                left: 0,
                right: 0,
              }}
              initial={{ 
                scaleX: 0,
                x: '-100%'
              }}
              animate={{
                scaleX: stage === 'initial' ? 0 : stage === 'expanding' ? 1 : 0,
                x: stage === 'initial' ? '-100%' : stage === 'expanding' ? '0%' : '100%'
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            />
          ))}
        </div>

        {/* Центральная вспышка */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage === 'expanding' ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: stage === 'expanding' ? [1, 30, 0] : 1,
              opacity: stage === 'expanding' ? [1, 0.8, 0] : 1
            }}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          />
        </motion.div>

        {/* Частицы */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0
              }}
              animate={{
                opacity: stage === 'expanding' ? [0, 1, 0] : 0,
                scale: stage === 'expanding' ? [0, 1.5, 0] : 0,
                x: stage === 'expanding' ? (Math.random() - 0.5) * 200 : 0,
                y: stage === 'expanding' ? (Math.random() - 0.5) * 200 : 0
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            />
          ))}
        </div>

        {/* Финальная завеса */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'complete' ? 1 : 0
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayStationTransition;