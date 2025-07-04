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

  const handleNavItemClick = () => {
    closeAllSubmenus();
  };

  return (
    <nav className="hidden lg:flex items-center space-x-8 mx-0">
      {navigationItems.map((item) => (
        <div key={item.path} className="relative">
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
            />
          ) : (
            <Link
              to={item.path}
              className="text-gray-700 hover:text-blue-600 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center space-x-2 h-10"
              style={{ paddingLeft: "15.1px", paddingRight: "15.1px" }}
              onClick={handleNavItemClick}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
