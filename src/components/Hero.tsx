import { motion } from "framer-motion";
import { useHeroAnimations } from "@/components/hero/hooks/useHeroAnimations";

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
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-xl mb-8">
              iDATA — ведущий производитель коммутаторов и сетевого оборудования
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Оборудование
            </button>
          </div>
          <div className="text-center">
            <p className="text-lg">Надёжные сетевые решения</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
