import React, { useState, useMemo, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";
import HeroCommuts from "@/components/HeroCommuts";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import CatalogMobileNav from "@/components/catalog/CatalogMobileNav";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import CatalogCTA from "@/components/catalog/CatalogCTA";
import { switchesData } from "@/data/switchesData";

const SwitchesCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  // Прокрутка к верху страницы при монтировании компонента
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      // Скроллим к элементу с учетом высоты sticky навигации
      const offset = isMobile ? 80 : 0; // высота мобильной навигации
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });

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
      <CatalogHeader />
      <HeroCommuts />
      <CatalogMobileNav onNavigate={handleScrollToCard} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Левое меню навигации - скрыто на мобильных */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <CatalogNavigation onNavigate={handleScrollToCard} />
          </div>

          {/* Основной контент */}
          <CatalogGrid
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            groupedSwitches={groupedSwitches}
          />
        </div>
        
        {/* CTA блок внизу */}
        <CatalogCTA />
      </div>
      <Footer />
    </div>
  );
};

export default SwitchesCatalog;