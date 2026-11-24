"use client";

import { motion, useInView } from "framer-motion";
import {
  Clock,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useHydrated } from "@/hooks/useHydrated";
import BlueprintPipeline from "./collab/BlueprintPipeline";

const Earth3D = dynamic(() => import("./Earth3D"), { ssr: false });

function LazyEarth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  return (
    <div ref={ref} className="h-full w-full">
      {inView && <Earth3D />}
    </div>
  );
}

// invertOnDark: logos monocromáticos pretos, que somem no fundo escuro
// iconDark: versão própria para o tema escuro, quando inverter estragaria as cores
// wide: logotipo horizontal, que ficaria minúsculo numa caixa quadrada
type TechItem = {
  name: string;
  icon: string;
  iconDark?: string;
  invertOnDark?: boolean;
  wide?: boolean;
};

type TechGroupId = "frontend" | "backend" | "tools" | "ai";

const TECH_GROUPS: { id: TechGroupId; items: TechItem[] }[] = [
  {
    id: "frontend",
    items: [
      { name: "React", icon: "/react-original.svg" },
      { name: "Next.js", icon: "/nextjs-original.svg", invertOnDark: true },
      { name: "Angular", icon: "/angular-svgrepo-com.svg" },
      { name: "Tailwind CSS", icon: "/tailwindcss-icon-svgrepo-com.svg" },
      { name: "TypeScript", icon: "/typescript-original.svg" },
      { name: "Expo Router", icon: "/expo-router.svg", invertOnDark: true },
    ],
  },
  {
    id: "backend",
    items: [
      { name: "Python", icon: "/python-original.svg" },
      { name: "Java", icon: "/java-svgrepo-com.svg" },
      { name: "Spring Boot", icon: "/spring-original-wordmark.svg" },
      { name: "C#", icon: "/csharp-original.svg" },
      { name: "Go", icon: "/go-original-wordmark.svg", wide: true },
      { name: "MySQL", icon: "/mysql-svgrepo-com.svg" },
      { name: "PostgreSQL", icon: "/postgresql-logo-svgrepo-com.svg" },
      { name: "Supabase", icon: "/supabase-original.svg" },
      { name: "MongoDB", icon: "/mongodb-svgrepo-com.svg" },
      { name: "Redis", icon: "/redis-logo-svgrepo-com.svg" },
      { name: "Docker", icon: "/docker-svgrepo-com.svg" },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "Git", icon: "/git.svg" },
      { name: "GitHub", icon: "/github.svg", invertOnDark: true },
      { name: "Figma", icon: "/figma-original.svg" },
      { name: "Vercel", icon: "/vercel-fill-svgrepo-com.svg", invertOnDark: true },
      { name: "Railway", icon: "/railway-logo.svg", invertOnDark: true },
      { name: "Postman", icon: "/postman-icon-svgrepo-com.svg" },
      { name: "Insomnia", icon: "/insomnia-svgrepo-com.svg" },
      { name: "Trello", icon: "/trello-svgrepo-com.svg" },
      { name: "VS Code", icon: "/vscode-original.svg" },
      { name: "Visual Studio", icon: "/visualstudio-plain.svg" },
      { name: "IntelliJ IDEA", icon: "/intellij-idea-svgrepo-com.svg" },
      { name: "Eclipse", icon: "/eclipse-original.svg" },
      { name: "NPM", icon: "/npm-svgrepo-com.svg" },
      { name: "AWS", icon: "/aws-svgrepo-com.svg", iconDark: "/aws-dark.svg" },
      { name: "Azure", icon: "/azure-original-wordmark.svg" },
      { name: "OCI", icon: "/oracle-svgrepo-com.svg" },
      { name: "Linux", icon: "/linux-original.svg" },
    ],
  },
  {
    id: "ai",
    items: [
      { name: "Claude", icon: "/claude.svg" },
      { name: "ChatGPT", icon: "/chatgpt.svg", invertOnDark: true },
      { name: "Gemini", icon: "/gemini.svg" },
      { name: "RAG", icon: "/rag.svg" },
      { name: "MCP", icon: "/mcp.svg" },
      { name: "Agent Skills", icon: "/agent-skills.svg" },
    ],
  },
];

