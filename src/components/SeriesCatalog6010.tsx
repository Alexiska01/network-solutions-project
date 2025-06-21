import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const SeriesCatalog6010 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
              <Icon name="Cpu" className="w-4 h-4 mr-2" />
              Промышленные коммутаторы
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              IDS6010 — мощные 10G/25G/40G/100G-коммутаторы для магистральных
              решений
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Высокая пропускная способность до 960 Gbps, модульная архитектура
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                <Icon name="Download" className="w-5 h-5 mr-2" />
                Скачать каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              >
                <Icon name="Phone" className="w-5 h-5 mr-2" />
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Преимущества серии IDS6010
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Надежность и производительность для самых требовательных
              промышленных задач
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Gauge" className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">
                  До 960 Gbps пропускной способности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Поддержка масштабируемых магистральных нагрузок и высоких SLA
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    name="ArrowUpCircle"
                    className="w-6 h-6 text-green-600"
                  />
                </div>
                <CardTitle className="text-xl">Uplink до 100G</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  25G/40G/100G интерфейсы для дата-центров и агрегационных узлов
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Shield" className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">
                  Резервирование питания и охлаждения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Два слота питания + два слота вентиляторов для
                  отказоустойчивости
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Network" className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">
                  Оптимизация под SDN и виртуализацию
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Поддержка современных сетевых архитектур и централизованного
                  управления
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Модели серии IDS6010
            </h2>
            <p className="text-lg text-gray-600">
              Выберите оптимальное решение для ваших задач
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-xl">IDS6010-8P</CardTitle>
                <CardDescription className="text-blue-100">
                  8-портовый коммутатор
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    8 портов Fast Ethernet
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    Компактный корпус
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    Промышленное исполнение
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Подробнее
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="text-xl">IDS6010-16P</CardTitle>
                <CardDescription className="text-green-100">
                  16-портовый коммутатор
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    16 портов Fast Ethernet
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    Расширенные функции
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    Высокая производительность
                  </div>
                </div>
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                  Подробнее
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="text-xl">IDS6010-24P</CardTitle>
                <CardDescription className="text-purple-100">
                  24-портовый коммутатор
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    24 порта Gigabit Ethernet
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    Максимальная плотность портов
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icon
                      name="Circle"
                      className="w-4 h-4 mr-2 text-green-500"
                    />
                    Корпоративный уровень
                  </div>
                </div>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы выбрать решение серии IDS6010?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нашими экспертами для получения персональной
            консультации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3"
            >
              <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
              Задать вопрос
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
            >
              <Icon name="FileText" className="w-5 h-5 mr-2" />
              Техническая документация
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog6010;
