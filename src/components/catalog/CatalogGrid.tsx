import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import SwitchCard from "@/components/SwitchCard";
import type { SwitchModel } from "@/data/switchesData";
import SwitchesSearch from "@/components/SwitchesSearch";
import s from "./CatalogGrid.module.css";
// Удалены иконки Cloud и Layers по требованию — визуальные бейджи больше не нужны.

/* ===== Types ===== */
interface GroupedSwitches {
  corporateAccess: SwitchModel[];
  corporateDistribution: SwitchModel[];
  dataCenterSpine: SwitchModel[];
  dataCenterLeaf: SwitchModel[];
}
interface CatalogGridProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  groupedSwitches: GroupedSwitches;
}

/* ===== Refresh-rate detector (JS, без frамер-моушн) ===== */
function detectRefreshRateBucket(): Promise<"hz60"|"hz120"|"hz144"|"hz165"|"hz240"|"hz244"> {
  // Быстрый замер ~18 кадров (меньше нагрузки)
  const samples = 18;
  const times: number[] = [];
  let last = performance.now();
  let count = 0;

  return new Promise((resolve) => {
    function step(now: number) {
      times.push(now - last);
      last = now;
      count++;
      if (count < samples) {
        requestAnimationFrame(step);
      } else {
        // Отбрасываем первый/последний как шум
        const useful = times.slice(1, -1);
        const avg = useful.reduce((a, b) => a + b, 0) / useful.length; // ms per frame
        const hz = 1000 / avg;

        // Приблизим к поддерживаемым корзинам
        const buckets = [
          { c: "hz60", v: 60 },
          { c: "hz120", v: 120 },
          { c: "hz144", v: 144 },
          { c: "hz165", v: 165 },
          { c: "hz240", v: 240 },
          { c: "hz244", v: 244 },
        ] as const;

        let best: (typeof buckets)[number] = buckets[0];
        let bestDiff = Math.abs(hz - best.v);
        for (let i = 1; i < buckets.length; i++) {
          const d = Math.abs(hz - buckets[i].v);
          if (d < bestDiff) { best = buckets[i]; bestDiff = d; }
        }
        resolve(best.c);
      }
    }
    requestAnimationFrame(step);
  });
}

/* ===== Reveal (IntersectionObserver) ===== */
function useRevealOnce<T extends HTMLElement>(staggerFrames = 6) {
  const refs = useRef<T[]>([]);
  const set = (el: T | null, i: number) => {
    if (el) {
      refs.current[i] = el;
      el.style.setProperty("--i", String(i)); // индекс для задержки
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      refs.current.forEach((el) => el?.classList.add(s.revealed));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {          // безопасно добавляем модульный класс или fallback на строковый
          const revealedClass = s.revealed || "revealed";
          el.classList.add(revealedClass);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
    );
    refs.current.forEach((el) => {
      if (el) {
        // Стаггер через CSS-переменную: --delay = --i * --stagger
        el.style.setProperty("--stagger", String(staggerFrames)); // в кадрах
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [staggerFrames]);

  return set;
}

/* ===== Component ===== */
const CatalogGrid = ({ searchTerm, onSearchChange, groupedSwitches }: CatalogGridProps) => {
  const isMobile = useIsMobile();

  // Герцовка → класс на корневой
  const [hzClass, setHzClass] = useState<"hz60"|"hz120"|"hz144"|"hz165"|"hz240"|"hz244">("hz60");
  useEffect(() => {
    let mounted = true;
    if (typeof window === "undefined") return;
    (async () => {
      try {
        const c = await detectRefreshRateBucket();
        if (mounted) setHzClass(c);
      } catch {
        // fallback оставляем hz60
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Ревил карточек
  const setCorporateRef = useRevealOnce<HTMLDivElement>(6);
  // Единый реф для дата-центра (spine + leaf вместе)
  const setDataCenterRef = useRevealOnce<HTMLDivElement>(6);

  // Утилита для заголовков / секций — небольшой reveal тоже
  const sectionClass = cn(s.section, s.revealBase);

  return (
    <div className={cn(s.root, s[hzClass], "flex-1")}>
      {/* Поиск */}
  <div className={cn("mb-5 sm:mb-7", isMobile && "px-1.5")}> 
        <SwitchesSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>

      {/* Корпоративные ЛВС */}
  <section id="corporate-lan" className={cn("mb-10 sm:mb-14", isMobile && "px-1.5")}> 
        <div className={sectionClass}>
          <div className={cn("mb-4", isMobile ? "text-center" : "")}> 
            <h2 className={cn(
              "font-bold text-gray-900",
              isMobile
                ? "text-xl tracking-tight leading-snug whitespace-nowrap"
                : "text-2xl sm:text-3xl"
            )}>Коммутаторы для корпоративных ЛВС</h2>
          </div> 
        </div>

        {/* Объединённая сетка: access + distribution */}
        { (groupedSwitches.corporateAccess.length + groupedSwitches.corporateDistribution.length) > 0 && (
          <div id="corporate-all" className={cn("mb-10 sm:mb-12", isMobile && "px-2")}> 
            <div className={cn(s.cardGroup, !isMobile && "tabletGrid", isMobile ? "tight" : "", !isMobile && "gap-y-6") }>
              {[...groupedSwitches.corporateAccess, ...groupedSwitches.corporateDistribution].map((sw, i) => (
                <div key={sw.id} ref={(el) => setCorporateRef(el, i)} className={cn(s.cardReveal, s.cardShell)}>
                  <div className={s.cardInner}>
                    <SwitchCard switchData={sw} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {(groupedSwitches.dataCenterSpine.length + groupedSwitches.dataCenterLeaf.length) > 0 && (
      <div id="datacenter-all" className={cn("mb-10 sm:mb-12", isMobile && "px-2", s.groupSpacing)}>
            <div className={sectionClass}>
        <h2 className={cn(
          "font-bold text-gray-900",
          s.spineHeadingSpacing,
          isMobile
            ? "text-xl tracking-tight leading-snug whitespace-nowrap text-center"
            : "text-2xl sm:text-3xl"
        )}>Коммутаторы для центров обработки</h2>
            </div>

            <div className={cn(s.cardGroup, !isMobile && "tabletGrid", isMobile ? "tight" : "", !isMobile && "gap-y-6") }>
              {[...groupedSwitches.dataCenterSpine, ...groupedSwitches.dataCenterLeaf].map((sw, i) => ( 
                <div
                  key={sw.id}
                  ref={(el) => setDataCenterRef(el, i)}
                  className={cn(s.cardReveal, s.cardShell)}
                >
                  <div className={s.cardInner}>
                    <SwitchCard switchData={sw} />
                  </div>
                </div>
              ))}
            </div> 
          </div>
        )}
      </section>
    </div>
  );
};

export default CatalogGrid;
