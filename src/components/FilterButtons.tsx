import React from "react";
import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/models";

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = [
    { value: "all" as FilterType, label: "Все модели" },
    { value: "poe" as FilterType, label: "Только PoE" },
    { value: "sfp" as FilterType, label: "Только SFP" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="px-3 sm:px-6 py-2 transition-all duration-300 text-xs sm:text-sm min-w-[85px] sm:min-w-auto"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
