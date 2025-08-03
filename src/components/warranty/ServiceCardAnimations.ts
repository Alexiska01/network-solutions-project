// ОПТИМИЗИРОВАННЫЙ INTERSECTION OBSERVER ДЛЯ КАРТОЧЕК СЕРВИСНЫХ ПАКЕТОВ

// Глобальные переменные для предотвращения конфликтов
let serviceCardObserver: IntersectionObserver | null = null;
let serviceElementsObserver: IntersectionObserver | null = null;
let isServiceAnimationInitialized = false;

export const initServiceCardAnimations = () => {
  // Предотвращаем множественную инициализацию
  if (isServiceAnimationInitialized) {
    return () => {
      cleanupServiceAnimations();
    };
  }

  try {
    // Проверяем поддержку Intersection Observer
    if (!window.IntersectionObserver) {
      console.warn('Intersection Observer не поддерживается');
      return () => {};
    }

    // Определяем оптимальные настройки для разных частот обновления
    const getOptimalSettings = () => {
      const refreshRate = (screen as any).refreshRate || 60;
      
      if (refreshRate >= 120) {
        return {
          cardThreshold: 0.08,
          elementThreshold: 0.15,
          cardMargin: '-40px',
          elementMargin: '-20px'
        };
      } else if (refreshRate >= 90) {
        return {
          cardThreshold: 0.1,
          elementThreshold: 0.18,
          cardMargin: '-45px',
          elementMargin: '-25px'
        };
      } else {
        return {
          cardThreshold: 0.12,
          elementThreshold: 0.2,
          cardMargin: '-50px',
          elementMargin: '-30px'
        };
      }
    };

    const settings = getOptimalSettings();

    // Observer для основных карточек с оптимизацией
    serviceCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Используем requestAnimationFrame для плавности
            requestAnimationFrame(() => {
              entry.target.classList.add('visible');
            });
            serviceCardObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: settings.cardThreshold,
        rootMargin: settings.cardMargin
      }
    );

    // Observer для внутренних элементов с батчингом
    serviceElementsObserver = new IntersectionObserver(
      (entries) => {
        // Батчим изменения для лучшей производительности
        const elementsToAnimate: Element[] = [];
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elementsToAnimate.push(entry.target);
            serviceElementsObserver?.unobserve(entry.target);
          }
        });

        if (elementsToAnimate.length > 0) {
          requestAnimationFrame(() => {
            elementsToAnimate.forEach(element => {
              element.classList.add('visible');
            });
          });
        }
      },
      {
        threshold: settings.elementThreshold,
        rootMargin: settings.elementMargin
      }
    );

    // Находим элементы с проверкой существования
    const findElements = () => {
      return {
        serviceCards: Array.from(document.querySelectorAll('.service-card')),
        serviceHeaders: Array.from(document.querySelectorAll('.service-header')),
        serviceIcons: Array.from(document.querySelectorAll('.service-icon')),
        serviceTitles: Array.from(document.querySelectorAll('.service-title')),
        serviceFeatures: Array.from(document.querySelectorAll('.service-feature-item'))
      };
    };

    const elements = findElements();

    // Проверяем наличие элементов
    if (elements.serviceCards.length === 0) {
      console.warn('Service cards не найдены');
      return () => {};
    }

    // Регистрируем элементы для наблюдения
    elements.serviceCards.forEach((card) => {
      serviceCardObserver?.observe(card);
    });

    [
      ...elements.serviceHeaders,
      ...elements.serviceIcons,
      ...elements.serviceTitles,
      ...elements.serviceFeatures
    ].forEach((element) => {
      serviceElementsObserver?.observe(element);
    });

    isServiceAnimationInitialized = true;

    // Функция очистки
    return () => {
      cleanupServiceAnimations();
    };

  } catch (error) {
    console.error('Ошибка инициализации анимаций service cards:', error);
    return () => {};
  }
};

// Функция очистки для предотвращения утечек памяти
const cleanupServiceAnimations = () => {
  if (serviceCardObserver) {
    serviceCardObserver.disconnect();
    serviceCardObserver = null;
  }
  
  if (serviceElementsObserver) {
    serviceElementsObserver.disconnect();
    serviceElementsObserver = null;
  }
  
  isServiceAnimationInitialized = false;
};

// Автоматический запуск с проверками
if (typeof window !== 'undefined') {
  // Проверяем готовность DOM
  const initWhenReady = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Небольшая задержка для уверенности в загрузке стилей
        setTimeout(initServiceCardAnimations, 50);
      });
    } else {
      // DOM уже готов
      setTimeout(initServiceCardAnimations, 50);
    }
  };

  initWhenReady();

  // Очистка при выгрузке страницы
  window.addEventListener('beforeunload', cleanupServiceAnimations);
  window.addEventListener('pagehide', cleanupServiceAnimations);
}

// Экспорт функции очистки для внешнего использования
export const cleanupServiceCardAnimations = cleanupServiceAnimations;