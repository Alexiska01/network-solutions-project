import { useState, useCallback } from "react";

export interface DropdownState {
  isProductsDropdownOpen: boolean;
  activeSubmenu: string | null;
  // Дополнительные уровни для SwitchesSubmenu
  isCorporateLanSubmenuOpen?: boolean;
  isDataCentersSubmenuOpen?: boolean;
  isAccessLevelSubmenuOpen?: boolean;
  isDistributionLevelSubmenuOpen?: boolean;
  isSpineLevelSubmenuOpen?: boolean;
  isLeafLevelSubmenuOpen?: boolean;
}

export const useDropdownMenu = () => {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    isProductsDropdownOpen: false,
    activeSubmenu: null,
  isCorporateLanSubmenuOpen: false,
  isDataCentersSubmenuOpen: false,
  isAccessLevelSubmenuOpen: false,
  isDistributionLevelSubmenuOpen: false,
  isSpineLevelSubmenuOpen: false,
  isLeafLevelSubmenuOpen: false,
  });

  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const closeAllSubmenus = useCallback(() => {
    setDropdownState({
      isProductsDropdownOpen: false,
      activeSubmenu: null,
  isCorporateLanSubmenuOpen: false,
  isDataCentersSubmenuOpen: false,
  isAccessLevelSubmenuOpen: false,
  isDistributionLevelSubmenuOpen: false,
  isSpineLevelSubmenuOpen: false,
  isLeafLevelSubmenuOpen: false,
    });
  }, []);

  const cancelCloseTimeout = useCallback(() => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  }, [dropdownTimeout]);

  const scheduleCloseAllSubmenus = useCallback(() => {
    cancelCloseTimeout();
    const timeout = setTimeout(closeAllSubmenus, 150);
    setDropdownTimeout(timeout);
  }, [cancelCloseTimeout, closeAllSubmenus]);

  const updateDropdownState = useCallback((updates: Partial<DropdownState>) => {
    setDropdownState((prev) => ({ ...prev, ...updates }));
  }, []);

  const setActiveSubmenu = useCallback(
    (submenuName: string | null) => {
      updateDropdownState({ activeSubmenu: submenuName });
    },
    [updateDropdownState],
  );

  return {
    dropdownState,
    closeAllSubmenus,
    cancelCloseTimeout,
    scheduleCloseAllSubmenus,
    updateDropdownState,
    setActiveSubmenu,
  };
};
