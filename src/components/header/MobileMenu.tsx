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
        className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
      >
        <Icon name={isOpen ? "X" : "Menu"} size={24} />
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center h-16 px-4 border-b border-gray-100">
            <div className="text-xl font-bold text-gray-900">Меню</div>
            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 px-3 py-4 text-lg font-medium border-b border-gray-100 last:border-b-0"
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
