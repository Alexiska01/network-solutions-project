import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
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
  const isMobile = useIsMobile();

  // Обработка хеша при загрузке страницы
  React.useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Небольшая задержка для загрузки контента
      setTimeout(() => {
        const element = document.getElementById(hash.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          // Добавляем подсветку
          setTimeout(() => {
            element.classList.add("navigation-active");

            // Автоматически убираем подсветку через animationend
            element.addEventListener(
              "animationend",
              () => {
                element.classList.remove("navigation-active");
              },
              { once: true },
            );

            // Дублируем через setTimeout как резервный механизм
            setTimeout(() => {
              element.classList.remove("navigation-active");
            }, 3000);
          }, 500);
        }
      }, 100);
    }
  }, []);

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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Левое меню навигации - только на десктопе */}
          {!isMobile && (
            <div className="w-80 flex-shrink-0">
              <CatalogNavigation
                onNavigate={(sectionId) => {
                  const element = document.getElementById(sectionId);
                  if (element) {
                    // Плавный скролл к центру с улучшенным позиционированием
                    const elementRect = element.getBoundingClientRect();
                    const absoluteElementTop = elementRect.top + window.scrollY;
                    const middle =
                      absoluteElementTop -
                      window.innerHeight / 2 +
                      elementRect.height / 2;

                    window.scrollTo({
                      top: middle,
                      behavior: "smooth",
                    });

                    // Добавляем класс navigation-active для подсветки
                    // Убираем все предыдущие подсветки
                    document
                      .querySelectorAll(".navigation-active, .highlight")
                      .forEach((elem) => {
                        elem.classList.remove("navigation-active", "highlight");
                      });

                    element.classList.add("navigation-active");

                    // Автоматически убираем подсветку через animationend
                    element.addEventListener(
                      "animationend",
                      () => {
                        element.classList.remove("navigation-active");
                      },
                      { once: true },
                    );

                    // Дублируем через setTimeout как резервный механизм
                    setTimeout(
                      () => element.classList.remove("navigation-active"),
                      2000,
                    );

                    window.location.hash = sectionId;
                  }
                }}
                activeSection={activeFilter}
              />
            </div>
          )}

          {/* Основной контент */}
          <div className="flex-1">
            {/* Поиск */}
            <SwitchesSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Коммутаторы для корпоративных ЛВС */}
            <section id="corporate-lan" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Коммутаторы для корпоративных ЛВС
              </h2>

              {/* Уровень доступа */}
              {groupedSwitches.corporateAccess.length > 0 && (
                <div id="access-level" className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#2E5BFF] rounded-full mr-3"></div>
                    Коммутаторы уровня доступа
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.corporateAccess.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}

              {/* Уровень распределения */}
              {groupedSwitches.corporateDistribution.length > 0 && (
                <div id="distribution-level">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#FF6B35] rounded-full mr-3"></div>
                    Коммутаторы уровня распределения
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.corporateDistribution.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Коммутаторы для ЦОД */}
            <section id="data-center" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Центры обработки данных
              </h2>

              {/* Spine */}
              {groupedSwitches.dataCenterSpine.length > 0 && (
                <div id="spine-level" className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#10B981] rounded-full mr-3"></div>
                    Spine
                  </h3>
                  <div className="space-y-4">
                    {groupedSwitches.dataCenterSpine.map((switchData) => (
                      <SwitchCard key={switchData.id} switchData={switchData} />
                    ))}
                  </div>
                </div>
              )}

              {/* Leaf */}
              {groupedSwitches.dataCenterLeaf.length > 0 && (
                <div id="leaf-level">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-[#8B5CF6] rounded-full mr-3"></div>
                    Leaf
                  </h3>
                  <div className="space-y-4">
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
              <Button
                size="lg"
                className="bg-[#2E5BFF] hover:bg-[#1E4FFF]"
                asChild
              >
                <Link to="/partners">
                  Связаться с нами
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SwitchesCatalog;