// segundos por item: o tempo de cada fileira cresce com a quantidade de itens,
// assim todas rolam na mesma velocidade
const MARQUEE_SECONDS_PER_ITEM = 5;

const TECH_GROUP_TITLE =
  "text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center";

const TECH_ICON_SIZES = "(max-width: 640px) 32px, 40px";

function TechBadge({
  tech,
  as: Tag = "div",
  duplicate = false,
}: {
  tech: TechItem;
  as?: "div" | "li";
  /** cópia usada só para o carrossel dar a volta; escondida de leitores de tela */
  duplicate?: boolean;
}) {
  return (
    <Tag
      aria-hidden={duplicate ? true : undefined}
      className="glass rounded-lg px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 flex items-center gap-1.5 xs:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
    >
      <div
        className={`relative h-4 xs:h-5 sm:h-6 flex items-center justify-center ${
          tech.wide ? "w-7 xs:w-9 sm:w-10" : "w-4 xs:w-5 sm:w-6"
        }`}
      >
        <Image
          src={tech.icon}
          alt={duplicate ? "" : `${tech.name} logo`}
          fill
          className={`object-contain ${tech.invertOnDark ? "dark:invert" : ""} ${tech.iconDark ? "dark:hidden" : ""}`}
          sizes={TECH_ICON_SIZES}
        />
        {tech.iconDark && (
          <Image
            src={tech.iconDark}
            alt=""
            aria-hidden="true"
            fill
            className="hidden object-contain dark:block"
            sizes={TECH_ICON_SIZES}
          />
        )}
      </div>
      <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap">
        {tech.name}
      </span>
    </Tag>
  );
}

