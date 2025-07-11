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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto">
        {/* Контейнер с логотипом */}
        <div className="flex items-center justify-center py-3 px-3 sm:px-4 md:px-[35px] border-b border-gray-100">
          <Link
            to="/"
            className="transition-opacity hover:opacity-80"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="https://cdn.poehali.dev/files/8a4d84ca-3793-4bd6-a263-4a0c00e41c01.png"
              alt="IDATA Logo"
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>
        </div>

        {/* Контейнер с навигацией */}
        <div className="py-1 sm:py-1.5 px-3 sm:px-4 md:px-[35px]">
          <div className="flex items-center justify-between w-full min-h-[44px] sm:min-h-[48px]">
            <DesktopNavigation
              dropdownState={dropdownState}
              updateDropdownState={updateDropdownState}
              closeAllSubmenus={closeAllSubmenus}
              cancelCloseTimeout={cancelCloseTimeout}
              scheduleCloseAllSubmenus={scheduleCloseAllSubmenus}
            />

            <div className="lg:hidden ml-auto flex items-center">
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
