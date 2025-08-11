import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
// import { initWarrantyAnimations } from '@/components/warranty/WarrantyAnimation';
import '@/components/warranty/WarrantyHero.css';
import '@/components/warranty/WarrantyCard.css';
import '@/components/warranty/ServiceCard.css';
import '@/components/warranty/JourneyPath.css';

const WarrantyPage: React.FC = () => {
  useEffect(() => {
    // Мгновенно устанавливаем позицию в начало страницы
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Убрал все анимации - делаем статичным
    // const cleanup = initWarrantyAnimations();
    // return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero блок */}
      <section className="warranty-hero-section warranty-hero-gradient relative py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
        {/* Плавающие частицы */}
        <div className="warranty-hero-particles">
          <div className="warranty-particle"></div>
          <div className="warranty-particle"></div>
          <div className="warranty-particle"></div>
          <div className="warranty-particle"></div>
          <div className="warranty-particle"></div>
        </div>
        
        {/* Декоративный элемент */}
        <div className="warranty-hero-decoration"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="warranty-hero-title warranty-hero-glow-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold sm:font-black mb-8 sm:mb-10 lg:mb-12 tracking-tight leading-tight">
              Гарантия и Сервис
            </h1>
            <p className="warranty-hero-description text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-light max-w-3xl mx-auto">
              Расширенная гарантия, быстрый сервис и техническая поддержка для непрерывной работы вашего бизнеса.
            </p>
          </div>
        </div>
      </section>

      {/* Секция Гарантия */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          <div
            className="warranty-card bg-white rounded-2xl p-8 lg:p-10 max-w-2xl w-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
              boxShadow: '0 10px 24px rgba(0,0,0,0.06)'
            }}
          >
            {/* Градиентная обводка */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#32398e] via-[#005baa] to-[#00acad] -z-10">
              <div className="h-full w-full rounded-2xl bg-white"></div>
            </div>
            
            {/* Заголовок с иконкой */}
            <div className="warranty-header flex items-center justify-center lg:justify-center gap-4 mb-8">
              {/* Иконка */}
              <div className="warranty-icon flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#005baa] to-[#00acad] flex items-center justify-center shadow-lg">
                  <Icon name="Shield" size={24} className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </div>
              </div>
              
              {/* Заголовок */}
              <h3 className="warranty-title text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 text-left lg:text-center flex-1 lg:flex-none">
                Гарантия на оборудование
              </h3>
            </div>
                
            {/* Список функций */}
            <div className="space-y-5">
              {[
                {
                  title: "12 месяцев гарантии",
                  desc: "Гарантия действует с момента продажи оборудования"
                },
                {
                  title: "Базовая поддержка",
                  desc: "Всё оборудование поставляется с гарантийной поддержкой"
                },
                {
                  title: "Рабочие часы",
                  desc: "Приём заявок с 9:00 до 18:00 по московскому времени"
                },
                {
                  title: "Обновления ПО",
                  desc: "Регулярные обновления программного обеспечения"
                },
                {
                  title: "Ремонт/замена",
                  desc: "Восстановление в течение 60 рабочих дней"
                },
                {
                  title: "Условия доставки",
                  desc: "Доставка в сервисный центр за счёт заказчика"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="warranty-feature-item flex gap-4 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0093b6] to-[#00acad] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Секция Сервисные пакеты */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
            <h2 className="service-section-title text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              Сервисные пакеты
            </h2>
            <p className="service-section-subtitle text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите подходящий уровень поддержки для вашего оборудования
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Пакет 8x5xNBD */}
            <div className="service-card bg-white relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl border border-gray-100">
              {/* Градиентная обводка */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-[2px] bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FF8C00] -z-10">
                <div className="h-full w-full rounded-xl sm:rounded-2xl bg-white"></div>
              </div>
              
              {/* Заголовочная секция */}
              <div className="service-header flex items-center gap-4 mb-4 sm:mb-6 lg:mb-8">
                {/* Иконки */}
                <div className="service-icon flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center shadow-lg">
                    <Icon name="Clock" size={20} className="text-white sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-[#F7931E] to-[#FF8C00] flex items-center justify-center shadow-lg">
                    <Icon name="Settings" size={20} className="text-white sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  </div>
                </div>
                
                {/* Заголовок */}
                <h3 className="service-title text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 text-left flex-1">
                  8x5xNBD
                </h3>
              </div>
              
              {/* Список функций */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Действует в течение 12/36/60 месяцев с даты продажи",
                  "Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени",
                  "Обновления программного обеспечения",
                  "Консультации по вопросам функционирования и настройки",
                  "Авансовая замена вышедшего из строя оборудования",
                  "Отгрузка со склада сервисного центра на следующий рабочий день",
                  "Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра"
                ].map((feature, index) => (
                  <div key={index} className="service-feature-item flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Пакет 24x7x4 */}
            <div className="service-card bg-white relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl border border-gray-100">
              {/* Градиентная обводка */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-[2px] bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#8e44ad] -z-10">
                <div className="h-full w-full rounded-xl sm:rounded-2xl bg-white"></div>
              </div>
              
              {/* Заголовочная секция */}
              <div className="service-header flex items-center gap-4 mb-4 sm:mb-6 lg:mb-8">
                {/* Иконки */}
                <div className="service-icon flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#8e44ad] to-[#667eea] flex items-center justify-center shadow-lg">
                    <Icon name="Clock" size={16} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg">
                    <Icon name="Users" size={16} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#764ba2] to-[#8e44ad] flex items-center justify-center shadow-lg">
                    <Icon name="Zap" size={16} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
                
                {/* Заголовок */}
                <h3 className="service-title text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 text-left flex-1">
                  24x7x4
                </h3>
              </div>
              
              {/* Список функций */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Действует в течение 12/36/60 месяцев с даты продажи",
                  "Круглосуточный приём заявок",
                  "Обновления программного обеспечения",
                  "Консультации по вопросам функционирования и настройки",
                  "Авансовая замена вышедшего из строя оборудования",
                  "Отгрузка со склада сервисного центра на следующий рабочий день",
                  "Выезд инженера в течение 4 часов на территории г. Москва и Московской области",
                  "Отгрузка замены в течение 24 часов для других регионов РФ",
                  "Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра"
                ].map((feature, index) => (
                  <div key={index} className="service-feature-item flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={12} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Путь клиента */}
      <section className="journey-section py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="journey-title text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
            Путь клиента
          </h2>
          
          {/* Горизонтальный таймлайн для десктопа */}
          <div className="journey-timeline hidden lg:block">
            <div className="relative">
              {/* Линия соединения */}
              <div className="journey-line absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#32398e] to-[#53c2a4] transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {[
                  { icon: "MessageCircle", title: "Заявка", description: "Обратитесь к нам любым удобным способом" },
                  { icon: "Headphones", title: "Консультация", description: "Наши специалисты проконсультируют по решению" },
                  { icon: "Wrench", title: "Диагностика/Ремонт", description: "Быстрая диагностика и качественный ремонт" },
                  { icon: "Package", title: "Доставка/Замена", description: "Доставим отремонтированное или новое оборудование" }
                ].map((step, index) => (
                  <div
                    key={index}
                    className="journey-step text-center"
                  >
                    <div className="journey-step-icon inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white border-3 sm:border-4 border-[#00acad] rounded-full mb-3 sm:mb-4 lg:mb-6 shadow-lg">
                      <Icon name={step.icon as any} size={20} className="text-[#00acad] sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h4 className="journey-step-title text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h4>
                    <p className="journey-step-description text-sm sm:text-base text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Вертикальный таймлайн для мобильных */}
          <div className="journey-timeline lg:hidden space-y-8">
            {[
              { icon: "MessageCircle", title: "Заявка", description: "Обратитесь к нам любым удобным способом" },
              { icon: "Headphones", title: "Консультация", description: "Наши специалисты проконсультируют по решению" },
              { icon: "Wrench", title: "Диагностика/Ремонт", description: "Быстрая диагностика и качественный ремонт" },
              { icon: "Package", title: "Доставка/Замена", description: "Доставим отремонтированное или новое оборудование" }
            ].map((step, index) => (
              <div
                key={index}
                className="journey-step flex items-start gap-6"
              >
                <div className="journey-step-icon flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#00acad] rounded-full flex items-center justify-center shadow-lg">
                  <Icon name={step.icon as any} size={20} className="text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="flex-1 pt-1 sm:pt-2">
                  <h4 className="journey-step-title text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h4>
                  <p className="journey-step-description text-sm sm:text-base text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WarrantyPage;