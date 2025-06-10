import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { ThemeProvider } from "./hooks/useTheme/ThemeProvider";
import App from "./App.tsx";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
