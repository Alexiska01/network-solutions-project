import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWelcomePreloader } from '@/hooks/useWelcomePreloader';
import StarField3D from './StarField3D';

interface WelcomeScreenProps {
  onComplete: () => void;
}

interface LoadingStage {
  id: string;
  text: string;
  duration: number;
}

const LOADING_STAGES: LoadingStage[] = [
  { id: 'connect', text: 'Установление защищённого соединения', duration: 3000 },
  { id: 'station', text: 'Подключение к центральной станции управления', duration: 4000 },
  { id: 'data', text: 'Получение данных о сетевом оборудовании', duration: 5000 },
  { id: 'complete', text: 'Система готова к работе', duration: 2000 }
];

// Компонент 3D спутникового загрузчика
const SatelliteLoader3D: React.FC<{ progress: number }> = ({ progress }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const loadThreeJS = async () => {
      if (window.THREE) {
        init3D();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/three@0.158.0/build/three.min.js';
      script.onload = () => init3D();
      document.head.appendChild(script);
    };

    const init3D = () => {
      if (!window.THREE || !containerRef.current) return;

      const container = containerRef.current;
      const { Scene, PerspectiveCamera, WebGLRenderer, RingGeometry, MeshBasicMaterial, Mesh, SphereGeometry, Group } = window.THREE;

      try {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(128, 128);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Орбитальная траектория
        const orbitGeometry = new RingGeometry(3, 3.1, 32);
        const orbitMaterial = new MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 });
        const orbit = new Mesh(orbitGeometry, orbitMaterial);
        scene.add(orbit);

        // Группа спутника
        const satelliteGroup = new Group();
        
        // Основное тело спутника
        const bodyGeometry = new SphereGeometry(0.2, 8, 6);
        const bodyMaterial = new MeshBasicMaterial({ color: 0x22d3ee });
        const satelliteBody = new Mesh(bodyGeometry, bodyMaterial);
        satelliteGroup.add(satelliteBody);

        // Солнечные панели
        const panelGeometry = new RingGeometry(0.3, 0.5, 4);
        const panelMaterial = new MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.8 });
        const panel1 = new Mesh(panelGeometry, panelMaterial);
        panel1.position.x = -0.6;
        const panel2 = new Mesh(panelGeometry, panelMaterial);
        panel2.position.x = 0.6;
        satelliteGroup.add(panel1);
        satelliteGroup.add(panel2);

        // Позиционируем спутник на орбите
        satelliteGroup.position.x = 3;
        scene.add(satelliteGroup);

        // Центральная станция
        const stationGeometry = new SphereGeometry(0.3, 16, 12);
        const stationMaterial = new MeshBasicMaterial({ color: 0x22d3ee });
        const station = new Mesh(stationGeometry, stationMaterial);
        scene.add(station);

        camera.position.z = 5;

        // Анимация
        const animate = () => {
          requestAnimationFrame(animate);
          
          // Вращение орбиты и спутника
          orbit.rotation.z += 0.01;
          satelliteGroup.rotation.z += 0.01;
          
          // Обновляем позицию спутника по орбите
          const angle = Date.now() * 0.001;
          satelliteGroup.position.x = Math.cos(angle) * 3;
          satelliteGroup.position.y = Math.sin(angle) * 3;
          
          renderer.render(scene, camera);
        };
        animate();

        return () => {
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };
      } catch (error) {
        console.error('❌ Ошибка создания 3D спутника:', error);
      }
    };

    loadThreeJS();
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* 3D контейнер */}
      <div 
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      />
      
      {/* Процент загрузки */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-base font-mono text-cyan-300 font-semibold mt-16"
          key={progress}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  );
};

// Компонент текста с эффектом печати
const TypewriterText: React.FC<{ text: string; onComplete?: () => void }> = ({ 
  text, 
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className="font-mono text-cyan-300">
      {displayedText}
      <motion.span
        className="inline-block w-2 h-5 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const heroData = [
    { modelUrl: 'https://idatascan.ru/models/3530.glb' },
    { modelUrl: 'https://idatascan.ru/models/3730.glb' },
    { modelUrl: 'https://idatascan.ru/models/4530.glb' },
    { modelUrl: 'https://idatascan.ru/models/6010.glb' }
  ];

  const { isWelcomeLoadingComplete, loadingProgress } = useWelcomePreloader(heroData);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentStageIndex < LOADING_STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStageIndex(currentStageIndex + 1);
      }, LOADING_STAGES[currentStageIndex].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStageIndex]);

  useEffect(() => {
    if (isWelcomeLoadingComplete && loadingProgress >= 100) {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [isWelcomeLoadingComplete, loadingProgress, onComplete]);

  const currentStage = LOADING_STAGES[currentStageIndex];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50"
        >
          {/* 3D Звездное поле как фон */}
          <StarField3D className="w-full h-full flex items-center justify-center">
            {/* Тонкая сетка */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Основной контент */}
            <div className="relative z-10 text-center px-8 max-w-2xl">
              {/* Заголовок */}
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl md:text-6xl font-light text-white mb-12"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em' }}
              >
                Добро пожаловать в{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  iDATA
                </motion.span>
              </motion.h1>
              
              {/* 3D Спутниковый загрузчик */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <SatelliteLoader3D progress={loadingProgress} />
              </motion.div>
              
              {/* Статус загрузки */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-lg mb-4 h-8 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TypewriterText text={currentStage.text} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              {/* Подзаголовок */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-gray-400 text-sm font-mono"
              >
                Промышленная сеть нового поколения
              </motion.p>
            </div>
            
            {/* Дополнительные световые эффекты */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </motion.div>
          </StarField3D>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;