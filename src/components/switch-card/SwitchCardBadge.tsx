import Icon from "@/components/ui/icon";

interface SwitchCardBadgeProps {
  category: string;
  getCategoryColor: (category: string) => string;
  getCategoryIcon: (category: string) => string;
}

const SwitchCardBadge = ({ 
  category, 
  getCategoryColor, 
  getCategoryIcon 
}: SwitchCardBadgeProps) => {
  return (
    <div className="absolute top-4 left-4 z-10">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(category)} text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}
      >
        <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
          <Icon 
            name={getCategoryIcon(category) as keyof typeof import('lucide-react')} 
            className="text-white"
            style={{ 
              width: '14px', 
              height: '14px',
              minWidth: '14px',
              minHeight: '14px',
              maxWidth: '14px',
              maxHeight: '14px'
            }}
          />
        </div>
        <span className="capitalize">{category}</span>
      </div>
    </div>
  );
};

export default SwitchCardBadge;