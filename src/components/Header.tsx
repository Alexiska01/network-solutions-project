import React, { useState } from "react";
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
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="relative flex items-center justify-between h-12 md:h-16">
        {/* Логотип остается вне основного контейнера */}
        <div className="px-4">{/* Здесь будет логотип */}</div>

        {/* Навигация в общем контейнере */}
        <div className="max-w-7xl mx-auto py-4 px-[35px]">
          <div className="flex items-center">
            <DesktopNavigation
              dropdownState={dropdownState}
              updateDropdownState={updateDropdownState}
              closeAllSubmenus={closeAllSubmenus}
              cancelCloseTimeout={cancelCloseTimeout}
              scheduleCloseAllSubmenus={scheduleCloseAllSubmenus}
            />

            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={handleMobileMenuToggle}
              onClose={handleMobileMenuClose}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
