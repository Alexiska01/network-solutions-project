import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Footer = () => {
  const quickLinks = [
    { name: "Оборудование iDATA", path: "/products" },
    { name: "Гарантия и сервис", path: "/warranty-service" },
    { name: "Программное обеспечение", path: "/software" },
    { name: "Документация", path: "/documentation" },
  ];

  const solutions = [
    { name: "Отраслевые решения", path: "/vertical-solutions" },
    { name: "Сетевая архитектура", path: "/network-architecture" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://cdn.poehali.dev/files/af5eb132-2315-4857-b3f2-92c6d3b24788.png"
                alt="iDATA"
                className="h-8 w-auto rounded-0 object-contain py-0 mx-0"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Профессиональные решения для корпоративных сетей
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Продукты</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-brand-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Решения</h3>
            <ul className="space-y-2">
              {solutions.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-brand-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-gray-400">
              <p>+7 (495) 123-45-67</p>
              <p>info@idata.ru</p>
              <p>Москва, ул. Примерная, 123</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 iDATA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
