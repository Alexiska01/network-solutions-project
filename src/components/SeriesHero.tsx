// src/components/SeriesHero.tsx
import React from 'react';

interface SeriesHeroProps {
  title: string;
  subtitle?: string;
}

const SeriesHero: React.FC<SeriesHeroProps> = ({ title, subtitle }) => {
  return (
    <section className="text-center py-16 md:py-24">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </section>
  );
};

export default SeriesHero;
