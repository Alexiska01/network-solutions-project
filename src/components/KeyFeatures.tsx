import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { useInViewAnimate } from "@/hooks/useInViewAnimate";

const KeyFeatures = () => {
  const { ref, inView } = useInViewAnimate(0.2);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const features = [
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

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 px-6 md:px-12 bg-white/10 rounded-lg shadow-md backdrop-blur-sm"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ключевые характеристики коммутаторов серии
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-[#0065B3] via-[#4DB1D4] to-[#0065B3] mx-auto"></div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {features.slice(0, -1).map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: "0px 8px 24px rgba(0,0,0,0.1)" }}
            className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 shadow-lg hover:bg-white/15 hover:border-white/40 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
                <Icon name={feature.icon} size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Последняя карточка на всю ширину */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut",
              delay: 0.8,
            },
          },
        }}
        whileHover={{ y: -4, boxShadow: "0px 8px 24px rgba(0,0,0,0.1)" }}
        className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 shadow-lg hover:bg-white/15 hover:border-white/40 transition-all duration-300 mt-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
            <Icon
              name={features[features.length - 1].icon}
              size={16}
              className="text-white"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-2">
              {features[features.length - 1].title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {features[features.length - 1].description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default KeyFeatures;
