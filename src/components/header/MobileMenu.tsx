import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navigationItems, productSubmenuItems } from "./navigationData";
import Icon from "@/components/ui/icon";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setExpandedItems(new Set());
      }, 300);
    }
  }, [isOpen]);

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: any, e: React.MouseEvent) => {
    if (item.hasSubmenu && item.path === "/products") {
      e.preventDefault();
      toggleExpanded("products");
    } else if (item.path === "/contacts") {
      e.preventDefault();
      onClose();
      const contactsSection = document.getElementById("contacts-section");
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (!item.hasSubmenu) {
      onClose();
    }
  };

  const renderAllProducts = () => (
    <div className="space-y-1 mt-2">
      {/* Все коммутаторы */}
      <Link
        to="/products/switches"
        className="block w-full p-3 text-blue-600 hover:bg-gray-50 transition-colors text-sm"
        onClick={onClose}
      >
        Все коммутаторы
      </Link>

      {/* Категории продуктов */}
      {productSubmenuItems.map((category) => (
        <div key={category.path} className="border-l-2 border-gray-100 ml-2">
          <div className="pl-4">
            <div className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-2 py-1">
              {category.name}
            </div>

            {/* Подкategories если есть */}
            {category.submenuItems &&
              category.submenuItems.map((subcategory) => (
                <div key={subcategory.path} className="mb-3">
                  <div className="text-xs text-gray-600 mb-1 pl-2">
                    {subcategory.name}
                  </div>

                  {/* Третий уровень если есть */}
                  {subcategory.items &&
                    subcategory.items.map((thirdLevel) => (
                      <div key={thirdLevel.path} className="ml-4 mb-2">
                        <div className="text-xs text-gray-500 mb-1">
                          {thirdLevel.name}
                        </div>

                        {/* Конкретные серии */}
                        {thirdLevel.items &&
                          thirdLevel.items.map((series) => (
                            <Link
                              key={series.path}
                              to={series.path}
                              className="block w-full p-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded"
                              onClick={onClose}
                            >
                              {series.name}
                            </Link>
                          ))}
                      </div>
                    ))}

                  {/* Если нет третьего уровня, показать как ссылку */}
                  {!subcategory.items && (
                    <Link
                      to={subcategory.path}
                      className="block w-full p-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded ml-2"
                      onClick={onClose}
                    >
                      Перейти к {subcategory.name.toLowerCase()}
                    </Link>
                  )}
                </div>
              ))}

            {/* Если нет submenuItems, показать как обычную ссылку */}
            {!category.submenuItems && (
              <Link
                to={category.path}
                className="block w-full p-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded"
                onClick={onClose}
              >
                Перейти к {category.name.toLowerCase()}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMainMenu = () => (
    <div className="space-y-1">
      {navigationItems.map((item, index) => (
        <div key={item.path}>
          {item.hasSubmenu ? (
            <div>
              <button
                onClick={(e) => handleItemClick(item, e)}
                className="group w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item.icon} size={18} className="text-gray-500" />
                  <span className="text-sm">{item.name}</span>
                </div>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 ${
                    expandedItems.has("products") ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Развернутое меню продуктов */}
              {expandedItems.has("products") && renderAllProducts()}
            </div>
          ) : (
            <Link
              to={item.path}
              className="group w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              onClick={(e) => handleItemClick(item, e)}
            >
              <Icon name={item.icon} size={18} className="text-gray-500" />
              <span className="text-sm">{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );

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
        className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ${
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
        <div className="flex justify-between items-center h-12 md:h-16 px-4 md:px-6 border-b border-gray-100">
          <div className="text-base md:text-lg text-gray-900 font-sans">
            Меню
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 md:w-9 md:h-9 rounded-md md:rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

        {/* Контейнер меню */}
        <div className="h-full overflow-y-auto">
          <nav className="flex flex-col py-3 px-4 md:py-4 md:px-6 font-sans">
            {renderMainMenu()}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
