import React from "react";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import Logo from "./header/Logo";
import DesktopNavigation from "./header/DesktopNavigation";

const Header = () => {
  const {
    dropdownState,
    closeAllSubmenus,
    cancelCloseTimeout,
    scheduleCloseAllSubmenus,
    updateDropdownState,
  } = useDropdownMenu();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="relative">
        {/* Логотип вне сетки, прижат к левому краю */}
        <div className="absolute left-0 top-0 h-16 flex items-center pl-4 sm:pl-6 lg:pl-8 z-10">
          <Logo />
        </div>

        {/* Навигация в сетке с отступом под логотип */}
        <div className="pl-4 sm:pl-6 lg:pl-8">
          <div className="flex items-center justify-end h-16 pl-40 sm:pl-44 lg:pl-48 pr-4 sm:pr-6 lg:pr-8">
            <DesktopNavigation
              dropdownState={dropdownState}
              updateDropdownState={updateDropdownState}
              closeAllSubmenus={closeAllSubmenus}
              cancelCloseTimeout={cancelCloseTimeout}
              scheduleCloseAllSubmenus={scheduleCloseAllSubmenus}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
