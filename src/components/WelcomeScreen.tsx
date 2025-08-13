import React, { useState, useEffect } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

// Стадии загрузки
const LOADING_STAGES = [
  'Установление защищённого соединения...',
  'Подключение к центральной станции управления...',
  'Получение данных о корпоративном оборудовании...',
  'Система готова к работе'
];

// Компонент печатающегося текста
const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

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

    // Прогресс анимация
    const startTime = Date.now();
    const duration = 8000;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();

    // Смена стадий каждые 2 секунды
    const stageInterval = setInterval(() => {
      setCurrentStage(prev => (prev + 1) % LOADING_STAGES.length);
    }, 2000);

    const timer = setTimeout(() => {
      console.log('⏰ WelcomeScreen: Скрываем');
      setIsVisible(false);
      modelCacheManager.markWelcomeScreenComplete();
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(stageInterval);
    };
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
        {/* Логотип в стиле Star Wars с нашими цветами */}
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

        {/* Центральная планета с прогресс-кольцом */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Прогресс кольцо */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(34,211,238,0.1)"
              strokeWidth="3"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress)}`}
              style={{
                transition: 'stroke-dashoffset 0.3s ease',
                filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))'
              }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Главная планета */}
          <div className="absolute inset-8 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-full border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/30">
            {/* Энергетическое ядро */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/70">
              <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
            </div>
            
            {/* Детали поверхности */}
            <div className="absolute top-4 left-6 w-12 h-1 bg-cyan-300/40 rounded"></div>
            <div className="absolute top-8 left-4 w-16 h-1 bg-blue-300/40 rounded"></div>
            <div className="absolute bottom-6 right-4 w-10 h-1 bg-purple-300/40 rounded"></div>
            <div className="absolute bottom-4 right-8 w-6 h-6 border border-cyan-300/40 rounded"></div>
            
            {/* Вращающиеся энергетические кольца */}
            <div className="absolute inset-0 border-2 border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-4 border border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
          </div>
          
          {/* Спутник/корабль */}
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded transform rotate-45 shadow-lg shadow-cyan-400/50">
            <div className="absolute inset-1 bg-white/60 rounded"></div>
          </div>
        </div>

        {/* Печатающийся текст загрузки */}
        <div className="space-y-6">
          <div className="text-xl text-cyan-300 tracking-wide min-h-[60px] flex items-center justify-center">
            <TypewriterText text={LOADING_STAGES[currentStage]} speed={80} />
          </div>
          
          {/* Прогресс в процентах */}
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {Math.round(progress * 100)}%
          </div>
          
          <p className="text-lg text-gray-300 italic opacity-80">
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