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
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-6 right-6 z-50 hidden md:block"
      >
        <div className="relative">
          <div 
            className="relative rounded-xl p-1.5 flex items-center gap-1"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="relative flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group overflow-hidden z-50"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="relative z-10"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-yellow-400 drop-shadow-lg" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-400 drop-shadow-lg" />
                  )}
                </motion.div>
              </button>

              <div className="h-5 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />

              <div className="relative z-50">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center group overflow-hidden"
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4 text-white-400 drop-shadow-lg relative z-10" />
                </button>

                <AnimatePresence>
                  {languageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 min-w-[100px] overflow-visible z-50"
                    >
                      <div className="relative">
                        <div 
                          className="relative rounded-lg overflow-hidden"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code);
                                setLanguageDropdownOpen(false);
                              }}
                              className={`relative w-full px-3 py-2 text-xs text-left hover:bg-white/10 transition-all group ${
                                language === lang.code ? 'text-white font-medium' : 'text-gray-300'
                              }`}
                            >
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