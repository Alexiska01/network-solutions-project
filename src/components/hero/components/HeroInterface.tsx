import { motion } from "framer-motion";
import MobileInterface from "./MobileInterface";
import DesktopInterface from "./DesktopInterface";
import FloatingCards from "./FloatingCards";
import FloatingParticles from "./FloatingParticles";
import { containerVariants } from "../animations";

/**
 * Правая колонка Hero секции с интерфейсом
 */
const HeroInterface = () => {
  return (
    <motion.div
      className="relative h-full flex items-center justify-center order-1 lg:order-2"
      variants={containerVariants}
    >
      {/* Главная интерактивная панель - упрощенная для мобильных */}
      <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
        {/* Мобильная версия - улучшенный интерфейс */}
        <MobileInterface />

        {/* Десктопная версия - полный интерфейс */}
        <DesktopInterface />

        {/* Премиальные плавающие карточки - только для десктопа */}
        <FloatingCards />
      </div>

      {/* Премиальные плавающие частицы - только для десктопа */}
      <FloatingParticles />
    </motion.div>
  );
};

export default HeroInterface;
