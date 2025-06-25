import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import type { FilterType } from "@/pages/SwitchesPage";

interface SidebarSubItem {
  id: string;
  name: string;
}

interface SidebarItem {
  id: FilterType;
  name: string;
  description: string;
  icon: string;
  subitems: SidebarSubItem[];
}

interface SwitchesSidebarProps {
  activeFilter: FilterType;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "corporate",
    name: "Корпоративные ЛВС",
    description: "Коммутаторы для корпоративных локальных сетей",
    icon: "Building2",
    subitems: [
      { id: "ids3530", name: "IDS3530" },
      { id: "ids3730", name: "IDS3730" },
      { id: "ids4530", name: "IDS4530" },
      { id: "ids6012", name: "IDS6012" },
    ],
  },
  {
    id: "datacenter",
    name: "Центры обработки данных",
    description: "Высокопроизводительные решения для ЦОД",
    icon: "Server",
    subitems: [
      { id: "ids8030", name: "IDS8030" },
      { id: "ids8010", name: "IDS8010" },
      { id: "ids6150", name: "IDS6150" },
      { id: "ids6130", name: "IDS6130" },
    ],
  },
  {
    id: "certified",
    name: "Сертифицированные TORP",
    description: "Сертифицированное оборудование",
    icon: "Shield",
    subitems: [{ id: "ids8040", name: "IDS8040" }],
  },
];

const SwitchesSidebar = ({ activeFilter }: SwitchesSidebarProps) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const filteredItems =
    activeFilter === "all"
      ? sidebarItems
      : sidebarItems.filter((item) => item.id === activeFilter);

  if (isMobile) {
    return (
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="py-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-between w-full p-3 text-left font-medium text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            >
              <span>Разделы</span>
              <Icon
                name={isCollapsed ? "ChevronDown" : "ChevronUp"}
                size={20}
                className="transition-transform duration-150"
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isCollapsed ? "max-h-0" : "max-h-[500px]"
              }`}
            >
              <div className="mt-2 space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          name={item.icon}
                          size={20}
                          className="text-[#0077E6]"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <Icon
                        name="ChevronRight"
                        size={16}
                        className={`transition-transform duration-300 ${
                          expandedItems.has(item.id) ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedItems.has(item.id) ? "max-h-64" : "max-h-0"
                      }`}
                    >
                      <div className="px-3 pb-3 space-y-1">
                        {item.subitems.map((subitem) => (
                          <button
                            key={subitem.id}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#0077E6]/10 hover:text-[#0077E6] rounded transition-colors duration-150"
                          >
                            {subitem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-[calc(100vh-200px)]">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Разделы</h3>
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-150 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} size={20} className="text-[#0077E6]" />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.description}
                    </div>
                  </div>
                </div>
                <Icon
                  name="ChevronRight"
                  size={16}
                  className={`transition-transform duration-300 ${
                    expandedItems.has(item.id) ? "rotate-90" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedItems.has(item.id) ? "max-h-64" : "max-h-0"
                }`}
              >
                <div className="px-3 pb-3 space-y-1">
                  {item.subitems.map((subitem) => (
                    <button
                      key={subitem.id}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#0077E6]/10 hover:text-[#0077E6] rounded transition-colors duration-150"
                    >
                      {subitem.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchesSidebar;
