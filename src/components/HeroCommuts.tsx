import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const HeroCommuts = () => {
  return (
    <section className="bg-gradient-hero text-white py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
            }}
          >
            Коммутаторы
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Полный каталог коммутаторов для корпоративных сетей и центров
            обработки данных
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Icon
                name="Network"
                size={24}
                strokeWidth={1.7}
                className="text-blue-300 flex-shrink-0"
              />
              <span className="text-white font-medium">
                Корпоративные решения
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Icon
                name="Zap"
                size={24}
                strokeWidth={1.7}
                className="text-blue-300 flex-shrink-0"
              />
              <span className="text-white font-medium">
                Высокая производительность
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-4">
              <Icon
                name="Shield"
                size={24}
                strokeWidth={1.7}
                className="text-blue-300 flex-shrink-0"
              />
              <span className="text-white font-medium">
                Надёжность и безопасность
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroCommuts;
