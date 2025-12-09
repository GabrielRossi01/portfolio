"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function LunarHorizonCSS() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="home" className="w-full h-screen relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        {/* Dark Mode: Deep technological glow */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Base dark gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a1a] via-[#050510] to-[#000000]" />
          
          {/* Blurred color orbs - Dark mode */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
              filter: 'blur(70px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Light Mode: Soft pastel glow */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Base light gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]" />
          
          {/* Blurred color orbs - Light mode */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147, 197, 253, 0.2) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(196, 181, 253, 0.15) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(165, 243, 252, 0.18) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-transparent pointer-events-none" />
      
      {/* Hero Content */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4 z-10">
        <div className="text-center max-w-4xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4">
              {t.hero.greeting}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
              {t.hero.name}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white mb-8 drop-shadow-lg">
              {t.hero.title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-full glass-strong hover:scale-105 transition-all duration-300 flex items-center gap-2 text-gray-900 dark:text-white font-medium shadow-2xl"
            >
              <Mail className="w-5 h-5" />
              {t.hero.ctaContact}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="/cv.pdf"
              download
              className="group relative px-8 py-4 rounded-full glass hover:scale-105 transition-all duration-300 flex items-center gap-2 text-gray-900 dark:text-white font-medium border border-gray-300 dark:border-white/20 shadow-2xl"
            >
              <Download className="w-5 h-5" />
              {t.hero.ctaCV}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}