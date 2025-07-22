import { useState, useEffect, useCallback } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';

/**
 * Хук для отслеживания активности пользователя и управления показом WelcomeScreen
 */
export const useActivityTracker = () => {
  const [shouldShowWelcome, setShouldShowWelcome] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация при монтировании
  useEffect(() => {
    const initializeTracker = async () => {
      try {
        await modelCacheManager.init();
        const shouldShow = modelCacheManager.shouldShowWelcomeScreen();
        setShouldShowWelcome(shouldShow);
        setIsInitialized(true);
        
        console.log(`🎯 useActivityTracker: Инициализирован, показать welcome: ${shouldShow}`);
      } catch (error) {
        console.warn('⚠️ useActivityTracker: Ошибка инициализации', error);
        setShouldShowWelcome(true);
        setIsInitialized(true);
      }
    };

    initializeTracker();
  }, []);

  // Отслеживание активности пользователя
  useEffect(() => {
    if (!isInitialized) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      modelCacheManager.updateActivity();
    };

    // Добавляем слушатели событий
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Обновляем активность сразу при инициализации
    updateActivity();

    // Периодическое обновление активности (каждые 5 минут)
    const activityInterval = setInterval(updateActivity, 5 * 60 * 1000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
      clearInterval(activityInterval);
    };
  }, [isInitialized]);

  // Отметка о том, что welcome screen был показан
  const markWelcomeAsShown = useCallback(() => {
    console.log('✅ useActivityTracker: WelcomeScreen был показан');
    modelCacheManager.updateActivity();
    setShouldShowWelcome(false);
  }, []);

  // Принудительный показ welcome screen
  const forceShowWelcome = useCallback(() => {
    console.log('🔄 useActivityTracker: Принудительный показ WelcomeScreen');
    setShouldShowWelcome(true);
  }, []);

  // Получение статистики кэша
  const getCacheStats = useCallback(() => {
    return modelCacheManager.getCacheInfo();
  }, []);

  return {
    shouldShowWelcome,
    isInitialized,
    markWelcomeAsShown,
    forceShowWelcome,
    getCacheStats
  };
};