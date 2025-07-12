import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HeroCommuts = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Floating animation for background elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: "Network",
      title: "Корпоративные решения",
      subtitle: "Масштабируемость",
      gradient: "from-cyan-400 to-blue-500",
      delay: 0.8,
    },
    {
      icon: "Zap",
      title: "Высокая производительность",
      subtitle: "До 100 Гбит/с",
      gradient: "from-yellow-400 to-orange-500",
      delay: 1.0,
    },
    {
      icon: "Shield",
      title: "Надёжность и безопасность",
      subtitle: "Защита данных",
      gradient: "from-green-400 to-emerald-500",
      delay: 1.2,
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-[85vh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-16 lg:py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Профессиональное сетевое оборудование
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            Коммутаторы
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-blue-100/90 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Передовые технологии сетевой инфраструктуры для{" "}
            <span className="font-semibold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              корпоративных сетей
            </span>{" "}
            и центров обработки данных
          </motion.p>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Gradient Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm`}
                />

                {/* Card Content */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-8 h-full hover:bg-white/15 transition-all duration-300">
                  {/* Icon with Gradient Background */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl mb-4 shadow-lg`}
                  >
                    <Icon
                      name={feature.icon as any}
                      size={28}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm lg:text-base text-blue-200/80 font-medium">
                    {feature.subtitle}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 lg:gap-12 mt-16 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              { number: "50+", label: "Моделей" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Поддержка" },
              { number: "100G", label: "Скорость" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-blue-200/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-transparent to-transparent" />
    </motion.section>
  );
};

export default HeroCommuts;
