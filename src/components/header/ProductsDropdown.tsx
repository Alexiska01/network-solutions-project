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
  onClick: () => void;
}

const ProductsDropdown = ({
  isOpen,
  dropdownState,
  updateDropdownState,
  setActiveSubmenu,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ProductsDropdownProps) => {
  const activeItem = productSubmenuItems.find(
    (item) => item.name === dropdownState.activeSubmenu,
  );

  const handleSubmenuItemClick = (item: any) => {
    if (item.hasNestedSubmenu) {
      setActiveSubmenu(
        dropdownState.activeSubmenu === item.name ? null : item.name,
      );
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className="text-gray-700 hover:text-blue-600 px-2 md:px-3 py-2 text-sm md:text-base font-medium transition-colors flex items-center space-x-1 md:space-x-2"
        onClick={onClick}
      >
        <Icon name="Network" size={16} />
        <span className="hidden sm:inline">Оборудование</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 md:left-auto md:right-0 top-full bg-white border border-gray-100 rounded-lg shadow-lg z-50 animate-fade-in flex flex-col md:flex-row min-w-[280px] md:min-w-max max-w-[90vw] md:max-w-none">
          {/* Левая панель - основные разделы */}
          <div className="w-full md:w-72 py-4 border-b md:border-b-0 md:border-r border-gray-100">
            {/* Ссылка "Все коммутаторы" */}
            <Link
              to="/products/switches.html"
              className="block px-4 md:px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100 mb-2"
            >
              Все коммутаторы
            </Link>

            {productSubmenuItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-gray-700 hover:bg-gray-50 transition-all duration-200 group ${
                    dropdownState.activeSubmenu === item.name
                      ? "bg-gray-50"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    item.hasNestedSubmenu
                      ? setActiveSubmenu(item.name)
                      : setActiveSubmenu(null)
                  }
                  onClick={(e) => {
                    if (item.hasNestedSubmenu) {
                      e.preventDefault();
                      handleSubmenuItemClick(item);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={item.icon}
                      size={16}
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
          {activeItem?.submenuItems && (
            <div className="w-full md:w-80 py-4 max-h-64 md:max-h-none overflow-y-auto">
              {activeItem.submenuItems.map((submenuItem) => (
                <div key={submenuItem.path} className="mb-4 md:mb-6">
                  <Link
                    to={submenuItem.path}
                    className="block px-4 md:px-6 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {submenuItem.name}
                  </Link>

                  {submenuItem.items && submenuItem.items.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {submenuItem.items.map((seriesItem) => (
                        <Link
                          key={seriesItem.path}
                          to={seriesItem.path}
                          className="block px-4 md:px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                        >
                          {seriesItem.name}
                        </Link>
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
