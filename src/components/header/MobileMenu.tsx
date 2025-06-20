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
        <div className="lg:hidden py-4 border-t border-gray-100">
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
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
