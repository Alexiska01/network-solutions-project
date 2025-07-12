/**
 * Главный компонент Hero секции
 * Простая версия для диагностики
 */
const Hero = () => {
  return (
    <section className="bg-gradient-hero text-white py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[95vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Левая колонка - упрощенная версия */}
          <div className="flex flex-col h-full min-h-[520px] relative overflow-visible">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight text-white">
              Профессиональные решения для сетевой инфраструктуры
            </h1>
            <p className="text-white/80 text-lg mt-6">
              Ведущий производитель коммутаторов, маршрутизаторов и
              беспроводного оборудования для корпоративных сетей любой
              сложности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Смотреть продукты
              </button>
              <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Узнать больше
              </button>
            </div>
          </div>

          {/* Правая колонка - упрощенная версия */}
          <div className="relative h-full flex items-center justify-center order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">
                Системная панель
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Uptime:</span>
                  <span className="text-green-400 font-mono">99.9%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Latency:</span>
                  <span className="text-blue-400 font-mono">0.8ms</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Traffic:</span>
                  <span className="text-purple-400 font-mono">1.2TB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
