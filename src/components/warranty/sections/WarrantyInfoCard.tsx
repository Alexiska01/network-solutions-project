import React from 'react';
import Icon from '@/components/ui/icon';
import '@/components/warranty/WarrantyCard.css';

export const WarrantyInfoCard: React.FC = () => {
  const items = [
    { title: '12 месяцев гарантии', desc: 'Гарантия действует с момента продажи оборудования' },
    { title: 'Базовая поддержка', desc: 'Всё оборудование поставляется с гарантийной поддержкой' },
    { title: 'Рабочие часы', desc: 'Приём заявок с 9:00 до 18:00 по московскому времени' },
    { title: 'Обновления ПО', desc: 'Регулярные обновления программного обеспечения' },
    { title: 'Ремонт/замена', desc: 'Восстановление в течение 60 рабочих дней' },
    { title: 'Условия доставки', desc: 'Доставка в сервисный центр за счёт заказчика' }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 flex justify-center">
        <div
          className="warranty-card bg-white rounded-2xl p-8 lg:p-10 max-w-2xl w-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#32398e] via-[#005baa] to-[#00acad] -z-10">
            <div className="h-full w-full rounded-2xl bg-white" />
          </div>

          <div className="warranty-header flex items-center justify-center lg:justify-center gap-4 mb-8">
            <div className="warranty-icon flex-shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#005baa] to-[#00acad] flex items-center justify-center shadow-lg">
                <Icon name="Shield" size={24} className="text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>
            </div>
            <h3 className="warranty-title text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 text-left lg:text-center flex-1 lg:flex-none">
              Гарантия на оборудование
            </h3>
          </div>

          <div className="space-y-5">
            {items.map((item, i) => (
              <div key={i} className="warranty-feature-item flex gap-4 items-start">
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
  );
};
