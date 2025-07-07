import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">iDATA</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Оборудование
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Сервис
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Документация
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Контакты
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Профессиональные решения для сетевой инфраструктуры
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            iDATA — ведущий производитель коммутаторов, маршрутизаторов и
            беспроводного оборудования для корпоративных сетей любой сложности.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Посмотреть продукты
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Связаться с нами
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наши продукты и технологии
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Полная линейка сетевого оборудования для построения надежной
              корпоративной инфраструктуры
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-blue-600 text-2xl">🔗</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Управляемые коммутаторы
              </h3>
              <p className="text-gray-600 mb-6">
                L3 коммутаторы с поддержкой VLAN, QoS и расширенными функциями
                управления
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  24/48 портов Gigabit
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  PoE+ поддержка
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Стекирование
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  SNMP мониторинг
                </li>
              </ul>
              <a
                href="/switches"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
              >
                Подробнее
              </a>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-blue-600 text-2xl">🔀</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Корпоративные маршрутизаторы
              </h3>
              <p className="text-gray-600 mb-6">
                Высокопроизводительные маршрутизаторы для филиальных сетей
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  VPN подключения
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Firewall встроенный
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Load balancing
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Резервирование
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Подробнее
              </button>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-blue-600 text-2xl">📶</div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Беспроводные решения
              </h3>
              <p className="text-gray-600 mb-6">
                Enterprise-класс точки доступа и контроллеры для Wi-Fi 6
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Wi-Fi 6E поддержка
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Mesh технология
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Централизованное управление
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Roaming
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Почему выбирают iDATA
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем комплексные решения для построения современной
              сетевой инфраструктуры
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-green-600 text-2xl">🏆</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Высокое качество</h3>
              <p className="text-gray-600 text-sm">
                Продукция соответствует международным стандартам качества
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600 text-2xl">🛡️</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Надежность</h3>
              <p className="text-gray-600 text-sm">
                Оборудование работает стабильно в самых требовательных условиях
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-purple-600 text-2xl">🚀</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Производительность</h3>
              <p className="text-gray-600 text-sm">
                Высокая пропускная способность для современных задач
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-orange-600 text-2xl">🎯</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Поддержка</h3>
              <p className="text-gray-600 text-sm">
                Комплексная техническая поддержка и обслуживание
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">iDATA</h3>
              <p className="text-gray-400">
                Ведущий производитель сетевого оборудования для корпоративных
                решений
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/switches" className="hover:text-white">
                    Коммутаторы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Маршрутизаторы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Wi-Fi решения
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Программное обеспечение
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Документация
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Техническая поддержка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Гарантия
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Обучение
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@idata.ru</li>
                <li>Москва, Россия</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 iDATA. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
