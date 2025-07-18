import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";

const Contacts = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
          <p className="text-gray-600 mb-6">
            Наши специалисты готовы помочь вам с выбором и настройкой сетевого оборудования.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Отдел продаж</h3>
              <p className="text-gray-600">📞 +7 (495) 123-45-67</p>
              <p className="text-gray-600">📧 sales@network-solutions.ru</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Техническая поддержка</h3>
              <p className="text-gray-600">📞 +7 (495) 123-45-68</p>
              <p className="text-gray-600">📧 support@network-solutions.ru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;