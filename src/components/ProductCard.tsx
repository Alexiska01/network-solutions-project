import React from "react";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  description,
  features,
  specifications,
}) => {
  return (
    <div
      id={id}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <h3 className="font-montserrat font-semibold text-xl mb-3 text-gray-900">
        {title}
      </h3>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {description}
      </p>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">
          Ключевые особенности:
        </h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          Технические характеристики:
        </h4>
        <div className="grid grid-cols-1 gap-1 text-sm">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{key}:</span>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
