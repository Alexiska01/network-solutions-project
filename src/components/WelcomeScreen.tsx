import React, { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
  modelsReady?: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, modelsReady = false }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [welcomePhaseComplete, setWelcomePhaseComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Фаза приветствия - фиксированная 10 секунд
  useEffect(() => {
    // Показываем элементы по очереди
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowTitle(true), 1500);
    setTimeout(() => setShowSubtitle(true), 2500);
    
    // Через 10 секунд переходим к фазе ожидания моделей
    setTimeout(() => {
      console.log('🎉 Фаза приветствия завершена (10 сек). Переходим к ожиданию моделей...');
      setWelcomePhaseComplete(true);
    }, 10000);
  }, []);

  // Фаза ожидания моделей - как только все готовы
  useEffect(() => {
    if (welcomePhaseComplete && modelsReady) {
      console.log('🎯 Все модели готовы! Мгновенный переход...');
      
      // Мгновенный переход без анимаций
      onComplete();
    }
  }, [welcomePhaseComplete, modelsReady, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center transition-all duration-[3500ms] ease-in-out ${
      fadeOut 
        ? 'opacity-0 scale-110 blur-sm' 
        : 'opacity-100 scale-100 blur-0'
    }`}>
      {/* Кинематографические фоновые эффекты */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse transition-all duration-[3500ms] ${
          fadeOut ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-[3500ms] ${
          fadeOut ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-400/10 via-transparent to-transparent rounded-full transition-all duration-[3500ms] ${
          fadeOut ? 'scale-200 opacity-0' : 'scale-100 opacity-100'
        }`} />
        
        {/* Дополнительные кинематографические эффекты */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 transition-opacity duration-[3500ms] ${
          fadeOut ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Световые лучи */}
        <div className={`absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-white/20 via-blue-400/30 to-transparent transform -translate-x-1/2 rotate-12 transition-all duration-[3500ms] ${
          fadeOut ? 'opacity-100 scale-y-150' : 'opacity-0 scale-y-0'
        }`} />
        <div className={`absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-white/20 via-purple-400/30 to-transparent transform -translate-x-1/2 -rotate-12 transition-all duration-[3500ms] delay-300 ${
          fadeOut ? 'opacity-100 scale-y-150' : 'opacity-0 scale-y-0'
        }`} />
      </div>

      <div className={`relative z-10 text-center space-y-8 max-w-2xl mx-auto px-8 transition-all duration-[3500ms] ease-out ${
        fadeOut ? 'transform translate-y-[-50px] scale-105 opacity-0' : 'transform translate-y-0 scale-100 opacity-100'
      }`}>
        {/* Логотип с профессиональными эффектами */}
        <div className={`transition-all duration-1000 ease-out ${
          showLogo ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-8 scale-95'
        } ${fadeOut ? 'transform translate-y-[-30px] scale-110' : ''}`}>
          <div className={`w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-[3500ms] ${
            fadeOut ? 'shadow-blue-500/50 shadow-[0_0_60px_rgba(59,130,246,0.5)] transform rotate-12 scale-110' : 'shadow-2xl'
          }`}>
            <div className={`text-white text-4xl font-bold transition-all duration-[3500ms] ${
              fadeOut ? 'transform rotate-[-12deg] scale-90' : ''
            }`}>iD</div>
          </div>
        </div>

        {/* Основной текст с кинематографическими эффектами */}
        <div className={`transition-all duration-1000 ease-out ${
          showTitle ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        } ${fadeOut ? 'transform translate-y-[-20px]' : ''}`}>
          <h1 className={`text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-[3500ms] ${
            fadeOut ? 'text-shadow-lg filter blur-[2px]' : ''
          }`}>
            Добро пожаловать в
            <span className={`bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-[3500ms] ${
              fadeOut ? 'from-white to-blue-200' : ''
            }`}>
              {' '}iDATA
            </span>
          </h1>
        </div>

        {/* Подзаголовок */}
        <div className={`transition-all duration-1000 ease-out ${
          showSubtitle ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        } ${fadeOut ? 'transform translate-y-[-10px]' : ''}`}>
          <p className={`text-xl text-slate-300 leading-relaxed mb-12 transition-all duration-[3500ms] ${
            fadeOut ? 'text-white/80' : ''
          }`}>
            Промышленные сетевые решения нового поколения
          </p>
        </div>

        {/* Профессиональный индикатор загрузки */}
        <div className={`transition-all duration-1000 ease-out ${
          welcomePhaseComplete ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        } ${fadeOut ? 'transform translate-y-[20px] scale-110' : ''}`}>
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Продвинутый спиннер */}
            <div className="relative">
              <div className={`w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 border-r-purple-500 rounded-full animate-spin transition-all duration-[3500ms] ${
                fadeOut ? 'border-white/40 border-t-white border-r-white scale-125' : ''
              }`} />
              <div className={`absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin transition-all duration-[3500ms] ${
                fadeOut ? 'border-t-blue-200 scale-150 opacity-50' : ''
              }`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
            
            {/* Профессиональный текст статуса */}
            <div className="space-y-2">
              <p className={`text-slate-400 text-base font-medium transition-all duration-[3500ms] ${
                fadeOut ? 'text-white text-lg' : ''
              }`}>
                {!welcomePhaseComplete 
                  ? 'Добро пожаловать...' 
                  : modelsReady 
                    ? 'Модели готовы! Переход...' 
                    : 'Ожидание моделей...'
                }
              </p>
              
              {/* Прогресс бар */}
              <div className={`w-64 h-1 bg-slate-700 rounded-full overflow-hidden transition-all duration-[3500ms] ${
                fadeOut ? 'bg-white/20 h-2' : ''
              }`}>
                <div className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ${
                  !welcomePhaseComplete 
                    ? 'w-[70%]' 
                    : modelsReady 
                      ? 'w-full' 
                      : 'w-[85%]'
                } ${fadeOut ? 'bg-gradient-to-r from-white to-blue-200 shadow-[0_0_20px_rgba(255,255,255,0.5)]' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;