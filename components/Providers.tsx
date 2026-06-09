"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext<{ theme: string; toggle: () => void }>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeCtx);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("light", saved === "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
