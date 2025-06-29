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
import SwitchesSearch from "@/components/SwitchesSearch";
import SwitchCard from "@/components/SwitchCard";
import { switchesData, categoryLabels } from "@/data/switchesData";

const SwitchesCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const filteredSwitches = useMemo(() => {
    let filtered = switchesData;

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (switch_) =>
          switch_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          switch_.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [searchTerm]);

  const handleScrollToCard = (cardId: string) => {
    const element = document.getElementById(cardId);
    if (element) {
      // Убираем активный класс у всех карточек
      document.querySelectorAll(".switch-card-base.active").forEach((el) => {
        el.classList.remove("active");
      });

      // Скроллим к элементу
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Очищаем хеш из URL
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );

      // Добавляем класс активного состояния
      element.classList.add("active");

      // Снимаем класс через 2 секунды
      setTimeout(() => {
        element.classList.remove("active");
      }, 2000);
    }
  };

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
        {/* Breadcrumb */}
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
                <BreadcrumbPage>Коммутаторы</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-[35px]">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                Коммутаторы для любых задач
              </h1>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
                Полная линейка коммутаторов для корпоративных сетей и центров
                обработки данных. От устройств доступа до магистральных решений.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#0065B3] hover:bg-gradient-brand hover:text-white hover:border hover:border-white min-h-[44px]"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Техническая поддержка
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-gradient-brand hover:border-gradient-brand min-h-[44px]"
                >
                  <Headphones className="mr-2 h-4 w-4" />
                  Консультация
                </Button>
              </div>
            </div>
            <div className="relative mt-6 md:mt-8 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                  <div className="text-center">
                    <Zap className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      Доступ
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      24-48 портов
                    </p>
                  </div>
                  <div className="text-center">
                    <Settings className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      Распределение
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Агрегация трафика
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      Spine
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Центр данных
                    </p>
                  </div>
                  <div className="text-center">
                    <ArrowRight className="mx-auto mb-1.5 md:mb-2 lg:mb-3 text-blue-200 w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                    <h3 className="text-xs md:text-sm lg:text-base font-semibold mb-0.5 md:mb-1">
                      Leaf
                    </h3>
                    <p className="text-xs md:text-sm text-blue-200">
                      Серверные стойки
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Левое меню навигации - только на десктопе */}
          {!isMobile && (
            <div className="w-96 flex-shrink-0">
              <CatalogNavigation onNavigate={handleScrollToCard} />
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
