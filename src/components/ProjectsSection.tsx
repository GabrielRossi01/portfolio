"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { STATIC_PROJECTS_DATA, type Project } from "@/lib/projectsData";
import ProjectCard from "@/components/ProjectCard";
import ProjectTile from "@/components/ProjectTile";

export default function ProjectsSection() {
  const { t } = useLanguage();

  const projects: Project[] = STATIC_PROJECTS_DATA.map((staticData) => {
    const translatedData = t.projects.items.find(
      (item) => item.title === staticData.title,
    );

    return {
      ...staticData,
      title: translatedData?.title || staticData.title,
      description: translatedData?.description || "",
      company: translatedData?.company || "",
      year: translatedData?.year || "",
      category: translatedData?.category || "",
      team: translatedData?.team || "",
      scope: translatedData?.scope || "",
    };
  });

  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);
  const [mainProject, ...secondaryProjects] = featured;

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
          className="mb-8 text-center xs:mb-12 sm:mb-16"
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

        {/* destaques: o principal em largura total e os demais lado a lado */}
        <div className="space-y-5 sm:space-y-6">
          {mainProject && (
            <ProjectCard project={mainProject} index={0} variant="large" />
          )}

          {secondaryProjects.length > 0 && (
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {secondaryProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>

        {others.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-60px" }}
            className="mt-14 sm:mt-20"
          >
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-black/10 pb-4 sm:mb-8 dark:border-white/10">
              <h3 className="text-lg font-light text-gray-900 xs:text-xl sm:text-2xl md:text-3xl dark:text-white">
                {t.projects.othersTitle}{" "}
                <span className="font-mono text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                  ({others.length})
                </span>
              </h3>

              <p
                aria-hidden="true"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600 sm:hidden dark:text-gray-400"
              >
                {t.projects.othersSwipeHint} →
              </p>
            </div>

            {/* mobile: fileira com scroll horizontal; a partir de sm: grade */}
            <ul className="-mx-3 flex snap-x snap-mandatory scroll-px-3 gap-4 overflow-x-auto px-3 pb-4 [scrollbar-width:none] xs:-mx-4 xs:scroll-px-4 xs:px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
              {others.map((project, index) => (
                <li
                  key={project.id}
                  className="w-[78%] shrink-0 snap-start xs:w-[68%] sm:w-auto"
                >
                  <ProjectTile
                    project={project}
                    index={featured.length + index}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
