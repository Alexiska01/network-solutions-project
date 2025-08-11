/**
 * ЕДИНАЯ ОПТИМИЗИРОВАННАЯ СИСТЕМА АНИМАЦИЙ ДЛЯ WARRANTY PAGE
 * Без конфликтов и дублирования
 */

export const initWarrantyAnimations = () => {
  // Проверяем поддержку Intersection Observer
  if (!window.IntersectionObserver) {
    console.warn('Intersection Observer не поддерживается');
    return () => {};
  }

  const observers: IntersectionObserver[] = [];
  const isMobile = window.innerWidth < 768;

  // Конфигурация наблюдателя
  const observerConfig = {
    threshold: isMobile ? 0.1 : 0.2,
    rootMargin: isMobile ? '-20px' : '-50px'
  };

  // Создаем единый наблюдатель для всех элементов
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Добавляем класс visible
        element.classList.add('visible', 'animate-visible');
        
        // Анимируем внутренние элементы для карточек
        if (element.classList.contains('warranty-card') || element.classList.contains('service-card')) {
          animateCardElements(element);
        }
        
        // Анимируем элементы пути клиента
        if (element.classList.contains('journey-section')) {
          // Основные элементы
          element.querySelectorAll('.journey-title, .journey-timeline, .journey-step, .journey-line').forEach(el => {
            el.classList.add('visible');
          });
          
          // Внутренние элементы шагов
          element.querySelectorAll('.journey-step-icon, .journey-step-title, .journey-step-description').forEach(el => {
            el.classList.add('visible');
          });
        }
        
        // Прекращаем наблюдение за элементом
        observer.unobserve(element);
      }
    });
  }, observerConfig);

  // Функция анимации внутренних элементов карточки
  const animateCardElements = (card: Element) => {
    const elements = card.querySelectorAll(
      '.warranty-header, .warranty-icon, .warranty-title, .warranty-feature-item, ' +
      '.service-header, .service-icon, .service-title, .service-feature-item'
    );
    
    elements.forEach((el, index) => {
      // Добавляем задержку для поэтапного появления
      setTimeout(() => {
        el.classList.add('visible');
      }, index * (isMobile ? 80 : 120));
    });
  };



  // Находим все элементы для анимации
  const elementsToAnimate = document.querySelectorAll(
    '.warranty-card, .service-card, .journey-section, .service-section-title, .service-section-subtitle'
  );

  // Запускаем наблюдение
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  observers.push(observer);

  // Функция очистки
  return () => {
    observers.forEach(obs => obs.disconnect());
  };
};

// Автоматический запуск при загрузке DOM
if (typeof window !== 'undefined') {
  const initWhenReady = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initWarrantyAnimations, 100);
      });
    } else {
      setTimeout(initWarrantyAnimations, 100);
    }
  };

  initWhenReady();
}