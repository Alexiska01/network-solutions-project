import React, { useState, useEffect } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const shouldShow = forceShow || modelCacheManager.shouldShowWelcomeScreen();
    console.log('🎯 WelcomeScreen: shouldShow =', shouldShow);
    
    if (!shouldShow) {
      console.log('🚀 WelcomeScreen: Не нужен, вызываем onComplete сразу');
      onComplete?.();
      return;
    }

    setIsVisible(true);
    console.log('✅ WelcomeScreen: Показываем на 5 секунд');

    const timer = setTimeout(() => {
      console.log('⏰ WelcomeScreen: Скрываем');
      setIsVisible(false);
      modelCacheManager.markWelcomeScreenComplete();
      onComplete?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [forceShow, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Добро пожаловать в <span className="text-cyan-400">iDATA</span>
        </h1>
        <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg opacity-80">Корпоративная сеть нового поколения</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;