import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { motion } from "framer-motion";

const SeriesCatalog3530Component = () => {
  const [filter, setFilter] = useState<"all" | "poe" | "sfp">("all");
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompareModel = (model: string) => {
    setCompareModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model],
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - унифицированный с главной страницей */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden">
        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
        {/* Анимированная сетка */}
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
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default"
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
                  IDS3530
                </motion.span>
                <motion.span
                  className="block text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal mt-2 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  — надёжные L2+/L3-коммутаторы
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-sm md:text-base lg:text-lg xl:text-xl mb-2 md:mb-3 text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                для распределённых корпоративных сетей
              </motion.p>
              <motion.p
                className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                До 760 Вт PoE+, модульные блоки питания, uplink 10G — всё в
                одной платформе
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
                <motion.div
                  className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.9,
                      },
                    },
                  }}
                >
                  <motion.div
                    className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2 cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    aria-label="Power over Ethernet до 760 Ватт"
                  >
                    <Icon
                      name="Zap"
                      size={20}
                      className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                    />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      PoE до 760Вт
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Питание устройств
                    </p>
                  </motion.div>
                  <motion.div
                    className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2 cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    aria-label="10 гигабитный uplink"
                  >
                    <Icon
                      name="Network"
                      size={20}
                      className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                    />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      10G uplink
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Высокая скорость
                    </p>
                  </motion.div>
                  <motion.div
                    className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2 cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    aria-label="Охлаждение и стабильная работа"
                  >
                    <Icon
                      name="Fan"
                      size={20}
                      className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                    />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      Охлаждение
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Стабильная работа
                    </p>
                  </motion.div>
                  <motion.div
                    className="text-center transition-all duration-300 hover:scale-110 hover:bg-white/10 rounded-lg p-2 cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    aria-label="Надёжная защита сети"
                  >
                    <Icon
                      name="Shield"
                      size={20}
                      className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                    />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      Layer 3
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Маршрутизация
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
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
              Модели серии IDS3530
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans mb-8">
              Выберите оптимальную конфигурацию для ваших задач
            </p>

            {/* Фильтры */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="px-6 py-2 transition-all duration-300"
              >
                Все модели
              </Button>
              <Button
                variant={filter === "poe" ? "default" : "outline"}
                onClick={() => setFilter("poe")}
                className="px-6 py-2 transition-all duration-300"
              >
                Только PoE
              </Button>
              <Button
                variant={filter === "sfp" ? "default" : "outline"}
                onClick={() => setFilter("sfp")}
                className="px-6 py-2 transition-all duration-300"
              >
                Только SFP
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS3530-24P-6X */}
            {(filter === "all" || filter === "poe") && (
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleCompareModel("IDS3530-24P-6X")}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      compareModels.includes("IDS3530-24P-6X")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
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
              </motion.div>
            )}

            {/* IDS3530-48P-6X */}
            {(filter === "all" || filter === "poe") && (
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleCompareModel("IDS3530-48P-6X")}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      compareModels.includes("IDS3530-48P-6X")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
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
              </motion.div>
            )}

            {/* IDS3530-24S-8T-6X */}
            {(filter === "all" || filter === "sfp") && (
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleCompareModel("IDS3530-24S-8T-6X")}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      compareModels.includes("IDS3530-24S-8T-6X")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
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
              </motion.div>
            )}

            {/* IDS3530-48T-6X */}
            {(filter === "all" || filter === "sfp") && (
              <motion.div
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleCompareModel("IDS3530-48T-6X")}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      compareModels.includes("IDS3530-48T-6X")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Icon name="Plus" className="h-4 w-4" />
                  </button>
                </div>
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
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Comparison Panel */}
      {compareModels.length >= 2 && (
        <motion.section
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-gray-900 font-sans">
                Выбрано для сравнения: {compareModels.length} модели
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {compareModels.map((model) => (
                    <div key={model} className="flex items-center gap-2">
                      <Icon
                        name="Network"
                        className="h-6 w-6 text-brand-primary"
                      />
                      <span className="text-sm text-gray-600 font-sans">
                        {model}
                      </span>
                      <button
                        onClick={() => toggleCompareModel(model)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Icon name="X" className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCompareModels([])}
                    className="px-4 py-2 text-sm"
                  >
                    Очистить
                  </Button>
                  <Button
                    className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-6 py-2"
                    onClick={() => setShowCompareModal(true)}
                  >
                    Сравнить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-sans">
                  Сравнение моделей
                </h2>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Icon name="X" className="h-6 w-6" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-sans">
                        Характеристики
                      </th>
                      {compareModels.map((model) => (
                        <th key={model} className="text-left p-4 font-sans">
                          {model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold">Порты 1G</td>
                      {compareModels.map((model) => (
                        <td key={model} className="p-4">
                          {model.includes("24P")
                            ? "24×1G Base-T"
                            : model.includes("48P")
                              ? "48×1G Base-T"
                              : model.includes("24S")
                                ? "24×1G SFP + 8×1G Base-T"
                                : model.includes("48T")
                                  ? "48×1G Base-T"
                                  : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold">Порты 10G</td>
                      {compareModels.map((model) => (
                        <td key={model} className="p-4">
                          6×10G SFP+
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold">PoE</td>
                      {compareModels.map((model) => (
                        <td key={model} className="p-4">
                          {model.includes("24P")
                            ? "380 Вт"
                            : model.includes("48P")
                              ? "760 Вт"
                              : model.includes("24S") || model.includes("48T")
                                ? "Нет"
                                : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-semibold">Layer 3</td>
                      {compareModels.map((model) => (
                        <td key={model} className="p-4">
                          Да
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
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
      </motion.section>
    </div>
  );
};

export default SeriesCatalog3530Component;
