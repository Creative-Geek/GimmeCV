import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "./components/Toast.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Analytics />
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
