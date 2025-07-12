import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface DeviceCardProps {
  icon: string;
  label: string;
  color: string;
  status: "active" | "warning";
  delay?: number;
}

const DeviceCardHero = ({
  icon,
  label,
  color,
  status,
  delay = 0,
}: DeviceCardProps) => (
  <motion.div
    className={`p-2 bg-gradient-to-br from-${color}-500/20 to-${color}-600/10 rounded-lg border border-${color}-400/30 text-center shadow-lg`}
    whileHover={{ scale: 1.08, y: -3 }}
    whileTap={{ scale: 0.95 }}
    initial={{ scale: 0, rotate: -90, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{ delay, type: "spring", stiffness: 150, damping: 12 }}
  >
    <Icon name={icon as any} size={18} className={`mx-auto mb-1 text-${color}-300`} />
    <div className="text-xs text-white font-medium">{label}</div>
    <motion.div
      className={`w-1 h-1 mx-auto mt-1 rounded-full ${status === "active" ? "bg-green-400" : "bg-amber-400"}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
  </motion.div>
);

export default DeviceCardHero;
