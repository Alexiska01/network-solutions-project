import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import SwitchCard from "@/components/SwitchCard";
import SwitchesSearch from "@/components/SwitchesSearch";
import Icon from "@/components/ui/icon";

interface GroupedSwitches {
  corporateAccess: Array<{
    id: string;
    title: string;
    category: string;
    [key: string]: any;
  }>;
  corporateDistribution: Array<{
    id: string;
    title: string;
    category: string;
    [key: string]: any;
  }>;
  dataCenterSpine: Array<{
    id: string;
    title: string;
    category: string;
    [key: string]: any;
  }>;
  dataCenterLeaf: Array<{
    id: string;
    title: string;
    category: string;
    [key: string]: any;
  }>;
}

interface CatalogGridProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  groupedSwitches: GroupedSwitches;
}

const CatalogGrid = ({ searchTerm, onSearchChange, groupedSwitches }: CatalogGridProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex-1">
      {/* Поиск */}
      <div className={cn(
        "mb-6 sm:mb-8",
        isMobile && "px-1"
      )}>
        <SwitchesSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </div>

      {/* Коммутаторы для корпоративных ЛВС */}
      <motion.section
        id="corporate-lan"
        className={cn(
          "mb-12 sm:mb-16",
          isMobile && "px-1"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className={cn(
            "flex flex-col gap-3 mb-4",
            !isMobile && "sm:flex-row sm:items-center sm:gap-4"
          )}>
            <div className={cn(
              "bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg",
              "w-10 h-10"
            )}>
              <Icon 
                name="Building2" 
                className="text-white"
                style={{ 
                  width: '16px', 
                  height: '16px',
                  minWidth: '16px',
                  minHeight: '16px',
                  maxWidth: '16px',
                  maxHeight: '16px'
                }}
              />
            </div>
            <div className={cn(isMobile && "text-center")}>
              <h2 className={cn(
                "font-bold text-gray-900",
                isMobile ? "text-2xl leading-tight" : "text-2xl sm:text-3xl"
              )}>
                Коммутаторы для корпоративных ЛВС
              </h2>
              <p className={cn(
                "text-gray-600 mt-1",
                isMobile ? "text-sm leading-relaxed" : "text-sm sm:text-base"
              )}>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Уровень доступа */}
        {groupedSwitches.corporateAccess.length > 0 && (
          <motion.div
            id="access-level"
            className={cn(
              "mb-10 sm:mb-12",
              isMobile && "px-2"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={cn(
              "flex items-center gap-3 mb-5 sm:mb-6",
              isMobile && "justify-center"
            )}>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                <Icon 
                  name="Wifi" 
                  className="text-white"
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    minWidth: '16px',
                    minHeight: '16px',
                    maxWidth: '16px',
                    maxHeight: '16px'
                  }}
                />
              </div>
              <h3 className={cn(
                "font-bold text-gray-800",
                isMobile ? "text-xl text-center" : "text-xl sm:text-2xl"
              )}>
                Коммутаторы уровня доступа
              </h3>
            </div>
            <div className={cn(
              isMobile ? "space-y-4" : "space-y-6"
            )}>
              {groupedSwitches.corporateAccess.map(
                (switchData, index) => (
                  <motion.div
                    key={switchData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                    }}
                  >
                    <SwitchCard switchData={switchData} />
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        )}

        {/* Уровень распределения */}
        {groupedSwitches.corporateDistribution.length > 0 && (
          <motion.div
            id="distribution-level"
            className={cn(
              isMobile && "px-2"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className={cn(
              "flex items-center gap-3 mb-5 sm:mb-6",
              isMobile && "justify-center"
            )}>
              <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                <Icon 
                  name="Network" 
                  className="text-white"
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    minWidth: '16px',
                    minHeight: '16px',
                    maxWidth: '16px',
                    maxHeight: '16px'
                  }}
                />
              </div>
              <h3 className={cn(
                "font-bold text-gray-800",
                isMobile ? "text-xl text-center" : "text-2xl"
              )}>
                Коммутаторы уровня распределения
              </h3>
            </div>
            <div className={cn(
              isMobile ? "space-y-4" : "space-y-6"
            )}>
              {groupedSwitches.corporateDistribution.map(
                (switchData, index) => (
                  <motion.div
                    key={switchData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                    }}
                  >
                    <SwitchCard switchData={switchData} />
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Коммутаторы для ЦОД */}
      <motion.section
        id="data-center"
        className={cn(
          "mb-12 sm:mb-16",
          isMobile && "px-1"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-6 sm:mb-8"
        >
          <div className={cn(
            "flex gap-4 mb-4",
            isMobile ? "flex-col items-center text-center" : "items-center"
          )}>
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg w-12 h-12">
              <Icon 
                name="Database" 
                className="text-white"
                style={{ 
                  width: '24px', 
                  height: '24px',
                  minWidth: '24px',
                  minHeight: '24px',
                  maxWidth: '24px',
                  maxHeight: '24px'
                }}
              />
            </div>
            <div>
              <h2 className={cn(
                "font-bold text-gray-900",
                isMobile ? "text-2xl" : "text-3xl"
              )}>
                Центры обработки данных
              </h2>
              <p className={cn(
                "text-gray-600 mt-1",
                isMobile ? "text-sm" : ""
              )}>
                Высокопроизводительные решения для ЦОД
              </p>
            </div>
          </div>
        </motion.div>

        {/* Spine */}
        {groupedSwitches.dataCenterSpine.length > 0 && (
          <motion.div
            id="spine-level"
            className={cn(
              "mb-10 sm:mb-12",
              isMobile && "px-2"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className={cn(
              "flex items-center gap-3 mb-5 sm:mb-6",
              isMobile && "justify-center"
            )}>
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                <Icon 
                  name="TreePine" 
                  className="text-white"
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    minWidth: '16px',
                    minHeight: '16px',
                    maxWidth: '16px',
                    maxHeight: '16px'
                  }}
                />
              </div>
              <h3 className={cn(
                "font-bold text-gray-800",
                isMobile ? "text-xl" : "text-2xl"
              )}>Spine</h3>
            </div>
            <div className={cn(
              isMobile ? "space-y-4" : "space-y-6"
            )}>
              {groupedSwitches.dataCenterSpine.map(
                (switchData, index) => (
                  <motion.div
                    key={switchData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.1 + index * 0.1,
                    }}
                  >
                    <SwitchCard switchData={switchData} />
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        )}

        {/* Leaf */}
        {groupedSwitches.dataCenterLeaf.length > 0 && (
          <motion.div
            id="leaf-level"
            className={cn(
              isMobile && "px-2"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className={cn(
              "flex items-center gap-3 mb-5 sm:mb-6",
              isMobile && "justify-center"
            )}>
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md w-8 h-8">
                <Icon
                  name="Layers"
                  className="text-white"
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    minWidth: '16px',
                    minHeight: '16px',
                    maxWidth: '16px',
                    maxHeight: '16px'
                  }}
                />
              </div>
              <h3 className={cn(
                "font-bold text-gray-800",
                isMobile ? "text-xl" : "text-2xl"
              )}>Leaf</h3>
            </div>
            <div className={cn(
              isMobile ? "space-y-4" : "space-y-6"
            )}>
              {groupedSwitches.dataCenterLeaf.map((switchData, index) => (
                <motion.div
                  key={switchData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                >
                  <SwitchCard switchData={switchData} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default CatalogGrid;