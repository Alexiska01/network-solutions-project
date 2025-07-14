import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate, Link } from "react-router-dom";
import { useModelViewer } from "@/hooks/useModelViewer";
import Professional3DViewer from "@/components/Professional3DViewer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ids3530_24s_8t_6x } from "@/data/ids3530-24s-8t-6x";

const ModelIDS3530_24S_8T_6XComponent = () => {
  const navigate = useNavigate();
  const { modelViewerRef, indicatorsOn, modelLoaded, toggleIndicators } =
    useModelViewer();

  const basicSpecs = [
    { label: "Порты", value: ids3530_24s_8t_6x.characteristics.ports },
    { label: "Слоты", value: ids3530_24s_8t_6x.characteristics.slots },
    { label: "PoE", value: ids3530_24s_8t_6x.characteristics.poe },
    { label: "Производительность", value: ids3530_24s_8t_6x.characteristics.performance },
    { label: "Питание", value: ids3530_24s_8t_6x.characteristics.power },
  ];

  const specGroups = [
    {
      title: "Порты и интерфейсы",
      specs: [
        { label: "Ethernet-порты", value: ids3530_24s_8t_6x.ports.ethernet },
        { label: "SFP-слоты", value: ids3530_24s_8t_6x.ports.sfp },
        { label: "SFP+ слоты", value: ids3530_24s_8t_6x.ports.sfpPlus },
        { label: "Консольный порт", value: ids3530_24s_8t_6x.ports.console },
        { label: "Управление", value: ids3530_24s_8t_6x.ports.management },
      ]
    },
    {
      title: "Производительность",
      specs: [
        { label: "Коммутационная способность", value: ids3530_24s_8t_6x.performance.switchingCapacity },
        { label: "Пропускная способность", value: ids3530_24s_8t_6x.performance.throughput },
        { label: "Flash-память", value: ids3530_24s_8t_6x.performance.flash },
        { label: "ОЗУ", value: ids3530_24s_8t_6x.performance.ram },
      ]
    },
    {
      title: "Маршрутизация L3",
      specs: [
        { label: "IPv4 маршрутов", value: ids3530_24s_8t_6x.performance.ipv4Routes },
        { label: "IPv6 маршрутов", value: ids3530_24s_8t_6x.performance.ipv6Routes },
        { label: "Таблица MAC-адресов", value: "32K" },
        { label: "VLAN", value: "4K" },
      ]
    },
    {
      title: "Физические характеристики",
      specs: [
        { label: "Размеры", value: ids3530_24s_8t_6x.physical.dimensions },
        { label: "Вес", value: ids3530_24s_8t_6x.physical.weight },
        { label: "Монтаж", value: ids3530_24s_8t_6x.physical.mounting },
        { label: "Корпус", value: ids3530_24s_8t_6x.physical.housing },
      ]
    },
    {
      title: "Питание и охлаждение",
      specs: [
        { label: "Источник питания", value: ids3530_24s_8t_6x.powerCooling.powerSupply },
        { label: "Потребление", value: ids3530_24s_8t_6x.powerCooling.consumption },
        { label: "Напряжение", value: ids3530_24s_8t_6x.powerCooling.voltage },
        { label: "Охлаждение", value: ids3530_24s_8t_6x.powerCooling.cooling },
      ]
    },
    {
      title: "Условия эксплуатации",
      specs: [
        { label: "Рабочая температура", value: ids3530_24s_8t_6x.environment.operatingTemp },
        { label: "Температура хранения", value: ids3530_24s_8t_6x.environment.storageTemp },
        { label: "Влажность (рабочая)", value: ids3530_24s_8t_6x.environment.operatingHumidity },
        { label: "Высота над уровнем моря", value: ids3530_24s_8t_6x.environment.altitude },
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/80 border-b border-gray-100 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-7xl mx-auto py-3 px-3 xs:px-4 sm:px-6 lg:px-[35px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#products">Продукты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/switches">Коммутаторы</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products/switches/ids3530">IDS3530</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>IDS3530-24S-8T-6X</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section with 3D Model */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#0065B3] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#00B5AD] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#1A2980] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-30">
          <Button
            variant="ghost"
            onClick={() => navigate("/products/switches/ids3530")}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white hover:text-white p-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Icon name="ChevronLeft" className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
          {/* Enhanced title section - Mobile Optimized */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-3 md:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 md:mb-6">
              <Icon name="Cpu" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#00B5AD]" />
              <span className="text-xs md:text-sm font-medium text-white/80">Промышленный коммутатор L3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent leading-tight">
              {ids3530_24s_8t_6x.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light max-w-3xl mx-auto px-4 sm:px-0">
              Управляемый коммутатор уровня L3 с комбинированными портами и высокой производительностью
            </p>
          </div>

          {/* Mobile-First Layout */}
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-12 lg:items-start">
            {/* Professional 3D Model Viewer */}
            <div className="lg:col-span-3">
              <Professional3DViewer
                modelRef={modelViewerRef}
                modelPath={ids3530_24s_8t_6x.modelUrl}
                indicatorsOn={indicatorsOn}
                onToggleIndicators={toggleIndicators}
              />
            </div>

            {/* Specifications - Mobile Optimized */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 md:p-6 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white flex items-center">
                  <Icon name="Settings" className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 text-[#00B5AD]" />
                  Характеристики
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {basicSpecs.map((spec, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 border-b border-white/10 last:border-b-0 gap-1 sm:gap-0">
                      <span className="text-white/70 font-medium text-sm md:text-base">{spec.label}:</span>
                      <span className="text-white font-semibold text-sm md:text-base">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Cards - Mobile Optimized */}
              <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-[#00B5AD]/20 to-[#0065B3]/20 backdrop-blur-sm rounded-xl border border-[#00B5AD]/20 p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Network" className="h-4 w-4 md:h-5 md:w-5 text-[#00B5AD] mr-2" />
                    <span className="text-sm font-semibold text-white">SFP</span>
                  </div>
                  <p className="text-xs text-white/80">24 слота SFP для гибкого подключения</p>
                </div>
                <div className="bg-gradient-to-br from-[#0065B3]/20 to-[#1A2980]/20 backdrop-blur-sm rounded-xl border border-[#0065B3]/20 p-3 md:p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Gauge" className="h-4 w-4 md:h-5 md:w-5 text-[#0065B3] mr-2" />
                    <span className="text-sm font-semibold text-white">L3</span>
                  </div>
                  <p className="text-xs text-white/80">Полная поддержка маршрутизации</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-12 justify-center px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-[#1A2980] hover:bg-gray-50 active:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Icon name="FileText" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              <span className="text-sm md:text-base">Документация</span>
            </Button>
            <Button
              onClick={() => navigate("/partners")}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white hover:bg-white hover:text-[#1A2980] active:bg-white/90 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
              <span className="text-sm md:text-base">Запросить цену</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Technical Specifications */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-cyan-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#00B5AD]/10 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#0065B3]/10 rounded-full opacity-20 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center px-3 md:px-4 py-2 bg-cyan-100 rounded-full mb-4 md:mb-6">
              <Icon name="Database" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#0065B3]" />
              <span className="text-xs md:text-sm font-semibold text-[#1A2980]">Полная спецификация</span>
            </div>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">
              Технические характеристики
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Детальная информация обо всех параметрах и возможностях коммутатора IDS3530-24S-8T-6X
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {specGroups.map((specGroup, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-lg md:rounded-2xl border border-gray-200 hover:border-[#00B5AD] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card header gradient */}
                <div className="h-1 bg-gradient-to-r from-[#1A2980] via-[#0065B3] to-[#00B5AD]" />
                
                <div className="p-3 md:p-8">
                  <div className="flex items-center mb-3 md:mb-6">
                    <div className="w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-[#0065B3] to-[#00B5AD] rounded-lg md:rounded-xl flex items-center justify-center mr-2 md:mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon 
                        name={index === 0 ? "Network" : index === 1 ? "Gauge" : index === 2 ? "Route" : index === 3 ? "Box" : index === 4 ? "Zap" : "Settings"} 
                        className="h-3 w-3 md:h-6 md:w-6 text-white" 
                      />
                    </div>
                    <h3 className="text-base md:text-2xl font-bold text-gray-900 group-hover:text-[#0065B3] transition-colors">
                      {specGroup.title}
                    </h3>
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    {specGroup.specs.map((spec, specIndex) => (
                      <div 
                        key={specIndex} 
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1.5 md:py-3 border-b border-gray-100 last:border-b-0 hover:bg-cyan-50/50 hover:px-2 md:hover:px-4 hover:mx-[-8px] md:hover:mx-[-16px] hover:rounded-lg transition-all duration-200"
                      >
                        <span className="text-xs md:text-base text-gray-700 font-medium sm:flex-1 sm:pr-4 mb-0.5 sm:mb-0">
                          {spec.label}:
                        </span>
                        <span className="text-xs md:text-base text-gray-900 font-semibold sm:text-right sm:flex-1 sm:max-w-xs">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-100 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Additional info cards */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 md:w-16 md:h-16 bg-[#00B5AD]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Icon name="CheckCircle" className="h-4 w-4 md:h-8 md:w-8 text-[#00B5AD]" />
              </div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Сертификация</h4>
              <p className="text-xs md:text-sm text-gray-600">Соответствует международным стандартам качества и безопасности</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 md:w-16 md:h-16 bg-[#0065B3]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Icon name="Clock" className="h-4 w-4 md:h-8 md:w-8 text-[#0065B3]" />
              </div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Надёжность</h4>
              <p className="text-xs md:text-sm text-gray-600">MTBF более 100,000 часов при непрерывной работе</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-8 h-8 md:w-16 md:h-16 bg-[#1A2980]/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Icon name="Thermometer" className="h-4 w-4 md:h-8 md:w-8 text-[#1A2980]" />
              </div>
              <h4 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Рабочая среда</h4>
              <p className="text-xs md:text-sm text-gray-600">Работа в диапазоне температур от -5°C до +50°C</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="relative py-12 md:py-24 px-4 md:px-6 bg-gradient-to-br from-[#1A2980] via-[#0065B3] to-[#00B5AD] overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B5AD] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0065B3] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-2000" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 mb-6 md:mb-8">
            <Icon name="Sparkles" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#00B5AD]" />
            <span className="text-xs md:text-sm font-semibold text-white">Готовы к внедрению</span>
          </div>

          {/* Heading */}
          <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            Получите{" "}
            <span className="text-white">
              профессиональную
            </span>{" "}
            консультацию
          </h2>
          
          {/* Benefits */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-12 text-white/90 px-4">
            <div className="flex items-center justify-center">
              <Icon name="CheckCircle" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#00B5AD]" />
              <span className="text-xs md:text-sm">Бесплатная консультация</span>
            </div>

            <div className="flex items-center justify-center">
              <Icon name="Users" className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#00B5AD]" />
              <span className="text-xs md:text-sm">Персональный менеджер</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center px-4">
            <Button
              size="lg"
              onClick={() => navigate("/partners")}
              className="group relative w-full sm:w-auto bg-white text-[#1A2980] hover:bg-gray-100 active:bg-gray-200 font-semibold px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            >
              <Icon name="MessageSquare" className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 group-hover:rotate-12 transition-transform" />
              <span className="text-sm md:text-base">Связаться с партнером</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white hover:bg-white hover:text-[#1A2980] active:bg-white/90 px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Icon name="Phone" className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm md:text-base">Получить консультацию</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelIDS3530_24S_8T_6XComponent;