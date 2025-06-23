import React from "react";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
              iDATA — ведущий производитель коммутаторов, маршрутизаторов и
              беспроводного оборудования для корпоративных сетей любой
              сложности.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
              <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-hero hover:text-white transition-all duration-300 font-sans min-h-[44px]">
                Посмотреть продукты
              </button>
              <button className="border border-white bg-gradient-hero text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium transition-all duration-300 font-sans min-h-[44px]">
                Связаться с нами
              </button>
            </div>
          </div>
          <div className="relative mt-6 md:mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div className="text-center">
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
                <div className="text-center">
                  <Icon
                    name="Router"
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
                <div className="text-center">
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
                <div className="text-center">
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
