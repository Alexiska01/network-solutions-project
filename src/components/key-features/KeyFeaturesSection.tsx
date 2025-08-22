import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";
import { useInViewAnimate } from "@/hooks/useInViewAnimate";
import "@/components/key-features/KeyFeatures.css";

export type KeyFeatureItem = {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
};

type Props = {
  features: KeyFeatureItem[];
  heading: string;
  className?: string;
};

const FeatureCard: React.FC<{
  feature: KeyFeatureItem;
  index: number;
  visible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}> = ({ feature, index, visible, cardRef }) => (
  <div
    ref={cardRef}
    className={`kf-card ${visible ? "is-visible" : "is-hidden"}`}
    data-index={index}
    style={{ "--stagger-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="kf-icon-wrap">
        <Icon name={feature.icon} size={18} className="kf-icon" />
      </div>
      <div className="flex-1">
        <h3 className="kf-title">{feature.title}</h3>
        <p className="kf-desc">{feature.description}</p>
      </div>
    </div>
  </div>
);

const KeyFeaturesSection: React.FC<Props> = ({ features, heading, className }) => {
  const { ref, inView } = useInViewAnimate(0.05);
  const [refreshTier, setRefreshTier] = useState<string | null>(null);
  const [animationCycle, setAnimationCycle] = useState(0);

  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [rowSize, setRowSize] = useState<number>(() => (typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setRowSize(mq.matches ? 2 : 1);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const revealRow = useCallback(
    (index: number) => {
      setVisibleSet((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        const start = Math.floor(index / rowSize) * rowSize;
        for (let i = 0; i < rowSize; i++) {
          const idx = start + i;
          if (idx < features.length) next.add(idx);
        }
        return next;
      });
    },
    [rowSize, features.length]
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.dataset.index || "0", 10);
            revealRow(idx);
            observerRef.current?.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    cardRefs.current.forEach((el) => el && observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [rowSize, animationCycle, revealRow]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") {
        setVisibleSet(new Set());
        setAnimationCycle((c) => c + 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    let frameTimes: number[] = [];
    let last = performance.now();
    let count = 0;
    let rafId: number;
    const measure = (now: number) => {
      const delta = now - last;
      last = now;
      if (count > 0) frameTimes.push(delta);
      count++;
      if (count < 28) {
        rafId = requestAnimationFrame(measure);
      } else {
        const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length || 16.67;
        const hz = 1000 / avg;
        let tier: string;
        if (hz >= 220) tier = "hz-240";
        else if (hz >= 180) tier = "hz-180";
        else if (hz >= 160) tier = "hz-165";
        else if (hz >= 120) tier = "hz-120";
        else if (hz >= 90) tier = "hz-90";
        else tier = "hz-60";
        setRefreshTier(tier);
      }
    };
    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={ref}
      className={`kf-section ${inView ? "is-visible" : "is-hidden"} ${refreshTier || ""} ${className || ""}`}
      data-animated={inView}
      data-refresh-tier={refreshTier || "pending"}
    >
      <div className="kf-header">
        <h2 className="kf-heading">{heading}</h2>
        <div className="kf-heading-underline" />
      </div>
      <div className="kf-grid">
        {features.map((feature, i) => (
          <FeatureCard
            key={feature.title + "-" + animationCycle}
            feature={feature}
            index={i}
            visible={visibleSet.has(i)}
            cardRef={(el) => (cardRefs.current[i] = el)}
          />)
        )}
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
