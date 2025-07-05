// src/components/SeriesCatalog3530.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import VantaBackground from '@/components/VantaBackground';
import SeriesHero from '@/components/SeriesHero';
import FeatureIcons from '@/components/FeatureIcons';
import FilterPanel from '@/components/FilterPanel';
import ComparisonBar from '@/components/ComparisonBar';

const models = [
  { name: 'IDS3530-24P-6X', poe: true, sfp: true, desc: '24×1G Base-T, 6×10G SFP+, PoE 380 Вт', link: '/products/switches/ids3530/24p-6x' },
  { name: 'IDS3530-48P-6X', poe: true, sfp: true, desc: '48×1G Base-T, 6×10G SFP+, PoE 760 Вт', link: '/models/ids3530-48p-6x.html' },
  { name: 'IDS3530-24S-8T-6X', poe: false, sfp: true, desc: '24×1G SFP, 8×1G Base-T, 6×10G SFP+', link: '/models/ids3530-24s-8t-6x.html' },
  { name: 'IDS3530-48T-6X', poe: false, sfp: true, desc: '48×1G Base-T, 6×10G SFP+', link: '/models/ids3530-48t-6x.html' }
];

const SeriesCatalog3530: React.FC = () => {
  const [filters, setFilters] = useState({ poe: false, sfp: false });
  const filteredModels = models.filter(m => (!filters.poe || m.poe) && (!filters.sfp || m.sfp));

  return (
    <div className="overflow-x-hidden">
      {/* HERO WITH VANTA */}
      <section className="relative h-[600px] text-white overflow-hidden">
        {/* фон */}
        <div className="absolute inset-0 -z-10">
          <VantaBackground effect="net" />
        </div>
        {/* контент */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <SeriesHero
            title={<>IDS3530 — надёжные L2+/L3-коммутаторы<br />для промышленной инфраструктуры</>}
            subtitle="До 760 Вт PoE+, модульные блоки питания, uplink 10G — всё в одной платформе"
          />
          <FeatureIcons
            features={[
              { icon: 'zap',    label: 'PoE до 880 Вт' },
              { icon: 'network',label: '10G uplink (SFP+)' },
              { icon: 'fan',    label: 'Надёжное охлаждение' },
              { icon: 'shield', label: 'Поддержка L3' }
            ]}
          />
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
      </section>

      {/* MODELS */}
      <section className="bg-white py-16 px-6 text-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Модели серии IDS3530</h2>
            <p className="text-lg text-gray-600">Выберите оптимальную конфигурацию для ваших задач</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredModels.map((model, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                <p className="text-gray-600 mb-4">{model.desc}</p>
                <Button
                  className="w-full bg-brand-primary hover:bg-gradient-hero text-white"
                  onClick={() => (window.location.href = model.link)}
                >
                  <Icon name="Info" className="mr-2" />Подробнее
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <ComparisonBar />
    </div>
  );
};

export default SeriesCatalog3530;
