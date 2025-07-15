import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stages = [
      { delay: 500, stage: 1 },  // Показываем логотип
      { delay: 1500, stage: 2 }, // Показываем текст
      { delay: 3000, stage: 3 }, // Показываем подзаголовок - все тексты появились
      { delay: 9000, stage: 4 }, // Начинаем исчезновение
      { delay: 10000, stage: 5 } // Завершаем ровно через 10 секунд
    ];

    const timeouts = stages.map(({ delay, stage }) =>
      setTimeout(() => {
        if (stage === 4) {
          setIsVisible(false);
        } else if (stage === 5) {
          onComplete();
        } else {
          setStage(stage);
        }
      }, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center transition-all duration-1500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-400/10 via-transparent to-transparent rounded-full" />
        
        {/* Анимированные точки */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto px-8">
        {/* Логотип */}
        <div className={`transition-all duration-1000 ${
          stage >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}>
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="text-white text-4xl font-bold">iD</div>
          </div>
        </div>

        {/* Основной текст */}
        <div className={`transition-all duration-1000 delay-500 ${
          stage >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Добро пожаловать в
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}iDATA
            </span>
          </h1>
        </div>

        {/* Подзаголовок */}
        <div className={`transition-all duration-1000 delay-1000 ${
          stage >= 3 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}>
          <p className="text-xl text-slate-300 leading-relaxed mb-12">
            Промышленные сетевые решения нового поколения
          </p>
        </div>

        {/* Стрелочка загрузки - появляется после всех текстов и крутится до конца */}
        <div className={`transition-all duration-1000 delay-1500 ${
          stage >= 3 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Загрузка системы...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;