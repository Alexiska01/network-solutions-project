import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import SwitchCard from "@/components/SwitchCard";
import type { SwitchModel } from "@/data/switchesData";
import SwitchesSearch from "@/components/SwitchesSearch";
import s from "./CatalogGrid.module.css";
import { Building, Server, Shield, Twitch as SwitchIcon, Cloud, Layers } from "lucide-react";

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
  const setAccessRef = useRevealOnce<HTMLDivElement>(6);
  const setDistribRef = useRevealOnce<HTMLDivElement>(6);
  const setSpineRef = useRevealOnce<HTMLDivElement>(6);
  const setLeafRef = useRevealOnce<HTMLDivElement>(6);

  // Утилита для заголовков / секций — небольшой reveal тоже
  const sectionClass = cn(s.section, s.revealBase);

  return (
    <div className={cn(s.root, s[hzClass], "flex-1")}>
      {/* Поиск */}
      <div className={cn("mb-6 sm:mb-8", isMobile && "px-1")}>
        <SwitchesSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>

      {/* Корпоративные ЛВС */}
      <section id="corporate-lan" className={cn("mb-12 sm:mb-16", isMobile && "px-1")}>
        <div className={sectionClass}>
          <div className={cn("flex flex-col gap-3 mb-4", !isMobile && "sm:flex-row sm:items-center sm:gap-4")}>
            <div className={s.badgeBlue}>
              <Building className="text-white" style={{ width: 18, height: 18 }} />
            </div>
            <div className={cn(isMobile && "text-center")}>
              <h2 className={cn("font-bold text-gray-900", isMobile ? "text-2xl leading-tight" : "text-2xl sm:text-3xl")}>
                Коммутаторы для корпоративных ЛВС
              </h2>
            </div>
          </div>
        </div>

        {/* Доступ */}
        {groupedSwitches.corporateAccess.length > 0 && (
          <div id="access-level" className={cn("mb-10 sm:mb-12", isMobile && "px-2")}>
            <div className={sectionClass}>
              <div className={cn("flex items-center gap-3 mb-5 sm:mb-6", isMobile && "justify-center")}>
                <div className={s.badgeCyan}>
                  <SwitchIcon className="text-white" style={{ width: 18, height: 18 }} />
                </div>
                <h3 className={cn("font-bold text-gray-800", isMobile ? "text-xl text-center" : "text-xl sm:text-2xl")}>
                  Коммутаторы уровня доступа
                </h3>
              </div>
            </div>

            <div className={cn(isMobile ? "space-y-4" : "space-y-6", s.cardGroup)}>
              {groupedSwitches.corporateAccess.map((sw, i) => (
                <div
                  key={sw.id}
                  ref={(el) => setAccessRef(el, i)}
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

        {/* Распределение */}
        {groupedSwitches.corporateDistribution.length > 0 && (
          <div id="distribution-level" className={cn(isMobile && "px-2")}> 
            <div className={sectionClass}> 
              <div className={cn("flex items-center gap-3 mb-5 sm:mb-6", isMobile && "justify-center")}> 
                <div className={s.badgeIndigo}> 
                  <Shield className="text-white" style={{ width: 18, height: 18 }} /> 
                </div> 
                <h3 className={cn("font-bold text-gray-800", isMobile ? "text-xl text-center" : "text-2xl")}> 
                  Коммутаторы уровня распределения 
                </h3> 
              </div> 
            </div> 

            <div className={cn(isMobile ? "space-y-4" : "space-y-6", s.cardGroup)}> 
              {groupedSwitches.corporateDistribution.map((sw, i) => ( 
                <div 
                  key={sw.id} 
                  ref={(el) => setDistribRef(el, i)} 
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

      {/* ЦОД */}
      <section id="data-center" className={cn("mb-12 sm:mb-16", isMobile && "px-1")}>
        <div className={sectionClass}>
          <div className={cn("flex gap-4 mb-4", isMobile ? "flex-col items-center text-center" : "items-center")}>
            <div className={s.badgePurpleXL}>
              <Server className="text-white" style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h2 className={cn("font-bold text-gray-900", isMobile ? "text-2xl" : "text-3xl")}>
                Центры обработки данных
              </h2>
            </div>
          </div>
        </div>

        {/* Spine */}
        {groupedSwitches.dataCenterSpine.length > 0 && (
          <div id="spine-level" className={cn("mb-10 sm:mb-12", isMobile && "px-2")}>
            <div className={sectionClass}>
              <div className={cn("flex items-center gap-3 mb-5 sm:mb-6", isMobile && "justify-center")}>
                <div className={s.badgePurple}>
                  <Cloud className="text-white" style={{ width: 18, height: 18 }} />
                </div>
                <h3 className={cn("font-bold text-gray-800", isMobile ? "text-xl" : "text-2xl")}>Spine</h3>
              </div>
            </div>

            <div className={cn(isMobile ? "space-y-4" : "space-y-6", s.cardGroup)}> 
              {groupedSwitches.dataCenterSpine.map((sw, i) => ( 
                <div 
                  key={sw.id} 
                  ref={(el) => setSpineRef(el, i)} 
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

        {/* Leaf */}
        {groupedSwitches.dataCenterLeaf.length > 0 && (
          <div id="leaf-level" className={cn(isMobile && "px-2")}>
            <div className={sectionClass}>
              <div className={cn("flex items-center gap-3 mb-5 sm:mb-6", isMobile && "justify-center")}>
                <div className={s.badgeEmerald}>
                  <Layers className="text-white" style={{ width: 18, height: 18 }} />
                </div>
                <h3 className={cn("font-bold text-gray-800", isMobile ? "text-xl" : "text-2xl")}>Leaf</h3>
              </div>
            </div>

            <div className={cn(isMobile ? "space-y-4" : "space-y-6", s.cardGroup)}> 
              {groupedSwitches.dataCenterLeaf.map((sw, i) => ( 
                <div 
                  key={sw.id} 
                  ref={(el) => setLeafRef(el, i)} 
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
