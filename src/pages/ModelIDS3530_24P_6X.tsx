import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy loading для компонента модели
const ModelIDS3530_24P_6XComponent = React.lazy(
  () => import("@/components/ModelIDS3530_24P_6X"),
);

const ModelIDS3530_24P_6X = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Загружаем компоненты модели...</p>
            </div>
          </div>
        }
      >
        <ModelIDS3530_24P_6XComponent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default ModelIDS3530_24P_6X;
