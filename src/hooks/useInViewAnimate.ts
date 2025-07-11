import { useEffect, useRef, useState } from "react";

export const useInViewAnimate = (threshold: number = 0.2) => {
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setInView(true);
          setHasAnimated(true);
          // Задержка перед отключением для iOS
          setTimeout(() => {
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }, 100);
        }
      },
      {
        threshold,
        rootMargin: "-50px", // Менее агрессивный отступ для iOS
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, hasAnimated]);

  return { ref, inView };
};
