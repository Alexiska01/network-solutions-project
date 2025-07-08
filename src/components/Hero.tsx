import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, BookOpen, Info, Shield, Wifi } from "lucide-react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showIDATA, setShowIDATA] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fullText =
    " — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIDATA(true);
    }, 1200);
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
    }, 30);
    return () => clearInterval(typingInterval);
  }, [showTyping]);

  return (
    <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <svg
  className="absolute inset-0 w-full h-full pointer-events-none"
  viewBox="0 0 1200 800"
  preserveAspectRatio="xMidYMid slice"
>
  <defs>
    <pattern
      id="wave-pattern"
      x="0"
      y="0"
      width="100"
      height="100"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M0,50 Q25,20 50,50 T100,50"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
      />
    </pattern>
  </defs>
  <path d="M0,200 Q300,100 600,200 T1200,200" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2" />
  <path d="M0,300 Q400,150 800,300 T1200,300" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
  <path d="M0,400 Q200,250 400,400 T800,400 Q1000,350 1200,400" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
  <path d="M0,500 Q350,350 700,500 T1200,500" stroke="white" strokeWidth="1.5" fill="none" opacity="0.18" />
  <path d="M0,600 Q150,450 300,600 T600,600 Q750,550 900,600 T1200,600" stroke="white" strokeWidth="1" fill="none" opacity="0.12" />
  <path d="M0,0 Q400,200 800,100 T1200,300" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
  <path d="M0,800 Q300,600 600,700 T1200,500" stroke="white" strokeWidth="1" fill="none" opacity="0.08" />
  <path d="M100,150 L350,320 M350,320 L600,250 M600,250 L850,380 M850,380 L1100,300" stroke="white" strokeWidth="1" fill="none" opacity="0.08" />
  <path d="M200,450 L450,280 M450,280 L700,420 M700,420 L950,250" stroke="white" strokeWidth="1" fill="none" opacity="0.06" />
</svg>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Левая часть */}
          <div className="flex flex-col justify-between min-h-[260px]">
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default"
            >
              Профессиональные решения для сетевой инфраструктуры
            </motion.h1>

            <div className="relative max-w-2xl">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 text-blue-100 leading-relaxed transition-all duration-300 hover:scale-105 hover:drop-shadow-md cursor-default min-h-[3em] whitespace-pre-wrap">
                {showIDATA && (
                  <motion.span
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 70, damping: 15 }}
                    onAnimationComplete={() => setShowTyping(true)}
                    className="inline-block"
                  >
                    iDATA
                  </motion.span>
                )}
                {showTyping && typingText}
                {showTyping && typingText.length < fullText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>

              <span
                className="invisible absolute pointer-events-none"
                aria-hidden="true"
              >
                iDATA{fullText}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 font-sans min-h-[44px] hover:scale-105 hover:shadow-lg"
              >
                Техническая поддержка
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg"
              >
                Консультация
              </motion.button>
            </div>
          </div>

          {/* Правая часть */}
          <div className="w-full flex flex-col items-start gap-6">
            <div className="flex items-start gap-4 w-full">
              <div className="flex flex-col gap-3">
                {[{
                  icon: FileText,
                  label: 'Документация'
                }, {
                  icon: BookOpen,
                  label: 'Инструкции'
                }, {
                  icon: Info,
                  label: 'Справочные материалы'
                }].map(({ icon: Icon, label }, i) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium hover:bg-yellow-100 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.a>
                ))}
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="backdrop-blur-sm text-white px-4 py-4 rounded-xl shadow-lg w-64 text-sm font-medium flex flex-col gap-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 text-white mb-1">
                  <Shield className="w-4 h-4" />
                  Безопасность
                </div>
                <p className="text-white font-normal">Ка обеспечить защиту сети?</p>
              </motion.a>
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="backdrop-blur-sm text-white rounded-xl shadow-xl p-6 w-full max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2 text-gray-800 mb-2">
                <Wifi className="w-5 h-5 text-blue-600" />
                <span className="text-xl font-semibold">Wi-Fi</span>
              </div>
              <p className="text-sm text-gray-600">Беспроводные точки доступа</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-4 bg-blue-200 rounded" />
                <div className="h-4 bg-blue-300 rounded" />
                <div className="h-4 bg-blue-100 rounded col-span-2" />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;