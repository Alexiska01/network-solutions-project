/**
 * PREMIUM ANIMATION SYSTEM FOR WARRANTY PAGE
 * World-class performance with sophisticated micro-interactions
 */

export const initWarrantyAnimations = () => {
  // Performance check - bail early if unsupported
  if (!window.IntersectionObserver) {
    console.warn('⚠️ Intersection Observer not supported - animations disabled');
    return () => {};
  }

  const observers: IntersectionObserver[] = [];
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024 && window.innerWidth >= 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Adaptive configuration based on device and user preferences
  const observerConfig = {
    threshold: prefersReducedMotion ? 0.1 : (isMobile ? 0.15 : 0.25),
    rootMargin: prefersReducedMotion ? '0px' : (isMobile ? '-30px' : '-80px')
  };

  // Main intersection observer with performance optimizations
  const observer = new IntersectionObserver((entries) => {
    // Use requestAnimationFrame for smooth animations
    requestAnimationFrame(() => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Add visibility classes
          element.classList.add('visible', 'animate-visible');
          
          // Trigger specific animations based on element type
          if (element.classList.contains('warranty-hero-title') || 
              element.classList.contains('warranty-hero-description')) {
            animateHeroElements(element);
          }
          
          else if (element.classList.contains('warranty-card')) {
            animateWarrantyCard(element);
          }
          
          else if (element.classList.contains('service-section-title') || 
                   element.classList.contains('service-section-subtitle')) {
            // These animate automatically with CSS
          }
          
          else if (element.classList.contains('service-card')) {
            animateServiceCard(element);
          }
          
          else if (element.classList.contains('journey-section')) {
            animateJourneySection(element);
          }
          
          // Stop observing for performance (one-time animations)
          observer.unobserve(element);
        }
      });
    });
  }, observerConfig);

  // Hero elements animation
  const animateHeroElements = (element: HTMLElement) => {
    if (!prefersReducedMotion) {
      element.classList.add('animate');
      
      // Add staggered animation to child elements if any
      const childElements = element.querySelectorAll('[class*="hero"]');
      childElements.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * (isMobile ? 100 : 150));
      });
    }
  };

  // Warranty card animation with internal element orchestration
  const animateWarrantyCard = (card: HTMLElement) => {
    if (prefersReducedMotion) return;

    // Sequential animation of internal elements
    const animationSequence = [
      { selector: '.warranty-header', delay: isMobile ? 200 : 300 },
      { selector: '.warranty-icon', delay: isMobile ? 400 : 500 },
      { selector: '.warranty-title', delay: isMobile ? 600 : 700 },
      { selector: '.warranty-feature-item', delay: isMobile ? 100 : 150, stagger: true }
    ];

    animationSequence.forEach(({ selector, delay, stagger }) => {
      const elements = card.querySelectorAll(selector);
      
      if (stagger) {
        // Staggered animation for multiple items
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay + (index * (isMobile ? 80 : 120)));
        });
      } else {
        // Single element animation
        setTimeout(() => {
          elements.forEach(el => el.classList.add('visible'));
        }, delay);
      }
    });
  };

  // Service card animation with enhanced orchestration
  const animateServiceCard = (card: HTMLElement) => {
    if (prefersReducedMotion) return;

    const animationSequence = [
      { selector: '.service-header', delay: isMobile ? 250 : 400 },
      { selector: '.service-icon', delay: isMobile ? 450 : 600 },
      { selector: '.service-title', delay: isMobile ? 650 : 800 },
      { selector: '.service-feature-item', delay: isMobile ? 150 : 200, stagger: true }
    ];

    animationSequence.forEach(({ selector, delay, stagger }) => {
      const elements = card.querySelectorAll(selector);
      
      if (stagger) {
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay + (index * (isMobile ? 100 : 150)));
        });
      } else {
        setTimeout(() => {
          elements.forEach(el => el.classList.add('visible'));
        }, delay);
      }
    });
  };

  // Journey section with sophisticated timeline animation
  const animateJourneySection = (section: HTMLElement) => {
    const title = section.querySelector('.journey-title');
    const timeline = section.querySelector('.journey-timeline');
    const line = section.querySelector('.journey-line');
    const steps = section.querySelectorAll('.journey-step');

    // Animate title first
    setTimeout(() => {
      title?.classList.add('visible');
    }, isMobile ? 100 : 200);

    // Then timeline container
    setTimeout(() => {
      timeline?.classList.add('visible');
    }, isMobile ? 300 : 400);

    // Animate connection line
    setTimeout(() => {
      line?.classList.add('visible');
    }, isMobile ? 500 : 800);

    // Finally, animate steps with stagger
    steps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add('visible');
        
        // Animate internal step elements
        setTimeout(() => {
          step.querySelector('.journey-step-icon')?.classList.add('visible');
        }, isMobile ? 200 : 300);
        
        setTimeout(() => {
          step.querySelector('.journey-step-title')?.classList.add('visible');
        }, isMobile ? 400 : 500);
        
        setTimeout(() => {
          step.querySelector('.journey-step-description')?.classList.add('visible');
        }, isMobile ? 600 : 700);
        
      }, (isMobile ? 800 : 1200) + (index * (isMobile ? 150 : 200)));
    });
  };

  // Find all elements to animate
  const elementsToAnimate = document.querySelectorAll(`
    .warranty-hero-title,
    .warranty-hero-description,
    .warranty-card,
    .service-section-title,
    .service-section-subtitle,
    .service-card,
    .journey-section
  `);

  // Start observing all elements
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  observers.push(observer);

  // Performance monitoring (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎬 Warranty animations initialized for ${elementsToAnimate.length} elements`);
    console.log(`📱 Device: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`);
    console.log(`♿ Reduced motion: ${prefersReducedMotion ? 'Yes' : 'No'}`);
  }

  // Cleanup function
  return () => {
    observers.forEach(obs => obs.disconnect());
    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 Warranty animations cleaned up');
    }
  };
};

// Auto-initialize when DOM is ready (with error handling)
if (typeof window !== 'undefined') {
  const initWhenReady = () => {
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          // Small delay to ensure styles are loaded
          requestAnimationFrame(() => {
            setTimeout(initWarrantyAnimations, 100);
          });
        });
      } else {
        // DOM already loaded
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