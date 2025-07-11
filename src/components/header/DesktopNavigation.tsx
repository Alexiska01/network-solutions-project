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
    <nav className="hidden lg:flex items-center justify-between w-full mx-0 min-w-0">
      {navigationItems.map((item) => (
        <div key={item.path} className="relative min-w-0">
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
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-normal transition-colors whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px]"
              onClick={handleNavItemClick}
              tabIndex={0}
            >
              {item.icon && (
                <Icon
                  name={item.icon as keyof typeof import("lucide-react")}
                  size={16}
                  className=""
                />
              )}
              <span className="truncate">{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
