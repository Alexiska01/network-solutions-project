import { Link } from "react-router-dom";
import { DropdownState } from "@/hooks/useDropdownMenu";
import ProductsDropdown from "./ProductsDropdown";
import { navigationItems } from "./navigationData";
import Icon from "@/components/ui/icon";

interface DesktopNavigationProps {
  dropdownState: DropdownState;
  updateDropdownState: (updates: Partial<DropdownState>) => void;
  closeAllSubmenus: () => void;
  cancelCloseTimeout: () => void;
  scheduleCloseAllSubmenus: () => void;
}

const DesktopNavigation = ({
  dropdownState,
  updateDropdownState,
  closeAllSubmenus,
  cancelCloseTimeout,
  scheduleCloseAllSubmenus,
}: DesktopNavigationProps) => {
  const handleProductsMouseEnter = () => {
    cancelCloseTimeout();
    updateDropdownState({ isProductsDropdownOpen: true });
  };

  const handleProductsClick = () => {
    updateDropdownState({
      isProductsDropdownOpen: !dropdownState.isProductsDropdownOpen,
    });
  };

  const handleNavItemClick = () => {
    closeAllSubmenus();
  };

  return (
    <nav className="flex items-center space-x-4 md:space-x-8 mx-0 overflow-x-auto">
      {navigationItems.map((item) => (
        <div key={item.path} className="relative flex-shrink-0">
          {item.hasSubmenu ? (
            <ProductsDropdown
              isOpen={dropdownState.isProductsDropdownOpen}
              dropdownState={dropdownState}
              updateDropdownState={updateDropdownState}
              setActiveSubmenu={(submenu) =>
                updateDropdownState({ activeSubmenu: submenu })
              }
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={scheduleCloseAllSubmenus}
              onClick={handleProductsClick}
            />
          ) : (
            <Link
              to={item.path}
              className="text-gray-700 hover:text-blue-600 px-2 md:px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center space-x-1 md:space-x-2 h-10"
              onClick={handleNavItemClick}
            >
              <Icon name={item.icon} size={16} />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
