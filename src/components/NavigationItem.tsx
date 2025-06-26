import React from "react";
import Icon from "@/components/ui/icon";

interface NavigationItemProps {
  item: {
    id: string;
    title: string;
    children?: Array<{
      id: string;
      title: string;
      children?: Array<{
        id: string;
        title: string;
      }>;
    }>;
  };
  onNavigate: (id: string) => void;
  activeSection: string;
  level: number;
  openMap: Record<string, boolean>;
  setOpenMap: (map: Record<string, boolean>) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  onNavigate,
  activeSection,
  level,
  openMap,
  setOpenMap,
}) => {
  const isOpen = openMap[item.id];
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeSection === item.id;

  const handleToggle = () => {
    if (hasChildren) {
      setOpenMap({
        ...openMap,
        [item.id]: !isOpen,
      });
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-gray-100 text-gray-900 font-medium"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        } ${level > 0 ? "ml-4" : ""}`}
      >
        <div className="flex items-center justify-between">
          <span>{item.title}</span>
          {hasChildren && (
            <Icon
              name={isOpen ? "ChevronDown" : "ChevronRight"}
              size={16}
              className="text-gray-400"
            />
          )}
        </div>
      </button>

      {hasChildren && isOpen && (
        <div className="mt-1">
          {item.children?.map((child) => (
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

export default NavigationItem;
