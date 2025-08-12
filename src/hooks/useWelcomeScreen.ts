import { useState, useEffect, useCallback, useRef } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';

interface WelcomeScreenState {
  isVisible: boolean;
  progress: number;
  isAnimating: boolean;
}

interface WelcomeScreenConfig {
  duration: number; // 10000ms
  fadeOutDuration: number; // 400ms
  inactivityThreshold: number; // 1 hour
  tabCloseThreshold: number; // 15 minutes
}

const DEFAULT_CONFIG: WelcomeScreenConfig = {
  duration: 10000,
  fadeOutDuration: 400,
  inactivityThreshold: 60 * 60 * 1000, // 1 час
  tabCloseThreshold: 15 * 60 * 1000, // 15 минут
};

const STORAGE_KEY = 'welcomeScreen_lastShown';
const LAST_ACTIVITY_KEY = 'welcomeScreen_lastActivity';

export const useWelcomeScreen = (config: Partial<WelcomeScreenConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const [state, setState] = useState<WelcomeScreenState>({
    isVisible: false,
    progress: 0,
    isAnimating: false,
  });

  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const isTabVisibleRef = useRef(true);

  // Проверка условий показа экрана через modelCacheManager
  const shouldShowWelcomeScreen = useCallback((): boolean => {
    return modelCacheManager.shouldShowWelcomeScreen();
  }, []);

  // Мастер-таймер анимации
  const runAnimation = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current || !isTabVisibleRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / finalConfig.duration, 1);

      setState(prev => ({
        ...prev,
        progress,
        isAnimating: progress < 1,
      }));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Анимация завершена - начинаем fade out
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            isVisible: false,
          }));
        }, 100);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [finalConfig.duration]);

  // Запуск WelcomeScreen
  const showWelcomeScreen = useCallback(() => {
    console.log('🚀 WelcomeScreen: Запуск анимации');
    
    setState({
      isVisible: true,
      progress: 0,
      isAnimating: true,
    });

    startTimeRef.current = undefined;
    runAnimation();

    // Сохраняем время показа через modelCacheManager
    modelCacheManager.updateActivity();
  }, [runAnimation]);

  // Скрытие WelcomeScreen
  const hideWelcomeScreen = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setState(prev => ({
      ...prev,
      isVisible: false,
      isAnimating: false,
    }));

    startTimeRef.current = undefined;
  }, []);

  // Обработка видимости вкладки
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      isTabVisibleRef.current = isVisible;

      if (isVisible && state.isAnimating) {
        // Возобновляем анимацию
        startTimeRef.current = performance.now() - (state.progress * finalConfig.duration);
        runAnimation();
      } else if (!isVisible && animationFrameRef.current) {
        // Останавливаем анимацию
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [state.isAnimating, state.progress, finalConfig.duration, runAnimation]);

  // Обновление активности пользователя
  const updateActivity = useCallback(() => {
    modelCacheManager.updateActivity();
  }, []);

  // Обработка активности пользователя
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [updateActivity]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Инициализация при монтировании с задержкой для modelCacheManager
  useEffect(() => {
    console.log('🚀 useWelcomeScreen: Инициализация');
    
    const initWelcomeScreen = async () => {
      // Даем время modelCacheManager для инициализации
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const shouldShow = shouldShowWelcomeScreen();
      console.log('🎯 useWelcomeScreen: Нужно показать?', shouldShow);
      
      if (shouldShow) {
        showWelcomeScreen();
      } else {
        updateActivity();
      }
    };
    
    initWelcomeScreen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Запускаем только один раз при монтировании

  return {
    isVisible: state.isVisible,
    progress: state.progress,
    isAnimating: state.isAnimating,
    showWelcomeScreen,
    hideWelcomeScreen,
    updateActivity,
  };
};