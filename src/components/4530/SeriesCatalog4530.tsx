// src/pages/SeriesCatalog4530Component.tsx
import { useNavigate, Link } from "react-router-dom";
import DeviceCard4530 from "@/components/4530/DeviceCard4530";
import KeyFeatures4530 from "./KeyFeatures4530";
import { switchModels4530 } from "@/data/switchModels";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Hero4530 from "@/components/4530/Hero4530";
 

 

const SeriesCatalog4530Component = () => {
  const navigate = useNavigate();

  // список сравнения удалён в рамках упрощения каталога

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const filteredModels = switchModels4530;

  // scroll observer удалён в рамках упрощения анимаций

  // mobile-specific анимации удалены

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
                <BreadcrumbPage>IDS4530</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <Hero4530 />

      {/* Models Section */}
      <section id="models-section" className="py-6 sm:py-8 lg:py-10 px-3 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(circle_at_70%_30%,#0079b6_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          {/* Подзаголовок и декоративная линия удалены по требованию */}
          <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
            {filteredModels.map((model, index) => (
              <DeviceCard4530
                key={model.id}
                model={model}
                index={index}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>
      </section>


    {/* Key Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-2 xs:px-3 sm:px-6 bg-gradient-hero">
        <div className="max-w-6xl mx-auto">
          <KeyFeatures4530 />
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog4530Component;
