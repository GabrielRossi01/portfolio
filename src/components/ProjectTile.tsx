"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project } from "@/lib/projectsData";
import {
  ProjectImage,
  TagList,
  projectLinks,
  projectNumber,
} from "@/components/ProjectCard";

const TILE_MAX_TAGS = 3;

// Card compacto da grade "Outros projetos": o card inteiro é o link.
export default function ProjectTile({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { t } = useLanguage();
  const links = projectLinks(project, t.projects);

  return (
    <a
      href={links.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-liquid flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
    >
      <ProjectImage
        src={project.mockup}
        alt={`${project.title} screenshot`}
        sizes="(min-width: 1024px) 270px, (min-width: 640px) 46vw, 78vw"
        padding="p-4"
      />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gray-800 dark:text-gray-200">
          <span className="rounded-md border border-black/20 bg-black/4 px-1.5 py-0.5 text-gray-900 dark:border-white/20 dark:bg-white/6 dark:text-white">
            {projectNumber(index)}
          </span>
          {project.year && <span>{project.year}</span>}
        </div>

        {project.category && (
          <p className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
            {project.category}
          </p>
        )}

        <h4 className="wrap-break-word text-lg font-medium uppercase leading-tight tracking-tight text-gray-800 dark:text-white">
          {project.title}
        </h4>

        <p className="mt-2 text-xs font-light leading-relaxed text-gray-700 sm:text-sm dark:text-gray-300">
          {project.description}
        </p>

        <div className="mt-auto pt-4">
          <TagList tags={project.tags} max={TILE_MAX_TAGS} />
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 border-t border-black/15 pt-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-gray-800 transition-colors group-hover:text-orange-600 dark:border-white/10 dark:text-white dark:group-hover:text-orange-400">
          {links.label}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
