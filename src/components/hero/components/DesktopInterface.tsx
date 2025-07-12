import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import MetricCard from "./MetricCard";
import HeroDeviceCard from "./DeviceCard";
import { DESKTOP_METRICS, HERO_DEVICES } from "../constants";
import {
  desktopConsoleVariants,
  metricVariants,
  deviceVariants,
} from "../animations";

/**
 * Десктопная версия интерфейса Hero секции
 */
const DesktopInterface = () => {
  return (
    <div className="hidden lg:block">
      {/* Премиальная консоль мирового уровня */}
      <motion.div
        className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-3xl border border-white/25 rounded-[2.5rem] p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
        variants={desktopConsoleVariants}
        whileHover={{
          scale: 1.03,
          rotateY: 3,
          boxShadow: "0 35px 80px -15px rgba(0,0,0,0.4)",
          borderColor: "rgba(255,255,255,0.4)",
        }}
      >
        {/* Премиальный заголовок */}
        <motion.div
          className="flex items-center justify-between mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="w-4 h-4 bg-rose-400 rounded-full shadow-lg shadow-rose-400/50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          <div className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Network Intelligence
          </div>

          <motion.div
            className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Премиальные метрики */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {DESKTOP_METRICS.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={i}
              isMobile={false}
              animationVariants={metricVariants.desktop}
            />
          ))}
        </div>

        {/* Интерактивные элементы */}
        <div className="space-y-3">
          {/* Статус сети */}
          <motion.div
            className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/30 shadow-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
            whileHover={{
              scale: 1.03,
              backgroundColor: "rgba(34, 197, 94, 0.25)",
              borderColor: "rgba(34, 197, 94, 0.5)",
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white font-semibold text-sm">
                Network Online
              </span>
            </div>
            <Icon name="Wifi" size={18} className="text-green-300" />
          </motion.div>

          {/* Производительность */}
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-xl border border-blue-400/30 shadow-lg"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            whileHover={{
              scale: 1.03,
              backgroundColor: "rgba(59, 130, 246, 0.25)",
              borderColor: "rgba(59, 130, 246, 0.5)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm">
                Производительность
              </span>
              <span className="text-cyan-200 text-sm font-bold">67%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 h-2 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: "67%" }}
                transition={{
                  delay: 2,
                  duration: 2,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>

          {/* Устройства */}
          <motion.div
            className="grid grid-cols-3 gap-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            {HERO_DEVICES.map((device, index) => (
              <HeroDeviceCard
                key={device.label}
                device={device}
                index={index}
                isMobile={false}
                animationVariants={deviceVariants}
              />
            ))}
          </motion.div>
        </div>

        {/* Премиальные декорации */}
        <motion.div
          className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-400/50"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        {/* Дополнительные световые акценты */}
        <motion.div
          className="absolute top-1/4 -right-1 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
          animate={{
            y: [-5, 5, -5],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-1 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50"
          animate={{
            y: [5, -5, 5],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
};

export default DesktopInterface;
