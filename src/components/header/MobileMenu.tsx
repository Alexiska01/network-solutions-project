import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { navigationItems } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onToggle, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <Icon name={isOpen ? "X" : "Menu"} size={20} />
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="flex flex-col py-2 px-4 max-w-7xl mx-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-3 text-sm font-medium transition-colors rounded-md"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
