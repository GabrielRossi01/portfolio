"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Project, ProjectVideo, ScreenCrop } from "@/lib/projectsData";

const FEATURED_MAX_TAGS = 6;

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

// endereço mostrado na barra da janela: sem protocolo e sem ".git"
function displayUrl(project: Project, href: string) {
  if (project.previewUrl) return project.previewUrl;
  return href.replace(/^https?:\/\//, "").replace(/\.git$/, "").replace(/\/$/, "");
}

// recorta só a tela do mockup (a imagem inteira tem a moldura do iMac)
function ScreenImage({
  src,
  alt,
  crop,
}: {
  src: string;
  alt: string;
  crop?: ScreenCrop;
}) {
  if (!crop) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 560px, 92vw"
        className="object-contain p-4"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={crop.iw}
      height={crop.ih}
      sizes="(min-width: 1024px) 640px, 100vw"
      className="absolute h-auto max-w-none"
      style={{
        width: `${(crop.iw / crop.w) * 100}%`,
        left: `${(-crop.x / crop.w) * 100}%`,
        top: `${(-crop.y / crop.h) * 100}%`,
      }}
    />
  );
}

function PreviewVideo({ video }: { video: ProjectVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // O atributo poster (e o preload do vídeo) baixa a imagem assim que o HTML é
  // lido, mesmo com o card muito abaixo da dobra. Só entram quando o card
  // chega perto da tela, para não disputar banda com a primeira pintura.
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [near]);

  // toca só enquanto aparece na tela; com movimento reduzido, fica parado no primeiro quadro
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  const updateProgress = () => {
    const video = videoRef.current;
    const bar = barRef.current;
    if (!video || !bar || !video.duration) return;
    bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
  };

  return (
    <>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={near ? "metadata" : "none"}
        poster={near ? video.poster : undefined}
        aria-hidden="true"
        onTimeUpdate={updateProgress}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-orange-500 transition-transform duration-200 ease-linear"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}

function BrowserPreview({ project, url }: { project: Project; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-gray-100 shadow-2xl shadow-black/20 dark:border-white/10 dark:bg-[#1a1a1a] dark:shadow-black/60">
      <div className="flex items-center gap-3 border-b border-black/10 px-3 py-2.5 dark:border-white/10">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md border border-black/10 bg-white px-3 py-1 text-center font-mono text-[11px] font-medium text-gray-900 dark:border-white/10 dark:bg-white/8 dark:text-white">
          {url}
        </span>
        <span aria-hidden="true" className="w-[42px] shrink-0" />
      </div>

      {/* vídeos são 16:10; a tela recortada do mockup é 16:9 */}
      <div
        className={`relative overflow-hidden bg-black ${
          project.video ? "aspect-16/10" : "aspect-video"
        }`}
      >
        {project.video ? (
          <PreviewVideo video={project.video} />
        ) : (
          <ScreenImage
            src={project.mockup}
            alt={`${project.title} screenshot`}
            crop={project.screen}
          />
        )}
      </div>
    </div>
  );
}

// Card dos projetos em destaque: texto à esquerda, janela de navegador à direita.
export default function ProjectCard({
  project,
  index,
  minHeight,
}: {
  project: Project;
  index: number;
  /** na pilha, todos os cards ficam com a altura do mais alto */
  minHeight?: number;
}) {
  const { t } = useLanguage();
  const links = projectLinks(project, t.projects);
  // empresa + categoria, sem repetir quando a categoria já cita a empresa
  const companyInCategory = project.category
    .toLowerCase()
    .includes(project.company.toLowerCase());
  const eyebrow = [companyInCategory ? "" : project.company, project.category]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className="group flex flex-col justify-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-3xl dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.55)]"
      style={minHeight ? { minHeight } : undefined}
    >
      <div
        data-card-content=""
        className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center"
      >
        <div className="min-w-0 p-5 xs:p-6 sm:p-8 lg:order-last lg:py-7 lg:pl-2">
          <BrowserPreview
            project={project}
            url={displayUrl(project, links.href)}
          />
        </div>

        <div className="flex min-w-0 flex-col px-5 pb-6 xs:px-6 sm:px-8 sm:pb-8 lg:px-8 lg:py-7 xl:px-10">
          <div className="mb-5 flex items-center justify-between gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em]">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="shrink-0 rounded-md border border-black/20 bg-black/4 px-2 py-0.5 text-gray-900 dark:border-white/20 dark:bg-white/6 dark:text-white">
                {projectNumber(index)}
              </span>

              {project.badge && (
                <span className="flex min-w-0 items-center gap-1.5 truncate rounded-full border border-black/10 bg-black/4 px-2.5 py-0.5 font-sans text-[11px] font-normal normal-case tracking-normal text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
                  />
                  <span className="truncate">{project.badge}</span>
                </span>
              )}
            </span>

            {project.year && (
              <span className="shrink-0 text-gray-800 dark:text-gray-200">
                {project.year}
              </span>
            )}
          </div>

          {eyebrow && (
            <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
              {eyebrow}
            </p>
          )}

          <h3 className="mb-4 wrap-break-word text-3xl font-medium uppercase leading-none tracking-tight text-gray-900 xs:text-4xl xl:text-5xl dark:text-white">
            {project.title}
          </h3>

          <p className="text-sm font-light leading-relaxed text-gray-800 dark:text-gray-300">
            {project.description}
          </p>

          {project.role && (
            <p className="mt-4 text-sm font-light leading-relaxed text-gray-700 dark:text-gray-400">
              <strong className="font-medium text-gray-900 dark:text-white">
                {t.projects.myRole}
              </strong>{" "}
              {project.role}
            </p>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-4 divide-y divide-black/10 border-y border-black/10 text-sm font-normal text-gray-800 dark:divide-white/10 dark:border-white/10 dark:text-gray-200">
              {project.highlights.map((item) => (
                <li key={item} className="py-2">
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4">
            <TagList tags={project.tags} max={FEATURED_MAX_TAGS} />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/15 pt-4 dark:border-white/10">
            <p className="min-w-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gray-700 dark:text-gray-400">
              {project.scope}
            </p>

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
                className="group/link inline-flex min-h-10 cursor-pointer items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-orange-600 transition hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
              >
                {links.label}
                <span className="sr-only">: {project.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
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
