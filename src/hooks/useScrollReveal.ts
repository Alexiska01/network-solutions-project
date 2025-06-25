import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", staggerDelay = 100 } = options;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<number, Element>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-reveal-index"));
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * staggerDelay);
          }
        });
      },
      { threshold, rootMargin },
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, staggerDelay]);

  const observeElement = (element: Element | null, index: number) => {
    if (!element || !observerRef.current) return;

    // Отключаем наблюдение за старым элементом если он есть
    const oldElement = elementsRef.current.get(index);
    if (oldElement && observerRef.current) {
      observerRef.current.unobserve(oldElement);
    }

    elementsRef.current.set(index, element);
    element.setAttribute("data-reveal-index", index.toString());
    observerRef.current.observe(element);
  };

  const isVisible = (index: number) => visibleItems.has(index);

  return { observeElement, isVisible };
};
