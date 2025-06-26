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
    <div className="bg-white border-r border-gray-200 h-full">
      <div className="container mx-auto px-4">
        <div className="py-6">
          <h3 className="font-montserrat font-semibold text-lg mb-4 text-gray-900">
            Категории оборудования
          </h3>
          <nav className="space-y-2">
            {navigationData.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                activeSection={activeSection}
                level={0}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

const NavigationItem = ({
  item,
  onNavigate,
  activeSection,
  level,
}: {
  item: NavigationItem;
  onNavigate: (id: string) => void;
  activeSection?: string;
  level: number;
}) => {
  const handleClick = () => {
    onNavigate(item.id);
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Добавляем эффект выделения
      element.style.boxShadow = "0 0 20px rgba(46, 91, 255, 0.4)";
      element.style.transform = "scale(1.02)";
      element.style.transition = "all 0.3s ease";

      setTimeout(() => {
        element.style.boxShadow = "";
        element.style.transform = "";
        element.style.transition = "all 0.3s ease";
      }, 2000);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          w-full text-left px-3 py-2 rounded-lg transition-colors
          ${level === 0 ? "font-semibold" : level === 1 ? "font-medium" : "font-normal"}
          ${
            activeSection === item.id
              ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
              : "text-gray-700 hover:bg-gray-50"
          }
        `}
        style={{ marginLeft: `${level * 12}px` }}
      >
        <div className="flex items-center gap-2">
          <Icon name={item.icon} size={16} />
          <span>{item.name}</span>
        </div>
      </button>

      {item.children && (
        <div className="mt-1">
          {item.children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              onNavigate={onNavigate}
              activeSection={activeSection}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogNavigation;
