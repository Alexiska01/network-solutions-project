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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

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

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onToggle={handleMobileMenuToggle}
          onClose={handleMobileMenuClose}
        />
      </div>
    </header>
  );
};

export default Header;
