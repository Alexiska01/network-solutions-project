import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Icon from "@/components/ui/icon";
import HeroRightPanel from "./heroblok/HeroRightPanel";

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

  // Плавный скролл к продуктам
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowIDATA(true), 800);
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
    }, 15);
    return () => clearInterval(typingInterval);
  }, [showTyping]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="bg-gradient-hero text-white py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[95vh] flex items-center">
      {/* Фон */}
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
          {/* Левая колонка */}
          <div className="flex flex-col h-full min-h-[520px] relative overflow-visible">
            {/* ...ВСЯ левая часть как была... */}
            {/* Плавающие декоры */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl"
              animate={{
                y: [0, 15, 0],
                rotate: [360, 180, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            {/* Заголовок */}
            <motion.div
              variants={itemVariants}
              className="flex items-start relative"
              style={{ marginTop: "5%", marginBottom: "10%" }}
            >
              {/* ...ВАШ красивый заголовок со всеми декорами... */}
              {/* --- */}
              {/* ...оставьте всё как было... */}
            </motion.div>
            {/* Подзаголовок */}
            <motion.div
              variants={itemVariants}
              className="h-28 flex items-start justify-start mb-6 relative"
            >
              <div className="relative z-10">
                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
                  {showIDATA && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.3, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        duration: 1,
                      }}
                      onAnimationComplete={() => setShowTyping(true)}
                      className="inline-block font-black text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text relative"
                    >
                      iDATA
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-lg blur-lg -z-10"
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </motion.span>
                  )}
                  {showTyping && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-blue-100/90 font-medium"
                    >
                      {typingText}
                    </motion.span>
                  )}
                  {showTyping && typingText.length < fullText.length && (
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-gradient-to-t from-cyan-400 to-blue-400 ml-1 rounded-full shadow-lg shadow-cyan-400/50"
                      animate={{
                        opacity: [0, 1, 0],
                        scaleY: [1, 1.2, 1],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </p>
              </div>
            </motion.div>
            {/* Кнопки */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-auto relative pb-8"
            >
              <motion.button
                className="group relative bg-gradient-to-r from-white to-blue-50 hover:from-transparent hover:to-transparent text-[#0065B3] px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold overflow-hidden transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] z-10"
                onClick={scrollToProducts}
                whileHover={{ scale: 1.05, rotateY: -2, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 1.8, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0, rotate: -45 }}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["-200% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Icon
                    name="HardDrive"
                    size={20}
                    className="group-hover:text-white transition-colors"
                  />
                  Оборудование
                </span>
              </motion.button>
              <motion.button
                className="group relative border-2 border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold overflow-hidden transition-all duration-500 backdrop-blur-sm hover:border-transparent shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.2)] z-10"
                whileHover={{ scale: 1.05, rotateY: 2, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 2, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0, rotate: -45 }}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["-200% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Icon
                    name="MessageCircle"
                    size={20}
                    className="group-hover:text-white transition-colors"
                  />
                  Консультация
                </span>
              </motion.button>
              <motion.div
                className="absolute -bottom-8 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full"
                style={{ x: "-50%" }}
                animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
              />
            </motion.div>
            {/* Декор-элементы */}
            <motion.div
              className="absolute -left-8 top-1/2 w-2 h-16 bg-gradient-to-b from-cyan-400/40 to-blue-500/40 rounded-full blur-sm"
              style={{ y: "-50%" }}
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -right-8 top-1/3 w-1 h-12 bg-gradient-to-b from-purple-400/40 to-pink-500/40 rounded-full blur-sm"
              animate={{
                scaleY: [0.3, 1, 0.3],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Правая колонка */}
          <HeroRightPanel />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;