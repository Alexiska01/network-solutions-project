import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeviceCard3530 from "@/components/3530/DeviceCard3530"; // legacy card (will be replaced by redesigned grid)
// import ComparisonModal from "@/components/ComparisonModal";
import KeyFeatures3530 from "@/components/KeyFeatures3530";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { switchModels3530 } from "@/data/switchModels";
import Hero3530 from "@/components/3530/Hero3530";



const SeriesCatalog3530Component = () => {
  // const [filter, setFilter] = useState<FilterType>("all");
  const [compareModels, setCompareModels] = useState<string[]>([]);
  // const [showCompareModal, setShowCompareModal] = useState(false);
  const navigate = useNavigate();

  const toggleCompareModel = (model: string) => {
    setCompareModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model],
    );
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const filteredModels = switchModels3530;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 border-b border-gray-100 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-7xl mx-auto py-3 px-3 xs:px-4 sm:px-6 lg:px-[35px]">
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
                  <Link to="/#products">Продукты</Link>
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
                <BreadcrumbPage>IDS3530</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <Hero3530 />

      {/* Models Section (will be refactored to new professional layout) */}
  <section id="models-section" className="py-6 sm:py-8 lg:py-10 px-3 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(circle_at_70%_30%,#0079b6_0%,transparent_60%)]" />
        {/* Full-width decorative line in background */}
  <div className="absolute left-0 right-0 top-[66px] sm:top-[71px] md:top-[74px] h-[2px] bg-gradient-to-r from-gray-400/30 via-gray-500/45 to-gray-400/30" />
        <div className="max-w-7xl mx-auto relative">
          <header className="text-center mb-0">
            <h2 className="flex items-center justify-center">
              <span className="font-semibold tracking-[0.35em] text-gray-500 text-xs sm:text-sm md:text-base">SERIES 3530</span>
            </h2>
          </header>
          <div className="mt-3 sm:mt-4 mb-6 sm:mb-8" />
          {/* Legacy list (to be replaced by redesigned grid component) */}
          <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2">
            {filteredModels.map((model, index) => (
              <DeviceCard3530
                key={model.id}
                model={model}
                index={index}
                isInCompareList={compareModels.includes(model.id)}
                onToggleCompare={toggleCompareModel}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Panel */}
      {/* <ComparisonPanel
        compareModels={compareModels}
        onClearAll={() => setCompareModels([])}
        onRemoveModel={toggleCompareModel}
        onShowModal={() => setShowCompareModal(true)}
      /> */}

      {/* Comparison Modal */}
      {/* <ComparisonModal
        isOpen={showCompareModal}
        compareModels={compareModels}
        onClose={() => setShowCompareModal(false)}
        onRemoveModel={toggleCompareModel}
      /> */}

      {/* Key Features */}
      <section
        className="py-8 sm:py-12 lg:py-16 px-2 xs:px-3 sm:px-6 bg-gradient-hero"
      >
        <div className="max-w-6xl mx-auto">
          <KeyFeatures3530 />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-6 xs:py-8 md:py-12 lg:py-16 px-2 xs:px-3 sm:px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="relative inline-block text-base xs:text-xl sm:text-2xl font-semibold mx-auto px-2 sm:px-4">
            Нужна помощь с выбором оборудования?
            <span className="block w-12 sm:w-16 md:w-24 h-0.5 bg-gray-300 mt-2 sm:mt-3 mb-3 sm:mb-4 md:mb-6 mx-auto" />
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-sans w-[97%] sm:w-[85%] md:w-[65%] mx-auto text-xs sm:text-base md:text-lg leading-relaxed px-1 sm:px-4">
            Свяжитесь с нашими партнёрами!
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Связаться с партнёром
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog3530Component;