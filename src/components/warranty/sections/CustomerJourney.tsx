import React from 'react';
import Icon from '@/components/ui/icon';
import '@/components/warranty/JourneyPath.css';

interface JourneyStep {
  icon: string;
  title: string;
  description: string;
}

const STEPS: JourneyStep[] = [
  { icon: 'MessageCircle', title: 'Заявка', description: 'Обратитесь к нам любым удобным способом' },
  { icon: 'Headphones', title: 'Консультация', description: 'Наши специалисты проконсультируют по решению' },
  { icon: 'Wrench', title: 'Диагностика/Ремонт', description: 'Быстрая диагностика и качественный ремонт' },
  { icon: 'Package', title: 'Доставка/Замена', description: 'Доставим отремонтированное или новое оборудование' }
];

export const CustomerJourney: React.FC = () => {
  return (
    <section className="journey-section py-8 sm:py-12 lg:py-16 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="journey-title text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-center text-gray-900 mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
          Путь клиента
        </h2>
        <div className="journey-timeline hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {STEPS.map((step, index) => (
                <div key={index} className="journey-step text-center">
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
        <div className="journey-timeline lg:hidden space-y-8">
          {STEPS.map((step, index) => (
            <div key={index} className="journey-step flex items-start gap-6">
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
  );
};
