import { motion } from "framer-motion";

/**
 * Плавающие частицы для Hero секции (только для десктопа)
 */
const FloatingParticles = () => {
  // Создаем массив частиц с разными свойствами
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4px
    duration: Math.random() * 10 + 15, // 15-25 секунд
    delay: Math.random() * 5, // 0-5 секунд задержки
    startX: Math.random() * 100, // Начальная позиция X (%)
    startY: Math.random() * 100, // Начальная позиция Y (%)
    color: ["cyan-400", "blue-400", "purple-400", "emerald-400", "amber-400"][
      Math.floor(Math.random() * 5)
    ],
    opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
  }));

  return (
    <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-${Math.ceil(particle.size)} h-${Math.ceil(particle.size)} bg-${particle.color} rounded-full`}
          style={{
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            filter: "blur(0.5px)",
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0, 1, 1, 0],
            x: [
              0,
              Math.random() * 200 - 100, // -100 до 100px
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            y: [
              0,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Дополнительные световые волны */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute w-64 h-64 rounded-full border border-cyan-400/10"
          style={{
            left: `${25 + i * 20}%`,
            top: `${30 + i * 15}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.1, 0.3, 0.1],
            borderColor: [
              "rgba(34, 211, 238, 0.1)",
              "rgba(59, 130, 246, 0.2)",
              "rgba(34, 211, 238, 0.1)",
            ],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Плавающие точки с траекториями */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [0, 100, -50, 75, 0],
            y: [0, -80, 60, -40, 0],
            opacity: [0.2, 0.8, 0.4, 0.9, 0.2],
            scale: [1, 1.5, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Мерцающие звезды */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
