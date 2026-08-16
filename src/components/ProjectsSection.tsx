"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { STATIC_PROJECTS_DATA } from "@/lib/projectsData";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects = STATIC_PROJECTS_DATA.map((staticData) => {
    const translatedData = t.projects.items.find(
      (item) => item.title === staticData.title,
    );

    return {
      ...staticData,
      title: translatedData?.title || staticData.title,
      description: translatedData?.description || "",
      company: translatedData?.company || "",
      year: translatedData?.year || "",
      metrics: translatedData?.metrics || [],
    };
  });

  const goToPreviousProject = () => {
    setActiveProjectIndex((currentIndex) =>
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1,
    );
  };

  const goToNextProject = () => {
    setActiveProjectIndex((currentIndex) =>
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    const swipeThreshold = 70;

    if (info.offset.x <= -swipeThreshold) {
      goToNextProject();
    }

    if (info.offset.x >= swipeThreshold) {
      goToPreviousProject();
    }
  };

  return (
    <section
      id="projects"
      className="px-3 py-8 xs:px-4 xs:py-12 sm:px-6 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-center xs:mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="mb-2 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-xl font-light text-transparent xs:text-2xl sm:mb-3 sm:text-4xl md:mb-4 md:text-5xl dark:from-white dark:to-gray-400">
            {t.projects.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-orange-accent">
              {t.projects.title.split(" ").pop()}
            </span>
          </h2>

          <p className="text-xs font-light text-gray-700 xs:text-sm sm:text-base md:text-lg lg:text-xl dark:text-gray-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="lg:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={projects[activeProjectIndex].id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="cursor-grab active:cursor-grabbing"
            >
              <ProjectCard
                project={projects[activeProjectIndex]}
                index={activeProjectIndex}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between gap-4 xs:mt-6">
            <button
              type="button"
              onClick={goToPreviousProject}
              aria-label="Projeto anterior"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_22px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:bg-white active:scale-[0.96] dark:border-white/15 dark:bg-white/9 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_22px_rgba(0,0,0,0.25)] dark:hover:bg-white/15"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              className="flex items-center gap-2"
              aria-label="Navegação de projetos"
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProjectIndex(index)}
                  aria-label={`Ver projeto ${index + 1}`}
                  aria-current={
                    index === activeProjectIndex ? "true" : undefined
                  }
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    index === activeProjectIndex
                      ? "w-6 bg-orange-500"
                      : "w-2 bg-gray-400/50 dark:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNextProject}
              aria-label="Próximo projeto"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_22px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:bg-white active:scale-[0.96] dark:border-white/15 dark:bg-white/9 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_22px_rgba(0,0,0,0.25)] dark:hover:bg-white/15"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-3 text-center text-xs font-light text-gray-600 dark:text-gray-400">
            {activeProjectIndex + 1} / {projects.length}
          </p>
        </div>

        <div className="hidden space-y-6 xs:space-y-8 sm:space-y-10 lg:block lg:space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
