"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TechStackMarquee() {
  const { t } = useLanguage();
  const technologies = [
    {
      icon: '/java-original-wordmark.svg'
    },
    {
      icon: '/spring-original-wordmark.svg'
    },
    {
      icon: '/csharp-original.svg'
    },
    {
      icon: '/cplusplus-original.svg'
    },
    {
      icon: '/python-original.svg'
    },
    {
      icon: '/typescript-original.svg'
    },
    {
      icon: '/javascript-original.svg'
    },
    {
      icon: '/html5-original-wordmark.svg'
    },
    {
      icon: '/css3-original-wordmark.svg'
    },
    {
      icon: '/tailwindcss-original-wordmark.svg'
    },
    {
      icon: '/nodejs-original-wordmark.svg'
    },
    {
      icon: '/react-original.svg'
    },
    {
      icon: '/nextjs-original.svg'
    },
    {
      icon: '/docker-original-wordmark.svg'
    },
    {
      icon: '/mysql-original-wordmark.svg'
    },
    {
      icon: '/linux-original.svg'
    },
    {
      icon: '/jupyter-original-wordmark.svg'
    },
  ];

  const duplicatedTech = [...technologies, ...technologies, ...technologies];

  return (
    <section id="skills" className="py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2 xs:px-3 sm:px-4"
      >
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {t.techArsenal.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-orange-accent">{t.techArsenal.title.split(' ').pop()}</span>
        </h2>
        <p className="text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/70 dark:text-white/70 font-light">
          {t.techArsenal.subtitle}
        </p>
      </motion.div>

      <div className="relative glass-liquid rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8">
        {/* Gradient Blur Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-6 xs:w-8 sm:w-16 md:w-24 bg-linear-to-r from-white dark:from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-6 xs:w-8 sm:w-16 md:w-24 bg-linear-to-l from-white dark:from-[#0a0a0a] to-transparent z-10" />

        <motion.div
          className="flex gap-2 xs:gap-3 sm:gap-6 md:gap-8 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 px-2 xs:px-3 sm:px-4 lg:px-6 py-1.5 xs:py-2 sm:py-3 lg:py-4 rounded-lg xs:rounded-xl sm:rounded-xl lg:rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-xs min-w-fit hover:bg-white/10 dark:hover:bg-white/10 transition-colors group"
            >
              <div className="relative w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={tech.icon}
                  alt='logo'
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 24px, (max-width: 1024px) 32px, 40px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
