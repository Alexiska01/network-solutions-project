import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Icon from "@/components/ui/icon";

interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  children?: NavigationItem[];
}

interface CatalogNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

const navigationData: NavigationItem[] = [
  {
    id: "corporate-lan",
    name: "Корпоративные ЛВС",
    icon: "Building2",
    children: [
      {
        id: "access-level",
        name: "Уровень доступа",
        icon: "Wifi",
        children: [
          { id: "ids3530", name: "IDS3530", icon: "Router" },
          { id: "ids3730", name: "IDS3730", icon: "Zap" },
          { id: "ids4530", name: "IDS4530", icon: "Network" },
          { id: "ids6012", name: "IDS6012", icon: "Shield" },
        ],
      },
      {
        id: "distribution-level",
        name: "Уровень распределения",
        icon: "GitBranch",
        children: [
          { id: "ids6010", name: "IDS6010", icon: "Server" },
          { id: "ids6030", name: "IDS6030", icon: "Layers" },
          { id: "ids6032", name: "IDS6032", icon: "Boxes" },
        ],
      },
    ],
  },
  {
    id: "data-center",
    name: "Центры обработки данных",
    icon: "Database",
    children: [
      {
        id: "spine-level",
        name: "Уровень Spine",
        icon: "TreePine",
        children: [
          { id: "ids8030", name: "IDS8030", icon: "HardDrive" },
          { id: "ids8010", name: "IDS8010", icon: "Server" },
        ],
      },
      {
        id: "leaf-level",
        name: "Уровень Leaf",
        icon: "TreeDeciduous",
        children: [
          { id: "ids6150", name: "IDS6150", icon: "Warehouse" },
          { id: "ids6130", name: "IDS6130", icon: "Layers" },
        ],
      },
    ],
  },
];

const CatalogNavigation = ({
  onNavigate,
  activeSection,
}: CatalogNavigationProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null; // Скрываем на мобильных устройствах
  }

  const handleItemClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Добавляем эффект выделения карточки
      element.style.boxShadow = "0 0 20px rgba(46, 91, 255, 0.4)";
      element.style.transform = "scale(1.02)";
      element.style.transition = "all 0.3s ease";

      // Убираем эффект через 2 секунды
      setTimeout(() => {
        element.style.boxShadow = "";
        element.style.transform = "";
        element.style.transition = "all 0.3s ease";
      }, 2000);
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6 h-fit ml-8">
      <h3 className="font-semibold text-gray-900 mb-4">
        Навигация по каталогу
      </h3>
      <nav className="space-y-1">
        {navigationData.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => handleItemClick(section.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              <Icon name={section.icon} size={16} />
              {section.name}
            </button>
            {section.children && (
              <div className="ml-4 mt-1 space-y-1">
                {section.children.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => handleItemClick(category.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-gray-50 ${
                        activeSection === category.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      <Icon name={category.icon} size={14} />
                      {category.name}
                    </button>
                    {category.children && (
                      <div className="ml-4 mt-1 space-y-0.5">
                        {category.children.map((series) => (
                          <button
                            key={series.id}
                            onClick={() => handleItemClick(series.id)}
                            className={`w-full flex items-center gap-2 px-3 py-1 text-xs rounded-md transition-colors hover:bg-gray-50 ${
                              activeSection === series.id
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-500"
                            }`}
                          >
                            <Icon name={series.icon} size={12} />
                            {series.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default CatalogNavigation;
