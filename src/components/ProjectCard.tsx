import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

export interface Project {
  id: number;
  title: string;
  description: string;
  summary: string;
  company: string;
  year: string;
  category: string;
  tags: string[];
  image: string;
  mockupType: "phone" | "desktop";
  featured: boolean;
  github: string;
  demo?: string;
}

interface ProjectCardProps {
  project: Project;
  /** "01", "02"... posição entre os destaques. */
  number: string;
  viewCodeLabel: string;
  viewDemoLabel: string;
  headingRef?: (el: HTMLHeadingElement | null) => void;
}

const MAX_TAGS = 6;

export default function ProjectCard({
  project,
  number,
  viewCodeLabel,
  viewDemoLabel,
  headingRef,
}: ProjectCardProps) {
  const visibleTags = project.tags.slice(0, MAX_TAGS);
  const hiddenTags = project.tags.length - visibleTags.length;
  const headingId = `project-${project.id}-title`;

  return (
    <div className="grid h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="order-2 flex min-w-0 flex-col p-6 sm:p-8 lg:order-1 xl:p-10">
        <div className="mb-6 flex items-center justify-between gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-gray-700 dark:text-gray-300">
          <span className="flex items-center gap-3">
            <span className="rounded-md border border-black/15 px-2 py-0.5 text-gray-900 dark:border-white/20 dark:text-white">
              {number}
            </span>
            {project.company && <span>{project.company}</span>}
          </span>
          {project.year && <span>{project.year}</span>}
        </div>

        {project.category && (
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
            {project.category}
          </p>
        )}

        <h3
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className="wrap-break-word text-3xl font-medium uppercase leading-none tracking-tight text-gray-900 outline-none sm:text-4xl xl:text-5xl dark:text-white"
        >
          {project.title}
        </h3>

        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-700 sm:text-[15px] dark:text-gray-300">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-black/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-gray-700 dark:border-white/15 dark:text-gray-300"
            >
              {tag}
            </li>
          ))}
          {hiddenTags > 0 && (
            <li className="px-1.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              +{hiddenTags}
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-gray-900 transition-colors hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {viewCodeLabel}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          {project.demo && project.demo !== project.github && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-gray-900 transition-colors hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
            >
              {viewDemoLabel}
              <span className="sr-only">: {project.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="relative order-1 aspect-16/11 overflow-hidden border-b border-black/10 bg-linear-to-b from-black/2 to-black/6 lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l dark:border-white/10 dark:from-white/2 dark:to-white/5">
        <Image
          src={project.image}
          alt={`${project.title}: tela do projeto`}
          fill
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 86vw"
          className={`object-contain drop-shadow-2xl ${
            project.mockupType === "phone" ? "p-6 lg:p-10" : "p-5 sm:p-8"
          }`}
        />
      </div>
    </div>
  );
}
