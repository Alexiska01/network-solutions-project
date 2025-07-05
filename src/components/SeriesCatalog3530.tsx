// src/components/SeriesCatalog3530.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import BenefitCard from '@/components/BenefitCard';
import VantaBackground from '@/components/VantaBackground';
import SeriesHero from '@/components/SeriesHero';
import FeatureIcons from '@/components/FeatureIcons';
import FilterPanel from '@/components/FilterPanel';
import ComparisonBar from '@/components/ComparisonBar';

const models = [
  {
    name: 'IDS3530-24P-6X',
    poe: true,
    sfp: true,
    desc: '24×1G Base-T, 6×10G SFP+, PoE 380 Вт',
    link: '/products/switches/ids3530/24p-6x'
  },
  {
    name: 'IDS3530-48P-6X',
    poe: true,
    sfp: true,
    desc: '48×1G Base-T, 6×10G SFP+, PoE 760 Вт',
    link: '/models/ids3530-48p-6x.html'
  },
  {
    name: 'IDS3530-24S-8T-6X',
    poe: false,
    sfp: true,
    desc: '24×1G SFP, 8×1G Base-T, 6×10G SFP+',
    link: '/models/ids3530-24s-8t-6x.html'
  },
  {
    name: 'IDS3530-48T-6X',
    poe: false,
    sfp: true,
    desc: '48×1G Base-T, 6×10G SFP+',
    link: '/models/ids3530-48t-6x.html'
  }
];

const SeriesCatalog3530 = () => {
  const [filters, setFilters] = useState({ poe: false, sfp: false });

  const filteredModels = models.filter((model) => {
    if (filters.poe && !model.poe) return false;
    if (filters.sfp && !model.sfp) return false;
    return true;
  });

  return (
    <div className="relative text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10">
        <SeriesHero
          title="IDS3530 — надёжные L2+/L3-коммутаторы для промышленной инфраструктуры"
          subtitle="До 760 Вт PoE+, модульные блоки питания, uplink 10G — всё в одной платформе"
        />
        <FeatureIcons
          features={[
            { icon: 'zap', label: 'PoE до 880 Вт' },
            { icon: 'network', label: '10G uplink (SFP+)' },
            { icon: 'fan', label: 'Надёжное охлаждение' },
            { icon: 'shield', label: 'Поддержка L3' }
          ]}
        />
        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>

      {/* Vanta Background */}
      <div className="absolute inset-0 -z-10">
        <VantaBackground effect="net" />
      </div>

      {/* Product Models */}
      <section className="bg-white py-16 px-6 text-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Модели серии IDS3530
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Выберите оптимальную конфигурацию для ваших задач
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredModels.map((model, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition duration-300 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-gray-600 mb-4">{model.desc}</p>
                <Button
                  className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition duration-300"
                  onClick={() => (window.location.href = model.link)}
                >
                  <Icon name="Info" className="mr-2" />
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Panel */}
      <ComparisonBar />

      {/* Footer Placeholder */}
      <footer />
    </div>
  );
};

export default SeriesCatalog3530;
