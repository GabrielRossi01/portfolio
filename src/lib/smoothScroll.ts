import type Lenis from "lenis";

// Instância única do Lenis, criada pelo <SmoothScroll /> na primeira
// interação. Enquanto for null (ou com movimento reduzido), usa scroll nativo.
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

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Uma rolagem até `top`; chama `done` quando termina. */
function scrollOnce(top: number, quick: boolean, done: () => void) {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(top, {
      duration: quick ? 0.35 : durationFor(top - window.scrollY),
      easing: easeInOutCubic,
      onComplete: done,
    });
    return;
  }

  if (prefersReducedMotion() || Math.abs(top - window.scrollY) < 2) {
    window.scrollTo({ top });
    done();
    return;
  }
  // rolagem suave nativa; scrollend avisa o fim (com reserva por tempo para
  // navegadores sem esse evento)
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    window.removeEventListener("scrollend", finish);
    done();
  };
  window.addEventListener("scrollend", finish, { once: true });
  setTimeout(finish, 1500);
  window.scrollTo({ top, behavior: quick ? "auto" : "smooth" });
}

export function scrollToTarget(
  target: string | number,
  onComplete?: () => void,
) {
  const first = targetTop(target);
  if (first === null) {
    onComplete?.();
    return;
  }

  // As seções abaixo da dobra usam content-visibility: enquanto não aparecem,
  // têm altura estimada. Ao chegar, o destino pode ter mudado de lugar; então
  // confere e completa com um ajuste curto (no máximo 2 vezes).
  let attempts = 0;
  const settle = () => {
    const now = targetTop(target);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const goal = now === null ? null : Math.min(now, maxScroll);
    if (goal !== null && Math.abs(goal - window.scrollY) > 4 && attempts < 2) {
      attempts += 1;
      scrollOnce(goal, true, settle);
      return;
    }
    onComplete?.();
  };

  scrollOnce(first, false, settle);
}

export function pauseSmoothScroll(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}
