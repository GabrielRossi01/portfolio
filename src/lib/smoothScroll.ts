import type Lenis from "lenis";

// Instância única do Lenis, criada pelo <SmoothScroll />. Fica null quando o
// usuário prefere menos movimento: aí tudo cai no scroll nativo.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

// easeInOutCubic: arranca e assenta com suavidade, sem "tranco" no fim
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// duração proporcional à distância: saltos curtos são rápidos, longos não se
// arrastam passando por todas as seções
function durationFor(distance: number) {
  return Math.min(1.4, 0.55 + Math.abs(distance) / 4500);
}

function targetTop(target: string | number) {
  if (typeof target === "number") return target;
  const el = target.startsWith("#")
    ? document.getElementById(decodeURIComponent(target.slice(1)))
    : document.querySelector(target);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY;
}

export function scrollToTarget(
  target: string | number,
  onComplete?: () => void,
) {
  const top = targetTop(target);
  if (top === null) {
    onComplete?.();
    return;
  }

  if (lenis) {
    lenis.start();
    lenis.scrollTo(top, {
      duration: durationFor(top - window.scrollY),
      easing: easeInOutCubic,
      onComplete: () => onComplete?.(),
    });
    return;
  }

  window.scrollTo({ top });
  onComplete?.();
}

export function pauseSmoothScroll(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}
