import React, { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Показываем элементы по очереди
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowTitle(true), 1500);
    setTimeout(() => setShowSubtitle(true), 2500);
    setTimeout(() => setShowLoader(true), 3000);
    
    // Начинаем исчезновение на 8.5 секунде
    setTimeout(() => {
      setFadeOut(true);
    }, 8500);
    
    // Завершаем на 10 секунде
    setTimeout(() => {
      onComplete();
    }, 10000);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center transition-opacity duration-1500 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-400/10 via-transparent to-transparent rounded-full" />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto px-8">
        {/* Логотип */}
        <div className={`transition-opacity duration-1000 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="text-white text-4xl font-bold">iD</div>
          </div>
        </div>

        {/* Основной текст */}
        <div className={`transition-opacity duration-1000 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Добро пожаловать в
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}iDATA
            </span>
          </h1>
        </div>

        {/* Подзаголовок */}
        <div className={`transition-opacity duration-1000 ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xl text-slate-300 leading-relaxed mb-12">
            Промышленные сетевые решения нового поколения
          </p>
        </div>

        {/* Стрелочка загрузки */}
        <div className={`transition-opacity duration-1000 ${showLoader ? 'opacity-100' : 'opacity-0'}`}>
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