"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  company: string;
  year: string;
  metrics: string[];
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
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
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
  viewCaseStudyLabel: string;
  mobile?: boolean;
}

function TextContent({
  project,
  viewCaseStudyLabel,
  mobile = false,
}: TextContentProps) {
  const hasExternalDemo = project.demo && project.demo !== project.github;

  return (
    <div
      className={
        mobile
          ? "p-6 xs:p-8"
          : "p-6 xs:p-8 sm:p-10 lg:p-12 flex flex-col justify-between"
      }
    >
      <div>
        <p
          className={`font-medium text-gray-600 dark:text-gray-400 mb-2 xs:mb-3 ${
            mobile
              ? "text-[10px] xs:text-xs"
              : "text-[10px] xs:text-xs sm:text-sm"
          }`}
        >
          {project.company} {project.year}
        </p>
        <h3
          className={`font-light mb-3 xs:mb-4 text-gray-800 dark:text-white leading-tight ${
            mobile
              ? "text-xl xs:text-2xl sm:text-3xl"
              : "text-xl xs:text-2xl sm:text-3xl lg:text-4xl sm:mb-5"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-gray-900 dark:text-white leading-relaxed font-light ${
            mobile
              ? "text-xs xs:text-sm mb-4 xs:mb-5"
              : "text-xs xs:text-sm sm:text-base mb-4 xs:mb-5 sm:mb-6"
          }`}
        >
          {project.description}
        </p>

        <div
          className={`space-y-2 xs:space-y-2.5 ${
            mobile ? "mb-6 xs:mb-8" : "sm:space-y-3 mb-6 xs:mb-8"
          }`}
        >
          {project.metrics.map((metric, metricIndex) => (
            <div
              key={metricIndex}
              className="flex items-start gap-2 xs:gap-2.5"
            >
              <div className="mt-1">
                <svg
                  className={`text-green-500 ${
                    mobile
                      ? "w-3.5 h-3.5 xs:w-4 xs:h-4"
                      : "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span
                className={`text-gray-700 dark:text-gray-300 font-light ${
                  mobile
                    ? "text-[11px] xs:text-xs"
                    : "text-[11px] xs:text-xs sm:text-sm lg:text-base"
                }`}
              >
                {metric}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          className={`flex flex-wrap gap-1.5 xs:gap-2 ${
            mobile ? "mb-4 xs:mb-5" : "mb-4 xs:mb-5 sm:mb-6"
          }`}
        >
          {project.tags.slice(0, 10).map((tag, tagIndex) => (
            <div
              key={tagIndex}
              className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 flex items-center gap-1 xs:gap-1.5 hover:bg-white/10 transition-colors"
            >
              <span className="text-[10px] xs:text-xs sm:text-sm font-light text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {tag}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 xs:gap-4">
          {hasExternalDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-liquid rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all group ${
                mobile
                  ? "px-4 xs:px-5 py-2 xs:py-2.5"
                  : "px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3"
              }`}
            >
              <span
                className={`font-light text-gray-800 dark:text-white ${
                  mobile
                    ? "text-xs xs:text-sm"
                    : "text-xs xs:text-sm sm:text-base"
                }`}
              >
                {viewCaseStudyLabel}
              </span>
              <ExternalLink
                className={`text-gray-800 dark:text-white group-hover:translate-x-1 transition-transform ${
                  mobile
                    ? "w-3.5 h-3.5 xs:w-4 xs:h-4"
                    : "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5"
                }`}
              />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`glass-liquid rounded-xl hover:bg-white/20 transition-all hover:scale-110 ${
              mobile ? "p-2 xs:p-2.5" : "p-2 xs:p-2.5 sm:p-3"
            }`}
            aria-label="GitHub"
          >
            <Github
              className={`text-gray-800 dark:text-white ${
                mobile
                  ? "w-4 h-4 xs:w-5 xs:h-5"
                  : "w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6"
              }`}
            />
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
      <div className="glass-liquid rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="hidden lg:grid lg:grid-cols-2 min-h-[500px]">
          <TextContent
            project={project}
            viewCaseStudyLabel={t.projects.viewCaseStudy}
          />
          <div className="relative flex flex-col items-center justify-center overflow-hidden pb-0">
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
            viewCaseStudyLabel={t.projects.viewCaseStudy}
            mobile
          />
          <div className="relative overflow-hidden bg-linear-to-b from-transparent to-black/5 dark:to-white/5 py-8 xs:py-10 sm:py-12 flex flex-col items-center justify-center min-h-[350px] xs:min-h-[400px] sm:min-h-[450px]">
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
