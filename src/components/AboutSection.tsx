"use client";

import { motion } from 'framer-motion';
import { Users, Clock, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Earth3D from './Earth3D';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  // Front-end Technologies
  const frontendTech = [
    {
      name: "React",
      icon: "/react-original.svg"
    },
    {
      name: "Next.js",
      icon: "/nextjs-original.svg"
    },
    {
      name: "Tailwind CSS",
      icon: "/tailwindcss-icon-svgrepo-com.svg"
    },
    {
      name: "TypeScript",
      icon: "/typescript-original.svg"
    },
    {
      name: "HTML",
      icon: "/html5-original.svg"
    },
    {
      name: "CSS",
      icon: "/css3-original.svg"
    },
  ];

  // Back-end & Database Technologies
  const backendTech = [
    {
      name: "Node.js",
      icon: "/nodejs-icon-logo-svgrepo-com.svg"
    },
    {
      name: "Python",
      icon: "/python-original.svg"
    },
    {
      name: "Jupyter Notebook",
      icon: "/jupyter-original-wordmark.svg"
    },
    {
      name: "Java",
      icon: "/java-svgrepo-com.svg"
    },
    {
      name: "Spring Boot",
      icon: "/spring-original-wordmark.svg"
    },
    {
      name: "C#",
      icon: "/csharp-original.svg"
    },
    {
      name: "C++",
      icon: "/cplusplus-original.svg"
    },
    {
      name: "MySQL",
      icon: "/mysql-svgrepo-com.svg"
    },
    {
      name: "Docker",
      icon: "/docker-svgrepo-com.svg"
    },
  ];

  // Tools
  const toolsTech = [
    {
      name: "Git",
      icon: "/git.svg"
    },
    {
      name: "GitHub",
      icon: "/github.svg"
    },
    {
      name: "Figma",
      icon: "/figma-original.svg"
    },
    {
      name: "Vercel",
      icon: "/vercel-fill-svgrepo-com.svg"
    },
    {
      name: "Postman",
      icon: "/postman-icon-svgrepo-com.svg"
    },
    {
      name: "Insomnia",
      icon: "/insomnia-svgrepo-com.svg"
    },
    {
      name: "Trello",
      icon: "/trello-svgrepo-com.svg"
    },
    {
      name: "VS Code",
      icon: "/vscode-original.svg"
    },
    {
      name: "Visual Studio",
      icon: "/visualstudio-plain.svg"
    },
    {
      name: "Microsoft Azure",
      icon: "/azure-original-wordmark.svg"
    },
    {
      name: "Oracle Cloud",
      icon: "/oracle-svgrepo-com.svg"
    },
    {
      name: "Linux",
      icon: "/linux-original.svg"
    },
    {
      name: "Linux",
      icon: "/swagger-svgrepo-com.svg"
    },
  ];

  const duplicatedFrontend = [...frontendTech, ...frontendTech, ...frontendTech];
  const duplicatedBackend = [...backendTech, ...backendTech, ...backendTech];
  const duplicatedTools = [...toolsTech, ...toolsTech, ...toolsTech];

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-24 px-2 xs:px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start">
          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex-1"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs text-gray-300 dark:text-gray-200 uppercase tracking-wider">
                  {t.about.collaboration} 
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4">
                {t.about.collaborationTitle}
              </h3>
              <div className="flex items-center justify-center mt-4 xs:mt-5 sm:mt-6 md:mt-8">
                <div
                  className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl"
                  style={{
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.034)',
                    boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.055)',
                  }}
                >
                  👨‍💻
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex-1 flex flex-col"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs text-gray-300 dark:text-gray-200 uppercase tracking-wider">
                  {t.about.timezone}
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                {t.about.timezoneTitle}
              </h3>

              <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                <div className="glass rounded-full px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-1.5 sm:py-2 flex items-center gap-1.5 xs:gap-2 bg-green-500/20 border-green-500/30">
                  <span className="text-base xs:text-lg sm:text-xl">🇧🇷</span>
                  <span className="text-xs xs:text-sm sm:text-sm font-bold text-gray-900 dark:text-white">Brazil</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] xs:min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
                <div className="w-full max-w-[500px] aspect-square">
                  <Earth3D />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 overflow-hidden flex-1"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 text-center">
                {t.about.passionate}
              </h3>

              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                {/* Frontend Carousel */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-300 dark:text-gray-200 mb-1.5 xs:mb-2 sm:mb-3 text-center">
                    {t.techArsenal.frontend}
                  </h4>
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="flex gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 pr-1.5 xs:pr-2 sm:pr-2.5 md:pr-3"
                      animate={{ x: [0, -1200] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 25,
                          ease: "linear",
                        },
                      }}
                    >
                      {duplicatedFrontend.map((tech, index) => (
                        <div
                          key={`frontend-${index}`}
                          className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                        >
                          <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
                            <Image
                              src={tech.icon}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, 32px"
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Backend Carousel */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-300 dark:text-gray-200 mb-1.5 xs:mb-2 sm:mb-3 text-center">
                    {t.techArsenal.backend}
                  </h4>
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="flex gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 pr-1.5 xs:pr-2 sm:pr-2.5 md:pr-3"
                      animate={{ x: [-1200, 0] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 25,
                          ease: "linear",
                        },
                      }}
                    >
                      {duplicatedBackend.map((tech, index) => (
                        <div
                          key={`backend-${index}`}
                          className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                        >
                          <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
                            <Image
                              src={tech.icon}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, 32px"
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Tools Carousel */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-300 dark:text-gray-200 mb-1.5 xs:mb-2 sm:mb-3 text-center">
                    {t.techArsenal.tools}
                  </h4>
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="flex gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 pr-1.5 xs:pr-2 sm:pr-2.5 md:pr-3"
                      animate={{ x: [0, -1000] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 20,
                          ease: "linear",
                        },
                      }}
                    >
                      {duplicatedTools.map((tech, index) => (
                        <div
                          key={`tools-${index}`}
                          className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                        >
                          <div className="relative w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
                            <Image
                              src={tech.icon}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, 32px"
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
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
                    <Github className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">{t.about.github}</h4>
                    <p className="text-xs text-gray-300 dark:text-gray-200 hidden xs:block">{t.about.githubDesc}</p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/gabriel-rossi-155baa324/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                  <div
                    className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">{t.about.linkedin}</h4>
                    <p className="text-xs text-gray-300 dark:text-gray-200 hidden xs:block">{t.about.linkedinDesc}</p>
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
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4">
                {t.about.workTogether}
              </h3>
              <a
                href="#contact"
                className="group relative inline-block w-auto"
              >
                <div className="relative mt-3 xs:mt-4 sm:mt-5 md:mt-6">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgba(30, 30, 30, 0.6))',
                      transform: 'translateY(4px) scaleY(0.9)',
                      borderRadius: '9999px',
                    }}
                  />
                  <div
                    className="relative px-4 xs:px-4.5 sm:px-5 md:px-6 py-2 xs:py-2 sm:py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 font-medium text-xs xs:text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    rossi17006@gmail.com
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4"
            >
              <div className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 text-center">
                <div className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1 xs:mb-1.5 sm:mb-2">
                  5+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm text-gray-300 dark:text-gray-200">
                  {t.about.yearsExp}
                </div>
              </div>
              <div className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 text-center">
                <div className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 xs:mb-1.5 sm:mb-2">
                  50+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm text-gray-300 dark:text-gray-200">
                  {t.about.projectsCompleted}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
