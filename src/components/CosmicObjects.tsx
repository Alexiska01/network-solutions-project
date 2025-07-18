import React from 'react';
import { motion } from 'framer-motion';

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

export default CosmicObjects;