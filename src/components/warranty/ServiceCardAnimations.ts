// INTERSECTION OBSERVER ДЛЯ АНИМАЦИЙ КАРТОЧЕК СЕРВИСНЫХ ПАКЕТОВ

export const initServiceCardAnimations = () => {
  // Создаем observer для основных карточек
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '-50px'
    }
  );

  // Создаем observer для элементов внутри карточек
  const elementsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          elementsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '-30px'
    }
  );

  // Находим элементы для анимации
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceHeaders = document.querySelectorAll('.service-header');
  const serviceIcons = document.querySelectorAll('.service-icon');
  const serviceTitles = document.querySelectorAll('.service-title');
  const serviceFeatures = document.querySelectorAll('.service-feature-item');

  // Запускаем наблюдение за карточками
  serviceCards.forEach((card) => {
    cardObserver.observe(card);
  });

  // Запускаем наблюдение за внутренними элементами
  serviceHeaders.forEach((header) => {
    elementsObserver.observe(header);
  });
  
  serviceIcons.forEach((icon) => {
    elementsObserver.observe(icon);
  });
  
  serviceTitles.forEach((title) => {
    elementsObserver.observe(title);
  });

  serviceFeatures.forEach((feature) => {
    elementsObserver.observe(feature);
  });

  // Возвращаем функцию для очистки observers
  return () => {
    cardObserver.disconnect();
    elementsObserver.disconnect();
  };
};

// Автоматический запуск при загрузке DOM
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceCardAnimations);
  } else {
    initServiceCardAnimations();
  }
}