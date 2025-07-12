import type { NavItem } from "../navigationData";

export interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface MenuLevel {
  title: string;
  items: NavItem[];
  parentPath?: string;
}

export interface MenuItemProps {
  item: NavItem;
  level: number;
  index: number;
  activeItem: string | null;
  expandedItems: Set<string>;
  onItemClick: (item: NavItem, e: React.MouseEvent) => void;
  onToggleExpanded: (itemPath: string) => void;
  onNavigateToLevel: (newLevel: MenuLevel) => void;
  onClose: () => void;
  setActiveItem: (path: string | null) => void;
}

export interface MenuHeaderProps {
  currentLevel: MenuLevel | undefined;
  canGoBack: boolean;
  onNavigateBack: () => void;
  onClose: () => void;
  isDragging: boolean;
}

export interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface TouchState {
  x: number;
  y: number;
}

export interface MenuState {
  menuStack: MenuLevel[];
  expandedItems: Set<string>;
  activeItem: string | null;
  isTransitioning: boolean;
  touchStart: TouchState | null;
  isDragging: boolean;
}
