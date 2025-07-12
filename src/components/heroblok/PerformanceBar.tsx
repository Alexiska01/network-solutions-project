import { motion } from "framer-motion";

interface PerformanceBarProps {
  percent?: number;
  delay?: number;
}

const PerformanceBar = ({
  percent = 67,
  delay = 0,
}: PerformanceBarProps) => (
  <motion.div
    className="bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-xl border border-blue-400/30 shadow-lg p-4"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{
      scale: 1.02,
      borderColor: "rgba(59, 130, 246, 0.5)",
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-white font-semibold text-sm">Производительность</span>
      <motion.span
        className="text-cyan-200 text-sm font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.3, type: "spring" }}
      >
        {percent}%
      </motion.span>
    </div>
    <div className="w-full bg-white/30 rounded-full h-2 shadow-inner">
      <motion.div
        className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 h-2 rounded-full shadow-lg relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ delay: delay + 0.2, duration: 2, ease: "easeOut" }}
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
);

export default PerformanceBar;
