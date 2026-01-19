"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useMobile } from '@/hooks/use-mobile';
import { useRef, useEffect, useState } from 'react';

export default function OrangePlanetHero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile(768);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMacOS, setIsMacOS] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setReduceMotion(e.matches));

    const handleResize = () => checkDesktop();
    window.addEventListener('resize', handleResize);

    const checkMacOS = () => {
      const platform = navigator.platform.toLowerCase();
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMacOS(
        platform.includes('mac') ||
        userAgent.includes('macintosh') ||
        userAgent.includes('mac os x')
      );
    };
    checkMacOS();

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', (e) => setReduceMotion(e.matches));
    };
  }, []);

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
    : isDesktop && isMacOS
      ? 'clamp(-350%, -310%, -270%)'
      : isDesktop
        ? 'clamp(-320%, -280%, -240%)'
        : '-300%';

  const planetSize = isMobile
    ? 'clamp(1400px, 180vw, 2300px)'
    : isDesktop
      ? 'clamp(2200px, 180vw, 2800px)'
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
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full relative"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle at 50% 35%, #ffcc66 0%, #ff8c1a 15%, #ff6600 25%, #ff5500 40%, #ff3300 55%, #e62e00 70%, #cc2200 85%, #991100 100%)'
              : 'radial-gradient(circle at 50% 35%, #ffd699 0%, #ff9933 15%, #ff7700 25%, #ff6600 40%, #ff5500 55%, #ff3300 70%, #e62e00 85%, #b82200 100%)',
            boxShadow: theme === 'dark'
              ? '0 0 150px rgba(255, 102, 0, 0.6), 0 0 250px rgba(255, 69, 0, 0.4), inset 0 -50px 120px rgba(0, 0, 0, 0.4)'
              : '0 0 120px rgba(255, 102, 0, 0.4), 0 0 200px rgba(255, 69, 0, 0.25), inset 0 -50px 100px rgba(0, 0, 0, 0.2)',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
          }}
          animate={isMobile ? {} : {
            scale: [1, 1.02, 1],
          }}
          transition={isMobile ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at 50% 30%, rgba(255, 180, 80, 0.4) 0%, transparent 60%)'
                : 'radial-gradient(circle at 50% 30%, rgba(255, 200, 120, 0.5) 0%, transparent 60%)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse at 50% 100%, rgba(255, 102, 0, 0.18) 0%, rgba(255, 69, 0, 0.1) 40%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 100%, rgba(255, 102, 0, 0.1) 0%, rgba(255, 69, 0, 0.05) 40%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 w-full"
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
            <div
              className="relative inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-liquid text-xs sm:text-sm font-light overflow-hidden"
              style={{
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                isolation: 'isolate',
              }}
            >

              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.15) 50%, transparent 100%)',
                }}
                animate={isMobile || reduceMotion ? {} : {
                  x: ['-200%', '200%'],
                }}
                transition={isMobile || reduceMotion ? {} : {
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
              className="mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-tight md:leading-tight px-2 text-center"
              style={{
                fontSize: isMobile
                  ? 'clamp(1.35rem, 5.5vw, 1.75rem)'
                  : 'clamp(1.75rem, 3vw, 3rem)',
              }}
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
                    ? '0 4px 28px rgba(0, 0, 0, 0.7), 0 0 60px rgba(255, 102, 0, 0.25)'
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
              className="font-light mb-6 sm:mb-7 md:mb-8 text-center px-2 max-w-2xl"
              style={{
                fontSize: isMobile
                  ? 'clamp(0.9rem, 3.5vw, 1.1rem)'
                  : 'clamp(1rem, 1.75vw, 1.35rem)',
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.9)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
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
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  isolation: 'isolate',
                }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.hero.ctaContact}</span>
              </div>
            </motion.a>

            <motion.a
              href="/en-curriculum.pdf"
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
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  isolation: 'isolate',
                }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.hero.ctaCV}</span>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {!isMobile && !reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 2}px`,
                height: `${2 + Math.random() * 2}px`,
                background: theme === 'dark'
                  ? `rgba(255, ${100 + Math.random() * 50}, 0, ${0.3 + Math.random() * 0.4})`
                  : `rgba(255, ${100 + Math.random() * 50}, 0, ${0.2 + Math.random() * 0.25})`,
                left: `${15 + i * 18}%`,
                top: `${20 + i * 12}%`,
                filter: 'blur(1px)',
                boxShadow: theme === 'dark'
                  ? '0 0 12px rgba(255, 102, 0, 0.6)'
                  : '0 0 10px rgba(255, 102, 0, 0.4)',
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
      )}
    </section>
  );
}
