import { useState, useCallback } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ModelCard from "@/components/ModelCard";
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
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  }, []);

  const handleNavigate = useCallback((url: string) => {
    navigate(url);
  }, [navigate]);

  const filteredModels = switchModels4530.filter((model) =>
    filter === "all" ? true : model.category === filter
  );

  useViewportScroll();

  return (
    <div className="min-h-screen flex flex-col">
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
      <Hero4530 />   {/* <<< Просто вставляешь компонент Hero */}


      {/* Models Section */}
      <motion.section
        id="models-section"
        className="py-16 px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
                  <ModelCard
                    model={model}
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
        className="py-16 px-6 bg-gradient-hero"
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
        className="py-16 px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
