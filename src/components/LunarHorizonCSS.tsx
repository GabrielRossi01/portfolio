"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef } from 'react';

export default function LunarHorizonCSS() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="w-full min-h-screen sm:h-screen relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black" />
          
          <motion.div
            className="absolute inset-0"
            style={{ y: layer1Y }}
          >
            <div 
              className="absolute top-[15%] left-[10%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </motion.div>
          
          <motion.div
            className="absolute inset-0"
            style={{ y: layer2Y }}
          >
            <div
              className="absolute bottom-[25%] right-[15%] w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[35%]"
            style={{ y: layer3Y }}
          >
            <svg
              viewBox="0 0 1440 400"
              className="absolute bottom-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="mountainGrad1Dark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(20, 20, 20, 0.8)" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />
                </linearGradient>
                <linearGradient id="mountainGrad2Dark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(30, 30, 30, 0.6)" />
                  <stop offset="100%" stopColor="rgba(10, 10, 10, 0.9)" />
                </linearGradient>
              </defs>
              <path
                d="M0,400 L0,280 Q200,220 400,260 Q600,300 800,240 Q1000,180 1200,220 Q1350,250 1440,230 L1440,400 Z"
                fill="url(#mountainGrad2Dark)"
              />
              <path
                d="M0,400 L0,320 Q180,280 360,300 Q540,320 720,290 Q900,260 1080,280 Q1260,300 1440,270 L1440,400 Z"
                fill="url(#mountainGrad1Dark)"
              />
            </svg>
          </motion.div>
        </div>

        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-linear-to-b from-[#f8f9fa] via-[#ffffff] to-[#f0f0f0]" />
          
          <motion.div
            className="absolute inset-0"
            style={{ y: layer1Y }}
          >
            <div 
              className="absolute top-[15%] left-[5%] xs:left-[8%] sm:left-[10%] w-[100px] h-[100px] xs:w-[150px] xs:h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </motion.div>
          
          <motion.div
            className="absolute inset-0"
            style={{ y: layer2Y }}
          >
            <div
              className="absolute bottom-[25%] right-[10%] xs:right-[15%] sm:right-[20%] w-[100px] h-[100px] xs:w-[150px] xs:h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 0, 0, 0.02) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[30%]"
            style={{ y: layer3Y }}
          >
            <svg
              viewBox="0 0 1440 300"
              className="absolute bottom-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hillGrad1Light" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(230, 230, 230, 0.8)" />
                  <stop offset="100%" stopColor="rgba(245, 245, 245, 1)" />
                </linearGradient>
              </defs>
              <path
                d="M0,300 L0,200 Q360,150 720,180 Q1080,210 1440,170 L1440,300 Z"
                fill="url(#hillGrad1Light)"
              />
            </svg>
          </motion.div>
        </div>

        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center px-4 sm:px-6 z-10"
        style={{ opacity: opacityText }}
      >
        <div className="text-center max-w-4xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-3 sm:mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t.hero.greeting}
            </motion.p>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.7,
                type: "spring",
                stiffness: 100
              }}
            >
              {t.hero.name}
            </motion.h1>
            
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-200 mb-6 sm:mb-8 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {t.hero.title}
            </motion.h2>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {t.hero.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <a
              href="#contact"
              className="group relative w-full sm:w-auto"
            >
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))'
                      : 'linear-gradient(to bottom, rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.5))',
                    transform: 'translateY(6px)',
                    borderRadius: '9999px',
                  }}
                />
                <div 
                  className="relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2.5 font-medium text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))'
                      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 240, 0.9))',
                    backdropFilter: 'blur(20px)',
                    border: theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: theme === 'dark'
                      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)'
                      : 'inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(40, 40, 40, 0.9)',
                  }}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.hero.ctaContact}
                </div>
              </div>
            </a>
            
            <a
              href="/cv.pdf"
              download
              className="group relative w-full sm:w-auto"
            >
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))'
                      : 'linear-gradient(to bottom, rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.5))',
                    transform: 'translateY(6px)',
                    borderRadius: '9999px',
                  }}
                />
                <div 
                  className="relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2.5 font-medium text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))'
                      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 240, 0.9))',
                    backdropFilter: 'blur(20px)',
                    border: theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: theme === 'dark'
                      ? 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)'
                      : 'inset 0 1px 2px rgba(255, 255, 255, 1), inset 0 -1px 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(40, 40, 40, 0.9)',
                  }}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.hero.ctaCV}
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}