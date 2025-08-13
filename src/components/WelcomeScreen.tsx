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
    // Проверяем нужно ли показывать WelcomeScreen
    const shouldShow = forceShow || modelCacheManager.shouldShowWelcomeScreen();
    console.log('🎯 WelcomeScreen: shouldShow =', shouldShow);
    
    if (!shouldShow) {
      console.log('🚀 WelcomeScreen: Не нужен, вызываем onComplete сразу');
      onComplete?.();
      return;
    }

    // Показываем WelcomeScreen
    setIsVisible(true);
    console.log('✅ WelcomeScreen: Показываем на 3 секунды');

    // Скрываем через 3 секунды
    const timer = setTimeout(() => {
      console.log('⏰ WelcomeScreen: Время истекло, скрываем');
      setIsVisible(false);
      modelCacheManager.markWelcomeScreenComplete();
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [forceShow, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="ws-screen fixed inset-0 z-[1000] flex items-center justify-center px-4 sm:px-8">
      <div className="ws-bg" aria-hidden="true"></div>
      
      <div className="ws-main relative z-10 text-center w-full max-w-sm sm:max-w-2xl">
        <h1 className="ws-title">
          <span className="ws-title-line">Добро пожаловать в&nbsp;</span>
          <span className="ws-brand">iDATA</span>
        </h1>

        <div className="ws-orbit-wrap">
          <div className="ws-planet">
            <div className="ws-planet-core"></div>
          </div>
        </div>

        <div className="ws-stage">
          <span className="ws-tty">Загрузка системы...</span>
        </div>

        <p className="ws-tagline">Корпоративная сеть нового поколения</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;