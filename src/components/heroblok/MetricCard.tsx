import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface MetricCardProps {
  icon: string;
  value: string;
  label: string;
  color: string;
  gradient: string;
  trend?: string;
  showTrend?: boolean;
  delay?: number;
}

const MetricCard = ({
  icon,
  value,
  label,
  color,
  gradient,
  trend,
  showTrend = false,
  delay = 0,
}: MetricCardProps) => (
  <motion.div
    className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/25 rounded-xl p-3 text-center shadow-lg`}
    initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ delay, type: "spring", stiffness: 120 }}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className={`w-8 h-8 bg-${color}-400/30 rounded-lg mx-auto mb-2 flex items-center justify-center shadow-lg`}>
      <Icon name={icon as any} size={16} className={`text-${color}-300`} />
    </div>
    <div className="text-white text-sm font-bold mb-1">{value}</div>
    <div className="text-white/70 text-xs font-medium">{label}</div>
    {showTrend && trend && (
      <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith("+") ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
        {trend}
      </span>
    )}
    <motion.div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
  </motion.div>
);

export default MetricCard;
