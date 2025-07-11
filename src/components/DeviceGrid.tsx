import { motion } from "framer-motion";
import DeviceCard from "./DeviceCard";
import { useInViewAnimate } from "@/hooks/useInViewAnimate";
import Icon from "@/components/ui/icon";

const DeviceGrid = () => {
  const { ref, inView } = useInViewAnimate(0.3);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const devices = [
    {
      model: "IDS4530-24T-6X",
      specs: {
        baseTports: 24,
        sfpPlusSlots: 6,
        expansionSlots: 1,
        powerSupplies: 2,
        throughput: 448,
        hasConsole: false,
        hasUsb: false,
        hasOobManagement: false,
      },
    },
    {
      model: "IDS4530-48T-6X",
      specs: {
        baseTports: 48,
        sfpPlusSlots: 6,
        expansionSlots: 1,
        powerSupplies: 2,
        throughput: 496,
        hasConsole: false,
        hasUsb: false,
        hasOobManagement: false,
      },
    },
    {
      model: "IDS4530-24P-6X",
      specs: {
        baseTports: 24,
        sfpPlusSlots: 6,
        poeWatts: 380,
        expansionSlots: 1,
        powerSupplies: 2,
        throughput: 448,
        hasConsole: false,
        hasUsb: false,
        hasOobManagement: false,
      },
    },
    {
      model: "IDS4530-48P-6X",
      specs: {
        baseTports: 48,
        sfpPlusSlots: 6,
        poeWatts: 380,
        expansionSlots: 1,
        powerSupplies: 2,
        throughput: 496,
        hasConsole: false,
        hasUsb: false,
        hasOobManagement: false,
      },
    },
    {
      model: "IDS4530-24S-4X",
      specs: {
        sfpSlots: 24,
        sfpPlusSlots: 4,
        expansionSlots: 2,
        powerSupplies: 2,
        throughput: 688,
        hasConsole: true,
        hasUsb: true,
        hasOobManagement: true,
        sfpOnly: true,
      },
    },
    {
      model: "IDS4530-48S-4X",
      specs: {
        sfpSlots: 48,
        sfpPlusSlots: 4,
        expansionSlots: 2,
        powerSupplies: 2,
        throughput: 216,
        hasConsole: true,
        hasUsb: true,
        hasOobManagement: true,
        sfpOnly: true,
      },
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Network" size={32} className="text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              Обзор устройств
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Линейка коммутаторов IDS4530 для корпоративных сетей
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {devices.map((device, index) => (
            <DeviceCard
              key={device.model}
              model={device.model}
              specs={device.specs}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DeviceGrid;
