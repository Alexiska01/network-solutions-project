import { motion } from "framer-motion";
import { HeroContent } from "@/components/hero/components/HeroContent";
import { HeroInterface } from "@/components/hero/components/HeroInterface";
import { useHeroAnimations } from "@/components/hero/hooks/useHeroAnimations";
import { containerVariants } from "@/components/hero/animations";

const Hero = () => {
  const { backgroundY, contentY } = useHeroAnimations();

  return (
    <section className="bg-gradient-hero text-white py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[95vh] flex items-center">
      {/* Простой градиентный фон */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-hero"
        style={{ y: backgroundY }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full"
        style={{ y: contentY }}
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Левая колонка - основной контент */}
          <HeroContent />

          {/* Правая колонка - интерактивный интерфейс */}
          <HeroInterface />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
