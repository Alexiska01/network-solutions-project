import React, { useState } from "react";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import Logo from "./header/Logo";
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
      <div className="relative">
        {/* Логотип */}
        <div className="absolute left-0 top-0 h-12 md:h-16 flex items-center pl-2 sm:pl-4 md:pl-6 lg:pl-8 z-10">
          <Logo />
        </div>

        {/* Навигация */}
        <div className="pl-2 sm:pl-4 md:pl-6 lg:pl-8">
          <div className="flex items-center justify-end h-12 md:h-16 pl-28 sm:pl-32 md:pl-40 lg:pl-48 pr-2 sm:pr-4 md:pr-6 lg:pr-8 mx-[73px]">
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
