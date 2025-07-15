import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveHero from '@/components/InteractiveHero';

const SoftwarePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <InteractiveHero />
      </main>
      <Footer />
    </div>
  );
};

export default SoftwarePage;