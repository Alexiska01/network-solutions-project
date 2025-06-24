import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import BenefitCard from "@/components/BenefitCard";

const SeriesCatalog3530Component = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                <span className="lg:hidden">
                  IDS3530 — надёжные L2+/L3-коммутаторы для промышленной
                  инфраструктуры
                </span>
                <span className="hidden lg:block">
                  IDS3530 — надёжные
                  <br />
                  промышленные коммутаторы
                </span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
                <span className="lg:hidden">
                  До 760 Вт PoE+, модульные блоки питания, uplink 10G — всё в
                  одной платформе
                </span>
                <span className="hidden lg:block">
                  До 760 Вт PoE+, uplink 10G — всё в одной платформе
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
                <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-hero hover:text-white transition-all duration-300 font-sans min-h-[44px]">
                  Подробнее
                </button>
                <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand">
                  Сравнить модели
                </button>
              </div>
            </div>

            {/* Visual Elements - Desktop Only */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-80 h-80">
                {/* Central Network Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center animate-pulse">
                  <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/10 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-md opacity-80"></div>
                  </div>
                </div>

                {/* Floating Network Nodes */}
                <div
                  className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-cyan-300/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="w-6 h-6 bg-white/60 rounded-full"></div>
                </div>

                <div
                  className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-300/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center animate-fade-in"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="w-6 h-6 bg-white/60 rounded-full"></div>
                </div>

                <div
                  className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-300/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center animate-fade-in"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="w-6 h-6 bg-white/60 rounded-full"></div>
                </div>

                <div
                  className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-yellow-300/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center animate-fade-in"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="w-6 h-6 bg-white/60 rounded-full"></div>
                </div>

                {/* Connection Lines */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-90 animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                  <div
                    className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>

                {/* Floating Stats */}
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in"
                  style={{ animationDelay: "2.5s" }}
                >
                  <span className="text-white/90 text-sm font-medium">
                    10G SFP+
                  </span>
                </div>

                <div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in"
                  style={{ animationDelay: "3s" }}
                >
                  <span className="text-white/90 text-sm font-medium">
                    760W PoE+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-20 h-0.5 bg-gradient-hero mx-auto mb-6"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-sans">
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
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
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
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
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
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
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
                className="w-full bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300"
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
          <h2 className="text-[36px] font-semibold text-gray-900 mb-6 font-sans w-[90%] md:w-[70%] mx-auto">
            Нужна помощь с выбором?
          </h2>
          <p className="text-[18px] text-gray-600 mb-8 font-sans w-[90%] md:w-[70%] mx-auto">
            Наша компания поможет подобрать оптимальное решение для вашей
            инфраструктуры
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
          >
            Связаться с нами
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog3530Component;
