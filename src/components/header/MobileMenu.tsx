import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navigationItems, productSubmenuItems } from "./navigationData";
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
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Инициализация главного меню
  useEffect(() => {
    if (isOpen && menuStack.length === 0) {
      setMenuStack([{ title: "Меню", items: navigationItems }]);
    }
  }, [isOpen, menuStack.length]);

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMenuStack([]);
        setActiveItem(null);
        setExpandedItems(new Set());
      }, 300);
    }
  }, [isOpen]);

  const navigateToLevel = (newLevel: MenuLevel) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuStack((prev) => [...prev, newLevel]);
      setIsTransitioning(false);
    }, 150);
  };

  const navigateBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMenuStack((prev) => prev.slice(0, -1));
      setIsTransitioning(false);
    }, 150);
  };

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
    setActiveItem(item.path);

    if (item.path === "/products" && item.hasSubmenu) {
      e.preventDefault();
      navigateToLevel({
        title: "Оборудование",
        items: productSubmenuItems,
      });
    } else if (item.path === "/contacts") {
      e.preventDefault();
      onClose();
      const contactsSection = document.getElementById("contacts-section");
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (item.hasThirdLevel && item.items) {
      // Для элементов с третьим уровнем - используем аккордеон
      e.preventDefault();
      toggleExpanded(item.path);
    } else if (item.submenuItems) {
      e.preventDefault();
      navigateToLevel({
        title: item.name,
        items: item.submenuItems,
        parentPath: item.path,
      });
    } else if (item.items && item.items.length > 0) {
      e.preventDefault();
      navigateToLevel({
        title: item.name,
        items: item.items,
        parentPath: item.path,
      });
    } else if (!item.hasSubmenu && !item.submenuItems && !item.items) {
      onClose();
    }
  };

  const renderMenuItem = (item: any, level: number = 0) => {
    const hasChildren =
      item.hasSubmenu ||
      item.submenuItems ||
      (item.items && item.items.length > 0);
    const isActive = activeItem === item.path;
    const isExpanded = expandedItems.has(item.path);
    const hasThirdLevel = item.hasThirdLevel && item.items;

    const baseClasses =
      "group w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 transition-all duration-200 min-h-[44px] border-b border-gray-50 last:border-b-0";
    const activeClasses = isActive
      ? "bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700"
      : "";

    // Добавляем отступ для вложенных элементов
    const indentClass = level > 0 ? `pl-${4 + level * 4}` : "px-4";
    const adjustedClasses = baseClasses.replace("px-4", indentClass);

    if (hasChildren) {
      return (
        <div key={item.path}>
          <button
            onClick={(e) => handleItemClick(item, e)}
            className={`${adjustedClasses} ${activeClasses}`}
          >
            <div className="flex items-center space-x-3">
              {item.icon && level === 0 && (
                <Icon
                  name={item.icon}
                  size={20}
                  className={isActive ? "text-blue-600" : "text-gray-500"}
                />
              )}
              <span className="text-xs font-medium text-left">{item.name}</span>
            </div>
            <Icon
              name={
                hasThirdLevel && isExpanded ? "ChevronDown" : "ChevronRight"
              }
              size={16}
              className={`transition-transform duration-200 ${
                isActive ? "text-blue-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Аккордеон для третьего уровня */}
          {hasThirdLevel && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-gray-25 border-l-2 border-blue-200 ml-4">
                {item.items.map((subItem: any) =>
                  renderMenuItem(subItem, level + 1),
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`${adjustedClasses} ${activeClasses}`}
        onClick={(e) => handleItemClick(item, e)}
      >
        <div className="flex items-center space-x-3">
          {item.icon && level === 0 && (
            <Icon
              name={item.icon}
              size={20}
              className={isActive ? "text-blue-600" : "text-gray-500"}
            />
          )}
          <span className="text-xs font-medium text-left">{item.name}</span>
        </div>
      </Link>
    );
  };

  const currentLevel = menuStack[menuStack.length - 1];
  const canGoBack = menuStack.length > 1;

  return (
    <>
      {/* Кнопка гамбургера */}
      <button
        onClick={onToggle}
        className="lg:hidden relative w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-3 md:w-5 md:h-4 flex flex-col justify-center relative">
            <span
              className={`block h-0.5 w-4 md:w-5 bg-gray-700 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 md:w-5 bg-gray-700 mt-1 transition-all duration-300 ${
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
        className={`lg:hidden fixed top-0 right-0 w-full max-w-xs md:max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Шапка меню */}
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
          <div className="flex items-center space-x-3">
            {canGoBack && (
              <button
                onClick={navigateBack}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                aria-label="Назад"
              >
                <Icon name="ArrowLeft" size={16} />
              </button>
            )}
            <h2 className="text-sm font-medium truncate">
              {currentLevel?.title || "Меню"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            aria-label="Закрыть меню"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Контейнер меню */}
        <div className="h-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ease-out ${
              isTransitioning
                ? "opacity-0 transform translate-x-2"
                : "opacity-100 transform translate-x-0"
            }`}
          >
            <nav className="h-full overflow-y-auto">
              <div className="py-2">
                {currentLevel?.items?.map((item) => renderMenuItem(item))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
