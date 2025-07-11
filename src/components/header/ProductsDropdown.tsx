import { Link } from "react-router-dom";
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

const ProductsDropdown = ({
  isOpen,
  dropdownState,
  setActiveSubmenu,
  onMouseEnter,
  onMouseLeave,
}: ProductsDropdownProps) => {
  const activeItem = productSubmenuItems.find(
    (item) => item.name === dropdownState.activeSubmenu,
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
        <div className="absolute left-0 top-full bg-white border border-gray-100 rounded-lg shadow-lg z-50 animate-fade-in flex">
          {/* Левая панель - основные разделы */}
          <div className="w-72 py-4 border-r border-gray-100">
            {/* Ссылка "Все коммутаторы" */}
            <Link
              to="/products/switches.html"
              className="block px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100 mb-2"
            >
              Все коммутаторы
            </Link>

            {productSubmenuItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-6 py-4 text-base text-gray-700 hover:bg-gray-50 transition-all duration-200 group ${
                    dropdownState.activeSubmenu === item.name
                      ? "bg-gray-50"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    item.hasNestedSubmenu
                      ? setActiveSubmenu(item.name)
                      : setActiveSubmenu(null)
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={item.icon as any}
                      size={18}
                      className="text-gray-500 group-hover:text-blue-600 transition-colors"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.hasNestedSubmenu && (
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className="text-gray-400 group-hover:text-blue-600 transition-colors"
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Правая панель - подразделы */}
          {activeItem?.submenuItems &&
            Array.isArray(activeItem.submenuItems) && (
              <div className="w-80 py-4">
                {activeItem.submenuItems.map((submenuItem) => (
                  <div key={submenuItem.path} className="mb-6">
                    <Link
                      to={submenuItem.path}
                      className="block px-6 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {submenuItem.name}
                    </Link>

                    {/* Третий уровень - категории */}
                    {Array.isArray(submenuItem.items) &&
                      submenuItem.items.length > 0 && (
                        <div className="mt-2 space-y-3">
                          {submenuItem.items.map((categoryItem) => (
                            <div key={categoryItem.path} className="ml-2">
                              <Link
                                to={categoryItem.path}
                                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 rounded"
                              >
                                {categoryItem.name}
                              </Link>

                              {/* Четвёртый уровень - серии коммутаторов */}
                              {Array.isArray(categoryItem.items) &&
                                categoryItem.items.length > 0 && (
                                  <div className="mt-1 ml-4 space-y-1">
                                    {categoryItem.items.map(
                                      (seriesItem: any) => (
                                        <Link
                                          key={seriesItem.path}
                                          to={seriesItem.path}
                                          className="block px-3 py-1.5 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded border-l-2 border-transparent hover:border-blue-300"
                                        >
                                          {seriesItem.name}
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
};

export default ProductsDropdown;
