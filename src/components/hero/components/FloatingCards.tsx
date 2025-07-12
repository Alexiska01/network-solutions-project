import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

/**
 * Плавающие карточки для Hero секции (только для десктопа)
 */
const FloatingCards = () => {
  const cards = [
    {
      icon: "Shield",
      value: "256-bit",
      label: "Encryption",
      position: { top: "10%", right: "-10%" },
      color: "emerald",
      delay: 0.5,
    },
    {
      icon: "Zap",
      value: "1Gbps",
      label: "Speed",
      position: { top: "50%", left: "-15%" },
      color: "blue",
      delay: 1.2,
    },
    {
      icon: "Users",
      value: "1024",
      label: "Users",
      position: { bottom: "20%", right: "-5%" },
      color: "purple",
      delay: 1.8,
    },
  ];

  return (
    <div className="hidden xl:block">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          className="absolute z-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/30 shadow-xl"
          style={card.position}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateY: -90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          transition={{
            delay: card.delay,
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 1.2,
          }}
          whileHover={{
            scale: 1.1,
            rotateY: 5,
            z: 50,
            boxShadow: "0 25px 50px -10px rgba(0,0,0,0.4)",
          }}
        >
          <div className="text-center">
            <motion.div
              className={`w-8 h-8 mx-auto mb-2 p-1.5 rounded-lg bg-gradient-to-br from-${card.color}-500/30 to-${card.color}-600/20 shadow-lg`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon
                name={card.icon as any}
                size={20}
                className={`text-${card.color}-300`}
              />
            </motion.div>
            <motion.div
              className="text-white font-bold text-sm mb-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: card.delay + 0.3 }}
            >
              {card.value}
            </motion.div>
            <motion.div
              className="text-white/70 text-xs"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: card.delay + 0.5 }}
            >
              {card.label}
            </motion.div>
          </div>

          {/* Светящаяся граница */}
          <motion.div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${card.color}-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          />

          {/* Плавающие частицы вокруг карточки */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-${card.color}-400 rounded-full`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: card.delay + i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCards;
