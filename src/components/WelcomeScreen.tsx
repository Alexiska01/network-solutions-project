import { useEffect, useState, useRef, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

const LOADING_PHASES = [
  { text: "Инициализация защищенного соединения...", duration: 3000 },
  { text: "Загрузка данных сетевого оборудования...", duration: 4000 },
  { text: "Подключение к системе управления...", duration: 3500 },
  { text: "Подготовка интерфейса...", duration: 2500 },
  { text: "Система готова к работе", duration: 2000 }
];

const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

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

// Безопасный компонент звёзд гиперпространства
function HyperspaceStars({ count = 800, isHyperspace = false }: { count?: number; isHyperspace?: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  // Создаём массивы позиций один раз
  const [positions] = useState(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        Math.random() * -200 - 50
      ]);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const speed = isHyperspace ? 80 : 1;
    
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i];
      
      if (isHyperspace) {
        // Движение к камере
        positions[i][2] += delta * speed;
        
        // Перезапуск сзади
        if (positions[i][2] > 20) {
          positions[i][2] = -200;
          positions[i][0] = (Math.random() - 0.5) * 200;
          positions[i][1] = (Math.random() - 0.5) * 200;
        }
      } else {
        // Медленное вращение
        const time = state.clock.elapsedTime * 0.1;
        const radius = Math.sqrt(x * x + y * y);
        if (radius > 0) {
          positions[i][0] = radius * Math.cos(time + i * 0.01);
          positions[i][1] = radius * Math.sin(time + i * 0.01);
        }
      }

      // Обновляем матрицу
      dummy.current.position.set(...positions[i]);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color={isHyperspace ? "#ffffff" : "#64b5f6"} />
    </instancedMesh>
  );
}

// Простой спутник
function Satellite({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = (progress / 100) * Math.PI * 2;
    }
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={satelliteRef} position={[15, 0, 0]}>
        {/* Основной корпус */}
        <mesh>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="#777777" />
        </mesh>
        
        {/* Солнечные панели */}
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[0.1, 3, 2]} />
          <meshStandardMaterial color="#1a237e" />
        </mesh>
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[0.1, 3, 2]} />
          <meshStandardMaterial color="#1a237e" />
        </mesh>
        
        {/* Антенна */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      
      {/* Орбита */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14.5, 15.5, 64]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Космические объекты
function SpaceObjects() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 2.1) * 80,
            Math.sin(i * 2.8) * 40,
            Math.sin(i * 1.3) * 60
          ]}
        >
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="#00d4ff" emissive="#003366" />
        </mesh>
      ))}
    </group>
  );
}

// 3D сцена с обработкой ошибок
function SpaceScene({ progress, isHyperspace }: { progress: number; isHyperspace: boolean }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          {/* Освещение */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.2} color="#6366f1" />
          
          {/* Звёзды */}
          <HyperspaceStars count={800} isHyperspace={isHyperspace} />
          
          {!isHyperspace && (
            <>
              <Stars radius={300} depth={50} count={3000} factor={3} saturation={0} />
              <SpaceObjects />
              <Satellite progress={progress} />
            </>
          )}

          {/* Туманности */}
          <mesh position={[50, 30, -100]} scale={[20, 20, 20]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#4a148c" 
              transparent 
              opacity={0.1} 
            />
          </mesh>
          
          <mesh position={[-60, -40, -120]} scale={[25, 25, 25]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color="#01579b" 
              transparent 
              opacity={0.1} 
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Fallback простой фон
const SimpleFallback = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
    {Array.from({ length: 100 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: Math.random() * 4 + 2,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHyperspace, setIsHyperspace] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [use3D, setUse3D] = useState(false); // Временно отключаем 3D

  // Обработка ошибок 3D
  useEffect(() => {
    const handleError = () => {
      console.log("3D fallback активирован");
      setUse3D(false);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    // Симуляция прогресса
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / 150);
      });
    }, 100);

    // Смена фаз
    const phaseTimer = setTimeout(() => {
      if (currentPhase < LOADING_PHASES.length - 1) {
        setCurrentPhase(prev => prev + 1);
      }
    }, LOADING_PHASES[currentPhase]?.duration || 2000);

    // Гиперпространство на 85%
    if (progress > 85 && !isHyperspace) {
      setIsHyperspace(true);
    }

    // Завершение через 15 секунд
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setShowFlash(true);
      
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 800);
    }, 15000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimer);
      clearTimeout(completeTimer);
    };
  }, [currentPhase, onComplete, progress, isHyperspace]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* 3D сцена или fallback */}
          {use3D ? <SpaceScene progress={progress} isHyperspace={isHyperspace} /> : <SimpleFallback />}

          {/* Эффект гиперпространства */}
          {isHyperspace && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: Math.random() * 200 + 50,
                    height: 2,
                    transformOrigin: 'left center',
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Финальная вспышка */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white"
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* UI контент */}
          <div className="relative z-10 text-center px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ 
                opacity: isHyperspace ? 0.7 : 1, 
                y: 0,
                scale: isHyperspace ? 0.9 : 1
              }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-7xl font-thin text-white mb-6">
                Добро пожаловать в{" "}
                <motion.span
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  iDATA
                </motion.span>
              </h1>
              <p className="text-xl text-slate-300 font-light">
                Корпоративная сеть нового поколения
              </p>
            </motion.div>

            {/* Прогресс-бар */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHyperspace ? 0.5 : 1, 
                scale: isHyperspace ? 0.8 : 1 
              }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8 relative"
            >
              <div className="relative w-80 h-3 bg-slate-800/50 rounded-full mx-auto mb-4 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
              <div className="text-sm font-mono text-cyan-300">
                {Math.round(progress)}%
              </div>
            </motion.div>

            {/* Статус */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHyperspace ? 0.6 : 1, 
                y: 0 
              }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="h-12 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <TypewriterText text={LOADING_PHASES[currentPhase]?.text || ""} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Индикаторы фаз */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isHyperspace ? 0.4 : 1 
              }}
              transition={{ delay: 2 }}
              className="flex justify-center gap-2 mt-8"
            >
              {LOADING_PHASES.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index <= currentPhase 
                      ? 'w-8 bg-cyan-400' 
                      : 'w-4 bg-slate-600'
                  }`}
                  animate={{
                    scale: index === currentPhase ? 1.2 : 1,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}