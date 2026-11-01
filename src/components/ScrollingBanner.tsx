"use client";

import { memo, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type LanguageCode = "pt-BR" | "en" | "es";

interface BannerItemProps {
  keyword: string;
}

const BannerItem = memo(function BannerItem({ keyword }: BannerItemProps) {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
      <span
        className="text-xs font-bold uppercase tracking-wide text-gray-900 dark:text-white sm:text-sm md:text-base lg:text-lg"
        style={{
          fontFamily: "var(--font-instrument-serif), serif",
        }}
      >
        {keyword}
      </span>

      <span
        className="text-sm text-gray-900 dark:text-white sm:text-base md:text-lg"
        style={{
          fontFamily: "var(--font-instrument-serif), serif",
        }}
        aria-hidden="true"
      >
        +
      </span>
    </div>
  );
});

BannerItem.displayName = "BannerItem";

export default memo(function ScrollingBanner() {
  const { language } = useLanguage();

  const keywordsByLanguage = useMemo<Record<LanguageCode, string[]>>(
    () => ({
      "pt-BR": [
        "DINÂMICO",
        "ESCALÁVEL",
        "INTERATIVO",
        "SEGURO",
        "CONFIÁVEL",
        "ENVOLVENTE",
        "ACESSÍVEL",
      ],
      en: [
        "DYNAMIC",
        "SCALABLE",
        "INTERACTIVE",
        "SECURE",
        "RELIABLE",
        "ENGAGING",
        "ACCESSIBLE",
      ],
      es: [
        "DINÁMICO",
        "ESCALABLE",
        "INTERACTIVO",
        "SEGURO",
        "CONFIABLE",
        "ATRACTIVO",
        "ACCESIBLE",
      ],
    }),
    [],
  );

  const currentLanguage =
    language in keywordsByLanguage ? (language as LanguageCode) : "pt-BR";

  const keywords = keywordsByLanguage[currentLanguage];

  const duplicatedKeywords = useMemo(
    () => [...keywords, ...keywords, ...keywords],
    [keywords],
  );

  return (
    <section
      aria-label="Tecnologias e características"
      className="relative w-full overflow-hidden py-5 sm:py-8 md:py-10 lg:py-12"
    >
      <div className="relative overflow-hidden">
        <div className="glass-liquid w-full overflow-hidden py-2.5 sm:py-3 md:py-3.5">
          <div
            className="marquee flex w-max min-w-max items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10"
            style={{ "--marquee-duration": "28s" } as React.CSSProperties}
          >
            {duplicatedKeywords.map((keyword, index) => (
              <BannerItem
                key={`forward-${keyword}-${index}`}
                keyword={keyword}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-3 overflow-hidden sm:mt-5">
        <div className="glass-liquid w-full overflow-hidden py-2.5 sm:py-3 md:py-3.5">
          <div
            className="marquee marquee-reverse flex w-max min-w-max items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10"
            style={{ "--marquee-duration": "32s" } as React.CSSProperties}
          >
            {duplicatedKeywords.map((keyword, index) => (
              <BannerItem
                key={`reverse-${keyword}-${index}`}
                keyword={keyword}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
