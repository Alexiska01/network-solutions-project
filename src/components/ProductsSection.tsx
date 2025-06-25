import React from "react";
import Icon from "@/components/ui/icon";

const ProductsSection = () => {
  // Состояние для управления стилями каждой карточки
  const [cardStyles, setCardStyles] = React.useState({
    0: {
      // Управляемые коммутаторы
      cardBg: "bg-white",
      cardBorder: "border-gray-100",
      cardShadow: "shadow-lg hover:shadow-xl",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      titleColor: "text-gray-900",
      descColor: "text-gray-600",
      buttonBg: "bg-[#0065B3] hover:bg-blue-700",
      buttonText: "text-white",
    },
    1: {
      // Корпоративные маршрутизаторы
      cardBg: "bg-gradient-to-br from-slate-50 to-gray-50",
      cardBorder: "border-slate-200",
      cardShadow: "shadow-md hover:shadow-lg",
      iconBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
      titleColor: "text-slate-800",
      descColor: "text-slate-600",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700",
      buttonText: "text-white",
    },
    2: {
      // Беспроводные решения
      cardBg: "bg-gradient-to-br from-purple-50 to-indigo-50",
      cardBorder: "border-purple-200",
      cardShadow: "shadow-lg hover:shadow-purple-200/50",
      iconBg: "bg-gradient-to-r from-purple-500 to-indigo-600",
      titleColor: "text-purple-900",
      descColor: "text-purple-700",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
      buttonText: "text-white",
    },
  });

  // Функция для переключения стилей карточки
  const toggleCardStyle = (cardIndex: number) => {
    const styleVariants = [
      {
        // Стандартный стиль
        cardBg: "bg-white",
        cardBorder: "border-gray-100",
        cardShadow: "shadow-lg hover:shadow-xl",
        iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
        titleColor: "text-gray-900",
        descColor: "text-gray-600",
        buttonBg: "bg-[#0065B3] hover:bg-blue-700",
        buttonText: "text-white",
      },
      {
        // Премиум стиль
        cardBg: "bg-gradient-to-br from-slate-50 to-gray-50",
        cardBorder: "border-slate-200",
        cardShadow: "shadow-md hover:shadow-lg",
        iconBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
        titleColor: "text-slate-800",
        descColor: "text-slate-600",
        buttonBg: "bg-emerald-600 hover:bg-emerald-700",
        buttonText: "text-white",
      },
      {
        // Акцентный стиль
        cardBg: "bg-gradient-to-br from-purple-50 to-indigo-50",
        cardBorder: "border-purple-200",
        cardShadow: "shadow-lg hover:shadow-purple-200/50",
        iconBg: "bg-gradient-to-r from-purple-500 to-indigo-600",
        titleColor: "text-purple-900",
        descColor: "text-purple-700",
        buttonBg: "bg-purple-600 hover:bg-purple-700",
        buttonText: "text-white",
      },
    ];

    const currentStyleIndex = styleVariants.findIndex(
      (variant) => variant.cardBg === cardStyles[cardIndex].cardBg,
    );
    const nextStyleIndex = (currentStyleIndex + 1) % styleVariants.length;

    setCardStyles((prev) => ({
      ...prev,
      [cardIndex]: styleVariants[nextStyleIndex],
    }));
  };

  const products = [
    {
      title: "Управляемые коммутаторы",
      description:
        "L3 коммутаторы с поддержкой VLAN, QoS и расширенными функциями управления",
      features: [
        "24/48 портов Gigabit",
        "PoE+ поддержка",
        "Стекирование",
        "SNMP мониторинг",
      ],
      icon: "Network",
    },
    {
      title: "Корпоративные маршрутизаторы",
      description: "Высокопроизводительные маршрутизаторы для филиальных сетей",
      features: [
        "VPN подключения",
        "Firewall встроенный",
        "Load balancing",
        "Резервирование",
      ],
      icon: "Router",
    },
    {
      title: "Беспроводные решения",
      description: "Enterprise-класс точки доступа и контроллеры для Wi-Fi 6",
      features: [
        "Wi-Fi 6E поддержка",
        "Mesh технология",
        "Централизованное управление",
        "Roaming",
      ],
      icon: "Wifi",
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4 font-sans">
            Наши продукты и технологии
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto font-sans">
            Полная линейка сетевого оборудования для построения надежной
            корпоративной инфраструктуры
          </p>
        </div>

        {/* Панель управления стилями */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {products.map((product, index) => (
            <button
              key={`style-${index}`}
              onClick={() => toggleCardStyle(index)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              Стиль "{product.title}"
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 md:items-start">
          {products.map((product, index) => (
            <div
              key={index}
              className={`product-card-${index} ${cardStyles[index].cardBg} rounded-lg md:rounded-xl p-4 md:p-6 ${cardStyles[index].cardShadow} transition-all duration-300 border ${cardStyles[index].cardBorder} h-full flex flex-col`}
            >
              <div
                className={`product-header-${index} flex gap-3 md:gap-4 items-start mb-4`}
              >
                <div
                  className={`product-icon-${index} w-12 h-12 md:w-16 md:h-16 ${cardStyles[index].iconBg} rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <Icon
                    name={product.icon as any}
                    size={24}
                    className="text-white md:w-8 md:h-8 lg:w-9 lg:h-9"
                  />
                </div>
                <div className={`product-content-${index} flex-1`}>
                  <h3
                    className={`product-title-${index} text-sm md:text-base lg:text-lg font-semibold ${cardStyles[index].titleColor} mb-1 md:mb-2 font-sans`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`product-desc-${index} text-xs md:text-xs lg:text-sm ${cardStyles[index].descColor} font-sans leading-relaxed`}
                  >
                    {product.description}
                  </p>
                </div>
              </div>
              <ul
                className={`product-features-${index} space-y-1.5 md:space-y-2 mb-6 flex-1`}
              >
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`product-feature-${index}-${idx} flex items-center text-xs md:text-sm ${cardStyles[index].descColor} font-sans`}
                  >
                    <Icon
                      name="Check"
                      size={12}
                      className="text-green-500 mr-1.5 md:mr-2 flex-shrink-0 md:w-4 md:h-4"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`product-button-${index} w-full ${cardStyles[index].buttonBg} ${cardStyles[index].buttonText} py-2 md:py-2.5 px-3 md:px-4 rounded-md md:rounded-lg transition-all duration-300 font-sans text-sm md:text-base min-h-[44px] mt-auto`}
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
