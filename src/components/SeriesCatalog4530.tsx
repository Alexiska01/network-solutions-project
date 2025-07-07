import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import BenefitCard from "@/components/BenefitCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const SeriesCatalog4530Component = () => {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-4 px-[35px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Продукты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/switches">Коммутаторы</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>IDS4530</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
        {/* Animated Grid */}
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

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <motion.h1
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                <motion.span
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 140,
                  }}
                >
                  IDS4530
                </motion.span>
                <motion.span
                  className="block text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal mt-2 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  — расширяемые коммутаторы
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-sm md:text-base lg:text-lg xl:text-xl mb-2 md:mb-3 text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                для корпоративной и операторской сети
              </motion.p>
              <motion.p
                className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                До 736 Gbps, два слота расширения, двойное питание, PoE+ до 760
                Вт
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <button className="bg-white text-[#0065B3] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium hover:bg-gradient-brand hover:text-white hover:border hover:border-white transition-all duration-300 font-sans min-h-[44px] hover:scale-105 hover:shadow-lg">
                  Посмотреть все модели
                </button>
                <button className="border border-white text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-md md:rounded-lg text-xs md:text-sm lg:text-base font-medium relative overflow-hidden transition-all duration-300 font-sans min-h-[44px] hover:bg-gradient-brand hover:border-gradient-brand hover:scale-105 hover:shadow-lg">
                  Получить консультацию
                </button>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative mt-6 md:mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/15 hover:scale-105"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 md:mb-3 mx-auto">
                      <Icon name="Zap" className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <p className="text-xs md:text-sm font-medium">736 Gbps</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 md:mb-3 mx-auto">
                      <Icon name="Battery" className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <p className="text-xs md:text-sm font-medium">
                      Двойное питание
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 md:mb-3 mx-auto">
                      <Icon name="Gauge" className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <p className="text-xs md:text-sm font-medium">
                      Мониторинг 24/7
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-2 md:mb-3 mx-auto">
                      <Icon name="Settings" className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <p className="text-xs md:text-sm font-medium">
                      Простая настройка
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
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
              title="10G / 40G / 100G карты"
              description="Гибкое масштабирование пропускной способности"
            />
            <BenefitCard
              icon="Battery"
              iconColor="bg-gradient-to-r from-[#0093B9] via-[#00AEB4] to-[#00B9A8]"
              title="Двойной модуль питания"
              description="Резервирование для максимальной надежности"
            />
            <BenefitCard
              icon="Gauge"
              iconColor="bg-gradient-to-r from-[#553C9A] to-[#B794F4]"
              title="Мониторинг 24/7"
              description="Непрерывный контроль производительности"
            />
            <BenefitCard
              icon="Settings"
              iconColor="bg-gradient-to-r from-[#DD6B20] to-[#F6AD55]"
              title="Простая настройка"
              description="Интуитивный веб-интерфейс управления"
            />
          </div>
        </div>
      </section>

      {/* Models Section */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Модели серии IDS4530
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans mb-8">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS4530-48P-6X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS4530-48P-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                48×1G Base-T + 6×10G SFP+, 760 Вт PoE
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
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
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS4530-24P-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×1G Base-T + 6×10G SFP+, 380 Вт PoE
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
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
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS4530-48T-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                48×1G Base-T + 6×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
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
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS4530-24T-6X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×1G Base-T + 6×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
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
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS4530-24S-4X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×1G SFP + 4×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
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
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS4530-48S-4X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                48×1G SFP + 4×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
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
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="relative inline-block text-2xl font-semibold mx-auto">
            Нужна помощь с выбором оборудования?
            <span className="block w-24 h-0.5 bg-gray-300 mt-3 mb-6 mx-auto" />
          </h2>
          <p className="text-gray-600 mb-8 font-sans w-[90%] md:w-[70%] mx-auto md:text-[18px] text-lg leading-relaxed">
            Свяжитесь с нашими партнёрами!
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
          >
            Связаться с партнёром
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default SeriesCatalog4530Component;
