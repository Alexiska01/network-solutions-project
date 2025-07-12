import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import MetricCard from "./MetricCard";
import HeroDeviceCard from "./DeviceCard";
import { MOBILE_METRICS, MOBILE_DEVICES } from "../constants";
import { metricVariants, deviceVariants } from "../animations";

/**
 * Мобильная версия интерфейса Hero секции
 */
const MobileInterface = () => {
  return (
    <div className="block lg:hidden">
      {/* Заголовок с анимированными индикаторами */}
      <motion.div
        className="flex items-center justify-between mb-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="w-2 h-2 bg-rose-400 rounded-full shadow-lg shadow-rose-400/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
        <div className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          Network Status
        </div>
        <motion.div
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Четыре карточки метрик в сетке 2x2 */}
      <motion.div
        className="grid grid-cols-2 gap-3 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {MOBILE_METRICS.map((metric, i) => (
          <MetricCard
            key={metric.label}
            metric={metric}
            index={i}
            isMobile={true}
            animationVariants={metricVariants.mobile}
          />
        ))}
      </motion.div>

      {/* Статус сети с анимацией */}
      <motion.div
        className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/30 shadow-lg mb-3"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(34, 197, 94, 0.5)",
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-white font-semibold text-sm">
            Network Online
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Wifi" size={16} className="text-green-300" />
          <motion.div
            className="w-1 h-1 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Производительность с улучшенной анимацией */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-xl border border-blue-400/30 shadow-lg p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(59, 130, 246, 0.5)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold text-sm">
            Производительность
          </span>
          <motion.span
            className="text-cyan-200 text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            67%
          </motion.span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2 shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 h-2 rounded-full shadow-lg relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "67%" }}
            transition={{ delay: 1.4, duration: 2, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Простые устройства */}
      <motion.div
        className="grid grid-cols-3 gap-2 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        {MOBILE_DEVICES.map((device, index) => (
          <HeroDeviceCard
            key={device.label}
            device={device}
            index={index}
            isMobile={true}
            animationVariants={deviceVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MobileInterface;
