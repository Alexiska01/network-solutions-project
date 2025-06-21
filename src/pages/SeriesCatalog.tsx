import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";

const SeriesCatalog = () => {
  const models = [
    {
      id: "ids3730-24p-4x",
      name: "IDS3730-24P-4X",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      description: "24 порта Gigabit PoE+, 4 порта SFP+",
      specs: [
        "24 x 10/100/1000 PoE+",
        "4 x 10G SFP+",
        "Бюджет PoE: 370W",
        "L2/L3 функции",
      ],
    },
    {
      id: "ids3730-48p-6x",
      name: "IDS3730-48P-6X",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      description: "48 портов Gigabit PoE+, 6 портов SFP+",
      specs: [
        "48 x 10/100/1000 PoE+",
        "6 x 10G SFP+",
        "Бюджет PoE: 740W",
        "Стекирование",
      ],
    },
    {
      id: "ids3730-24f-4x",
      name: "IDS3730-24F-4X",
      image:
        "https://images.unsplash.com/photo-1606904825846-647eb8fc762e?w=400&h=300&fit=crop",
      description: "24 порта SFP Gigabit, 4 порта SFP+",
      specs: [
        "24 x SFP Gigabit",
        "4 x 10G SFP+",
        "Optical коммутация",
        "Redundancy поддержка",
      ],
    },
    {
      id: "ids3730-10g-8x",
      name: "IDS3730-10G-8X",
      image:
        "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=300&fit=crop",
      description: "8 портов 10G SFP+, агрегационный коммутатор",
      specs: [
        "8 x 10G SFP+",
        "2 x 40G QSFP+",
        "Высокая производительность",
        "Layer 3 routing",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Series Hero */}
      <section className="bg-gradient-to-r from-[#0070D1] to-[#0080E0] py-15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#A2D3F7] text-sm font-medium uppercase tracking-wider mb-4">
            О СЕРИИ
          </p>
          <h1 className="text-4xl font-bold text-white mb-6">
            IDS3730 — надёжные коммутаторы для корпоративной инфраструктуры
          </h1>
          <div className="text-white text-lg leading-relaxed space-y-4">
            <p>
              Коммутаторы серии IDS3730 разработаны для стабильной работы в
              критически важных бизнес-приложениях. Устройства обеспечивают
              высокую производительность, гибкое управление трафиком и
              расширенные возможности масштабирования.
            </p>
            <p>
              Поддержка PoE+, L2/L3-функционала, централизованного мониторинга и
              стекирования позволяет эффективно адаптировать инфраструктуру под
              задачи предприятия.
            </p>
          </div>
        </div>
      </section>

      {/* Models Catalog */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Модели серии
            </h2>
            <p className="text-gray-600">
              Выберите подходящую модель для вашей инфраструктуры
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {models.map((model) => (
              <Link
                key={model.id}
                to={`/product/${model.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                    {model.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {model.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {model.specs.map((spec, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <Icon
                          name="Check"
                          size={14}
                          className="text-green-500 mr-2 flex-shrink-0"
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-brand-primary font-medium group-hover:text-brand-secondary transition-colors">
                      Подробнее
                    </span>
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className="text-brand-primary group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeriesCatalog;
