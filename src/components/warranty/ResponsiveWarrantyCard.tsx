import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useResponsiveCardAnimations, getDeviceType } from './ResponsiveCardAnimations';

interface ResponsiveWarrantyCardProps {
  title: string;
  features: Array<{
    title: string;
    desc: string;
  }>;
  gradientFrom: string;
  gradientTo: string;
  iconName: string;
  index?: number;
}

const ResponsiveWarrantyCard: React.FC<ResponsiveWarrantyCardProps> = ({
  title,
  features,
  gradientFrom,
  gradientTo,
  iconName,
  index = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const { initAnimations } = useResponsiveCardAnimations();

  // Определение типа устройства
  useEffect(() => {
    const updateDeviceType = () => {
      const device = getDeviceType();
      setIsMobile(device.isMobile);
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  // Инициализация анимаций
  useEffect(() => {
    if (!cardRef.current) return;

    const cleanup = initAnimations({
      isMobile,
      cardRefs: [cardRef.current],
      onVisibilityChange: (cardIndex, visible) => {
        if (isMobile) {
          setIsVisible(visible);
        }
      },
      onDesktopVisibilityChange: (allVisible) => {
        if (!isMobile) {
          setIsVisible(allVisible);
        }
      }
    });

    return cleanup;
  }, [isMobile, initAnimations]);

  // CSS классы для анимации
  const getCardClasses = () => {
    const baseClasses = "warranty-card bg-white relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl border border-gray-100 transition-all duration-500 ease-out";
    
    if (isMobile) {
      // Мобильная логика: индивидуальное появление без задержки
      return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`;
    } else {
      // Десктопная логика: каскадное появление с задержкой
      const delay = index * 150; // 150ms между карточками
      return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`;
    }
  };

  const getAnimationStyle = () => {
    if (isMobile) {
      return {
        transitionDelay: '0ms' // Без задержки на мобильных
      };
    } else {
      return {
        transitionDelay: `${index * 150}ms` // Каскадная задержка на десктопе
      };
    }
  };

  return (
    <div 
      ref={cardRef}
      className={getCardClasses()}
      style={getAnimationStyle()}
    >
      {/* Градиентная обводка */}
      <div 
        className="absolute inset-0 rounded-xl sm:rounded-2xl p-[2px] -z-10"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`
        }}
      >
        <div className="h-full w-full rounded-xl sm:rounded-2xl bg-white"></div>
      </div>
      
      {/* Заголовок с иконкой */}
      <div className="warranty-header flex items-center gap-4 mb-4 sm:mb-6 lg:mb-8">
        {/* Иконка */}
        <div className="warranty-icon flex-shrink-0">
          <div 
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
            }}
          >
            <Icon name={iconName as any} size={24} className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
          </div>
        </div>
        
        {/* Заголовок */}
        <h3 className="warranty-title text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 text-left lg:text-center flex-1 lg:flex-none">
          {title}
        </h3>
      </div>
      
      {/* Список функций */}
      <div className="space-y-3 sm:space-y-4">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className={`warranty-feature-item flex gap-4 items-start transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isMobile ? '0ms' : `${(index * 150) + (featureIndex * 50)}ms`
            }}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`
              }}
            >
              <Icon name="Check" size={14} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">{feature.title}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{feature.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveWarrantyCard;