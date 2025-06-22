import React from "react";
import Icon from "@/components/ui/icon";
import { ProductSpecGroup } from "@/types/product";

interface DetailedSpecCardProps {
  specGroup: ProductSpecGroup;
}

const DetailedSpecCard: React.FC<DetailedSpecCardProps> = ({ specGroup }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans flex items-center">
        <Icon
          name={specGroup.icon as any}
          className={`mr-2 ${specGroup.iconColor}`}
        />
        {specGroup.title}
      </h3>
      <div className="space-y-3">
        {specGroup.specs.map((spec, index) => (
          <div
            key={index}
            className={`flex justify-between py-2 ${
              index < specGroup.specs.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <span className="text-gray-600 font-sans text-sm">
              {spec.label}
            </span>
            <span className="font-medium font-sans text-sm">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedSpecCard;
