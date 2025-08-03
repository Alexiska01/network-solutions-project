// АДАПТИВНАЯ СИСТЕМА АНИМАЦИИ КАРТОЧЕК ДЛЯ МОБИЛЬНЫХ И ДЕСКТОПА

interface ResponsiveCardAnimationConfig {
  isMobile: boolean;
  cardRefs: (HTMLElement | null)[];
  onVisibilityChange: (index: number, isVisible: boolean) => void;
  onDesktopVisibilityChange?: (allVisible: boolean) => void;
}

class ResponsiveCardAnimationManager {
  private observers: IntersectionObserver[] = [];
  private isInitialized = false;
  private config: ResponsiveCardAnimationConfig | null = null;

  // Определение мобильного устройства
  private isMobileDevice(): boolean {
    return window.innerWidth < 1024; // lg breakpoint
  }

  // Инициализация системы анимации
  public init(config: ResponsiveCardAnimationConfig): () => void {
    if (this.isInitialized) {
      this.cleanup();
    }

    this.config = config;
    this.isInitialized = true;

    if (config.isMobile) {
      this.initMobileAnimations();
    } else {
      this.initDesktopAnimations();
    }

    return () => this.cleanup();
  }

  // Мобильная логика: индивидуальные наблюдатели
  private initMobileAnimations(): void {
    this.config?.cardRefs.forEach((cardRef, index) => {
      if (!cardRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isVisible = entry.isIntersecting;
            this.config?.onVisibilityChange(index, isVisible);
            
            // После появления можем прекратить наблюдение
            if (isVisible) {
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2, // 20% карточки видно
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      observer.observe(cardRef);
      this.observers.push(observer);
    });
  }

  // Десктопная логика: каскадное появление всех карточек
  private initDesktopAnimations(): void {
    // Находим первую карточку как триггер
    const firstCard = this.config?.cardRefs[0];
    if (!firstCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          
          if (isVisible) {
            // На десктопе показываем все карточки с каскадной задержкой
            this.config?.onDesktopVisibilityChange?.(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    observer.observe(firstCard);
    this.observers.push(observer);
  }

  // Очистка всех наблюдателей
  private cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.isInitialized = false;
    this.config = null;
  }

  // Переключение между мобильной и десктопной логикой
  public switchMode(isMobile: boolean): void {
    if (this.config && this.config.isMobile !== isMobile) {
      this.config.isMobile = isMobile;
      this.cleanup();
      
      if (isMobile) {
        this.initMobileAnimations();
      } else {
        this.initDesktopAnimations();
      }
    }
  }
}

// Глобальный экземпляр менеджера
const cardAnimationManager = new ResponsiveCardAnimationManager();

// Хук для использования в React компонентах
export const useResponsiveCardAnimations = () => {
  return {
    initAnimations: (config: ResponsiveCardAnimationConfig) => {
      return cardAnimationManager.init(config);
    },
    switchMode: (isMobile: boolean) => {
      cardAnimationManager.switchMode(isMobile);
    }
  };
};

// Функция для определения устройства
export const getDeviceType = () => {
  return {
    isMobile: window.innerWidth < 1024,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  };
};

export default cardAnimationManager;