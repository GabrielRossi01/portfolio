"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import {
  createRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { STATIC_PROJECTS_DATA } from "@/lib/projectsData";
import { scrollToElement } from "@/lib/smooth-scroll";
import ProjectCard, { type Project } from "@/components/ProjectCard";

// Mesma condição do @custom-variant "stack" do globals.css.
const STACK_QUERY = "(min-width: 1024px) and (min-height: 700px)";
// Distância do topo em que o cartão gruda (abaixo do menu fixo): igual a stack:top-28.
const STICKY_TOP = 112;
const RECEDED_SCALE = 0.94;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

interface FeaturedCardProps {
  project: Project;
  index: number;
  /** Marcador do próximo cartão: quando ele sobe, este recua. */
  nextSentinel?: RefObject<HTMLDivElement | null>;
  animate: boolean;
  /** Modo empilhado: o progresso deste cartão define o projeto atual do trilho. */
  tracking: boolean;
  onPassedChange: (index: number, passed: boolean) => void;
  headingRef: (el: HTMLHeadingElement | null) => void;
  cardRef: (el: HTMLElement | null) => void;
  labels: { viewCode: string; viewDemo: string };
}

function FeaturedCard({
  project,
  index,
  nextSentinel,
  animate,
  tracking,
  onPassedChange,
  headingRef,
  cardRef,
  labels,
}: FeaturedCardProps) {
  // Progresso da chegada do próximo cartão: do pé da janela até onde ele gruda.
  // O alvo é o marcador (não sticky) porque um elemento grudado não está onde nasceu.
  const { scrollYProgress } = useScroll({
    target: nextSentinel,
    offset: ["start end", `start ${STICKY_TOP}px`],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, RECEDED_SCALE]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.6]);
  const hasNext = Boolean(nextSentinel);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (hasNext && tracking) onPassedChange(index, value > 0.5);
  });

  const effect = animate && hasNext;

  return (
    <motion.article
      ref={cardRef}
      aria-labelledby={`project-${project.id}-title`}
      style={effect ? { scale, transformOrigin: "top center" } : undefined}
      className="relative mr-4 w-[86%] shrink-0 snap-start overflow-hidden rounded-3xl border border-black/10 bg-white last:mr-0 sm:w-[72%] md:w-[60%] dark:border-white/10 dark:bg-[#0c0c0c] stack:sticky stack:top-28 stack:mr-0 stack:mb-10 stack:w-auto stack:last:mb-0 stack:shadow-[0_-24px_48px_rgba(0,0,0,0.18)] stack:dark:shadow-[0_-24px_48px_rgba(0,0,0,0.5)]"
    >
      <ProjectCard
        project={project}
        number={String(index + 1).padStart(2, "0")}
        viewCodeLabel={labels.viewCode}
        viewDemoLabel={labels.viewDemo}
        headingRef={headingRef}
      />

      {effect && (
        <motion.span
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 z-10 bg-background"
        />
      )}
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const stacked = useMediaQuery(STACK_QUERY);

  const projects = useMemo<Project[]>(
    () =>
      STATIC_PROJECTS_DATA.map((staticData) => {
        const translated = t.projects.items.find(
          (item) => item.title === staticData.title,
        );

        return {
          ...staticData,
          title: translated?.title || staticData.title,
          description: translated?.description || "",
          summary: translated?.summary || "",
          company: translated?.company || "",
          year: translated?.year || "",
          category: translated?.category || "",
        };
      }),
    [t],
  );

  const featured = useMemo(() => projects.filter((p) => p.featured), [projects]);
  const others = useMemo(() => projects.filter((p) => !p.featured), [projects]);

  const sentinels = useMemo(
    () => featured.map(() => createRef<HTMLDivElement>()),
    [featured],
  );
  const cardEls = useRef<(HTMLElement | null)[]>([]);
  const headingEls = useRef<(HTMLHeadingElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const passed = useRef<boolean[]>([]);
  // O índice vale só para o modo em que foi medido: ao trocar de modo volta a 0.
  const [activeState, setActiveState] = useState({ stacked: false, index: 0 });
  const active = activeState.stacked === stacked ? activeState.index : 0;
  const setActive = useCallback(
    (index: number) => setActiveState({ stacked, index }),
    [stacked],
  );

  // Empilhado: o projeto atual é a quantidade de cartões que já chegaram.
  const handlePassedChange = useCallback((index: number, isPassed: boolean) => {
    if (passed.current[index] === isPassed) return;
    passed.current[index] = isPassed;
    setActive(passed.current.filter(Boolean).length);
  }, [setActive]);

  // Carrossel: o projeto atual é o cartão mais visível dentro do trilho.
  useEffect(() => {
    const track = trackRef.current;
    if (stacked || !track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(cardEls.current.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { root: track, threshold: 0.6 },
    );

    cardEls.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [stacked, featured, setActive]);

  const goTo = (index: number) => {
    const target = (index + featured.length) % featured.length;

    if (stacked) {
      const sentinel = sentinels[target].current;
      if (!sentinel) return;
      scrollToElement(sentinel, STICKY_TOP);
      // Foco no título do projeto: quem navega por teclado continua dali.
      requestAnimationFrame(() =>
        headingEls.current[target]?.focus({ preventScroll: true }),
      );
      return;
    }

    const track = trackRef.current;
    const card = cardEls.current[target];
    if (!track || !card) return;
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: card.offsetLeft - padding,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const titleWords = t.projects.title.split(" ");

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="px-4 py-16 sm:px-6 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl sm:mb-14">
          <h2
            id="projects-title"
            className="mb-3 text-3xl font-light text-gray-900 sm:text-4xl md:text-5xl dark:text-white"
          >
            {titleWords.slice(0, -1).join(" ")}{" "}
            <span className="gradient-orange-accent">{titleWords[titleWords.length - 1]}</span>
          </h2>
          <p className="text-base font-light text-gray-700 sm:text-lg dark:text-gray-300">
            {t.projects.subtitle}
          </p>
        </header>

        <div className="stack:grid stack:grid-cols-[11rem_minmax(0,1fr)] stack:items-start stack:gap-10 xl:stack:grid-cols-[13rem_minmax(0,1fr)]">
          {/* Trilho lateral: só no modo empilhado. */}
          <nav
            aria-label={t.projects.title}
            className="hidden stack:sticky stack:top-28 stack:block"
          >
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 z-10 w-px bg-orange-500 transition-[height] duration-500 ease-out"
                style={{
                  height: `${((active + 1) / featured.length) * 100}%`,
                }}
              />
              <ol className="border-l border-black/10 dark:border-white/10">
                {featured.map((project, index) => (
                  <li key={project.id}>
                    <a
                      href={`#project-${project.id}-title`}
                      onClick={(event) => {
                        event.preventDefault();
                        // O Lenis também escutaria este clique de âncora.
                        event.stopPropagation();
                        goTo(index);
                      }}
                      aria-current={active === index ? "true" : undefined}
                      className={`flex min-h-11 items-center gap-3 pl-5 text-sm transition-colors ${
                        active === index
                          ? "font-medium text-gray-900 dark:text-white"
                          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] ${
                          active === index ? "text-orange-600 dark:text-orange-400" : ""
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate uppercase tracking-wide">
                        {project.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0">
            {/* Celular e tablet: carrossel nativo com scroll-snap.
                Desktop alto: lista de cartões que grudam e se empilham. */}
            <div
              ref={trackRef}
              className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden stack:mx-0 stack:block stack:overflow-visible stack:px-0 stack:pb-0"
            >
              {featured.map((project, index) => (
                <Fragment key={project.id}>
                  <div
                    ref={sentinels[index]}
                    aria-hidden="true"
                    className="hidden stack:block"
                  />
                  <FeaturedCard
                    project={project}
                    index={index}
                    nextSentinel={sentinels[index + 1]}
                    animate={stacked && !reduceMotion}
                    tracking={stacked}
                    onPassedChange={handlePassedChange}
                    cardRef={(el) => {
                      cardEls.current[index] = el;
                    }}
                    headingRef={(el) => {
                      headingEls.current[index] = el;
                    }}
                    labels={{
                      viewCode: t.projects.viewCode,
                      viewDemo: t.projects.viewDemo,
                    }}
                  />
                </Fragment>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 stack:hidden">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label={t.projects.previous}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 text-gray-800 transition hover:bg-black/5 active:scale-[0.96] dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center">
                {featured.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`${t.projects.goTo} ${project.title}`}
                    aria-current={index === active ? "true" : undefined}
                    className="group inline-flex h-11 w-7 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === active
                          ? "w-5 bg-orange-500"
                          : "w-2 bg-gray-400/60 group-hover:bg-gray-500 dark:bg-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label={t.projects.next}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 text-gray-800 transition hover:bg-black/5 active:scale-[0.96] dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Outros projetos: uma linha cada, sem cartão. */}
        <div className="mt-16 sm:mt-20">
          <h3 className="mb-4 text-xl font-light text-gray-900 sm:mb-6 sm:text-2xl dark:text-white">
            {t.projects.otherTitle}
          </h3>

          <ul className="border-b border-black/10 dark:border-white/10">
            {others.map((project) => (
              <li
                key={project.id}
                className="group relative flex flex-col gap-1 border-t border-black/10 py-4 transition-colors hover:bg-black/2 md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,11rem)_auto] md:items-baseline md:gap-x-8 md:px-3 md:py-5 dark:border-white/10 dark:hover:bg-white/3"
              >
                {/* No celular a ação fica na linha do nome; no desktop vai para a última coluna. */}
                <div className="flex items-baseline justify-between gap-3 md:contents">
                  <span className="text-base font-medium text-gray-900 transition-colors group-hover:text-orange-600 md:text-lg dark:text-white dark:group-hover:text-orange-400">
                    {project.title}
                  </span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gray-700 after:absolute after:inset-0 md:order-last md:justify-end dark:text-gray-300"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    {t.projects.viewCode}
                    <span className="sr-only">: {project.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
                <p className="text-sm font-light leading-snug text-gray-700 md:text-[15px] dark:text-gray-300">
                  {project.summary}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {project.tags.slice(0, 3).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
