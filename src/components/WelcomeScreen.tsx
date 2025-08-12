// src/components/welcome/WelcomeScreen.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
import { modelPreloader } from '@/utils/modelPreloader';
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
  { id: 'connect',  text: 'Установление защищённого соединения',            duration: 3000 },
  { id: 'station',  text: 'Подключение к центральной станции управления',   duration: 3200 },
  { id: 'data',     text: 'Получение данных о корпоративном оборудовании',  duration: 2600 },
  { id: 'complete', text: 'Система готова к работе',                        duration: 1200 },
];

const TOTAL_DURATION_MS = 10_000 as const;

type Refresh = '60hz' | '90hz' | '120hz' | '144hz' | '240hz';

const TypewriterText = React.memo(({ text, durationMs, onComplete }: { 
  text: string; 
  durationMs: number; 
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  const typeChar = useCallback((currentTime: number) => {
    if (!startTimeRef.current) return;
    
    const elapsed = currentTime - startTimeRef.current;
    const progress = Math.min(elapsed / durationMs, 1);
    const charIndex = Math.floor(progress * text.length);
    
    setDisplayText(text.slice(0, charIndex));
    
    if (progress < 1) {
      timerRef.current = requestAnimationFrame(typeChar);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [durationMs, text.length, onComplete]);
  
  const startTyping = useCallback(() => {
    startTimeRef.current = performance.now();
    timerRef.current = requestAnimationFrame(typeChar);
  }, [typeChar]);
  
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    startTyping();
    
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [startTyping]);

  return (
    <span className="ws-tty">
      {displayText}
      <span className={`ws-caret ${isComplete ? 'ws-caret-complete' : ''}`} aria-hidden="true">|</span>
    </span>
  );
});
TypewriterText.displayName = 'TypewriterText';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, forceShow = false }) => {
  const { isVisible, progress, isAnimating, hideWelcomeScreen } = useWelcomeScreen();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isScreenVisible, setIsScreenVisible] = useState(forceShow || isVisible);
  const stageTimersRef = useRef<number[]>([]);

  // показывать/скрывать по трекеру
  useEffect(() => {
    if (forceShow) {
      setIsScreenVisible(true);
    } else {
      setIsScreenVisible(isVisible);
    }
  }, [isVisible, forceShow]);

  // список моделей для предзагрузки
  const heroData = useMemo(
    () => [
      { modelUrl: '/models/3530all.glb' },
      { modelUrl: '/models/3730all.glb' },
      { modelUrl: '/models/4530all.glb' },
      { modelUrl: '/models/6010all.glb' },
    ],
    []
  );

  // запускаем предзагрузку в фоне (не влияет на таймлайн 10с)
  useWelcomePreloader(heroData);

  // детект частоты и класс на body
  useEffect(() => {
    let raf = 0, frames = 0, t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      frames++;
      if (frames >= 120) {
        const fps = Math.round((frames * 1000) / (t - t0));
        let rate: Refresh = '60hz';
        if (fps >= 230) rate = '240hz';
        else if (fps >= 140) rate = '144hz';
        else if (fps >= 115) rate = '120hz';
        else if (fps >= 85)  rate = '90hz';
        document.body.classList.forEach((c) => { if (/^refresh-\d+hz$/.test(c)) document.body.classList.remove(c); });
        document.body.classList.add(`refresh-${rate}`);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // последовательная смена стадий, синхронизированная с мастер-таймером
  useEffect(() => {
    if (!isScreenVisible || !isAnimating) return;
    
    let acc = 0;
    stageTimersRef.current.forEach(timer => clearTimeout(timer));
    stageTimersRef.current = [];
    
    for (let i = 1; i < LOADING_STAGES.length; i++) {
      acc += LOADING_STAGES[i - 1].duration;
      const timer = window.setTimeout(() => {
        setCurrentStageIndex(i);
      }, acc);
      stageTimersRef.current.push(timer);
    }
    
    return () => {
      stageTimersRef.current.forEach(timer => clearTimeout(timer));
      stageTimersRef.current = [];
    };
  }, [isScreenVisible, isAnimating]);

  // Прогресс теперь управляется хуком useWelcomeScreen (0 до 1)
  // Используется в SVG stroke-dashoffset

  // Обработка завершения анимации
  useEffect(() => {
    if (!isAnimating && isScreenVisible && !forceShow) {
      // Fade out анимация
      const fadeOutTimer = setTimeout(() => {
        setIsScreenVisible(false);
        hideWelcomeScreen();
        onComplete?.();
      }, 400);
      
      return () => clearTimeout(fadeOutTimer);
    }
  }, [isAnimating, isScreenVisible, forceShow, hideWelcomeScreen, onComplete]);

  // первоначальная невидимая предзагрузка (как у тебя было)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isLowPerf = typeof window !== 'undefined' &&
      (navigator.hardwareConcurrency <= 2 || (navigator as any).deviceMemory <= 2);
    const modelUrls = heroData.map((h) => h.modelUrl);
    const preloadContainer = document.createElement('div');
    preloadContainer.style.cssText =
      'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';
    document.body.appendChild(preloadContainer);

    const maxConcurrent = isMobile || isLowPerf ? 1 : 2;
    const modelsToPreload = isMobile ? modelUrls.slice(0, 2) : modelUrls;

    modelsToPreload.slice(0, maxConcurrent).forEach((url) => {
      const viewer = document.createElement('model-viewer') as any;
      viewer.src = url;
      viewer.loading = 'eager';
      viewer.reveal = 'immediate';
      viewer.style.cssText = 'width:100%;height:100%;max-width:1px;max-height:1px;';
      if (isMobile) {
        viewer.setAttribute('camera-controls', 'false');
        viewer.setAttribute('auto-rotate', 'false');
        viewer.setAttribute('interaction-prompt', 'none');
      }
      viewer.setAttribute('cache-model', 'true');
      preloadContainer.appendChild(viewer);
    });

    modelPreloader.preloadMultiple(modelsToPreload, maxConcurrent);

    const cleanupDelay = isMobile ? 60000 : 30000;
    const cleanup = setTimeout(() => preloadContainer.remove(), cleanupDelay);
    return () => clearTimeout(cleanup);
  }, [heroData]);

  // ОТЛАДКА: принудительное отображение для тестирования
  console.log('🎭 WelcomeScreen: isScreenVisible =', isScreenVisible, 'isVisible =', isVisible, 'forceShow =', forceShow);
  
  if (!isScreenVisible) {
    console.log('❌ WelcomeScreen: Компонент скрыт, не рендерится');
    return null;
  }
  
  console.log('✅ WelcomeScreen: Компонент рендерится!');

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

          {/* Круговой прогресс вокруг Земли */}
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
                  willChange: isAnimating ? 'stroke-dashoffset' : 'auto'
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
            durationMs={currentStage.duration}
            onComplete={useCallback(() => {
              console.log(`✅ WelcomeScreen: Стадия "${currentStage.text}" завершена`);
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