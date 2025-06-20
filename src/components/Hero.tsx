import React from "react";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              iDATA — ведущий производитель коммутаторов, маршрутизаторов и
              беспроводного оборудования для корпоративных сетей любой
              сложности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Посмотреть продукты
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                Связаться с нами
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Icon
                    name="Network"
                    size={48}
                    className="mx-auto mb-3 text-blue-200"
                  />
                  <h3 className="font-semibold mb-1">Коммутаторы</h3>
                  <p className="text-sm text-blue-200">L2/L3 решения</p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Router"
                    size={48}
                    className="mx-auto mb-3 text-blue-200"
                  />
                  <h3 className="font-semibold mb-1">Маршрутизаторы</h3>
                  <p className="text-sm text-blue-200">Корпоративные</p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Wifi"
                    size={48}
                    className="mx-auto mb-3 text-blue-200"
                  />
                  <h3 className="font-semibold mb-1">Wi-Fi</h3>
                  <p className="text-sm text-blue-200">Беспроводные AP</p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Shield"
                    size={48}
                    className="mx-auto mb-3 text-blue-200"
                  />
                  <h3 className="font-semibold mb-1">Безопасность</h3>
                  <p className="text-sm text-blue-200">Защита сети</p>
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
