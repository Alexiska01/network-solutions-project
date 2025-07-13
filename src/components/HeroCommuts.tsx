import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

const HeroCommuts = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Отключаем параллакс на мобильных для производительности
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Floating animation for background elements - отключено на мобильных
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Отключаем mouse tracking на мобильных для экономии батареи
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const features = [
    {
      icon: "Network",
      title: "Корпоративные решения",
      subtitle: "Масштабируемость",
      gradient: "from-blue-400 to-blue-600",
      delay: 0.8,
    },
    {
      icon: "Zap",
      title: "Высокая производительность",
      subtitle: "До 100 Гбит/с",
      gradient: "from-blue-500 to-indigo-600",
      delay: 1.0,
    },
    {
      icon: "Shield",
      title: "Надёжность и безопасность",
      subtitle: "Защита данных",
      gradient: "from-indigo-500 to-blue-700",
      delay: 1.2,
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className={cn(
        "relative bg-gradient-hero text-white overflow-hidden",
        isMobile ? "min-h-[60vh]" : "min-h-[70vh]"
      )}
    >
      {/* Animated Background Grid - упрощено на мобильных */}
      <div className={cn(
        "absolute inset-0",
        isMobile ? "opacity-5" : "opacity-10"
      )}>
        <div
          className={cn(
            "absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]",
            isMobile ? "bg-[size:2rem_2rem]" : "bg-[size:4rem_4rem]"
          )}
          style={!isMobile ? {
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          } : {}}
        />
      </div>

      {/* Floating Orbs - упрощены на мобильных */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={cn(
            "absolute bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl",
            isMobile 
              ? "top-1/3 left-1/3 w-32 h-32" 
              : "top-1/4 left-1/4 w-64 h-64"
          )}
          animate={!isMobile ? {
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          } : {
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: isMobile ? 8 : 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className={cn(
            "absolute bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl",
            isMobile 
              ? "top-2/3 right-1/3 w-40 h-40" 
              : "top-3/4 right-1/4 w-96 h-96"
          )}
          animate={!isMobile ? {
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          } : {
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: isMobile ? 10 : 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8",
        isMobile ? "py-8" : "py-12 lg:py-16"
      )}>
        <div className="text-center">
          {/* Main Title */}
          <motion.h1
            className={cn(
              "font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent",
              isMobile 
                ? "text-3xl sm:text-4xl" 
                : "text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            )}
            initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: isMobile ? 0.6 : 1,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            Коммутаторы
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={cn(
              "text-blue-100/90 max-w-4xl mx-auto font-light leading-relaxed",
              isMobile 
                ? "text-base sm:text-lg mb-8 px-2" 
                : "text-xl md:text-2xl lg:text-3xl mb-12"
            )}
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
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
            className={cn(
              "max-w-6xl mx-auto",
              isMobile 
                ? "grid grid-cols-1 gap-4 px-2" 
                : "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            )}
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: isMobile ? 0.4 : 0.6, 
                  delay: isMobile ? 0.7 + index * 0.1 : feature.delay 
                }}
                whileHover={!isMobile ? {
                  scale: 1.05,
                  transition: { duration: 0.2 },
                } : {}}
              >
                {/* Gradient Border - только на десктопе */}
                {!isMobile && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm`}
                  />
                )}

                {/* Card Content */}
                <div className={cn(
                  "relative bg-white/10 backdrop-blur-md border border-white/20 h-full transition-all duration-300",
                  isMobile 
                    ? "rounded-xl p-4 hover:bg-white/15" 
                    : "rounded-2xl p-6 lg:p-8 hover:bg-white/15"
                )}>
                  {/* Icon with Gradient Background */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center bg-gradient-to-r rounded-xl mb-4 shadow-lg",
                      feature.gradient,
                      isMobile ? "w-10 h-10" : "w-14 h-14"
                    )}
                  >
                    <Icon
                      name={feature.icon as any}
                      size={isMobile ? 20 : 28}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    "font-bold text-white mb-2 group-hover:text-blue-100 transition-colors",
                    isMobile ? "text-base" : "text-lg lg:text-xl"
                  )}>
                    {feature.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={cn(
                    "text-blue-200/80 font-medium",
                    isMobile ? "text-sm" : "text-sm lg:text-base"
                  )}>
                    {feature.subtitle}
                  </p>

                  {/* Hover Effect - только на десктопе */}
                  {!isMobile && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className={cn(
              "flex flex-wrap justify-center border-t border-white/20",
              isMobile 
                ? "gap-4 mt-8 pt-6" 
                : "gap-8 lg:gap-12 mt-16 pt-8"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: isMobile ? 1 : 1.4 }}
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
                initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: isMobile ? 1.1 + index * 0.1 : 1.6 + index * 0.1 
                }}
              >
                <div className={cn(
                  "font-bold text-white mb-1",
                  isMobile ? "text-xl" : "text-2xl lg:text-3xl"
                )}>
                  {stat.number}
                </div>
                <div className={cn(
                  "text-blue-200/80 font-medium",
                  isMobile ? "text-xs" : "text-sm"
                )}>
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