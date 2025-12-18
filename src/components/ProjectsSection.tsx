"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const techIcons: Record<string, string> = {
  'Node.js': '/nodejs-original-wordmark.svg',
  'PostgreSQL': '/postgresql-original.svg',
  'Redis': '/redis-original.svg',
  'Docker': '/docker-original-wordmark.svg',
  'Go': '/go-original.svg',
  'Kafka': '/kafka-original.svg',
  'TimescaleDB': '/timescaledb-original.svg',
  'Kubernetes': '/kubernetes-original.svg',
  'Python': '/python-original.svg',
  'FastAPI': '/fastapi-original.svg',
  'MongoDB': '/mongodb-original.svg',
  'AWS': '/aws-original.svg',
  'CloudFront': '/aws-original.svg',
  'Lambda': '/aws-original.svg',
  'S3': '/aws-original.svg',
  'GraphQL': '/graphql-original.svg',
  'Apollo': '/apollo-original.svg',
  'Stripe': '/stripe-original.svg',
  'RabbitMQ': '/rabbitmq-original.svg',
};

export default function ProjectsSection() {
  const { t } = useLanguage();

  const projects = t.projects.items || [];

  return (
    <section id="projects" className="py-8 xs:py-12 sm:py-20 md:py-24 px-3 xs:px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-light mb-2 xs:mb-3 sm:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {t.projects.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-orange-accent">{t.projects.title.split(' ').pop()}</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-extralight text-gray-900 dark:text-gray-300">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="space-y-6 xs:space-y-8 sm:space-y-10 lg:space-y-12">
          {projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-liquid rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] xs:min-h-[450px] sm:min-h-[500px]">
                  {/* Conteúdo do card - Esquerda */}
                  <div className="p-6 xs:p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 xs:mb-3">
                        {project.company} • {project.year}
                      </p>
                      <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-light mb-3 xs:mb-4 sm:mb-5 text-gray-900 dark:text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs xs:text-sm sm:text-base text-gray-900 dark:text-gray-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6">
                        {project.description}
                      </p>

                      {/* Métricas */}
                      <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 mb-6 xs:mb-8">
                        {project.metrics.map((metric: string, metricIndex: number) => (
                          <div key={metricIndex} className="flex items-start gap-2 xs:gap-2.5">
                            <div className="mt-1">
                              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-[11px] xs:text-xs sm:text-sm lg:text-base text-gray-900 dark:text-gray-300">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-4 xs:mb-5 sm:mb-6">
                        {project.tags.slice(0, 4).map((tag: string, tagIndex: number) => (
                          <div
                            key={tagIndex}
                            className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 flex items-center gap-1 xs:gap-1.5 hover:bg-white/10 transition-colors"
                          >
                            {techIcons[tag] && (
                              <div className="relative w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4">
                                <Image
                                  src={techIcons[tag]}
                                  alt={`${tag} logo`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <span className="text-[10px] xs:text-xs sm:text-sm font-extralight text-gray-900 dark:text-gray-300 whitespace-nowrap">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Botão CTA */}
                      <div className="flex gap-3 xs:gap-4">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-liquid px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all group"
                        >
                          <span className="text-xs xs:text-sm sm:text-base font-light text-gray-900 dark:text-white">{t.projects.viewCaseStudy}</span>
                          <ExternalLink className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-liquid p-2 xs:p-2.5 sm:p-3 rounded-xl hover:bg-white/20 transition-all hover:scale-110"
                        >
                          <Github className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Mockup - Direita (cortado na parte inferior com hover) */}
                  <div className="relative hidden lg:flex items-end justify-center overflow-hidden pb-0 group/mockup cursor-pointer">
                    <div className={`relative ${project.mockupType === 'phone'
                      ? 'w-[280px] h-[560px] xl:w-[320px] xl:h-[640px]'
                      : 'w-[400px] h-[300px] xl:w-[480px] xl:h-[360px]'
                      } ${project.mockupType === 'phone'
                        ? 'translate-y-[50%] group-hover/mockup:translate-y-0'
                        : 'translate-y-[30%] group-hover/mockup:translate-y-0'
                      } transition-transform duration-500 ease-out`}>
                      <Image
                        src={project.mockup}
                        alt={`${project.title} mockup`}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Mockup Mobile com hover */}
                  <div className="lg:hidden relative overflow-hidden h-[200px] xs:h-[240px] sm:h-[280px] flex items-end justify-center group/mockup-mobile cursor-pointer">
                    <div className={`relative ${project.mockupType === 'phone'
                      ? 'w-40 h-80 xs:w-[200px] xs:h-[400px]'
                      : 'w-full max-w-[280px] h-[200px] xs:h-[240px]'
                      } ${project.mockupType === 'phone'
                        ? 'translate-y-[50%] group-hover/mockup-mobile:translate-y-0'
                        : 'translate-y-[30%] group-hover/mockup-mobile:translate-y-0'
                      } transition-transform duration-500 ease-out`}>
                      <Image
                        src={project.mockup}
                        alt={`${project.title} mockup`}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
