import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

interface Series {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

interface Subsection {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  series: Series[];
}

interface Section {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  subsections: Subsection[];
}

const catalogData: Section[] = [
  {
    id: "corporate",
    name: "Корпоративные ЛВС",
    description:
      "Коммутаторы для корпоративных локальных вычислительных сетей различного масштаба",
    icon: "Building2",
    path: "/products/switches/corporate-lan",
    subsections: [
      {
        id: "access",
        name: "Уровень доступа",
        description:
          "L2+/L3-коммутаторы для подключения конечных устройств в офисах и на предприятиях",
        icon: "Wifi",
        path: "/products/switches/corporate-lan/access-level",
        series: [
          {
            id: "ids3530",
            name: "IDS3530",
            description:
              "Компактные L2+/L3-коммутаторы для среднего бизнеса с базовыми функциями управления",
            icon: "Router",
            path: "/products/switches/ids3530",
          },
          {
            id: "ids3730",
            name: "IDS3730",
            description:
              "Управляемые коммутаторы с поддержкой PoE для питания IP-устройств",
            icon: "Zap",
            path: "/products/switches/ids3730",
          },
          {
            id: "ids4530",
            name: "IDS4530",
            description:
              "Высокопроизводительные коммутаторы доступа для крупных корпоративных сетей",
            icon: "Network",
            path: "/products/switches/ids4530",
          },
          {
            id: "ids6012",
            name: "IDS6012",
            description:
              "Коммутаторы премиум-класса с расширенными возможностями безопасности",
            icon: "Shield",
            path: "/products/switches/ids6012",
          },
        ],
      },
      {
        id: "distribution",
        name: "Уровень распределения",
        description:
          "Агрегирующие коммутаторы для объединения трафика от уровня доступа",
        icon: "GitBranch",
        path: "/products/switches/corporate-lan/distribution-level",
        series: [
          {
            id: "ids6010",
            name: "IDS6010",
            description:
              "Коммутаторы распределения с высокой плотностью портов",
            icon: "Server",
            path: "/products/switches/ids6010",
          },
          {
            id: "ids6030",
            name: "IDS6030",
            description:
              "Модульные коммутаторы для масштабируемых корпоративных сетей",
            icon: "Layers",
            path: "/products/switches/ids6030",
          },
          {
            id: "ids6032",
            name: "IDS6032",
            description:
              "Высокопроизводительные коммутаторы с поддержкой стекирования",
            icon: "Boxes",
            path: "/products/switches/ids6032",
          },
        ],
      },
      {
        id: "core",
        name: "Уровень ядра",
        description:
          "Коммутаторы ядра для обеспечения высокоскоростной связи между сегментами сети",
        icon: "Cpu",
        path: "/products/switches/corporate-lan/core-level",
        series: [
          {
            id: "ids8040",
            name: "IDS8040",
            description:
              "Флагманские коммутаторы ядра с максимальной производительностью",
            icon: "Zap",
            path: "/products/switches/ids8040",
          },
        ],
      },
    ],
  },
  {
    id: "datacenter",
    name: "Центры обработки данных",
    description:
      "Специализированные коммутаторы для современных дата-центров и облачных инфраструктур",
    icon: "Database",
    path: "/products/switches/data-centers",
    subsections: [
      {
        id: "spine",
        name: "Уровень Spine",
        description:
          "Коммутаторы верхнего уровня для объединения Leaf-коммутаторов в архитектуре Spine-Leaf",
        icon: "TreePine",
        path: "/products/switches/data-centers/spine-level",
        series: [
          {
            id: "ids8030",
            name: "IDS8030",
            description:
              "Высокопроизводительные Spine-коммутаторы для крупных дата-центров",
            icon: "HardDrive",
            path: "/products/switches/ids8030",
          },
          {
            id: "ids8010",
            name: "IDS8010",
            description:
              "Компактные Spine-коммутаторы для средних дата-центров",
            icon: "Server",
            path: "/products/switches/ids8010",
          },
          {
            id: "ids6150",
            name: "IDS6150",
            description: "Экономичные решения для небольших дата-центров",
            icon: "Warehouse",
            path: "/products/switches/ids6150",
          },
        ],
      },
      {
        id: "leaf",
        name: "Уровень Leaf",
        description:
          "Коммутаторы нижнего уровня для подключения серверов в архитектуре Spine-Leaf",
        icon: "TreeDeciduous",
        path: "/products/switches/data-centers/leaf-level",
        series: [
          {
            id: "ids6130",
            name: "IDS6130",
            description:
              "Высокоплотные Leaf-коммутаторы с поддержкой 25/100 Гбит/с",
            icon: "Layers",
            path: "/products/switches/ids6130",
          },
        ],
      },
    ],
  },
  {
    id: "certified",
    name: "Сертифицированные ТОРП",
    description:
      "Коммутаторы с сертификацией ТОРП для использования в государственных и критически важных системах",
    icon: "Shield",
    path: "/products/switches/torp-certified",
    subsections: [],
  },
];

const SwitchesCatalog = () => {
  const isMobile = useIsMobile();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(
    null,
  );

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    setSelectedSubsection(null);
  };

