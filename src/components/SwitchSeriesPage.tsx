import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SwitchSeriesPage = () => {
  return (
    <div className="min-h-screen">
      {/* IDS3730 Section */}
      <section className="py-20 px-6 bg-gradient-hero text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-bold mb-6 leading-tight"
              style={{ fontSize: "39px" }}
            >
              Коммутаторы серии IDS3730
            </h2>
            <p
              className="mb-8 text-white/90 max-w-4xl mx-auto"
              style={{ fontSize: "20px" }}
            >
              Управляемые L2+/L3-коммутаторы доступа. До 1400 Вт PoE+, стек до 4
              устройств, uplink 10G
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">IDS3730-24T-6X</h3>
              <p className="text-white/80 text-sm mb-4">
                24×1G Base-T, 6×10G SFP+
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">IDS3730-48T-6X</h3>
              <p className="text-white/80 text-sm mb-4">
                48×1G Base-T, 6×10G SFP+
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">IDS3730-24P-6X</h3>
              <p className="text-white/80 text-sm mb-4">
                24×1G Base-T, PoE+ 760 Вт
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IDS3530 Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-bold mb-6 text-gray-900"
              style={{ fontSize: "39px" }}
            >
              Коммутаторы серии IDS3530
            </h2>
            <p
              className="text-gray-600 max-w-4xl mx-auto"
              style={{ fontSize: "20px" }}
            >
              Надёжные L2+/L3-коммутаторы для промышленной инфраструктуры. До
              760 Вт PoE+, модульные блоки питания
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS3530-24P-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                24×1G Base-T, PoE 380 Вт
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS3530-48P-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                48×1G Base-T, PoE 760 Вт
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS3530-24S-8T-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                24×1G SFP, 8×1G Base-T
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS3530-48T-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                48×1G Base-T, 6×10G SFP+
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IDS4530 Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-bold mb-6 text-gray-900"
              style={{ fontSize: "39px" }}
            >
              Коммутаторы серии IDS4530
            </h2>
            <p
              className="text-gray-600 max-w-4xl mx-auto"
              style={{ fontSize: "20px" }}
            >
              Расширяемые коммутаторы для корпоративной и операторской сети. До
              736 Gbps, два слота расширения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS4530-48P-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                48×1G Base-T, 760 Вт PoE
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS4530-24P-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                24×1G Base-T, 380 Вт PoE
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                IDS4530-48T-6X
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                48×1G Base-T + 6×10G SFP+
              </p>
              <Button
                size="sm"
                className="w-full bg-brand-primary hover:bg-gradient-hero"
              >
                <Icon name="Info" className="mr-2" size={16} />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IDS6010 Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-bold mb-6 text-gray-900"
              style={{ fontSize: "39px" }}
            >
              Коммутаторы серии IDS6010
            </h2>
            <p
              className="text-gray-600 max-w-4xl mx-auto"
              style={{ fontSize: "20px" }}
            >
              Мощные 10G/25G/40G/100G-коммутаторы для магистральных решений. До
              960 Gbps пропускной способности
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-brand-primary/5 to-blue-500/5 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                IDS6010-24T-18X-8Y
              </h3>
              <p className="text-gray-600 mb-4">
                24×1G Base-T, 18×10G SFP+, 8×25G SFP28
              </p>
              <Button className="w-full bg-brand-primary hover:bg-gradient-hero">
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-blue-500/5 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                IDS6010-24X-2Q
              </h3>
              <p className="text-gray-600 mb-4">24×10G SFP+, 2×40G QSFP+</p>
              <Button className="w-full bg-brand-primary hover:bg-gradient-hero">
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-blue-500/5 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                IDS6010-24X-2C
              </h3>
              <p className="text-gray-600 mb-4">
                24×10G SFP+, 2×100G/40G QSFP28
              </p>
              <Button className="w-full bg-brand-primary hover:bg-gradient-hero">
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            <div className="bg-gradient-to-br from-brand-primary/5 to-blue-500/5 rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                IDS6010-48X
              </h3>
              <p className="text-gray-600 mb-4">48×10G SFP+</p>
              <Button className="w-full bg-brand-primary hover:bg-gradient-hero">
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Нужна помощь с выбором?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Наши инженеры помогут подобрать оптимальное решение для вашей
            инфраструктуры
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 px-8 py-3"
          >
            <Icon name="MessageCircle" className="mr-2" />
            Связаться с инженером
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SwitchSeriesPage;
