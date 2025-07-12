import { Link } from "react-router-dom";
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
    const activeItem = useMemo(
      () =>
        productSubmenuItems.find(
          (item) => item.name === dropdownState.activeSubmenu,
        ),
      [dropdownState.activeSubmenu],
    );

    return (
      <div
        className="flex items-center relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-normal transition-colors whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px]">
          <Icon name="Network" size={16} className="" />
          <span>Оборудование</span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full bg-white border border-gray-100 rounded-xl shadow-2xl z-50 animate-fade-in flex min-h-[500px]">
            {/* Левая панель - основные разделы */}
            <div className="w-80 py-6 border-r border-gray-100 bg-gradient-to-b from-gray-50 to-white">
              {/* Заголовок раздела */}
              <div className="px-6 mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Оборудование iDATA
                </h3>
                <p className="text-sm text-gray-600">
                  Сетевые решения корпоративного класса
                </p>
              </div>

              {/* Ссылка "Все коммутаторы" */}
              <Link
                to="/products/switches.html"
                className="block mx-6 mb-4 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-center shadow-sm"
              >
                📋 Посмотреть все продукты
              </Link>

              {productSubmenuItems.map((item) => (
                <div key={item.path} className="mb-2">
                  <Link
                    to={item.path}
                    className={`relative flex items-start justify-between mx-4 px-4 py-4 text-base text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 group rounded-lg border border-transparent hover:border-blue-100 ${
                      dropdownState.activeSubmenu === item.name
                        ? "bg-white shadow-md border-blue-100"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      item.hasNestedSubmenu
                        ? setActiveSubmenu(item.name)
                        : setActiveSubmenu(null)
                    }
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <Icon
                          name={item.icon as any}
                          size={18}
                          className="text-blue-600"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 group-hover:text-blue-700">
                            {item.name}
                          </span>
                          {item.isPopular && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                              🔥 Популярно
                            </span>
                          )}
                          {item.isNew && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                              ✨ Новинка
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.category && (
                          <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.hasNestedSubmenu && (
                      <div className="flex flex-col items-center justify-center ml-2">
                        <Icon
                          name="ChevronRight"
                          size={16}
                          className="text-gray-400 group-hover:text-blue-600 transition-colors"
                        />
                        {item.badge && (
                          <span className="mt-1 px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded text-center">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Правая панель - подразделы */}
            {activeItem?.submenuItems &&
              Array.isArray(activeItem.submenuItems) && (
                <div className="w-96 py-6 px-2 bg-white">
                  {activeItem.submenuItems.map((submenuItem) => (
                    <div key={submenuItem.path} className="mb-8 last:mb-4">
                      <Link
                        to={submenuItem.path}
                        className="group flex items-center gap-3 px-4 py-3 mb-3 text-base font-bold text-gray-900 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                      >
                        {submenuItem.icon && (
                          <Icon
                            name={submenuItem.icon as any}
                            size={20}
                            className="text-blue-600"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{submenuItem.name}</span>
                            {submenuItem.badge && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                {submenuItem.badge}
                              </span>
                            )}
                          </div>
                          {submenuItem.description && (
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                              {submenuItem.description}
                            </p>
                          )}
                        </div>
                      </Link>

                      {/* Третий уровень - категории */}
                      {Array.isArray(submenuItem.items) &&
                        submenuItem.items.length > 0 && (
                          <div className="space-y-4 ml-2">
                            {submenuItem.items.map((categoryItem) => (
                              <div
                                key={categoryItem.path}
                                className="border-l-2 border-blue-100 pl-4"
                              >
                                <Link
                                  to={categoryItem.path}
                                  className="group flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-800 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 rounded-lg"
                                >
                                  {categoryItem.icon && (
                                    <Icon
                                      name={categoryItem.icon as any}
                                      size={16}
                                      className="text-blue-500"
                                    />
                                  )}
                                  <span>{categoryItem.name}</span>
                                  {categoryItem.badge && (
                                    <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                                      {categoryItem.badge}
                                    </span>
                                  )}
                                </Link>
                                {categoryItem.description && (
                                  <p className="text-xs text-gray-600 mt-1 px-3 leading-relaxed">
                                    {categoryItem.description}
                                  </p>
                                )}

                                {/* Четвёртый уровень - серии коммутаторов */}
                                {Array.isArray(categoryItem.items) &&
                                  categoryItem.items.length > 0 && (
                                    <div className="mt-3 ml-2 space-y-2">
                                      {categoryItem.items.map(
                                        (seriesItem: any) => (
                                          <Link
                                            key={seriesItem.path}
                                            to={seriesItem.path}
                                            className="group flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 rounded-lg border border-transparent hover:border-blue-200 hover:shadow-sm"
                                          >
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                              <span className="font-medium truncate">
                                                {seriesItem.name}
                                              </span>
                                              {seriesItem.isNew && (
                                                <span
                                                  className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                                  title="Новинка"
                                                ></span>
                                              )}
                                              {seriesItem.isPopular && (
                                                <span
                                                  className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full"
                                                  title="Популярное"
                                                ></span>
                                              )}
                                            </div>
                                            {seriesItem.badge && (
                                              <span className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded ml-2">
                                                {seriesItem.badge}
                                              </span>
                                            )}
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
