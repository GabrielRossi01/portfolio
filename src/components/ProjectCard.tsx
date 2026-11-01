"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/lib/projectsData";

const COMPACT_MAX_TAGS = 6;

interface ProjectCardProps {
  project: Project;
  index: number;
  // "large": card principal, largura total; "compact": cards lado a lado
  variant?: "large" | "compact";
}

export function projectNumber(index: number) {
  return String(index + 1).padStart(3, "0");
}

export function projectLinks(
  project: Project,
  labels: { viewProject: string; viewCaseStudy: string },
) {
  const hasExternalDemo = Boolean(
    project.demo && project.demo !== project.github,
  );

  return {
    hasExternalDemo,
    href: hasExternalDemo ? project.demo! : project.github,
    label: hasExternalDemo ? labels.viewCaseStudy : labels.viewProject,
  };
}

export function TagList({ tags, max }: { tags: string[]; max?: number }) {
  const visible = max ? tags.slice(0, max) : tags;
  const hidden = tags.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {visible.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-black/15 bg-black/4 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-gray-800 transition-colors hover:border-orange-500/60 hover:bg-orange-500/10 hover:text-orange-600 dark:border-white/15 dark:bg-white/4 dark:font-normal dark:text-gray-300 dark:hover:border-orange-400/50 dark:hover:bg-orange-400/10 dark:hover:text-orange-400"
        >
          {tag}
        </span>
      ))}

      {hidden > 0 && (
        <span className="rounded-md px-1.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
          +{hidden}
        </span>
      )}
    </div>
  );
}

function TextContent({
  project,
  index,
  variant,
}: {
  project: Project;
  index: number;
  variant: "large" | "compact";
}) {
  const { t } = useLanguage();
  const links = projectLinks(project, t.projects);
  const footerMeta = [project.team, project.scope].filter(Boolean);
  const large = variant === "large";

  return (
    <div
      className={`flex flex-1 flex-col justify-between ${
        large ? "p-5 xs:p-6 sm:p-8 lg:p-10 xl:p-12" : "p-5 xs:p-6 sm:p-7"
      }`}
    >
      <div>
        <div
          className={`flex items-center justify-between gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs ${
            large ? "mb-8 sm:mb-12" : "mb-6"
          }`}
        >
          <span className="flex items-center gap-3">
            <span className="rounded-md border border-black/20 bg-black/4 px-2 py-0.5 text-gray-900 dark:border-white/20 dark:bg-white/6 dark:text-white">
              {projectNumber(index)}
            </span>

            {project.company && (
              <span className="text-gray-900 dark:text-white">
                {project.company}
              </span>
            )}
          </span>

          {project.year && (
            <span className="text-gray-800 dark:text-gray-200">
              {project.year}
            </span>
          )}
        </div>

        {project.category && (
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-orange-600 sm:text-xs dark:text-orange-400">
            {project.category}
          </p>
        )}

        <h3
          className={`wrap-break-word font-medium uppercase leading-none tracking-tight text-gray-800 dark:text-white ${
            large
              ? "mb-4 text-3xl xs:text-4xl sm:mb-5 sm:text-5xl lg:text-6xl"
              : "mb-3 text-2xl xs:text-3xl"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`max-w-xl text-sm font-light leading-relaxed text-gray-800 dark:text-gray-300 ${
            large ? "sm:text-base" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        <div className={large ? "mt-6 sm:mt-8" : "mt-5"}>
          <TagList
            tags={project.tags}
            max={large ? undefined : COMPACT_MAX_TAGS}
          />
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4 border-t border-black/15 pt-5 dark:border-white/10">
        <div className="space-y-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gray-800 sm:text-xs dark:text-gray-200">
          {footerMeta.map((item, itemIndex) => (
            <p
              key={item}
              className={
                itemIndex === 0 && footerMeta.length > 1
                  ? "text-gray-900 dark:text-white"
                  : ""
              }
            >
              {item}
            </p>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {links.hasExternalDemo && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub: ${project.title}`}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-black/20 text-gray-800 transition hover:border-orange-500/60 hover:text-orange-600 dark:border-white/15 dark:text-white dark:hover:border-orange-400/60 dark:hover:text-orange-400"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          <a
            href={links.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex min-h-10 cursor-pointer items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gray-800 transition hover:text-orange-600 sm:text-xs dark:text-white dark:hover:text-orange-400"
          >
            {links.label}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  variant = "large",
}: ProjectCardProps) {
  const large = variant === "large";
  const alt = `${project.title} screenshot`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: large ? 0 : index * 0.08 }}
      viewport={{ once: true, margin: "-60px" }}
      className="group glass-liquid flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl sm:rounded-3xl"
    >
      {large ? (
        // mobile: mockup em cima e texto embaixo; a partir de lg: texto à
        // esquerda e mockup à direita, subindo no hover
        <div className="flex w-full flex-col lg:grid lg:min-h-[480px] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex items-center justify-center overflow-hidden border-b border-black/10 bg-linear-to-b from-transparent to-black/5 lg:order-last lg:border-b-0 lg:border-l lg:bg-none dark:border-white/10 dark:to-white/5">
            <div className="relative aspect-16/10 w-full transition-transform duration-500 ease-out lg:aspect-auto lg:h-[390px] lg:w-[520px] lg:translate-y-[30%] lg:group-hover:translate-y-0 xl:h-[450px] xl:w-[600px]">
              <Image
                src={project.mockup}
                alt={alt}
                fill
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 520px, (min-width: 768px) 720px, 92vw"
                className="object-contain p-5 drop-shadow-2xl sm:p-6 lg:p-0"
              />
            </div>
          </div>

          <TextContent project={project} index={index} variant="large" />
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <ProjectImage
            src={project.mockup}
            alt={alt}
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 46vw, 92vw"
          />
          <TextContent project={project} index={index} variant="compact" />
        </div>
      )}
    </motion.article>
  );
}

export function ProjectImage({
  src,
  alt,
  sizes,
  padding = "p-5 sm:p-6",
}: {
  src: string;
  alt: string;
  sizes: string;
  padding?: string;
}) {
  return (
    <div className="relative aspect-16/10 overflow-hidden border-b border-black/10 bg-linear-to-b from-transparent to-black/5 dark:border-white/10 dark:to-white/5">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.03] ${padding}`}
      />
    </div>
  );
}
