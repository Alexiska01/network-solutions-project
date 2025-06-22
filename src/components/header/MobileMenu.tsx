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

interface MenuLevel {
  title: string;
  items: any[];
  parentPath?: string;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([
    { title: "Меню", items: navigationItems },
  ]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentLevel(0);
        setMenuStack([{ title: "Меню", items: navigationItems }]);
      }, 300);
    }
  }, [isOpen]);

  const getSubmenuItems = (path: string) => {
    switch (path) {
      case "/products":
        return productSubmenuItems;
      case "/products/switches":
        return switchesSubmenuItems;
      case "/products/routers":
        return routersSubmenuItems;
      case "/products/switches/corporate-lan":
        return corporateLanItems;
      case "/products/switches/corporate-lan/access-level":
        return accessLevelSeries;
      case "/products/switches/corporate-lan/distribution-level":
        return distributionLevelSeries;
      case "/products/switches/data-centers":
        return dataCentersItems;
      case "/products/switches/data-centers/spine-level":
        return spineLevelSeries;
      case "/products/switches/data-centers/leaf-level":
        return leafLevelSeries;
      default:
        return [];
    }
  };

  const handleItemClick = (item: any, e: React.MouseEvent) => {
    if (item.hasSubmenu || item.hasNestedSubmenu || item.hasThirdLevel) {
      e.preventDefault();

      const submenuItems = getSubmenuItems(item.path);
      if (submenuItems.length > 0) {
        setIsTransitioning(true);

        setTimeout(() => {
          const newMenuLevel = {
            title: item.name,
            items: submenuItems,
            parentPath: item.path,
          };

          setMenuStack((prev) => [...prev, newMenuLevel]);
          setCurrentLevel((prev) => prev + 1);
          setIsTransitioning(false);
        }, 150);
      }
    } else if (item.path === "/contacts") {
      e.preventDefault();
      onClose();
      const contactsSection = document.getElementById("contacts-section");
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      onClose();
    }
  };

  const handleBackClick = () => {
    if (currentLevel > 0) {
      setIsTransitioning(true);

      setTimeout(() => {
        setMenuStack((prev) => prev.slice(0, -1));
        setCurrentLevel((prev) => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const currentMenu = menuStack[currentLevel] || menuStack[0];

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
        className={`lg:hidden fixed top-0 right-0 w-full max-w-xs md:max-w-sm h-full bg-white z-50 shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Шапка меню */}
        <div className="flex justify-between items-center h-12 md:h-16 px-4 md:px-6 border-b border-gray-50 bg-gradient-to-r from-idata-primary via-idata-blue to-idata-teal">
          <div className="flex items-center space-x-2 md:space-x-3">
            {currentLevel > 0 && (
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-1.5 md:space-x-2 px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Назад"
              >
                <Icon name="ArrowLeft" size={14} className="md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">Назад</span>
              </button>
            )}
            <div className="text-base md:text-lg font-semibold text-white font-sans">
              {currentMenu.title}
            </div>
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
        <div className="relative h-full overflow-hidden">
          <nav
            className={`absolute inset-0 flex flex-col py-3 px-4 md:py-4 md:px-6 overflow-y-auto font-sans transition-all duration-300 ease-out ${
              isTransitioning
                ? "opacity-0 translate-x-8"
                : "opacity-100 translate-x-0"
            }`}
          >
            {currentMenu.items.map((item, index) => {
              const hasSubmenu =
                item.hasSubmenu || item.hasNestedSubmenu || item.hasThirdLevel;

              return (
                <div key={`${currentLevel}-${item.path || item.name}-${index}`}>
                  {hasSubmenu ? (
                    <button
                      onClick={(e) => handleItemClick(item, e)}
                      className={`group relative text-idata-text hover:text-idata-active py-3 md:py-4 text-sm md:text-base font-medium border-b border-gray-50 last:border-b-0 transition-all duration-200 hover:bg-gray-50/50 hover:pl-1 md:hover:pl-2 w-full text-left flex items-center justify-between rounded-lg ${
                        isOpen && !isTransitioning ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay:
                          isOpen && !isTransitioning
                            ? `${index * 40}ms`
                            : "0ms",
                      }}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-idata-primary to-idata-teal transition-all duration-300 group-hover:w-full" />
                      </span>
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-50 group-hover:bg-idata-active/10 transition-all duration-200 flex items-center justify-center">
                        <Icon
                          name="ChevronRight"
                          size={12}
                          className="md:w-3.5 md:h-3.5 text-gray-400 group-hover:text-idata-active transition-colors duration-200"
                        />
                      </div>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`group relative text-idata-text hover:text-idata-active py-3 md:py-4 text-sm md:text-base font-medium border-b border-gray-50 last:border-b-0 transition-all duration-200 hover:bg-gray-50/50 hover:pl-1 md:hover:pl-2 block rounded-lg ${
                        isOpen && !isTransitioning ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay:
                          isOpen && !isTransitioning
                            ? `${index * 40}ms`
                            : "0ms",
                      }}
                      onClick={(e) => handleItemClick(item, e)}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-idata-primary to-idata-teal transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Декоративный градиент внизу */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(26, 41, 128, 0.05), transparent)",
          }}
        />
      </div>
    </>
  );
};

export default MobileMenu;
