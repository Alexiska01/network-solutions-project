import React, { useEffect, useRef } from 'react';
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
  { icon: 'Wrench', title: 'Диагностика / Ремонт', description: 'Оперативная диагностика и качественный ремонт' },
  { icon: 'Package', title: 'Доставка / Замена', description: 'Возвращаем или заменяем оборудование без лишних задержек' }
];

export const CustomerJourney: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    if (!root) return;
    const animEls: Element[] = Array.from(root.querySelectorAll('.journey-anim'));
    if (prefersReduced) {
      animEls.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { root: null, threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    animEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="journey-section pt-4 sm:pt-6 lg:pt-8 xl:pt-10 pb-10 sm:pb-14 lg:pb-20" ref={rootRef}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Desktop / large screens */}
        <div className="journey-timeline journey-anim hidden lg:block">
          <div className="relative journey-track max-w-6xl mx-auto journey-anim">
            <ol className="journey-steps-row flex justify-between gap-8 xl:gap-12 relative z-10 px-2">
              {STEPS.map((step, index) => (
                <li
                  key={index}
                  className="journey-step journey-anim group text-center flex-1 max-w-[240px] mx-auto"
                  style={{ ['--accent' as any]: '#00acad' }}
                >
                  <div className="journey-step-icon inline-flex items-center justify-center w-16 h-16 rounded-xl mb-5 shadow-sm bg-white journey-anim">
                    <Icon name={step.icon as any} size={24} className="text-[--accent]" />
                  </div>
                  <h4 className="journey-step-title journey-anim text-base lg:text-[1.05rem] font-semibold text-gray-900 mb-2 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="journey-step-description journey-anim text-[13px] text-gray-600 leading-snug mx-auto">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        {/* Mobile / tablet vertical timeline */}
        <div className="journey-timeline journey-anim lg:hidden space-y-7">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className="journey-step journey-anim flex items-start gap-5"
              style={{ ['--accent' as any]: '#00acad' }}
            >
              <div className="journey-step-icon journey-anim flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center">
                <Icon name={step.icon as any} size={20} className="text-[--accent]" />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="journey-step-title journey-anim text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-1">
                  {step.title}
                </h4>
                <p className="journey-step-description journey-anim text-[13px] sm:text-[14px] text-gray-600 leading-snug">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
