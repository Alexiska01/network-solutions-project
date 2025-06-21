import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SeriesCatalog3530Component = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            IDS3530 — управляемые L2 коммутаторы уровня доступа
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto">
            До 370 Вт PoE+, uplink 1G/10G, расширенное управление QoS —
            оптимальное решение для доступа
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
                <Icon name="Zap" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">PoE+ до 370 Вт</h3>
              <p className="text-gray-600">Надежное питание устройств</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Network" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1G/10G uplink</h3>
              <p className="text-gray-600">Гибкие варианты подключения</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                L2 управление: VLAN, ACL, QoS
              </h3>
              <p className="text-gray-600">Полное управление трафиком</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Settings" size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Простое управление</h3>
              <p className="text-gray-600">Web-интерфейс и CLI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Модели серии IDS3530
            </h2>
            <p className="text-xl text-gray-600">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS3530-24P-2X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3530-24P-2X
              </h3>
              <p className="text-gray-600 mb-4">
                24×1G PoE+, 2×10G SFP+, PoE 185 Вт
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids3530-24p-2x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3530-48P-4X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3530-48P-4X
              </h3>
              <p className="text-gray-600 mb-4">
                48×1G PoE+, 4×10G SFP+, PoE 370 Вт
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids3530-48p-4x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3530-24T-2X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3530-24T-2X
              </h3>
              <p className="text-gray-600 mb-4">
                24×1G Base-T, 2×1G SFP, без PoE
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids3530-24t-2x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3530-48T-4X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                IDS3530-48T-4X
              </h3>
              <p className="text-gray-600 mb-4">
                48×1G Base-T, 4×1G SFP, без PoE
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/models/ids3530-48t-4x.html")
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Нужна помощь с выбором?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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

export default SeriesCatalog3530Component;
