"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/i18n";

const KEYWORDS: Record<Language, string[]> = {
  "pt-BR": [
    "INTERFACES",
    "PERFORMANCE",
    "ACESSÍVEL",
    "RESPONSIVO",
    "INTERATIVO",
    "ESCALÁVEL",
    "CONFIÁVEL",
  ],
  en: [
    "INTERFACES",
    "PERFORMANCE",
    "ACCESSIBLE",
    "RESPONSIVE",
    "INTERACTIVE",
    "SCALABLE",
    "RELIABLE",
  ],
  es: [
    "INTERFACES",
    "RENDIMIENTO",
    "ACCESIBLE",
    "RESPONSIVO",
    "INTERACTIVO",
    "ESCALABLE",
    "CONFIABLE",
  ],
};

function KeywordList({ keywords, copy = false }: { keywords: string[]; copy?: boolean }) {
  return (
    <ul
      className={`flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10 ${copy ? "marquee-copy" : ""}`}
    >
      {keywords.map((keyword) => (
        <li key={keyword} className="flex items-center gap-6 sm:gap-10">
          <span className="font-serif text-base uppercase tracking-wide text-gray-900 sm:text-lg md:text-xl dark:text-white">
            {keyword}
          </span>
          <span aria-hidden="true" className="text-orange-500">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Faixa infinita em CSS puro: anda só no compositor (sem JS por quadro) e
 * pausa quando sai da tela. Duas cópias iguais. É decorativa: leitor de tela pula.
 */
export default memo(function ScrollingBanner() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const keywords = KEYWORDS[language] ?? KEYWORDS["pt-BR"];

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden py-8 sm:py-12"
    >
      <div className="border-y border-black/10 py-4 dark:border-white/10">
        <div
          className="marquee-track flex w-max"
          data-paused={!visible}
          style={{ ["--marquee-duration" as string]: "36s" }}
        >
          <KeywordList keywords={keywords} />
          <KeywordList keywords={keywords} copy />
        </div>
      </div>
    </div>
  );
});
