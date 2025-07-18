import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface SpecItem {
  icon: string;
  label: string;
  value: string;
}

interface SwitchCardSpecsProps {
  specs: SpecItem[];
  isMobile?: boolean;
  isHovered?: boolean;
  className?: string;
}

const SwitchCardSpecs = ({ 
  specs, 
  isMobile = false, 
  isHovered = false,
  className = ""
}: SwitchCardSpecsProps) => {
  if (isMobile) {
    return (
      <div className={`grid grid-cols-1 gap-3 mb-5 ${className}`}>
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300"
          >
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
              <Icon
                name={spec.icon as any}
                className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
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
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                {spec.label}
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {spec.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-3 mb-6 ${className}`}>
      {specs.map((spec, index) => (
        <motion.div
          key={spec.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300"
        >
          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300">
            <Icon
              name={spec.icon as any}
              className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
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
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {spec.label}
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {spec.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SwitchCardSpecs;