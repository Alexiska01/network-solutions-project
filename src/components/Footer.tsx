import { Link } from "react-router-dom";

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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-1.5 md:space-x-2 mb-3 md:mb-4 lg:mb-6">
              <img
                src="https://cdn.poehali.dev/files/af5eb132-2315-4857-b3f2-92c6d3b24788.png"
                alt="iDATA"
                className="h-6 md:h-8 w-auto rounded-0 object-contain py-0 mx-0"
              />
            </div>
            <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 font-sans leading-relaxed">
              Профессиональные решения для корпоративных сетей
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 md:mb-4 lg:mb-6 font-sans">
              Продукты
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs md:text-sm text-gray-400 hover:text-[#00B5AD] transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 md:mb-4 lg:mb-6 font-sans">
              Решения
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {solutions.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs md:text-sm text-gray-400 hover:text-[#00B5AD] transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-bold mb-3 md:mb-4 lg:mb-6 font-sans">
              Контакты
            </h3>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-400 font-sans">
              <p>+7 (495) 123-45-60</p>
              <p>info@idata.ru</p>
              <p>Москва, ул. Примерная, 123</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 md:mt-10 lg:mt-12 pt-4 md:pt-6 lg:pt-8 text-center text-xs md:text-sm text-gray-400">
          <p className="font-sans">© 2025 iDATA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
