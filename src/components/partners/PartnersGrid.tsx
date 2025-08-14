import React, { useEffect } from "react";
import { Partner } from "@/pages/Partners";
import Icon from "@/components/ui/icon";
import { SafeImage } from "@/components/ui/safe-image";

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
      name: "Инфосэл",
      logo: "/img/164ca65e-bdb4-4caa-89fb-0459f4ca4138.jpg",
      region: "Россия",
      type: "Интегратор",
      category: "Коммутаторы",
      phone: "+7 (495) 651-82-85",
      email: "info@infocellprint.ru",
      website: "https://infocellprint.ru",
    },
    {
      id: 2,
      name: "Инлайн ГРУП",
      logo: "/img/164ca65e-bdb4-4caa-89fb-0459f4ca4138.jpg",
      region: "Россия",
      type: "Интегратор",
      category: "Маршрутизаторы",
      phone: "+7 (495) 787-59-40",
      email: "info@inlinegroup.ru",
      website: "https://inlinegroup.ru",
    },
    {
      id: 3,
      name: "КРОК",
      logo: "/img/164ca65e-bdb4-4caa-89fb-0459f4ca4138.jpg",
      region: "Россия",
      type: "Интегратор",
      category: "Wi-Fi",
      phone: "+7 (495) 974-22-74",
      email: "info@croc.ru",
      website: "https://www.croc.ru",
    },
    {
      id: 4,
      name: "САТЕЛ",
      logo: "/img/164ca65e-bdb4-4caa-89fb-0459f4ca4138.jpg",
      region: "Россия",
      type: "Интегратор",
      category: "Коммутаторы",
      phone: "+7 495 785-88-77",
      email: "office@satel.org",
      website: "https://satel.ru",
    },
  ];

  // Предварительная загрузка логотипов в фоне
  useEffect(() => {
    const preloadImages = () => {
      allPartners.forEach((partner) => {
        const img = new Image();
        img.src = partner.logo;
      });
    };

    // Запускаем предварительную загрузку через небольшую задержку
    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, []);

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
              ? "Партнёрская сеть iDATA"
              : "Партнёры не найдены"}
          </h2>
        </div>

        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => onPartnerClick(partner)}
                className={`group ${
                  partner.name === "Инфосэл" ||
                  partner.name === "Инлайн ГРУП" ||
                  partner.name === "КРОК" ||
                  partner.name === "САТЕЛ"
                    ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
                    : "bg-white"
                } rounded-xl border border-gray-200 hover:border-[#0065B3] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                <div className="p-3 md:p-6">
                  <div className="relative h-[140px] w-full mb-3 md:mb-4 bg-white border border-gray-200 rounded-lg overflow-hidden group-hover:border-blue-200 transition-colors flex items-center justify-center p-4">
                    <SafeImage
                      src={partner.logo}
                      alt={partner.name}
                      className={`max-w-full max-h-full object-contain ${partner.name === "Инфосэл" || partner.name === "Инлайн ГРУП" ? "w-auto h-auto" : partner.name === "КРОК" ? "w-auto h-auto scale-50" : partner.name === "САТЕЛ" ? "w-auto h-auto scale-150" : "w-full h-full object-cover"} rounded-lg`}
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
                      Подробнее
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