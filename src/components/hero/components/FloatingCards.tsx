import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

/**
 * Компонент плавающих карточек (только для десктопа)
 */
const FloatingCards = () => {
  return (
    <div className="hidden lg:block">
      <motion.div
        className="absolute -top-20 -left-16 bg-gradient-to-br from-green-500/20 to-emerald-600/10 backdrop-blur-2xl border border-green-400/30 rounded-2xl p-4 shadow-2xl"
        initial={{ opacity: 0, x: -120, rotate: -15, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{
          delay: 2.5,
          type: "spring",
          stiffness: 80,
          damping: 15,
        }}
        whileHover={{
          scale: 1.15,
          rotate: 8,
          y: -8,
          boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)",
          borderColor: "rgba(34, 197, 94, 0.6)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/30 rounded-lg shadow-lg">
            <Icon name="TrendingUp" size={18} className="text-green-300" />
          </div>
          <div>
            <div className="text-white text-sm font-bold">+24%</div>
            <div className="text-green-200 text-xs">Производительность</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-20 -right-16 bg-gradient-to-br from-blue-500/20 to-cyan-600/10 backdrop-blur-2xl border border-blue-400/30 rounded-2xl p-4 shadow-2xl"
        initial={{ opacity: 0, x: 120, rotate: 15, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{
          delay: 2.8,
          type: "spring",
          stiffness: 80,
          damping: 15,
        }}
        whileHover={{
          scale: 1.15,
          rotate: -8,
          y: -8,
          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
          borderColor: "rgba(59, 130, 246, 0.6)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/30 rounded-lg shadow-lg">
            <Icon name="Shield" size={18} className="text-blue-300" />
          </div>
          <div>
            <div className="text-white text-sm font-bold">99.9%</div>
            <div className="text-blue-200 text-xs">Защищенность</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -top-8 -right-20 bg-gradient-to-br from-purple-500/20 to-pink-600/10 backdrop-blur-2xl border border-purple-400/30 rounded-xl p-3 shadow-2xl"
        initial={{ opacity: 0, y: -50, rotate: 20, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{
          delay: 3.1,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          y: -5,
          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
        }}
      >
        <div className="flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-purple-300" />
          <span className="text-white text-sm font-bold">0.8ms</span>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingCards;
