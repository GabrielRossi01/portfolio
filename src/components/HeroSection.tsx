"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';

export default function OrangePlanetHero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const planetY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "90%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="w-full min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: theme === 'dark'
          ? '#000000'
          : 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          y: planetY,
          scale: planetScale,
          bottom: '-137%',
          width: '1400px',
          height: '1400px',
          maxWidth: 'none',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full relative"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle at 50% 35%, #ffd89b 0%, #ff9a56 15%, #ff7043 30%, #ff6536 45%, #ff4520 60%, #e63900 75%, #cc3300 88%, #8a1f00 100%)'
              : 'radial-gradient(circle at 50% 35%, #ffe4cc 0%, #ffb380 15%, #ff9566 30%, #ff7f4d 45%, #ff6b35 60%, #ff5722 75%, #e64a19 88%, #cc3d15 100%)',
            boxShadow: theme === 'dark'
              ? '0 0 120px rgba(255, 107, 53, 0.4), 0 0 200px rgba(255, 69, 0, 0.25), inset 0 -50px 100px rgba(0, 0, 0, 0.3)'
              : '0 0 100px rgba(255, 107, 53, 0.25), 0 0 160px rgba(255, 69, 0, 0.15), inset 0 -50px 100px rgba(0, 0, 0, 0.15)',
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at 50% 30%, rgba(255, 220, 150, 0.3) 0%, transparent 60%)'
                : 'radial-gradient(circle at 50% 30%, rgba(255, 240, 200, 0.4) 0%, transparent 60%)',
              filter: 'blur(30px)',
            }}
          />

          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at 50% 50%, transparent 75%, rgba(255, 100, 30, 0.15) 85%, transparent 100%)'
                : 'radial-gradient(circle at 50% 50%, transparent 75%, rgba(255, 100, 30, 0.1) 85%, transparent 100%)',
              filter: 'blur(8px)',
            }}
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse at 50% 100%, rgba(255, 107, 53, 0.12) 0%, rgba(255, 69, 0, 0.06) 40%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 100%, rgba(255, 107, 53, 0.06) 0%, rgba(255, 69, 0, 0.03) 40%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="relative z-10 flex items-center justify-center px-4 sm:px-6 w-full"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="text-center max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 font-light tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 sm:mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                type: "spring",
                stiffness: 80
              }}
            >
              <span
                style={{
                  color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
                  textShadow: theme === 'dark'
                    ? '0 4px 28px rgba(0, 0, 0, 0.7), 0 0 60px rgba(255, 107, 53, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                {t.hero.name.split(' ').slice(0, -1).join(' ')}{' '}
              </span>
              <span className="gradient-orange-accent">
                {t.hero.name.split(' ').pop()}
              </span>
            </motion.h1>

            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-5 sm:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              {t.hero.title}
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base md:text-base lg:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {t.hero.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <motion.a
              href="#contact"
              className="group relative w-full sm:w-auto overflow-hidden rounded-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="relative px-4 xs:px-4.5 sm:px-5 md:px-6 
                 py-2 xs:py-2 sm:py-2.5 md:py-3 
                 rounded-full flex items-center justify-center gap-2 
                 font-medium text-xs xs:text-sm sm:text-base 
                 transition-all duration-200 
                 group-hover:translate-y-0.5 
                 group-active:translate-y-1"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))'
                      : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border:
                    theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow:
                    theme === 'dark'
                      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)'
                      : 'inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 1px 3px rgba(0, 0, 0, 0.12)',
                  color:
                    theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(30, 30, 30, 0.9)',
                }}
              >
                <Mail className="w-4 h-4" />
                <span>{t.hero.ctaContact}</span>
              </div>
            </motion.a>

            <motion.a
              href="/cv.pdf"
              download
              className="group relative w-full sm:w-auto overflow-hidden rounded-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="relative px-4 xs:px-4.5 sm:px-5 md:px-6 
                 py-2 xs:py-2 sm:py-2.5 md:py-3 
                 rounded-full flex items-center justify-center gap-2 
                 font-medium text-xs xs:text-sm sm:text-base 
                 transition-all duration-200 
                 group-hover:translate-y-0.5 
                 group-active:translate-y-1"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))'
                      : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border:
                    theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow:
                    theme === 'dark'
                      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)'
                      : 'inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 1px 3px rgba(0, 0, 0, 0.12)',
                  color:
                    theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(30, 30, 30, 0.9)',
                }}
              >
                <Download className="w-4 h-4" />
                <span>{t.hero.ctaCV}</span>
              </div>
            </motion.a>
          </motion.div>

        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              background: theme === 'dark'
                ? `rgba(255, ${120 + Math.random() * 60}, 30, ${0.25 + Math.random() * 0.35})`
                : `rgba(255, ${120 + Math.random() * 60}, 30, ${0.15 + Math.random() * 0.2})`,
              left: `${15 + i * 18}%`,
              top: `${20 + i * 12}%`,
              filter: 'blur(1px)',
              boxShadow: theme === 'dark'
                ? '0 0 10px rgba(255, 140, 0, 0.5)'
                : '0 0 8px rgba(255, 140, 0, 0.35)',
            }}
            animate={{
              y: [0, -130, 0],
              opacity: [0, 0.9, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 6 + i * 1,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
