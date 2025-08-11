import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileMenu from "./header/MobileMenu";

// GPU-first оптимизации для Header
const headerStyles = `
  .header-gpu-optimized {
    /* GPU композитинг для максимальной производительности */
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
    contain: layout style;
    will-change: transform, opacity;
  }
  
  /* Оптимизация логотипа */
  .header-logo-container {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
  }
  
  .header-logo {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    transition: opacity var(--header-transition-duration, 150ms) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Навигационные элементы */
  .header-nav-container {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
    contain: layout;
  }
  
  /* Мобильное меню оптимизация */
  .header-mobile-container {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    isolation: isolate;
  }
  
  /* Адаптация под герцовку */
  :root {
    --header-transition-duration: 150ms;
  }
  
  @media (min-refresh-rate: 120hz) {
    :root {
      --header-transition-duration: 120ms;
    }
  }
  
  @media (min-refresh-rate: 240hz) {
    :root {
      --header-transition-duration: 100ms;
    }
  }
  
  /* Оптимизация стикинг позиционирования */
  .header-gpu-optimized {
    position: -webkit-sticky;
    position: sticky;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  
  /* Hover оптимизации */
  @media (hover: hover) and (pointer: fine) {
    .header-logo:hover {
      transform: translate3d(0, 0, 0) scale(1.02);
      transition: all var(--header-transition-duration) cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
  
  /* Текстовые элементы */
  .header-gpu-optimized * {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: geometricPrecision;
  }
  
  /* Backdrop-blur оптимизация */
  .header-gpu-optimized {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  /* Анимации прокрутки */
  .header-gpu-optimized {
    transition: all var(--header-transition-duration) cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Очистка will-change после завершения анимаций */
  .header-gpu-optimized:not(:hover):not(:focus-within) {
    will-change: auto;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Инжект стилей для GPU оптимизации
  if (typeof document !== 'undefined' && !document.getElementById('header-gpu-styles')) {
    const style = document.createElement('style');
    style.id = 'header-gpu-styles';
    style.textContent = headerStyles;
    document.head.appendChild(style);
  }

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
    <header className="bg-white/95 shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all backdrop-blur-xl header-gpu-optimized">
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 md:px-[35px] flex items-center h-[58px] sm:h-[64px] lg:h-[74px] relative">
          {/* Логотип строго слева, всегда видим */}
          <div className="flex-shrink-0 flex items-center h-full z-40 header-logo-container">
            <Link
              to="/"
              className="header-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="https://cdn.poehali.dev/files/8e9b5768-33e6-4132-af48-c9e933188013.png"
                alt="IDATA Logo"
                className="h-9 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Навигация (Desktop / Mobile) */}
          <div className="flex-1 flex items-center min-w-0 justify-end lg:justify-start ml-2 sm:ml-4 lg:ml-8 header-nav-container">
            <DesktopNavigation
              dropdownState={dropdownState}
              updateDropdownState={updateDropdownState}
              closeAllSubmenus={closeAllSubmenus}
              cancelCloseTimeout={cancelCloseTimeout}
              scheduleCloseAllSubmenus={scheduleCloseAllSubmenus}
            />

            {/* Mobile menu burger (visible on mobile only) */}
            <div className="lg:hidden ml-auto flex items-center z-40 header-mobile-container">
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