  const handleSubsectionClick = (subsectionId: string) => {
    setSelectedSubsection(subsectionId);
  };

  const selectedSectionData = catalogData.find((s) => s.id === selectedSection);
  const selectedSubsectionData = selectedSectionData?.subsections.find(
    (s) => s.id === selectedSubsection,
  );

  // Mobile accordion layout
  if (isMobile) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Accordion type="single" collapsible className="w-full">
          {catalogData.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <AccordionTrigger className="hover:no-underline py-6 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Icon name={section.icon} size={24} />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">
                      {section.name}
                    </div>
                    <div className="text-sm text-[#555555] font-normal mt-1">
                      {section.description}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300">
                <Accordion type="single" collapsible className="ml-6 mt-3">
                  {section.subsections.map((subsection) => (
                    <AccordionItem
                      key={subsection.id}
                      value={subsection.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <AccordionTrigger className="hover:no-underline py-4 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <Icon name={subsection.icon} size={20} />
                          <div className="text-left">
                            <div className="font-medium text-gray-900">
                              {subsection.name}
                            </div>
                            <div className="text-sm text-[#555555] font-normal mt-1">
                              {subsection.description}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="transition-all duration-300">
                        <div className="space-y-3 ml-6 mt-3">
                          {subsection.series.map((series) => (
                            <div
                              key={series.id}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(0,160,220,0.1)] cursor-pointer transition-all duration-200"
                            >
                              <Icon name={series.icon} size={20} />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {series.name}
                                </div>
                                <div className="text-sm text-[#555555] font-normal mt-1">
                                  {series.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  // Desktop and tablet layout
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`grid gap-6 ${isTablet ? "grid-cols-2" : "grid-cols-3"}`}>
        {/* Column 1: Sections */}
        <div
          className="space-y-3 bg-white rounded-lg p-6"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)" }}
        >
          <h3 className="text-lg font-semibold mb-6 text-gray-900">Разделы</h3>
          {catalogData.map((section) => (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,160,220,0.1)] ${
                selectedSection === section.id ? "bg-[rgba(0,160,220,0.1)]" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name={section.icon} size={24} />
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
              </div>
              <p className="text-sm text-[#555555] font-normal leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* Column 2: Subsections */}
        <div
          className="space-y-3 bg-white rounded-lg p-6"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)" }}
        >
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            {selectedSectionData ? "Подразделы" : "Выберите раздел"}
          </h3>
          {selectedSectionData?.subsections.map((subsection) => (
            <div
              key={subsection.id}
              onClick={() => handleSubsectionClick(subsection.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,160,220,0.1)] ${
                selectedSubsection === subsection.id
                  ? "bg-[rgba(0,160,220,0.1)]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon name={subsection.icon} size={24} />
                <span className="font-medium text-gray-900">
                  {subsection.name}
                </span>
              </div>
              <p className="text-sm text-[#555555] font-normal leading-relaxed">
                {subsection.description}
              </p>
            </div>
          ))}
        </div>

        {/* Column 3: Series (hidden on tablet) */}
        {!isTablet && (
          <div
            className="space-y-3 bg-white rounded-lg p-6"
            style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)" }}
          >
            <h3 className="text-lg font-semibold mb-6 text-gray-900">
              {selectedSubsectionData ? "Серии" : "Выберите подраздел"}
            </h3>
            {selectedSubsectionData?.series.map((series) => (
              <div
                key={series.id}
                className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,160,220,0.1)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={series.icon} size={24} />
                  <span className="font-medium text-gray-900">
                    {series.name}
                  </span>
                </div>
                <p className="text-sm text-[#555555] font-normal leading-relaxed">
                  {series.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tablet: Series in second column when subsection selected */}
        {isTablet && selectedSubsectionData && (
          <div className="col-span-2 mt-8">
            <div
              className="bg-white rounded-lg p-6 space-y-3"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)" }}
            >
              <h3 className="text-lg font-semibold mb-6 text-gray-900">
                Серии
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {selectedSubsectionData.series.map((series) => (
                  <div
                    key={series.id}
                    className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[rgba(0,160,220,0.1)]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name={series.icon} size={24} />
                      <span className="font-medium text-gray-900">
                        {series.name}
                      </span>
                    </div>
                    <p className="text-sm text-[#555555] font-normal leading-relaxed">
                      {series.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwitchesCatalog;
