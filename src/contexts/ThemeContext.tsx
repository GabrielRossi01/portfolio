"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { hydrateAllSections } from "@/components/LazyHydrate";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    const initial: Theme = stored === "light" ? "light" : "dark";
    // o <html> já vem do servidor com "dark"; só mexe na classe se precisar
    // (trocar classe no <html> recalcula o estilo da página inteira)
    if (initial !== "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      // tema salvo diferente do padrão: hidrata as seções antes da troca
      hydrateAllSections();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza com o localStorage só no navegador
      setTheme(initial);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    hydrateAllSections();
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(next);
      return next;
    });
  }, []);

  // valor estável: os consumidores só re-renderizam quando o tema muda
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
