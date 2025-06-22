import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SeriesCatalog610Component = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                IDS610 — мощные L2+/L3-коммутаторы для корпоративной
                инфраструктуры
              </h1>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
                До 880 Вт PoE+, модульные блоки питания, uplink 25G — всё в
                одной платформе
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
                <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-hero hover:text-white transition-all duration-300 font-sans min-h-[44px]">
                  Подробнее
                </button>
                <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-white hover:text-[#0065B3] transition-all duration-300 font-sans min-h-[44px]">
                  Сравнить модели
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                PoE/PoE+ до 880 Вт
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Надежное питание устройств
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Network" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                25G uplink (SFP28)
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Высокоскоростное подключение
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Fan" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Модульное охлаждение и горячая замена БП
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Стабильная работа 24/7
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Поддержка Layer 3 и стекирования
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Отказоустойчивость сети
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Модели серии IDS610
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS610-24P-8X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS610-24P-8X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                24×1G Base-T, 8×25G SFP28, PoE 440 Вт
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids610-24p-8x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS610-48P-8X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS610-48P-8X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                48×1G Base-T, 8×25G SFP28, PoE 880 Вт
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids610-48p-8x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS610-24S-12T-8X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS610-24S-12T-8X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                24×1G SFP, 12×1G Base-T, 8×25G SFP28
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids610-24s-12t-8x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS610-48T-8X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS610-48T-8X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                48×1G Base-T, 8×25G SFP28
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids610-48t-8x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 mb-6">
            Нужна помощь с выбором?
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Наши инженеры помогут подобрать оптимальное решение для вашей
            инфраструктуры
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
          >
            <Icon name="MessageCircle" className="mr-2" />
            Связаться с инженером
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog610Component;
