"use client";

import { motion } from 'framer-motion';
import { Users, Clock, Github, Linkedin } from 'lucide-react';
import Earth3D from './Earth3D';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  // Front-end Technologies
  const frontendTech = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind", icon: "🎨" },
    { name: "TypeScript", icon: "💙" },
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎭" },
  ];

  // Back-end & Database Technologies
  const backendTech = [
    { name: "Node.js", icon: "🟢" },
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
    { name: "C#", icon: "🔷" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Oracle", icon: "🔴" },
  ];

  // Tools
  const toolsTech = [
    { name: "Git", icon: "📦" },
    { name: "Docker", icon: "🐳" },
    { name: "Figma", icon: "🎨" },
    { name: "Vercel", icon: "▲" },
    { name: "Postman", icon: "📮" },
  ];

  const duplicatedFrontend = [...frontendTech, ...frontendTech, ...frontendTech];
  const duplicatedBackend = [...backendTech, ...backendTech, ...backendTech];
  const duplicatedTools = [...toolsTech, ...toolsTech, ...toolsTech];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid - Two Columns with Aligned Heights */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-8 flex flex-col">
            {/* Collaboration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-2xl p-8 flex-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.about.collaboration}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.about.collaborationTitle}
              </h3>
              <div className="flex items-center justify-center mt-8">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl">
                  👨‍💻
                </div>
              </div>
            </motion.div>

            {/* Timezone Flexibility Card with Globe - ONLY BRAZIL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-2xl p-8 flex-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.about.timezone}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.about.timezoneTitle}
              </h3>
              
              {/* Only Brazil badge */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2 bg-green-500/20 border-green-500/30">
                  <span className="text-xl">🇧🇷</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Brasil</span>
                </div>
              </div>

              {/* Globe Component - Adjusted height */}
              <div className="relative" style={{ height: '400px' }}>
                <Earth3D />
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 flex flex-col">
            {/* Passionate About Tech Card with 3 Infinite Marquees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-2xl p-8 overflow-hidden flex-1"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t.about.passionate}
              </h3>
              
              {/* Three Distinct Carousels */}
              <div className="space-y-6">
                {/* Front-end Carousel */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">
                    {t.techArsenal.frontend}
                  </h4>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white/90 dark:from-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white/90 dark:from-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
                    <div className="flex overflow-hidden group">
                      <motion.div
                        className="flex gap-3 pr-3"
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
                            className="glass rounded-full px-3 py-2 flex items-center gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                          >
                            <span className="text-base">{tech.icon}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Back-end & Database Carousel */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">
                    {t.techArsenal.backend}
                  </h4>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white/90 dark:from-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white/90 dark:from-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
                    <div className="flex overflow-hidden group">
                      <motion.div
                        className="flex gap-3 pr-3"
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
                            className="glass rounded-full px-3 py-2 flex items-center gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                          >
                            <span className="text-base">{tech.icon}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Tools Carousel */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">
                    {t.techArsenal.tools}
                  </h4>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white/90 dark:from-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white/90 dark:from-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
                    <div className="flex overflow-hidden group">
                      <motion.div
                        className="flex gap-3 pr-3"
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
                            className="glass rounded-full px-3 py-2 flex items-center gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                          >
                            <span className="text-base">{tech.icon}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Proof Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4"
            >
              {/* GitHub Card */}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-bubble rounded-xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t.about.github}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.about.githubDesc}</p>
                  </div>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-bubble rounded-xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{t.about.linkedin}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.about.linkedinDesc}</p>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Let's Work Together Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-2xl p-8 text-center"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t.about.workTogether}
              </h3>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                rossi17006@gmail.com
              </a>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-bubble rounded-xl p-6 text-center">
                <div className="text-4xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  5+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t.about.yearsExp}
                </div>
              </div>
              <div className="glass-bubble rounded-xl p-6 text-center">
                <div className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
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