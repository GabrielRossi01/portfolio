"use client";

import { motion } from 'framer-motion';
import { Users, Clock, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Earth3D from './Earth3D';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const frontendTech = [
    { name: "React", icon: "/react-original.svg" },
    { name: "Next.js", icon: "/nextjs-original.svg" },
    { name: "Tailwind CSS", icon: "/tailwindcss-icon-svgrepo-com.svg" },
    { name: "TypeScript", icon: "/typescript-original.svg" },
    { name: "HTML", icon: "/html5-original.svg" },
    { name: "CSS", icon: "/css3-original.svg" },
    { name: "Expo Router", icon: "/expo-router.svg" },
  ];

  const backendTech = [
    { name: "Node.js", icon: "/nodejs-icon-logo-svgrepo-com.svg" },
    { name: "Python", icon: "/python-original.svg" },
    { name: "Jupyter Notebook", icon: "/jupyter-original-wordmark.svg" },
    { name: "Java", icon: "/java-svgrepo-com.svg" },
    { name: "Spring Boot", icon: "/spring-original-wordmark.svg" },
    { name: "C#", icon: "/csharp-original.svg" },
    { name: "C++", icon: "/cplusplus-original.svg" },
    { name: "MySQL", icon: "/mysql-svgrepo-com.svg" },
    { name: "Docker", icon: "/docker-svgrepo-com.svg" },
  ];

  const toolsTech = [
    { name: "Git", icon: "/git.svg" },
    { name: "GitHub", icon: "/github.svg" },
    { name: "Figma", icon: "/figma-original.svg" },
    { name: "Vercel", icon: "/vercel-fill-svgrepo-com.svg" },
    { name: "Railway", icon: "/railway-logo.svg" },
    { name: "Postman", icon: "/postman-icon-svgrepo-com.svg" },
    { name: "Insomnia", icon: "/insomnia-svgrepo-com.svg" },
    { name: "Trello", icon: "/trello-svgrepo-com.svg" },
    { name: "VS Code", icon: "/vscode-original.svg" },
    { name: "Visual Studio", icon: "/visualstudio-plain.svg" },
    { name: "IntelliJ IDEA", icon: "/intellij-idea-svgrepo-com.svg" },
    { name: "NPM", icon: "/npm-svgrepo-com.svg" },
    { name: "Microsoft Azure", icon: "/azure-original-wordmark.svg" },
    { name: "Oracle Cloud", icon: "/oracle-svgrepo-com.svg" },
    { name: "Linux", icon: "/linux-original.svg" },
    { name: "Swagger", icon: "/swagger-svgrepo-com.svg" },
  ];

  const duplicatedFrontend = [...frontendTech, ...frontendTech, ...frontendTech];
  const duplicatedBackend = [...backendTech, ...backendTech, ...backendTech];
  const duplicatedTools = [...toolsTech, ...toolsTech, ...toolsTech];

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-24 px-2 xs:px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">

          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 h-full"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs text-gray-900 dark:text-white uppercase tracking-wider font-medium">
                  {t.about.collaboration}
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-light text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4">
                {t.about.collaborationTitle}
              </h3>
              <div className="flex items-center justify-center mt-4 xs:mt-5 sm:mt-6 md:mt-16">
                <div className="flex items-center justify-center -space-x-3">
                  <motion.img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Team member 1"
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full object-cover shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    viewport={{ once: true }}
                  />

                  <motion.img
                    src="https://i.pravatar.cc/150?img=8"
                    alt="Team member 2"
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full object-cover shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    viewport={{ once: true }}
                  />

                  <motion.img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Team member 3"
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full object-cover shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    viewport={{ once: true }}
                  />

                  <motion.img
                    src="https://i.pravatar.cc/150?img=32"
                    alt="Team member 4"
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full object-cover shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs text-gray-900 dark:text-white uppercase tracking-wider font-medium">
                  {t.about.timezone}
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-light text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                {t.about.timezoneTitle}
              </h3>

              <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                <div className="glass-liquid rounded-full px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-1.5 sm:py-2 flex items-center gap-1.5 xs:gap-2">
                  <span className="text-base xs:text-lg sm:text-xl">🇧🇷</span>
                  <span className="text-xs xs:text-sm sm:text-sm font-light text-gray-800 dark:text-white">Brazil</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] xs:min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
                <div className="w-full max-w-[500px] aspect-square">
                  <Earth3D />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 overflow-hidden h-full relative"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-light text-gray-900 dark:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 text-center">
                {t.about.passionate}
              </h3>

              <div className="space-y-4 xs:space-y-5 sm:space-y-6">

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center">
                    Frontend
                  </h4>
                  <div className="relative overflow-hidden flex justify-start">
                    <motion.div
                      className="flex gap-2 xs:gap-2.5 sm:gap-3"
                      animate={{ x: ["0%", "-33.333%"] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 30,
                          ease: "linear",
                        },
                      }}
                    >
                      {duplicatedFrontend.map((tech, index) => (
                        <div
                          key={`frontend-${index}`}
                          className="glass rounded-lg px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 flex items-center gap-1.5 xs:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                        >
                          <div className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                            <Image
                              src={tech.icon}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 16px, (max-width: 768px) 20px, 24px"
                            />
                          </div>
                          <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center">
                    Backend & Database
                  </h4>
                  <div className="relative overflow-hidden flex justify-start">
                    <motion.div
                      className="flex gap-2 xs:gap-2.5 sm:gap-3"
                      animate={{ x: ["-33.333%", "0%"] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 30,
                          ease: "linear",
                        },
                      }}
                    >
                      {duplicatedBackend.map((tech, index) => (
                        <div
                          key={`backend-${index}`}
                          className="glass rounded-lg px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 flex items-center gap-1.5 xs:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                        >
                          <div className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                            <Image
                              src={tech.icon}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 16px, (max-width: 768px) 20px, 24px"
                            />
                          </div>
                          <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-400 mb-2 xs:mb-2.5 sm:mb-3 text-center">
                    Tools
                  </h4>
                  <div className="relative overflow-hidden flex justify-start">
                    <motion.div
                      className="flex gap-2 xs:gap-2.5 sm:gap-3"
                      animate={{ x: ["0%", "-33.333%"] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 35,
                          ease: "linear",
                        },
                      }}
                    >
                      {duplicatedTools.map((tech, index) => (
                        <div
                          key={`tools-${index}`}
                          className="glass rounded-lg px-2.5 xs:px-3 sm:px-3.5 py-1.5 xs:py-2 flex items-center gap-1.5 xs:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                        >
                          <div className="relative w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                            <Image
                              src={tech.icon}
                              alt={`${tech.name} logo`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 16px, (max-width: 768px) 20px, 24px"
                            />
                          </div>
                          <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap">
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
                    <Github className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <h4 className="font-light text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">{t.about.github}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden xs:block">{t.about.githubDesc}</p>
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
                    <Linkedin className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <h4 className="font-light text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">{t.about.linkedin}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden xs:block">{t.about.linkedinDesc}</p>
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
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {t.about.workTogether}
              </h3>

              <motion.a
                href="mailto:rossi17006@gmail.com"
                className="group relative inline-block w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))'
                        : 'linear-gradient(to bottom, rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.5))',
                      transform: 'translateY(4px)',
                    }}
                  />

                  <div
                    className="relative mt-2 xs:mt-2.5 sm:mt-3 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-1.5 xs:gap-2 font-light text-xs xs:text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                    style={{
                      background: theme === 'dark'
                        ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))'
                        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 240, 0.9))',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: theme === 'dark'
                        ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(40, 40, 40, 0.9)',
                    }}
                  >
                    <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
                    <span>{t.about.sendEmail}</span>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-60"
            >
              <div
                className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none bg-right bg-no-repeat mt-22 sm:mt-35 "
                style={{ backgroundImage: "url('/snippet.png')" }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                  <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-tight text-gray-900 dark:text-white">
                    {t.about.cleanCode}
                  </h3>
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl font-light max-w-xl text-gray-900 dark:text-gray-300">
                    {t.about.techEnthusiast}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
