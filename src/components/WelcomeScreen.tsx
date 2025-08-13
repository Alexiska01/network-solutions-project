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
    <div className="fixed inset-0 z-[1000] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
      {/* Звездный фон */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center text-white relative z-10">
        <h1 className="text-5xl font-bold mb-8">
          Добро пожаловать в{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            iDATA
          </span>
        </h1>

        {/* Планета с орбитой */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Орбита */}
          <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
            {/* Спутник */}
            <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -top-1.5 left-1/2 transform -translate-x-1/2"></div>
          </div>
          
          {/* Планета */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse">
            <div className="absolute top-2 left-2 w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="absolute bottom-3 right-3 w-1 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        <div className="text-xl mb-4 font-light">Загрузка системы...</div>
        <p className="text-lg opacity-70">Корпоративная сеть нового поколения</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;