import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="bg-white/95 shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all backdrop-blur-xl">
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 md:px-[35px] flex items-center h-[58px] sm:h-[64px] lg:h-[74px] relative">
          {/* Логотип строго слева, всегда видим */}
          <div className="flex-shrink-0 flex items-center h-full z-40">
            <Link
              to="/"
              className="transition-opacity hover:opacity-80"
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
          <div className="flex-1 flex items-center min-w-0 justify-end lg:justify-between ml-2 sm:ml-4 lg:ml-8">
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
