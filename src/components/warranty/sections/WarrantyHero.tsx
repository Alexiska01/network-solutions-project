import React, { useEffect, useRef, useState } from 'react';
import '@/components/warranty/WarrantyHero.css';
import Icon from '@/components/ui/icon';

interface WarrantyHeroProps {
  title?: string;
  subtitle?: string;
  modelUrl?: string; // возможность переопределить glb извне позже
}

export const WarrantyHero: React.FC<WarrantyHeroProps> = ({
  title = 'Сервис и Гарантия',
  subtitle = 'Техническая поддержка для непрерывной работы вашего бизнеса',
  modelUrl = ''
}) => {
  const modelRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isMobile || !modelRef.current) return;
    const mv = modelRef.current as any;
    const init = () => {
      mv.cameraOrbit = '0deg 80deg 1.05m';
      mv.fieldOfView = '40deg';
      mv.minCameraOrbit = 'auto auto 1.05m';
      mv.maxCameraOrbit = 'auto auto 1.05m';
      mv.jumpCameraToGoal?.();
    };
    init();
    const t = window.setTimeout(init, 60);
    return () => window.clearTimeout(t);
  }, [isMobile]);

  return (
  <section id="warranty-hero" className="warranty-hero-section warranty-hero-gradient relative overflow-hidden pt-8 sm:pt-9 lg:pt-10 xl:pt-12 pb-6 sm:pb-7 lg:pb-8 xl:pb-8 flex items-center min-h-[200px] sm:min-h-[210px] lg:min-h-[220px]">
      {/* Optional subtle particles (сократили до 3) */}
      <div className="warranty-hero-particles minimal">
        {[0,1,2].map(i => (<div key={i} className="warranty-particle" />))}
      </div>
      <div className="warranty-hero-noise-layer" />
      <div className="warranty-hero-decoration minimal" />

  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="warranty-hero-layout grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left textual column */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-7 max-w-3xl">
            <h1 className="warranty-hero-title warranty-hero-glow-text text-3xl sm:text-5xl md:text-[52px] lg:text-[58px] xl:text-[62px] font-bold leading-[1.02] tracking-tight mb-4">
              {title}
            </h1>
            <p className="warranty-hero-description text-base sm:text-lg md:text-xl lg:text-[19px] font-light text-white/85 max-w-none lg:whitespace-nowrap">
              {subtitle}
            </p>
          </div>

          {/* Right 3D model column */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div className="warranty-hero-model-shell relative">
              {/* Фоновая иконка щита (та же, что в блоке "Гарантия на оборудование") */}
              <div className="warranty-model-bg-icon" aria-hidden="true">
                <Icon name="Shield" className="warranty-model-bg-svg" strokeWidth={1.25} />
              </div>
              <div className="warranty-model-inner">
                <model-viewer
                  ref={modelRef}
                  src={modelUrl}
                  alt="Warranty infrastructure model"
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second={isMobile ? '26deg' : '24deg'}
                  camera-controls={!isMobile}
                  interaction-prompt="none"
                  camera-orbit={isMobile ? '0deg 78deg 0.8m' : '0deg 80deg 0.85m'}
                  min-camera-orbit={isMobile ? 'auto auto 0.8m' : 'auto auto 0.45m'}
                  max-camera-orbit={isMobile ? 'auto auto 0.8m' : 'auto auto 1.0m'}
                  field-of-view={isMobile ? '36deg' : '34deg'}
                  environment-image="neutral"
                  shadow-intensity={isMobile ? '0.18' : '0.25'}
                  exposure="1.05"
                  style={{ width: '100%', height: '100%', background: 'transparent', pointerEvents: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
