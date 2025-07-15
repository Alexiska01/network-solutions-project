import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Cylinder3DProps {
  currentSeries: {
    id: string;
    color: string;
  };
}

const Cylinder3D: React.FC<Cylinder3DProps> = ({ currentSeries }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cylinderRef = useRef<THREE.Mesh>();
  const textMeshRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Создаем сцену
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Прозрачный фон
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Создаем геометрию цилиндра
    const cylinderGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32);
    
    // Создаем материал с градиентом
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    // Создаем цилиндр
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    scene.add(cylinder);
    cylinderRef.current = cylinder;

    // Наклоняем цилиндр
    cylinder.rotation.x = -0.2;

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Создаем текстуру для текста
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;

    if (context) {
      // Очищаем canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Настраиваем текст
      context.fillStyle = '#ffffff';
      context.font = 'bold 60px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Добавляем тень
      context.shadowColor = 'rgba(99, 102, 241, 0.8)';
      context.shadowBlur = 20;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      
      // Рисуем текст
      context.fillText(currentSeries.id, canvas.width / 2, canvas.height / 2);
    }

    // Создаем текстуру из canvas
    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.needsUpdate = true;

    // Создаем плоскость для текста
    const textGeometry = new THREE.PlaneGeometry(3, 1.5);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      side: THREE.DoubleSide
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 1.6; // Размещаем на поверхности цилиндра
    scene.add(textMesh);
    textMeshRef.current = textMesh;

    // Анимация вращения
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Вращаем цилиндр и текст синхронно
      if (cylinderRef.current && textMeshRef.current) {
        cylinderRef.current.rotation.y += 0.02; // 360° за ~3 секунды
        textMeshRef.current.rotation.y += 0.02;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Обработчик изменения размера
    const handleResize = () => {
      if (mountRef.current && rendererRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Очистка при размонтировании
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      cylinderGeometry.dispose();
      cylinderMaterial.dispose();
      textGeometry.dispose();
      textMaterial.dispose();
      textTexture.dispose();
    };
  }, []);

  // Обновляем текст при смене серии
  useEffect(() => {
    if (!textMeshRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;

    if (context) {
      // Очищаем canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Определяем цвет на основе серии
      let textColor = '#ffffff';
      if (currentSeries.color.includes('blue')) textColor = '#60a5fa';
      if (currentSeries.color.includes('purple')) textColor = '#a855f7';
      if (currentSeries.color.includes('emerald')) textColor = '#34d399';
      
      // Настраиваем текст
      context.fillStyle = textColor;
      context.font = 'bold 60px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Добавляем тень
      context.shadowColor = textColor;
      context.shadowBlur = 20;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      
      // Рисуем текст
      context.fillText(currentSeries.id, canvas.width / 2, canvas.height / 2);
    }

    // Обновляем текстуру
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.needsUpdate = true;
    
    if (textMeshRef.current.material instanceof THREE.MeshBasicMaterial) {
      textMeshRef.current.material.map = newTexture;
      textMeshRef.current.material.needsUpdate = true;
    }

    // Обновляем цвет цилиндра
    if (cylinderRef.current && cylinderRef.current.material instanceof THREE.MeshPhongMaterial) {
      let cylinderColor = 0x6366f1;
      if (currentSeries.color.includes('blue')) cylinderColor = 0x3b82f6;
      if (currentSeries.color.includes('purple')) cylinderColor = 0x8b5cf6;
      if (currentSeries.color.includes('emerald')) cylinderColor = 0x10b981;
      
      cylinderRef.current.material.color.setHex(cylinderColor);
    }
  }, [currentSeries]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
};

export default Cylinder3D;