"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smoothScroll";

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
      anchors: { duration: 1.2 },
    });

    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
