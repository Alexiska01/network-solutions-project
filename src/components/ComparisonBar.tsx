// src/components/ComparisonBar.tsx
import React, { useState } from 'react';

const ComparisonBar: React.FC = () => {
  const [models, setModels] = useState<string[]>([]); // placeholder

  if (models.length < 2) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-4 z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-sm text-white">
          Вы выбрали {models.length} модели для сравнения
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded"
        >
          Сравнить
        </button>
      </div>
    </div>
  );
};

export default ComparisonBar;
