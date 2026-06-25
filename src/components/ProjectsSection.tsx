"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { STATIC_PROJECTS_DATA } from "@/lib/projectsData";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSection() {
  const { t } = useLanguage();

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

  return (
    <section
      id="projects"
      className="py-8 xs:py-12 sm:py-20 md:py-24 px-3 xs:px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-light mb-2 xs:mb-3 sm:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {t.projects.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-orange-accent">
              {t.projects.title.split(" ").pop()}
            </span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-700 dark:text-gray-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="space-y-6 xs:space-y-8 sm:space-y-10 lg:space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
