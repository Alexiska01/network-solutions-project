import type { NavItem, MenuLevel } from "../types";

export const handleMenuItemClick = (
  item: NavItem,
  e: React.MouseEvent,
  callbacks: {
    setActiveItem: (path: string | null) => void;
    onClose: () => void;
    navigateToLevel: (level: MenuLevel) => void;
    toggleExpanded: (path: string) => void;
  },
) => {
  const { setActiveItem, onClose, navigateToLevel, toggleExpanded } = callbacks;

  setActiveItem(item.path);

  if (item.path === "/products" && item.hasSubmenu) {
    e.preventDefault();
    navigateToLevel({
      title: "Оборудование",
      items: [], // Будет заполнено productSubmenuItems в компоненте
    });
  } else if (item.path === "/contacts") {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const contactsSection = document.getElementById("contacts-section");
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  } else if (item.submenuItems) {
    e.preventDefault();
    navigateToLevel({
      title: item.name,
      items: item.submenuItems,
      parentPath: item.path,
    });
  } else if (item.items && item.items.length > 0) {
    e.preventDefault();
    // Проверяем, есть ли у дочерних элементов свои items (4-й уровень)
    const hasDeepNesting = item.items.some(
      (child) => child.items && child.items.length > 0,
    );
    if (hasDeepNesting && item.hasThirdLevel) {
      // Если есть глубокая вложенность, показываем аккордеон
      toggleExpanded(item.path);
    } else {
      // Иначе переходим на новый уровень
      navigateToLevel({
        title: item.name,
        items: item.items,
        parentPath: item.path,
      });
    }
  } else if (item.hasThirdLevel && item.items) {
    e.preventDefault();
    toggleExpanded(item.path);
  } else if (!item.hasSubmenu && !item.submenuItems && !item.items) {
    onClose();
  }
};
