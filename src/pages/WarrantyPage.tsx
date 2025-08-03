import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import '@/components/warranty/WarrantyHero.css';

const WarrantyPage: React.FC = () => {
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
            <h1 className="warranty-hero-title warranty-hero-glow-text text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold sm:font-black mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight">
              Гарантия и Сервис
            </h1>
            <h2 className="warranty-hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 lg:mb-8 font-normal lg:font-light tracking-normal sm:tracking-wide">
              Ваш бизнес под надёжной защитой
            </h2>
            <p className="warranty-hero-description text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-normal lg:font-light max-w-3xl mx-auto px-2 sm:px-0">
              Оборудование iDATA всегда под поддержкой: чёткие условия, прозрачный сервис, быстрое реагирование.
            </p>
            
            {/* Дополнительные элементы премиум дизайна */}
            <div className="mt-6 sm:mt-8 lg:mt-12 xl:mt-16 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 px-4 sm:px-0">
              <div className="warranty-hero-interactive flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-5 lg:px-6 py-2 sm:py-3 border border-white/20 text-center">
                <Icon name="Shield" size={16} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span className="text-white font-medium text-xs sm:text-sm lg:text-base">12 месяцев гарантии</span>
              </div>
              <div className="warranty-hero-interactive flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-5 lg:px-6 py-2 sm:py-3 border border-white/20 text-center">
                <Icon name="Clock" size={16} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span className="text-white font-medium text-xs sm:text-sm lg:text-base">24/7 поддержка</span>
              </div>
              <div className="warranty-hero-interactive flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-5 lg:px-6 py-2 sm:py-3 border border-white/20 text-center">
                <Icon name="Zap" size={16} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span className="text-white font-medium text-xs sm:text-sm lg:text-base">Быстрое реагирование</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция Гарантия */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.3 }
            }}
            className="warranty-card bg-white rounded-2xl p-8 lg:p-10 max-w-2xl w-full shadow-[0_10px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)'
            }}
          >
            {/* Градиентная обводка */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#32398e] via-[#005baa] to-[#00acad] -z-10">
              <div className="h-full w-full rounded-2xl bg-white"></div>
            </div>
            
            {/* Иконка */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#005baa] to-[#00acad] flex items-center justify-center shadow-lg">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
            </motion.div>
              
            {/* Заголовок */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8"
            >
              Гарантия на оборудование
            </motion.h3>
                
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.4 + index * 0.1, 
                    duration: 0.5,
                    ease: [0.6, 0.05, 0.01, 0.99]
                  }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0093b6] to-[#00acad] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция Сервисные пакеты */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-12 xl:mb-16"
          >
            Сервисные пакеты
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Пакет 8x5xNBD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gradient-to-br from-[#0079b6] to-[#0093b6] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <Icon name="Clock" size={32} className="text-white sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                <Icon name="Settings" size={32} className="text-white sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                8x5xNBD
              </h3>
              
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base lg:text-lg">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Действует в течение 12/36/60 месяцев с даты продажи</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Обновления программного обеспечения</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Консультации по вопросам функционирования и настройки</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Авансовая замена вышедшего из строя оборудования</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Отгрузка со склада сервисного центра на следующий рабочий день</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра</span>
                </li>
              </ul>
            </motion.div>

            {/* Пакет 24x7x4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.6, 0.05, 0.01, 0.99] }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gradient-to-br from-[#32398e] to-[#005baa] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <Icon name="Clock" size={28} className="text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                <Icon name="Users" size={28} className="text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
                <Icon name="Zap" size={28} className="text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12" />
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                24x7x4
              </h3>
              
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base lg:text-lg">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Действует в течение 12/36/60 месяцев с даты продажи</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Круглосуточный приём заявок</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Обновления программного обеспечения</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Консультации по вопросам функционирования и настройки</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Авансовая замена вышедшего из строя оборудования</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Отгрузка со склада сервисного центра на следующий рабочий день</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Выезд инженера в течение 4 часов на территории г. Москва и Московской области</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Отгрузка замены в течение 24 часов для других регионов РФ</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Icon name="Check" size={16} className="text-white flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                  <span>Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Путь клиента */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-12 xl:mb-16"
          >
            Путь клиента
          </motion.h2>
          
          {/* Горизонтальный таймлайн для десктопа */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Линия соединения */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#32398e] to-[#53c2a4] transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {[
                  { icon: "MessageCircle", title: "Заявка", description: "Обратитесь к нам любым удобным способом" },
                  { icon: "Headphones", title: "Консультация", description: "Наши специалисты проконсультируют по решению" },
                  { icon: "Wrench", title: "Диагностика/Ремонт", description: "Быстрая диагностика и качественный ремонт" },
                  { icon: "Package", title: "Доставка/Замена", description: "Доставим отремонтированное или новое оборудование" }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, 0.05, 0.01, 0.99] }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white border-3 sm:border-4 border-[#00acad] rounded-full mb-3 sm:mb-4 lg:mb-6 shadow-lg">
                      <Icon name={step.icon as any} size={20} className="text-[#00acad] sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Вертикальный таймлайн для мобильных */}
          <div className="lg:hidden space-y-8">
            {[
              { icon: "MessageCircle", title: "Заявка", description: "Обратитесь к нам любым удобным способом" },
              { icon: "Headphones", title: "Консультация", description: "Наши специалисты проконсультируют по решению" },
              { icon: "Wrench", title: "Диагностика/Ремонт", description: "Быстрая диагностика и качественный ремонт" },
              { icon: "Package", title: "Доставка/Замена", description: "Доставим отремонтированное или новое оборудование" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.6, 0.05, 0.01, 0.99] }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#00acad] rounded-full flex items-center justify-center shadow-lg">
                  <Icon name={step.icon as any} size={20} className="text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="flex-1 pt-1 sm:pt-2">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h4>
                  <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WarrantyPage;