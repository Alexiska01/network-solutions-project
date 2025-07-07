import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.2),transparent)] animate-pulse delay-1000"></div>

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
                Посмотреть продукты
              </button>
              <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                Связаться с нами
              </button>
            </div>
          </div>
          <div className="relative mt-6 md:mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/15 hover:scale-105">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Network"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Коммутаторы
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    L2/L3 решения
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Route"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Маршрутизаторы
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Корпоративные
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Wifi"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Wi-Fi
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Беспроводные AP
                  </p>
                </div>
                <div className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2">
                  <Icon
                    name="Shield"
                    size={20}
                    className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                  />
                  <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                    Безопасность
                  </h3>
                  <p className="text-xs md:text-sm text-blue-200">
                    Защита сети
                  </p>
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
