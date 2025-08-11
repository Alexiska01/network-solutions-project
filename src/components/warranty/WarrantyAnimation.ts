/**
 * PREMIUM ANIMATION SYSTEM FOR WARRANTY PAGE
 * Auto-triggering animations with sophisticated timing
 */

export const initWarrantyAnimations = () => {
  // Performance check
  if (!window.IntersectionObserver) {
    console.warn('⚠️ Intersection Observer not supported - animations disabled');
    return () => {};
  }

  const observers: IntersectionObserver[] = [];
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero elements auto-start after page load
  const initHeroAnimations = () => {
    const heroTitle = document.querySelector('.warranty-hero-title');
    const heroDescription = document.querySelector('.warranty-hero-description');
    
    if (heroTitle) {
      setTimeout(() => {
        heroTitle.classList.add('visible', 'animate');
      }, 300);
    }
    
    if (heroDescription) {
      setTimeout(() => {
        heroDescription.classList.add('visible', 'animate');
      }, 800);
    }
  };

  // Observer configuration
  const observerConfig = {
    threshold: prefersReducedMotion ? 0.1 : (isMobile ? 0.15 : 0.25),
    rootMargin: prefersReducedMotion ? '0px' : (isMobile ? '-30px' : '-80px')
  };

  // Main observer
  const observer = new IntersectionObserver((entries) => {
    requestAnimationFrame(() => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          element.classList.add('visible', 'animate-visible');
          
          // Warranty Card Animation
          if (element.classList.contains('warranty-card')) {
            setTimeout(() => element.querySelector('.warranty-header')?.classList.add('visible'), 300);
            setTimeout(() => element.querySelector('.warranty-icon')?.classList.add('visible'), 500);
            setTimeout(() => element.querySelector('.warranty-title')?.classList.add('visible'), 700);
            
            const features = element.querySelectorAll('.warranty-feature-item');
            features.forEach((feat, index) => {
              setTimeout(() => feat.classList.add('visible'), 900 + (index * 120));
            });
          }
          
          // Service Section Headers
          else if (element.classList.contains('service-section-title') || 
                   element.classList.contains('service-section-subtitle')) {
            // Auto-animate with CSS
          }
          
          // Service Cards Animation
          else if (element.classList.contains('service-card')) {
            setTimeout(() => element.querySelector('.service-header')?.classList.add('visible'), 400);
            setTimeout(() => element.querySelector('.service-icon')?.classList.add('visible'), 600);
            setTimeout(() => element.querySelector('.service-title')?.classList.add('visible'), 800);
            
            const features = element.querySelectorAll('.service-feature-item');
            features.forEach((feat, index) => {
              setTimeout(() => feat.classList.add('visible'), 1000 + (index * 150));
            });
          }
          
          // Journey Section
          else if (
            element.classList.contains('journey-section') ||
            element.classList.contains('journey-timeline') ||
            element.classList.contains('journey-timeline-mobile')
          ) {
            const container = element.classList.contains('journey-section')
              ? element
              : element.closest('.journey-section');
            if (!container) return;

            const title = container.querySelector('.journey-title');
            const line = container.querySelector('.journey-line');
            const steps = container.querySelectorAll('.journey-step');

            // Анимируем оба таймлайна, если они есть
            const timelines = container.querySelectorAll('.journey-timeline, .journey-timeline-mobile');

            setTimeout(() => title?.classList.add('visible'), 200);
            timelines.forEach((tl) => {
              setTimeout(() => (tl as HTMLElement).classList.add('visible'), 400);
            });
            setTimeout(() => line?.classList.add('visible'), 800);

            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('visible');
                setTimeout(() => step.querySelector('.journey-step-icon')?.classList.add('visible'), 300);
                setTimeout(() => step.querySelector('.journey-step-title')?.classList.add('visible'), 500);
                setTimeout(() => step.querySelector('.journey-step-description')?.classList.add('visible'), 700);
              }, 1200 + (index * 200));
            });
          }
          
          observer.unobserve(element);
        }
      });
    });
  }, observerConfig);

  // Find elements to animate
  const elementsToAnimate = document.querySelectorAll(`
    .warranty-card,
    .service-section-title,
    .service-section-subtitle,
    .service-card,
    .journey-section,
    .journey-timeline,
    .journey-timeline-mobile
  `);

  
  // Start observing
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  observers.push(observer);

  // Initialize hero animations immediately
  setTimeout(initHeroAnimations, 100);

  // Cleanup function
  return () => {
    observers.forEach(obs => obs.disconnect());
  };
};

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  const initWhenReady = () => {
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          requestAnimationFrame(() => {
            setTimeout(initWarrantyAnimations, 100);
          });
        });
      } else {
        requestAnimationFrame(() => {
          setTimeout(initWarrantyAnimations, 100);
        });
      }
    } catch (error) {
      console.warn('🚨 Error initializing warranty animations:', error);
    }
  };

  initWhenReady();
}