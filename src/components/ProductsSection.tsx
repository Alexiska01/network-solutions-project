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
      description: "Корпоративные L3 коммутаторы с расширенными функциями управления",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка",
        "SNMP мониторинг",
      ],
      icon: "Network",
      gradientPosition: "from-[#32398e] to-[#005baa]",
    },
    {
      title: "Корпоративные маршрутизаторы", 
      description: "Высокопроизводительные решения для филиальных сетей",
      features: [
        "VPN подключения",
        "Встроенный Firewall",
        "Load balancing",
      ],
      icon: "Router",
      gradientPosition: "from-[#005baa] to-[#0079b6]",
    },
    {
      title: "Беспроводные решения",
      description: "Enterprise-класс точки доступа и контроллеры Wi-Fi 6",
      features: [
        "Wi-Fi 6E поддержка",
        "Mesh технология",
        "Централизованное управление",
      ],
      icon: "Wifi",
      gradientPosition: "from-[#0079b6] to-[#0093b6]",
    },
    {
      title: "Системы управления",
      description: "Централизованные платформы для управления инфраструктурой",
      features: [
        "Унифицированная панель",
        "Аналитика и отчеты",
        "Автоматизация процессов",
      ],
      icon: "Settings",
      gradientPosition: "from-[#0093b6] to-[#00acad]",
    },
  ];

  // Премиальные анимации для десктопа с staggered и scale-in эффектами
  const desktopVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.85,
      rotateX: 15,
      filter: "blur(8px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.23, 1, 0.32, 1], // Премиальная cubic-bezier кривая
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    }),
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 2,
      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    tap: {
      scale: 0.98,
      y: -4,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  };

  // Деликатные анимации для мобильных устройств
  const mobileVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.92,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: i * 0.12, // Чуть медленнее для мобильных
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    }),
    hover: {
      y: -3,
      scale: 1.005,
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

  // Варианты для контейнера с улучшенным staggering
  const containerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.12 : 0.15, // Увеличенные интервалы для WOW-эффекта
        delayChildren: 0.2, // Небольшая задержка перед началом
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Варианты для анимации иконок с дополнительным эффектом
  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -90,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4, // Иконки появляются после карточки
        ease: [0.68, -0.55, 0.265, 1.55], // Bouncy ease для иконок
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 3,
      transition: { duration: 0.3 },
    },
  };

  // Варианты для анимации элементов списка
  const featureVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6 + i * 0.08, // Последовательное появление элементов
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Минимальный фоновый градиент */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: `linear-gradient(135deg, #32398e, #005baa, #0079b6, #0093b6, #00acad, #53c2a4)`,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Изменено с whileInView на animate для мгновенного срабатывания при загрузке
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={isMobile ? mobileVariants : desktopVariants}
              whileHover="hover"
              whileTap="tap"
              className={`
                group relative bg-white rounded-xl
                p-5 md:p-6 flex flex-col
                border border-gray-100
                shadow-md hover:shadow-lg
                transition-all duration-300 ease-out
                transform-gpu
                min-h-[280px] md:min-h-[300px]
              `}
            >
              {/* Заголовок с анимированной иконкой */}
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  variants={iconVariants}
                  className={`
                    w-10 h-10 md:w-12 md:h-12 
                    bg-gradient-to-br ${product.gradientPosition}
                    rounded-lg
                    flex items-center justify-center
                    flex-shrink-0 shadow-sm
                    relative overflow-hidden
                  `}
                  whileHover="hover"
                >
                  {/* Гlow эффект для иконки */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${product.gradientPosition.includes('#32398e') ? '#32398e' : 
                        product.gradientPosition.includes('#005baa') ? '#005baa' : 
                        product.gradientPosition.includes('#0079b6') ? '#0079b6' : '#0093b6'}40 0%, transparent 70%)`
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <Icon
                      name={product.icon as any}
                      size={isMobile ? 20 : 24}
                      className="text-white relative z-10"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="text-base md:text-lg font-semibold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {product.title === "Беспроводные решения" ? (
                    <>
                      Беспроводные<br className="hidden sm:block lg:hidden xl:block" /> решения
                    </>
                  ) : (
                    <>
                      {product.title}
                      <br className="hidden sm:block lg:hidden xl:block opacity-0 h-0" aria-hidden="true" />
                    </>
                  )}
                </motion.h3>
              </div>

              {/* Анимированное описание */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                  {product.title !== "Управляемые коммутаторы" && (
                    <br className="opacity-0 h-0" aria-hidden="true" />
                  )}
                </p>
              </motion.div>

              {/* Анимированный список характеристик */}
              <motion.div 
                className="flex-1 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      custom={idx}
                      variants={featureVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center text-sm text-gray-700"
                    >
                      <motion.div 
                        className={`
                          w-4 h-4 rounded-full flex items-center justify-center mr-2.5 flex-shrink-0
                          bg-gradient-to-br ${product.gradientPosition}
                        `}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + idx * 0.1, duration: 0.3, type: "spring" }}
                      >
                        <Icon
                          name="Check"
                          size={10}
                          className="text-white"
                          strokeWidth={2.5}
                        />
                      </motion.div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Анимированная кнопка */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.9 + index * 0.05, // Индивидуальная задержка для каждой кнопки
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  scale: !isMobile ? 1.02 : 1,
                  y: !isMobile ? -2 : 0,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {index === 0 ? (
                  <Link
                    to="/switches"
                    className={`
                      block w-full text-white py-2.5 md:py-3 px-4
                      rounded-lg font-medium text-sm
                      text-center transition-all duration-300 transform-gpu
                      bg-gradient-to-r ${product.gradientPosition}
                      hover:shadow-lg
                    `}
                  >
                    Подробнее
                  </Link>
                ) : (
                  <button 
                    className={`
                      w-full text-white py-2.5 md:py-3 px-4
                      rounded-lg font-medium text-sm
                      transition-all duration-300 transform-gpu
                      bg-gradient-to-r ${product.gradientPosition}
                      hover:shadow-lg
                    `}
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