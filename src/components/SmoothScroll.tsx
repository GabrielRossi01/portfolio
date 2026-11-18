"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { scrollToTarget, setLenis } from "@/lib/smoothScroll";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // No touch o Lenis mantém o scroll nativo (com inércia do sistema);
    // a suavização vale para roda do mouse, trackpad e links âncora.
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
    });

    setLenis(lenis);

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

    return () => {
      document.removeEventListener("click", onClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
