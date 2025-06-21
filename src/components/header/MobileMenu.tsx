import { Link } from "react-router-dom";
import { navigationItems } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* Круглая кнопка меню */}
      <button
        onClick={onToggle}
        className="lg:hidden relative w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Анимированные линии гамбургера */}
          <div className="w-5 h-4 flex flex-col justify-center relative">
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 mt-1 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-0.5" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* Затемнённый оверлей */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Мобильное меню */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Шапка меню */}
        <div className="flex justify-between items-center h-16 px-6 border-b border-gray-100 bg-gray-50">
          <div className="text-xl font-bold text-gray-900">Меню</div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            aria-label="Закрыть меню"
          >
            <div className="w-4 h-4 relative">
              <span className="absolute block h-0.5 w-4 bg-gray-700 rotate-45 top-1/2 -translate-y-0.5" />
              <span className="absolute block h-0.5 w-4 bg-gray-700 -rotate-45 top-1/2 -translate-y-0.5" />
            </div>
          </button>
        </div>

        {/* Навигация */}
        <nav className="flex flex-col py-6 px-6 h-full overflow-y-auto">
          {navigationItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative text-gray-700 hover:text-blue-600 py-4 text-lg font-medium border-b border-gray-100 last:border-b-0 transition-all duration-300 hover:pl-2 ${
                isOpen ? "animate-fade-in" : ""
              }`}
              style={{
                animationDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
              onClick={onClose}
            >
              <span className="relative">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </span>
              {item.hasSubmenu && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                  →
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Декоративный градиент внизу */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default MobileMenu;
