import { useState } from "react";
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
      <div className="max-w-7xl mx-auto py-2 sm:py-1.5 px-3 sm:px-4 md:px-[35px]">
        {/* Логотип остается вне основного контейнера */}
        <div className="px-2 sm:px-4">{/* Здесь будет логотип */}</div>

        {/* Навигация в общем контейнере */}
        <div className="max-w-7xl mx-auto py-1 sm:py-1.5 px-0">
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
