// src/components/welcome/WelcomeScreen.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
import { modelPreloader } from '@/utils/modelPreloader';
import { useActivityTracker } from '@/hooks/useActivityTracker';
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
  { id: 'station',  text: 'Подключение к центральной станции управления',   duration: 2800 },
  { id: 'data',     text: 'Получение данных о корпоративном оборудовании',  duration: 3200 },
  { id: 'complete', text: 'Система готова к работе',                        duration: 1500 },
];

const TOTAL_DURATION_MS = 10_000 as const;

type Refresh = '60hz' | '90hz' | '120hz' | '144hz' | '240hz';

const TypewriterText = React.memo(({ text, durationMs }: { text: string; durationMs: number }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    setDisplayText('');
    const safe = Math.max(0, durationMs - 250);                       // небольшой буфер
    const step = Math.max(10, Math.floor(safe / Math.max(1, text.length)));
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayText(text.slice(0, i));
      } else {
        clearInterval(timer);
      }
    }, step);
    return () => clearInterval(timer);
  }, [text, durationMs]);

  return (
    <span className="ws-tty">
      {displayText}
      <span className="ws-caret" aria-hidden="true">|</span>
    </span>
  );
});
TypewriterText.displayName = 'TypewriterText';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, forceShow = false }) => {
  const { shouldShowWelcome, markWelcomeAsShown } = useActivityTracker();
  const [isVisible, setIsVisible] = useState(forceShow);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // показывать/скрывать по трекеру
  useEffect(() => {
    if (!forceShow) setIsVisible(shouldShowWelcome);
  }, [shouldShowWelcome, forceShow]);

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

  // последовательная смена стадий, строго по их duration (сумма = 10с)
  useEffect(() => {
    let acc = 0;
    const timers: number[] = [];
    for (let i = 1; i < LOADING_STAGES.length; i++) {
      acc += LOADING_STAGES[i - 1].duration;
      timers.push(window.setTimeout(() => setCurrentStageIndex(i), acc));
    }
    return () => { timers.forEach(clearTimeout); };
  }, []);

  // прогресс по ВРЕМЕНИ: 0..100 за 10с
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let raf = 0;
    let start = performance.now();
    const loop = (now: number) => {
      const elapsed = Math.min(TOTAL_DURATION_MS, now - start);
      setProgress(Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      if (elapsed < TOTAL_DURATION_MS) {
        raf = requestAnimationFrame(loop);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  // завершение строго через 10с (без раннего выхода)
  const finish = useCallback(() => {
    if (!isVisible) return;
    markWelcomeAsShown();
    setIsVisible(false);
    onComplete?.();
  }, [isVisible, markWelcomeAsShown, onComplete]);

  useEffect(() => {
    if (!isVisible) return;
    const endTimer = window.setTimeout(finish, TOTAL_DURATION_MS);
    return () => clearTimeout(endTimer);
  }, [isVisible, finish]);

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

  if (!isVisible) return null;

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

          <div className="ws-progress">
            <div className="ws-progress-percent">{progress}%</div>
            <div className="ws-progress-value" style={{ width: `${progress}%` }} />
          </div>

          <div className="ws-orbit-glow" aria-hidden="true"></div>
        </div>

        <div className="ws-stage">
          <TypewriterText text={currentStage.text} durationMs={currentStage.duration} />
        </div>

        <p className="ws-tagline">Корпоративная сеть нового поколения</p>
      </div>

      <div className="ws-float ws-float-1" aria-hidden="true"></div>
      <div className="ws-float ws-float-2" aria-hidden="true"></div>
    </div>
  );
};

export default WelcomeScreen;
