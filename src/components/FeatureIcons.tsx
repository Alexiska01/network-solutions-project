// src/components/FeatureIcons.tsx
import React from 'react';
import { LucideIcon, Zap, Layers, Activity, Cpu } from 'lucide-react';

interface Feature {
  icon: string;
  label: string;
}

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  layers: Layers,
  activity: Activity,
  cpu: Cpu,
};

interface FeatureIconsProps {
  features: Feature[];
}

const FeatureIcons: React.FC<FeatureIconsProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 max-w-4xl mx-auto">
      {features.map(({ icon, label }, index) => {
        const IconComponent = iconMap[icon] || Cpu;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            <IconComponent className="w-8 h-8 mb-2 text-green-400" />
            <p className="text-sm text-gray-300">{label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureIcons;
