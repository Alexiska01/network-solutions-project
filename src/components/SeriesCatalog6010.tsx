import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import BenefitCard from "@/components/BenefitCard";

const SeriesCatalog6010Component = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
            IDS6010 — мощные 10G/25G/40G/100G-коммутаторы для магистральных
            решений
          </h1>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed max-w-4xl">
            Высокая пропускная способность до 960 Gbps, модульная архитектура
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-20 h-0.5 bg-gradient-hero mx-auto mb-6"></div>
            <h2 className="text-[20px] md:text-3xl font-bold text-gray-900 font-sans">
              Ключевые преимущества
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard
              icon="Zap"
              iconColor="bg-gradient-to-r from-[#003A85] to-[#0063C2]"
              title="До 960 Gbps"
              description="Масштабируемые нагрузки и высокий SLA"
            />
            <BenefitCard
              icon="Activity"
              iconColor="bg-gradient-to-r from-[#0093B9] via-[#00AEB4] to-[#00B9A8]"
              title="Uplink до 100G"
              description="25G/40G/100G интерфейсы для ЦОД и агрегации"
            />
            <BenefitCard
              icon="Battery"
              iconColor="bg-gradient-to-r from-[#553C9A] to-[#B794F4]"
              title="Резервирование питания"
              description="Непрерывная работа критически важных систем"
            />
            <BenefitCard
              icon="Settings"
              iconColor="bg-gradient-to-r from-[#DD6B20] to-[#F6AD55]"
              title="Управление SDN"
              description="Программно-определяемые сети"
            />
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-sans">
              Модели серии IDS6010
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans">
              Выберите оптимальную конфигурацию для уровня распределения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IDS6010-24T-18X-8Y */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS6010-24T-18X-8Y
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×1G Base-T, 18×10G SFP+, 8×25G SFP28
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids6010-24t-18x-8y.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS6010-24X-2Q */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS6010-24X-2Q
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×10G SFP+, 2×40G QSFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids6010-24x-2q.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS6010-24X-2C */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS6010-24X-2C
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                24×10G SFP+, 2×100G/40G QSFP28
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids6010-24x-2c.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>

            {/* IDS6010-48X */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 font-sans">
                IDS6010-48X
              </h3>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 font-sans">
                48×10G SFP+
              </p>
              <Button
                className="w-full bg-brand-primary hover:bg-gradient-hero hover:border-white text-white font-medium transition-all duration-300 border border-transparent"
                onClick={() =>
                  (window.location.href = "/models/ids6010-48x.html")
                }
              >
                <Icon name="Info" className="mr-2" />
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[20px] font-semibold text-gray-900 mb-6 md:text-[36px]">
            Нужна рекомендация?
          </h2>
          <p className="text-[14px] text-gray-600 mb-8 max-w-2xl mx-auto md:text-[18px]">
            Оставьте заявку — мы подберём оптимальное решение и подготовим
            расчёт стоимости.
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
          >
            Получить расчёт
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SeriesCatalog6010Component;
