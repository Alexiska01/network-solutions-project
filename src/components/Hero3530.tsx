import { motion } from "framer-motion";
import { BlurImage } from "@/components/BlurImage";
import Icon from "@/components/ui/icon";
import { useEffect } from "react";

// Фичи для правого блока IDS3530
const featuresRight = [
  {
    icon: "Layers3",
    label: "Стек до 8 устройств (10G SFP+)",
  },
  {
    icon: "Zap",
    label: "PoE/PoE+ для питания устройств",
  },
  {
    icon: "Repeat",
    label: "Высокая доступность: STP, RSTP, MSTP",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
  hover: { scale: 1.03, y: -4 },
  tap: { scale: 0.98 },
};

const Hero3530 = () => {
  useEffect(() => {
    const img = new Image();
    img.src = "/img/Иерархия_3530.png";
  }, []);

  return (
    <section className="bg-gradient-hero text-white py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden" style={{ height: '600px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start lg:items-center w-full">
          {/* Левая часть */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-base text-blue-200 font-medium mb-2 md:mb-3 uppercase tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Серия корпоративных коммутаторов
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-2 md:mb-3 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 120,
              }}
            >
              IDS3530
            </motion.h1>
            <motion.div
              className="mb-4 sm:mb-6 md:mb-6 lg:mb-8 space-y-3 my-4 sm:my-6 lg:my-[26px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Server"
                  size={20}
                  strokeWidth={1.7}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-base lg:text-lg">
                  До 760 Вт PoE+, 10G uplink, модульные БП
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Layers3"
                  size={20}
                  strokeWidth={1.7}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-base lg:text-lg">
                  Стек до 8 устройств, кольцевые топологии
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-blue-100">
                <Icon
                  name="Settings"
                  size={20}
                  strokeWidth={1.7}
                  className="text-blue-300 flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-base lg:text-lg">
                  QoS, SNMP, автоматизация (ZTP), удалённое управление
                </span>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4 lg:gap-4 my-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <button
                className="bg-white text-[#0065B3] px-4 sm:px-5 md:px-6 lg:px-6 py-3 sm:py-3 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-sm sm:text-sm md:text-sm lg:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 font-sans min-h-[44px] hover:scale-105 hover:shadow-lg"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1-4xHlvPUr7kUBCQBzgh7Lz2FGC1COfwe/view?usp=drive_link",
                    "_blank",
                  )
                }
              >
                Посмотреть документацию
              </button>
              <button className="border border-white text-white px-4 sm:px-5 md:px-6 lg:px-6 py-3 sm:py-3 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-sm sm:text-sm md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                Получить консультацию
              </button>
            </motion.div>
          </motion.div>
          {/* Правая часть */}
          <motion.div
            className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-0 lg:justify-self-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="flex items-start gap-3 sm:gap-4 md:gap-6 w-full justify-center flex-col sm:flex-row md:flex-nowrap">
                {/* Фото */}
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  custom={0}
                  className="relative flex items-center justify-center w-full sm:w-[300px] md:w-[340px] lg:w-[380px] h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-lg border border-white/30 overflow-hidden shadow transition-shadow duration-300 hover:shadow-lg hover:scale-105 mx-auto sm:mx-0"
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                  <BlurImage
                    src="/img/Иерархия_3530.png"
                    alt="Иерархия 3530"
                    className="relative z-10 h-[140px] sm:h-[160px] md:h-[200px] lg:h-56 w-auto"
                  />
                </motion.div>
                {/* Фичи-иконки справа */}
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center w-full sm:w-auto">
                  {featuresRight.map(({ icon, label }, i) => (
                    <motion.a
                      key={label}
                      href="#"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-200 w-full sm:w-60 md:w-64 min-h-[48px] sm:min-h-[56px] relative overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2 + i * 0.1,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(255,255,255,0.2)",
                        borderWidth: "1px",
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 min-w-[20px] min-h-[20px] sm:min-w-[24px] sm:min-h-[24px] rounded bg-white/5 flex-shrink-0">
                        <Icon
                          name={icon as any}
                          size={16}
                          strokeWidth={1.7}
                          className="text-white"
                        />
                      </div>
                      <span className="text-white font-medium relative z-10 text-sm sm:text-base">
                        {label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
              {/* Описание под фичами */}
              <motion.div
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-200 w-full relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.2)",
                  borderWidth: "1px",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 min-w-[20px] min-h-[20px] sm:min-w-[24px] sm:min-h-[24px] rounded bg-white/5 flex-shrink-0">
                  <Icon
                    name="ServerCog"
                    size={16}
                    strokeWidth={1.7}
                    className="text-white/80"
                  />
                </div>
                <span className="text-white font-medium text-xs sm:text-sm relative z-10 leading-tight">
                  Лёгкая интеграция в корпоративные сети различной сложности,
                  поддержка кольцевых топологий, автоматизация и удалённое
                  управление
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3530;