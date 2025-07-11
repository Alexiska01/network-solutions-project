import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import * as LucideIcons from "lucide-react";
import { useInViewAnimate } from "@/hooks/useInViewAnimate";

type Feature = {
  title: string;
  description: string;
  icon: keyof typeof LucideIcons;
};

const FEATURES: Feature[] = [
  {
    title: "Объединение устройств в стек",
    description:
      "Технология стекирования позволяет объединить в одно логическое устройство до 8 коммутаторов. Для стекирования используются стандартные порты 10G SFP+.",
    icon: "GitBranch",
  },
  {
    title: "Механизмы качества обслуживания",
    description:
      "Коммутаторы поддерживают восемь очередей на каждом порту устройства и возможность использования алгоритмов SP, RR, WRR и WDRR для управления очередями.",
    icon: "Gauge",
  },
  {
    title: "PoE/PoE+ для питания устройств",
    description:
      "Поддержка технологий PoE/PoE+ обеспечивает возможность подачи электропитания на подключенные устройства, такие как: точки доступа, телефоны, видеокамеры.",
    icon: "Zap",
  },
  {
    title: "Информационная безопасность",
    description:
      "Для аутентификации пользователей и разграничения прав доступа к сетевым ресурсам используются технологии 802.1X и списки доступа (ACL).",
    icon: "Shield",
  },
  {
    title: "Технологии высокой доступности",
    description:
      "Поддерживаются полный набор протоколов из семейства Spanning Tree, таких как STP, RSTP и MSTP. Кроме того, для работы в кольцевых топологиях, поддерживается ITU-T G.8032.",
    icon: "Activity",
  },
  {
    title: "Функции сетевого управления",
    description:
      "Для удаленного управления устройствами, поддерживается использование технологий SNMP v2 и v3, Netconf и Yang; RMON версий 1, 2, 3, а также Telnet и SSH.",
    icon: "Settings",
  },
  {
    title: "Быстрая начальная настройка",
    description:
      "Благодаря интегрированной поддержке технологии ZTP можно легко добавить новый коммутатор к существующей сети без участия сетевого администратора.",
    icon: "Wrench",
  },
  {
    title: "Поддержка технологий IPv4 и IPv6",
    description:
      "Благодаря аппаратной поддержке IPv4 и IPv6, коммутаторы серии могут быть использованы как при построении IPv4 или IPv6 сетей, так и смешанных сетях.",
    icon: "Globe",
  },
  {
    title: "Технологии сетевой виртуализации",
    description:
      "Благодаря различным поддерживаемым технологиям VXLAN в операционной системе коммутатора, устройства данной серии могут использоваться при построении центров обработки данных.",
    icon: "Layers",
  },
  {
    title: "Статическая и динамическая маршрутизация",
    description:
      "Коммутаторы поддерживают статическую и динамическую маршрутизацию для IPv4 и IPv6.",
    icon: "Route",
  },
  {
    title: "Технологии MPLS",
    description:
      "Поддержка технологии MPLS позволяет использовать коммутаторы серии в качестве пограничных устройств в сетях операторов услуг связи.",
    icon: "Network",
  },
];

// Только значения! (без transition, без ease)
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function FeatureCard({
  feature,
  big = false,
}: {
  feature: Feature;
  big?: boolean;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: "0px 8px 24px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={`backdrop-blur-md bg-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/25 shadow-lg hover:bg-white/[0.22] hover:border-white/40 transition-all duration-300 ${big ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/30 flex items-center justify-center">
          <Icon
            name={feature.icon}
            size={16}
            className="text-white sm:size-5"
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
    </motion.div>
  );
}

const KeyFeatures = () => {
  const { ref, inView } = useInViewAnimate(0.23);
  const wasAnimated = useRef(false);

  useEffect(() => {
    if (inView) wasAnimated.current = true;
  }, [inView]);

  const animateState = wasAnimated.current
    ? "visible"
    : inView
      ? "visible"
      : "hidden";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-10 bg-white/10 rounded-2xl sm:rounded-3xl shadow-xl backdrop-blur-xl"
    >
      <div className="text-center mb-6 sm:mb-8 pt-1 sm:pt-2">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-5 tracking-wide drop-shadow-sm">
          Ключевые характеристики коммутаторов серии
        </h2>
        <div className="w-16 h-px bg-gradient-to-r from-[#0065B3] via-[#4DB1D4] to-[#0065B3] mx-auto opacity-80" />
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-7"
        initial="hidden"
        animate={animateState}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.11, delayChildren: 0.14 },
          },
        }}
      >
        {/* Все карточки кроме последней */}
        {FEATURES.slice(0, -1).map((feature) => (
          <FeatureCard feature={feature} key={feature.title} />
        ))}
        {/* Последняя карточка — big, на две колонки */}
        <FeatureCard feature={FEATURES[FEATURES.length - 1]} big />
      </motion.div>
    </motion.section>
  );
};

export default KeyFeatures;
