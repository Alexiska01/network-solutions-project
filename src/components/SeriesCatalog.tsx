import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SeriesCatalogComponent = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            IDS3730 — управляемые L2+/L3-коммутаторы корпоративного уровня
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto">
            До 740 Вт PoE+, стек до 4 устройств, uplink 10G, маршрутизация L3 —
            всё в одной платформе
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
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">PoE+ до 740 Вт</h3>
              <p className="text-gray-600">Питание для множества устройств</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Network" size={32} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">10G uplink (SFP+)</h3>
              <p className="text-gray-600">Высокоскоростное подключение</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Поддержка L3: ACL, QoS, маршрутизация
              </h3>
              <p className="text-gray-600">Расширенные сетевые функции</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Layers" size={32} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Стекирование до 4 устройств
              </h3>
              <p className="text-gray-600">Масштабируемая архитектура</p>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Модели серии IDS3730
            </h2>
            <p className="text-xl text-gray-600">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS3730-24P-4X */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3730-24P-4X
              </h3>
              <p className="text-gray-600 mb-4">
                24×1G PoE+, 4×10G SFP+, PoE 370 Вт
              </p>
              <Button
                className="w-full"
                onClick={() =>
                  (window.location.href = "/models/ids3730-24p-4x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3730-48P-6X */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3730-48P-6X
              </h3>
              <p className="text-gray-600 mb-4">
                48×1G PoE+, 6×10G SFP+, PoE 740 Вт
              </p>
              <Button
                className="w-full"
                onClick={() =>
                  (window.location.href = "/models/ids3730-48p-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3730-24F-4X */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3730-24F-4X
              </h3>
              <p className="text-gray-600 mb-4">
                24×1G SFP, 4×10G SFP+, без PoE
              </p>
              <Button
                className="w-full"
                onClick={() =>
                  (window.location.href = "/models/ids3730-24f-4x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3730-48T-6X */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3730-48T-6X
              </h3>
              <p className="text-gray-600 mb-4">
                48×1G Base-T, 6×10G SFP+, без PoE
              </p>
              <Button
                className="w-full"
                onClick={() =>
                  (window.location.href = "/models/ids3730-48t-6x.html")
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
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Нужна помощь с выбором?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Наши инженеры помогут подобрать оптимальное решение для вашей
            инфраструктуры
          </p>
          <Button
            size="lg"
            className="bg-gradient-hero text-white hover:opacity-90 transition-opacity duration-300 px-8 py-3"
          >
            <Icon name="MessageCircle" className="mr-2" />
            Связаться с инженером
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalogComponent;
