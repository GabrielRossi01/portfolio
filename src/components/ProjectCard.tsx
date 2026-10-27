"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  company: string;
  year: string;
  category: string;
  team: string;
  scope: string;
  tags: string[];
  mockup: string;
  images: string[];
  mockupType: "phone" | "desktop";
  github: string;
  demo?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

interface ImageCarouselProps {
  images: string[];
  activeImageIndex: number;
  setActiveImageIndex: (i: number) => void;
  effectiveMockupType: "phone" | "desktop";
  title: string;
  index: number;
  mobile?: boolean;
}

function ImageCarousel({
  images,
  activeImageIndex,
  setActiveImageIndex,
  effectiveMockupType,
  title,
  index,
  mobile = false,
}: ImageCarouselProps) {
  return (
    <>
      <div
        className={`relative ${
          effectiveMockupType === "phone"
            ? mobile
              ? "w-[200px] h-[400px] xs:w-[240px] xs:h-[480px] sm:w-[280px] sm:h-[560px]"
              : "w-[280px] h-[560px] xl:w-[320px] xl:h-[640px]"
            : mobile
              ? "w-[320px] h-60 xs:w-[380px] xs:h-[285px] sm:w-[440px] sm:h-[330px]"
              : "w-[520px] h-[390px] xl:w-[600px] xl:h-[450px]"
        } ${
          !mobile
            ? effectiveMockupType === "phone"
              ? "translate-y-[50%] hover:translate-y-0"
              : "translate-y-[30%] hover:translate-y-0"
            : ""
        } transition-transform duration-500 ease-out`}
      >
        <Image
          src={images[activeImageIndex]}
          alt={`${title} screenshot ${activeImageIndex + 1}`}
          fill
          className="object-contain drop-shadow-2xl transition-opacity duration-300"
          priority={index < 2}
        />
      </div>

      {images.length > 1 && (
        <div
          className={`flex gap-2 z-10 ${mobile ? "mt-4" : "absolute bottom-4"}`}
        >
          {images.map((_, imgIdx) => (
            <button
              key={imgIdx}
              onClick={() => setActiveImageIndex(imgIdx)}
              aria-label={`Ver imagem ${imgIdx + 1}`}
              className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-200 ${
                activeImageIndex === imgIdx
                  ? "bg-orange-400 scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

interface TextContentProps {
  project: ProjectData;
  index: number;
  viewProjectLabel: string;
  viewCaseStudyLabel: string;
  mobile?: boolean;
}

function TextContent({
  project,
  index,
  viewProjectLabel,
  viewCaseStudyLabel,
  mobile = false,
}: TextContentProps) {
  const hasExternalDemo = project.demo && project.demo !== project.github;
  const primaryHref = hasExternalDemo ? project.demo! : project.github;
  const primaryLabel = hasExternalDemo ? viewCaseStudyLabel : viewProjectLabel;
  const number = String(index + 1).padStart(3, "0");
  const footerMeta = [project.team, project.scope].filter(Boolean);

  return (
    <div
      className={`flex flex-col justify-between ${
        mobile ? "p-5 xs:p-6" : "p-6 sm:p-8 lg:p-10 xl:p-12"
      }`}
    >
      <div>
        <div className="mb-10 flex items-center justify-between gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] sm:mb-14 sm:text-xs">
          <span className="flex items-center gap-3">
            <span className="rounded-md border border-black/20 bg-black/4 px-2 py-0.5 text-gray-900 dark:border-white/20 dark:bg-white/6 dark:text-white">
              {number}
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

        <h3 className="mb-4 wrap-break-word text-3xl font-medium uppercase leading-none tracking-tight text-gray-800 xs:text-4xl sm:mb-5 sm:text-5xl lg:text-6xl dark:text-white">
          {project.title}
        </h3>

        <p className="max-w-xl text-sm font-light leading-relaxed text-gray-800 sm:text-base dark:text-gray-300">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-black/15 bg-black/4 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-gray-800 transition-colors hover:border-orange-500/60 hover:bg-orange-500/10 hover:text-orange-600 dark:border-white/15 dark:bg-white/4 dark:font-normal dark:text-gray-300 dark:hover:border-orange-400/50 dark:hover:bg-orange-400/10 dark:hover:text-orange-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4 border-t border-black/15 pt-5 sm:mt-10 dark:border-white/10">
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
          {hasExternalDemo && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-black/20 text-gray-800 transition hover:border-orange-500/60 hover:text-orange-600 dark:border-white/15 dark:text-white dark:hover:border-orange-400/60 dark:hover:text-orange-400"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-gray-800 transition hover:text-orange-600 sm:text-xs dark:text-white dark:hover:text-orange-400"
          >
            {primaryLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const effectiveMockupType = index === 0 ? "desktop" : project.mockupType;
  const images = project.images?.length ? project.images : [project.mockup];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="glass-liquid overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl sm:rounded-3xl">
        <div className="hidden min-h-[540px] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
          <TextContent
            project={project}
            index={index}
            viewProjectLabel={t.projects.viewProject}
            viewCaseStudyLabel={t.projects.viewCaseStudy}
          />

          <div className="relative flex flex-col items-center justify-center overflow-hidden border-l border-black/10 pb-0 dark:border-white/10">
            <ImageCarousel
              images={images}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              effectiveMockupType={effectiveMockupType}
              title={project.title}
              index={index}
            />
          </div>
        </div>

        <div className="lg:hidden">
          <TextContent
            project={project}
            index={index}
            viewProjectLabel={t.projects.viewProject}
            viewCaseStudyLabel={t.projects.viewCaseStudy}
            mobile
          />

          <div className="relative flex min-h-[350px] flex-col items-center justify-center overflow-hidden border-t border-black/10 bg-linear-to-b from-transparent to-black/5 py-8 xs:min-h-[400px] xs:py-10 sm:min-h-[450px] sm:py-12 dark:border-white/10 dark:to-white/5">
            <ImageCarousel
              images={images}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              effectiveMockupType={effectiveMockupType}
              title={project.title}
              index={index}
              mobile
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
