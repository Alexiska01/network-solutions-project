import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { itemVariants, buttonVariants } from "../animations";

interface HeroButtonsProps {
  onProductsClick: () => void;
}

/**
 * Компонент кнопок Hero секции
 */
const HeroButtons = ({ onProductsClick }: HeroButtonsProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row gap-4 mt-auto relative pb-8"
    >
      {/* Кнопка "Оборудование" */}
      <motion.button
        className="group relative bg-gradient-to-r from-white to-blue-50 hover:from-transparent hover:to-transparent text-[#0065B3] px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold overflow-hidden transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] z-10"
        onClick={onProductsClick}
        {...buttonVariants.primary}
      >
        {/* Градиентная подложка */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0, rotate: -45 }}
          whileHover={{ scale: 1.2, rotate: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Бегущая граница */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["-200% 0%", "200% 0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
          <Icon
            name="HardDrive"
            size={20}
            className="group-hover:text-white transition-colors"
          />
          Оборудование
        </span>
      </motion.button>

      {/* Кнопка "Консультация" */}
      <motion.button
        className="group relative border-2 border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold overflow-hidden transition-all duration-500 backdrop-blur-sm hover:border-transparent shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.2)] z-10"
        {...buttonVariants.secondary}
      >
        {/* Градиентная подложка */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0, rotate: -45 }}
          whileHover={{ scale: 1.2, rotate: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Бегущая граница */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["-200% 0%", "200% 0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
          <Icon
            name="MessageCircle"
            size={20}
            className="group-hover:text-white transition-colors"
          />
          Консультация
        </span>
      </motion.button>

      {/* Декоративные элементы */}
      <motion.div
        className="absolute -bottom-8 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full"
        style={{ x: "-50%" }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.5,
        }}
      />
    </motion.div>
  );
};

export default HeroButtons;
