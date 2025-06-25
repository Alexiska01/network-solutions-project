import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

interface SidebarItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "corporate",
    name: "Корпоративные ЛВС",
    description: "Коммутаторы для корпоративных локальных сетей",
    icon: "Building2",
    path: "/switches/corporate",
  },
  {
    id: "datacenter",
    name: "Центры обработки данных",
    description: "Высокопроизводительные решения для ЦОД",
    icon: "Server",
    path: "/switches/datacenter",
  },
  {
    id: "certified",
    name: "Сертифицированные TORP",
    description: "Сертифицированное оборудование",
    icon: "Shield",
    path: "/switches/certified",
  },
];

const SwitchesSidebar = () => {
  const isMobile = useIsMobile();
  const [activeItem, setActiveItem] = useState("corporate");

  if (isMobile) {
    return (
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full">
            {sidebarItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="py-4 text-left hover:no-underline">
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
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="pl-8">
                    <p className="text-sm text-gray-600">
                      Подкатегории будут добавлены позже
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Разделы</h3>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`
                w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors duration-200
                ${
                  activeItem === item.id
                    ? "bg-[#0077E6]/10 text-[#0077E6] border-l-4 border-[#0077E6]"
                    : "hover:bg-gray-50 text-gray-700"
                }
              `}
            >
              <Icon
                name={item.icon}
                size={20}
                className={
                  activeItem === item.id ? "text-[#0077E6]" : "text-gray-500"
                }
              />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SwitchesSidebar;
