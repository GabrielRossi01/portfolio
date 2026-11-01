import type Lenis from "lenis";

// Instância única do Lenis, criada pelo <SmoothScroll />. Fica null quando o
// usuário prefere menos movimento: aí tudo cai no scroll nativo.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(target, { duration: 1.2 });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }

  document.querySelector(target)?.scrollIntoView();
}

export function pauseSmoothScroll(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}
