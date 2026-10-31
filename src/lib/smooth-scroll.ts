import Lenis from "lenis";

// O menu é fixo no topo: sem este recuo o título da seção cai atrás dele.
export const HEADER_OFFSET = -96;

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Liga a rolagem suave (uma única instância do Lenis). Quem pede menos
 * movimento não recebe Lenis e rola do jeito nativo do navegador.
 * Devolve a função que desfaz tudo.
 */
export function startSmoothScroll(): () => void {
  if (typeof window === "undefined" || lenis || prefersReducedMotion()) {
    return () => {};
  }

  const instance = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    // Cliques em links "#secao" também rolam suave e param abaixo do menu.
    anchors: { offset: HEADER_OFFSET },
  });
  lenis = instance;

  return () => {
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

/** Rola até um elemento (parando `offset` px acima dele), com ou sem Lenis. */
export function scrollToElement(target: HTMLElement, offset = -HEADER_OFFSET): void {
  if (lenis) {
    lenis.scrollTo(target, { offset: -offset });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Trava a rolagem da página (menu mobile aberto) sem brigar com o Lenis. */
export function lockScroll(locked: boolean): void {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
