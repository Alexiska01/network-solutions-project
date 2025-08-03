// УПРОЩЕННАЯ СИСТЕМА АНИМАЦИИ БЕЗ КОНФЛИКТОВ

export const initSimpleCardAnimations = () => {
  // Проверяем поддержку Intersection Observer
  if (!window.IntersectionObserver) {
    console.warn('Intersection Observer не поддерживается');
    return () => {};
  }

  const isMobile = window.innerWidth < 1024;
  const observers: IntersectionObserver[] = [];

  if (isMobile) {
    // МОБИЛЬНАЯ ЛОГИКА: индивидуальные наблюдатели
    const cards = document.querySelectorAll('.warranty-card, .service-card, .journey-step');
    
    cards.forEach((card) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-visible', 'visible');
              
              // Анимируем внутренние элементы
              const elements = entry.target.querySelectorAll('.warranty-header, .warranty-icon, .warranty-title, .warranty-feature-item, .journey-icon, .journey-title, .journey-description');
              elements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add('visible');
                }, index * 100);
              });
              
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '-50px'
        }
      );

      observer.observe(card);
      observers.push(observer);
    });
  } else {
    // ДЕСКТОПНАЯ ЛОГИКА: каскадное появление
    const cards = document.querySelectorAll('.warranty-card, .service-card, .journey-step');
    const firstCard = cards[0];
    
    if (firstCard) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Показываем все карточки с задержками
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-visible', 'visible');
                  
                  // Анимируем внутренние элементы
                  const elements = card.querySelectorAll('.warranty-header, .warranty-icon, .warranty-title, .warranty-feature-item, .journey-icon, .journey-title, .journey-description');
                  elements.forEach((el, elIndex) => {
                    setTimeout(() => {
                      el.classList.add('visible');
                    }, elIndex * 100);
                  });
                  
                  // Анимируем линию для пути клиента
                  const journeyLine = document.querySelector('.journey-line');
                  if (journeyLine) {
                    setTimeout(() => {
                      journeyLine.classList.add('visible');
                    }, 500);
                  }
                }, index * 150);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '-100px'
        }
      );

      observer.observe(firstCard);
      observers.push(observer);
    }
  }

  // Функция очистки
  return () => {
    observers.forEach(observer => observer.disconnect());
  };
};

// Автоматический запуск
if (typeof window !== 'undefined') {
  const initWhenReady = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSimpleCardAnimations, 100);
      });
    } else {
      setTimeout(initSimpleCardAnimations, 100);
    }
  };

  initWhenReady();
}