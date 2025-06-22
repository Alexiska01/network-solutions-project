import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SeriesCatalog4530Component = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-6 leading-tight">
            IDS4530 — расширяемые коммутаторы для корпоративной и операторской
            сети
          </h1>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-8 text-white/90 max-w-4xl mx-auto">
            До 736 Gbps, два слота расширения, двойное питание, PoE+ до 760 Вт
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              <Icon name="Info" className="mr-2" />
              Подробнее
            </Button>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gradient-hero hover:text-white border-2 border-white transition-all duration-300"
            >
              <Icon name="BarChart3" className="mr-2" />
              Сравнить модели
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Cpu" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Поддержка карт расширения 10G / 40G / 100G
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Гибкое масштабирование пропускной способности
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Battery" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Двойной модуль питания (redundant)
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Резервирование для максимальной надежности
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Gauge" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                Высокая коммутационная способность (до 736 Gbps)
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Максимальная производительность сети
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
                PoE/PoE+ до 760 Вт
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Питание для подключенных устройств
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
              Модели серии IDS4530
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS4530-48P-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS4530-48P-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                48×1G Base-T + 6×10G SFP+, 760 Вт PoE
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids4530-48p-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS4530-24P-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS4530-24P-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                24×1G Base-T + 6×10G SFP+, 380 Вт PoE
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids4530-24p-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS4530-48T-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS4530-48T-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                48×1G Base-T + 6×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids4530-48t-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS4530-24T-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS4530-24T-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                24×1G Base-T + 6×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids4530-24t-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS4530-24S-4X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS4530-24S-4X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                24×1G SFP + 4×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids4530-24s-4x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS4530-48S-4X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                IDS4530-48S-4X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4">
                48×1G SFP + 4×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids4530-48s-4x.html")
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

export default SeriesCatalog4530Component;
