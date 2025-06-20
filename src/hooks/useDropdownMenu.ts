import { useState, useCallback } from "react";

export interface DropdownState {
  isProductsDropdownOpen: boolean;
  isRoutersSubmenuOpen: boolean;
  isSwitchesSubmenuOpen: boolean;
  isAccessLevelSubmenuOpen: boolean;
  isDistributionLevelSubmenuOpen: boolean;
  isCorporateLanSubmenuOpen: boolean;
  isDataCentersSubmenuOpen: boolean;
  isSpineLevelSubmenuOpen: boolean;
  isLeafLevelSubmenuOpen: boolean;
}

export const useDropdownMenu = () => {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    isProductsDropdownOpen: false,
    isRoutersSubmenuOpen: false,
    isSwitchesSubmenuOpen: false,
    isAccessLevelSubmenuOpen: false,
    isDistributionLevelSubmenuOpen: false,
    isCorporateLanSubmenuOpen: false,
    isDataCentersSubmenuOpen: false,
    isSpineLevelSubmenuOpen: false,
    isLeafLevelSubmenuOpen: false,
  });

  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const closeAllSubmenus = useCallback(() => {
    setDropdownState({
      isProductsDropdownOpen: false,
      isRoutersSubmenuOpen: false,
      isSwitchesSubmenuOpen: false,
      isAccessLevelSubmenuOpen: false,
      isDistributionLevelSubmenuOpen: false,
      isCorporateLanSubmenuOpen: false,
      isDataCentersSubmenuOpen: false,
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

  return {
    dropdownState,
    closeAllSubmenus,
    cancelCloseTimeout,
    scheduleCloseAllSubmenus,
    updateDropdownState,
  };
};
