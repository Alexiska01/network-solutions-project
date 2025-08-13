import React, { useState, useEffect } from 'react';
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
    if (forceShow) {
      setIsVisible(true);
    }
  }, [forceShow]);

  const handleComplete = () => {
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black overflow-hidden flex items-center justify-center">
      {/* Живой космический фон */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Простые яркие звезды */}
        {Array.from({ length: 100 }).map((_, i) => {
          const size = (i % 3) + 1;
          const x = (i * 7.43) % 100;
          const y = (i * 13.57) % 100;
          return (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                animationDuration: `${(i % 3) + 2}s`,
                animationDelay: `${(i % 5) * 0.5}s`,
              }}
            />
          );
        })}

        {/* Цветные звезды */}
        {Array.from({ length: 50 }).map((_, i) => {
          const colors = ['bg-blue-300', 'bg-cyan-300', 'bg-purple-300', 'bg-pink-300'];
          const x = (i * 11.73) % 100;
          const y = (i * 23.17) % 100;
          return (
            <div
              key={`colored-${i}`}
              className={`absolute ${colors[i % 4]} rounded-full animate-pulse`}
              style={{
                width: '2px',
                height: '2px',
                left: `${x}%`,
                top: `${y}%`,
                animationDuration: `${(i % 4) + 3}s`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}

        {/* Туманности */}
        {Array.from({ length: 5 }).map((_, i) => {
          const x = (i * 37.43) % 80;
          const y = (i * 47.57) % 80;
          const colors = [
            'bg-blue-500/10',
            'bg-purple-500/10', 
            'bg-cyan-500/10',
            'bg-pink-500/10',
            'bg-indigo-500/10'
          ];
          return (
            <div
              key={`nebula-${i}`}
              className={`absolute ${colors[i]} rounded-full blur-xl animate-pulse`}
              style={{
                width: `${100 + i * 20}px`,
                height: `${100 + i * 20}px`,
                left: `${x}%`,
                top: `${y}%`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          );
        })}
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
          
          <p className="text-lg text-gray-300 italic opacity-80 animate-pulse">
            Корпоративная сеть нового поколения
          </p>
        </div>
      </div>

      {/* CSS анимации */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;