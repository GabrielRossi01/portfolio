"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useMobile } from '@/hooks/use-mobile';
import { useRef } from 'react';

export default function OrangePlanetHero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile(768);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const planetY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.5, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

  const planetBottom = isMobile
    ? 'clamp(-180%, -150%, -100%)'
    : '-300%';

  const planetSize = isMobile
    ? 'clamp(1400px, 180vw, 2300px)'
    : 'clamp(2000px, 200vw, 3000px)';

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
          bottom: planetBottom,
          width: planetSize,
          height: planetSize,
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

      <motion.div
        className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="text-center max-w-3xl w-full mx-auto">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-2 mb-4 sm:mb-6 md:mb-8"
          >
            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-liquid text-xs sm:text-sm font-light overflow-hidden">

              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.15) 50%, transparent 100%)',
                }}
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5,
                }}
              />

              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse relative z-10"></span>
              <span className="relative z-10">{t.hero.badge}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-tight md:leading-tight px-2 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                type: "spring",
                stiffness: 80
              }}
            >

              <span
                className="font-light inline"
                style={{
                  color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
                  textShadow: theme === 'dark'
                    ? '0 4px 28px rgba(0, 0, 0, 0.7), 0 0 60px rgba(255, 107, 53, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                {t.hero.headlineStart}{' '}
              </span>

              <span
                className="gradient-orange-accent inline"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                }}
              >
                {t.hero.headlineEnd}
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-7 md:mb-8 text-center px-2 max-w-2xl md:whitespace-nowrap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.9)',
              }}
            >
              {t.hero.greeting} {t.hero.name}{t.hero.connector} {t.hero.title}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2"
          >
            <motion.a
              href="#contact"
              className="group relative w-full sm:w-auto overflow-hidden rounded-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="relative px-6 py-3 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-full flex items-center justify-center gap-2 font-medium text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
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
                  minHeight: '44px',
                }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="relative px-6 py-3 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-full flex items-center justify-center gap-2 font-medium text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
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
                  minHeight: '44px',
                }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
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
