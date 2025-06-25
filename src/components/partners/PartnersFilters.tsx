import React from "react";

interface FiltersProps {
  selectedFilters: {
    region: string;
    type: string;
    category: string;
  };
  onFilterChange: (filters: any) => void;
}

const PartnersFilters: React.FC<FiltersProps> = ({
  selectedFilters,
  onFilterChange,
}) => {
  const regions = ["All", "EMEA", "APAC", "Americas"];
  const types = ["All", "Reseller", "Distributor", "Integrator"];
  const categories = ["All", "Switches", "Routers", "Wireless"];

  const handleFilterClick = (filterType: string, value: string) => {
    onFilterChange({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const FilterGroup = ({
    title,
    options,
    filterKey,
  }: {
    title: string;
    options: string[];
    filterKey: string;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-sm font-medium text-gray-700 font-['Montserrat'] min-w-[80px]">
        {title}:
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleFilterClick(filterKey, option)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-['Montserrat'] ${
              selectedFilters[filterKey as keyof typeof selectedFilters] ===
              option
                ? "bg-[#0065B3] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="space-y-4">
          <FilterGroup title="Регион" options={regions} filterKey="region" />
          <FilterGroup title="Тип" options={types} filterKey="type" />
          <FilterGroup
            title="Категория"
            options={categories}
            filterKey="category"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersFilters;
