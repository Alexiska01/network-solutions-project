import React from 'react';
import Icon from '@/components/ui/icon';
import '@/components/warranty/ServiceCard.css';

interface ServicePackageCardProps {
  variant: '8x5xNBD' | '24x7x4';
}

const PACKAGE_DATA: Record<string, { title: string; gradient: string[]; iconSet: { icon: string; size: number; gradient: string }[]; features: string[]; } > = {
  '8x5xNBD': {
    title: '8x5xNBD',
    gradient: ['from-[#FF6B35] via-[#F7931E] to-[#FF8C00]','from-[#FF6B35] to-[#F7931E]'],
    iconSet: [
      { icon: 'Clock', size: 20, gradient: 'from-[#FF6B35] to-[#F7931E]' },
      { icon: 'Settings', size: 20, gradient: 'from-[#F7931E] to-[#FF8C00]' }
    ],
    features: [
      'Действует в течение 12/36/60 месяцев с даты продажи',
      'Приём заявок в рабочие дни с 9:00 до 18:00 по московскому времени',
      'Обновления программного обеспечения',
      'Консультации по вопросам функционирования и настройки',
      'Авансовая замена вышедшего из строя оборудования',
      'Отгрузка со склада сервисного центра на следующий рабочий день',
      'Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра'
    ]
  },
  '24x7x4': {
    title: '24x7x4',
    gradient: ['from-[#667eea] via-[#764ba2] to-[#8e44ad]','from-[#667eea] to-[#764ba2]'],
    iconSet: [
      { icon: 'Clock', size: 16, gradient: 'from-[#8e44ad] to-[#667eea]' },
      { icon: 'Users', size: 16, gradient: 'from-[#667eea] to-[#764ba2]' },
      { icon: 'Zap', size: 16, gradient: 'from-[#764ba2] to-[#8e44ad]' }
    ],
    features: [
      'Действует в течение 12/36/60 месяцев с даты продажи',
      'Круглосуточный приём заявок',
      'Обновления программного обеспечения',
      'Консультации по вопросам функционирования и настройки',
      'Авансовая замена вышедшего из строя оборудования',
      'Отгрузка со склада сервисного центра на следующий рабочий день',
      'Выезд инженера в течение 4 часов на территории г. Москва и Московской области',
      'Отгрузка замены в течение 24 часов для других регионов РФ',
      'Доставка в сервисный центр и возврат осуществляется за счёт сервисного центра'
    ]
  }
};

const ServicePackageCard: React.FC<ServicePackageCardProps> = ({ variant }) => {
  const data = PACKAGE_DATA[variant];
  return (
    <div className="service-card bg-white relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl border border-gray-100">
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl p-[2px] bg-gradient-to-r ${data.gradient[0]} -z-10`}>
        <div className="h-full w-full rounded-xl sm:rounded-2xl bg-white" />
      </div>
      <div className="service-header flex items-center gap-4 mb-4 sm:mb-6 lg:mb-8">
        <div className="service-icon flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {data.iconSet.map((ic, idx) => (
            <div key={idx} className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${ic.gradient} flex items-center justify-center shadow-lg`}>
              <Icon name={ic.icon as any} size={ic.size} className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>
          ))}
        </div>
        <h3 className="service-title text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 text-left flex-1">{data.title}</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {data.features.map((f, i) => (
          <div key={i} className="service-feature-item flex items-start gap-3">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r ${data.gradient[1]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Icon name="Check" size={12} className="text-white sm:w-4 sm:h-4" />
            </div>
            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ServicePackagesSection: React.FC = () => {
  return (
    <section id="service-packages" className="py-12 sm:py-16 lg:py-20 xl:py-28 bg-gray-50">
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
          <ServicePackageCard variant="8x5xNBD" />
          <ServicePackageCard variant="24x7x4" />
        </div>
      </div>
    </section>
  );
};
