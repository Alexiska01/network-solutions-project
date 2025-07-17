import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

export default function Test3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !window.THREE) {
      console.error('Three.js not loaded');
      return;
    }

    const container = containerRef.current;
    const { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshStandardMaterial, Mesh, AmbientLight } = window.THREE;

    // Создаём сцену
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000);
    container.appendChild(renderer.domElement);

    // Освещение
    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);

    // Куб
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 0xff1493 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;

    // Анимация
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    console.log('🚀 Vanilla Three.js работает!');

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-64 bg-black border-4 border-green-400"
    />
  );
}