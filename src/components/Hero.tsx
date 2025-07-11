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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 40 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const floatingCards = [
    {
      icon: "Shield",
      title: "Безопасность",
      subtitle: "Как обеспечить защиту сети?",
      color: "from-red-400/20 to-pink-400/20",
      iconColor: "text-red-500",
      delay: 0.8,
    },
    {
      icon: "FileText",
      title: "Документация",
      subtitle: "Техническая документация",
      color: "from-orange-400/20 to-yellow-400/20",
      iconColor: "text-orange-500",
      delay: 1.0,
    },
    {
      icon: "BookOpen",
      title: "Инструкции",
      subtitle: "Руководства пользователя",
      color: "from-green-400/20 to-emerald-400/20",
      iconColor: "text-green-500",
      delay: 1.2,
    },
    {
      icon: "Info",
      title: "Справочные материалы",
      subtitle: "База знаний",
      color: "from-blue-400/20 to-cyan-400/20",
      iconColor: "text-blue-500",
      delay: 1.4,
    },
  ];

  return (
    <section className="bg-gradient-hero text-white py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Анимированный фон */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Геометрические элементы */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/15 rotate-45 animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping" />

        {/* Волны */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>

          {/* Анимированные волны */}
          <motion.path
            d="M0,200 Q300,100 600,200 T1200,200"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,300 Q400,150 800,300 T1200,300"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Сетевые узлы */}
          <motion.circle
            cx="200"
            cy="250"
            r="4"
            fill="rgba(255,255,255,0.3)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.circle
            cx="600"
            cy="200"
            r="6"
            fill="rgba(255,255,255,0.4)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          <motion.circle
            cx="1000"
            cy="280"
            r="5"
            fill="rgba(255,255,255,0.35)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 1, delay: 1.4 }}
          />
        </svg>
      </motion.div>

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
          {/* Левая колонка */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
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

            <motion.div variants={itemVariants} className="relative">
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
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
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

          {/* Правая колонка - карточки */}
          <motion.div
            className="relative h-full flex items-center justify-center"
            variants={containerVariants}
          >
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className={`
                    relative p-6 rounded-2xl backdrop-blur-xl border border-white/20
                    bg-gradient-to-br ${card.color} shadow-2xl cursor-pointer
                    ${index === 0 ? "col-span-2" : ""}
                    ${index === 3 ? "col-span-2" : ""}
                  `}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  transition={{ delay: card.delay }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg bg-white/20 ${card.iconColor}`}
                      >
                        <Icon name={card.icon as any} size={20} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {card.subtitle}
                    </p>

                    {/* Декоративные элементы */}
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="w-1 h-1 bg-white/20 rounded-full" />
                    </div>
                  </div>

                  {/* Градиентная подсветка при ховере */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 rounded-2xl"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Дополнительные плавающие элементы */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 rounded-full"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-300/20 rounded-full"
              animate={{
                y: [0, 15, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
