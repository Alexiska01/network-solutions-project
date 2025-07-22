import { useCallback, useEffect, useState } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';

export const useActivityTracker = () => {
  const [isInactive, setIsInactive] = useState(false);
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);

  const shouldShowWelcomeScreen = useCallback(() => {
    // Используем единственную логику из modelCacheManager
    return modelCacheManager.shouldShowWelcomeScreen();
  }, []);

  const markWelcomeAsShown = useCallback(() => {
    // Обновляем активность через modelCacheManager
    modelCacheManager.updateActivity();
    setShouldShowWelcome(false);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    setIsInactive(false);
    
    // Обновляем активность и проверяем, нужно ли показывать welcome screen
    modelCacheManager.updateActivity();
    if (shouldShowWelcomeScreen()) {
      setShouldShowWelcome(true);
    }
  }, [shouldShowWelcomeScreen]);

  useEffect(() => {
    const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 час
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

    // Проверяем при первой загрузке через modelCacheManager
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