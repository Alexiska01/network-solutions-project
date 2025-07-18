import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

interface CatalogMobileNavProps {
  onNavigate: (cardId: string) => void;
}

const CatalogMobileNav = ({ onNavigate }: CatalogMobileNavProps) => {
  // Функция для мобильной навигации с автозакрытием меню
  const handleMobileNavigation = (cardId: string) => {
    // Haptic feedback для поддерживаемых устройств
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    // Закрываем мобильное меню с небольшой задержкой для visual feedback
    setTimeout(() => {
      const detailsElement = document.querySelector('details[open]');
      if (detailsElement) {
        (detailsElement as HTMLDetailsElement).open = false;
      }
    }, 150);
    
    // Выполняем навигацию с небольшой задержкой
    setTimeout(() => {
      onNavigate(cardId);
    }, 200);
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="block lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
    >
      <div className="px-4 py-3">
        <details className="group">
          <summary className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex items-center gap-2">
              <Icon name="Navigation" size={16} />
              <span className="font-medium">Навигация по каталогу</span>
            </div>
            <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform duration-300" />
          </summary>
          
          <div className="mt-3 p-4 bg-gradient-to-b from-gray-50 to-white rounded-lg border shadow-inner space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => handleMobileNavigation('corporate-lan')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Icon 
                    name="Router" 
                    className="text-blue-600" 
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
                <span className="font-medium">Корпоративные ЛВС</span>
              </button>
              
              <button 
                onClick={() => handleMobileNavigation('access-level')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Icon 
                    name="Router" 
                    className="text-blue-500" 
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
                <span className="font-medium">Уровень доступа</span>
              </button>
              
              <button 
                onClick={() => handleMobileNavigation('distribution-level')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Icon 
                    name="Router" 
                    className="text-indigo-600" 
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
                <span className="font-medium">Уровень распределения</span>
              </button>
              
              <button 
                onClick={() => handleMobileNavigation('data-center')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Icon 
                    name="Router" 
                    className="text-purple-600" 
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
                <span className="font-medium">Центры обработки данных</span>
              </button>
              
              <button 
                onClick={() => handleMobileNavigation('spine-level')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Icon 
                    name="Router" 
                    className="text-purple-500" 
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
                <span className="font-medium">Spine коммутаторы</span>
              </button>
              
              <button 
                onClick={() => handleMobileNavigation('leaf-level')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 shadow-sm"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <Icon 
                    name="Router" 
                    className="text-emerald-600" 
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
                <span className="font-medium">Leaf коммутаторы</span>
              </button>
            </div>
            
            <hr className="border-gray-200" />
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-gray-700 font-medium"
            >
              <Icon name="ArrowUp" size={16} />
              <span>Наверх страницы</span>
            </button>
          </div>
        </details>
      </div>
    </motion.div>
  );
};

export default CatalogMobileNav;