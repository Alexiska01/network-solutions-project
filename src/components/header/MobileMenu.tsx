import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  navigationItems,
  productSubmenuItems,
  switchesSubmenuItems,
  routersSubmenuItems,
  corporateLanItems,
  accessLevelSeries,
  distributionLevelSeries,
  dataCentersItems,
  spineLevelSeries,
} from "./navigationData";
import Icon from "@/components/ui/icon";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setExpandedItems(new Set());
      }, 300);
    }
  }, [isOpen]);

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: any, e: React.MouseEvent) => {
    if (item.hasSubmenu && item.path === "/products") {
      e.preventDefault();
      toggleExpanded(item.path);
    } else if (item.path === "/contacts") {
      e.preventDefault();
      onClose();
      const contactsSection = document.getElementById("contacts-section");
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (
      !item.hasSubmenu &&
      !item.hasNestedSubmenu &&
      !item.hasThirdLevel
    ) {
      onClose();
    }
  };

  const renderProductsMenu = () => {
    if (!expandedItems.has("/products")) return null;

    return (
      <div className="ml-4 mt-2 space-y-1 animate-fade-in">
        {/* Ссылка "Все коммутаторы" */}
        <Link
          to="/products/switches"
          className="block py-3 px-4 text-sm font-semibold text-gray-800 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm"
          onClick={onClose}
        >
          Все коммутаторы
        </Link>

        {productSubmenuItems.map((category, categoryIndex) => (
          <div key={category.path} className="space-y-2">
            {/* Основная категория */}
            <div className="flex items-center py-2 px-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <Icon
                name={category.icon}
                size={16}
                className="text-idata-primary mr-3 flex-shrink-0"
              />
              <Link
                to={category.path}
                className="font-medium text-gray-800 text-sm flex-1 hover:text-idata-primary transition-colors"
                onClick={onClose}
              >
                {category.name}
              </Link>
            </div>

            {/* Подкатегории с поддержкой 4 уровней */}
            {category.submenuItems && (
              <div className="ml-6 space-y-3">
                {category.submenuItems.map((subcategory, subIndex) => (
                  <div
                    key={subcategory.path}
                    className="space-y-1 bg-white rounded-lg p-3 border border-gray-100 shadow-sm"
                  >
                    {/* Название подкатегории */}
                    <Link
                      to={subcategory.path}
                      className="block text-xs font-semibold text-idata-primary uppercase tracking-wide py-1 hover:text-idata-primary/80 transition-colors"
                      onClick={onClose}
                    >
                      {subcategory.name}
                    </Link>

                    {/* 3-й уровень: подкатегории уровней (доступа, распределения и т.д.) */}
                    {subcategory.hasThirdLevel &&
                      subcategory.items &&
                      subcategory.items.length > 0 && (
                        <div className="ml-4 space-y-2">
                          {subcategory.items.map((thirdLevel, thirdIndex) => (
                            <div
                              key={thirdLevel.path}
                              className="space-y-1 bg-gray-50 rounded-md p-2 border border-gray-200"
                            >
                              {/* Название 3-го уровня */}
                              <Link
                                to={thirdLevel.path}
                                className="block text-xs font-medium text-gray-600 uppercase tracking-wide py-1 hover:text-idata-primary transition-colors"
                                onClick={onClose}
                              >
                                {thirdLevel.name}
                              </Link>

                              {/* 4-й уровень: серии коммутаторов */}
                              {thirdLevel.items &&
                                thirdLevel.items.length > 0 && (
                                  <div className="ml-2 space-y-1">
                                    {thirdLevel.items.map(
                                      (series, seriesIndex) => (
                                        <Link
                                          key={series.path}
                                          to={series.path}
                                          className="block text-sm text-gray-700 py-1.5 px-2 rounded hover:bg-white hover:text-gray-900 transition-all duration-200"
                                          onClick={onClose}
                                        >
                                          {series.name}
                                        </Link>
                                      ),
                                    )}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Обычные элементы подкатегории (для совместимости) */}
                    {!subcategory.hasThirdLevel &&
                      subcategory.items &&
                      subcategory.items.length > 0 && (
                        <div className="space-y-1">
                          {subcategory.items.map((item, itemIndex) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="block text-sm text-gray-700 py-2 px-3 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                              onClick={onClose}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Кнопка гамбургера */}
      <button
        onClick={onToggle}
        className="lg:hidden relative w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-idata-active focus:ring-offset-2"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-3 md:w-5 md:h-4 flex flex-col justify-center relative">
            <span
              className={`block h-0.5 w-4 md:w-5 bg-idata-text transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 md:w-5 bg-idata-text mt-1 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-0.5" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* Оверлей */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Мобильное меню */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-full max-w-xs md:max-w-sm h-full z-50 shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)",
        }}
      >
        {/* Шапка меню */}
        <div className="flex justify-between items-center h-12 md:h-16 px-4 md:px-6 border-b border-white/10">
          <div className="text-base md:text-lg font-semibold text-white font-sans">
            Меню
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 md:w-9 md:h-9 rounded-md md:rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 flex items-center justify-center"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

        {/* Контейнер меню */}
        <div className="h-full overflow-y-auto">
          <nav className="flex flex-col py-3 px-4 md:py-4 md:px-6 font-sans">
            {navigationItems.map((item, index) => (
              <div key={item.path}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={(e) => handleItemClick(item, e)}
                      className={`group relative text-white hover:text-idata-teal py-3 md:py-4 text-sm md:text-base font-medium transition-all duration-200 w-full text-left flex items-center justify-between rounded-lg ${
                        isOpen ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 40}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          name={item.icon}
                          size={16}
                          className="text-idata-teal"
                        />
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-idata-teal to-white transition-all duration-300 group-hover:w-full" />
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/10 transition-all duration-200 flex items-center justify-center ${expandedItems.has(item.path) ? "bg-white/20" : ""}`}
                      >
                        <Icon
                          name="ChevronDown"
                          size={12}
                          className={`md:w-3.5 md:h-3.5 text-white transition-all duration-200 ${expandedItems.has(item.path) ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                    {renderProductsMenu()}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`group relative text-white hover:text-idata-teal py-3 md:py-4 text-sm md:text-base font-medium transition-all duration-200 block rounded-lg flex items-center space-x-3 ${
                      isOpen ? "animate-fade-in" : ""
                    }`}
                    style={{
                      animationDelay: isOpen ? `${index * 40}ms` : "0ms",
                    }}
                    onClick={(e) => handleItemClick(item, e)}
                  >
                    <Icon
                      name={item.icon}
                      size={16}
                      className="text-idata-teal"
                    />
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-idata-teal to-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Декоративный градиент внизу */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
          }}
        />
      </div>
    </>
  );
};

export default MobileMenu;
