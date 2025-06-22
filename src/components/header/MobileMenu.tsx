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
        className="lg:hidden relative w-12 h-12 rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-4 flex flex-col justify-center relative">
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 mt-1 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-0.5" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* Оверлей */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Мобильное меню */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Шапка меню */}
        <div className="flex justify-between items-center h-16 px-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-3">
            {currentLevel > 0 && (
              <button
                onClick={handleBackClick}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                aria-label="Назад"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
            )}
            <div className="text-xl font-bold text-gray-900">
              {currentMenu.title}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Контейнер для анимации переходов */}
        <div className="relative h-full overflow-hidden">
          <nav
            className={`absolute inset-0 flex flex-col py-6 px-6 overflow-y-auto transition-all duration-300 ease-out ${
              isTransitioning
                ? "opacity-0 translate-x-4"
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
                      className={`group relative text-gray-700 hover:text-blue-600 py-4 text-lg font-medium border-b border-gray-100 last:border-b-0 transition-all duration-300 hover:pl-2 w-full text-left flex items-center justify-between ${
                        isOpen && !isTransitioning ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay:
                          isOpen && !isTransitioning
                            ? `${index * 50}ms`
                            : "0ms",
                      }}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                      </span>
                      <Icon
                        name="ChevronRight"
                        size={16}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300"
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`group relative text-gray-700 hover:text-blue-600 py-4 text-lg font-medium border-b border-gray-100 last:border-b-0 transition-all duration-300 hover:pl-2 block ${
                        isOpen && !isTransitioning ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay:
                          isOpen && !isTransitioning
                            ? `${index * 50}ms`
                            : "0ms",
                      }}
                      onClick={(e) => handleItemClick(item, e)}
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Декоративный градиент внизу */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default MobileMenu;
