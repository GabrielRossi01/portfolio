"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import BranchGraph3D from "./BranchGraph3D";

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

function TechMarquee({
  items,
  group,
  duration,
  reverse = false,
}: {
  items: { name: string; icon: string }[];
  group: string;
  duration: number;
  reverse?: boolean;
}) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden flex justify-start">
      <div
        className={`marquee flex gap-2 xs:gap-2.5 sm:gap-3 ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {repeated.map((tech, index) => (
          <div
            key={`${group}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className="glass rounded-lg px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 flex items-center gap-1.5 xs:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
          >
            <div className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              <Image
                src={tech.icon}
                alt={index < items.length ? `${tech.name} logo` : ""}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 16px, (max-width: 768px) 20px, 24px"
              />
            </div>
            <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CURSOR_COLORS = [
  "bg-blue-500 dark:bg-blue-400",
  "bg-pink-500 dark:bg-pink-400",
  "bg-violet-500 dark:bg-violet-400",
];

function TypingCursor({ index }: { index: number }) {
  const color = CURSOR_COLORS[index % CURSOR_COLORS.length];

  return (
    <span
      aria-hidden="true"
      className="relative ml-[0.1em] inline-block h-[1em] w-0 align-baseline"
    >
      <span
        className={`absolute -top-[0.2em] -bottom-[0.2em] left-0 w-[3px] rounded-full ${color}`}
      >
        <span
          className={`absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full ${color}`}
        />
      </span>
    </span>
  );
}

function HighlightedText({
  text,
  highlights,
  cursors,
}: {
  text: string;
  highlights: string[];
  cursors: string[];
}) {
  const pattern = new RegExp(
    `(${[...highlights, ...cursors]
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "g",
  );

  return (
    <>
      {text.split(pattern).map((part, index) => {
        const key = `${part}-${index}`;

        if (highlights.includes(part)) {
          return (
            <span
              key={key}
              className="rounded-md bg-gray-900 px-[0.3em] py-[0.05em] text-white box-decoration-clone dark:bg-white dark:text-gray-900"
            >
              {part}
            </span>
          );
        }

        const cursorIndex = cursors.indexOf(part);

        if (cursorIndex === -1) {
          return <span key={key}>{part}</span>;
        }

        // última palavra presa ao cursor, para ele nunca cair sozinho na linha
        const lastSpace = part.lastIndexOf(" ") + 1;

        return (
          <span key={key}>
            {part.slice(0, lastSpace)}
            <span className="whitespace-nowrap">
              {part.slice(lastSpace)}
              <TypingCursor index={cursorIndex} />
            </span>
          </span>
        );
      })}
    </>
  );
}

const FIAP_NEXT_PHOTOS = ["/next-1.png", "/next-2.png", "/next-3.png"];

const KNOWBALL_URL = "https://github.com/knowball-oracle/knowball-api";

const AWS_CREDLY_URL =
  "https://www.credly.com/badges/5613977a-cad2-4ebf-a923-b255b54fa5dc/linked_in_profile";

function FiapNextBadge({
  alts,
  goToLabel,
  status,
  rank,
  eventLabel,
  challengeLabel,
}: {
  alts: string[];
  goToLabel: string;
  status: string;
  rank: string;
  eventLabel: string;
  challengeLabel: string;
}) {
  const [active, setActive] = useState(0);
  const dragged = useRef(false);
  const total = FIAP_NEXT_PHOTOS.length;

  const goNext = () => setActive((current) => (current + 1) % total);
  const goPrevious = () =>
    setActive((current) => (current - 1 + total) % total);

  return (
    <div className="relative mx-auto mt-10 w-full max-w-76 lg:mt-0">
      <div
        aria-hidden="true"
        className="absolute bottom-full left-1/2 h-10 w-6 -translate-x-1/2 translate-y-3 lg:h-screen"
        style={{
          background:
            "repeating-linear-gradient(135deg, #e11d6b 0 6px, #f4518f 6px 12px)",
        }}
      />

      <motion.div
        initial={{ rotate: -7 }}
        whileInView={{ rotate: -4 }}
        whileHover={{ rotate: -2 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        viewport={{ once: true }}
        className="relative origin-top rounded-2xl border border-black/10 bg-gray-50 p-3 sm:p-4 dark:border-white/10 dark:bg-[#141414]"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-3 h-2 w-12 rounded-full border border-black/10 bg-white dark:border-white/10 dark:bg-black"
        />

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
          className="relative block aspect-5/4 w-full cursor-pointer overflow-hidden rounded-xl"
        >
          {FIAP_NEXT_PHOTOS.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={index === active ? (alts[index] ?? "") : ""}
              fill
              sizes="(max-width: 640px) 80vw, 288px"
              draggable={false}
              className={`object-cover transition-opacity duration-500 ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </motion.button>

        <div className="mt-3 flex justify-center gap-1">
          {FIAP_NEXT_PHOTOS.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`${goToLabel} ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === active
                    ? "bg-orange-500"
                    : "bg-black/20 dark:bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-1 flex items-baseline justify-between gap-3 border-b border-dashed border-black/15 pb-3 dark:border-white/15">
          <span
            className="text-3xl text-orange-600 italic sm:text-4xl dark:text-orange-400"
            style={{ fontFamily: "var(--font-instrument-serif), serif" }}
          >
            {status}
          </span>
          <span className="text-xs font-light text-gray-600 dark:text-gray-400">
            {rank}
          </span>
        </div>

        <dl className="mt-3 flex justify-between gap-3 text-xs">
          <div>
            <dt className="font-light text-gray-600 dark:text-gray-400">
              {eventLabel}
            </dt>
            <dd className="mt-0.5 font-medium text-gray-900 dark:text-white">
              FIAP NEXT 2026
            </dd>
          </div>
          <div className="text-right">
            <dt className="font-light text-gray-600 dark:text-gray-400">
              {challengeLabel}
            </dt>
            <dd className="mt-0.5 font-medium text-gray-900 dark:text-white">
              Oracle
            </dd>
          </div>
        </dl>
      </motion.div>
    </div>
  );
}

function AchievementTimeline({
  label,
  steps,
}: {
  label: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <ol
      aria-label={label}
      className="grid border-t border-black/10 px-4 py-6 xs:px-5 sm:px-6 md:grid-cols-3 md:px-8 md:py-8 dark:border-white/10"
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.title}
            className={`relative pl-7 md:pl-0 md:pr-6 md:pt-7 ${isLast ? "" : "pb-6 md:pb-0"}`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-1.5 top-1 bottom-0 w-px md:left-0 md:right-0 md:top-1.5 md:bottom-auto md:h-px md:w-auto ${
                isLast
                  ? "hidden bg-black/10 md:block dark:bg-white/10"
                  : "bg-orange-500"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1 h-[13px] w-[13px] rounded-full bg-orange-500 md:top-0 ${
                isLast ? "ring-4 ring-orange-500/20" : ""
              }`}
            />

            <h4
              className={`text-sm font-medium ${
                isLast
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              <span
                className="mr-1.5 font-normal text-gray-500 italic dark:text-gray-400"
                style={{ fontFamily: "var(--font-instrument-serif), serif" }}
              >
                {index + 1}
              </span>
              {step.title}
            </h4>
            <p className="mt-1 text-sm font-light leading-relaxed text-gray-700 dark:text-gray-400">
              {step.text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const frontendTech = [
    { name: "React", icon: "/react-original.svg" },
    { name: "Next.js", icon: "/nextjs-original.svg" },
    { name: "Angular", icon: "/angular-svgrepo-com.svg" },
    { name: "Tailwind CSS", icon: "/tailwindcss-icon-svgrepo-com.svg" },
    { name: "TypeScript", icon: "/typescript-original.svg" },
    { name: "Expo Router", icon: "/expo-router.svg" },
  ];

  const backendTech = [
    { name: "Python", icon: "/python-original.svg" },
    { name: "Java", icon: "/java-svgrepo-com.svg" },
    { name: "Spring Boot", icon: "/spring-original-wordmark.svg" },
    { name: "C#", icon: "/csharp-original.svg" },
    { name: "MySQL", icon: "/mysql-svgrepo-com.svg" },
    { name: "PostgreSQL", icon: "/postgresql-logo-svgrepo-com.svg" },
    { name: "MongoDB", icon: "/mongodb-svgrepo-com.svg" },
    { name: "Redis", icon: "/redis-logo-svgrepo-com.svg" },
    { name: "Docker", icon: "/docker-svgrepo-com.svg" },
  ];

  const toolsTech = [
    { name: "Git", icon: "/git.svg" },
    { name: "GitHub", icon: "/github.svg" },
    { name: "Figma", icon: "/figma-original.svg" },
    { name: "Vercel", icon: "/vercel-fill-svgrepo-com.svg" },
    { name: "Railway", icon: "/railway-logo.svg" },
    { name: "Postman", icon: "/postman-icon-svgrepo-com.svg" },
    { name: "Insomnia", icon: "/insomnia-svgrepo-com.svg" },
    { name: "Trello", icon: "/trello-svgrepo-com.svg" },
    { name: "VS Code", icon: "/vscode-original.svg" },
    { name: "Visual Studio", icon: "/visualstudio-plain.svg" },
    { name: "IntelliJ IDEA", icon: "/intellij-idea-svgrepo-com.svg" },
    { name: "NPM", icon: "/npm-svgrepo-com.svg" },
    { name: "AWS", icon: "/aws-svgrepo-com.svg" },
    { name: "Azure", icon: "/azure-original-wordmark.svg" },
    { name: "OCI", icon: "/oracle-svgrepo-com.svg" },
    { name: "Linux", icon: "/linux-original.svg" },
  ];

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
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2 xs:mb-4">
              <span className="h-px w-6 bg-gray-800 sm:w-8 dark:bg-white" />

              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-800 xs:text-[10px] dark:text-white">
                {t.aboutIntro.eyebrow}
              </span>

              <span className="h-px w-6 bg-gray-800 sm:w-8 dark:bg-white" />
            </div>

            <p className="text-lg font-light leading-[1.45] tracking-[-0.02em] text-gray-800 xs:text-xl sm:text-2xl md:text-3xl dark:text-white">
              <HighlightedText
                text={t.aboutIntro.text}
                highlights={t.aboutIntro.highlights}
                cursors={t.aboutIntro.cursors}
              />
            </p>
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
          <div className="grid items-center gap-8 p-4 xs:p-5 sm:p-6 md:p-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-3 flex items-center gap-2 xs:mb-4">
                <Trophy
                  className="h-4 w-4 text-orange-500"
                  aria-hidden="true"
                />

                <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                  {t.aboutAchievement.eyebrow}
                </span>
              </div>

              <h3 className="mb-4 max-w-md text-2xl font-light leading-tight text-gray-900 sm:text-4xl dark:text-white">
                {t.aboutAchievement.title}
              </h3>

              <p className="max-w-md text-sm font-light leading-relaxed text-gray-700 sm:text-base dark:text-gray-300">
                {t.aboutAchievement.description
                  .split(t.aboutAchievement.highlight)
                  .map((part, index) => (
                    <span key={part}>
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
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 px-5 py-2 text-sm font-normal text-gray-900 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {t.aboutAchievement.cta}
              </a>
            </div>

            <FiapNextBadge
              alts={t.aboutAchievement.photoAlts}
              goToLabel={t.aboutAchievement.goToPhoto}
              status={t.aboutAchievement.badgeStatus}
              rank={t.aboutAchievement.badgeRank}
              eventLabel={t.aboutAchievement.badgeEventLabel}
              challengeLabel={t.aboutAchievement.badgeChallengeLabel}
            />
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
                <BranchGraph3D />
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
                <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-visible">
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

              <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center">
                    Frontend
                  </h4>
                  <TechMarquee
                    items={frontendTech}
                    group="frontend"
                    duration={30}
                  />
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center">
                    Backend & Database
                  </h4>
                  <TechMarquee
                    items={backendTech}
                    group="backend"
                    duration={30}
                    reverse
                  />
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center">
                    Tools & Cloud Services
                  </h4>
                  <TechMarquee items={toolsTech} group="tools" duration={35} />
                </div>
              </div>
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
                style={{ backgroundImage: "url('/snippet.png')" }}
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

        {/* Certificação AWS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-3 rounded-lg border border-black/10 bg-white p-4 xs:mt-4 xs:rounded-xl xs:p-5 sm:mt-5 sm:rounded-2xl sm:p-6 md:mt-6 md:p-8 lg:mt-8 dark:border-white/10 dark:bg-[#0a0a0a]"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
              <Image
                src="/aws-cloud-practitioner.png"
                alt={t.aboutCertification.badgeAlt}
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-1.5">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-medium uppercase tracking-wider text-gray-900 xs:text-xs dark:text-white">
                  {t.aboutCertification.eyebrow}
                </span>
              </div>

              <h3 className="text-xl font-medium leading-tight text-gray-900 xs:text-2xl sm:text-3xl dark:text-white">
                AWS Certified Cloud Practitioner
              </h3>

              <p className="mt-1 text-sm font-light text-gray-600 dark:text-gray-400">
                {t.aboutCertification.issuer}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {[
                  t.aboutCertification.issued,
                  t.aboutCertification.validity,
                  t.aboutCertification.verified,
                ].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs font-light text-gray-800 dark:border-white/15 dark:text-gray-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={AWS_CREDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 self-start rounded-lg bg-black/5 px-4 py-2 text-sm font-normal text-gray-900 transition-colors hover:bg-black/10 sm:self-center dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              {t.aboutCertification.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
