import React, { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CatalogNavigation from "@/components/CatalogNavigation";
import SwitchCard from "@/components/SwitchCard";
import { Pagination } from "@/components/ui/pagination";
import { SwitchModel } from "@/types/models";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SwitchesCatalogProps {
  data: SwitchModel[];
}

const SwitchesCatalog: React.FC<SwitchesCatalogProps> = ({ data }) => {
  const isMobile = useIsMobile();

  // Состояние фильтров
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  // Состояние текущей страницы
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Фильтрация
  const filtered = useMemo(
    () =>
      data.filter((sw) =>
        Object.entries(filters).every(([k, v]) => {
          if (k === "ports") return sw.specs.ports === v;
          if (k === "power") return sw.specs.power === v;
          if (k === "features") return sw.specs.tags?.includes(v);
          return true;
        }),
      ),
    [data, filters],
  );

  // Пагинация
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.ceil(filtered.length / pageSize);

  return (
    <div className="flex">
      {/** На десктопе — обычное боковое меню */}
      {!isMobile && (
        <aside className="w-64 pr-6">
          <CatalogNavigation
            activeFilters={filters}
            onChange={(key, val) =>
              setFilters((prev) => ({ ...prev, [key]: val }))
            }
          />
        </aside>
      )}

      <main className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Коммутаторы</h1>

          {/** На мобильных — кнопка открытия фильтров */}
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
                  onChange={(key, val) => {
                    setFilters((prev) => ({ ...prev, [key]: val }));
                    setPage(1);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/** Сетка карточек: 1 колонка на мобилках, 3 на десктопе */}
        <div
          className={
            isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-3 gap-6"
          }
        >
          {paged.map((sw) => (
            <SwitchCard
              key={sw.id}
              switchData={sw}
              onSpecFilter={(k, v) => {
                setFilters((prev) => ({ ...prev, [k]: v }));
                setPage(1);
              }}
            />
          ))}
        </div>

        {/** Пагинация */}
        {pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
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
