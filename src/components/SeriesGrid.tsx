import React from "react";
import type { FilterType } from "@/pages/SwitchesPage";

interface Series {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  category: FilterType;
}

interface SeriesGridProps {
  activeFilter: FilterType;
}

const seriesData: Series[] = [
  {
    id: "ids3530",
    name: "IDS3530",
    description:
      "Компактные L2+/L3-коммутаторы для среднего бизнеса с базовыми функциями",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    path: "/products/switches/ids3530",
    category: "corporate",
  },
  {
    id: "ids3730",
    name: "IDS3730",
    description: "Управляемые коммутаторы с PoE для питания IP-устройств",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    path: "/products/switches/ids3730",
    category: "corporate",
  },
  {
    id: "ids4530",
    name: "IDS4530",
    description:
      "Высокопроизводительные коммутаторы доступа для крупных корпоративных сетей",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    path: "/products/switches/ids4530",
    category: "corporate",
  },
  {
    id: "ids6012",
    name: "IDS6012",
    description:
      "Премиум-класс с расширенной безопасностью и модульным питанием",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    path: "/products/switches/ids6012",
    category: "corporate",
  },
  {
    id: "ids8030",
    name: "IDS8030",
    description: "Core-коммутаторы для дата-центров и облачных инфраструктур",
    image:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=300&fit=crop",
    path: "/products/switches/ids8030",
    category: "datacenter",
  },
  {
    id: "ids8010",
    name: "IDS8010",
    description:
      "Высокопроизводительные коммутаторы распределения с максимальной плотностью портов",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    path: "/products/switches/ids8010",
    category: "datacenter",
  },
  {
    id: "ids6150",
    name: "IDS6150",
    description:
      "Модульные коммутаторы для масштабируемых решений центров обработки данных",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&h=300&fit=crop",
    path: "/products/switches/ids6150",
    category: "datacenter",
  },
  {
    id: "ids6130",
    name: "IDS6130",
    description:
      "Коммутаторы агрегации с поддержкой виртуализации и высокой отказоустойчивости",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    path: "/products/switches/ids6130",
    category: "datacenter",
  },
  {
    id: "ids8040",
    name: "IDS8040",
    description:
      "Флагманские коммутаторы ядра с максимальной производительностью и сертификацией TORP",
    image:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop",
    path: "/products/switches/ids8040",
    category: "certified",
  },
];

const SeriesGrid = ({ activeFilter }: SeriesGridProps) => {
  const filteredSeries =
    activeFilter === "all"
      ? seriesData
      : seriesData.filter((series) => series.category === activeFilter);

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-montserrat font-bold text-gray-900 mb-4">
          Серии коммутаторов
        </h2>
        <p className="text-gray-600 font-inter">
          Выберите серию для просмотра подробной информации и характеристик
        </p>
      </div>

      <div className="series-grid">
        {filteredSeries.map((series) => (
          <a key={series.id} href={series.path} className="series-card group">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="series-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect
                      width="32"
                      height="32"
                      rx="8"
                      fill="url(#gradient)"
                      className="transition-all duration-200"
                    />
                    <path
                      d="M8 12h16v2H8zm0 4h16v2H8zm0 4h12v2H8z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0"
                        y1="0"
                        x2="32"
                        y2="32"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#0077E6" />
                        <stop offset="1" stopColor="#00A0DC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-montserrat font-bold text-[#222222] mb-2">
                    {series.name}
                  </h3>
                </div>
              </div>
              <p className="text-sm font-inter text-[#555555] mb-6 leading-relaxed">
                {series.description}
              </p>
              <button className="series-button w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 group-hover:shadow-lg">
                Подробнее
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SeriesGrid;
