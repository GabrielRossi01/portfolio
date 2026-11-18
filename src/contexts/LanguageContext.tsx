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
import { Language, translations, Translations } from "@/lib/i18n";
import { hydrateAllSections } from "@/components/LazyHydrate";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isLanguage = (value: string | null): value is Language =>
  value === "pt-BR" || value === "en" || value === "es";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("language");
    } catch {}
    // idioma salvo diferente do padrão: as seções precisam estar hidratadas
    // antes de receber a troca (senão o React descarta o HTML do servidor)
    if (isLanguage(stored) && stored !== "pt-BR") {
      hydrateAllSections();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza com o localStorage só no navegador
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    hydrateAllSections();
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {}
  }, []);

  // valor estável: os consumidores só re-renderizam quando o idioma muda
  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
