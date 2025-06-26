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
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Логотип */}
        <div className="absolute left-4 top-0 h-12 md:h-16 flex items-center z-10">
          <Logo />
        </div>

        {/* Навигация */}
        <div className="flex items-center justify-end h-12 md:h-16 pl-28 sm:pl-32 md:pl-40 lg:pl-48">
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
    </header>
  );
};

export default Header;
