import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", staggerDelay = 100 } = options;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-reveal-index"));

          if (entry.isIntersecting) {
            const timeout = setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
              timeoutsRef.current.delete(index);
            }, index * staggerDelay);

            timeoutsRef.current.set(index, timeout);
          }
        });
      },
      { threshold, rootMargin },
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      // Очищаем все таймауты
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, [threshold, rootMargin, staggerDelay]);

  const observeElement = useCallback(
    (element: Element | null, index: number) => {
      if (!element || !observerRef.current) return;

      element.setAttribute("data-reveal-index", index.toString());
      observerRef.current.observe(element);
    },
    [],
  );

  const isVisible = useCallback(
    (index: number) => visibleItems.has(index),
    [visibleItems],
  );

  return { observeElement, isVisible };
};
