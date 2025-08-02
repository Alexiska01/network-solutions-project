import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import '@/components/warranty/RevolutionaryHero.css';

const WarrantyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* РЕВОЛЮЦИОННЫЙ HERO-БЛОК МИРОВОГО УРОВНЯ */}
      <section className="revolutionary-hero">
        {/* Динамическая сетка */}
        <div className="revolutionary-grid"></div>
        
        {/* 3D геометрические формы */}
        <div className="revolutionary-shapes">
          <div className="revolutionary-shape"></div>
          <div className="revolutionary-shape"></div>
          <div className="revolutionary-shape"></div>
        </div>
        
        {/* Основной контент с асимметричным layout */}
        <div className="revolutionary-content">
          {/* Левая панель с текстом */}
          <div className="revolutionary-text-panel">
            <h1 className="revolutionary-title">
              Гарантия и Сервис
            </h1>
            <h2 className="revolutionary-subtitle">
              Ваш бизнес под надёжной защитой
            </h2>
            <p className="revolutionary-description">
              Оборудование iDATA всегда под поддержкой: чёткие условия, прозрачный сервис, быстрое реагирование.
            </p>
            
            {/* Статистика с анимированными числами */}
            <div className="revolutionary-stats">
              <div className="revolutionary-stat">
                <span className="revolutionary-stat-number">12</span>
                <span className="revolutionary-stat-label">месяцев гарантии</span>
              </div>
              <div className="revolutionary-stat">
                <span className="revolutionary-stat-number">24/7</span>
                <span className="revolutionary-stat-label">поддержка</span>
              </div>
              <div className="revolutionary-stat">
                <span className="revolutionary-stat-number">4ч</span>
                <span className="revolutionary-stat-label">время отклика</span>
              </div>
            </div>
            
            {/* CTA кнопки нового поколения */}
            <div className="revolutionary-cta-group">
              <button className="revolutionary-cta">
                Получить консультацию
              </button>
              <button className="revolutionary-cta revolutionary-cta-secondary">
                Узнать больше
              </button>
            </div>
          </div>
          
          {/* Правая панель с интерактивными элементами */}
          <div className="revolutionary-interactive-panel">
            {/* Мега карточка 1: Базовая гарантия */}
            <div className="revolutionary-mega-card">
              <div className="revolutionary-card-icon">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="revolutionary-card-title">Базовая гарантия</h3>
              <p className="revolutionary-card-description">
                12 месяцев полной защиты с обновлениями ПО и технической поддержкой
              </p>
            </div>
            
            {/* Мега карточка 2: Премиум сервис */}
            <div className="revolutionary-mega-card">
              <div className="revolutionary-card-icon">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h3 className="revolutionary-card-title">Премиум сервис</h3>
              <p className="revolutionary-card-description">
                24/7 мониторинг, выезд инженера за 4 часа и авансовая замена оборудования
              </p>
            </div>
            
            {/* Мега карточка 3: Профессиональная поддержка */}
            <div className="revolutionary-mega-card">
              <div className="revolutionary-card-icon">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <h3 className="revolutionary-card-title">Профессиональная поддержка</h3>
              <p className="revolutionary-card-description">
                Команда экспертов с 10+ летним опытом, консультации по настройке и оптимизации
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Секция Гарантия */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            whileHover={{ backgroundColor: "#f3f7fa" }}
            className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
          >
            {/* Цветная полоса */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00acad] group-hover:w-2 transition-all duration-500"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8">
              <motion.div
                whileHover={{ scale: 1.1, color: "#00acad" }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 self-center lg:self-start"
              >
                <Icon name="Shield" size={48} className="text-[#00acad] sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                  Гарантия на оборудование
                </h3>
                
                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg text-gray-700">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Check" size={16} className="text-[#00acad] flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                    <span>Всё оборудование поставляется с базовой гарантийной поддержкой</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Check" size={16} className="text-[#00acad] flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                    <span>Гарантия действует в течение 12 месяцев с даты продажи</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Check" size={16} className="text-[#00acad] flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                    <span>Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Check" size={16} className="text-[#00acad] flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                    <span>Обновления программного обеспечения</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Check" size={16} className="text-[#00acad] flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                    <span>Ремонт либо замена вышедшего из строя оборудования в течение 60 рабочих дней</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Icon name="Check" size={16} className="text-[#00acad] flex-shrink-0 mt-0.5 sm:mt-1 sm:w-5 sm:h-5" />
                    <span>Доставка в сервисный центр и возврат осуществляется за счёт заказчика</span>
                  </li>
                </ul>
              </div>
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