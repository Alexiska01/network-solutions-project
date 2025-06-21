import { Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Icon from "@/components/ui/icon";

const SeriesCatalog = () => {
  const specifications = [
    { param: "Порты", value: "24 порта 10/100/1000BASE-T + 4 порта SFP+" },
    { param: "Пропускная способность", value: "176 Гбит/с" },
    { param: "Скорость коммутации", value: "130.9 Мпакетов/с" },
    { param: "Буферная память", value: "4.1 Мбайт" },
    { param: "MAC-адресов", value: "16 000" },
    { param: "VLAN", value: "4096" },
    { param: "Стандарты", value: "IEEE 802.1Q, IEEE 802.1p, IEEE 802.3ad" },
    { param: "Питание", value: "PoE+ до 30 Вт на порт" },
  ];

  const features = [
    "Поддержка VLAN и QoS",
    "Агрегация каналов (LACP)",
    "Spanning Tree Protocol (STP/RSTP/MSTP)",
    "IGMP Snooping",
    "Зеркалирование портов",
    "Контроль доступа по MAC-адресам",
    "SNMP v1/v2c/v3",
    "Web-интерфейс управления",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Главная
          </Link>
          <Icon name="ChevronRight" size={16} className="text-gray-400" />
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Оборудование
          </Link>
          <Icon name="ChevronRight" size={16} className="text-gray-400" />
          <span className="text-gray-600">Коммутаторы серии 3730</span>
        </nav>

        {/* Заголовок */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Коммутаторы серии IDS3730
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Управляемые коммутаторы уровня доступа для корпоративных сетей
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Уровень доступа
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              PoE+
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Управляемый
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-8">
            {/* Описание */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Описание</h2>
              <p className="text-gray-700 mb-4">
                Коммутаторы серии IDS3730 — это высокопроизводительные
                управляемые коммутаторы, предназначенные для развертывания на
                уровне доступа в корпоративных сетях. Они обеспечивают надежное
                подключение конечных устройств с поддержкой PoE+.
              </p>
              <p className="text-gray-700">
                Серия поддерживает расширенные функции управления трафиком,
                обеспечения безопасности и мониторинга, что делает её идеальным
                выбором для современных корпоративных сетей.
              </p>
            </div>

            {/* Ключевые особенности */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Ключевые особенности
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon
                      name="Check"
                      size={20}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Применение */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Области применения
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Icon
                    name="Building"
                    size={32}
                    className="text-blue-600 mx-auto mb-2"
                  />
                  <h3 className="font-semibold text-gray-900">Офисы</h3>
                  <p className="text-sm text-gray-600">Корпоративные сети</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Icon
                    name="GraduationCap"
                    size={32}
                    className="text-green-600 mx-auto mb-2"
                  />
                  <h3 className="font-semibold text-gray-900">Образование</h3>
                  <p className="text-sm text-gray-600">Учебные заведения</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Icon
                    name="Hotel"
                    size={32}
                    className="text-purple-600 mx-auto mb-2"
                  />
                  <h3 className="font-semibold text-gray-900">Гостиницы</h3>
                  <p className="text-sm text-gray-600">Гостиничные сети</p>
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Технические характеристики */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Технические характеристики
              </h2>
              <div className="space-y-3">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-2 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900 text-sm">
                      {spec.param}
                    </div>
                    <div className="text-gray-600 text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Действия */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Документация</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="text-blue-700 font-medium">
                    Техническое описание
                  </span>
                  <Icon name="Download" size={16} className="text-blue-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-700 font-medium">
                    Руководство пользователя
                  </span>
                  <Icon name="Download" size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Поддержка */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Поддержка</h2>
              <div className="space-y-3">
                <Link
                  to="/warranty-service"
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Icon name="Shield" size={20} className="text-green-600" />
                  <span className="text-gray-700">Гарантия и сервис</span>
                </Link>
                <Link
                  to="/documentation"
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Icon name="FileText" size={20} className="text-blue-600" />
                  <span className="text-gray-700">Документация</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeriesCatalog;
