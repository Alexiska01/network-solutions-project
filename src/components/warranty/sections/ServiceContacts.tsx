import React from 'react';
import Icon from '@/components/ui/icon';
import '@/components/warranty/ServiceContacts.css';

type Props = {
  generalEmail?: string;
  supportEmail?: string;
  serviceAddress?: string;
  className?: string;
};

type ContactItem = {
  key: 'general' | 'support' | 'address';
  title: string;
  value: string;
  href?: string;
  icon: string;
  color: string;
  desc: string;
};

/**
 * Компактный блок с ключевыми контактами сервиса: общий email, поддержка и адрес сервисного центра.
 * Сделан в стиле карточек гарантии: мягкий градиент, акцент-ободок, аккуратные иконки.
 */
export const ServiceContacts: React.FC<Props> = ({
  generalEmail = 'info@dynaswitch.ru',
  supportEmail = 'service@dynaswitch.ru',
  serviceAddress = 'Переведеновский переулок, 13с22, Москва',
  className
}) => {
  // цвета второй и третьей карточек поменяны местами: support -> #00acad, address -> #0079b6
  const items: ContactItem[] = [
    {
      key: 'general',
      title: 'Связь с нами',
      value: generalEmail,
      href: `mailto:${generalEmail}`,
      icon: 'Mail',
      color: '#32398e',
      desc: 'Общие вопросы и первичные обращения'
    },
    {
      key: 'support',
      title: 'Поддержка сервиса',
      value: supportEmail,
      href: `mailto:${supportEmail}`,
      icon: 'LifeBuoy',
      color: '#00acad',
      desc: 'Технические вопросы и гарантийные заявки'
    },
    {
      key: 'address',
      title: 'Адрес сервисного центра',
      value: serviceAddress,
  href: 'https://yandex.ru/maps/-/CHxTEUmh',
      icon: 'MapPin',
      color: '#0079b6',
      desc: 'Очное обращение и логистика оборудования'
    }
  ];

  const hexToRgba = (hex: string, alpha: number) => {
    const h = hex.replace('#','');
    const bigint = parseInt(h.length===3 ? h.split('').map(c=>c+c).join('') : h,16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <section className={`service-contacts-section py-6 md:py-8 lg:py-10 xl:py-12 ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* декоративная линия теперь рендерится псевдоэлементом секции через CSS */}
  <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-stretch [grid-auto-rows:1fr]">
          {items.map((card) => (
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
              {card.href ? (
                <a
                  href={card.href}
                  className="sc-glow-link inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[--accent] focus:outline-none focus:ring-2 focus:ring-[--accent]/30 rounded whitespace-nowrap"
                >
                  {card.value}
                  <Icon name="ArrowUpRight" size={14} />
                </a>
              ) : (
                <div
                  className={`leading-tight ${card.key === 'address' ? 'text-[13px] sm:text-[14px] text-gray-600 font-normal' : 'text-[14px] sm:text-[15px] text-gray-900 font-medium'}`}
                >
                  {card.value}
                </div>
              )}
              <div className="text-[12px] sm:text-[13px] text-gray-600 leading-snug mt-1.5">
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceContacts;
