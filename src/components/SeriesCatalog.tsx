import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SeriesCatalog = () => {
  const series = [
    {
      id: "3730-24",
      name: "IDS-3730-24",
      description: "24-портовый управляемый коммутатор с поддержкой PoE+",
      ports: "24 x Gigabit Ethernet",
      poe: "PoE+ (30W на порт)",
      features: ["Layer 2/3", "VLAN", "QoS", "SNMP"],
      price: "от 45 000 ₽",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    },
    {
      id: "3730-48",
      name: "IDS-3730-48",
      description: "48-портовый управляемый коммутатор промышленного класса",
      ports: "48 x Gigabit Ethernet",
      poe: "PoE++ (60W на порт)",
      features: ["Layer 3", "Стекирование", "Резервирование", "Hot-swap"],
      price: "от 89 000 ₽",
      image:
        "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&h=200&fit=crop",
    },
    {
      id: "3730-16",
      name: "IDS-3730-16",
      description: "Компактный 16-портовый коммутатор для небольших сетей",
      ports: "16 x Gigabit Ethernet",
      poe: "PoE (15W на порт)",
      features: ["Layer 2", "Web-интерфейс", "VLAN", "Port mirroring"],
      price: "от 28 000 ₽",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Коммутаторы серии 3730
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Промышленные управляемые коммутаторы с поддержкой PoE для критически
            важных приложений
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: "Shield", title: "Надёжность", desc: "99.9% uptime" },
            { icon: "Zap", title: "PoE/PoE+", desc: "До 60W на порт" },
            { icon: "Settings", title: "Управление", desc: "Layer 2/3" },
            {
              icon: "Thermometer",
              title: "Температура",
              desc: "-40°C до +75°C",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm border"
            >
              <Icon
                name={feature.icon}
                size={32}
                className="mx-auto mb-3 text-blue-600"
              />
              <h3 className="font-semibold text-slate-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Series Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {series.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-xl text-slate-900">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Network" size={16} className="text-slate-500" />
                    <span className="text-sm text-slate-700">{item.ports}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Zap" size={16} className="text-slate-500" />
                    <span className="text-sm text-slate-700">{item.poe}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {item.price}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-slate-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Нужна консультация?</h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Наши специалисты помогут выбрать оптимальное решение для вашей
            инфраструктуры
          </p>
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
          >
            <Icon name="Phone" size={16} className="mr-2" />
            Связаться с экспертом
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeriesCatalog;
