// INTERSECTION OBSERVER ДЛЯ АНИМАЦИЙ КАРТОЧКИ ГАРАНТИИ

export const initWarrantyCardAnimations = () => {
  // Создаем observer для основной карточки
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

  // Создаем observer для элементов внутри карточки
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
  const warrantyCard = document.querySelector('.warranty-card');
  const warrantyIcon = document.querySelector('.warranty-icon');
  const warrantyTitle = document.querySelector('.warranty-title');
  const warrantyFeatures = document.querySelectorAll('.warranty-feature-item');

  // Запускаем наблюдение за карточкой
  if (warrantyCard) {
    cardObserver.observe(warrantyCard);
  }

  // Запускаем наблюдение за внутренними элементами
  if (warrantyIcon) {
    elementsObserver.observe(warrantyIcon);
  }
  
  if (warrantyTitle) {
    elementsObserver.observe(warrantyTitle);
  }

  warrantyFeatures.forEach((feature) => {
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
    document.addEventListener('DOMContentLoaded', initWarrantyCardAnimations);
  } else {
    initWarrantyCardAnimations();
  }
}