import React from "react";

interface FiltersProps {
  selectedFilters: {
    region: string;
    type: string;
    category: string;
  };
  onFilterChange: (filters: {
    region: string;
    type: string;
    category: string;
  }) => void;
}

const PartnersFilters: React.FC<FiltersProps> = ({
  selectedFilters,
  onFilterChange,
}) => {
  const regions = ["Все", "Россия"];
  const types = ["Все", "Реселлер", "Дистрибьютор", "Интегратор"];
  const categories = ["Все", "Коммутаторы", "Маршрутизаторы", "Wi-Fi"];

  const handleFilterClick = (filterType: string, value: string) => {
    const normalizedValue = value === "Все" ? "All" : value;
    onFilterChange({
      ...selectedFilters,
      [filterType]: normalizedValue,
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
    <div className="space-y-2 md:space-y-3">
      <h3 className="text-xs md:text-sm font-semibold text-gray-800 font-montserrat uppercase tracking-wide">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {options.map((option) => {
          const normalizedOption = option === "Все" ? "All" : option;
          const isActive =
            selectedFilters[filterKey as keyof typeof selectedFilters] ===
            normalizedOption;

          return (
            <button
              key={option}
              onClick={() => handleFilterClick(filterKey, option)}
              className={`px-2 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 font-montserrat border ${
                isActive
                  ? "bg-[#0065B3] text-white border-[#0065B3] shadow-lg shadow-blue-200"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#0065B3] hover:text-[#0065B3] hover:shadow-md"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-4 md:py-12 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-3 md:p-8 shadow-sm border">
          <div className="mb-4 md:mb-6">
            <h2 className="text-base md:text-xl font-bold text-gray-900 font-montserrat mb-2">
              Фильтры поиска
            </h2>
            <p className="text-gray-600 font-montserrat text-xs md:text-sm">
              Найдите подходящего партнёра по региону, типу и категории
              оборудования
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <FilterGroup title="Регион" options={regions} filterKey="region" />
            <FilterGroup
              title="Тип партнёра"
              options={types}
              filterKey="type"
            />
            <FilterGroup
              title="Категория"
              options={categories}
              filterKey="category"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersFilters;
