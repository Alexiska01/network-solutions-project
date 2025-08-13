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
    console.log('✅ WelcomeScreen: Показываем на 8 секунд');

    const timer = setTimeout(() => {
      console.log('⏰ WelcomeScreen: Скрываем');
      setIsVisible(false);
      modelCacheManager.markWelcomeScreenComplete();
      onComplete?.();
    }, 8000);

    return () => clearTimeout(timer);
  }, [forceShow, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black overflow-hidden flex items-center justify-center">
      {/* Космический фон со звездами */}
      <div className="absolute inset-0">
        {/* Движущиеся звезды */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out alternate`,
            }}
          />
        ))}
        
        {/* Полосы гиперпространства */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-blue-400/20 to-transparent h-px"
              style={{
                width: '200%',
                left: '-50%',
                top: `${Math.random() * 100}%`,
                transform: 'rotate(-10deg)',
                animation: `hyperspace ${Math.random() * 2 + 1}s infinite linear`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Главный контент */}
      <div className="text-center text-white relative z-10 px-8">
        {/* Логотип в стиле Star Wars */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-wider" 
              style={{ 
                fontFamily: 'serif',
                textShadow: '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
                transform: 'perspective(300px) rotateX(25deg)',
              }}>
            iDATA
          </h1>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8"></div>
        </div>

        {/* Имперская звезда смерти */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Главная сфера */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800 rounded-full border border-gray-500 shadow-2xl">
            {/* Супер лазер */}
            <div className="absolute top-6 right-6 w-6 h-6 bg-red-500 rounded-full shadow-lg shadow-red-500/50">
              <div className="absolute inset-1 bg-red-300 rounded-full animate-pulse"></div>
            </div>
            
            {/* Поверхностные детали */}
            <div className="absolute top-8 left-12 w-16 h-1 bg-gray-700"></div>
            <div className="absolute top-12 left-8 w-20 h-1 bg-gray-700"></div>
            <div className="absolute bottom-16 right-8 w-12 h-1 bg-gray-700"></div>
            <div className="absolute bottom-12 right-12 w-8 h-8 border border-gray-700 rounded"></div>
            
            {/* Вращающиеся кольца энергии */}
            <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-4 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
          </div>
          
          {/* TIE Fighter */}
          <div className="absolute -top-8 -right-8 w-4 h-4">
            <div className="w-3 h-6 bg-gray-600 mx-auto"></div>
            <div className="w-6 h-3 bg-gray-700 -mt-1.5"></div>
            <div className="w-3 h-6 bg-gray-600 mx-auto -mt-1.5"></div>
          </div>
        </div>

        {/* Текст загрузки */}
        <div className="space-y-4">
          <div className="text-2xl font-light text-blue-300 tracking-wide">
            Подключение к Галактической Сети...
          </div>
          
          {/* Прогресс бар в стиле голограммы */}
          <div className="w-80 h-2 mx-auto bg-gray-800 border border-blue-400/50 rounded">
            <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded animate-pulse" 
                 style={{ width: '70%', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}></div>
          </div>
          
          <p className="text-lg text-gray-300 italic">
            "Корпоративная сеть нового поколения"
          </p>
        </div>
      </div>

      {/* CSS для анимаций */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes hyperspace {
          0% { transform: translateX(-100%) rotate(-10deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200vw) rotate(-10deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;