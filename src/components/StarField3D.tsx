import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarField3D: React.FC = () => {
  const stars = useMemo(() => {
    // Оптимальное количество звезд - увеличиваем только мобильную версию
    const starCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 300;
    return Array.from({ length: starCount }, (_, i) => {
      const depth = Math.random();
      const brightness = 1 - depth * 0.4;
      const size = (1 - depth) * 5 + 0.5;
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        depth,
        size,
        brightness,
        twinkleSpeed: 1.5 + Math.random() * 4,
        twinkleDelay: Math.random() * 8,
        color: depth > 0.8 ? 'blue' : depth > 0.5 ? 'cyan' : 'white',
        parallaxSpeed: 0.3 + depth * 1.5,
        pulseIntensity: 0.5 + Math.random() * 0.5
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => {
        const getStarColor = () => {
          switch(star.color) {
            case 'blue': return '#3b82f6';
            case 'cyan': return '#22d3ee';
            case 'white': return '#ffffff';
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
              filter: `blur(${star.depth * 0.8}px)`,
              boxShadow: `0 0 ${star.size * 6}px ${getStarColor()}60`
            }}
            animate={{
              opacity: [star.brightness * 0.2, star.brightness * star.pulseIntensity, star.brightness * 0.2],
              scale: [0.4, 1.4, 0.4],
              x: [0, star.parallaxSpeed * 15, 0],
              y: [0, star.parallaxSpeed * 8, 0]
            }}
            transition={{
              duration: star.twinkleSpeed * (typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 1.5),
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

export default StarField3D;