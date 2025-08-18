import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import "./ProductsSection.css";

// Данные продуктов (3 карточки отключены)
const products = [
  {
  title: "Коммутаторы",
    description: "Гибкое управление сетями с корпоративными L3-коммутаторами",
    detailedInfo:
      "Профессиональные решения для масштабируемых корпоративных сетей с расширенными возможностями мониторинга и безопасности.",
    features: [
      "Коммутаторы для корпоративных ЛВС и ЦОД",
      "Резервирование ключевых компонентов",
      "Поддержка современных технологий и протоколов",
    ],
    icon: "Network",
    gradientPosition: "from-blue-600 to-blue-700",
    href: "/switches",
  },
  {
  title: "Маршрутизаторы",
    description: "Высокопроизводительные решения для филиальных сетей",
    detailedInfo:
      "Надёжные маршрутизаторы для стабильного подключения удалённых офисов с поддержкой современных протоколов безопасности.",
    features: [
      "Маршрутизаторы для корпоративных сетей связи",
      "Маршрутизация IPv4 и IPv6",
      "Поддержка MPLS и DVPN",
    ],
    icon: "Router",
    gradientPosition: "from-blue-700 to-blue-800",
    href: "/routers",
  disabled: true,
  },
  {
    title: "Беспроводные сети связи",
    description: "Enterprise-класс точки доступа и контроллеры Wi-Fi 6",
    detailedInfo:
      "Современные беспроводные системы с поддержкой Wi-Fi 6/6E для высокой пропускной способности и надёжности.",
    features: [
      "Поддержка технологии WiFi7",
      "Точки беспроводного доступа и контроллеры",
      "Распределенная архитектура решения",
    ],
    icon: "Wifi",
    gradientPosition: "from-blue-800 to-teal-600",
    href: "/wireless",
  disabled: true,
  },
  {
    title: "Система управления",
    description: "Централизованные платформы для управления инфраструктурой",
    detailedInfo:
      "Комплексные решения для мониторинга, автоматизации и интеграции сетевой инфраструктуры.",
    features: [
      "Мониторинг сетевого оборудования",
      "Управление конфигурациями и прошивками",
      "Быстрая начальная настройка устройств",
    ],
    icon: "Settings",
    gradientPosition: "from-teal-600 to-teal-500",
    href: "/management",
  disabled: true,
  },
];

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Глобальная видимость секции (для потенц. хедера/фоновых эффектов)
  const [sectionVisible, setSectionVisible] = useState(false);
  // Индивидуальная видимость карточек
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => new Array(products.length).fill(false));
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const firstRevealRef = useRef<number | null>(null);

  // Observer для самой секции (фон/декор по необходимости)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setSectionVisible(true);
    }, { threshold: 0.15, rootMargin: '-80px 0px -60px 0px' });
    if (sectionRef.current) observer.observe(sectionRef.current);
    const to = setTimeout(() => { if (!sectionVisible) setSectionVisible(true); }, 1800);
    return () => { observer.disconnect(); clearTimeout(to); };
  }, [sectionVisible]);

  // Индивидуальное появление карточек с каскадом
  useEffect(() => {
    // Синхронизация длины массива при изменении products (на будущее)
    if (visibleCards.length !== products.length) {
      setVisibleCards(new Array(products.length).fill(false));
    }
    const opts = { threshold: 0.25, rootMargin: '-40px 0px -40px 0px' };
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const ob = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        // Фиксируем момент первого появления любой карточки
        if (firstRevealRef.current === null) firstRevealRef.current = performance.now();
        // Если уже отмечена — выходим
        setVisibleCards(prev => {
          if (prev[idx]) return prev;
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        ob.disconnect();
      }, opts);
      ob.observe(el);
      observers.push(ob);
    });
    // Fallback: если пользователь загрузил страницу дальше по скроллу и всё уже в зоне
    const failSafe = setTimeout(() => {
      setVisibleCards(prev => prev.map(v => v || sectionVisible));
    }, 1600);
    return () => { observers.forEach(o => o.disconnect()); clearTimeout(failSafe); };
  }, [sectionVisible, visibleCards.length]);

  return (
    <section
      ref={sectionRef}
      className="products-section relative overflow-hidden flex items-center"
      data-fit4="on"
    >
      <div className="products-section__bg pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
  <div className="products-section__grid grid gap-5 sm:gap-6 lg:gap-8 lg:max-w-6xl lg:mx-auto xl:max-w-7xl">
          {products.map((product, index) => {
            const threeFeatures = product.features.slice(0, 3);

            return (
              <article
                key={index}
                ref={el => { cardRefs.current[index] = el; }}
                className={`feature-card group bg-white rounded-xl md:rounded-3xl transition-all duration-400 ease-premium hover:-translate-y-[2px] ${visibleCards[index] ? 'feature-card-visible' : 'feature-card-hidden'}`}
                style={{ '--feature-index': index } as React.CSSProperties}
                data-product-title={product.title}
                data-pos={index}
                aria-hidden={!visibleCards[index]}
              >
                {/* Растянутая ссылка только если не disabled */}
                {!product.disabled && (
                  <Link
                    to={product.href}
                    className="stretched-link"
                    aria-label={`Открыть: ${product.title}`}
                    tabIndex={-1}
                  />
                )}

                <div className="feature-card__overlay pointer-events-none" />

                <div className="feature-card__content">
                  {/* Шапка */}
                  <header className="card__head">
                    <div className="card__icon">
                      <div className="card__icon-bg">
                        <Icon name={product.icon as any} size={28} className="text-white" />
                      </div>
                    </div>
                    <div className="card__titles">
                      <h3 className="card__title" title={product.title}>
                        {product.title}
                        {product.disabled && (
                          <span className="sr-only"> (недоступно)</span>
                        )}
                      </h3>
                      <i className="card__rule" aria-hidden />
                    </div>
                  </header>

                  {/* Список характеристик (3 шт.) со встроенной стрелкой */}
                  <ul className="card__features">
                    {threeFeatures.map((f, i) => {
                      const isLast = i === threeFeatures.length - 1;
                      return (
                        <li
                          className={`card__feature ${isLast ? "card__feature--with-action" : ""}`}
                          key={i}
                          title={f}
                        >
                          <span className="card__feature-bullet">
                            <Icon name="Check" size={11} className="text-white" />
                          </span>
                          <span className="card__feature-text">{f}</span>
                          {isLast && (
                            <span
                              className="card__inline-arrow-btn"
                              aria-hidden="true"
                            >
                              <Icon name="ArrowRight" size={14} className="text-white" />
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Убрали нижнюю линию карточки по твоей просьбе */}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