function TechMarquee({
  items,
  group,
  reverse = false,
  paused = false,
}: {
  items: TechItem[];
  group: string;
  reverse?: boolean;
  paused?: boolean;
}) {
  const repeated = [...items, ...items, ...items];
  const duration = items.length * MARQUEE_SECONDS_PER_ITEM;

  return (
    <div className="relative overflow-hidden flex justify-start">
      <div
        className={`marquee flex gap-2 xs:gap-2.5 sm:gap-3 ${reverse ? "marquee-reverse" : ""}`}
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationPlayState: paused ? "paused" : undefined,
          } as React.CSSProperties
        }
      >
        {repeated.map((tech, index) => (
          <TechBadge
            key={`${group}-${index}`}
            tech={tech}
            duplicate={index >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

// Carrossel de tecnologias com filtro. "Todas" = carrossel rodando; uma
// categoria = todas as tecnologias dela paradas. As duas visões ocupam a mesma
// célula do grid (o carrossel fica invisível e pausado, guardando a altura),
// então o card não pula ao trocar de filtro.
function TechShowcase() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<TechGroupId | "all">("all");

  const active = TECH_GROUPS.find((group) => group.id === filter);
  const options = ["all", ...TECH_GROUPS.map((group) => group.id)] as const;

  return (
    <>
      <div
        role="group"
        aria-label={t.about.techFilter.label}
        className="mb-4 flex flex-wrap justify-center gap-1.5 xs:mb-5 sm:mb-6 sm:gap-2"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className={`min-h-9 cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 xs:text-xs sm:px-3.5 ${
              filter === option
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                : "border-black/15 text-gray-800 hover:bg-black/5 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10"
            }`}
          >
            {t.about.techFilter[option]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)]">
        <div
          inert={Boolean(active)}
          className={`col-start-1 row-start-1 space-y-4 xs:space-y-5 sm:space-y-6 ${active ? "invisible" : ""}`}
        >
          {TECH_GROUPS.map((group, index) => (
            <div key={group.id}>
              <h4 className={TECH_GROUP_TITLE}>{t.about.techGroups[group.id]}</h4>
              <TechMarquee
                items={group.items}
                group={group.id}
                reverse={index % 2 === 1}
                paused={Boolean(active)}
              />
            </div>
          ))}
        </div>

        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="col-start-1 row-start-1 self-start"
          >
            <h4 className={TECH_GROUP_TITLE}>{t.about.techGroups[active.id]}</h4>
            <ul className="flex flex-wrap justify-center gap-2 xs:gap-2.5 sm:gap-3">
              {active.items.map((tech) => (
                <TechBadge key={tech.name} as="li" tech={tech} />
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </>
  );
}

// fonte mono das etiquetas (o projeto não carrega uma mono própria)
const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// frase com uma palavra em destaque (serifa itálica laranja)
function AccentText({ text, accent }: { text: string; accent: string }) {
  const index = accent ? text.indexOf(accent) : -1;
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-orange-600 dark:text-orange-400">
        {accent}
      </span>
      {text.slice(index + accent.length)}
    </>
  );
}

const FIAP_NEXT_PHOTOS = ["/next-1.png", "/next-2.png", "/next-3.png"];

const KNOWBALL_URL = "https://github.com/knowball-oracle/knowball-api";

// textos traduzidos em t.aboutCertification.items, na mesma ordem
const CERTIFICATIONS = [
  {
    title: "AWS Certified Cloud Practitioner",
    image: "/aws-cloud-practitioner.png",
    accent: "text-blue-500 dark:text-blue-400",
  },
  {
    title: "Oracle Cloud Infrastructure Generative AI Professional",
    image: "/oracle-oci-generative-ai.png",
    accent: "text-red-600 dark:text-red-400",
  },
];


// larguras das barras do código de barras decorativo do ingresso (fixo, para
// o HTML do servidor e do navegador baterem)
const BARCODE = [
  2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 1, 2, 1, 2,
  3, 1, 1, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1,
];

// Ingresso do FIAP NEXT: foto (carrossel) + canhoto destacável com o resultado.
// Cores do canhoto fixas (papel creme) nos dois temas, como um ingresso real;
// os recortes da picotagem usam a cor de fundo do card.
function FiapNextTicket({
  alts,
  goToLabel,
  status,
  rows,
}: {
  alts: string[];
  goToLabel: string;
  status: string;
  rows: { label: string; value: string }[];
}) {
  const [active, setActive] = useState(0);
  const dragged = useRef(false);
  const total = FIAP_NEXT_PHOTOS.length;
  // As fotos não vão no HTML inicial: a seção fica colada na dobra e o
  // navegador as baixaria junto com a hero, disputando banda com o LCP.
  // Entram quando a seção é hidratada (perto da tela).
  const hydrated = useHydrated();

  const goNext = () => setActive((current) => (current + 1) % total);
  const goPrevious = () =>
    setActive((current) => (current - 1 + total) % total);

  return (
    <motion.div
      initial={{ rotate: -6 }}
      whileInView={{ rotate: -3 }}
      whileHover={{ rotate: -1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      viewport={{ once: true }}
      className="relative mx-auto w-full max-w-[460px] drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]"
    >
      <div className="grid aspect-[2.05/1] grid-cols-[1.35fr_1fr]">
        {/* foto */}
        <div className="relative overflow-hidden rounded-l-xl bg-gray-200 dark:bg-[#1a1a1a]">
          <motion.button
            type="button"
            aria-label={`${goToLabel} ${((active + 1) % total) + 1}`}
            onClick={() => {
              if (dragged.current) {
                dragged.current = false;
                return;
              }
              goNext();
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => {
              dragged.current = true;
            }}
            onDragEnd={(_, info) => {
              if (info.offset.x <= -50) goNext();
              if (info.offset.x >= 50) goPrevious();
            }}
            className="absolute inset-0 block cursor-pointer"
          >
            {hydrated &&
              FIAP_NEXT_PHOTOS.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={index === active ? (alts[index] ?? "") : ""}
                  fill
                  sizes="(max-width: 640px) 55vw, 270px"
                  draggable={false}
                  className={`object-cover transition-opacity duration-500 ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
          </motion.button>

          <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-0.5">
            {FIAP_NEXT_PHOTOS.map((src, index) => (
              <button
                key={src}
                type="button"
                aria-label={`${goToLabel} ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
                className="flex h-5 w-5 cursor-pointer items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full shadow-sm transition-all ${
                    index === active ? "w-3.5 bg-white" : "w-1.5 bg-white/55"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* canhoto */}
        <div className="relative flex flex-col rounded-r-xl border-l-2 border-dashed border-black/20 bg-[#f4f1ea] px-3 py-3 text-gray-900 sm:px-4 sm:py-4">
          {/* recortes da picotagem (cor do fundo do card) */}
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-white dark:bg-[#0a0a0a]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-white dark:bg-[#0a0a0a]"
          />

          <span
            className="text-[8px] uppercase tracking-[0.2em] text-gray-500 sm:text-[9px]"
            style={{ fontFamily: MONO_FONT }}
          >
            FIAP NEXT · 2026
          </span>
          <span className="mt-0.5 font-serif text-[1.65rem] italic leading-none text-orange-600 sm:text-[2rem]">
            {status}
          </span>

          <dl className="mt-2 flex flex-col text-[10px] sm:mt-3 sm:text-[11px]">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-2 border-t border-black/10 py-[3px] sm:py-1"
              >
                <dt className="font-medium text-[#57534e]">{row.label}</dt>
                <dd className="font-semibold text-gray-900">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div
            aria-hidden="true"
            className="mt-auto flex h-4 items-stretch gap-[1.5px] overflow-hidden sm:h-5"
          >
            {BARCODE.map((width, index) => (
              <span
                key={index}
                className="shrink-0 bg-gray-900"
                style={{ width: `${width}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// marcos da conquista em uma linha: 01 · 02 · 03 (o último em destaque)
function AchievementTimeline({
  label,
  steps,
}: {
  label: string;
  steps: string[];
}) {
  return (
    <ol
      aria-label={label}
      className="flex flex-col gap-2 border-t border-black/10 px-5 py-5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:px-8 lg:px-10 dark:border-white/10"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li key={step} className="flex items-center gap-4">
            {index > 0 && (
              <span
                aria-hidden="true"
                className="hidden text-gray-300 sm:inline dark:text-gray-700"
              >
                ·
              </span>
            )}
            <span
              className={
                isLast
                  ? "font-medium text-orange-600 dark:text-orange-400"
                  : "font-normal text-gray-800 dark:text-gray-200"
              }
            >
              <span
                className={`mr-2 text-xs ${isLast ? "" : "text-gray-400 dark:text-gray-500"}`}
                style={{ fontFamily: MONO_FONT }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  // imagens decorativas entram só depois da hidratação (fora do HTML inicial)
  const hydrated = useHydrated();

  return (
    <section
      id="about"
      className="py-8 sm:py-12 md:py-16 lg:py-24 px-2 xs:px-3 sm:px-4"
    >
      <h2 className="sr-only">{t.about.title}</h2>
      <div className="max-w-7xl mx-auto">
        {/* Sobre mim */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-liquid relative mb-3 overflow-hidden rounded-lg p-4 xs:mb-4 xs:rounded-xl xs:p-5 sm:mb-5 sm:rounded-2xl sm:p-6 md:mb-6 md:p-8 lg:mb-8"
        >
          {/* Duas colunas: quem (esquerda) e o que faço (direita) + fatos */}
          <div className="relative z-10 grid gap-8 sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] md:items-center md:gap-12 lg:gap-16 md:py-4 lg:py-8">
            <div className="flex flex-col gap-1.5">
              <span
                className="mb-2 text-[10px] uppercase tracking-[0.22em] text-gray-500 sm:mb-3 sm:text-[11px] dark:text-gray-400"
                style={{ fontFamily: MONO_FONT }}
              >
                ( {t.aboutIntro.eyebrow} )
              </span>
              <span className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                {t.hero.name}
              </span>
              <span
                className="text-[11px] text-gray-500 sm:text-xs dark:text-gray-400"
                style={{ fontFamily: MONO_FONT }}
              >
                {t.aboutIntro.location}
              </span>
            </div>

            <div>
              <p className="text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-gray-900 xs:text-[1.7rem] sm:text-3xl lg:text-[2.6rem] lg:leading-[1.22] dark:text-white">
                <AccentText
                  text={t.aboutIntro.statement}
                  accent={t.aboutIntro.accent}
                />
              </p>

              <dl className="mt-8 grid gap-5 border-t border-black/10 pt-5 sm:mt-10 sm:grid-cols-3 sm:gap-6 sm:pt-6 dark:border-white/10">
                {t.aboutIntro.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt
                      className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400"
                      style={{ fontFamily: MONO_FONT }}
                    >
                      {fact.label}
                    </dt>
                    <dd className="text-sm font-medium leading-snug text-gray-900 sm:text-[15px] dark:text-gray-100">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>

        {/* FIAP NEXT */}
        <motion.div
          id="fiap-next"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mb-3 overflow-hidden rounded-lg border border-black/10 bg-white xs:mb-4 xs:rounded-xl sm:mb-5 sm:rounded-2xl md:mb-6 lg:mb-8 dark:border-white/10 dark:bg-[#0a0a0a]"
        >
          {/* desktop: Top 3 | texto | ingresso; tablet: Top 3 + texto, ingresso
              embaixo; celular: tudo empilhado */}
          <div className="grid items-center gap-8 p-5 sm:p-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.15fr)] lg:p-10">
            <div className="md:pr-2">
              <span
                className="block text-[10px] uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400"
                style={{ fontFamily: MONO_FONT }}
              >
                {t.aboutAchievement.eyebrow}
              </span>
              <span className="mt-1 block font-serif text-7xl italic leading-[0.9] tracking-tight whitespace-nowrap text-orange-600 sm:text-8xl lg:text-[7rem] dark:text-orange-400">
                {t.aboutAchievement.badgeRank}
              </span>
              <span className="mt-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300">
                FIAP NEXT 2026
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-medium leading-snug tracking-[-0.01em] text-gray-900 sm:text-[1.7rem] dark:text-white">
                {t.aboutAchievement.title}
              </h3>

              <p className="mt-3 max-w-md text-sm font-normal leading-relaxed text-gray-700 sm:text-[15px] dark:text-gray-300">
                {t.aboutAchievement.description
                  .split(t.aboutAchievement.highlight)
                  .map((part, index) => (
                    <span key={`${part}-${index}`}>
                      {index > 0 && (
                        <strong className="font-medium text-gray-900 dark:text-white">
                          {t.aboutAchievement.highlight}
                        </strong>
                      )}
                      {part}
                    </span>
                  ))}
              </p>

              <a
                href={KNOWBALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
              >
                {t.aboutAchievement.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <FiapNextTicket
                alts={t.aboutAchievement.photoAlts}
                goToLabel={t.aboutAchievement.goToPhoto}
                status={t.aboutAchievement.badgeStatus}
                rows={[
                  { label: t.aboutAchievement.badgeChallengeLabel, value: "Oracle" },
                  { label: t.aboutAchievement.badgeProjectLabel, value: "Knowball" },
                  { label: t.aboutAchievement.badgeResultLabel, value: t.aboutAchievement.badgeRank },
                ]}
              />
            </div>
          </div>

          <AchievementTimeline
            label={t.aboutAchievement.timelineLabel}
            steps={t.aboutAchievement.timeline}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-liquid relative overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 h-full flex flex-col"
            >
              <div className="relative flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs text-gray-900 dark:text-white uppercase tracking-wider font-medium">
                  {t.about.collaboration}
                </span>
              </div>
              <h3 className="relative text-lg xs:text-xl sm:text-2xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">
                {t.about.collaborationTitle}
              </h3>
              <div className="relative -mx-4 xs:-mx-5 sm:-mx-6 md:-mx-8 -mb-4 xs:-mb-5 sm:-mb-6 md:-mb-8 flex-1 min-h-[220px] xs:min-h-[240px] sm:min-h-[260px]">
                {/* mesma área da ilustração anterior; o SVG encaixa centralizado
                    sem distorcer; o próprio SVG já tem margem interna (guias e
                    marcas de canto), então só há um respiro lateral */}
                <div className="absolute inset-0 flex items-center justify-center px-2 xs:px-3 sm:px-4 md:px-6">
                  <BlueprintPipeline labels={t.about.collaborationPipeline} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex h-full flex-col"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs text-gray-900 dark:text-white uppercase tracking-wider font-medium">
                  {t.about.timezone}
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-light text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                {t.about.timezoneTitle}
              </h3>

              <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                <div className="glass-liquid rounded-full px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-1.5 sm:py-2 flex items-center gap-1.5 xs:gap-2">
                  <span className="text-base xs:text-lg sm:text-xl">🇧🇷</span>
                  <span className="text-xs xs:text-sm sm:text-sm font-light text-gray-800 dark:text-white">
                    Brazil
                  </span>
                </div>
              </div>

              <div className="flex min-h-[200px] flex-1 items-center justify-center overflow-visible xs:min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
                <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-visible">
                  <LazyEarth />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 overflow-hidden h-full relative"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-light text-gray-900 dark:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 text-center">
                {t.about.passionate}
              </h3>

              <TechShowcase />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-2.5 xs:gap-3 sm:gap-4"
            >
              <a
                href="https://github.com/GabrielRossi01"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                  <div
                    className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <h4 className="font-light text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">
                      {t.about.github}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden xs:block">
                      {t.about.githubDesc}
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/gabriel-oliveira-rossi/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                  <div
                    className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <h4 className="font-light text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">
                      {t.about.linkedin}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden xs:block">
                      {t.about.linkedinDesc}
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 text-center"
            >
              <h3
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4"
                style={{ fontFamily: "var(--font-instrument-serif), serif" }}
              >
                {t.about.workTogether}
              </h3>

              <motion.a
                href="mailto:rossi17006@gmail.com"
                className="group relative inline-block w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        theme === "dark"
                          ? "linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))"
                          : "linear-gradient(to bottom, rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.5))",
                      transform: "translateY(4px)",
                    }}
                  />

                  <div
                    className="relative mt-2 xs:mt-2.5 sm:mt-3 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-1.5 xs:gap-2 font-light text-xs xs:text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                    style={{
                      background:
                        theme === "dark"
                          ? "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))"
                          : "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 240, 0.9))",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border:
                        theme === "dark"
                          ? "1px solid rgba(255, 255, 255, 0)"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                      boxShadow:
                        theme === "dark"
                          ? "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)"
                          : "inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)",
                      color:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.9)"
                          : "rgba(40, 40, 40, 0.9)",
                    }}
                  >
                    <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                    <span>{t.about.sendEmail}</span>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-60"
            >
              <div
                className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none bg-right bg-no-repeat mt-22 sm:mt-35 "
                style={hydrated ? { backgroundImage: "url('/snippet.png')" } : undefined}
              />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                  <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-tight text-gray-900 dark:text-white">
                    {t.about.cleanCode}
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl font-light max-w-xl text-gray-900 dark:text-gray-300">
                    {t.about.techEnthusiast}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Certificações (AWS, Oracle) */}
        {CERTIFICATIONS.map((cert, index) => {
          const copy = t.aboutCertification.items[index];
          if (!copy) return null;

          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="mt-3 rounded-lg border border-black/10 bg-white p-4 xs:mt-4 xs:rounded-xl xs:p-5 sm:mt-5 sm:rounded-2xl sm:p-6 md:mt-6 md:p-8 lg:mt-8 dark:border-white/10 dark:bg-[#0a0a0a]"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <Image
                    src={cert.image}
                    alt={copy.badgeAlt}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck
                      className={`h-3.5 w-3.5 ${cert.accent}`}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-gray-900 xs:text-xs dark:text-white">
                      {copy.eyebrow}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium leading-tight text-gray-900 xs:text-2xl sm:text-3xl dark:text-white">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-300">
                    {copy.issuer}
                  </p>

                  <ul className="mt-3 flex flex-wrap gap-2">
                    {copy.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-black/10 px-3 py-1 text-xs font-normal text-gray-800 dark:border-white/15 dark:text-gray-200"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
