import React, { useState, useEffect } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

// Стадии загрузки
const LOADING_STAGES = [
  'Установление защищённого соединения',
  'Подключение к центральной станции управления',
  'Получение данных о корпоративном оборудовании',
  'Система готова к работе'
];

// Компонент печатающегося текста с автозавершением
const TypewriterText: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentText = LOADING_STAGES[stageIndex] || '';
    
    if (isTyping) {
      // Печатаем символ за символом
      if (displayText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 60);
      } else {
        // Напечатали полностью
        if (stageIndex === LOADING_STAGES.length - 1) {
          // Последняя строка "Система готова к работе" - ждём 2 секунды и завершаем
          timeoutId = setTimeout(() => {
            onComplete();
          }, 2000);
        } else {
          // Обычная строка - пауза перед стиранием
          timeoutId = setTimeout(() => {
            setIsTyping(false);
          }, 1000);
        }
      }
    } else {
      // Стираем символ за символом
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 30);
      } else {
        // Стерли полностью, переходим к следующей стадии
        setStageIndex(prev => prev + 1);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, stageIndex, onComplete]);

  return (
    <span className="font-mono text-cyan-300 tracking-wide">
      {displayText}
      <span className="animate-pulse text-cyan-400">_</span>
    </span>
  );
};

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
    console.log('✅ WelcomeScreen: Показываем автоматически');
  }, [forceShow, onComplete]);

  const handleComplete = () => {
    console.log('⏰ WelcomeScreen: Автозавершение');
    setIsVisible(false);
    modelCacheManager.markWelcomeScreenComplete();
    onComplete?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black overflow-hidden flex items-center justify-center">
      {/* Живой космический фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Дальние звезды - медленно мерцают */}
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={`far-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 3}s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Средние звезды - движутся медленно */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={`mid-${i}`}
            className="absolute bg-cyan-200 rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out alternate, float ${Math.random() * 20 + 15}s infinite linear`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Близкие звезды - быстро мерцают */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`near-${i}`}
            className="absolute bg-blue-300 rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.9 + 0.1,
              animation: `twinkle ${Math.random() * 2 + 1}s infinite ease-in-out alternate, drift ${Math.random() * 30 + 20}s infinite linear`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Космические туманности */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`nebula-${i}`}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              background: `radial-gradient(circle, ${
                ['rgba(59, 130, 246, 0.1)', 'rgba(147, 51, 234, 0.1)', 'rgba(34, 211, 238, 0.1)', 'rgba(168, 85, 247, 0.1)'][i % 4]
              } 0%, transparent 70%)`,
              animation: `nebula ${Math.random() * 40 + 30}s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Падающие звезды */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`,
              animation: `meteor ${Math.random() * 3 + 2}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Космическая пыль */}
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute bg-gray-400 rounded-full opacity-20"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `dust ${Math.random() * 50 + 30}s infinite linear`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800 rounded-full border border-gray-500 shadow-2xl animate-pulse" style={{ animationDuration: '4s' }}>
            {/* Супер лазер */}
            <div className="absolute top-6 right-6 w-6 h-6 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-ping" style={{ animationDuration: '2s' }}>
              <div className="absolute inset-1 bg-red-300 rounded-full animate-pulse"></div>
            </div>
            
            {/* Поверхностные детали с анимацией */}
            <div className="absolute top-8 left-12 w-16 h-1 bg-gray-700 opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-12 left-8 w-20 h-1 bg-gray-700 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-16 right-8 w-12 h-1 bg-gray-700 opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-12 right-12 w-8 h-8 border border-gray-700 rounded animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Вращающиеся кольца энергии */}
            <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin" style={{ animationDuration: '6s' }}></div>
            <div className="absolute inset-4 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-8 border border-purple-400/15 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
          </div>
          
          {/* TIE Fighter на орбите */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 animate-bounce" style={{ animationDuration: '1.5s' }}>
              <div className="w-2 h-4 bg-gray-600 mx-auto shadow-lg"></div>
              <div className="w-4 h-2 bg-gray-700 -mt-1 shadow-lg"></div>
              <div className="w-2 h-4 bg-gray-600 mx-auto -mt-1 shadow-lg"></div>
            </div>
          </div>
          
          {/* Второй TIE Fighter на противоположной орбите */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-3 animate-pulse">
              <div className="w-1.5 h-3 bg-gray-500 mx-auto shadow-md"></div>
              <div className="w-3 h-1.5 bg-gray-600 -mt-0.5 shadow-md"></div>
              <div className="w-1.5 h-3 bg-gray-500 mx-auto -mt-0.5 shadow-md"></div>
            </div>
          </div>
        </div>

        {/* Печатающийся текст загрузки */}
        <div className="space-y-8">
          <div className="text-xl text-cyan-300 tracking-wide min-h-[60px] flex items-center justify-center">
            <TypewriterText onComplete={handleComplete} />
          </div>
          
          <p className="text-lg text-gray-300 italic opacity-80">
            "Корпоративная сеть нового поколения"
          </p>
        </div>
      </div>

      {/* CSS для космических анимаций */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(2px, -3px); }
          50% { transform: translate(-1px, -5px); }
          75% { transform: translate(-3px, -2px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(5px, -8px) rotate(120deg); }
          66% { transform: translate(-3px, 5px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes nebula {
          0%, 100% { opacity: 0.05; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.15; transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes meteor {
          0% { opacity: 0; transform: translateX(-100px) translateY(-100px) scale(0); }
          10% { opacity: 1; transform: translateX(-50px) translateY(-50px) scale(1); }
          90% { opacity: 1; transform: translateX(100vw) translateY(100vh) scale(1); }
          100% { opacity: 0; transform: translateX(100vw) translateY(100vh) scale(0); }
        }
        
        @keyframes dust {
          0% { transform: translate(0, 0); opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { transform: translate(20px, -30px); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;