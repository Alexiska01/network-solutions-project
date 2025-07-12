import { motion } from "framer-motion";

/**
 * Компонент плавающих частиц и орбитальных элементов (только для десктопа)
 */
const FloatingParticles = () => {
  const colors = [
    "#3b82f6",
    "#06d6a0",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#f97316",
  ];

  return (
    <div className="hidden lg:block">
      {/* Премиальные орбитальные элементы */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 pointer-events-none"
        style={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border border-white/5 rounded-full" />
        <div className="absolute inset-4 border border-white/8 rounded-full" />
        <motion.div
          className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50"
          style={{ x: "-50%" }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-400/50"
          style={{ x: "-50%" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-2 h-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full shadow-lg shadow-emerald-400/50"
          style={{ y: "-50%" }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Премиальные плавающие частицы */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: `radial-gradient(circle, ${colors[i % 6]}60, transparent)`,
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 5) * 15}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 2.5, 1],
            x: [0, Math.sin(i) * 15, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
