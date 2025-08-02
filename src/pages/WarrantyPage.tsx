import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import '@/components/warranty/RevolutionaryHero.css';

const WarrantyPage: React.FC = () => {
  return (
    <div className="revolutionary-full-page min-h-screen">
      {/* Глобальная динамическая сетка для всей страницы */}
      <div className="revolutionary-full-grid"></div>
      
      <Header />
      
      {/* Контейнер для всех секций */}
      <div className="revolutionary-sections-container">
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
            
            {/* Правая панель с базовой информацией */}
            <div className="revolutionary-interactive-panel">
              {/* Мега карточка 1: Базовая гарантия с полным контентом */}
              <div className="revolutionary-mega-card-expanded">
                <h3 className="revolutionary-expanded-title">
                  <Icon name="Shield" size={32} className="text-white" />
                  Гарантия на оборудование
                </h3>
                <ul className="revolutionary-list">
                  <li className="revolutionary-list-item">
                    <div className="revolutionary-list-icon">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="revolutionary-list-text">
                      Всё оборудование поставляется с базовой гарантийной поддержкой
                    </span>
                  </li>
                  <li className="revolutionary-list-item">
                    <div className="revolutionary-list-icon">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="revolutionary-list-text">
                      Гарантия действует в течение 12 месяцев с даты продажи
                    </span>
                  </li>
                  <li className="revolutionary-list-item">
                    <div className="revolutionary-list-icon">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="revolutionary-list-text">
                      Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени
                    </span>
                  </li>
                  <li className="revolutionary-list-item">
                    <div className="revolutionary-list-icon">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="revolutionary-list-text">
                      Обновления программного обеспечения
                    </span>
                  </li>
                  <li className="revolutionary-list-item">
                    <div className="revolutionary-list-icon">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="revolutionary-list-text">
                      Ремонт либо замена вышедшего из строя оборудования в течение 60 рабочих дней
                    </span>
                  </li>
                  <li className="revolutionary-list-item">
                    <div className="revolutionary-list-icon">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="revolutionary-list-text">
                      Доставка в сервисный центр и возврат осуществляется за счёт заказчика
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* СЕРВИСНЫЕ ПАКЕТЫ В РЕВОЛЮЦИОННОМ СТИЛЕ */}
        <section className="revolutionary-section">
          <div className="revolutionary-section-grid">
            {/* Пакет 8x5xNBD */}
            <div className="revolutionary-mega-card-expanded revolutionary-service-package">
              <h3 className="revolutionary-expanded-title">
                <Icon name="Clock" size={32} className="text-white" />
                <Icon name="Settings" size={32} className="text-white" />
                8x5xNBD
              </h3>
              <ul className="revolutionary-list">
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Действует в течение 12/36/60 месяцев с даты продажи
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Обновления программного обеспечения
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Консультации по вопросам функционирования и настройки
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Авансовая замена вышедшего из строя оборудования
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Отгрузка со склада сервисного центра на следующий рабочий день
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра
                  </span>
                </li>
              </ul>
            </div>

            {/* Пакет 24x7x4 */}
            <div className="revolutionary-mega-card-expanded revolutionary-service-package premium">
              <h3 className="revolutionary-expanded-title">
                <Icon name="Clock" size={28} className="text-white" />
                <Icon name="Users" size={28} className="text-white" />
                <Icon name="Zap" size={28} className="text-white" />
                24x7x4
              </h3>
              <ul className="revolutionary-list">
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Действует в течение 12/36/60 месяцев с даты продажи
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Круглосуточный приём заявок
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Обновления программного обеспечения
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Консультации по вопросам функционирования и настройки
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Авансовая замена вышедшего из строя оборудования
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Отгрузка со склада сервисного центра на следующий рабочий день
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Выезд инженера в течение 4 часов на территории г. Москва и Московской области
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Отгрузка замены в течение 24 часов для других регионов РФ
                  </span>
                </li>
                <li className="revolutionary-list-item">
                  <div className="revolutionary-list-icon">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="revolutionary-list-text">
                    Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ПУТЬ КЛИЕНТА В РЕВОЛЮЦИОННОМ СТИЛЕ */}
        <section className="revolutionary-section">
          <div className="revolutionary-section-grid single-column">
            <div className="revolutionary-mega-card-expanded">
              <h2 className="revolutionary-expanded-title">
                <Icon name="Route" size={32} className="text-white" />
                Путь клиента
              </h2>
              
              {/* Революционная временная шкала */}
              <div className="revolutionary-timeline">
                <div className="revolutionary-timeline-line"></div>
                <div className="revolutionary-timeline-grid">
                  <div className="revolutionary-timeline-step">
                    <div className="revolutionary-timeline-icon">
                      <Icon name="MessageCircle" size={24} className="text-[#00acad]" />
                    </div>
                    <h4 className="revolutionary-timeline-title">Заявка</h4>
                    <p className="revolutionary-timeline-description">
                      Обратитесь к нам любым удобным способом
                    </p>
                  </div>
                  
                  <div className="revolutionary-timeline-step">
                    <div className="revolutionary-timeline-icon">
                      <Icon name="Headphones" size={24} className="text-[#00acad]" />
                    </div>
                    <h4 className="revolutionary-timeline-title">Консультация</h4>
                    <p className="revolutionary-timeline-description">
                      Наши специалисты проконсультируют по решению
                    </p>
                  </div>
                  
                  <div className="revolutionary-timeline-step">
                    <div className="revolutionary-timeline-icon">
                      <Icon name="Wrench" size={24} className="text-[#00acad]" />
                    </div>
                    <h4 className="revolutionary-timeline-title">Диагностика/Ремонт</h4>
                    <p className="revolutionary-timeline-description">
                      Быстрая диагностика и качественный ремонт
                    </p>
                  </div>
                  
                  <div className="revolutionary-timeline-step">
                    <div className="revolutionary-timeline-icon">
                      <Icon name="Package" size={24} className="text-[#00acad]" />
                    </div>
                    <h4 className="revolutionary-timeline-title">Доставка/Замена</h4>
                    <p className="revolutionary-timeline-description">
                      Доставим отремонтированное или новое оборудование
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default WarrantyPage;