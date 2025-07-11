import { useEffect, useRef, useState } from "react";

export const useInViewAnimate = (threshold: number = 0.2) => {
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Определяем мобильное устройство
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    // Fallback для старых браузеров
    if (!window.IntersectionObserver) {
      setInView(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          // На мобильных позволяем повторные анимации
          if (!hasAnimated) {
            setInView(false);
          }
        }
      },
      {
        threshold: Math.max(threshold, 0.1), // Минимум 0.1 для мобильных
        rootMargin: isMobile ? "-20px 0px -20px 0px" : "-50px 0px -50px 0px", // Меньше отступ на мобильных
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    } else {
      // Резервный вариант - показать сразу
      setTimeout(() => {
        if (!hasAnimated) {
          setInView(true);
          setHasAnimated(true);
        }
      }, 100);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, hasAnimated, isMobile]);

  return { ref, inView };
};
