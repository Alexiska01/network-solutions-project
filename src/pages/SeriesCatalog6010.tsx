import { useState } from "react";
import Header from "@/components/header/Header";
import Icon from "@/components/ui/icon";

interface SwitchModel {
  id: string;
  name: string;
  description: string;
  image: string;
  ports: string;
  speed: string;
  management: string;
  price: string;
}

const SeriesCatalog6010 = () => {
  const [selectedModel, setSelectedModel] = useState<SwitchModel | null>(null);

  const switchModels: SwitchModel[] = [
    {
      id: "6010-24T",
      name: "IDS-6010-24T",
      description: "24-портовый управляемый коммутатор с поддержкой VLAN",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      ports: "24 x 10/100/1000Base-T",
      speed: "Gigabit Ethernet",
      management: "Web, SNMP, CLI",
      price: "По запросу",
    },
    {
      id: "6010-48T",
      name: "IDS-6010-48T",
      description: "48-портовый управляемый коммутатор для больших сетей",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      ports: "48 x 10/100/1000Base-T",
      speed: "Gigabit Ethernet",
      management: "Web, SNMP, CLI",
      price: "По запросу",
    },
    {
      id: "6010-24T-SFP",
      name: "IDS-6010-24T-SFP",
      description: "24-портовый коммутатор с SFP+ портами",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      ports: "24 x 10/100/1000Base-T + 4 x SFP+",
      speed: "Gigabit Ethernet + 10G",
      management: "Web, SNMP, CLI",
      price: "По запросу",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Главная</span>
            <Icon name="ChevronRight" size={16} />
            <span>Коммутаторы</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-blue-600">Серия 6010</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Коммутаторы серии 6010
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Высокопроизводительные управляемые коммутаторы для корпоративных
            сетей с расширенными возможностями управления и мониторинга.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {switchModels.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedModel(model)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {model.name}
                </h3>
                <p className="text-gray-600 mb-4">{model.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Порты:</span>
                    <span className="font-medium">{model.ports}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Скорость:</span>
                    <span className="font-medium">{model.speed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Управление:</span>
                    <span className="font-medium">{model.management}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {model.price}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SeriesCatalog6010;
