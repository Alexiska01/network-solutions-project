import React from "react";
import { Link } from "react-router-dom";
import { navigationItems } from "./navigationData";

interface DesktopNavigationProps {
  dropdownState: any;
  updateDropdownState: (key: string, value: boolean) => void;
  closeAllSubmenus: () => void;
  cancelCloseTimeout: () => void;
  scheduleCloseAllSubmenus: () => void;
}

const DesktopNavigation = ({
  dropdownState,
  updateDropdownState,
  closeAllSubmenus,
  cancelCloseTimeout,
  scheduleCloseAllSubmenus,
}: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex lg:space-x-8">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
