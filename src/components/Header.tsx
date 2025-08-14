import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { SafeImage } from "@/components/ui/safe-image";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileMenu from "./header/MobileMenu";

// GPU-оптимизированные стили только для десктопа
const desktopHeaderStyles = `
  @media (min-width: 1024px) {
    .desktop-header-gpu {
      /* GPU композитинг для максимальной производительности */
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      isolation: isolate;
      contain: layout style;
      will-change: transform, opacity;
    }
    
    .desktop-logo-container {
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      isolation: isolate;
    }
    
    .desktop-logo {
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      transition: all var(--desktop-header-duration, 200ms) cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .desktop-nav-container {
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      isolation: isolate;
      contain: layout;
    }
    
    /* Hover эффекты только для десктопа */
    .desktop-logo:hover {
      transform: translate3d(0, 0, 0) scale(1.02);
      opacity: 0.9;
    }
    
    /* Адаптивные длительности под герцовку */
    :root {
      --desktop-header-duration: 200ms;
    }
    
    @media (min-refresh-rate: 120hz) {
      :root {
        --desktop-header-duration: 160ms;
      }
    }
    
    @media (min-refresh-rate: 240hz) {
      :root {
        --desktop-header-duration: 120ms;
      }
    }
    
    /* Оптимизированное sticky позиционирование */
    .desktop-header-gpu {
      position: -webkit-sticky;
      position: sticky;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    
    /* Backdrop-blur оптимизация */
    .desktop-header-gpu {
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
    }
    
    /* Текстовая оптимизация */
    .desktop-header-gpu * {
      -webkit-font-smoothing: subpixel-antialiased;
      -moz-osx-font-smoothing: auto;
      text-rendering: geometricPrecision;
    }
    
    /* Очистка will-change после анимаций */
    .desktop-header-gpu:not(:hover):not(:focus-within) {
      will-change: auto;
    }
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Инжект стилей только один раз
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('desktop-header-gpu-styles')) {
      const style = document.createElement('style');
      style.id = 'desktop-header-gpu-styles';
      style.textContent = desktopHeaderStyles;
      document.head.appendChild(style);
    }
  }, []);

  const {
    dropdownState,
    closeAllSubmenus,
    cancelCloseTimeout,
    scheduleCloseAllSubmenus,
    updateDropdownState,
  } = useDropdownMenu();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all backdrop-blur-xl desktop-header-gpu">
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 md:px-[35px] flex items-center h-[58px] sm:h-[64px] lg:h-[74px] relative">
          {/* Логотип строго слева, всегда видим */}
          <div className="flex-shrink-0 flex items-center h-full z-40 desktop-logo-container">
            <Link
              to="/"
              className="desktop-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <SafeImage
                src="/img/104c7de0-7c29-41ab-97ee-97f064ac7ecd.jpg"
                alt="IDATA Logo"
                className="h-9 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Навигация (Desktop / Mobile) */}
          <div className="flex-1 flex items-center min-w-0 justify-end lg:justify-start ml-2 sm:ml-4 lg:ml-8 desktop-nav-container">
            <DesktopNavigation
              dropdownState={dropdownState}
              updateDropdownState={updateDropdownState}
              closeAllSubmenus={closeAllSubmenus}
              cancelCloseTimeout={cancelCloseTimeout}
              scheduleCloseAllSubmenus={scheduleCloseAllSubmenus}
            />

            {/* Mobile menu burger (visible on mobile only) */}
            <div className="lg:hidden ml-auto flex items-center z-40">
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onToggle={handleMobileMenuToggle}
                onClose={handleMobileMenuClose}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;