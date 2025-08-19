import { Link } from "react-router-dom";
import { memo, useCallback } from "react";
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

const DesktopNavigation = memo(
  ({
    dropdownState,
    updateDropdownState,
    closeAllSubmenus,
    cancelCloseTimeout,
    scheduleCloseAllSubmenus,
  }: DesktopNavigationProps) => {
  // Inline style injection removed (global header-motion.css)
    const handleProductsMouseEnter = useCallback(() => {
      cancelCloseTimeout();
      updateDropdownState({ isProductsDropdownOpen: true });
    }, [cancelCloseTimeout, updateDropdownState]);

    const handleNavItemClick = useCallback(() => {
      closeAllSubmenus();
    }, [closeAllSubmenus]);

    return (
      <nav className="hidden lg:flex items-center justify-between w-full mx-0 min-w-0 desktop-nav-gpu">
        {navigationItems.map((item, i) => (
          <div key={item.path} className="relative min-w-0 desktop-nav-item-gpu hdr-stagger-item" style={{ ['--i' as any]: i }}>
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
              item.disabled ? (
                <div
                  className="px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] select-none cursor-default text-gray-700"
                  aria-disabled="true"
                >
                  {item.icon && (
                    <Icon
                      name={item.icon as keyof typeof import('lucide-react')}
                      size={16}
                      className="desktop-nav-icon-gpu"
                    />
                  )}
                  <span className="truncate desktop-nav-text-gpu">{item.name}</span>
                </div>
              ) : (
                item.path === "/contacts" ? (
                  <button
                    type="button"
                    className="text-gray-700 px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] desktop-nav-link-gpu bg-transparent border-0 cursor-pointer"
                    onClick={e => {
                      e.preventDefault();
                      window.openContactModal && window.openContactModal();
                      closeAllSubmenus();
                    }}
                    tabIndex={0}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon as keyof typeof import('lucide-react')}
                        size={16}
                        className="desktop-nav-icon-gpu"
                      />
                    )}
                    <span className="truncate desktop-nav-text-gpu">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-700 px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] desktop-nav-link-gpu"
                    onClick={handleNavItemClick}
                    tabIndex={0}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon as keyof typeof import('lucide-react')}
                        size={16}
                        className="desktop-nav-icon-gpu"
                      />
                    )}
                    <span className="truncate desktop-nav-text-gpu">{item.name}</span>
                  </Link>
                )
              )
            )}
          </div>
        ))}
      </nav>
    );
  },
);

DesktopNavigation.displayName = "DesktopNavigation";

export default DesktopNavigation;