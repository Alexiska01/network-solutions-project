import { useState, useCallback } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeviceCard4530 from "@/components/DeviceCard4530";
import FilterButtons from "@/components/FilterButtons";
import ComparisonPanel from "@/components/ComparisonPanel";
import ComparisonModal from "@/components/ComparisonModal";
import KeyFeatures from "@/components/KeyFeatures";
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
import Hero4530 from "@/components/Hero4530"; // <<< ВАЖНО: импорт Hero

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1 + 0.1,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
};

const SeriesCatalog4530Component = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const navigate = useNavigate();

  const toggleCompareModel = useCallback((model: string) => {
    setCompareModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model],
    );
  }, []);

  const handleNavigate = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate],
  );

  const filteredModels = switchModels4530.filter((model) =>
    filter === "all" ? true : model.category === filter,
  );

  useViewportScroll();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-[35px]">
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
      <Hero4530 /> {/* <<< Просто вставляешь компонент Hero */}
      {/* Models Section */}
      <motion.section
        id="models-section"
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans px-4">
              Модели серии IDS4530
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 font-sans mb-6 sm:mb-8 px-4">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
            <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  layout
                >
                  <DeviceCard4530
                    model={model}
                    index={index}
                    isInCompareList={compareModels.includes(model.id)}
                    onToggleCompare={toggleCompareModel}
                    onNavigate={handleNavigate}
                    animationDelay={index * 0.1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
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
      {/* Key Features Section */}
      <motion.section
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <KeyFeatures />
        </div>
      </motion.section>
      {/* CTA Section */}
      <motion.section
        className="py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="relative inline-block text-lg sm:text-xl md:text-2xl font-semibold mx-auto px-2 sm:px-4">
            Нужна помощь с выбором оборудования?
            <span className="block w-12 sm:w-16 md:w-24 h-0.5 bg-gray-300 mt-2 sm:mt-3 mb-3 sm:mb-4 md:mb-6 mx-auto" />
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-sans w-[95%] sm:w-[90%] md:w-[70%] mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
            Свяжитесь с нашими партнёрами!
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Связаться с партнёром
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default SeriesCatalog4530Component;
