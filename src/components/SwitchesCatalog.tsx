import React, { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CatalogNavigation from "@/components/CatalogNavigation";
import SwitchCard from "@/components/SwitchCard";
import PaginationWrapper from "@/components/PaginationWrapper";
import { SwitchModel } from "@/types";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SwitchesCatalogProps {
  data: SwitchModel[];
}

const SwitchesCatalog: React.FC<SwitchesCatalogProps> = ({ data }) => {
  const isMobile = useIsMobile();

  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const handleFilterChange = (key: string, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
    setPage(1);
  };

  const handleNavigate = (sectionId: string) => {
    // Например, фильтрация по серии
    setFilters((prev) => ({ ...prev, series: sectionId }));
    setPage(1);
  };

  const filtered = useMemo(
    () =>
      data.filter((sw) =>
        Object.entries(filters).every(([k, v]) => String((sw as any)[k]) === v)
      ),
    [data, filters]
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.ceil(filtered.length / pageSize);

  return (
    <div className="flex">
      {!isMobile && (
        <aside className="w-64 pr-6">
          <CatalogNavigation
            activeFilters={filters}
            onChange={handleFilterChange}
            onNavigate={handleNavigate}
          />
        </aside>
      )}

      <main className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Коммутаторы</h1>

          {isMobile && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Фильтры
                </Button>
              </DialogTrigger>
              <DialogContent className="w-80">
                <CatalogNavigation
                  activeFilters={filters}
                  onChange={handleFilterChange}
                  onNavigate={handleNavigate}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-3 gap-6"}>
          {paged.map((sw) => (
            <SwitchCard
              key={sw.id}
              switchData={sw}
              onSpecFilter={(k, v) => handleFilterChange(k, v)}
            />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <PaginationWrapper
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              totalPages={pageCount}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default SwitchesCatalog;
