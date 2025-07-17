import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

interface StarField3DProps {
  className?: string;
  children?: React.ReactNode;
}

export default function StarField3D({ className = "", children }: StarField3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [is3DReady, setIs3DReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadThreeJS = async () => {
      // Проверяем, уже ли загружен Three.js
      if (window.THREE) {
        init3D();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/three@0.158.0/build/three.min.js';
      
      script.onload = () => {
        console.log('✨ Three.js готов для звёзд');
        init3D();
      };
      
      script.onerror = () => {
        console.error('❌ Ошибка загрузки Three.js');
      };
      
      document.head.appendChild(script);
    };

    const init3D = () => {
      if (!window.THREE || !containerRef.current) return;

      const container = containerRef.current;
      const { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute } = window.THREE;

      try {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        const renderer = new WebGLRenderer({ 
          antialias: true, 
          alpha: true 
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Создаём звёзды
        const starsGeometry = new BufferGeometry();
        const starsMaterial = new PointsMaterial({ 
          color: 0xffffff, 
          size: 1.5,
          sizeAttenuation: true
        });
        
        const starsVertices = [];
        for (let i = 0; i < 2000; i++) {
          const x = (Math.random() - 0.5) * 2000;
          const y = (Math.random() - 0.5) * 2000;
          const z = (Math.random() - 0.5) * 2000;
          starsVertices.push(x, y, z);
        }
        
        starsGeometry.setAttribute('position', new Float32BufferAttribute(starsVertices, 3));
        const stars = new Points(starsGeometry, starsMaterial);
        scene.add(stars);

        camera.position.z = 1;

        // Анимация звёзд
        const animate = () => {
          requestAnimationFrame(animate);
          
          // Медленное вращение звёзд
          stars.rotation.x += 0.0005;
          stars.rotation.y += 0.0005;
          
          renderer.render(scene, camera);
        };
        animate();

        // Обработка изменения размера
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        setIs3DReady(true);
        console.log('🌟 Звёздное поле активировано!');

        return () => {
          window.removeEventListener('resize', handleResize);
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };
      } catch (error) {
        console.error('❌ Ошибка создания звёзд:', error);
      }
    };

    loadThreeJS();
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* 3D фон со звёздами */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, #1a1a3a 0%, #000 100%)'
        }}
      />
      
      {/* Контент поверх звёзд */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}