"use client";

import { motion, useReducedMotion } from "framer-motion";
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
          fontFamily: "'Instrument Serif', serif",
        }}
      >
        {keyword}
      </span>

      <span
        className="text-sm text-gray-900 dark:text-white sm:text-base md:text-lg"
        style={{
          fontFamily: "'Instrument Serif', serif",
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
  const shouldReduceMotion = useReducedMotion();

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

  const animation = shouldReduceMotion
    ? { x: "0%" }
    : { x: ["0%", "-33.333%"] };

  const reverseAnimation = shouldReduceMotion
    ? { x: "0%" }
    : { x: ["-33.333%", "0%"] };

  return (
    <section
      aria-label="Tecnologias e características"
      className="relative w-full overflow-hidden py-5 sm:py-8 md:py-10 lg:py-12"
    >
      <div className="relative overflow-hidden">
        <div className="glass-liquid w-full overflow-hidden py-2.5 sm:py-3 md:py-3.5">
          <motion.div
            className="flex w-max min-w-max items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10"
            animate={animation}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 28,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }
            }
            style={{
              willChange: shouldReduceMotion ? "auto" : "transform",
            }}
          >
            {duplicatedKeywords.map((keyword, index) => (
              <BannerItem
                key={`forward-${keyword}-${index}`}
                keyword={keyword}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mt-3 overflow-hidden sm:mt-5">
        <div className="glass-liquid w-full overflow-hidden py-2.5 sm:py-3 md:py-3.5">
          <motion.div
            className="flex w-max min-w-max items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-8 lg:gap-10"
            animate={reverseAnimation}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 32,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }
            }
            style={{
              willChange: shouldReduceMotion ? "auto" : "transform",
            }}
          >
            {duplicatedKeywords.map((keyword, index) => (
              <BannerItem
                key={`reverse-${keyword}-${index}`}
                keyword={keyword}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
