"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext<{ theme: string; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme-v2") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme-v2", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
