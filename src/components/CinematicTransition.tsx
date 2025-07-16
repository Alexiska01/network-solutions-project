import React from 'react';

interface CinematicTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

const CinematicTransition: React.FC<CinematicTransitionProps> = ({ isActive, onComplete }) => {
  React.useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, 3500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Кинематографические световые лучи */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Первый луч света */}
        <div 
          className="absolute top-0 w-2 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent transform rotate-12"
          style={{
            left: '-100px',
            animation: 'lightSweepAcross 2s ease-in-out 0.5s forwards',
          }}
        />
        
        {/* Второй луч света */}
        <div 
          className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/80 to-transparent transform -rotate-12"
          style={{
            right: '-100px',
            animation: 'lightSweepAcross 2s ease-in-out 1s forwards',
            animationDirection: 'reverse'
          }}
        />

        {/* Третий луч (золотистый) */}
        <div 
          className="absolute top-0 w-3 h-full bg-gradient-to-b from-transparent via-yellow-300/40 to-transparent transform rotate-6"
          style={{
            left: '50%',
            transform: 'translateX(-50%) rotate(6deg)',
            animation: 'centerLightExpand 1.5s ease-out 1.5s forwards',
          }}
        />
      </div>

      {/* Радиальная вспышка от центра */}
      <div 
        className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{
          animation: 'radialBurstEffect 2.5s ease-out 1.8s forwards',
        }}
      />

      {/* Частицы света */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              top: `${20 + i * 5}%`,
              left: `${10 + i * 7}%`,
              animation: `particleFloat 3s ease-out ${0.5 + i * 0.1}s forwards`,
            }}
          />
        ))}
      </div>

      {/* Финальное затемнение */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"
        style={{
          animation: 'finalFadeOut 1s ease-in 2.5s forwards',
        }}
      />

      <style jsx>{`
        @keyframes lightSweepAcross {
          0% {
            transform: translateX(-200px) rotate(12deg);
            opacity: 0;
            filter: blur(0px);
          }
          30% {
            opacity: 1;
            filter: blur(0px);
          }
          70% {
            opacity: 0.8;
            filter: blur(1px);
          }
          100% {
            transform: translateX(calc(100vw + 200px)) rotate(12deg);
            opacity: 0;
            filter: blur(3px);
          }
        }

        @keyframes centerLightExpand {
          0% {
            width: 3px;
            opacity: 0;
          }
          50% {
            width: 8px;
            opacity: 1;
          }
          100% {
            width: 20px;
            opacity: 0;
          }
        }

        @keyframes radialBurstEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          20% {
            width: 100px;
            height: 100px;
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            width: 400px;
            height: 400px;
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1.5);
          }
          80% {
            width: 1200px;
            height: 1200px;
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(2);
          }
          100% {
            width: 2400px;
            height: 2400px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(3);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          30% {
            transform: translateY(-50px) scale(1);
            opacity: 1;
          }
          70% {
            transform: translateY(-120px) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-200px) scale(0);
            opacity: 0;
          }
        }

        @keyframes finalFadeOut {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CinematicTransition;