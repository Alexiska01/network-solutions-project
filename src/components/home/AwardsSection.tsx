import Icon from "@/components/ui/icon";
import { SafeImage } from "@/components/ui/safe-image";
import { useEffect, useRef, useState } from "react";

const AwardsSection: React.FC = () => {
  // Viewport visibility
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Disable hover sheen on touch devices
  const [isHoverCapable, setIsHoverCapable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryList | MediaQueryListEvent) => setIsHoverCapable((e as MediaQueryList).matches ?? (e as any).matches);
    handler(mq);
    mq.addEventListener?.("change", handler as any);
    return () => mq.removeEventListener?.("change", handler as any);
  }, []);

  return (
  <section ref={sectionRef} className="relative overflow-hidden py-10 sm:py-12 md:py-14 bg-gradient-to-b from-transparent via-gray-50/30 to-white">
      {/* subtle decorative overlay (same style as FeaturesSection) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-100/35 via-blue-50/30 to-teal-50/20 pointer-events-none"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-center">
          {/* Glass badge card (keep as-is), but embed the previous brand gradient into the card background */}
          <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_12px_48px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.10),0_20px_56px_rgba(0,0,0,0.08)] transition-all duration-500 group overflow-hidden transform will-change-transform ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.992]'} `}>
            {/* glass inner glows */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.14),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" aria-hidden="true" />
            {/* top sheen */}
            <div className="absolute inset-x-0 top-0 h-1/2 rounded-2xl sm:rounded-3xl bg-[linear-gradient(to_bottom,rgba(255,255,255,0.38),rgba(255,255,255,0.12),transparent)] pointer-events-none" aria-hidden="true" />
            {/* moving hover sheen (only on hover-capable devices) */}
            {isHoverCapable && (
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-[-60%] h-full w-[220%] -rotate-6 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.20)_40%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.20)_60%,rgba(255,255,255,0)_100%)] translate-x-[-30%] group-hover:translate-x-[30%] transition-transform duration-700 ease-out"></div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/40" />
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[260px] h-[90px] sm:h-[110px] md:h-[120px]">
                <SafeImage
                  src="/img/sk.png"
                  alt="Skolkovo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain select-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>

      {/* Supporting copy (switch to dark text on light background) */}
          <div className={`text-gray-900 text-[0.95rem] sm:text-base leading-relaxed transform transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}> 
            <p>
              С 2025 года наша компания получила статус резидента инновационного центра «Сколково». Это признание подтверждает инновационный характер наших решений и открывает доступ к уникальной экосистеме развития технологий.
            </p>
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="/img/Sk.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-800 underline-offset-4 hover:underline transition-colors"
              >
                <Icon name="FileText" size={16} className="opacity-80" />
                PDF‑выписка
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
