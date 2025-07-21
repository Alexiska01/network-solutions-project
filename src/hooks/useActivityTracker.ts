import { useCallback, useEffect, useState } from 'react';

const WELCOME_SCREEN_KEY = 'welcomeScreen_lastShown';
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 час в миллисекундах

export const useActivityTracker = () => {
  const [isInactive, setIsInactive] = useState(false);
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);

  const getLastWelcomeTime = useCallback(() => {
    const stored = localStorage.getItem(WELCOME_SCREEN_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }, []);

  const setLastWelcomeTime = useCallback(() => {
    localStorage.setItem(WELCOME_SCREEN_KEY, Date.now().toString());
  }, []);

  const shouldShowWelcomeScreen = useCallback(() => {
    const lastShown = getLastWelcomeTime();
    const now = Date.now();
    const timeSinceLastShown = now - lastShown;
    
    // Показываем если прошло больше часа или если никогда не показывали
    return timeSinceLastShown >= INACTIVITY_TIMEOUT || lastShown === 0;
  }, [getLastWelcomeTime]);

  const markWelcomeAsShown = useCallback(() => {
    setLastWelcomeTime();
    setShouldShowWelcome(false);
  }, [setLastWelcomeTime]);

  const resetInactivityTimer = useCallback(() => {
    setIsInactive(false);
    
    // Проверяем, нужно ли показывать welcome screen
    if (shouldShowWelcomeScreen()) {
      setShouldShowWelcome(true);
    }
  }, [shouldShowWelcomeScreen]);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const handleActivity = () => {
      resetInactivityTimer();
      
      // Сбрасываем таймер неактивности
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsInactive(true);
      }, INACTIVITY_TIMEOUT);
    };

    // События активности пользователя
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Проверяем при первой загрузке
    if (shouldShowWelcomeScreen()) {
      setShouldShowWelcome(true);
    }

    // Устанавливаем начальный таймер
    handleActivity();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [resetInactivityTimer, shouldShowWelcomeScreen]);

  return {
    shouldShowWelcome,
    markWelcomeAsShown,
    isInactive
  };
};