import React from 'react';
import { motion } from 'framer-motion';

interface Satellite3DProps {
  progress: number;
}

const Satellite3D: React.FC<Satellite3DProps> = ({ progress }) => {
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

export default Satellite3D;