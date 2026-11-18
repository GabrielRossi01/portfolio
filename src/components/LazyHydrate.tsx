"use client";

import { ReactNode, Suspense, use, useEffect, useRef, useState } from "react";

/*
 * Hidratação sob demanda + renderização sob demanda.
 *
 * 1. O servidor renderiza a seção normalmente (o HTML chega pronto, bom para
 *    SEO). No navegador, a parte de dentro do <Suspense> "suspende" durante a
 *    hidratação: o React mantém o HTML do servidor e só executa o JS da seção
 *    quando ela chega perto da tela ou na primeira interação. Quando a hora
 *    chega, o React hidrata em fatias pequenas, sem travar a página.
 *
 * 2. `content-visibility: auto` no wrapper: enquanto a seção está longe da
 *    tela, o navegador nem calcula estilo/layout/pintura dela, e as imagens
 *    lá dentro não são baixadas. A primeira pintura fica só com o que aparece.
 */

type Gate = Promise<void> & { status?: "pending" | "fulfilled"; value?: void };
type GateHandle = { promise: Gate; open: () => void };

const pendingGates = new Set<GateHandle>();
let hydrateEverything = false;
// depois da primeira hidratação, qualquer seção montada do zero renderiza na hora
let firstCommitDone = false;

function createGate(): GateHandle {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  }) as Gate;
  promise.status = "pending";

  const handle: GateHandle = {
    promise,
    open: () => {
      if (promise.status === "fulfilled") return;
      // status/value marcados à mão: o use() do React lê isso e não suspende
      // de novo, mesmo antes do then() rodar
      promise.status = "fulfilled";
      promise.value = undefined;
      pendingGates.delete(handle);
      resolve();
    },
  };
  return handle;
}

/**
 * Hidrata todas as seções que ainda estão esperando. Chame antes de mudar um
 * contexto que as seções leem (idioma, tema), para o React não descartar o
 * HTML do servidor ao receber a atualização.
 */
export function hydrateAllSections() {
  hydrateEverything = true;
  pendingGates.forEach((gate) => gate.open());
}

// Antes de o usuário rolar, só hidrata o que está de fato visível. A partir da
// primeira intenção de rolar, passa a hidratar com antecedência (rootMargin).
// Assim a seção colada na dobra não é hidratada durante a carga da página.
let scrollIntent = false;
const scrollIntentListeners = new Set<() => void>();

if (typeof window !== "undefined") {
  // clique/toque/tecla liberam tudo: o usuário pode trocar idioma/tema ou
  // navegar para qualquer seção
  const onFirstInput = () => {
    hydrateAllSections();
    window.removeEventListener("pointerdown", onFirstInput, true);
    window.removeEventListener("keydown", onFirstInput, true);
  };
  window.addEventListener("pointerdown", onFirstInput, true);
  window.addEventListener("keydown", onFirstInput, true);

  const scrollEvents = ["scroll", "wheel", "touchmove"] as const;
  const onScrollIntent = () => {
    scrollIntent = true;
    scrollEvents.forEach((type) => window.removeEventListener(type, onScrollIntent));
    scrollIntentListeners.forEach((fn) => fn());
    scrollIntentListeners.clear();
  };
  scrollEvents.forEach((type) =>
    window.addEventListener(type, onScrollIntent, { passive: true }),
  );
}

function Gatekeeper({ gate, children }: { gate: GateHandle; children: ReactNode }) {
  if (gate.promise.status !== "fulfilled") use(gate.promise as Promise<void>);
  return <>{children}</>;
}

export default function LazyHydrate({
  children,
  rootMargin = "600px 0px",
  estimatedHeight = 1000,
  renderWhenVisible = true,
}: {
  children: ReactNode;
  /** antecedência com que a seção é hidratada antes de entrar na tela */
  rootMargin?: string;
  /** altura aproximada (px) enquanto a seção ainda não foi renderizada */
  estimatedHeight?: number;
  /**
   * usa content-visibility: auto. Desligue em seções com position: fixed
   * dentro (o wrapper viraria o bloco de contenção delas).
   */
  renderWhenVisible?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [gate] = useState(() => {
    const handle = createGate();
    const isServer = typeof window === "undefined";
    if (isServer || hydrateEverything || firstCommitDone) handle.open();
    else pendingGates.add(handle);
    return handle;
  });

  useEffect(() => {
    firstCommitDone = true;
    if (gate.promise.status === "fulfilled") return;
    const el = ref.current;
    if (!el) return;

    let io: IntersectionObserver | null = null;
    const watch = (margin: string, threshold: number) => {
      io?.disconnect();
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            gate.open();
            io?.disconnect();
          }
        },
        { rootMargin: margin, threshold },
      );
      io.observe(el);
    };

    const watchAhead = () => {
      if (gate.promise.status !== "fulfilled") watch(rootMargin, 0);
    };

    if (scrollIntent) {
      watchAhead();
    } else {
      // só o que está realmente na tela (encostar na borda não conta)
      watch("0px", 0.01);
      scrollIntentListeners.add(watchAhead);
    }

    return () => {
      io?.disconnect();
      scrollIntentListeners.delete(watchAhead);
    };
  }, [gate, rootMargin]);

  return (
    <div
      ref={ref}
      style={
        renderWhenVisible
          ? {
              contentVisibility: "auto",
              // "auto" faz o navegador lembrar a altura real depois da 1ª vez
              containIntrinsicSize: `auto ${estimatedHeight}px`,
            }
          : undefined
      }
    >
      <Suspense fallback={null}>
        <Gatekeeper gate={gate}>{children}</Gatekeeper>
      </Suspense>
    </div>
  );
}
