"use client";

import { memo } from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GlobeArcs, { VARIANT_CITIES, type GlobeVariant } from "./globe/GlobeArcs";

// troque para 2 (rede com rótulos) ou 3 (interativo)
const GLOBE_VARIANT: GlobeVariant = 1;

const remoteText = {
  "pt-BR": "REMOTO",
  en: "REMOTE",
  es: "REMOTO",
};

const cityNames = {
  "pt-BR": {
    lisbon: "Lisboa",
    london: "Londres",
    berlin: "Berlim",
    newYork: "Nova York",
    toronto: "Toronto",
    sanFrancisco: "São Francisco",
    mexicoCity: "Cidade do México",
  },
  en: {
    lisbon: "Lisbon",
    london: "London",
    berlin: "Berlin",
    newYork: "New York",
    toronto: "Toronto",
    sanFrancisco: "San Francisco",
    mexicoCity: "Mexico City",
  },
  es: {
    lisbon: "Lisboa",
    london: "Londres",
    berlin: "Berlín",
    newYork: "Nueva York",
    toronto: "Toronto",
    sanFrancisco: "San Francisco",
    mexicoCity: "Ciudad de México",
  },
};

const globeLabel = {
  "pt-BR": (cities: string) =>
    `Globo mostrando conexões de São Paulo para ${cities}`,
  en: (cities: string) => `Globe showing connections from São Paulo to ${cities}`,
  es: (cities: string) => `Globo que muestra conexiones desde São Paulo hacia ${cities}`,
};

const listFormat = {
  "pt-BR": new Intl.ListFormat("pt-BR"),
  en: new Intl.ListFormat("en"),
  es: new Intl.ListFormat("es"),
};

const Earth3D = () => {
  const { language } = useLanguage();
  const names = cityNames[language];

  const shownCities = VARIANT_CITIES[GLOBE_VARIANT].map((key) => names[key]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible">
      <div className="absolute inset-0 overflow-visible rounded-2xl border-2 border-white/5">
        <GlobeArcs
          variant={GLOBE_VARIANT}
          cityNames={names}
          label={globeLabel[language](listFormat[language].format(shownCities))}
        />
      </div>

      <div className="absolute bottom-6 left-6 z-10 flex flex-col items-start gap-2">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-lg"
            style={{
              transform: "translateZ(0)",
            }}
          />

          <div className="relative rounded-full bg-gray-900/80 p-2 backdrop-blur-sm dark:bg-white/15">
            <MapPin className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300/90">
            {remoteText[language]}
          </span>

          <span
            className="text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
            }}
          >
            SÃO PAULO
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Earth3D);
