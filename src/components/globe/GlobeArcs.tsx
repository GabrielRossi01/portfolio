"use client";

import { useEffect, useRef } from "react";
import { mountGlobe, type GlobeOptions, type GlobeTarget } from "./globeEngine";

export type GlobeVariant = 1 | 2 | 3;

const SAO_PAULO = { lat: -23.55, lon: -46.63 };

const CITIES = {
  lisbon: { lat: 38.72, lon: -9.14 },
  london: { lat: 51.51, lon: -0.13 },
  berlin: { lat: 52.52, lon: 13.4 },
  newYork: { lat: 40.71, lon: -74.01 },
  toronto: { lat: 43.65, lon: -79.38 },
  sanFrancisco: { lat: 37.77, lon: -122.42 },
  mexicoCity: { lat: 19.43, lon: -99.13 },
};

export type CityKey = keyof typeof CITIES;

export const VARIANT_CITIES: Record<GlobeVariant, CityKey[]> = {
  1: ["lisbon", "london", "berlin", "newYork", "toronto", "sanFrancisco"],
  2: ["lisbon", "london", "berlin", "newYork", "toronto", "mexicoCity"],
  3: ["lisbon", "london", "berlin", "newYork", "toronto", "sanFrancisco"],
};

// opções visuais de cada variante (veja .claude/skills/globe-arcs/SKILL.md)
const VARIANT_OPTIONS: Record<GlobeVariant, Omit<GlobeOptions, "targets">> = {
  1: { rotate: "sway", originLabel: "UTC−3", drag: "x" },
  2: {
    rotate: "sway",
    mode: "both",
    labels: true,
    originLabel: "UTC−3",
    arcColor: "#5b9cff",
    headColor: "#e6f0ff",
  },
  3: { rotate: "sway", labels: true, drag: true },
};

// globo maior no desktop; no celular sobra espaço para o selo do card
const radiusRatio = () =>
  window.matchMedia("(max-width: 767px)").matches ? 0.39 : 0.43;

export default function GlobeArcs({
  variant = 1,
  cityNames,
  label,
}: {
  variant?: GlobeVariant;
  cityNames: Record<CityKey, string>;
  label: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // nomes viram uma string estável, para o efeito só remontar quando o idioma mudar
  const namesKey = JSON.stringify(cityNames);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const names = JSON.parse(namesKey) as Record<CityKey, string>;
    const targets: GlobeTarget[] = VARIANT_CITIES[variant].map((key) => ({
      ...CITIES[key],
      name: names[key],
    }));

    const globe = mountGlobe(canvas, container, {
      origin: SAO_PAULO,
      targets,
      radiusRatio,
      ...VARIANT_OPTIONS[variant],
    });

    return () => globe.destroy();
  }, [variant, namesKey]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="absolute block max-w-none"
      />
    </div>
  );
}
