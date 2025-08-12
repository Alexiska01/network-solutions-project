import React, { useState, useEffect } from 'react';
import './WelcomeScreen.css';

interface SimpleWelcomeScreenProps {
  onComplete?: () => void;
}

const SimpleWelcomeScreen: React.FC<SimpleWelcomeScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('🚀 SimpleWelcomeScreen: Запуск');
    
    // Простая анимация прогресса
    const startTime = Date.now();
    const duration = 10000; // 10 секунд
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Завершение через 10 секунд
        setTimeout(() => {
          console.log('✅ SimpleWelcomeScreen: Завершение');
          setIsVisible(false);
          onComplete?.();
        }, 500);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="ws-screen fixed inset-0 z-[1000] flex items-center justify-center px-4 sm:px-8">
      <div className="ws-bg" aria-hidden="true"></div>
      <div className="ws-grid" aria-hidden="true"></div>

      <div className="ws-main relative z-10 text-center w-full max-w-sm sm:max-w-2xl">
        <h1 className="ws-title">
          <span className="ws-title-line">Добро пожаловать в&nbsp;</span>
          <span className="ws-brand">iDATA</span>
        </h1>

        <div className="ws-orbit-wrap">
          <div className="ws-ring ws-ring-outer"></div>
          <div className="ws-ring ws-ring-inner"></div>

          <div className="ws-planet">
            <div className="ws-planet-core"></div>
            <div className="ws-planet-glints">
              <span className="ws-glint ws-glint-1"></span>
              <span className="ws-glint ws-glint-2"></span>
            </div>
          </div>

          <div className="ws-satellite-orbit">
            <div className="ws-satellite">
              <span className="ws-panel ws-panel-l"></span>
              <span className="ws-body"></span>
              <span className="ws-panel ws-panel-r"></span>
              <span className="ws-antenna"></span>
            </div>
          </div>

          {/* Круговой прогресс */}
          <div className="ws-progress-ring">
            <svg className="ws-progress-svg" viewBox="0 0 200 200">
              <circle
                className="ws-progress-bg"
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="rgba(34,211,238,0.1)"
                strokeWidth="2"
              />
              <circle
                className="ws-progress-bar"
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 85}`}
                strokeDashoffset={`${2 * Math.PI * 85 * (1 - progress)}`}
                transform="rotate(-90 100 100)"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="ws-stage">
          <span className="ws-tty">
            Инициализация системы...
            <span className="ws-caret">|</span>
          </span>
        </div>

        <p className="ws-tagline">Корпоративная сеть нового поколения</p>
      </div>
    </div>
  );
};

export default SimpleWelcomeScreen;