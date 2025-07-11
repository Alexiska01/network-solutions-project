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
      {/* Логотип в отдельном контейнере строго слева */}
      <div className="absolute left-0 top-0 h-full flex items-center z-40 pl-3 sm:pl-4 md:pl-[35px]">
        <Link
          to="/"
          className="transition-opacity hover:opacity-80"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="https://cdn.poehali.dev/files/8e9b5768-33e6-4132-af48-c9e933188013.png"
            alt="IDATA Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Оригинальная структура навигации без изменений */}
      <div className="max-w-7xl mx-auto py-2 sm:py-1.5 px-3 sm:px-4 md:px-[35px]">
        <div className="flex items-center justify-between w-full min-h-[44px] sm:min-h-[48px] pl-20 sm:pl-24 md:pl-28 lg:pl-32">
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
    </header>
  );
};

export default Header;
