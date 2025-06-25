import React from "react";
import { Partner } from "@/pages/Partners";
import Icon from "@/components/ui/icon";

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
  const allPartners: Partner[] = [
    {
      id: 1,
      name: "TechnoLink Systems",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=120&fit=crop",
      region: "EMEA",
      type: "Дистрибьютор",
      category: "Коммутаторы",
      phone: "+7 (495) 123-45-67",
      email: "info@technolink.ru",
      website: "https://technolink.ru",
    },
    {
      id: 2,
      name: "NetworkPro Solutions",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=120&fit=crop",
      region: "APAC",
      type: "Реселлер",
      category: "Маршрутизаторы",
      phone: "+7 (812) 234-56-78",
      email: "sales@networkpro.ru",
      website: "https://networkpro.ru",
    },
    {
      id: 3,
      name: "DataCenter Integrators",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop",
      region: "Americas",
      type: "Интегратор",
      category: "Wi-Fi",
      phone: "+7 (383) 345-67-89",
      email: "contact@dcintegrators.ru",
      website: "https://dcintegrators.ru",
    },
    {
      id: 4,
      name: "Enterprise Networks",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=120&fit=crop",
      region: "EMEA",
      type: "Реселлер",
      category: "Коммутаторы",
      phone: "+7 (495) 456-78-90",
      email: "info@entnetworks.ru",
      website: "https://entnetworks.ru",
    },
    {
      id: 5,
      name: "Global Connect",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop",
      region: "APAC",
      type: "Дистрибьютор",
      category: "Маршрутизаторы",
      phone: "+7 (921) 567-89-01",
      email: "partners@globalconnect.ru",
      website: "https://globalconnect.ru",
    },
    {
      id: 6,
      name: "Wireless Solutions Ltd",
      logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&h=120&fit=crop",
      region: "Americas",
      type: "Интегратор",
      category: "Wi-Fi",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Дистрибьютор":
        return "bg-blue-100 text-blue-800";
      case "Реселлер":
        return "bg-green-100 text-green-800";
      case "Интегратор":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-6 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-4 md:mb-8">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 font-montserrat mb-2 md:mb-4">
            {filteredPartners.length > 0
              ? `Найдено партнёров: ${filteredPartners.length}`
              : "Партнёры не найдены"}
          </h2>
        </div>

        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => onPartnerClick(partner)}
                className="group bg-white rounded-xl border border-gray-200 hover:border-[#0065B3] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="p-3 md:p-6">
                  <div className="relative h-[140px] w-full mb-3 md:mb-4 bg-gray-100 rounded-lg overflow-hidden group-hover:bg-blue-50 transition-colors">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                      onLoad={(e) => {
                        const placeholder =
                          e.currentTarget.parentElement?.querySelector(
                            ".animate-pulse",
                          );
                        if (placeholder) {
                          placeholder.remove();
                        }
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const placeholder =
                          e.currentTarget.parentElement?.querySelector(
                            ".animate-pulse",
                          );
                        if (placeholder) {
                          placeholder.remove();
                        }
                        const fallback = document.createElement("div");
                        fallback.className =
                          "w-full h-full bg-gray-200 rounded-lg flex items-center justify-center";
                        fallback.innerHTML =
                          '<span class="text-gray-400 text-lg font-medium">' +
                          partner.name.charAt(0) +
                          "</span>";
                        e.currentTarget.parentElement?.appendChild(fallback);
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg -z-10"></div>
                  </div>

                  <h3 className="font-semibold text-gray-900 font-montserrat text-sm md:text-lg mb-2 md:mb-3 group-hover:text-[#0065B3] transition-colors">
                    {partner.name}
                  </h3>

                  <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        name="MapPin"
                        size={12}
                        className="text-gray-400 md:w-3.5 md:h-3.5"
                      />
                      <span className="text-xs md:text-sm text-gray-600 font-montserrat">
                        {partner.region}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        name="Building"
                        size={12}
                        className="text-gray-400 md:w-3.5 md:h-3.5"
                      />
                      <span
                        className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium font-montserrat ${getTypeColor(partner.type)}`}
                      >
                        {partner.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-montserrat">
                      {partner.category}
                    </span>
                    <Icon
                      name="ArrowRight"
                      size={14}
                      className="text-gray-400 group-hover:text-[#0065B3] group-hover:translate-x-1 transition-all md:w-4 md:h-4"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <div className="bg-gray-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Icon
                name="Search"
                size={24}
                className="text-gray-400 md:w-8 md:h-8"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 font-montserrat mb-2">
              Партнёры не найдены
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-montserrat max-w-md mx-auto px-4 md:px-0">
              Попробуйте изменить параметры фильтров или сбросить их для
              просмотра всех партнёров
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersGrid;
