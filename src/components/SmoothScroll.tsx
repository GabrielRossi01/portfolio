"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";
import { scrollToTarget, setLenis } from "@/lib/smoothScroll";

const INTENT_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

export default function SmoothScroll() {
  useEffect(() => {
    // Links âncora (#secao) passam todos pelo mesmo scrollToTarget. Quem já
    // tratou o clique (ex.: a navbar) chama preventDefault e é ignorado aqui.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.getElementById(decodeURIComponent(href.slice(1)))) return;
      event.preventDefault();
      scrollToTarget(href);
    };
    document.addEventListener("click", onClick);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => document.removeEventListener("click", onClick);
    }

    // O Lenis só é baixado e criado na primeira intenção de rolar/interagir.
    // Assim a carga inicial não paga o JS dele, nem o loop de animação, nem a
    // troca de classes no <html> (que recalcula o estilo da página inteira).
    let lenis: Lenis | null = null;
    let disposed = false;
    let started = false;

    const start = async () => {
      if (started) return;
      started = true;
      INTENT_EVENTS.forEach((type) => window.removeEventListener(type, start));
      const { default: LenisClass } = await import("lenis");
      if (disposed) return;
      // No touch o Lenis mantém o scroll nativo (com inércia do sistema);
      // a suavização vale para roda do mouse, trackpad e links âncora.
      lenis = new LenisClass({ autoRaf: true, lerp: 0.1 });
      setLenis(lenis);
    };

    INTENT_EVENTS.forEach((type) =>
      window.addEventListener(type, start, { passive: true }),
    );

    return () => {
      disposed = true;
      document.removeEventListener("click", onClick);
      INTENT_EVENTS.forEach((type) => window.removeEventListener(type, start));
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
