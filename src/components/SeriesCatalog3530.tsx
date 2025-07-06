import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import BenefitCard from "@/components/BenefitCard";

const SeriesCatalog3530Component = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section с живым фоном */}
      <section
        className="text-white py-8 md:py-12 lg:py-16 xl:py-20 relative"
        style={{
          minHeight: "600px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
        }}
      >
        {/* Анимированная сетка Vanta.net */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "vanta-grid 20s linear infinite",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center h-full text-center">
            {/* Заголовок на две строки */}
            <h1 className="text-white mb-6 leading-tight">
              <span className="block text-6xl md:text-8xl font-bold">
                IDS3530
              </span>
              <span className="block text-2xl md:text-3xl font-normal mt-2">
                — надёжные L2+/L3-коммутаторы
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              для промышленной инфраструктуры
            </p>

            {/* Сабтайтл */}
            <div className="text-center mb-8">
              <p className="text-base md:text-lg text-white/90 mb-6">
                «До 760 Вт PoE+, модульные блоки питания, uplink 10G — всё в
                одной платформе»
              </p>
            </div>

            {/* Иконки преимуществ */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Zap" className="h-5 w-5" />
                <span className="text-sm">PoE</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Network" className="h-5 w-5" />
                <span className="text-sm">10G uplink</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Snowflake" className="h-5 w-5" />
                <span className="text-sm">охлаждение</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Shield" className="h-5 w-5" />
                <span className="text-sm">L3</span>
              </div>
            </div>

            {/* Кнопки-фильтры */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm px-6 py-3"
              >
                Только с PoE
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm px-6 py-3"
              >
                Только с SFP
              </Button>
            </div>
          </div>
        </div>

        {/* CSS для анимации */}
        <style jsx>{`
          @keyframes vanta-grid {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(50px, 50px);
            }
          }
        `}</style>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-20 h-0.5 bg-gradient-hero mx-auto mb-6"></div>
            <h2 className="text-[20px] md:text-3xl font-bold text-gray-900 font-sans">
              Ключевые преимущества
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard
              icon="Zap"
              iconColor="bg-gradient-to-r from-[#003A85] to-[#0063C2]"
              title="PoE/PoE+ до 880 Вт"
              description="Надёжное питание устройств"
            />
            <BenefitCard
              icon="Network"
              iconColor="bg-gradient-to-r from-[#0093B9] via-[#00AEB4] to-[#00B9A8]"
              title="10G uplink (SFP+)"
              description="Высокоскоростное подключение"
            />
            <BenefitCard
              icon="Fan"
              iconColor="bg-gradient-to-r from-[#553C9A] to-[#B794F4]"
              title="Надёжное охлаждение и фиксированные БП"
              description="Стабильная работа 24/7"
            />
            <BenefitCard
              icon="Shield"
              iconColor="bg-gradient-to-r from-[#DD6B20] to-[#F6AD55]"
              title="Поддержка Layer 3 и резервирования"
              description="Отказоустойчивость сети"
            />
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Модели серии IDS3530
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS3530-24P-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS3530-24P-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×1G Base-T, 6×10G SFP+, PoE 380 Вт
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/products/switches/ids3530/24p-6x")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3530-48P-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS3530-48P-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                48×1G Base-T, 6×10G SFP+, PoE 760 Вт
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids3530-48p-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3530-24S-8T-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS3530-24S-8T-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×1G SFP, 8×1G Base-T, 6×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids3530-24s-8t-6x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS3530-48T-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS3530-48T-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                48×1G Base-T, 6×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids3530-48t-6x.html")
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
          <h2 className="text-[20px] font-semibold text-gray-900 mb-6 font-sans w-[90%] md:w-[70%] mx-auto md:text-[36px]">
            Нужна рекомендация?
          </h2>
          <p className="text-[14px] text-gray-600 mb-8 font-sans w-[90%] md:w-[70%] mx-auto md:text-[18px]">
            Оставьте заявку — мы подберём оптимальное решение и подготовим
            расчёт стоимости.
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
          >
            Получить расчёт
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog3530Component;
