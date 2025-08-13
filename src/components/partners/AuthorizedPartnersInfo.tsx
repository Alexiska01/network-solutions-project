// AuthorizedPartnersInfo.tsx
import { useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./AuthorizedPartnersInfo.css";

const ICONS = ["Shield", "Truck", "CheckCircle", "Award", "Settings"] as const;
type IconName = typeof ICONS[number];

type Benefit = {
  icon: IconName;
  title: string;
  description: string;
};

type ObserveFn = (el: Element | null, i?: number) => void;

const benefits: Benefit[] = [
  { icon: "Shield", title: "Экспертная поддержка", description: "Поддержка от специалистов, обученных нашим технологиям" },
  { icon: "Truck", title: "Логистическая эффективность", description: "Оперативные поставки и логистическая прозрачность" },
  { icon: "CheckCircle", title: "Корпоративные стандарты", description: "Соответствие корпоративным стандартам и требованиям безопасности" },
  { icon: "Award", title: "Техническая поддержка", description: "Гарантийное и постгарантийное обслуживание, сервисный центр" },
  { icon: "Settings", title: "Полный цикл решений", description: "Комплексный подход — от техпроекта до внедрения и запуска решений" },
];

function BenefitCard({
  benefit,
  index,
  observe,
}: {
  benefit: Benefit;
  index: number;
  observe?: ObserveFn;   // <-- опциональный, но уже не обязателен
}) {
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    observe?.(ref.current, index);
  }, [observe, index]);

  return (
    <li
      ref={ref}
      className={[
        "partner-card group bg-white rounded-xl md:rounded-2xl p-4 md:p-6",
        "shadow-sm border border-gray-100",
        "transition duration-500 will-change-transform",
        "hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
        "reveal-once", // всегда анимируем на маунте
      ].join(" ")}
      style={{ animationDelay: `${index * 140}ms` }} // стаггер по индексу
    >
      <div className="lift-icon w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-transform duration-300">
        <Icon name={benefit.icon} className="text-white" size={18} />
      </div>

      <h3 className="font-montserrat font-semibold text-sm md:text-base text-[#0A1F44] mt-3 md:mt-4 mb-1 md:mb-2">
        {benefit.title}
      </h3>
      <p className="font-montserrat font-normal text-xs md:text-sm text-[#333] mt-1 md:mt-2 leading-relaxed">
        {benefit.description}
      </p>
    </li>
  );
}

export default function AuthorizedPartnersInfo() {
  const sr = useScrollReveal?.({ staggerDelay: 140 }) as
    | { observeElement: ObserveFn }
    | undefined;
  const observeElement = sr?.observeElement;

  return (
    <section
      aria-labelledby="partners-benefits-heading"
      className="py-10 md:py-16 bg-gradient-to-r from-blue-900/10 via-blue-600/10 to-teal-500/10"
    >
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
        <header className="text-center mb-8 md:mb-12">
          <h2
            id="partners-benefits-heading"
            className="font-montserrat font-extrabold text-lg md:text-2xl text-[#0A1F44]"
          >
            Возможности партнёров iDATA
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Станьте частью экосистемы iDATA и получите доступ к эксклюзивным возможностям
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6" role="list">
          {benefits.map((b, i) => (
            <BenefitCard
              key={b.title}
              benefit={b}
              index={i}
              observe={observeElement}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
