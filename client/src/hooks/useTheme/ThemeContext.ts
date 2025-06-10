import { createContext } from "react";

export interface ThemeOptions {
  mode: "light" | "dark";
}

export interface Theme {
  options: ThemeOptions;
  toggleMode: () => void;
}

const defaultTheme: Theme = {
  options: {
    mode: "light",
  },
  toggleMode: () => {
    throw new Error("Theme must be used with ThemeProvider");
  },
};

export const ThemeContext = createContext<Theme>(defaultTheme);
