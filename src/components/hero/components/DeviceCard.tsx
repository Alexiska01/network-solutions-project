import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import type { HeroDevice } from "../types";

interface DeviceCardProps {
  device: HeroDevice;
  index: number;
  isMobile?: boolean;
  animationVariants: any;
}

/**
 * Компонент карточки устройства
 */
const DeviceCard = ({
  device,
  index,
  isMobile = false,
  animationVariants,
}: DeviceCardProps) => {
  const variants = animationVariants(index, isMobile);

  if (isMobile) {
    return (
      <motion.div
        className={`p-2 bg-gradient-to-br from-${device.color}-500/20 to-${device.color}-600/10 rounded-lg border border-${device.color}-400/30 text-center shadow-lg`}
        {...variants}
      >
        <Icon
          name={device.icon as any}
          size={18}
          className={`mx-auto mb-1 text-${device.color}-300`}
        />
        <div className="text-xs text-white font-medium">{device.label}</div>
        <motion.div
          className="w-1 h-1 mx-auto mt-1 bg-green-400 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      </motion.div>
    );
  }

  // Десктопная версия
  const getStatusColor = () => {
    if (device.status === "active") {
      return {
        iconColor: `text-${device.color}-300`,
        statusColor: "bg-green-400",
      };
    }
    return {
      iconColor: "text-amber-300",
      statusColor: "bg-amber-400",
    };
  };

  const { iconColor, statusColor } = getStatusColor();

  return (
    <motion.div
      className={`p-2 bg-gradient-to-br from-${device.color}-500/20 to-${device.color}-600/10 rounded-lg border border-${device.color}-400/30 text-center shadow-lg`}
      {...variants}
    >
      <Icon
        name={device.icon as any}
        size={20}
        className={`mx-auto mb-1 ${iconColor}`}
      />
      <div className="text-xs text-white font-medium">{device.label}</div>
      {/* Статус-индикатор */}
      <motion.div
        className={`w-1 h-1 mx-auto mt-1 rounded-full ${statusColor}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />
    </motion.div>
  );
};

export default DeviceCard;
