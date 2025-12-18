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
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {t.techArsenal.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-orange-accent">{t.techArsenal.title.split(' ').pop()}</span>
        </h2>
        <p className="text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl font-extralight">
          {t.techArsenal.subtitle}
        </p>
      </motion.div>

      <div className="relative rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8">

        <div className="absolute left-0 top-0 bottom-0 w-6 xs:w-8 sm:w-16 md:w-24 bg-linear-to-r from-white dark:from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-6 xs:w-8 sm:w-16 md:w-24 bg-linear-to-l from-white dark:from-[#0a0a0a] to-transparent z-10" />

        <motion.div
          className="flex gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-max"
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
              className="group"
            >
              <div className="relative w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={tech.icon}
                  alt='logo'
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
