import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products = [
    {
      title: "Управляемые коммутаторы",
      description: "L3 коммутаторы с поддержкой VLAN, QoS и расширенными функциями управления",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка", 
        "Стекирование",
        "SNMP мониторинг",
      ],
      icon: "Network",
      gradient: "from-[#32398e] via-[#005baa] to-[#0079b6]",
      hoverGradient: "from-[#005baa] via-[#0079b6] to-[#0093b6]",
      accentColor: "#FF6B35",
      borderColor: "border-[#32398e]/20",
    },
    {
      title: "Корпоративные маршрутизаторы", 
      description: "Высокопроизводительные маршрутизаторы для филиальных сетей",
      features: [
        "VPN подключения",
        "Firewall встроенный",
        "Load balancing", 
        "Резервирование",
      ],
      icon: "Router",
      gradient: "from-[#0079b6] via-[#0093b6] to-[#00acad]",
      hoverGradient: "from-[#0093b6] via-[#00acad] to-[#53c2a4]",
      accentColor: "#F5B700",
      borderColor: "border-[#0079b6]/20",
    },
    {
      title: "Беспроводные решения",
      description: "Enterprise-класс точки доступа и контроллеры для Wi-Fi 6",
      features: [
        "Wi-Fi 6E поддержка",
        "Mesh технология", 
        "Централизованное управление",
        "Roaming",
      ],
      icon: "Wifi",
      gradient: "from-[#00acad] via-[#53c2a4] to-[#A0EEC0]",
      hoverGradient: "from-[#53c2a4] via-[#A0EEC0] to-[#D6F6FF]",
      accentColor: "#8A2BE2",
      borderColor: "border-[#00acad]/20",
    },
    {
      title: "Системы управления",
      description: "Централизованные платформы для мониторинга и управления сетевой инфраструктурой",
      features: [
        "Унифицированная панель",
        "Аналитика и отчеты",
        "Автоматизация процессов",
        "Масштабируемость",
      ],
      icon: "Settings",
      gradient: "from-[#1A237E] via-[#8338EC] to-[#B5179E]", 
      hoverGradient: "from-[#8338EC] via-[#B5179E] to-[#CBAACB]",
      accentColor: "#FF4E50",
      borderColor: "border-[#1A237E]/20",
    },
  ];

  // Премиальные анимации для десктопа
  const desktopVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94], // Премиальная кривая bezier
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
    hover: {
      y: -12,
      scale: 1.02,
      rotateY: 2,
      filter: "brightness(1.05)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    tap: {
      scale: 0.98,
      y: -8,
      transition: { duration: 0.1 },
    },
  };

  // Мягкие, оптимизированные анимации для мобильных
  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.23, 1, 0.32, 1], // Мягкая кривая
      },
    }),
    hover: {
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55], // Bouncy ease
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.5 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `linear-gradient(135deg, 
            #32398e 0%, 
            #005baa 25%, 
            #0079b6 50%, 
            #0093b6 75%, 
            #00acad 100%
          )`,
        }}
      />
      
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-[#53c2a4]/10 to-[#A0EEC0]/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#8A2BE2]/10 to-[#B5179E]/5 rounded-full blur-xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={isMobile ? mobileVariants : desktopVariants}
              whileHover="hover"
              whileTap="tap"
              className={`
                group relative bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl
                p-6 lg:p-8 h-full flex flex-col
                border-2 ${product.borderColor}
                shadow-xl hover:shadow-2xl
                transition-all duration-500 ease-out
                transform-gpu
                ${!isMobile ? 'hover:border-transparent' : ''}
              `}
              style={{
                backgroundImage: !isMobile ? `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)` : undefined,
              }}
            >
              {/* Hover gradient overlay for desktop */}
              {!isMobile && (
                <div 
                  className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${product.gradient.replace('from-', '').replace('via-', '').replace('to-', '')})`,
                  }}
                />
              )}

              {/* Header with icon and title */}
              <div className="flex gap-4 items-start mb-4 lg:mb-6 relative z-10">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`
                    w-14 h-14 lg:w-16 lg:h-16 
                    bg-gradient-to-br ${product.gradient}
                    rounded-xl lg:rounded-2xl
                    flex items-center justify-center
                    flex-shrink-0 shadow-lg
                    group-hover:shadow-xl
                    transition-all duration-500
                  `}
                  style={{
                    boxShadow: !isMobile ? `0 10px 25px -5px ${product.accentColor}20` : undefined,
                  }}
                >
                  <Icon
                    name={product.icon as any}
                    size={isMobile ? 24 : 28}
                    className="text-white filter drop-shadow-sm"
                    strokeWidth={1.5}
                  />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h3 
                    className="text-lg lg:text-xl font-bold text-gray-900 leading-tight mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {product.title === "Беспроводные решения" ? (
                      <>
                        Беспроводные<br className="hidden sm:block lg:hidden xl:block" /> решения
                      </>
                    ) : (
                      product.title
                    )}
                  </motion.h3>
                </div>
              </div>

              {/* Description */}
              <motion.div 
                className="mb-6 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>

              {/* Features list */}
              <div className="flex-1 mb-6 lg:mb-8 relative z-10">
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      custom={idx}
                      variants={featureVariants}
                      className="flex items-center text-sm lg:text-base text-gray-700"
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        style={{ backgroundColor: `${product.accentColor}15` }}
                      >
                        <Icon
                          name="Check"
                          size={12}
                          className="text-white"
                          style={{ color: product.accentColor }}
                          strokeWidth={2.5}
                        />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Enhanced CTA Button */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: !isMobile ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                {index === 0 ? (
                  <Link
                    to="/switches"
                    className={`
                      block w-full text-white py-3 lg:py-4 px-4 lg:px-6
                      rounded-xl lg:rounded-2xl font-semibold text-sm lg:text-base
                      text-center transition-all duration-500 transform-gpu
                      bg-gradient-to-r ${product.gradient}
                      hover:${product.hoverGradient}
                      shadow-lg hover:shadow-xl
                      ${!isMobile ? 'hover:-translate-y-1' : ''}
                      border border-white/20
                    `}
                    style={{
                      boxShadow: !isMobile ? `0 10px 25px -5px ${product.accentColor}30` : undefined,
                    }}
                  >
                    Подробнее
                  </Link>
                ) : (
                  <button 
                    className={`
                      w-full text-white py-3 lg:py-4 px-4 lg:px-6
                      rounded-xl lg:rounded-2xl font-semibold text-sm lg:text-base
                      transition-all duration-500 transform-gpu
                      bg-gradient-to-r ${product.gradient}
                      hover:${product.hoverGradient}
                      shadow-lg hover:shadow-xl
                      ${!isMobile ? 'hover:-translate-y-1' : ''}
                      border border-white/20
                    `}
                    style={{
                      boxShadow: !isMobile ? `0 10px 25px -5px ${product.accentColor}30` : undefined,
                    }}
                  >
                    Подробнее
                  </button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;