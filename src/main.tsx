import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Дождаться полной загрузки DOM
const initApp = () => {
  const rootElement = document.getElementById("root");
  console.log("Looking for root element:", rootElement);

  if (rootElement) {
    console.log("Root element found, mounting React app");
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Root element not found");
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
