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
  className?: string;
}

const SwitchCardSpecs = ({ 
  specs, 
  isMobile = false, 
  className = ""
}: SwitchCardSpecsProps) => {
  if (isMobile) {
    return (
  <div className={`grid grid-cols-1 gap-2 ${className}`}>
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.08 }}
            className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 rounded-md"
          >
            <div className="w-6 h-6 bg-white rounded-md shadow-sm flex items-center justify-center flex-shrink-0">
              <Icon
                name={spec.icon as any}
                className="text-gray-600"
                style={{ width: '14px', height: '14px' }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-0.5 leading-none">
                {spec.label}
              </p>
              <p className="text-[0.83rem] font-semibold text-gray-900 leading-snug truncate">
                {spec.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
  <div className={`grid grid-cols-1 gap-3 ${className}`}>
      {specs.map((spec, index) => (
        <motion.div
          key={spec.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.28, delay: index * 0.06 }}
          className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg"
        >
          <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <Icon
              name={spec.icon as any}
              className="text-gray-600"
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
            <p className="text-[0.78rem] font-medium text-gray-500 uppercase tracking-wide leading-none mb-0.5">
              {spec.label}
            </p>
            <p className="text-[0.9rem] font-semibold text-gray-900 leading-snug">
              {spec.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SwitchCardSpecs;