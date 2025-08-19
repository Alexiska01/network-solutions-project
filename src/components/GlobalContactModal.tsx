import { useState, useEffect } from "react";

// Расширяем глобальный window для TypeScript
declare global {
  interface Window {
    openContactModal?: () => void;
  }
}
import ContactModal from "@/components/ContactModal";

const GlobalContactModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Глобальный обработчик для открытия формы из любого места
    window.openContactModal = () => setOpen(true);
    return () => { delete window.openContactModal; };
  }, []);

  return <ContactModal open={open} onClose={() => setOpen(false)} />;
};

export default GlobalContactModal;
