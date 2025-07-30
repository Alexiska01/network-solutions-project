import Icon from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Вариативность",
      description:
        "Широкий выбор моделей для создания индивидуального решения любой сложности",
      icon: "Layers",
    },
    {
      title: "Функциональность",
      description: "Программное обеспечение оборудования обладает широкими функциональными возможностями",
      icon: "Cpu",
    },
    {
      title: "Надежность",
      description:
        "Высокое качество оборудования позволяет минимизировать простои ИТ-инфраструктуры",
      icon: "Shield",
    },
    {
      title: "Техподдержка",
      description:
        "Консультации в режиме 24/7 и упреждающая замена оборудования",
      icon: "Headphones",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-white mt-8 md:mt-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className={`text-center mb-8 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <h2
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 font-sans leading-tight"
            style={{ lineHeight: "1.2" }}
          >
            Почему выбирают iDATA
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-4"></div>
          <p
            className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-sans leading-relaxed"
            style={{ lineHeight: "1.4" }}
          >
            Преимущества, которые получают наши клиенты
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 overflow-hidden ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                minHeight: "340px",
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon with enhanced styling */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <Icon
                      name={feature.icon as any}
                      size={28}
                      className="text-white"
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 rounded-2xl border-2 border-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Text content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
                    {feature.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full opacity-60"></div>
                  <p className="text-gray-600 leading-relaxed text-[15px] font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;