import { motion } from "framer-motion";

/**
 * Компонент декоративных элементов Hero секции
 */
const HeroDecorations = () => {
  return (
    <>
      {/* Плавающие декоративные элементы */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl"
        animate={{
          y: [0, 15, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Боковые декоративные элементы */}
      <motion.div
        className="absolute -left-8 top-1/2 w-2 h-16 bg-gradient-to-b from-cyan-400/40 to-blue-500/40 rounded-full blur-sm"
        style={{ y: "-50%" }}
        animate={{
          scaleY: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-8 top-1/3 w-1 h-12 bg-gradient-to-b from-purple-400/40 to-pink-500/40 rounded-full blur-sm"
        animate={{
          scaleY: [0.3, 1, 0.3],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </>
  );
};

export default HeroDecorations;
