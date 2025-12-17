"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

// Mapeamento de tecnologias para ícones
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

const projects = [
  {
    title: 'E-Commerce API Platform',
    description: 'High-performance microservices architecture handling 100k+ daily transactions with Redis caching and PostgreSQL.',
    image: '/project-image.png',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Real-Time Analytics Engine',
    description: 'Stream processing system built with Go for analyzing millions of events per second with Kafka and TimescaleDB.',
    image: '/project-image.png',
    tags: ['Go', 'Kafka', 'TimescaleDB', 'Kubernetes'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Authentication Service',
    description: 'OAuth 2.0 and JWT-based authentication microservice with rate limiting and multi-factor authentication.',
    image: '/project-image.png',
    tags: ['Python', 'FastAPI', 'MongoDB', 'Redis'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Content Delivery Network',
    description: 'Distributed CDN system with edge caching, image optimization, and automatic scaling on AWS infrastructure.',
    image: '/project-image.png',
    tags: ['AWS', 'CloudFront', 'Lambda', 'S3'],
    github: '#',
    demo: '#',
  },
  {
    title: 'GraphQL Gateway',
    description: 'Unified GraphQL API gateway aggregating multiple REST APIs with intelligent caching and field-level security.',
    image: '/project-image.png',
    tags: ['Node.js', 'GraphQL', 'Apollo', 'Docker'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Payment Processing System',
    description: 'Secure payment gateway integration with fraud detection, automatic retries, and comprehensive webhook management.',
    image: '/project-image.png',
    tags: ['Python', 'PostgreSQL', 'Stripe', 'RabbitMQ'],
    github: '#',
    demo: '#',
  },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="projects" className="py-8 xs:py-12 sm:py-20 md:py-24 px-3 xs:px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-light mb-2 xs:mb-3 sm:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {t.projects.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-orange-accent">{t.projects.title.split(' ').pop()}</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-extralight">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Botão Anterior */}
          <button
            onClick={prevProject}
            className="group absolute left-1 xs:left-2 sm:-left-4 lg:-left-20 top-1/2 -translate-y-1/2 z-30"
            aria-label="Previous project"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))',
                  transform: 'translateY(3px)',
                  borderRadius: '9999px',
                }}
              />
              <div
                className="relative p-1.5 xs:p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-700 dark:text-white" />
              </div>
            </div>
          </button>

          {/* Botão Próximo */}
          <button
            onClick={nextProject}
            className="group absolute right-1 xs:right-2 sm:-right-4 lg:-right-20 top-1/2 -translate-y-1/2 z-30"
            aria-label="Next project"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))',
                  transform: 'translateY(3px)',
                  borderRadius: '9999px',
                }}
              />
              <div
                className="relative p-1.5 xs:p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-700 dark:text-white" />
              </div>
            </div>
          </button>

          {/* Carrossel de Projetos */}
          <div className="relative h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] flex items-center justify-center px-8 xs:px-10 sm:px-12 md:px-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full"
              >
                <div className="glass-liquid rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden max-w-3xl xs:max-w-4xl mx-auto shadow-xl sm:shadow-2xl">
                  {/* Imagem do Projeto */}
                  <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Botões de Ação */}
                    <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 lg:bottom-6 right-2 xs:right-3 sm:right-4 lg:right-6 flex gap-1.5 xs:gap-2 sm:gap-3">
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-liquid p-1.5 xs:p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <Github className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </a>
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-liquid p-1.5 xs:p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <ExternalLink className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Conteúdo do Projeto */}
                  <div className="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8">
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-2 xs:mb-2.5 sm:mb-3 lg:mb-4 text-gray-900 dark:text-white">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-base md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-3 xs:mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
                      {currentProject.description}
                    </p>

                    {/* Tags de Tecnologia */}
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2.5 lg:gap-3">
                      {currentProject.tags.map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors"
                        >
                          {techIcons[tag] && (
                            <div className="relative w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center">
                              <Image
                                src={techIcons[tag]}
                                alt={`${tag} logo`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 14px, (max-width: 768px) 16px, 24px"
                              />
                            </div>
                          )}
                          <span className="text-[10px] xs:text-xs sm:text-sm font-extralight text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores do Carrossel */}
          <div className="flex justify-center gap-1.5 xs:gap-2 sm:gap-2.5 mt-4 xs:mt-5 sm:mt-6 md:mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? 'w-6 xs:w-8 sm:w-10 lg:w-12 h-1.5 xs:h-2 sm:h-2.5 lg:h-3 bg-linear-to-r from-orange-400 to-orange-600'
                    : 'w-1.5 xs:w-2 sm:w-2.5 lg:w-3 h-1.5 xs:h-2 sm:h-2.5 lg:h-3 bg-gray-400 dark:bg-gray-600 hover:bg-orange-300 dark:hover:bg-orange-500'
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
