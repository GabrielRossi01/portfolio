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
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Real-Time Analytics Engine',
    description: 'Stream processing system built with Go for analyzing millions of events per second with Kafka and TimescaleDB.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Go', 'Kafka', 'TimescaleDB', 'Kubernetes'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Authentication Service',
    description: 'OAuth 2.0 and JWT-based authentication microservice with rate limiting and multi-factor authentication.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    tags: ['Python', 'FastAPI', 'MongoDB', 'Redis'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Content Delivery Network',
    description: 'Distributed CDN system with edge caching, image optimization, and automatic scaling on AWS infrastructure.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    tags: ['AWS', 'CloudFront', 'Lambda', 'S3'],
    github: '#',
    demo: '#',
  },
  {
    title: 'GraphQL Gateway',
    description: 'Unified GraphQL API gateway aggregating multiple REST APIs with intelligent caching and field-level security.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    tags: ['Node.js', 'GraphQL', 'Apollo', 'Docker'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Payment Processing System',
    description: 'Secure payment gateway integration with fraud detection, automatic retries, and comprehensive webhook management.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
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
    <section id="projects" className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Showcase of my best work and technical achievements
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-20 glass-strong p-4 rounded-full hover:bg-white/20 transition-all group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-20 glass-strong p-4 rounded-full hover:bg-white/20 transition-all group"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Project Card Slider */}
          <div className="relative h-[600px] flex items-center justify-center">
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
                <div className="glass rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-2xl">
                  {/* Project Image */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Action Buttons on Image */}
                    <div className="absolute bottom-6 right-6 flex gap-3">
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-bubble p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-bubble p-3 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      {currentProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                      {currentProject.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-3">
                      {currentProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 text-sm font-medium rounded-full bg-linear-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-gray-900 dark:text-gray-200"
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

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? 'w-12 h-3 bg-linear-to-r from-purple-600 to-blue-600'
                    : 'w-3 h-3 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
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