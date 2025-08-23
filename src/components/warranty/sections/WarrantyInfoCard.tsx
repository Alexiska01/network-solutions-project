import React from 'react';
import Icon from '@/components/ui/icon';
import '@/components/warranty/WarrantyCard.css';

interface CompactCard {
  key: string;
  title: string;
  icon: string;
  color: string; // primary accent hex
  items: { title?: string; desc: string }[];
}

const WARRANTY_CARDS: CompactCard[] = [
  {
    key: 'warranty',
    title: 'Гарантия на оборудование',
    icon: 'Shield',
    color: '#32398e',
    items: [
      { title: '12 месяцев гарантии', desc: 'Действует с момента продажи оборудования' },
      { title: 'Базовая поддержка', desc: 'Включена в гарантийную поддержку' },
      { title: 'Рабочие часы', desc: 'Приём заявок с 9:00 до 18:00 по московскому времени' },
      { title: 'Обновления ПО', desc: 'Предоставляются по запросу' },
      { title: 'Ремонт/замена', desc: 'Восстановление в течение 60 рабочих дней' },
      { title: 'Условия доставки', desc: 'Доставка в сервисный центр за счёт заказчика' }
    ]
  },
  {
    key: '8x5xNBD',
    title: 'Поддержка 8x5xNBD',
    icon: 'Clock',
    color: '#00acad',
    items: [
      { title: 'Сервисная поддержка на 12/36/60 месяцев', desc: 'Действует с момента продажи оборудования' },
  { title: 'Расширенная поддержка', desc: 'Консультации по эксплуатации и настройке' },
      { title: 'Рабочие часы', desc: 'Приём заявок с 9:00 до 18:00 по московскому времени' },
      { title: 'Обновления ПО', desc: 'Предоставляются по запросу' },
      { title: 'Замена вышедшего из строя оборудования', desc: 'Отгрузка со склада СЦ на следующий рабочий день' },
      { title: 'Условия доставки', desc: 'Доставка в СЦ и возврат - за счёт сервисного центра' }
    ]
  },
  {
    key: '24x7x4',
    title: 'Поддержка 24x7x4',
    icon: 'Zap',
    color: '#0079b6',
    items: [
      { title: 'Сервисная поддержка на 12/36/60 месяцев', desc: 'Действует с момента продажи оборудования' },
  { title: 'Расширенная поддержка', desc: 'Консультации по эксплуатации и настройке' },
      { title: 'Рабочие часы', desc: 'Круглосуточный приём заявок' },
      { title: 'Обновления ПО', desc: 'Предоставляются по запросу' },
      { title: 'Замена вышедшего из строя оборудования', desc: 'Отгрузка со склада СЦ в течение 4 часов' },
      { title: 'Условия доставки', desc: 'Доставка в СЦ и возврат - за счёт сервисного центра' }
    ]
  }
];

// helper: convert hex (#rrggbb) to rgba with alpha
const hexToRgba = (hex: string, alpha: number) => {
  const h = hex.replace('#','');
  const bigint = parseInt(h.length===3 ? h.split('').map(c=>c+c).join('') : h,16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export const WarrantyInfoCard: React.FC = () => {
  return (
  <section className="py-6 md:py-8 lg:py-10 xl:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-stretch">
          {WARRANTY_CARDS.map(card => (
            <div
              key={card.key}
              className="warranty-card compact bg-white rounded-2xl p-6 lg:p-7 relative overflow-hidden flex flex-col justify-center h-full"
              style={{
                background: 'linear-gradient(150deg,#ffffff,#f8fafc)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
                border: `1px solid ${hexToRgba(card.color,0.55)}`,
                ['--accent' as any]: card.color
              }}
              data-hover-style="3"
            >
              <div className="warranty-header flex items-center gap-3 mb-5">
                <div className="warranty-icon flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, var(--accent), var(--accent))` }}>
                    <Icon name={card.icon as any} size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="warranty-title text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight">{card.title}</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {card.items.map((it, idx) => (
                  <li key={idx} className="warranty-feature-item flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 inline-flex w-5 h-5 rounded-full items-center justify-center" style={{ background: 'var(--accent)' }}>
                      <Icon name="Check" size={12} className="text-white" />
                    </span>
                    <div className="flex-1 leading-snug">
                      {it.title && <div className="font-semibold text-gray-900 text-[13px] sm:text-[14px] mb-0.5">{it.title}</div>}
                      <div className="text-[12px] sm:text-[13px] text-gray-700">{it.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
