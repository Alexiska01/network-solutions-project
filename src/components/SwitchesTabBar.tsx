import React, { useState } from "react";
import Icon from "@/components/ui/icon";
import { useIsMobile } from "@/hooks/use-mobile";

const tabs = [
  { id: "all", label: "Все" },
  { id: "corporate", label: "Корпоративные ЛВС" },
  { id: "datacenter", label: "ЦОД" },
  { id: "certified", label: "Сертифицированные TORP" },
];

const SwitchesTabBar = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isMobile = useIsMobile();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {isMobile ? (
          <div className="py-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-between w-full p-3 text-left font-medium text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            >
              <span>
                Категории: {tabs.find((t) => t.id === activeTab)?.label}
              </span>
              <Icon
                name={isCollapsed ? "ChevronDown" : "ChevronUp"}
                size={20}
                className="transition-transform duration-150"
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-150 ${
                isCollapsed ? "max-h-0" : "max-h-96"
              }`}
            >
              <div className="mt-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-all duration-150
                      ${
                        activeTab === tab.id
                          ? "bg-[#0077E6]/10 text-[#0077E6] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 py-4 md:py-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative font-inter text-sm md:text-base font-medium transition-all duration-150
                  ${
                    activeTab === tab.id
                      ? "text-[#0077E6]"
                      : "text-gray-700 hover:text-[#0077E6]"
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-[-24px] md:bottom-[-28px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#00A0DC] to-[#0077E6] opacity-100 transition-opacity duration-150" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SwitchesTabBar;
