"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';

export default function ThemeLanguageControls() {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'pt-BR', label: 'PT-BR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <>
      {/* Desktop: Fixed top-right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-6 right-6 z-50 hidden md:block"
      >
        {/* Liquid Glass Container */}
        <div className="relative">
          {/* Glossy effect with multiple layers */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 via-white/5 to-transparent blur-xl" />
          <div className="absolute inset-0 rounded-2xl bg-linear-to-tl from-blue-500/10 via-purple-500/5 to-transparent" />
          
          {/* Main container with liquid glass effect */}
          <div className="relative glass-strong rounded-2xl p-3 flex items-center gap-2 border border-white/20 shadow-2xl backdrop-blur-3xl">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5" />
            
            <div className="relative flex items-center gap-2">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="relative p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group overflow-hidden z-50"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="relative z-10"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-400 drop-shadow-lg" />
                  )}
                </motion.div>
              </button>

              <div className="h-8 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />

              {/* Language Switcher */}
              <div className="relative z-50">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="relative p-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group overflow-hidden"
                  aria-label="Change language"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Globe className="w-5 h-5 text-cyan-400 drop-shadow-lg relative z-10" />
                  <span className="text-xs font-bold text-white relative z-10">{language}</span>
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {languageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-3 right-0 min-w-[120px] overflow-visible z-50"
                    >
                      {/* Liquid glass dropdown */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/10 via-white/5 to-transparent blur-xl" />
                        <div className="relative glass-strong rounded-xl border border-white/20 shadow-2xl backdrop-blur-3xl overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5" />
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code);
                                setLanguageDropdownOpen(false);
                              }}
                              className={`relative w-full px-4 py-3 text-sm text-left hover:bg-white/10 transition-all group ${
                                language === lang.code ? 'text-white font-bold' : 'text-gray-300'
                              }`}
                            >
                              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="relative z-10">{lang.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}