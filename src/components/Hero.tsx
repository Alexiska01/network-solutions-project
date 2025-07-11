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
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIDATA(true);
    }, 800);
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
    }, 20);
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
          {/* Левая колонка - фиксированная структура */}
          <div className="flex flex-col h-full min-h-[500px]">
            {/* Заголовок - фиксированная позиция */}
            <motion.div
              variants={itemVariants}
              className="h-80 flex items-start mb-8"
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
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

            {/* Подзаголовок - фиксированная высота */}
            <motion.div
              variants={itemVariants}
              className="h-32 flex items-start justify-start mb-8"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
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
            </motion.div>

            {/* Кнопки - фиксированная позиция внизу */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-auto"
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

          {/* Правая колонка - мировой уровень */}
          <motion.div
            className="relative h-full flex items-center justify-center"
            variants={containerVariants}
          >
            {/* Главная интерактивная панель */}
            <div className="relative w-full max-w-md">
              {/* Центральная консоль */}
              <motion.div
                className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.5,
                }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
                }}
              >
                {/* Заголовок панели */}
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    Сетевое управление
                  </h3>
                  <p className="text-blue-200 text-sm">
                    Централизованный контроль
                  </p>
                </motion.div>

                {/* Интерактивные элементы */}
                <div className="space-y-4">
                  {/* Статус сети */}
                  <motion.div
                    className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-white font-medium">
                        Сеть активна
                      </span>
                    </div>
                    <Icon name="Wifi" size={20} className="text-green-400" />
                  </motion.div>

                  {/* Производительность */}
                  <motion.div
                    className="p-4 bg-white/10 rounded-2xl border border-white/10"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">Нагрузка</span>
                      <span className="text-blue-200 text-sm">67%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "67%" }}
                        transition={{
                          delay: 1.5,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Устройства */}
                  <motion.div
                    className="grid grid-cols-3 gap-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    {[
                      {
                        icon: "Router",
                        label: "Маршрутизатор",
                        status: "active",
                      },
                      {
                        icon: "Network",
                        label: "Коммутатор",
                        status: "active",
                      },
                      { icon: "Shield", label: "Firewall", status: "warning" },
                    ].map((device, index) => (
                      <motion.div
                        key={device.label}
                        className="p-3 bg-white/10 rounded-xl border border-white/10 text-center"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255,255,255,0.2)",
                          y: -2,
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 1.6 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        <Icon
                          name={device.icon as any}
                          size={24}
                          className={`mx-auto mb-2 ${
                            device.status === "active"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        />
                        <div className="text-xs text-white font-medium">
                          {device.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Декоративные элементы */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>

              {/* Плавающие карточки */}
              <motion.div
                className="absolute -top-16 -left-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, x: -100, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: 2, type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name="TrendingUp"
                    size={16}
                    className="text-green-400"
                  />
                  <span className="text-white text-sm font-medium">
                    +24% скорость
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-16 -right-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: 2.2, type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} className="text-blue-400" />
                  <span className="text-white text-sm font-medium">
                    100% защита
                  </span>
                </div>
              </motion.div>

              {/* Орбитальные элементы */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-80 h-80 border border-white/10 rounded-full pointer-events-none"
                style={{ x: "-50%", y: "-50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
                  style={{ x: "-50%" }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                  style={{ x: "-50%" }}
                />
              </motion.div>
            </div>

            {/* Плавающие частицы */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + (i % 4) * 18}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
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
