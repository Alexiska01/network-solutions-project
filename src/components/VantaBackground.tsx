// src/components/VantaBackground.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

interface VantaBackgroundProps {
  effect?: 'net' | 'waves' | 'fog';
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({ effect = 'net' }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00ffaa,
          backgroundColor: 0x000000,
          points: 10.0,
          maxDistance: 20.0,
          spacing: 15.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default VantaBackground;
