import { useEffect, useRef } from "react";

export default function Test3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Создаём звёзды
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'absolute bg-white rounded-full animate-pulse';
      star.style.width = Math.random() * 3 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      containerRef.current.appendChild(star);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-64 bg-black relative overflow-hidden flex items-center justify-center"
    >
      <div className="text-white text-xl font-bold z-10">
        ✨ CSS ЗВЁЗДЫ РАБОТАЮТ! ✨
      </div>
    </div>
  );
}