import React from "react";
import { Partner } from "@/pages/Partners";
import AuthorizedPartnersInfo from "./AuthorizedPartnersInfo";

interface PartnersGridProps {
  selectedFilters: {
    region: string;
    type: string;
    category: string;
  };
  onPartnerClick: (partner: Partner) => void;
}

const mockPartners: Partner[] = [
  {
    id: 1,
    name: "ТехноПартнер",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    region: "Москва",
    type: "Дистрибьютор",
    category: "Электроника",
    phone: "+7 (495) 123-45-67",
    email: "info@technopartner.ru",
    website: "https://technopartner.ru",
  },
  // ... остальные партнеры
];

const PartnersGrid = ({
  selectedFilters,
  onPartnerClick,
}: PartnersGridProps) => {
  const filteredPartners = mockPartners.filter((partner) => {
    return (
      (selectedFilters.region === "All" ||
        partner.region === selectedFilters.region) &&
      (selectedFilters.type === "All" ||
        partner.type === selectedFilters.type) &&
      (selectedFilters.category === "All" ||
        partner.category === selectedFilters.category)
    );
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-gray-600">
            Найдено партнеров: {filteredPartners.length}
          </p>
          <AuthorizedPartnersInfo />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onPartnerClick(partner)}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600 mb-1">{partner.region}</p>
              <p className="text-gray-600 mb-1">{partner.type}</p>
              <p className="text-gray-600">{partner.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersGrid;
