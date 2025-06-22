import React from "react";
import Icon from "@/components/ui/icon";
import { ProductFeature } from "@/types/product";

interface FeatureCardProps {
  feature: ProductFeature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="text-center">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${feature.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        <Icon name={feature.icon as any} size={32} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2 font-sans">{feature.title}</h3>
      <p className="text-gray-600 font-sans">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
