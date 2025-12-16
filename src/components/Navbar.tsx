"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'pt-BR', label: 'PT-BR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Logo - Canto Superior Esquerdo */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50 hidden md:block"
      >
        <a href="#home" className="block group">
          <div className="p-2.5 sm:p-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/GR.svg"
                alt="Gabriel Rossi Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </a>
      </motion.div>

      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="glass-liquid rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-full ${
                activeSection === link.href.replace('#', '')
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-transparent'
              }`}
            >
              {activeSection === link.href.replace('#', '') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Desktop Theme & Language Controls - Canto Superior Direito */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 hidden md:flex items-center gap-2"
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="glass-liquid rounded-full p-2.5 sm:p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </motion.div>
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="glass-liquid rounded-full p-2.5 sm:p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            aria-label="Change language"
          >
            <Globe className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          <AnimatePresence>
            {languageDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 glass-liquid rounded-xl overflow-hidden min-w-[100px]"
              >
                {languages.map((lang) => {
                  const flagMap: { [key in Language]: string } = {
                    'pt-BR': '🇧🇷',
                    'en': '🇺🇸',
                    'es': '🇪🇸',
                  };
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left py-2.5 px-4 text-sm transition-all flex items-center gap-2 ${
                        language === lang.code
                          ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white font-bold'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg">{flagMap[lang.code]}</span>
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-1.5 xs:top-2 sm:top-3 left-1.5 xs:left-2 sm:left-3 right-1.5 xs:right-2 sm:right-3 z-50 md:hidden"
      >
        <div className="glass-liquid rounded-md xs:rounded-lg sm:rounded-xl px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 flex items-center justify-between gap-2 xs:gap-2.5">
          <a href="#home" className="shrink-0">
            <div className="relative w-8 xs:w-9 sm:w-10 h-8 xs:h-9 sm:h-10">
              <Image
                src="/GR.svg"
                alt="Gabriel Rossi Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-0.5 xs:p-1 sm:p-1.5 rounded-sm xs:rounded-md sm:rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 text-gray-700 dark:text-white shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5" />
            ) : (
              <Menu className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-screen w-full xs:w-72 sm:w-80 glass-liquid border-l border-gray-200 dark:border-white/10 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col min-h-full p-3 xs:p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6">
                  <span className="text-sm xs:text-base sm:text-lg font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent truncate">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 xs:p-1.5 sm:p-2 rounded-md xs:rounded-lg sm:rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-gray-700 dark:text-white shrink-0"
                  >
                    <X className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-xs xs:text-sm sm:text-base font-medium py-1.5 xs:py-2 sm:py-2.5 px-2.5 xs:px-3 sm:px-4 rounded-md xs:rounded-lg sm:rounded-xl transition-all whitespace-nowrap ${
                        activeSection === link.href.replace('#', '')
                          ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Theme and Language Controls in Mobile Menu */}
                <div className="mt-auto space-y-1 xs:space-y-1.5 sm:space-y-2 border-t border-gray-200 dark:border-white/10 pt-3 xs:pt-4 sm:pt-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1 xs:space-y-1.5 sm:space-y-2"
                  >
                    {/* Theme Switcher */}
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-between py-1.5 xs:py-2 sm:py-2.5 px-2.5 xs:px-3 sm:px-4 rounded-md xs:rounded-lg sm:rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
                    >
                      <span className="text-xs xs:text-sm sm:text-sm font-medium text-gray-600 dark:text-gray-300">Theme</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <motion.div
                          initial={false}
                          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                          transition={{ duration: 0.5, type: 'spring' }}
                        >
                          {theme === 'dark' ? (
                            <Sun className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-yellow-400" />
                          ) : (
                            <Moon className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-blue-400" />
                          )}
                        </motion.div>
                      </div>
                    </button>

                    {/* Language Switcher */}
                    <div className="space-y-1 xs:space-y-1.5">
                      <button
                        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                        className="w-full flex items-center justify-between py-1.5 xs:py-2 sm:py-2.5 px-2.5 xs:px-3 sm:px-4 rounded-md xs:rounded-lg sm:rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                      >
                        <span className="text-xs xs:text-sm sm:text-sm font-medium text-gray-600 dark:text-gray-300">Language</span>
                        <Globe className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-white" />
                      </button>

                      {/* Language Options */}
                      <AnimatePresence>
                        {languageDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-1 xs:ml-2 space-y-0.5">
                              {languages.map((lang) => {
                                const flagMap: { [key in Language]: string } = {
                                  'pt-BR': '🇧🇷',
                                  'en': '🇺🇸',
                                  'es': '🇪🇸',
                                };
                                return (
                                  <button
                                    key={lang.code}
                                    onClick={() => {
                                      setLanguage(lang.code);
                                      setLanguageDropdownOpen(false);
                                    }}
                                    className={`w-full text-left py-1 xs:py-1.5 px-2.5 xs:px-3 rounded-sm xs:rounded-md transition-all text-xs flex items-center gap-1.5 ${
                                      language === lang.code
                                        ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white font-bold'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                                  >
                                    <span className="text-sm">{flagMap[lang.code]}</span>
                                    <span>{lang.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
