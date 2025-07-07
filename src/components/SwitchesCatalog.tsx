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
import { SwitchModel } from "@/types/models";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SwitchesCatalogProps {
  data: SwitchModel[];
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
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page < totalPages) {
      onPageChange(page + 1);
    }
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

const SwitchesCatalog = ({ data }: SwitchesCatalogProps) => {
  const isMobile = useIsMobile();

  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(
    () =>
      data.filter((sw) =>
        Object.entries(filters).every(([k, v]) => {
          if (k === "category") return sw.category === v;
          if (k === "poe") return sw.poe === v;
          if (k === "layer3") return sw.layer3.toString() === v;
          return true;
        }),
      ),
    [data, filters],
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.ceil(filtered.length / pageSize);

  return (
    <div className="flex">
      {!isMobile && (
        <aside className="w-64 pr-6">
          <CatalogNavigation
            onNavigate={(sectionId: string) => {
              setFilters((prev) => ({ ...prev, category: sectionId }));
              setPage(1);
            }}
            activeSection={filters.category}
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
                  onNavigate={(sectionId: string) => {
                    setFilters((prev) => ({ ...prev, category: sectionId }));
                    setPage(1);
                  }}
                  activeSection={filters.category}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div
          className={
            isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-3 gap-6"
          }
        >
          {paged.map((sw) => (
            <SwitchCard
              key={sw.id}
              switchData={sw}
              onSpecFilter={(k: string, v: string) => {
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
              onPageChange={(newPage: number) => setPage(newPage)}
              totalPages={pageCount}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default SwitchesCatalog;
