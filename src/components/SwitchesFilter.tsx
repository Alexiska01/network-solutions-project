import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SwitchesFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "Все", section: null },
  { id: "access", label: "Доступ", section: "corporate-lan" },
  { id: "distribution", label: "Распределение", section: "corporate-lan" },
  { id: "spine", label: "Spine", section: "data-center" },
  { id: "leaf", label: "Leaf", section: "data-center" },
];

const SwitchesFilter = ({
  activeFilter,
  onFilterChange,
}: SwitchesFilterProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterClick = (filterId: string, section: string | null) => {
    onFilterChange(filterId);

    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-300 z-10",
        isSticky
          ? "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md"
          : "relative",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2 py-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id, filter.section)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "border border-gray-200 hover:border-[#2E5BFF] hover:bg-[#2E5BFF]/5",
                activeFilter === filter.id
                  ? "bg-[#2E5BFF] text-white border-[#2E5BFF]"
                  : "bg-white text-gray-700",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchesFilter;
