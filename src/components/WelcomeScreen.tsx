import React, { useState, useEffect, useCallback, useRef } from 'react';
import { modelCacheManager } from '@/utils/modelCacheManager';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

interface LoadingStage {
  id: string;
  text: string;
  duration: number;
}

const LOADING_STAGES: LoadingStage[] = [
  { id: 'connect',  text: 'Установление защищённого соединения',            duration: 2500 },
  { id: 'station',  text: 'Подключение к центральной станции управления',   duration: 2500 },
  { id: 'data',     text: 'Получение данных о корпоративном оборудовании',  duration: 2500 },
  { id: 'complete', text: 'Система готова к работе',                        duration: 2500 },
];

const TOTAL_DURATION = 10000;

// Компонент печатающегося текста
const TypewriterText: React.FC<{ 
  text: string; 
  duration: number; 
  onComplete?: () => void;
}> = ({ text, duration, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    let currentIndex = 0;
    const chars = text.split('');
    const charDelay = duration / chars.length;
    
    intervalRef.current = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayText(chars.slice(0, currentIndex + 1).join(''));
        currentIndex++;
      } else {
        setIsComplete(true);
        onComplete?.();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, charDelay);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, duration, onComplete]);
  
  return (
    <span className="ws-tty">
      {displayText}
      <span className={`ws-caret ${isComplete ? 'ws-caret-complete' : ''}`} aria-hidden="true">|</span>
    </span>
  );
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Инициализация
  useEffect(() => {
    const shouldShow = forceShow || modelCacheManager.shouldShowWelcomeScreen();
    console.log('🎯 WelcomeScreen: shouldShow =', shouldShow);
    
    if (!shouldShow) {
      console.log('🚀 WelcomeScreen: Не нужен, вызываем onComplete сразу');
      onComplete?.();
      return;
    }

    setIsVisible(true);
    console.log('✅ WelcomeScreen: Показываем на 10 секунд');

    // Прогресс бар
    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / TOTAL_DURATION, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsAnimating(false);
      }
    };
    updateProgress();

    // Смена стадий
    let acc = 0;
    LOADING_STAGES.forEach((stage, index) => {
      if (index > 0) {
        const timer = setTimeout(() => {
          setCurrentStageIndex(index);
        }, acc);
        timersRef.current.push(timer);
      }
      acc += stage.duration;
    });

    // Завершение
    const completionTimer = setTimeout(() => {
      console.log('⏰ WelcomeScreen: Завершение');
      setIsVisible(false);
      modelCacheManager.markWelcomeScreenComplete();
      onComplete?.();
    }, TOTAL_DURATION);
    timersRef.current.push(completionTimer);

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [forceShow, onComplete]);

  if (!isVisible) {
    return null;
  }

  const currentStage = LOADING_STAGES[currentStageIndex];

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
                style={{
                  transition: isAnimating ? 'none' : 'stroke-dashoffset 0.3s ease',
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
          </div>

          <div className="ws-orbit-glow" aria-hidden="true"></div>
        </div>

        <div className="ws-stage">
          <TypewriterText 
            text={currentStage.text}
            duration={currentStage.duration}
            onComplete={useCallback(() => {
              console.log(`✅ Стадия "${currentStage.text}" завершена`);
            }, [currentStage.text])}
          />
        </div>

        <p className="ws-tagline">Корпоративная сеть нового поколения</p>
      </div>

      <div className="ws-float ws-float-1" aria-hidden="true"></div>
      <div className="ws-float ws-float-2" aria-hidden="true"></div>
    </div>
  );
};

export default WelcomeScreen;