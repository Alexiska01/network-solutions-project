import { useCallback, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", staggerDelay = 0 } = options;
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set(),
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observeElement = useCallback(
    (element: Element | null, index?: number) => {
      if (!element) return;

      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const elementIndex = parseInt(
                entry.target.getAttribute("data-index") || "0",
              );

              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisibleElements(
                    (prev) => new Set([...prev, elementIndex]),
                  );
                }, elementIndex * staggerDelay);
              }
            });
          },
          { threshold, rootMargin },
        );
      }

      if (typeof index !== "undefined") {
        element.setAttribute("data-index", index.toString());
      }

      observerRef.current.observe(element);
    },
    [threshold, rootMargin, staggerDelay],
  );

  const isVisible = useCallback(
    (index: number) => {
      return visibleElements.has(index);
    },
    [visibleElements],
  );

  return { observeElement, isVisible };
};
