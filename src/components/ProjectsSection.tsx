"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

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
    <section id="projects" className="py-8 xs:py-12 sm:py-20 md:py-24 px-2 xs:px-3 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-10 sm:mb-16"
        >
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {t.projects.title}
          </h2>
          <p className="text-xs xs:text-xs sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={prevProject}
            className="group absolute -left-0.5 xs:left-0 sm:-left-6 lg:-left-20 top-1/2 -translate-y-1/2 z-30"
            aria-label="Previous project"
          >
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-linear(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))',
                  transform: 'translateY(4px)',
                  borderRadius: '9999px',
                }}
              />
              <div 
                className="relative p-1.5 xs:p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                style={{
                  background: 'linear-linear(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-white" />
              </div>
            </div>
          </button>

          <button
            onClick={nextProject}
            className="group absolute -right-0.5 xs:right-0 sm:-right-6 lg:-right-20 top-1/2 -translate-y-1/2 z-30"
            aria-label="Next project"
          >
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-linear(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))',
                  transform: 'translateY(4px)',
                  borderRadius: '9999px',
                }}
              />
              <div 
                className="relative p-1.5 xs:p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                style={{
                  background: 'linear-linear(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                <ChevronRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-white" />
              </div>
            </div>
          </button>

          <div className="relative h-60 xs:h-[280px] sm:h-[420px] md:h-[520px] lg:h-[600px] flex items-center justify-center px-1 xs:px-2 sm:px-4">
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
                className="absolute w-full px-2 xs:px-3 sm:px-6 lg:px-8"
              >
                <div className="glass rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden max-w-3xl xs:max-w-4xl mx-auto shadow-lg xs:shadow-xl sm:shadow-2xl">
                  <div className="relative h-24 xs:h-32 sm:h-56 md:h-72 lg:h-80 overflow-hidden">
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                    
                    <div className="absolute bottom-1 xs:bottom-2 sm:bottom-4 lg:bottom-6 right-1 xs:right-2 sm:right-4 lg:right-6 flex gap-1 xs:gap-1.5 sm:gap-3">
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-bubble p-1 xs:p-1.5 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <Github className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                      </a>
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-bubble p-1 xs:p-1.5 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <ExternalLink className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                      </a>
                    </div>
                  </div>

                  <div className="p-2.5 xs:p-3.5 sm:p-5 md:p-6 lg:p-8">
                    <h3 className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 xs:mb-1.5 sm:mb-3 lg:mb-4 text-gray-900 dark:text-white">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs xs:text-xs sm:text-base md:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-2.5 xs:mb-3.5 sm:mb-5 lg:mb-6 leading-relaxed">
                      {currentProject.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2.5 lg:gap-3">
                      {currentProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 xs:px-2.5 sm:px-3.5 lg:px-4 py-0.5 xs:py-1 sm:py-1.5 lg:py-2 text-xs text-white font-medium rounded-full"
                          style={{
                            background: 'linear-linear(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-1 xs:gap-1.5 sm:gap-2.5 mt-3 xs:mt-4 sm:mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-6 xs:w-8 sm:w-10 lg:w-12 h-1.5 xs:h-2 sm:h-2.5 lg:h-3 bg-linear-to-r from-gray-50 to-gray-600'
                    : 'w-1.5 xs:w-2 sm:w-2.5 lg:w-3 h-1.5 xs:h-2 sm:h-2.5 lg:h-3 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
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