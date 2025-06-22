import React from "react";
import { ProductSpec } from "@/types/product";

interface SpecTableProps {
  title: string;
  specs: ProductSpec[];
}

const SpecTable: React.FC<SpecTableProps> = ({ title, specs }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 font-sans">
        {title}
      </h3>
      <div className="space-y-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-2 ${
              index < specs.length - 1 ? "border-b border-gray-100" : ""
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

export default SpecTable;
