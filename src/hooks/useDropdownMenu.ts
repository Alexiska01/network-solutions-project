import { useState, useCallback } from "react";

export interface DropdownState {
  isProductsDropdownOpen: boolean;
  activeSubmenu: string | null;
}

export const useDropdownMenu = () => {
  const [dropdownState, setDropdownState] = useState<DropdownState>({
    isProductsDropdownOpen: false,
    activeSubmenu: null,
  });

  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const closeAllSubmenus = useCallback(() => {
    setDropdownState({
      isProductsDropdownOpen: false,
      activeSubmenu: null,
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
