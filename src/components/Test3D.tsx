import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function Test3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!containerRef.current) return;

    const loadThreeJS = async () => {
      try {
        // Загружаем Three.js динамически
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/three@0.158.0/build/three.min.js';
        
        script.onload = () => {
          console.log('✅ Three.js загружен');
          initThree();
        };
        
        script.onerror = () => {
          console.error('❌ Ошибка загрузки Three.js');
          setStatus('error');
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('❌ Ошибка:', error);
        setStatus('error');
      }
    };

    const initThree = () => {
      if (!window.THREE || !containerRef.current) return;

      const container = containerRef.current;
      const { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshStandardMaterial, Mesh, AmbientLight } = window.THREE;

      try {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000);
        container.appendChild(renderer.domElement);

        const light = new AmbientLight(0xffffff, 0.5);
        scene.add(light);

        // Звёзды
        const starsGeometry = new window.THREE.BufferGeometry();
        const starsMaterial = new window.THREE.PointsMaterial({ color: 0xffffff, size: 2 });
        
        const starsVertices = [];
        for (let i = 0; i < 1000; i++) {
          const x = (Math.random() - 0.5) * 2000;
          const y = (Math.random() - 0.5) * 2000;
          const z = (Math.random() - 0.5) * 2000;
          starsVertices.push(x, y, z);
        }
        
        starsGeometry.setAttribute('position', new window.THREE.Float32BufferAttribute(starsVertices, 3));
        const stars = new window.THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        // Куб
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshStandardMaterial({ color: 0xff1493 });
        const cube = new Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        animate();

        setStatus('success');
        console.log('🚀 Three.js работает!');
      } catch (error) {
        console.error('❌ Ошибка инициализации:', error);
        setStatus('error');
      }
    };

    loadThreeJS();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-64 bg-black border-4 border-green-400 flex items-center justify-center"
    >
      {status === 'loading' && (
        <div className="text-white">🔄 Загружаю Three.js...</div>
      )}
      {status === 'error' && (
        <div className="text-red-500">❌ Ошибка загрузки 3D</div>
      )}
    </div>
  );
}