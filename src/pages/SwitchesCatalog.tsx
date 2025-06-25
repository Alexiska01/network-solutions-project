import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Settings, Headphones, ArrowRight } from "lucide-react";
import SwitchesFilter from "@/components/SwitchesFilter";
import SwitchesSearch from "@/components/SwitchesSearch";
import SwitchCard from "@/components/SwitchCard";
import { switchesData, categoryLabels } from "@/data/switchesData";

const SwitchesCatalog = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSwitches = useMemo(() => {
    let filtered = switchesData;

    // Фильтрация по категории
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (switch_) => switch_.category === activeFilter,
      );
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (switch_) =>
          switch_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          switch_.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  const groupedSwitches = useMemo(() => {
    const corporate = filteredSwitches.filter((s) =>
      ["access", "distribution"].includes(s.category),
    );
    const dataCenter = filteredSwitches.filter((s) =>
      ["spine", "leaf"].includes(s.category),
    );

    return {
      corporateAccess: corporate.filter((s) => s.category === "access"),
      corporateDistribution: corporate.filter(
        (s) => s.category === "distribution",
      ),
      dataCenterSpine: dataCenter.filter((s) => s.category === "spine"),
      dataCenterLeaf: dataCenter.filter((s) => s.category === "leaf"),
    };
  }, [filteredSwitches]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50">
        {/* Хлебные крошки */}
        <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Оборудование</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Коммутаторы</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-idata-gradient text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-[40px] leading-tight mb-4">
            Каталог коммутаторов
          </h1>
          <p className="font-montserrat text-sm md:text-lg max-w-2xl mx-auto">
            Профессиональные сетевые решения для корпоративного сегмента и
            дата-центров
          </p>
        </div>
      </section>

      {/* Фильтры */}
      <SwitchesFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Поиск */}
        <SwitchesSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Коммутаторы для корпоративных ЛВС */}
        <section id="corporate-lan" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Коммутаторы для корпоративных ЛВС
          </h2>

          {/* Уровень доступа */}
          {groupedSwitches.corporateAccess.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-[#2E5BFF] rounded-full mr-3"></div>
                Коммутаторы уровня доступа
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedSwitches.corporateAccess.map((switchData) => (
                  <SwitchCard key={switchData.id} switchData={switchData} />
                ))}
              </div>
            </div>
          )}

          {/* Уровень распределения */}
          {groupedSwitches.corporateDistribution.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-[#FF6B35] rounded-full mr-3"></div>
                Коммутаторы уровня распределения
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedSwitches.corporateDistribution.map((switchData) => (
                  <SwitchCard key={switchData.id} switchData={switchData} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CTA блок */}
        <section className="bg-gradient-to-r from-[#2E5BFF] to-[#4A90E2] rounded-2xl p-8 md:p-12 mb-16 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Почему выбирают iDATA?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">5 лет гарантии</h3>
                <p className="text-sm opacity-90">
                  Максимальная защита инвестиций
                </p>
              </div>
              <div className="text-center">
                <Settings className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Расширенные L3 функции</h3>
                <p className="text-sm opacity-90">Полный стек протоколов</p>
              </div>
              <div className="text-center">
                <Zap className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Поддержка PoE++</h3>
                <p className="text-sm opacity-90">До 1440Вт мощности</p>
              </div>
              <div className="text-center">
                <Headphones className="h-12 w-12 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">Интеграция с NMS</h3>
                <p className="text-sm opacity-90">
                  Централизованное управление
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#2E5BFF] hover:bg-gray-100"
              >
                Подробнее о технологиях
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Коммутаторы для ЦОД */}
        <section id="data-center" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Коммутаторы для центров обработки данных
          </h2>

          {/* Spine */}
          {groupedSwitches.dataCenterSpine.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-[#10B981] rounded-full mr-3"></div>
                Spine
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedSwitches.dataCenterSpine.map((switchData) => (
                  <SwitchCard key={switchData.id} switchData={switchData} />
                ))}
              </div>
            </div>
          )}

          {/* Leaf */}
          {groupedSwitches.dataCenterLeaf.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-[#8B5CF6] rounded-full mr-3"></div>
                Leaf
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedSwitches.dataCenterLeaf.map((switchData) => (
                  <SwitchCard key={switchData.id} switchData={switchData} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CTA блок внизу */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Нужна помощь с подбором?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Наши специалисты помогут выбрать оптимальное решение для вашей
            инфраструктуры
          </p>
          <Button size="lg" className="bg-[#2E5BFF] hover:bg-[#1E4FFF]">
            Связаться с нами
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SwitchesCatalog;
