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
        {/* Логотип вне сетки, прижат к левому краю */}
        <div className="absolute left-0 top-0 h-16 flex items-center pl-4 sm:pl-6 lg:pl-8 z-10">
          <Logo />
        </div>

        {/* Навигация в сетке с отступом под логотип */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-16 pl-40 sm:pl-44 lg:pl-48">
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
