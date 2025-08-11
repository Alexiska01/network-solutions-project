import { Link } from "react-router-dom";
import { memo, useCallback, useEffect } from "react";
import { DropdownState } from "@/hooks/useDropdownMenu";
import ProductsDropdown from "./ProductsDropdown";
import { navigationItems } from "./navigationData";
import Icon from "@/components/ui/icon";

// GPU-оптимизации только для десктоп навигации
const desktopNavStyles = `
  @media (min-width: 1024px) {
    .desktop-nav-gpu {
      /* GPU композитинг для навигации */
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      isolation: isolate;
      contain: layout style;
    }
    
    .desktop-nav-item-gpu {
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      isolation: isolate;
      transition: all var(--nav-transition-duration, 200ms) cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .desktop-nav-link-gpu {
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      transition: all var(--nav-transition-duration, 200ms) cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    /* Премиальные hover эффекты для десктопа */
    .desktop-nav-link-gpu:hover {
      transform: translate3d(0, -2px, 0);
      color: rgb(37 99 235);
      will-change: transform, color;
    }
    
    .desktop-nav-link-gpu:not(:hover) {
      will-change: auto;
    }
    
    /* Иконки оптимизация */
    .desktop-nav-icon-gpu {
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      transition: transform var(--nav-transition-duration, 200ms) cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .desktop-nav-link-gpu:hover .desktop-nav-icon-gpu {
      transform: translate3d(0, 0, 0) scale(1.05);
    }
    
    /* Текст оптимизация */
    .desktop-nav-text-gpu {
      -webkit-font-smoothing: subpixel-antialiased;
      -moz-osx-font-smoothing: auto;
      text-rendering: geometricPrecision;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    
    /* Адаптивные длительности под герцовку */
    :root {
      --nav-transition-duration: 200ms;
    }
    
    @media (min-refresh-rate: 120hz) {
      :root {
        --nav-transition-duration: 160ms;
      }
    }
    
    @media (min-refresh-rate: 240hz) {
      :root {
        --nav-transition-duration: 120ms;
      }
    }
    
    /* Активные состояния */
    .desktop-nav-link-gpu:focus {
      outline: 2px solid rgb(59 130 246);
      outline-offset: 2px;
      border-radius: 6px;
    }
    
    .desktop-nav-link-gpu:active {
      transform: translate3d(0, 0, 0) scale(0.98);
      transition-duration: 80ms;
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
    // Инжект стилей только один раз
    useEffect(() => {
      if (typeof document !== 'undefined' && !document.getElementById('desktop-nav-gpu-styles')) {
        const style = document.createElement('style');
        style.id = 'desktop-nav-gpu-styles';
        style.textContent = desktopNavStyles;
        document.head.appendChild(style);
      }
    }, []);
    const handleProductsMouseEnter = useCallback(() => {
      cancelCloseTimeout();
      updateDropdownState({ isProductsDropdownOpen: true });
    }, [cancelCloseTimeout, updateDropdownState]);

    const handleNavItemClick = useCallback(() => {
      closeAllSubmenus();
    }, [closeAllSubmenus]);

    return (
      <nav className="hidden lg:flex items-center justify-between w-full mx-0 min-w-0 desktop-nav-gpu">
        {navigationItems.map((item) => (
          <div key={item.path} className="relative min-w-0 desktop-nav-item-gpu">
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
                className="text-gray-700 px-3 py-2 text-sm font-normal whitespace-nowrap flex items-center space-x-2 h-[44px] lg:h-[54px] desktop-nav-link-gpu"
                onClick={handleNavItemClick}
                tabIndex={0}
              >
                {item.icon && (
                  <Icon
                    name={item.icon as keyof typeof import("lucide-react")}
                    size={16}
                    className="desktop-nav-icon-gpu"
                  />
                )}
                <span className="truncate desktop-nav-text-gpu">{item.name}</span>
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