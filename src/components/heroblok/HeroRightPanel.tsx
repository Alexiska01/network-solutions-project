import { motion } from "framer-motion";
import MetricCard from "./MetricCard";
import DeviceCardHero from "./DeviceCardHero";
import StatusBlock from "./StatusBlock";
import PerformanceBar from "./PerformanceBar";

// --- ТИП ДЛЯ СТАТУСА ---
type DeviceStatus = "active" | "warning";

// --- ТИП ДЛЯ УСТРОЙСТВ ---
interface DeviceCardHeroProps {
  icon: string;
  label: string;
  color: string;
  status: DeviceStatus;
}

// --- ДАННЫЕ ДЛЯ МЕТРИК ---
const metrics = [
  {
    icon: "Activity",
    value: "99.9%",
    label: "Uptime",
    color: "emerald",
    gradient: "from-emerald-500/20 to-green-600/10",
    trend: "+0.2%",
  },
  {
    icon: "Zap",
    value: "0.8ms",
    label: "Latency",
    color: "blue",
    gradient: "from-blue-500/20 to-cyan-600/10",
    trend: "-15%",
  },
  {
    icon: "Database",
    value: "1.2TB",
    label: "Traffic",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-600/10",
    trend: "+24%",
  },
  {
    icon: "Users",
    value: "3,247",
    label: "Devices",
    color: "orange",
    gradient: "from-orange-500/20 to-amber-600/10",
    trend: "+12%",
  },
];

// --- ДАННЫЕ ДЛЯ УСТРОЙСТВ ---
// !!! Здесь указываем ЯВНЫЙ ТИП МАССИВА !!!
const devices: DeviceCardHeroProps[] = [
  {
    icon: "Router",
    label: "Router",
    color: "emerald",
    status: "active",
  },
  {
    icon: "Network",
    label: "Switch",
    color: "blue",
    status: "active",
  },
  {
    icon: "Shield",
    label: "Firewall",
    color: "amber",
    status: "warning",
  },
];

// --- КОМПОНЕНТ ---
const HeroRightPanel = () => (
  <motion.div
    className="relative h-full flex items-center justify-center order-1 lg:order-2"
    initial="hidden"
    animate="visible"
  >
    <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">

      {/* Мобильная версия */}
      <div className="block lg:hidden">
        {/* Верхняя панель статуса */}
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

        {/* Метрики */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} showTrend={false} delay={0.6 + i * 0.1} />
          ))}
        </div>

        {/* Статус сети */}
        <StatusBlock delay={1} />

        {/* Производительность */}
        <PerformanceBar percent={67} delay={1.2} />

        {/* Устройства */}
        <motion.div
          className="grid grid-cols-3 gap-2 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          {devices.map((d, i) => (
            <DeviceCardHero key={d.label} {...d} delay={1.8 + i * 0.1} />
          ))}
        </motion.div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden lg:block">
        <motion.div
          className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-3xl border border-white/25 rounded-[2.5rem] p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, rotateY: -20, z: -50 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0, z: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.5,
            duration: 1.2,
          }}
          whileHover={{
            scale: 1.03,
            rotateY: 3,
            boxShadow: "0 35px 80px -15px rgba(0,0,0,0.4)",
            borderColor: "rgba(255,255,255,0.4)",
          }}
        >
          {/* Верхняя панель статуса */}
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

          {/* Метрики */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {metrics.map((m, i) => (
              <MetricCard key={m.label} {...m} showTrend={true} delay={1.0 + i * 0.1} />
            ))}
          </div>

          {/* Статус сети, производительность и устройства */}
          <div className="space-y-3">
            <StatusBlock delay={1.6} />
            <PerformanceBar percent={67} delay={1.8} />
            <motion.div
              className="grid grid-cols-3 gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              {devices.map((d, i) => (
                <DeviceCardHero key={d.label} {...d} delay={2.2 + i * 0.1} />
              ))}
            </motion.div>
          </div>

          {/* Премиальные декоративные элементы (оставь по желанию) */}
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
    </div>
  </motion.div>
);

export default HeroRightPanel;
