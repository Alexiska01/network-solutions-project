import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useViewportScroll } from "framer-motion";
import ModelCard from "@/components/ModelCard";
import FilterButtons from "@/components/FilterButtons";
import ComparisonPanel from "@/components/ComparisonPanel";
import ComparisonModal from "@/components/ComparisonModal";
import { switchModels4530 } from "@/data/switchModels";
import { FilterType } from "@/types/models";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import {
  ArrowUpDown,
  GitBranch,
  Network,
  Zap,
  Shield,
  Layers,
} from "lucide-react";

const SeriesCatalog4530Component = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompareModel = (model: string) => {
    setCompareModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model],
    );
  };

  const handleNavigate = (url: string) => {
    window.location.href = url;
  };

  const filteredModels = switchModels4530.filter((model) => {
    if (filter === "all") return true;
    return model.category === filter;
  });

  // Параллакс-эффект для фонового круга
  useViewportScroll();

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
        {/* Сеточный фон */}
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

        {/* Радиальное свечение справа */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-400/20 via-blue-500/10 to-transparent blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start lg:items-center">
            {/* Левая часть */}
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
              {/* Сабтайтл над заголовком */}
              <motion.p
                className="text-xs md:text-sm lg:text-base text-blue-200 font-medium mb-2 md:mb-3 uppercase tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Серия корпоративных коммутаторов
              </motion.p>

              {/* Основной заголовок */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-2 md:mb-3 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                IDS4530
              </motion.h1>

              {/* Блок преимуществ с иконками */}
              <motion.div
                className="md:mb-6 lg:mb-8 space-y-3 my-[26px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center gap-3 text-blue-100">
                  <Zap className="w-5 h-5 text-blue-300" />
                  <span className="text-sm md:text-base lg:text-lg">
                    До 736 Gbps производительность
                  </span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Layers className="w-5 h-5 text-blue-300" />
                  <span className="text-sm md:text-base lg:text-lg">
                    Два слота расширения
                  </span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Shield className="w-5 h-5 text-blue-300" />
                  <span className="text-sm md:text-base lg:text-lg">
                    Двойное питание и PoE+ до 760 Вт
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 my-0"
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

            {/* Правая часть с карточками */}
            <motion.div
              className="relative mt-6 md:mt-8 lg:mt-0 lg:justify-self-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Техно-сетка в фоне */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  style={{ opacity: 0.02 }}
                >
                  <defs>
                    <pattern
                      id="tech-grid"
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <g stroke="white" strokeWidth="0.5" fill="none">
                        <path d="M 40 0 L 0 0 0 40" />
                        <path d="M 20 0 L 20 20 L 0 20" />
                        <path d="M 40 20 L 20 20 L 20 40" />
                        <circle cx="20" cy="20" r="2" strokeWidth="0.3" />
                        <circle cx="0" cy="0" r="1" strokeWidth="0.3" />
                        <circle cx="40" cy="0" r="1" strokeWidth="0.3" />
                        <circle cx="0" cy="40" r="1" strokeWidth="0.3" />
                        <circle cx="40" cy="40" r="1" strokeWidth="0.3" />
                      </g>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#tech-grid)" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex items-start gap-6 w-full justify-center">
                  {/* Image-card с градиентом, блюром и рамкой */}
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex justify-center items-center px-5 py-3
                      rounded-lg
                      border border-white/30
                      shadow-md
                      -ml-24
                      bg-white/10
                    "
                    style={{
                      minWidth: "380px",
                      minHeight: "280px",
                      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 4px 16px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0px 2px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    <img
                      src="/img/Иерархия_4530.png"
                      alt="Иерархия 4530"
                      className="h-56 object-contain rounded"
                    />
                  </motion.div>

                  {/* Правая колонка — три feature-карточки справа от фото */}
                  <div className="flex flex-col gap-5 justify-center">
                    {[
                      {
                        icon: GitBranch,
                        label: "Статистическая маршрутизация",
                        delay: 0.2,
                      },
                      {
                        icon: Network,
                        label:
                          "Динамическая маршрутизация RIP, OSPF, BGP, ISIS",
                        delay: 0.3,
                      },
                      {
                        icon: ArrowUpDown,
                        label: "Модули расширения для интерфейсов 40G и 100G",
                        delay: 0.4,
                      },
                    ].map(({ icon: Icon, label, delay }) => (
                      <motion.a
                        key={label}
                        href="#"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="
                          group flex items-center gap-3 px-4 py-3
                          rounded-lg border transition-all duration-200
                          w-64 min-h-[60px] relative overflow-hidden
                        "
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          borderColor: "rgba(255,255,255,0.2)",
                          borderWidth: "1px",
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0px 8px 24px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0px 2px 8px rgba(0,0,0,0.1)";
                        }}
                      >
                        {/* Схематичный узор внутри карточки */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ opacity: 0.1 }}
                        >
                          <svg
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                          >
                            <defs>
                              <pattern
                                id={`tech-pattern-${label.replace(/\s+/g, "-")}`}
                                x="0"
                                y="0"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                              >
                                <g stroke="white" strokeWidth="0.5" fill="none">
                                  {/* Основная сетка */}
                                  <path d="M 0 0 L 40 0 M 0 20 L 40 20 M 0 40 L 40 40" />
                                  <path d="M 0 0 L 0 40 M 20 0 L 20 40 M 40 0 L 40 40" />

                                  {/* Диагональные линии */}
                                  <path
                                    d="M 0 0 L 20 20 M 20 0 L 40 20"
                                    strokeWidth="0.25"
                                  />
                                  <path
                                    d="M 0 20 L 20 40 M 20 20 L 40 40"
                                    strokeWidth="0.25"
                                  />

                                  {/* Узловые точки */}
                                  <circle
                                    cx="20"
                                    cy="20"
                                    r="2"
                                    strokeWidth="0.6"
                                  />
                                  <circle cx="0" cy="0" r="1" strokeWidth="1" />
                                  <circle
                                    cx="40"
                                    cy="40"
                                    r="1"
                                    strokeWidth="1"
                                  />
                                </g>
                              </pattern>
                            </defs>
                            <rect
                              width="100%"
                              height="100%"
                              fill={`url(#tech-pattern-${label.replace(/\s+/g, "-")})`}
                            />
                          </svg>
                        </div>

                        <Icon className="w-6 h-6 text-white/90 transition-transform duration-200 group-hover:translate-x-1 relative z-10" />
                        <span className="text-white font-medium relative z-10">
                          {label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Четвертая карточка с описанием под тремя */}
                <motion.div
                  className="flex items-center gap-3 px-4 py-2 rounded-lg border transition-all duration-200 w-full relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.2)",
                    borderWidth: "1px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0px 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0px 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Схематичный узор внутри горизонтальной карточки */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: 0.1 }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      className="absolute inset-0"
                    >
                      <defs>
                        <pattern
                          id="tech-pattern-horizontal"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <g stroke="white" strokeWidth="0.5" fill="none">
                            {/* Основная сетка */}
                            <path d="M 0 0 L 40 0 M 0 20 L 40 20 M 0 40 L 40 40" />
                            <path d="M 0 0 L 0 40 M 20 0 L 20 40 M 40 0 L 40 40" />

                            {/* Диагональные линии */}
                            <path
                              d="M 0 0 L 20 20 M 20 0 L 40 20"
                              strokeWidth="0.25"
                            />
                            <path
                              d="M 0 20 L 20 40 M 20 20 L 40 40"
                              strokeWidth="0.25"
                            />

                            {/* Узловые точки */}
                            <circle
                              cx="20"
                              cy="20"
                              r="2"
                              strokeWidth="0.6"
                              fill="none"
                            />
                            <circle
                              cx="0"
                              cy="0"
                              r="1"
                              strokeWidth="1"
                              fill="none"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="1"
                              strokeWidth="1"
                              fill="none"
                            />
                          </g>
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#tech-pattern-horizontal)"
                      />
                    </svg>
                  </div>

                  <Layers className="w-6 h-6 text-white/90 flex-shrink-0 relative z-10" />
                  <span className="text-white font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis relative z-10">
                    Расширяемые коммутаторы уровня доступа и агрегации для
                    небольших корпоративных сетей
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`
          @keyframes vanta-grid {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
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
              Модели серии IDS4530
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans mb-8">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
            <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredModels.map((model, index) => (
              <ModelCard
                key={`${model.id}-${filter}`}
                model={model}
                isInCompareList={compareModels.includes(model.id)}
                onToggleCompare={toggleCompareModel}
                onNavigate={handleNavigate}
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <ComparisonPanel
        compareModels={compareModels}
        onClearAll={() => setCompareModels([])}
        onRemoveModel={toggleCompareModel}
        onShowModal={() => setShowCompareModal(true)}
      />

      <ComparisonModal
        isOpen={showCompareModal}
        compareModels={compareModels}
        onClose={() => setShowCompareModal(false)}
        onRemoveModel={toggleCompareModel}
      />

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
