import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate, Link } from "react-router-dom";
import { useModelViewer } from "@/hooks/useModelViewer";
import ModelViewer from "@/components/ModelViewer";
import SpecTable from "@/components/SpecTable";
import FeatureCard from "@/components/FeatureCard";
import DetailedSpecCard from "@/components/DetailedSpecCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ids353024p6xData } from "@/data/ids3530-24p-6x";

const ModelIDS3530_24P_6XComponent = () => {
  const navigate = useNavigate();
  const { modelViewerRef, indicatorsOn, modelLoaded, toggleIndicators } =
    useModelViewer();

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
                <BreadcrumbPage>IDS3530-24P-6X</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section with 3D Model */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Enhanced title section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Icon name="Cpu" className="h-5 w-5 mr-2 text-blue-300" />
              <span className="text-sm font-medium text-blue-100">Промышленный коммутатор L3</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {ids353024p6xData.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-light max-w-3xl mx-auto">
              Управляемый коммутатор уровня L3 с PoE+ и высокой производительностью
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* 3D Model - Enhanced */}
            <div className="lg:col-span-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                    <ModelViewer
                      modelRef={modelViewerRef}
                      modelPath={ids353024p6xData.modelPath}
                      indicatorsOn={indicatorsOn}
                      modelLoaded={modelLoaded}
                      onToggleIndicators={toggleIndicators}
                    />
                  </div>
                  
                  {/* 3D Model Controls */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-white/80">3D модель</span>
                      </div>
                      {modelLoaded && (
                        <button
                          onClick={toggleIndicators}
                          className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors"
                        >
                          {indicatorsOn ? 'Скрыть индикаторы' : 'Показать индикаторы'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications - Enhanced */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Icon name="Settings" className="h-6 w-6 mr-3 text-blue-300" />
                  Технические характеристики
                </h3>
                <div className="space-y-4">
                  {ids353024p6xData.basicSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                      <span className="text-blue-200 font-medium">{spec.label}:</span>
                      <span className="text-white font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Cards */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-green-400/20 p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Zap" className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-sm font-semibold text-green-300">PoE+</span>
                  </div>
                  <p className="text-xs text-green-200">380W мощности для питания устройств</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm rounded-xl border border-blue-400/20 p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Network" className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-sm font-semibold text-blue-300">L3</span>
                  </div>
                  <p className="text-xs text-blue-200">Полная поддержка маршрутизации</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Icon name="FileText" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              Посмотреть документацию
            </Button>
            <Button
              onClick={() => navigate("/partners")}
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
              Запросить цену
            </Button>
          </div>
        </div>
      </section>



      {/* Enhanced Technical Specifications */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Icon name="Database" className="h-5 w-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Полная спецификация</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Технические характеристики
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Детальная информация обо всех параметрах и возможностях коммутатора IDS3530-24P-6X
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ids353024p6xData.specGroups.map((specGroup, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card header gradient */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon 
                        name={index === 0 ? "Network" : index === 1 ? "Zap" : index === 2 ? "Shield" : "Settings"} 
                        className="h-6 w-6 text-white" 
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {specGroup.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {specGroup.specs.map((spec, specIndex) => (
                      <div 
                        key={specIndex} 
                        className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0 hover:bg-blue-50/50 hover:px-4 hover:mx-[-16px] hover:rounded-lg transition-all duration-200"
                      >
                        <span className="text-gray-700 font-medium flex-1 pr-4">
                          {spec.label}:
                        </span>
                        <span className="text-gray-900 font-semibold text-right flex-1 max-w-xs">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-100 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Additional info cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Сертификация</h4>
              <p className="text-sm text-gray-600">Соответствует международным стандартам качества и безопасности</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Надёжность</h4>
              <p className="text-sm text-gray-600">MTBF более 100,000 часов при непрерывной работе</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Thermometer" className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Рабочая среда</h4>
              <p className="text-sm text-gray-600">Работа в диапазоне температур от -40°C до +75°C</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-[34px] font-semibold text-gray-900 mb-6 font-sans w-[90%] md:w-[70%] mx-auto">
            Хотите получить КП по IDS3530-24P-6X?
          </h2>
          <p className="text-sm md:text-[16px] text-gray-600 mb-8 font-sans w-[90%] md:w-[70%] mx-auto">
            Оставьте заявку — мы подготовим коммерческое предложение и расчёт
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/partners")}
              className="bg-brand-primary hover:bg-gradient-hero text-white font-medium transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-xl"
            >
              Получить КП
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-medium transition-all duration-300 px-8 py-3"
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelIDS3530_24P_6XComponent;