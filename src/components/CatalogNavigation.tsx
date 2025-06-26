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

const applyNavigationEffect = (switchId: string) => {
  // Убираем все предыдущие подсветки
  document
    .querySelectorAll(".navigation-active, .highlight, .active")
    .forEach((elem) => {
      elem.classList.remove("navigation-active", "highlight", "active");
    });

  const element = document.getElementById(switchId.toLowerCase());
  if (element) {
    // Скроллим к элементу
    element.scrollIntoView({ block: "center", behavior: "smooth" });

    // Добавляем подсветку
    element.classList.add("active");

    // Автоматически убираем подсветку через 500ms (длительность анимации)
    setTimeout(() => {
      element.classList.remove("active");
    }, 500);
  }
};

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

const CatalogNavigation: React.FC<CatalogNavigationProps> = ({
  onNavigate,
  activeSection,
}) => {
  const isMobile = useIsMobile();
  const [openMap, setOpenMap] = React.useState<Record<number, string | null>>(
    {},
  );

  if (isMobile) {
    return null;
  }

  return (
    <div className="bg-white border-r border-gray-200 h-full">
      <div className="container mx-auto px-4">
        <div className="py-6">
          <h3 className="font-montserrat font-semibold text-lg mb-4 text-gray-900">
            Категории коммутаторов
          </h3>
          <nav className="space-y-2">
            {navigationData.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                activeSection={activeSection}
                level={0}
                openMap={openMap}
                setOpenMap={setOpenMap}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

interface NavigationItemProps {
  item: NavigationItem;
  onNavigate: (id: string) => void;
  activeSection?: string;
  level: number;
  openMap: Record<number, string | null>;
  setOpenMap: React.Dispatch<
    React.SetStateAction<Record<number, string | null>>
  >;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  onNavigate,
  activeSection,
  level,
  openMap,
  setOpenMap,
}) => {
  const isOpen = openMap[level] === item.id;

  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (item.children) {
      // Для элементов с детьми только раскрываем/сворачиваем меню
      setOpenMap((prev) => {
        const next = {
          ...prev,
          [level]: prev[level] === item.id ? null : item.id,
        };
        Object.keys(next).forEach((key) => {
          if (Number(key) > level) delete next[Number(key)];
        });
        return next;
      });
      // НЕ вызываем onNavigate для элементов с детьми - только toggle меню
    } else {
      // Для финальных серий выполняем плавный скролл с центрированием
      e.preventDefault();
      onNavigate(item.id);
      applyNavigationEffect(item.id);

      // Убираем дублирующий код - используем только applyNavigationEffect
    }
  };

  return (
    <div>
      <button
        onClick={handleHeaderClick}
        className={`
          w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between
          ${level === 0 ? "font-semibold" : level === 1 ? "font-medium" : "font-normal"}
          ${
            activeSection === item.id
              ? "bg-gray-100 text-gray-800 border-l-4 border-gray-600"
              : "text-gray-700 hover:bg-gray-50"
          }
        `}
        style={{ marginLeft: `${level * 12}px` }}
      >
        <div className="flex items-center gap-2">
          <Icon name={item.icon} size={16} />
          <span>{item.name}</span>
        </div>
        {item.children && (
          <Icon
            name="ChevronDown"
            size={12}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {item.children && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {item.children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              onNavigate={onNavigate}
              activeSection={activeSection}
              level={level + 1}
              openMap={openMap}
              setOpenMap={setOpenMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogNavigation;
