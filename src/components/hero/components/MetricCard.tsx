import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import type { HeroMetric } from "../types";

interface MetricCardProps {
  metric: HeroMetric;
  index: number;
  isMobile?: boolean;
  animationVariants: any;
}

/**
 * Компонент карточки метрики
 */
const MetricCard = ({
  metric,
  index,
  isMobile = false,
  animationVariants,
}: MetricCardProps) => {
  const variants = animationVariants(index);

  if (isMobile) {
    return (
      <motion.div
        className={`group relative bg-gradient-to-br ${metric.gradient} backdrop-blur-xl border border-white/25 rounded-xl p-3 text-center shadow-lg`}
        {...variants}
      >
        <div
          className={`w-8 h-8 bg-${metric.color}-400/30 rounded-lg mx-auto mb-2 flex items-center justify-center shadow-lg`}
        >
          <Icon
            name={metric.icon as any}
            size={16}
            className={`text-${metric.color}-300`}
          />
        </div>
        <motion.div
          className="text-white text-sm font-bold mb-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + index * 0.05 }}
        >
          {metric.value}
        </motion.div>
        <div className="text-white/70 text-xs font-medium">{metric.label}</div>

        {/* Светящаяся граница при hover */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${metric.color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
      </motion.div>
    );
  }

  // Десктопная версия
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500"
      {...variants}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className={`p-2 rounded-lg bg-gradient-to-br from-${metric.color}-400/30 to-${metric.color}-600/20 shadow-sm`}
        >
          <Icon
            name={metric.icon as any}
            size={16}
            className={`text-${metric.color}-300`}
          />
        </div>
        {metric.trend && (
          <motion.span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              metric.trend.startsWith("+")
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4 + index * 0.05 }}
          >
            {metric.trend}
          </motion.span>
        )}
      </div>
      <motion.div
        className="text-xl font-black text-white mb-1 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 + index * 0.05 }}
      >
        {metric.value}
      </motion.div>
      <div className="text-white/70 text-xs font-medium">{metric.label}</div>

      {/* Светящаяся граница */}
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${metric.color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />
    </motion.div>
  );
};

export default MetricCard;
