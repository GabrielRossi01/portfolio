  "use client";

  import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
  import { Language, translations, Translations } from '@/lib/i18n';

  interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
  }

  const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

  export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('pt-BR');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const stored = localStorage.getItem('language') as Language | null;
      if (stored && (stored === 'pt-BR' || stored === 'en' || stored === 'es')) {
        setLanguageState(stored);
      }
      setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    };

    return (
      <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
      throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
  }
