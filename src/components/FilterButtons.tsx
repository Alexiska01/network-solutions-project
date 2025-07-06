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
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="px-6 py-2 transition-all duration-300"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
