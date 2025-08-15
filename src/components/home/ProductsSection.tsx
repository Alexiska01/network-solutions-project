import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import "./ProductsSection.css";

// Данные продуктов
const products = [
  {
    title: "Управляемые коммутаторы",
    description: "Гибкое управление сетями с корпоративными L3-коммутаторами",
    detailedInfo:
      "Профессиональные решения для масштабируемых корпоративных сетей с расширенными возможностями мониторинга и безопасности.",
    features: [
      "24/48 портов Gigabit Ethernet",
      "PoE/PoE+ поддержка до 370W",
      "SNMP v3 мониторинг и управление",
      "VLAN и QoS конфигурация",
      "Redundant power supply",
    ],
    icon: "Network",
    gradientPosition: "from-blue-600 to-blue-700",
    href: "/switches",
  },
  {
    title: "Корпоративные маршрутизаторы",
    description: "Высокопроизводительные решения для филиальных сетей",
    detailedInfo:
      "Надёжные маршрутизаторы для стабильного подключения удалённых офисов с поддержкой современных протоколов безопасности.",
    features: [
      "Site-to-Site VPN подключения",
      "Встроенный Next-Gen Firewall",
      "WAN Load balancing и Failover",
      "SD-WAN технология",
      "Centralized policy management",
    ],
    icon: "Router",
    gradientPosition: "from-blue-700 to-blue-800",
    href: "/routers",
  },
  {
    title: "Беспроводные решения",
    description: "Enterprise-класс точки доступа и контроллеры Wi-Fi 6",
    detailedInfo:
      "Современные беспроводные системы с поддержкой Wi-Fi 6/6E для высокой пропускной способности и надёжности.",
    features: [
      "Wi-Fi 6E поддержка (6GHz)",
      "Mesh технология и roaming",
      "Централизованное cloud-управление",
      "Advanced security (WPA3)",
      "AI-powered optimization",
    ],
    icon: "Wifi",
    gradientPosition: "from-blue-800 to-teal-600",
    href: "/wireless",
  },
  {
    title: "Системы управления",
    description: "Централизованные платформы для управления инфраструктурой",
    detailedInfo:
      "Комплексные решения для мониторинга, автоматизации и интеграции сетевой инфраструктуры.",
    features: [
      "Унифицированная dashboard панель",
      "Real-time аналитика и отчёты",
      "Автоматизация сетевых процессов",
      "Integration API и webhooks",
      "Multi-tenant архитектура",
    ],
    icon: "Settings",
    gradientPosition: "from-teal-600 to-teal-500",
    href: "/management",
  },
];

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2, rootMargin: "-40px 0px -40px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="products-section relative overflow-hidden flex items-center"
      data-fit4="on"
    >
      <div className="products-section__bg pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 lg:max-w-6xl lg:mx-auto xl:max-w-7xl">
          {products.map((product, index) => {
            const threeFeatures = product.features.slice(0, 3);

            return (
              <article
                key={index}
                className="feature-card group bg-white rounded-xl md:rounded-3xl transition-all duration-400 ease-premium hover:-translate-y-[2px]"
                style={
                  { "--stagger": `${index * 60}ms` } as React.CSSProperties
                }
                data-state={isVisible ? "visible" : "hidden"}
                data-product-title={product.title}
                data-pos={index}
              >
                {/* Вся карточка кликабельна (за пределами таб-цикла) */}
                <Link
                  to={product.href}
                  className="stretched-link"
                  aria-label={`Открыть: ${product.title}`}
                  tabIndex={-1}
                />

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
