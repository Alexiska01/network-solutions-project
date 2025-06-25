import React, { useState } from "react";

const tabs = [
  { id: "all", label: "Все" },
  { id: "corporate", label: "Корпоративные ЛВС" },
  { id: "datacenter", label: "ЦОД" },
  { id: "certified", label: "Сертифицированные TORP" },
];

const SwitchesTabBar = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-12 py-4 md:py-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
      </div>
    </section>
  );
};

export default SwitchesTabBar;
