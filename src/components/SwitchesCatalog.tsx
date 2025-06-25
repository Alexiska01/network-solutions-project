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
}

interface Subsection {
  id: string;
  name: string;
  description: string;
  icon: string;
  series: Series[];
}

interface Section {
  id: string;
  name: string;
  icon: string;
  subsections: Subsection[];
}

const catalogData: Section[] = [
  {
    id: "corporate",
    name: "Корпоративные ЛВС",
    icon: "Building2",
    subsections: [
      {
        id: "access",
        name: "Уровень доступа",
        description: "L2+/L3-коммутаторы для офисов и предприятий",
        icon: "Wifi",
        series: [
          {
            id: "ids3530",
            name: "IDS3530",
            description: "Компактные L2+/L3-коммутаторы для среднего бизнеса",
            icon: "Router",
          },
          {
            id: "ids3730",
            name: "IDS3730",
            description: "Управляемые решения с PoE",
            icon: "Zap",
          },
        ],
      },
      {
        id: "distribution",
        name: "Уровень распределения",
        description: "Агрегирующие решения для филиалов",
        icon: "Network",
        series: [
          {
            id: "ids4530",
            name: "IDS4530",
            description: "Масштабируемые core-коммутаторы",
            icon: "Server",
          },
        ],
      },
    ],
  },
  {
    id: "datacenter",
    name: "Центры обработки данных",
    icon: "Database",
    subsections: [
      {
        id: "core",
        name: "Уровень ядра",
        description: "Высокопроизводительные коммутаторы ядра",
        icon: "Cpu",
        series: [
          {
            id: "ids7000",
            name: "IDS7000",
            description: "Модульные решения для дата-центров",
            icon: "HardDrive",
          },
        ],
      },
    ],
  },
  {
    id: "certified",
    name: "Сертифицированные ТОРП",
    icon: "Shield",
    subsections: [
      {
        id: "industrial",
        name: "Промышленные",
        description: "Защищенные коммутаторы для harsh-условий",
        icon: "Factory",
        series: [
          {
            id: "ids2000",
            name: "IDS2000",
            description: "Индустриальные Ethernet-коммутаторы",
            icon: "Wrench",
          },
        ],
      },
    ],
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
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon name={section.icon} size={24} />
                  <span>{section.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="ml-6">
                  {section.subsections.map((subsection) => (
                    <AccordionItem key={subsection.id} value={subsection.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Icon name={subsection.icon} size={20} />
                          <div className="text-left">
                            <div className="font-medium">{subsection.name}</div>
                            <div className="text-sm text-gray-600">
                              {subsection.description}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 ml-6">
                          {subsection.series.map((series) => (
                            <div
                              key={series.id}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(0,160,220,0.1)] cursor-pointer transition-colors"
                            >
                              <Icon name={series.icon} size={20} />
                              <div>
                                <div className="font-medium">{series.name}</div>
                                <div className="text-sm text-gray-600">
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
      <div className={`grid gap-8 ${isTablet ? "grid-cols-2" : "grid-cols-3"}`}>
        {/* Column 1: Sections */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Разделы</h3>
          {catalogData.map((section) => (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(0,160,220,0.1)] ${
                selectedSection === section.id ? "bg-[rgba(0,160,220,0.1)]" : ""
              }`}
            >
              <Icon name={section.icon} size={24} />
              <span className="font-medium">{section.name}</span>
            </div>
          ))}
        </div>

        {/* Column 2: Subsections */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            {selectedSectionData ? "Подразделы" : "Выберите раздел"}
          </h3>
          {selectedSectionData?.subsections.map((subsection) => (
            <div
              key={subsection.id}
              onClick={() => handleSubsectionClick(subsection.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(0,160,220,0.1)] ${
                selectedSubsection === subsection.id
                  ? "bg-[rgba(0,160,220,0.1)]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon name={subsection.icon} size={24} />
                <span className="font-medium">{subsection.name}</span>
              </div>
              <p className="text-sm text-gray-600 ml-9">
                {subsection.description}
              </p>
            </div>
          ))}
        </div>

        {/* Column 3: Series (hidden on tablet) */}
        {!isTablet && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              {selectedSubsectionData ? "Серии" : "Выберите подраздел"}
            </h3>
            {selectedSubsectionData?.series.map((series) => (
              <div
                key={series.id}
                className="p-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(0,160,220,0.1)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={series.icon} size={24} />
                  <span className="font-medium">{series.name}</span>
                </div>
                <p className="text-sm text-gray-600 ml-9">
                  {series.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tablet: Series in second column when subsection selected */}
        {isTablet && selectedSubsectionData && (
          <div className="col-span-2 mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Серии</h3>
            <div className="grid grid-cols-1 gap-3">
              {selectedSubsectionData.series.map((series) => (
                <div
                  key={series.id}
                  className="p-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(0,160,220,0.1)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={series.icon} size={24} />
                    <span className="font-medium">{series.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-9">
                    {series.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwitchesCatalog;
