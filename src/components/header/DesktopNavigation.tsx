import { Link } from "react-router-dom";
import { memo, useCallback } from "react";
import { DropdownState } from "@/hooks/useDropdownMenu";
import ProductsDropdown from "./ProductsDropdown";
import { navigationItems } from "./navigationData";
import Icon from "@/components/ui/icon";

// GPU-first оптимизации для DesktopNavigation
const desktopNavStyles = `
  .desktop-nav-gpu-optimized {
    /* GPU композитинг для максимальной производительности */
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
    contain: layout style;
  }
  
  .desktop-nav-item {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
    transition: all var(--nav-transition-duration, 150ms) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Hover оптимизации */
  @media (hover: hover) and (pointer: fine) {
    .desktop-nav-item:hover {
      transform: translate3d(0, -1px, 0);
      will-change: transform, color;
    }
    
    .desktop-nav-item:not(:hover) {
      will-change: auto;
    }
  }
  
  /* Иконки оптимизация */
  .desktop-nav-icon {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    transition: transform var(--nav-transition-duration, 150ms) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Текст навигации */
  .desktop-nav-text {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: geometricPrecision;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  
  /* Адаптация под герцовку */
  :root {
    --nav-transition-duration: 150ms;
  }
  
  @media (min-refresh-rate: 120hz) {
    :root {
      --nav-transition-duration: 120ms;
    }
  }
  
  @media (min-refresh-rate: 240hz) {
    :root {
      --nav-transition-duration: 100ms;
    }
  }
`;

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
    // Инжект стилей для GPU оптимизации
    if (typeof document !== 'undefined' && !document.getElementById('desktop-nav-gpu-styles')) {
      const style = document.createElement('style');
      style.id = 'desktop-nav-gpu-styles';
      style.textContent = desktopNavStyles;
      document.head.appendChild(style);
    }
    const handleProductsMouseEnter = useCallback(() => {
      cancelCloseTimeout();
      updateDropdownState({ isProductsDropdownOpen: true });
    }, [cancelCloseTimeout, updateDropdownState]);

    const handleNavItemClick = useCallback(() => {
      closeAllSubmenus();
    }, [closeAllSubmenus]);

    return (
      <nav className="hidden lg:flex items-center justify-between w-full mx-0 min-w-0 desktop-nav-gpu-optimized">
        {navigationItems.map((item) => (
          <div key={item.path} className="relative min-w-0 desktop-nav-item">
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
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] desktop-nav-item"
                onClick={handleNavItemClick}
                tabIndex={0}
              >
                {item.icon && (
                  <Icon
                    name={item.icon as keyof typeof import("lucide-react")}
                    size={16}
                    className="desktop-nav-icon"
                  />
                )}
                <span className="truncate desktop-nav-text">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  },
);

DesktopNavigation.displayName = "DesktopNavigation";

export default DesktopNavigation;