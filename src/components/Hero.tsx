import { useEffect, useState } from "react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const fullText =
    "iDATA — ведущий производитель коммутаторов, маршрутизаторов и беспроводного оборудования для корпоративных сетей любой сложности.";

  // Typing effect
  useEffect(() => {
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
  }, []);

  return (
    <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
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

          {/* Flowing wave lines */}
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

          {/* Diagonal intersecting lines */}
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

          {/* Subtle network connections */}
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
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed transition-all duration-300 hover:scale-105 hover:drop-shadow-md cursor-default min-h-[3em]">
              {typingText}
              {typingText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
              <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 font-sans min-h-[44px] hover:scale-105 hover:shadow-lg">
                Техническая поддержка
              </button>
              <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                Консультация
              </button>
            </div>
          </div>
          <div className="relative mt-6 md:mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <div className="text-center">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">
                  Профессиональные решения
                </h3>
                <p className="text-sm md:text-base text-blue-200 mb-4 md:mb-6">
                  Комплексные технологии для корпоративных сетей любой сложности
                </p>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                  <button className="bg-white/20 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-white/30 transition-all duration-300">
                    Узнать больше
                  </button>
                  <button className="border border-white/50 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300">
                    Каталог
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
