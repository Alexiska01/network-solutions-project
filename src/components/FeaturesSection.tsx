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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 h-full transition-all duration-700 ease-out hover:bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] hover:border-blue-200/30 hover:-translate-y-1 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                minHeight: "320px",
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <Icon
                    name={feature.icon as any}
                    size={24}
                    className="text-white"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;