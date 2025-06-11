import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import { LocaleProvider } from "./context/LocaleContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
