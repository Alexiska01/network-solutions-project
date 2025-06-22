import React from "react";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="bg-gradient-hero text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100">
              iDATA — ведущий производитель коммутаторов, маршрутизаторов и
              беспроводного оборудования для корпоративных сетей любой
              сложности.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-white text-[#0065B3] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gradient-hero hover:text-white transition-all duration-300 font-sans">
                Посмотреть продукты
              </button>
              <button className="border border-white text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-white hover:text-[#0065B3] transition-all duration-300 font-sans">
                Связаться с нами
              </button>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <Icon
                    name="Network"
                    size={32}
                    className="mx-auto mb-2 sm:mb-3 text-blue-200 sm:w-12 sm:h-12"
                  />
                  <h3 className="text-sm sm:text-base font-semibold mb-1">
                    Коммутаторы
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200">
                    L2/L3 решения
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Router"
                    size={32}
                    className="mx-auto mb-2 sm:mb-3 text-blue-200 sm:w-12 sm:h-12"
                  />
                  <h3 className="text-sm sm:text-base font-semibold mb-1">
                    Маршрутизаторы
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200">
                    Корпоративные
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Wifi"
                    size={32}
                    className="mx-auto mb-2 sm:mb-3 text-blue-200 sm:w-12 sm:h-12"
                  />
                  <h3 className="text-sm sm:text-base font-semibold mb-1">
                    Wi-Fi
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200">
                    Беспроводные AP
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Shield"
                    size={32}
                    className="mx-auto mb-2 sm:mb-3 text-blue-200 sm:w-12 sm:h-12"
                  />
                  <h3 className="text-sm sm:text-base font-semibold mb-1">
                    Безопасность
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-200">
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
