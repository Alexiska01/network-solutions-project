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
          // Запускаем каскадную анимацию
          setTimeout(() => {
            const title = element.querySelector('.journey-title');
            if (title) title.classList.add('visible');
          }, 100);
          
          setTimeout(() => {
            const timeline = element.querySelector('.journey-timeline');
            if (timeline) timeline.classList.add('visible');
          }, 300);
          
          setTimeout(() => {
            const line = element.querySelector('.journey-line');
            if (line) line.classList.add('visible');
          }, 600);
          
          setTimeout(() => {
            const steps = element.querySelectorAll('.journey-step');
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('visible');
                // Анимируем внутренние элементы
                const icon = step.querySelector('.journey-step-icon');
                const title = step.querySelector('.journey-step-title');
                const description = step.querySelector('.journey-step-description');
                
                if (icon) icon.classList.add('visible');
                if (title) title.classList.add('visible');
                if (description) description.classList.add('visible');
              }, index * 200);
            });
          }, 900);
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
    '.warranty-card, .service-card, .journey-section'
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