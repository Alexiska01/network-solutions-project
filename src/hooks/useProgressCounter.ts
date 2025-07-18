import { useState, useEffect, useRef, useCallback } from 'react';

interface UseProgressCounterOptions {
  duration: number;
  updateInterval?: number;
  onComplete?: () => void;
}

export const useProgressCounter = ({ 
  duration, 
  updateInterval = 50, 
  onComplete 
}: UseProgressCounterOptions) => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateProgress = useCallback(() => {
    if (!startTimeRef.current) return;
    
    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = Math.min((elapsed / duration) * 100, 100);
    
    // Плавное обновление для мобильных устройств
    const smoothProgress = typeof window !== 'undefined' && window.innerWidth < 768 
      ? Math.round(newProgress * 2) / 2 // Округляем до 0.5 на мобильных
      : newProgress;
    
    setProgress(smoothProgress);
    
    if (smoothProgress >= 100) {
      setIsComplete(true);
      setIsRunning(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [duration, onComplete]);

  const start = useCallback(() => {
    if (isRunning || isComplete) return;
    
    console.log('🚀 Progress Counter: Запуск счетчика на', duration, 'мс');
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setProgress(0);
    setIsComplete(false);
    
    // Используем setInterval для стабильного обновления
    intervalRef.current = setInterval(updateProgress, updateInterval);
  }, [isRunning, isComplete, duration, updateInterval, updateProgress]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsRunning(false);
    console.log('⏹️ Progress Counter: Остановлен на', Math.round(progress), '%');
  }, [progress]);

  const reset = useCallback(() => {
    stop();
    setProgress(0);
    setIsComplete(false);
    startTimeRef.current = null;
    console.log('🔄 Progress Counter: Сброшен');
  }, [stop]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    progress: typeof window !== 'undefined' && window.innerWidth < 768 
      ? Math.round(progress) // Целые числа на мобильных для плавности
      : Math.round(progress * 10) / 10, // Округляем до 1 знака после запятой на десктопе
    isRunning,
    isComplete,
    start,
    stop,
    reset
  };
};