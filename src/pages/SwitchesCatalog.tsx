import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogNavigation from "@/components/CatalogNavigation";

import CatalogHeader from "@/components/catalog/CatalogHeader";
import CatalogMobileNav from "@/components/catalog/CatalogMobileNav";
import CatalogGrid from "@/components/catalog/CatalogGrid";

import { switchesData } from "@/data/switchesData";

const SwitchesCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Автоскролл при монтировании отключён
  useEffect(() => {}, []);

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
  // Автоскролл отключён (offset ранее рассчитывался)

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
    <div className="min-h-screen relative bg-gradient-to-b from-gray-200/80 via-gray-100/90 to-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-teal-100/40 pointer-events-none ps-bg-overlay" />
      <Header />
      <CatalogHeader />

      <CatalogMobileNav onNavigate={handleScrollToCard} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Левое меню навигации - скрыто на мобильных */}
          <div className="hidden lg:block w-96 flex-shrink-0 sticky top-24 h-fit">
            <CatalogNavigation onNavigate={handleScrollToCard} />
          </div>

          {/* Основной контент */}
          <CatalogGrid
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            groupedSwitches={groupedSwitches}
          />
        </div>
        

      </div>
      <Footer />
    </div>
  );
};

export default SwitchesCatalog;