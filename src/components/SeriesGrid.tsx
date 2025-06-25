import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Series {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
}

const seriesData: Series[] = [
  {
    id: "ids3530",
    name: "IDS3530",
    description:
      "Компактные L2+/L3-коммутаторы для среднего бизнеса с базовыми функциями управления",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    path: "/products/switches/ids3530",
  },
  {
    id: "ids3730",
    name: "IDS3730",
    description:
      "Управляемые коммутаторы с поддержкой PoE для питания IP-устройств",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    path: "/products/switches/ids3730",
  },
  {
    id: "ids4530",
    name: "IDS4530",
    description:
      "Высокопроизводительные коммутаторы доступа для крупных корпоративных сетей",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    path: "/products/switches/ids4530",
  },
  {
    id: "ids6012",
    name: "IDS6012",
    description:
      "Коммутаторы премиум-класса с расширенными возможностями безопасности",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop",
    path: "/products/switches/ids6012",
  },
  {
    id: "ids6010",
    name: "IDS6010",
    description: "Коммутаторы распределения с высокой плотностью портов",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    path: "/products/switches/ids6010",
  },
  {
    id: "ids6030",
    name: "IDS6030",
    description: "Модульные коммутаторы для масштабируемых корпоративных сетей",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&h=300&fit=crop",
    path: "/products/switches/ids6030",
  },
  {
    id: "ids6032",
    name: "IDS6032",
    description: "Высокопроизводительные коммутаторы с поддержкой стекирования",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    path: "/products/switches/ids6032",
  },
  {
    id: "ids8040",
    name: "IDS8040",
    description:
      "Флагманские коммутаторы ядра с максимальной производительностью",
    image:
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=300&fit=crop",
    path: "/products/switches/ids8040",
  },
  {
    id: "ids8030",
    name: "IDS8030",
    description:
      "Высокопроизводительные Spine-коммутаторы для крупных дата-центров",
    image:
      "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=300&fit=crop",
    path: "/products/switches/ids8030",
  },
];

const SeriesGrid = () => {
  const isMobile = useIsMobile();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Серии коммутаторов
        </h2>
        <p className="text-gray-600">
          Выберите серию для просмотра подробной информации и характеристик
        </p>
      </div>

      <div className="series-grid">
        {seriesData.map((series) => (
          <div key={series.id} className="series-card">
            <div className="series-image">
              <img
                src={series.image}
                alt={series.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3
                className={`font-bold text-[#222222] mb-3 ${
                  isMobile ? "text-lg" : "text-xl lg:text-2xl"
                }`}
              >
                {series.name}
              </h3>
              <p
                className={`text-[#555555] mb-6 leading-relaxed ${
                  isMobile ? "text-sm" : "text-base"
                }`}
              >
                {series.description}
              </p>
              <button className="series-button w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesGrid;
