"use client";

import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/lib/projectsData";
import ProjectCard from "@/components/ProjectCard";

const STACK_TOP_PX = 92; // distância do topo (logo abaixo do menu)
const STACK_STEP_PX = 24; // quanto cada card gruda abaixo do anterior
const STACK_BOTTOM_GAP_PX = 16;
const SHRINK_PER_CARD = 0.04;
const SHADE_PER_CARD = 0.22;

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function useViewportHeight() {
  return useSyncExternalStore(
    subscribeResize,
    () => window.innerHeight,
    () => 0,
  );
}

// altura natural do conteúdo do card mais alto (sem o minHeight aplicado)
function useTallestCard(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [tallest, setTallest] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const contents = () =>
      Array.from(container.querySelectorAll<HTMLElement>("[data-card-content]"));
    const observer = new ResizeObserver(() => {
      const heights = contents().map((el) => {
        const article = el.parentElement!;
        const style = getComputedStyle(article);
        const borders =
          parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return el.offsetHeight + borders;
      });
      setTallest(Math.ceil(Math.max(0, ...heights)));
    });
    contents().forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);

  return tallest;
}

function StackItem({
  project,
  index,
  total,
  progress,
  stacking,
  reduceMotion,
  cardHeight,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacking: boolean;
  reduceMotion: boolean;
  cardHeight: number;
}) {
  // quantos cards ainda vão subir por cima deste
  const depth = total - 1 - index;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * SHRINK_PER_CARD]);
  const shade = useTransform(
    progress,
    [start, 1],
    [0, Math.min(0.6, depth * SHADE_PER_CARD)],
  );

  // mesma estrutura nos dois modos: o card não é recriado quando a pilha liga/desliga
  return (
    <div
      className={stacking ? "sticky" : undefined}
      style={stacking ? { top: STACK_TOP_PX + index * STACK_STEP_PX } : undefined}
    >
      <motion.div
        className="relative origin-top"
        style={stacking && !reduceMotion ? { scale } : undefined}
      >
        <ProjectCard
          project={project}
          index={index}
          minHeight={stacking ? cardHeight : undefined}
        />
        {stacking && depth > 0 && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-black"
            style={{ opacity: shade }}
          />
        )}
      </motion.div>
    </div>
  );
}

// Projetos em destaque empilhados: cada card gruda um pouco abaixo do anterior;
// o de baixo encolhe e escurece enquanto o próximo sobe por cima.
export default function FeaturedStack({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const viewportHeight = useViewportHeight();
  const tallest = useTallestCard(containerRef);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // a pilha só liga quando o último card (o mais baixo da pilha) cabe inteiro na tela;
  // em telas menores ou baixas, os cards ficam em lista normal
  const lastCardTop = STACK_TOP_PX + (projects.length - 1) * STACK_STEP_PX;
  const stacking =
    isDesktop &&
    tallest > 0 &&
    viewportHeight >= lastCardTop + tallest + STACK_BOTTOM_GAP_PX;

  return (
    <div
      ref={containerRef}
      className={stacking ? "relative space-y-[18vh]" : "space-y-5 sm:space-y-6"}
    >
      {projects.map((project, index) => (
        <StackItem
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
          stacking={stacking}
          reduceMotion={reduceMotion}
          cardHeight={tallest}
        />
      ))}

      {/* sticky não passa do conteúdo do pai (padding não conta): este espaço
          mantém a pilha grudada enquanto o último card chega e se assenta */}
      {stacking && <div aria-hidden="true" className="h-[30vh]" />}
    </div>
  );
}
