import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";
import { useInViewAnimate } from "@/hooks/useInViewAnimate";
import './3530/DeviceCard3530.css';

type Feature = {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
};

const FEATURES: Feature[] = [
  {
    title: "Объединение устройств в стек",
    description:
      "Объединяет в одно логическое устройство до 8 коммутаторов. Для стекирования используются стандартные порты 10G SFP+.",
    icon: "GitBranch",
  },
  {
    title: "PoE/PoE+ для питания устройств",
    description:
      "Обеспечивает возможность подачи электропитания на подключаемые устройства, такие как: точки доступа, телефоны, видеокамеры и другие типы устройств.",
    icon: "Zap",
  },
  {
    title: "Технологии высокой доступности",
    description:
      "Из семейства Spanning Tree, таких как STP, RSTP и MSTP. Кроме того, для работы в кольцевых топологиях поддерживается ITU-T G.8032.",
    icon: "Activity",
  },
  {
    title: "Быстрая начальная настройка",
    description:
      "Благодаря интегрированной поддержке технологии ZTP можно просто и быстро добавить новый коммутатор к существующей сети без участия сетевого администратора.",
    icon: "Wrench",
  },
  {
    title: "Технология MPLS",
    description:
      "Поддержка технологии MPLS позволяет использовать коммутаторы серии в качестве пограничных устройств в сетях операторов услуг связи.",
    icon: "Network",
  },
  {
    title: "Статическая и динамическая маршрутизация",
    description:
      "Коммутаторы поддерживают статическую и динамическую маршрутизацию для IPv4 и IPv6.",
    icon: "Route",
  },
  {
    title: "Информационная безопасность",
    description:
      "Для аутентификации пользователей и разграничения прав доступа к сетевым ресурсам используется технология 802.1X и списки доступа (ACL).",
    icon: "Shield",
  },
  {
    title: "Функции сетевого управления",
    description:
      "Для удалённого управления устройствами поддерживается использование технологий: SNMPv2 и v3; Netconf и Yang; RMON и SYSLOG, а также Telnet и SSH.",
    icon: "Settings",
  },
  {
    title: "Поддержка технологий IPv4 и IPv6",
    description:
      "Коммутаторы серии могут быть использованы как при построении IPv4 или IPv6 сетей, так и смешанных сетях с использованием обеих версий протокола.",
    icon: "Globe",
  },
  {
    title: "Механизмы качества обслуживания",
    description:
      "Коммутаторы поддерживают восемь очередей на каждом порту устройства и возможность использования алгоритмов SP, RR, WRR и WDRR для управления очередями. Классификация и приоритезация трафика может быть выполнена на основе полей 802.1p, CoS и DSCP.",
    icon: "Gauge",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 80);
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`device-card-premium backdrop-blur-md bg-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/25 shadow-lg hover:bg-white/[0.22] hover:border-white/40 transition-all duration-300 transform-gpu ${
        isVisible ? 'is-visible' : 'is-hidden'
      }`}
      style={{
        '--delay': `${index * 80}ms`
      } as React.CSSProperties}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10">
          <Icon
            name={feature.icon}
            size={18}
            className="text-white sm:size-5 md:size-4"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2 tracking-wide">
            {feature.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const KeyFeatures3530 = () => {
  const { ref, inView } = useInViewAnimate(0.1);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (inView && !hasTriggered) setHasTriggered(true);
  }, [inView, hasTriggered]);

  return (
    <section
      ref={ref}
      className={`device-card-premium py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-10 bg-white/10 rounded-2xl sm:rounded-3xl shadow-xl backdrop-blur-xl ${
        hasTriggered ? 'is-visible' : 'is-hidden'
      }`}
    >
      <div className="text-center mb-6 sm:mb-8 pt-1 sm:pt-2">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-5 tracking-wide drop-shadow-sm">
          Ключевые характеристики коммутаторов серии
        </h2>
        <div className="w-16 h-px bg-gradient-to-r from-[#0065B3] via-[#4DB1D4] to-[#0065B3] mx-auto opacity-80" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-7">
        {FEATURES.map((feature, index) => (
          <FeatureCard feature={feature} index={index} key={feature.title} />
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures3530;