import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Готовы модернизировать свою сеть?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Свяжитесь с нашими специалистами для консультации и подбора
          оптимального решения
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Получить консультацию
        </button>
      </div>
    </footer>
  );
};

export default Footer;
