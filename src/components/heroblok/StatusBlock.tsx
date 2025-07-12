import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface StatusBlockProps {
  title?: string;
  icon?: string;
  color?: string;
  delay?: number;
}

const StatusBlock = ({
  title = "Network Online",
  icon = "Wifi",
  color = "green",
  delay = 0,
}: StatusBlockProps) => (
  <motion.div
    className={`flex items-center justify-between p-3 bg-gradient-to-r from-${color}-500/20 to-${color}-500/10 rounded-xl border border-${color}-400/30 shadow-lg mb-3`}
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay }}
    whileHover={{
      scale: 1.02,
      borderColor: `rgba(${color === "green" ? "34, 197, 94" : "59, 130, 246"}, 0.5)`,
    }}
  >
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-2 h-2 bg-${color}-400 rounded-full shadow-lg shadow-${color}-400/50`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-white font-semibold text-sm">{title}</span>
    </div>
    <div className="flex items-center gap-1">
      <Icon name={icon as any} size={16} className={`text-${color}-300`} />
      <motion.div
        className={`w-1 h-1 bg-${color}-400 rounded-full`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  </motion.div>
);

export default StatusBlock;
