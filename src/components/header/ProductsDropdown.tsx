import { Link, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { DropdownState } from "@/hooks/useDropdownMenu";
import { productSubmenuItems } from "./navigationData";

// GPU-first оптимизации для ProductsDropdown
const dropdownStyles = `
  .products-dropdown-gpu-optimized {
    /* GPU композитинг для максимальной производительности */
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
    contain: layout style;
    will-change: opacity, transform;
  }
  
  .dropdown-button-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    transition: all var(--dropdown-transition-duration, 150ms) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .dropdown-panel-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
    opacity: 0;
    transform: translate3d(0, -10px, 0) scale(0.95);
    animation: dropdownEntry var(--dropdown-entry-duration, 200ms) cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .dropdown-item-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    transition: all var(--dropdown-transition-duration, 150ms) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Hover оптимизации */
  @media (hover: hover) and (pointer: fine) {
    .dropdown-button-gpu:hover {
      transform: translate3d(0, -1px, 0);
      will-change: transform, color;
    }
    
    .dropdown-item-gpu:hover {
      transform: translate3d(2px, 0, 0);
      will-change: transform, background-color;
    }
    
    .dropdown-button-gpu:not(:hover),
    .dropdown-item-gpu:not(:hover) {
      will-change: auto;
    }
  }
  
  /* Иконки оптимизация */
  .dropdown-icon-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    transition: transform var(--dropdown-transition-duration, 150ms) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Текст навигации */
  .dropdown-text-gpu {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: geometricPrecision;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  
  /* Адаптация под герцовку */
  :root {
    --dropdown-transition-duration: 150ms;
    --dropdown-entry-duration: 200ms;
  }
  
  @media (min-refresh-rate: 120hz) {
    :root {
      --dropdown-transition-duration: 120ms;
      --dropdown-entry-duration: 160ms;
    }
  }
  
  @media (min-refresh-rate: 240hz) {
    :root {
      --dropdown-transition-duration: 100ms;
      --dropdown-entry-duration: 140ms;
    }
  }
  
  /* Анимация появления */
  @keyframes dropdownEntry {
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
  }
  
  /* Оптимизация скроллбара */
  .dropdown-scroll-gpu {
    scrollbar-width: thin;
    scrollbar-color: rgb(209 213 219) transparent;
    scroll-behavior: smooth;
  }
  
  .dropdown-scroll-gpu::-webkit-scrollbar {
    width: 6px;
  }
  
  .dropdown-scroll-gpu::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .dropdown-scroll-gpu::-webkit-scrollbar-thumb {
    background: rgb(209 213 219);
    border-radius: 3px;
    transition: background var(--dropdown-transition-duration) ease;
  }
  
  .dropdown-scroll-gpu::-webkit-scrollbar-thumb:hover {
    background: rgb(156 163 175);
  }
`;

interface ProductsDropdownProps {
  isOpen: boolean;
  dropdownState: DropdownState;
  updateDropdownState: (updates: Partial<DropdownState>) => void;
  setActiveSubmenu: (submenuName: string | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductsDropdown = memo(
  ({
    isOpen,
    dropdownState,
    setActiveSubmenu,
    onMouseEnter,
    onMouseLeave,
  }: ProductsDropdownProps) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    
    // Инжект стилей для GPU оптимизации
    if (typeof document !== 'undefined' && !document.getElementById('dropdown-gpu-styles')) {
      const style = document.createElement('style');
      style.id = 'dropdown-gpu-styles';
      style.textContent = dropdownStyles;
      document.head.appendChild(style);
    }

    const activeItem = useMemo(
      () =>
        productSubmenuItems.find(
          (item) => item.name === dropdownState.activeSubmenu,
        ),
      [dropdownState.activeSubmenu],
    );

    return (
      <div
        className="flex items-center relative products-dropdown-gpu-optimized"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] dropdown-button-gpu">
          <Icon name="Network" size={16} className="dropdown-icon-gpu" />
          <span className="dropdown-text-gpu">Оборудование</span>
        </button>

        {isOpen && (
          <div
            className={`absolute left-0 top-full bg-white border border-gray-100 rounded-xl shadow-2xl z-50 flex max-h-[600px] overflow-hidden dropdown-panel-gpu ${isHomePage ? "w-80" : ""}`}
          >
            {/* Левая панель - основные разделы */}
            <div
              className={`py-4 bg-gradient-to-b from-gray-50 to-white overflow-y-auto ${isHomePage ? "w-full" : "w-80 border-r border-gray-100"}`}
            >
              {/* Заголовок раздела */}
              <div className="px-4 mb-3">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Оборудование iDATA
                </h3>
                <p className="text-xs text-gray-600">
                  Сетевые решения корпоративного класса
                </p>
              </div>

              {productSubmenuItems.map((item) => (
                <div key={item.path} className="mb-1">
                  <Link
                    to={item.path}
                    className={`relative flex items-center justify-between mx-3 px-3 py-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-200 group rounded-lg border border-transparent hover:border-blue-100 ${
                      dropdownState.activeSubmenu === item.name
                        ? "bg-white shadow-sm border-blue-100"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      !isHomePage && item.hasNestedSubmenu
                        ? setActiveSubmenu(item.name)
                        : setActiveSubmenu(null)
                    }
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="p-1.5 rounded bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <Icon
                          name={item.icon as any}
                          size={14}
                          className="text-blue-600"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-gray-900 leading-tight">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-gray-500 leading-tight">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {!isHomePage && item.hasNestedSubmenu && (
                      <Icon
                        name="ChevronRight"
                        size={14}
                        className="text-gray-400 group-hover:text-blue-600 transition-colors"
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Правая панель - подразделы (только не на главной) */}
            {!isHomePage &&
              activeItem?.submenuItems &&
              Array.isArray(activeItem.submenuItems) && (
                <div className="w-96 py-4 px-2 bg-white overflow-y-auto">
                  {activeItem.submenuItems.map((submenuItem) => (
                    <div key={submenuItem.path} className="mb-4 last:mb-2">
                      <Link
                        to={submenuItem.path}
                        className="group flex items-center gap-2 px-3 py-2 mb-2 text-sm font-bold text-gray-900 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      >
                        {submenuItem.icon && (
                          <Icon
                            name={submenuItem.icon as any}
                            size={16}
                            className="text-blue-600"
                          />
                        )}
                        <div className="flex-1">
                          <span className="text-xs font-semibold">
                            {submenuItem.name}
                          </span>
                          {submenuItem.description && (
                            <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                              {submenuItem.description}
                            </p>
                          )}
                        </div>
                      </Link>

                      {/* Третий уровень - категории */}
                      {Array.isArray(submenuItem.items) &&
                        submenuItem.items.length > 0 && (
                          <div className="space-y-2 ml-1">
                            {submenuItem.items.map((categoryItem) => (
                              <div
                                key={categoryItem.path}
                                className="border-l-2 border-blue-100 pl-3"
                              >
                                <Link
                                  to={categoryItem.path}
                                  className="group flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-gray-800 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded"
                                >
                                  {categoryItem.icon && (
                                    <Icon
                                      name={categoryItem.icon as any}
                                      size={12}
                                      className="text-blue-500"
                                    />
                                  )}
                                  <span className="truncate">
                                    {categoryItem.name}
                                  </span>
                                </Link>
                                {categoryItem.description && (
                                  <p className="text-xs text-gray-500 mt-0.5 px-2 leading-tight truncate">
                                    {categoryItem.description}
                                  </p>
                                )}

                                {/* Четвёртый уровень - серии коммутаторов */}
                                {Array.isArray(categoryItem.items) &&
                                  categoryItem.items.length > 0 && (
                                    <div className="mt-1 ml-1 space-y-1">
                                      {categoryItem.items.map(
                                        (seriesItem: any) => (
                                          <Link
                                            key={seriesItem.path}
                                            to={seriesItem.path}
                                            className="group flex items-center px-2 py-1 text-xs text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded"
                                          >
                                            <span className="font-medium truncate">
                                              {seriesItem.name}
                                            </span>
                                          </Link>
                                        ),
                                      )}
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>
    );
  },
);

ProductsDropdown.displayName = "ProductsDropdown";

export default ProductsDropdown;