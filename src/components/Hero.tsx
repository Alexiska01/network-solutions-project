import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Icon from "@/components/ui/icon";

export default function Hero() {
  const [showIDATA, setShowIDATA] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [typingText, setTypingText] = useState("");

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);

  const fullText =
    " — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIDATA(true);
    }, 1000);
    return () => clearTimeout(timer);
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
    }, 15);
    return () => clearInterval(typingInterval);
  }, [showTyping]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="bg-gradient-hero text-white py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[95vh] flex items-center">
      {/* Простой градиентный фон */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-hero"
        style={{ y: backgroundY }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full"
        style={{ y: contentY }}
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Левая колонка - профессиональный компактный дизайн */}
          <div className="flex flex-col h-full min-h-[500px] relative">
            {/* Тонкий профессиональный фон */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/2 to-cyan-500/2 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            />

            {/* Заголовок - компактный профессиональный */}
            <motion.div variants={itemVariants} className="mb-4 relative">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8,
                }}
              >
                <div className="space-y-1">
                  <motion.span
                    className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Профессиональные
                  </motion.span>

                  <motion.span
                    className="block bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    решения для сетевой
                  </motion.span>

                  <motion.span
                    className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent pb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    инфраструктуры
                  </motion.span>
                </div>
              </motion.h1>
            </motion.div>

            {/* Подзаголовок - компактный профессиональный */}
            <motion.div variants={itemVariants} className="mb-8 relative">
              <div className="relative">
                <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
                  {showIDATA && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 0.6,
                      }}
                      onAnimationComplete={() => setShowTyping(true)}
                      className="inline-block font-bold text-white mr-1"
                    >
                      iDATA
                    </motion.span>
                  )}
                  {showTyping && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-blue-100/90"
                    >
                      {typingText}
                    </motion.span>
                  )}
                  {showTyping && typingText.length < fullText.length && (
                    <motion.span
                      className="inline-block w-0.5 h-5 bg-blue-300 ml-1 rounded-full"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </p>
              </div>
            </motion.div>

            {/* Кнопки - профессиональный дизайн */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-auto"
            >
              <motion.button
                className="group bg-white text-[#0065B3] px-8 py-4 rounded-xl text-lg font-semibold relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon name="Headphones" size={20} />
                  Техническая поддержка
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Icon name="Headphones" size={20} />
                  Техническая поддержка
                </span>
              </motion.button>

              <motion.button
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold relative overflow-hidden transition-all duration-300 hover:border-white/50 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Консультация
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Правая колонка - интерактивная панель */}
          <div className="relative h-full min-h-[600px] flex items-center justify-center">
            <motion.div
              className="relative w-full max-w-lg bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-lg rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.8,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="flex items-center justify-between p-6 border-b border-cyan-400/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                  <span className="text-cyan-100 font-medium">
                    System Monitor
                  </span>
                </div>
                <span className="text-cyan-300 text-sm">
                  <Icon name="Zap" size={16} className="inline mr-1" />
                  Online
                </span>
              </motion.div>

              <div className="p-6 space-y-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        name="Activity"
                        size={20}
                        className="text-blue-400"
                      />
                      <span className="text-white font-medium">Сеть</span>
                    </div>
                    <span className="text-green-400">99.5%</span>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        name="Shield"
                        size={20}
                        className="text-green-400"
                      />
                      <span className="text-white font-medium">
                        Безопасность
                      </span>
                    </div>
                    <span className="text-green-400">Активна</span>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        name="TrendingUp"
                        size={20}
                        className="text-purple-400"
                      />
                      <span className="text-white font-medium">
                        Производительность
                      </span>
                    </div>
                    <span className="text-green-400">Отлично</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-purple-400/60 rounded-full blur-sm"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/6 w-1 h-1 bg-pink-400/60 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
