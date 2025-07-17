import React, { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
  modelsReady?: boolean;
  loadingProgress?: number;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, modelsReady = false, loadingProgress = 0 }) => {
  const [showContent, setShowContent] = useState(false);

  // Показываем контент сразу
  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Простая логика - ждем 3 секунды или загрузку моделей
  useEffect(() => {
    // Минимальный показ 3 секунды
    const minTimeout = setTimeout(() => {
      if (modelsReady) {
        console.log('🎉 Модели готовы, переходим');
        onComplete();
      }
    }, 3000);

    // Если модели готовы раньше 3 секунд
    if (modelsReady) {
      clearTimeout(minTimeout);
      setTimeout(() => {
        console.log('🎉 Модели готовы, переходим');
        onComplete();
      }, 3000);
    }

    return () => clearTimeout(minTimeout);
  }, [modelsReady, onComplete]);

  // Принудительный переход через 8 секунд
  useEffect(() => {
    const forceTimeout = setTimeout(() => {
      console.log('🚨 Принудительный переход через 8 секунд');
      onComplete();
    }, 8000);

    return () => clearTimeout(forceTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className={`relative z-10 text-center space-y-8 max-w-2xl mx-auto px-8 transition-all duration-1000 ${
        showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {/* Логотип */}
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="text-white text-4xl font-bold">iD</div>
        </div>

        {/* Основной текст */}
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
          Добро пожаловать в
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {' '}iDATA
          </span>
        </h1>

        {/* Подзаголовок */}
        <p className="text-xl text-slate-300 leading-relaxed mb-12">
          Промышленные сетевые решения нового поколения
        </p>

        {/* Простой спиннер */}
        <div className="w-16 h-16 mx-auto border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        
        <p className="text-slate-400 text-base font-medium">
          {modelsReady ? 'Готово! Переход...' : 'Загрузка...'}
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;