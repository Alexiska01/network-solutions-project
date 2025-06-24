import React from "react";
import Icon from "@/components/ui/icon";
import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  iconColor,
  title,
  description,
}) => {
  return (
    <div className="group bg-white rounded-lg border border-gray-100 p-5 transition-all duration-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-white hover:-translate-y-0.5">
      <div className="flex items-start space-x-2">
        <div
          className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon name={icon} size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold mb-1 text-gray-900 font-sans">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-sans">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
