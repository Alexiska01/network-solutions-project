import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeviceCard3730 from "@/components/3730/DeviceCard3730"; // если нужен свой компонент
import { switchModels3730 } from "@/data/switchModels";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Hero3730 from "@/components/3730/Hero3730";
import KeyFeatures3730 from "@/components/3730/KeyFeatures3730";

const SeriesCatalog3730Component = () => {
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const navigate = useNavigate();
  const toggleCompareModel = (model: string) => {
    setCompareModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const filteredModels = switchModels3730;

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
                  <Link to="/switches">Коммутаторы</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>IDS3730</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <Hero3730 />

      {/* Models Section (как у 3530) */}
      <section id="models-section" className="py-6 sm:py-8 lg:py-10 px-3 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(circle_at_70%_30%,#0079b6_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          {/* Подзаголовок и декоративная линия удалены по требованию */}
          <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
            {filteredModels.map((model, index) => (
              <DeviceCard3730
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


      {/* Comparison Modal */}
      {/* <ComparisonModal
        isOpen={showCompareModal}
        compareModels={compareModels}
        onClose={() => setShowCompareModal(false)}
        onRemoveModel={toggleCompareModel}
      /> */}

      {/* Key Features */}
      <section className="py-8 sm:py-12 lg:py-16 px-2 xs:px-3 sm:px-6 bg-gradient-hero">
        <div className="max-w-6xl mx-auto">
          <KeyFeatures3730 />
        </div>
      </section>
      {/* CTA Section удалён по требованию */}
    </div>
  );
};

export default SeriesCatalog3730Component;
