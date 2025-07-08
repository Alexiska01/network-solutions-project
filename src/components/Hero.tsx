import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, BookOpen, Info, Shield, Wifi } from "lucide-react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showIDATA, setShowIDATA] = useState(false);

  const fullText =
    " — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

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
      {/* ✅ SVG линии + круг */}
      <div className="absolute inset-0 z-0">
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
          {/* SVG lines */}
          <path
            d="M0,200 Q300,100 600,200 T1200,200"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M0,300 Q400,150 800,300 T1200,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.15"
          />
          <path
            d="M0,400 Q200,250 400,400 T800,400 Q1000,350 1200,400"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.1"
          />
          <path
            d="M0,500 Q350,350 700,500 T1200,500"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.18"
          />
          <path
            d="M0,600 Q150,450 300,600 T600,600 Q750,550 900,600 T1200,600"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.12"
          />
          <path
            d="M0,0 Q400,200 800,100 T1200,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.1"
          />
          <path
            d="M0,800 Q300,600 600,700 T1200,500"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.08"
          />
          <path
            d="M100,150 L350,320 M350,320 L600,250 M600,250 L850,380 M850,380 L1100,300"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.08"
          />
          <path
            d="M200,450 L450,280 M450,280 L700,420 M700,420 L950,250"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.06"
          />
          {/* 🔵 Фоновый круг */}
          <circle cx="800" cy="380" r="110" fill="rgba(77, 177, 212, 0.6)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center px-[59px]">
          {/* Левая часть */}
          <div className="flex flex-col justify-between min-h-[260px]">
            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-4 leading-tight"
            >
              Профессиональные решения для сетевой инфраструктуры
            </motion.h1>

            <div className="relative max-w-2xl">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 text-blue-100 leading-relaxed min-h-[3em] whitespace-pre-wrap">
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

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white text-[#0065B3] px-6 py-3 rounded-md text-sm font-medium hover:bg-gradient-brand hover:text-white transition-all"
              >
                Техническая поддержка
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="border border-white text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gradient-brand hover:border-gradient-brand transition-all"
              >
                Консультация
              </motion.button>
            </div>
          </div>

          {/* Правая часть */}
          <div className="w-full flex flex-col items-start gap-6">
            <div className="flex items-start gap-4 w-full">
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: FileText,
                    label: "Документация",
                    color: "rgba(255, 240, 213, 0.52)",
                  },
                  {
                    icon: BookOpen,
                    label: "Инструкции",
                    color: "rgba(255, 240, 213, 0.52)",
                  },
                  {
                    icon: Info,
                    label: "Справочные материалы",
                    color: "rgba(255, 240, 213, 0.52)",
                  },
                ].map(({ icon: Icon, label, color }, i) => (
                  <motion.a
                    key={label}
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ backgroundColor: color, color: "#000000" }}
                    className="flex items-center gap-2 px-4 rounded-lg text-sm shadow-md font-bold py-2.5"
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
                style={{
                  backgroundColor: "rgba(255, 99, 132, 0.12)",
                  color: "#000000",
                }}
                className="px-4 py-4 rounded-xl shadow-lg w-64 text-sm font-medium flex flex-col gap-1 my-[23px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div
                  className="flex items-center gap-2 mb-1"
                  style={{ color: "#000000" }}
                >
                  <Shield className="w-4 h-4" />
                  Безопасность
                </div>
                <p className="font-normal" style={{ color: "#000000" }}>
                  Как обеспечить защиту сети?
                </p>
              </motion.a>
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: "rgba(54, 162, 235, 0.12)",
                color: "#000000",
              }}
              className="rounded-xl shadow-xl p-6 w-full max-w-md mx-[52px] font-semibold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div
                className="flex items-center gap-2 mb-2"
                style={{ color: "#000000" }}
              >
                <Wifi className="w-5 h-5" style={{ color: "#000000" }} />
                <span className="text-xl font-semibold">Wi-Fi</span>
              </div>
              <p className="text-sm" style={{ color: "#000000" }}>
                Беспроводные точки доступа
              </p>
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
