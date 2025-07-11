import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showIDATA, setShowIDATA] = useState(false);
  const { scrollY } = useScroll();

  const fullText =
    " — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  // Parallax эффекты
  const contentY = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIDATA(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showTyping) return;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 25);
    return () => clearInterval(typingInterval);
  }, [showTyping]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="bg-gradient-hero text-white py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[90vh] flex items-center">
      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10"
        style={{ y: contentY }}
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Левая колонка - фиксированная структура */}
          <div className="flex flex-col justify-between h-[600px] lg:h-[700px]">
            {/* Заголовок */}
            <motion.div variants={itemVariants} className="flex-shrink-0">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  duration: 1,
                }}
              >
                Профессиональные
                <br />
                <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text">
                  решения для сетевой
                </span>
                <br />
                <span className="text-blue-100">инфраструктуры</span>
              </motion.h1>
            </motion.div>

            {/* Подзаголовок с фиксированной высотой */}
            <motion.div
              variants={itemVariants}
              className="flex-1 flex items-center min-h-[120px]"
            >
              <div className="relative w-full">
                <p className="text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  {showIDATA && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 0.8,
                      }}
                      onAnimationComplete={() => setShowTyping(true)}
                      className="inline-block font-bold text-white"
                    >
                      iDATA
                    </motion.span>
                  )}
                  {showTyping && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {typingText}
                    </motion.span>
                  )}
                  {showTyping && typingText.length < fullText.length && (
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-blue-300 ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </p>
              </div>
            </motion.div>

            {/* Кнопки */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
            >
              <motion.button
                className="group bg-white text-[#0065B3] px-8 py-4 rounded-xl text-lg font-semibold relative overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Техническая поддержка</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.button>

              <motion.button
                className="group border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold relative overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  borderColor: "transparent",
                  boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Консультация
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Правая колонка - интерактивный dashboard */}
          <motion.div
            className="relative h-full flex items-center justify-center"
            variants={containerVariants}
          >
            {/* Основной контейнер dashboard */}
            <motion.div
              className="relative w-full max-w-2xl h-[600px] lg:h-[700px] bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              {/* Header dashboard */}
              <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div className="text-white/60 text-sm font-mono">
                  Network Dashboard
                </div>
              </motion.div>

              {/* Мини-карты метрик */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    icon: "Activity",
                    value: "99.9%",
                    label: "Uptime",
                    color: "emerald",
                  },
                  {
                    icon: "Zap",
                    value: "1.2ms",
                    label: "Latency",
                    color: "blue",
                  },
                  {
                    icon: "Database",
                    value: "847GB",
                    label: "Traffic",
                    color: "purple",
                  },
                  {
                    icon: "Users",
                    value: "2,847",
                    label: "Devices",
                    color: "orange",
                  },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className={`p-2 rounded-lg bg-${metric.color}-500/20`}
                      >
                        <Icon
                          name={metric.icon as any}
                          size={16}
                          className={`text-${metric.color}-400`}
                        />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-white/60 text-sm">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Сетевая топология */}
              <motion.div
                className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Icon
                    name="Network"
                    size={20}
                    className="mr-2 text-blue-400"
                  />
                  Network Topology
                </h3>

                {/* SVG топология */}
                <div className="relative h-32">
                  <svg className="w-full h-full" viewBox="0 0 300 120">
                    {/* Соединительные линии */}
                    <motion.path
                      d="M50,60 L100,30 M100,30 L150,60 M150,60 L200,30 M200,30 L250,60"
                      stroke="rgba(59, 130, 246, 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 2 }}
                    />
                    <motion.path
                      d="M100,30 L150,30 M150,60 L200,60"
                      stroke="rgba(34, 197, 94, 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 2.2 }}
                    />

                    {/* Узлы сети */}
                    {[
                      { x: 50, y: 60, type: "router" },
                      { x: 100, y: 30, type: "switch" },
                      { x: 150, y: 60, type: "router" },
                      { x: 200, y: 30, type: "switch" },
                      { x: 250, y: 60, type: "endpoint" },
                    ].map((node, i) => (
                      <motion.g key={i}>
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r="8"
                          fill={
                            node.type === "router"
                              ? "#3b82f6"
                              : node.type === "switch"
                                ? "#22c55e"
                                : "#f59e0b"
                          }
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 2.5 + i * 0.1 }}
                        />
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r="12"
                          fill="none"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            delay: 3 + i * 0.2,
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      </motion.g>
                    ))}

                    {/* Пульсирующие точки данных */}
                    <motion.circle
                      cx="75"
                      cy="45"
                      r="2"
                      fill="#06d6a0"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        cx: [75, 125, 175, 225],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 4,
                      }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Быстрые действия */}
              <motion.div
                className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
              >
                {[
                  { icon: "Settings", label: "Config", color: "slate" },
                  { icon: "BarChart3", label: "Stats", color: "violet" },
                  { icon: "Shield", label: "Security", color: "red" },
                ].map((action, i) => (
                  <motion.button
                    key={action.label}
                    className={`flex flex-col items-center p-3 rounded-xl bg-${action.color}-500/20 border border-${action.color}-500/30 text-white hover:bg-${action.color}-500/30 transition-all`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 + i * 0.1 }}
                  >
                    <Icon
                      name={action.icon as any}
                      size={20}
                      className="mb-1"
                    />
                    <span className="text-xs font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Декоративные элементы */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Плавающие частицы */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
