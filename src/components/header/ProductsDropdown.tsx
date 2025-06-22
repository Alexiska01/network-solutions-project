import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { DropdownState } from "@/hooks/useDropdownMenu";
import SwitchesSubmenu from "./SwitchesSubmenu";
import { productSubmenuItems, routersSubmenuItems } from "./navigationData";

interface ProductsDropdownProps {
  isOpen: boolean;
  dropdownState: DropdownState;
  updateDropdownState: (updates: Partial<DropdownState>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductsDropdown = ({
  isOpen,
  dropdownState,
  updateDropdownState,
  onMouseEnter,
  onMouseLeave,
}: ProductsDropdownProps) => {
  const handleSwitchesToggle = () => {
    updateDropdownState({
      isRoutersSubmenuOpen: false,
      isSwitchesSubmenuOpen: !dropdownState.isSwitchesSubmenuOpen,
      isCorporateLanSubmenuOpen: false,
      isDataCentersSubmenuOpen: false,
    });
  };

  const handleRoutersToggle = () => {
    updateDropdownState({
      isSwitchesSubmenuOpen: false,
      isCorporateLanSubmenuOpen: false,
      isDataCentersSubmenuOpen: false,
      isRoutersSubmenuOpen: !dropdownState.isRoutersSubmenuOpen,
    });
  };

  const handleSimpleItemClick = () => {
    updateDropdownState({
      isSwitchesSubmenuOpen: false,
      isRoutersSubmenuOpen: false,
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2">
        <Icon name="Network" size={16} />
        <span>Оборудование</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in w-72">
          <div className="py-2">
            {productSubmenuItems.map((subItem) => (
              <div key={subItem.path}>
                {subItem.hasNestedSubmenu ? (
                  <>
                    <div
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600 cursor-pointer"
                      onClick={() => {
                        if (subItem.name === "Коммутаторы") {
                          handleSwitchesToggle();
                        } else if (subItem.name === "Маршрутизаторы") {
                          handleRoutersToggle();
                        }
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name={subItem.icon} size={16} />
                        <span>{subItem.name}</span>
                      </div>
                      <Icon
                        name="ChevronRight"
                        size={16}
                        className={`transition-transform duration-300 ${
                          (subItem.name === "Коммутаторы" &&
                            dropdownState.isSwitchesSubmenuOpen) ||
                          (subItem.name === "Маршрутизаторы" &&
                            dropdownState.isRoutersSubmenuOpen)
                            ? "rotate-90"
                            : ""
                        }`}
                      />
                    </div>

                    {/* Подменю коммутаторов */}
                    {subItem.name === "Коммутаторы" &&
                      dropdownState.isSwitchesSubmenuOpen && (
                        <SwitchesSubmenu
                          dropdownState={dropdownState}
                          updateDropdownState={updateDropdownState}
                        />
                      )}

                    {/* Подменю маршрутизаторов */}
                    {subItem.name === "Маршрутизаторы" &&
                      dropdownState.isRoutersSubmenuOpen &&
                      routersSubmenuItems.map((nestedItem) => (
                        <Link
                          key={nestedItem.path}
                          to={nestedItem.path}
                          className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors border-l-4 border-blue-300 bg-gray-50"
                        >
                          {nestedItem.name}
                        </Link>
                      ))}
                  </>
                ) : (
                  <Link
                    to={subItem.path}
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                    onClick={handleSimpleItemClick}
                  >
                    <Icon name={subItem.icon} size={16} />
                    <span>{subItem.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDropdown;
