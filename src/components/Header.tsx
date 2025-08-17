import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { SafeImage } from "@/components/ui/safe-image";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileMenu from "./header/MobileMenu";
import "./header/header-motion.css";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Инлайновые стили удалены, используется global header-motion.css

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
                src="/img/логотип.png"
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
            <div className="lg:hidden ml-auto flex items-center relative">
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