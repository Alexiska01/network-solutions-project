import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const WarrantyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero блок */}
      <section className="relative bg-gradient-to-r from-[#32398e] via-[#005baa] via-[#0079b6] via-[#0093b6] via-[#00acad] to-[#53c2a4] py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Гарантия и Сервис
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.6, 0.05, 0.01, 0.99] }}
              className="text-xl lg:text-2xl mb-6 opacity-90"
            >
              Ваш бизнес под надёжной защитой
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.99] }}
              className="text-lg lg:text-xl opacity-80 leading-relaxed"
            >
              Оборудование iDATA всегда под поддержкой: чёткие условия, прозрачный сервис, быстрое реагирование.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Секция Гарантия */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            whileHover={{ backgroundColor: "#f3f7fa" }}
            className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
          >
            {/* Цветная полоса */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00acad] group-hover:w-2 transition-all duration-500"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <motion.div
                whileHover={{ scale: 1.1, color: "#00acad" }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <Icon name="Shield" size={64} className="text-[#00acad]" />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                  Гарантия на оборудование
                </h3>
                
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-[#00acad] flex-shrink-0 mt-1" />
                    <span>Всё оборудование поставляется с базовой гарантийной поддержкой</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-[#00acad] flex-shrink-0 mt-1" />
                    <span>Гарантия действует в течение 12 месяцев с даты продажи</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-[#00acad] flex-shrink-0 mt-1" />
                    <span>Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-[#00acad] flex-shrink-0 mt-1" />
                    <span>Обновления программного обеспечения</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-[#00acad] flex-shrink-0 mt-1" />
                    <span>Ремонт либо замена вышедшего из строя оборудования в течение 60 рабочих дней</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={20} className="text-[#00acad] flex-shrink-0 mt-1" />
                    <span>Доставка в сервисный центр и возврат осуществляется за счёт заказчика</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция Сервисные пакеты */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            className="text-3xl lg:text-5xl font-bold text-center text-gray-900 mb-16"
          >
            Сервисные пакеты
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Пакет 8x5xNBD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gradient-to-br from-[#0079b6] to-[#0093b6] rounded-2xl p-8 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <Icon name="Clock" size={48} className="text-white" />
                <Icon name="Settings" size={48} className="text-white" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold mb-8">
                8x5xNBD
              </h3>
              
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Действует в течение 12/36/60 месяцев с даты продажи</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Обновления программного обеспечения</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Консультации по вопросам функционирования и настройки</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Авансовая замена вышедшего из строя оборудования</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Отгрузка со склада сервисного центра на следующий рабочий день</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
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
              className="bg-gradient-to-br from-[#32398e] to-[#005baa] rounded-2xl p-8 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <Icon name="Clock" size={48} className="text-white" />
                <Icon name="Users" size={48} className="text-white" />
                <Icon name="Zap" size={48} className="text-white" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold mb-8">
                24x7x4
              </h3>
              
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Действует в течение 12/36/60 месяцев с даты продажи</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Круглосуточный приём заявок</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Обновления программного обеспечения</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Консультации по вопросам функционирования и настройки</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Авансовая замена вышедшего из строя оборудования</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Отгрузка со склада сервисного центра на следующий рабочий день</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Выезд инженера в течение 4 часов на территории г. Москва и Московской области</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Отгрузка замены в течение 24 часов для других регионов РФ</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="text-white flex-shrink-0 mt-1" />
                  <span>Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Путь клиента */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }}
            className="text-3xl lg:text-5xl font-bold text-center text-gray-900 mb-16"
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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-4 border-[#00acad] rounded-full mb-6 shadow-lg">
                      <Icon name={step.icon as any} size={32} className="text-[#00acad]" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
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
                <div className="flex-shrink-0 w-16 h-16 bg-[#00acad] rounded-full flex items-center justify-center shadow-lg">
                  <Icon name={step.icon as any} size={32} className="text-white" />
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
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