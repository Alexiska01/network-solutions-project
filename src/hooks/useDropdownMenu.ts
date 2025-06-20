import { useState, useRef, useCallback } from "react";

export const useDropdownMenu = () => {
  const [dropdownState, setDropdownState] = useState<Record<string, boolean>>(
    {},
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateDropdownState = useCallback((key: string, value: boolean) => {
    setDropdownState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const closeAllSubmenus = useCallback(() => {
    setDropdownState({});
  }, []);

  const cancelCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleCloseAllSubmenus = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      closeAllSubmenus();
    }, 300);
  }, [closeAllSubmenus]);

  return {
    dropdownState,
    updateDropdownState,
    closeAllSubmenus,
    cancelCloseTimeout,
    scheduleCloseAllSubmenus,
  };
};
