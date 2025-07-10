import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { Shuffle, Route, Network, Wifi } from "lucide-react";

const SeriesCatalog4530Component = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompareModel = (model: string) => {
    setCompareModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const handleNavigate = (url: string) => {
    window.location.href = url;
  };

  const filteredModels = switchModels4530.filter((model) => {
    if (filter === "all") return true;
    return model.category === filter;
  });

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

        {/* Круг на фоне */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="1120" cy="340" r="260" fill="rgba(77, 177, 212, 0.6)" />
        </svg>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Левая часть */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <motion.h1
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 120 }}
              >
                <motion.span
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 140 }}
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
                До 736 Gbps, два слота расширения, двойное питание, PoE+ до 760 Вт
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

            {/* Правая часть с карточками */}
            <motion.div
              className="relative mt-6 md:mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative z-10 flex flex-col items-start gap-6">
                <div className="flex items-start gap-4 w-full">
                <div className="flex items-start gap-4 w-full">
  {/* Левая карточка — только изображение */}
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="flex justify-center items-center px-4 py-4 rounded-xl shadow-lg bg-white -ml-20"
    style={{ minWidth: "290px", minHeight: "210px" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <img
      src="/images/module-photo.jpg"
      alt="Модуль расширения"
      className="w-24 h-24 object-contain rounded"
    />
  </motion.div>

  {/* Правая колонка — три карточки с иконками и текстом */}
  <div className="flex flex-col gap-3 md:ml-3">
    {/* 1. Статистическая маршрутизация */}
    <motion.a
      href="#"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{ backgroundColor: "rgba(255, 240, 213, 0.52)", color: "#000000" }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-md text-sm font-bold text-[#313335]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Route className="w-4 h-4" />
      Статистическая маршрутизация
    </motion.a>

    {/* 2. Динамическая маршрутизация */}
    <motion.a
      href="#"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{ backgroundColor: "rgba(255, 240, 213, 0.52)", color: "#000000" }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-md text-sm font-bold text-[#313335]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Network className="w-4 h-4" />
      Динамическая маршрутизация RIP, OSPF, BGP, ISIS
    </motion.a>

    {/* 3. Модули расширения */}
    <motion.a
      href="#"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{ backgroundColor: "rgba(255, 99, 132, 0.12)", color: "#000000" }}
      className="flex items-center gap-2 px-4 py-4 rounded-xl shadow-lg text-sm font-medium text-[#313335]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Shuffle className="w-4 h-4" />
      Модули расширения для интерфейсов 40G и 100G
    </motion.a>
    </div>
  </div>
</div>
                {/* Карточка «Серия IDS4530» */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "#000000" }}
                  className="rounded-xl shadow-xl p-6 w-full max-w-md mx-[52px] font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi className="w-5 h-5 text-[#313335]" />
                    <span className="text-xl font-semibold text-[#313335]">Серия IDS4530</span>
                  </div>
                  <p className="text-sm text-[#313335]">
                    Коммутаторы для построения уровня доступа или узлов агрегации в небольших корпоративных сетях.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="py-2 px-3 bg-white/40 text-[#313335] text-center text-xs rounded-md shadow">48 портов</div>
                    <div className="py-2 px-3 bg-white/40 text-[#313335] text-center text-xs rounded-md shadow">PoE до 760 Вт</div>
                    <div className="py-2 px-3 bg-white/40 text-[#313335] text-center text-xs rounded-md shadow">2 слота расширения</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
        <style>{`@keyframes vanta-grid { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 50px); } }`}
        </style>
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
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">Модели серии IDS4530</h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans mb-8">Выберите оптимальную конфигурацию для ваших задач</p>
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