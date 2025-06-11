import { useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { ThemeOptions } from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [options, setOptions] = useLocalStorage<ThemeOptions>("theme-options", {
    mode: "light",
  });
  const toggleMode = () => {
    setOptions((o) => ({ ...o, mode: o.mode === "light" ? "dark" : "light" }));
  };

  const theme = { options, toggleMode };

  return <ThemeContext value={theme}>{children}</ThemeContext>;
};
