// src/components/FilterPanel.tsx
import React, { useState } from 'react';

interface FilterPanelProps {
  series: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ series }) => {
  const [filters, setFilters] = useState({ poe: false, sfp: false });

  const toggle = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center py-6">
      <button
        onClick={() => toggle('poe')}
        className={`px-4 py-2 border rounded-full text-sm transition ${
          filters.poe ? 'bg-green-500 text-white' : 'border-gray-600 text-gray-300'
        }`}
      >
        Только с PoE
      </button>

      <button
        onClick={() => toggle('sfp')}
        className={`px-4 py-2 border rounded-full text-sm transition ${
          filters.sfp ? 'bg-green-500 text-white' : 'border-gray-600 text-gray-300'
        }`}
      >
        Только с SFP
      </button>
    </div>
  );
};

export default FilterPanel;
