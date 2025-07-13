import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate, Link } from "react-router-dom";
import { useModelViewer } from "@/hooks/useModelViewer";
import Professional3DViewer from "@/components/Professional3DViewer";
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Enhanced title section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Icon name="Cpu" className="h-5 w-5 mr-2 text-[#00B5AD]" />
              <span className="text-sm font-medium text-white/80">Промышленный коммутатор L3</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              {ids353024p6xData.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
              Управляемый коммутатор уровня L3 с PoE+ и высокой производительностью
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Professional 3D Model Viewer */}
            <div className="lg:col-span-3">
              <Professional3DViewer
                modelRef={modelViewerRef}
                modelPath={ids353024p6xData.modelPath}
                indicatorsOn={indicatorsOn}
                onToggleIndicators={toggleIndicators}
              />
            </div>

            {/* Specifications - Enhanced */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Icon name="Settings" className="h-6 w-6 mr-3 text-[#00B5AD]" />
                  Технические характеристики
                </h3>
                <div className="space-y-4">
                  {ids353024p6xData.basicSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                      <span className="text-white/70 font-medium">{spec.label}:</span>
                      <span className="text-white font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Cards */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#00B5AD]/20 to-[#0065B3]/20 backdrop-blur-sm rounded-xl border border-[#00B5AD]/20 p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Zap" className="h-5 w-5 text-[#00B5AD] mr-2" />
                    <span className="text-sm font-semibold text-white">PoE+</span>
                  </div>
                  <p className="text-xs text-white/80">380W мощности для питания устройств</p>
                </div>
                <div className="bg-gradient-to-br from-[#0065B3]/20 to-[#1A2980]/20 backdrop-blur-sm rounded-xl border border-[#0065B3]/20 p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="Network" className="h-5 w-5 text-[#0065B3] mr-2" />
                    <span className="text-sm font-semibold text-white">L3</span>
                  </div>
                  <p className="text-xs text-white/80">Полная поддержка маршрутизации</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1A2980] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Icon name="FileText" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              Посмотреть документацию
            </Button>
            <Button
              onClick={() => navigate("/partners")}
              variant="outline"
              size="lg"
              className="border-2 border-white/60 text-white hover:bg-white hover:text-[#1A2980] px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
              Запросить цену
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-100 rounded-full mb-6">
              <Icon name="Database" className="h-5 w-5 mr-2 text-[#0065B3]" />
              <span className="text-sm font-semibold text-[#1A2980]">Полная спецификация</span>
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
                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#00B5AD] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card header gradient */}
                <div className="h-1 bg-gradient-to-r from-[#1A2980] via-[#0065B3] to-[#00B5AD]" />
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0065B3] to-[#00B5AD] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon 
                        name={index === 0 ? "Network" : index === 1 ? "Zap" : index === 2 ? "Shield" : "Settings"} 
                        className="h-6 w-6 text-white" 
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0065B3] transition-colors">
                      {specGroup.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {specGroup.specs.map((spec, specIndex) => (
                      <div 
                        key={specIndex} 
                        className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0 hover:bg-cyan-50/50 hover:px-4 hover:mx-[-16px] hover:rounded-lg transition-all duration-200"
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
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-100 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Additional info cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#00B5AD]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" className="h-8 w-8 text-[#00B5AD]" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Сертификация</h4>
              <p className="text-sm text-gray-600">Соответствует международным стандартам качества и безопасности</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#0065B3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="h-8 w-8 text-[#0065B3]" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Надёжность</h4>
              <p className="text-sm text-gray-600">MTBF более 100,000 часов при непрерывной работе</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#1A2980]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Thermometer" className="h-8 w-8 text-[#1A2980]" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Рабочая среда</h4>
              <p className="text-sm text-gray-600">Работа в диапазоне температур от -40°C до +75°C</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#1A2980] via-[#0065B3] to-[#00B5AD] overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00B5AD] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0065B3] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-2000" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 mb-8">
            <Icon name="Sparkles" className="h-5 w-5 mr-2 text-[#00B5AD]" />
            <span className="text-sm font-semibold text-white">Готовы к внедрению</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Получите{" "}
            <span className="text-white">
              профессиональную
            </span>{" "}
            консультацию
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-4xl mx-auto font-light">
            Наши эксперты помогут подобрать оптимальное решение для вашей инфраструктуры
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/90">
            <div className="flex items-center">
              <Icon name="CheckCircle" className="h-5 w-5 mr-2 text-[#00B5AD]" />
              <span className="text-sm">Бесплатная консультация</span>
            </div>
            <div className="flex items-center">
              <Icon name="Clock" className="h-5 w-5 mr-2 text-[#00B5AD]" />
              <span className="text-sm">Ответ в течение 2 часов</span>
            </div>
            <div className="flex items-center">
              <Icon name="Users" className="h-5 w-5 mr-2 text-[#00B5AD]" />
              <span className="text-sm">Персональный менеджер</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("/partners")}
              className="group relative bg-white text-[#1A2980] hover:bg-gray-100 font-semibold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            >
              <Icon name="MessageSquare" className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
              Связаться с партнером
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="group bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white hover:bg-white hover:text-[#1A2980] px-10 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Icon name="Phone" className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Получить консультацию
            </Button>
          </div>


        </div>
      </section>
    </div>
  );
};

export default ModelIDS3530_24P_6XComponent;