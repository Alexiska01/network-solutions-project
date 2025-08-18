import { useEffect, useRef, useState, useCallback } from "react";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";
import { useInViewAnimate } from "@/hooks/useInViewAnimate";
import "./KeyFeatures3530.css";

type Feature = {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
};

const FEATURES: Feature[] = [
  {
    title: "Объединение устройств в стек",
    description:
      "Объединяет в одно логическое устройство до 8 коммутаторов. Для стекирования используются стандартные порты 10G SFP+.",
    icon: "GitBranch",
  },
  {
    title: "PoE/PoE+ для питания устройств",
    description:
      "Обеспечивает возможность подачи электропитания на подключаемые устройства, такие как: точки доступа, телефоны, видеокамеры и другие типы устройств.",
    icon: "Zap",
  },
  {
    title: "Технологии высокой доступности",
    description:
      "Из семейства Spanning Tree, таких как STP, RSTP и MSTP. Кроме того, для работы в кольцевых топологиях поддерживается ITU-T G.8032.",
    icon: "Activity",
  },
  {
    title: "Быстрая начальная настройка",
    description:
      "Благодаря интегрированной поддержке технологии ZTP можно просто и быстро добавить новый коммутатор к существующей сети без участия сетевого администратора.",
    icon: "Wrench",
  },
  {
    title: "Технология MPLS",
    description:
      "Поддержка технологии MPLS позволяет использовать коммутаторы серии в качестве пограничных устройств в сетях операторов услуг связи.",
    icon: "Network",
  },
  {
    title: "Статическая и динамическая маршрутизация",
    description:
      "Коммутаторы поддерживают статическую и динамическую маршрутизацию для IPv4 и IPv6.",
    icon: "Route",
  },
  {
    title: "Информационная безопасность",
    description:
      "Для аутентификации пользователей и разграничения прав доступа к сетевым ресурсам используется технология 802.1X и списки доступа (ACL).",
    icon: "Shield",
  },
  {
    title: "Функции сетевого управления",
    description:
      "Для удалённого управления устройствами поддерживается использование технологий: SNMPv2 и v3; Netconf и Yang; RMON и SYSLOG, а также Telnet и SSH.",
    icon: "Settings",
  },
  {
    title: "Поддержка технологий IPv4 и IPv6",
    description:
      "Коммутаторы серии могут быть использованы как при построении IPv4 или IPv6 сетей, так и смешанных сетях с использованием обеих версий протокола.",
    icon: "Globe",
  },
  {
    title: "Механизмы качества обслуживания",
    description:
      "Коммутаторы поддерживают восемь очередей на каждом порту устройства и возможность использования алгоритмов SP, RR, WRR и WDRR для управления очередями. Классификация и приоритезация трафика может быть выполнена на основе полей 802.1p, CoS и DSCP.",
    icon: "Gauge",
  },
];

const FeatureCard = (
  { feature, index, visible, cardRef }: { feature: Feature; index: number; visible: boolean; cardRef: (el: HTMLDivElement | null) => void }
) => (
  <div
    ref={cardRef}
    className={`kf3530-card ${visible ? "is-visible" : "is-hidden"}`}
    data-index={index}
    style={{ "--stagger-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="kf3530-icon-wrap">
        <Icon name={feature.icon} size={18} className="kf3530-icon" />
      </div>
      <div className="flex-1">
        <h3 className="kf3530-title">{feature.title}</h3>
        <p className="kf3530-desc">{feature.description}</p>
      </div>
    </div>
  </div>
);

const KeyFeatures3530 = () => {
  const { ref, inView } = useInViewAnimate(0.05);
  const [refreshTier, setRefreshTier] = useState<string | null>(null);
  const [animationCycle, setAnimationCycle] = useState(0); // для повторного запуска

  // Построчное появление
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [rowSize, setRowSize] = useState<number>(() => (window.innerWidth >= 768 ? 2 : 1));

  // Отслеживаем изменение брейкпоинта чтобы корректно группировать строки
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setRowSize(mq.matches ? 2 : 1);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const revealRow = useCallback((index: number) => {
    setVisibleSet(prev => {
      if (prev.has(index)) return prev; // уже раскрыта строка через один из элементов
      const next = new Set(prev);
      const start = Math.floor(index / rowSize) * rowSize;
      for (let i = 0; i < rowSize; i++) {
        const idx = start + i;
        if (idx < FEATURES.length) next.add(idx);
      }
      return next;
    });
  }, [rowSize]);

  // Инициализация IntersectionObserver (следим за каждой карточкой)
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.dataset.index || '0', 10);
            revealRow(idx);
            observerRef.current?.unobserve(el); // не наблюдаем дальше
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
  cardRefs.current.forEach(el => el && observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [rowSize, animationCycle, revealRow]);

  // Возможность вручную перезапустить анимацию (для отладки ощущения плавности)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Нажмите R (без модификаторов) чтобы перезапустить
      if (e.key.toLowerCase() === 'r') {
        setVisibleSet(new Set());
        setAnimationCycle(c => c + 1); // key перерисовка
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Определяем эффективную частоту обновления и адаптируем длительности
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
  className={`kf3530-section ${inView ? "is-visible" : "is-hidden"} ${refreshTier || ""}`}
      data-animated={inView}
      data-refresh-tier={refreshTier || "pending"}
    >
      <div className="kf3530-header">
        <h2 className="kf3530-heading">Ключевые характеристики коммутаторов серии</h2>
        <div className="kf3530-heading-underline" />
      </div>
      <div className="kf3530-grid">
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title + '-' + animationCycle}
            feature={feature}
            index={i}
            visible={visibleSet.has(i)}
            cardRef={el => (cardRefs.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures3530;