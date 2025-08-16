import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { initWarrantyAnimations } from '@/components/warranty/WarrantyAnimation';
import '@/components/warranty/WarrantyHero.css';
import '@/components/warranty/WarrantyCard.css';
import '@/components/warranty/ServiceCard.css';
import '@/components/warranty/JourneyPath.css';
import { WarrantyHero } from '@/components/warranty/sections/WarrantyHero';
import { WarrantyInfoCard } from '@/components/warranty/sections/WarrantyInfoCard';
import { ServicePackagesSection } from '@/components/warranty/sections/ServicePackagesSection';
import { CustomerJourney } from '@/components/warranty/sections/CustomerJourney';

const WarrantyPage: React.FC = () => {
  useEffect(() => {
    // Мгновенно устанавливаем позицию в начало страницы
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const cleanup = initWarrantyAnimations();

    // Отдельная логика для мобильных анимаций
    const initMobileAnimations = () => {
      const mobileSteps = document.querySelectorAll('.journey-timeline.lg\\:hidden .journey-step');
      
      // Активируем анимации с задержками
      mobileSteps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add('visible');
        }, 200 + index * 150);
      });
    };

    // Запускаем мобильные анимации через небольшую задержку
    setTimeout(initMobileAnimations, 500);

    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
  <WarrantyHero />
  <WarrantyInfoCard />
  <ServicePackagesSection />
  <CustomerJourney />

      <Footer />
    </div>
  );
};

export default WarrantyPage;