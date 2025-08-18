import { Link, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { DropdownState } from "@/hooks/useDropdownMenu";
import { productSubmenuItems } from "./navigationData";


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
    
  // Inline style injection removed (global header-motion.css)

    const activeItem = useMemo(
      () =>
        productSubmenuItems.find(
          (item) => item.name === dropdownState.activeSubmenu,
        ),
      [dropdownState.activeSubmenu],
    );

    return (
      <div
        className="flex items-center relative desktop-dropdown-container-gpu"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <button className="text-gray-700 px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] desktop-dropdown-button-gpu">
          <Icon name="Network" size={16} className="desktop-dropdown-icon-gpu" />
          <span className="desktop-dropdown-text-gpu">Оборудование</span>
        </button>

        {isOpen && (
          <div
            className={`absolute left-0 top-full bg-white border border-gray-100 rounded-xl shadow-2xl z-50 flex max-h-[600px] overflow-hidden desktop-dropdown-panel-gpu ${isHomePage ? "w-80" : ""}`}
          >
            {/* Левая панель - основные разделы */}
            <div
              className={`py-4 bg-gradient-to-b from-gray-50 to-white overflow-y-auto desktop-dropdown-scroll-gpu ${isHomePage ? "w-full" : "w-80 border-r border-gray-100"}`}
            >
              {/* Заголовок раздела */}
              <div className="px-4 mb-3">
                <h3 className="text-base font-bold text-gray-900 mb-1 desktop-dropdown-text-gpu">
                  Оборудование iDATA
                </h3>
                <p className="text-xs text-gray-600 desktop-dropdown-text-gpu">
                  Сетевые решения корпоративного класса
                </p>
              </div>

              {productSubmenuItems.map((item) => {
                const isActive = dropdownState.activeSubmenu === item.name;
                return (
                  <div key={item.path} className="mb-1">
                    <Link
                      to={item.path}
                      onMouseEnter={() =>
                        !isHomePage && item.hasNestedSubmenu
                          ? setActiveSubmenu(item.name)
                          : setActiveSubmenu(null)
                      }
                      className={`relative flex items-center justify-between mx-3 px-3 py-2 text-sm group rounded-lg border desktop-dropdown-item-gpu transition-colors ${
                        isActive
                          ? 'bg-white shadow-sm border-blue-100'
                          : 'border-transparent text-gray-700 hover:border-blue-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="p-1.5 rounded bg-blue-50 group-hover:bg-blue-100 transition-colors"> 
                          {item.icon && (
                            <Icon
                              name={item.icon as any}
                              size={14}
                              className="desktop-dropdown-icon-gpu text-blue-600"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-semibold leading-tight desktop-dropdown-text-gpu text-gray-900">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      {!isHomePage && item.hasNestedSubmenu && (
                        <Icon
                          name="ChevronRight"
                          size={14}
                          className="transition-colors text-gray-400 group-hover:text-blue-600"
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Правая панель - подразделы (только не на главной) */}
            {!isHomePage &&
              activeItem?.submenuItems &&
              Array.isArray(activeItem.submenuItems) && (
                <div className="w-96 py-4 px-2 bg-white overflow-y-auto">
                  {activeItem.submenuItems.map((submenuItem) => {
                    const SubWrapper: any = submenuItem.disabled ? 'div' : Link;
                    const subWrapperProps: any = submenuItem.disabled
                      ? { 'aria-disabled': true, tabIndex: -1 }
                      : { to: submenuItem.path };
                    return (
                      <div key={submenuItem.path} className="mb-4 last:mb-2">
                        <SubWrapper
                          {...subWrapperProps}
                          className={`group flex items-center gap-2 px-3 py-2 mb-2 text-sm font-bold transition-all duration-200 rounded-lg ${
                            submenuItem.disabled
                              ? 'text-gray-900 cursor-default bg-gray-50'
                              : 'text-gray-900 hover:text-blue-700 hover:bg-blue-50'
                          }`}
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
                          </div>
                        </SubWrapper>

                      {/* Третий уровень - категории */}
                      {Array.isArray(submenuItem.items) &&
                        submenuItem.items.length > 0 && (
                          <div className="space-y-2 ml-1">
                            {submenuItem.items.map((categoryItem) => (
                              <div
                                key={categoryItem.path}
                                className="border-l-2 border-blue-100 pl-3"
                              >
                                <div className="group flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-gray-800 select-none cursor-default rounded">
                                  {categoryItem.icon && (
                                    <Icon
                                      name={categoryItem.icon as any}
                                      size={12}
                                      className="text-blue-500"
                                    />
                                  )}
                                  <span className="truncate">{categoryItem.name}</span>
                                </div>
                                {categoryItem.description && (
                                  <p className="text-xs text-gray-500 mt-0.5 px-2 leading-tight truncate">
                                    {categoryItem.description}
                                  </p>
                                )}

                                {/* Четвёртый уровень - серии коммутаторов */}
                                {Array.isArray(categoryItem.items) &&
                                  categoryItem.items.length > 0 && (
                                    <div className="mt-1 ml-1 space-y-1">
                                      {categoryItem.items.map((seriesItem: any) => (
                                        <Link
                                          key={seriesItem.path}
                                          to={seriesItem.path}
                                          className="group flex items-center px-2 py-1 text-xs text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded"
                                        >
                                          <span className="font-medium truncate">{seriesItem.name}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
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