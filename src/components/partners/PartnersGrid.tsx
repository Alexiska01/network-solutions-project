import React from "react";
import { Partner } from "@/pages/Partners";

interface PartnersGridProps {
  selectedFilters: {
    region: string;
    type: string;
    category: string;
  };
  onPartnerClick: (partner: Partner) => void;
}

const PartnersGrid: React.FC<PartnersGridProps> = ({
  selectedFilters,
  onPartnerClick,
}) => {
  // Пример данных партнёров
  const allPartners: Partner[] = [
    {
      id: 1,
      name: "TechnoLink Systems",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop",
      region: "EMEA",
      type: "Distributor",
      category: "Switches",
      phone: "+7 (495) 123-45-67",
      email: "info@technolink.ru",
      website: "https://technolink.ru",
    },
    {
      id: 2,
      name: "NetworkPro Solutions",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop",
      region: "APAC",
      type: "Reseller",
      category: "Routers",
      phone: "+7 (812) 234-56-78",
      email: "sales@networkpro.ru",
      website: "https://networkpro.ru",
    },
    {
      id: 3,
      name: "DataCenter Integrators",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=80&fit=crop",
      region: "Americas",
      type: "Integrator",
      category: "Wireless",
      phone: "+7 (383) 345-67-89",
      email: "contact@dcintegrators.ru",
      website: "https://dcintegrators.ru",
    },
    {
      id: 4,
      name: "Enterprise Networks",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=80&fit=crop",
      region: "EMEA",
      type: "Reseller",
      category: "Switches",
      phone: "+7 (495) 456-78-90",
      email: "info@entnetworks.ru",
      website: "https://entnetworks.ru",
    },
    {
      id: 5,
      name: "Global Connect",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop",
      region: "APAC",
      type: "Distributor",
      category: "Routers",
      phone: "+7 (921) 567-89-01",
      email: "partners@globalconnect.ru",
      website: "https://globalconnect.ru",
    },
    {
      id: 6,
      name: "Wireless Solutions Ltd",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=200&h=80&fit=crop",
      region: "Americas",
      type: "Integrator",
      category: "Wireless",
      phone: "+7 (343) 678-90-12",
      email: "info@wirelesssolutions.ru",
      website: "https://wirelesssolutions.ru",
    },
  ];

  const filteredPartners = allPartners.filter((partner) => {
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
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              onClick={() => onPartnerClick(partner)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 p-6"
            >
              <div className="flex items-center justify-center h-20">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-center mt-4 font-medium text-gray-900 font-['Montserrat'] text-sm">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-['Montserrat']">
              По выбранным фильтрам партнёры не найдены
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersGrid;
