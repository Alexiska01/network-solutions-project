import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CatalogNavigation from "@/components/CatalogNavigation";
import SwitchCard from "@/components/SwitchCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { switchesData, SwitchModel, categoryLabels } from "@/data/switchesData";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SwitchesCatalogProps {
  data?: SwitchModel[];
}

interface SimplePaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const SimplePagination = ({
  page,
  onPageChange,
  totalPages,
}: SimplePaginationProps) => {
  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePageClick =
    (pageNum: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onPageChange(pageNum);
    };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            aria-disabled={page <= 1}
            style={{ pointerEvents: page <= 1 ? "none" : "auto" }}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              onClick={handlePageClick(pageNum)}
              isActive={pageNum === page}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            aria-disabled={page >= totalPages}
            style={{ pointerEvents: page >= totalPages ? "none" : "auto" }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const SwitchesCatalog = ({ data = switchesData }: SwitchesCatalogProps) => {
  const isMobile = useIsMobile();

  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(
    () =>
      data.filter((sw) =>
        Object.entries(filters).every(([k, v]) => {
          if (k === "category") return sw.category === v;
          if (k === "ports") return sw.specs.ports === v;
          if (k === "power") return sw.specs.power === v;
          return true;
        })
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
            onNavigate={(sectionId) => {
              setFilters({ category: sectionId });
              setPage(1);
            }}
            activeSection={filters.category}
          />
        </aside>
      )}

      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Коммутаторы</h1>
          <p className="text-gray-600">
            Полный каталог коммутаторов для корпоративных сетей и центров обработки данных
          </p>
        </div>

        {isMobile && (
          <div className="mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Фильтры
                </Button>
              </DialogTrigger>
              <DialogContent className="w-80">
                <CatalogNavigation
                  onNavigate={(sectionId) => {
                    setFilters({ category: sectionId });
                    setPage(1);
                  }}
                  activeSection={filters.category}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}

        {filters.category && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Категория:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                {categoryLabels[filters.category as keyof typeof categoryLabels]}
              </span>
              <button
                onClick={() => {
                  setFilters({});
                  setPage(1);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Сбросить
              </button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-gray-500">Найдено {filtered.length} коммутаторов</p>
        </div>

        <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-3 gap-6"}>
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

        {pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <SimplePagination
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              totalPages={pageCount}
            />
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Коммутаторы не найдены</p>
            <p className="text-gray-400 text-sm mt-2">
              Попробуйте изменить фильтры или сбросить их
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SwitchesCatalog;