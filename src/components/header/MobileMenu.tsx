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
  const [currentLevel, setCurrentLevel] = useState<string>("main");
  const [breadcrumb, setBreadcrumb] = useState<
    Array<{ name: string; level: string }>
  >([]);

  // Сброс меню при закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setExpandedItems(new Set());
        setCurrentLevel("main");
        setBreadcrumb([]);
      }, 300);
    }
  }, [isOpen]);

  const navigateToLevel = (level: string, name?: string) => {
    if (level === "main") {
      setCurrentLevel("main");
      setBreadcrumb([]);
    } else {
      setCurrentLevel(level);
      if (name) {
        setBreadcrumb((prev) => [...prev, { name, level }]);
      }
    }
  };

  const goBack = () => {
    if (breadcrumb.length > 0) {
      const newBreadcrumb = [...breadcrumb];
      newBreadcrumb.pop();
      setBreadcrumb(newBreadcrumb);

      if (newBreadcrumb.length === 0) {
        setCurrentLevel("main");
      } else {
        setCurrentLevel(newBreadcrumb[newBreadcrumb.length - 1].level);
      }
    }
  };

  const handleItemClick = (item: any, e: React.MouseEvent) => {
    if (item.hasSubmenu && item.path === "/products") {
      e.preventDefault();
      navigateToLevel("products", "Оборудование");
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

  const renderMainMenu = () => (
    <div className="space-y-1">
      {navigationItems.map((item, index) => (
        <div key={item.path}>
          {item.hasSubmenu ? (
            <button
              onClick={(e) => handleItemClick(item, e)}
              className="group w-full flex items-center justify-between p-4 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon name={item.icon} size={20} className="text-white/80" />
                <span className="text-base font-medium">{item.name}</span>
              </div>
              <Icon
                name="ChevronUp"
                size={16}
                className="text-white/60 rotate-90"
              />
            </button>
          ) : (
            <Link
              to={item.path}
              className="group w-full flex items-center space-x-3 p-4 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              onClick={(e) => handleItemClick(item, e)}
            >
              <Icon name={item.icon} size={20} className="text-white/80" />
              <span className="text-base font-medium">{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );

  const renderProductsMenu = () => (
    <div className="space-y-3">
      {/* Кнопка "Все коммутаторы" */}
      <Link
        to="/products/switches"
        className="block w-full p-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        onClick={onClose}
      >
        Все коммутаторы
      </Link>

      {/* Категории продуктов */}
      {productSubmenuItems.map((category) => (
        <div key={category.path}>
          {category.hasNestedSubmenu ? (
            <button
              onClick={() =>
                navigateToLevel(`category-${category.name}`, category.name)
              }
              className="group w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon
                  name={category.icon}
                  size={18}
                  className="text-white/80"
                />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <Icon
                name="ChevronUp"
                size={14}
                className="text-white/60 rotate-90"
              />
            </button>
          ) : (
            <Link
              to={category.path}
              className="group w-full flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              onClick={onClose}
            >
              <Icon name={category.icon} size={18} className="text-white/80" />
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );

  const renderCategoryMenu = (categoryName: string) => {
    const category = productSubmenuItems.find(
      (cat) => `category-${cat.name}` === currentLevel,
    );
    if (!category || !category.submenuItems) return null;

    return (
      <div className="space-y-3">
        {category.submenuItems.map((subcategory) => (
          <div key={subcategory.path}>
            {subcategory.hasThirdLevel ? (
              <button
                onClick={() =>
                  navigateToLevel(
                    `subcategory-${subcategory.name}`,
                    subcategory.name,
                  )
                }
                className="group w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium uppercase tracking-wide text-blue-200">
                    {subcategory.name}
                  </span>
                  <Icon
                    name="ChevronUp"
                    size={14}
                    className="text-white/60 rotate-90"
                  />
                </div>
              </button>
            ) : (
              <Link
                to={subcategory.path}
                className="block w-full p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
                onClick={onClose}
              >
                <span className="text-sm font-medium uppercase tracking-wide text-blue-200">
                  {subcategory.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSubcategoryMenu = () => {
    const categoryName = currentLevel.replace("subcategory-", "");
    const category = productSubmenuItems.find((cat) =>
      cat.submenuItems?.some((sub) => sub.name === categoryName),
    );
    const subcategory = category?.submenuItems?.find(
      (sub) => sub.name === categoryName,
    );

    if (!subcategory || !subcategory.items) return null;

    return (
      <div className="space-y-3">
        {subcategory.items.map((thirdLevel) => (
          <div key={thirdLevel.path}>
            {thirdLevel.items && thirdLevel.items.length > 0 ? (
              <button
                onClick={() =>
                  navigateToLevel(
                    `thirdlevel-${thirdLevel.name}`,
                    thirdLevel.name,
                  )
                }
                className="group w-full text-left p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">
                    {thirdLevel.name}
                  </span>
                  <Icon
                    name="ChevronUp"
                    size={14}
                    className="text-white/60 rotate-90"
                  />
                </div>
              </button>
            ) : (
              <Link
                to={thirdLevel.path}
                className="block w-full p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
                onClick={onClose}
              >
                <span className="text-sm font-medium text-gray-300">
                  {thirdLevel.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderThirdLevelMenu = () => {
    const thirdLevelName = currentLevel.replace("thirdlevel-", "");
    // Найти нужный третий уровень через все категории
    let thirdLevelItem = null;

    for (const category of productSubmenuItems) {
      if (category.submenuItems) {
        for (const subcategory of category.submenuItems) {
          if (subcategory.items) {
            const found = subcategory.items.find(
              (item) => item.name === thirdLevelName,
            );
            if (found) {
              thirdLevelItem = found;
              break;
            }
          }
        }
      }
      if (thirdLevelItem) break;
    }

    if (!thirdLevelItem || !thirdLevelItem.items) return null;

    return (
      <div className="space-y-2">
        {thirdLevelItem.items.map((series) => (
          <Link
            key={series.path}
            to={series.path}
            className="block w-full p-3 bg-white rounded-lg text-gray-900 hover:bg-gray-50 transition-all duration-200"
            onClick={onClose}
          >
            <span className="text-sm font-medium">{series.name}</span>
          </Link>
        ))}
      </div>
    );
  };

  const getCurrentContent = () => {
    if (currentLevel === "main") return renderMainMenu();
    if (currentLevel === "products") return renderProductsMenu();
    if (currentLevel.startsWith("category-"))
      return renderCategoryMenu(currentLevel);
    if (currentLevel.startsWith("subcategory-")) return renderSubcategoryMenu();
    if (currentLevel.startsWith("thirdlevel-")) return renderThirdLevelMenu();
    return renderMainMenu();
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
          <div className="flex items-center space-x-3">
            {breadcrumb.length > 0 && (
              <button
                onClick={goBack}
                className="w-8 h-8 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
            )}
            <div className="text-base md:text-lg font-semibold text-white font-sans">
              {breadcrumb.length > 0
                ? breadcrumb[breadcrumb.length - 1].name
                : "Меню"}
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
        <div className="h-full overflow-y-auto">
          <nav className="flex flex-col py-3 px-4 md:py-4 md:px-6 font-sans">
            {getCurrentContent()}
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
