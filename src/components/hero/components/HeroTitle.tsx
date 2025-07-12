import { motion } from "framer-motion";
import { titleVariants, titleSpanVariants } from "../animations";

/**
 * Компонент заголовка Hero секции с анимированным текстом
 */
const HeroTitle = () => {
  return (
    <motion.div
      className="flex items-start relative"
      style={{ marginTop: "5%", marginBottom: "10%" }}
      variants={titleVariants}
    >
      {/* Декоративные элементы заголовка */}
      <motion.div
        className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.h1
        className="relative text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight"
        initial={titleVariants.hidden}
        animate={titleVariants.visible}
      >
        {/* Многослойный градиентный текст */}
        <motion.span
          className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl"
          {...titleSpanVariants.first}
        >
          Профессиональные
        </motion.span>

        <motion.div
          className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-2xl relative"
          {...titleSpanVariants.second}
        >
          решения для сетевой
          {/* Светящийся акцент */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-sm -z-10"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        </motion.div>

        <motion.div
          className="block bg-gradient-to-r from-blue-100 via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-2xl relative"
          {...titleSpanVariants.third}
        >
          инфраструктуры
          {/* Пульсирующая подсветка */}
          <motion.div
            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          />
        </motion.div>

        {/* Интерактивные частицы вокруг текста */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default HeroTitle;