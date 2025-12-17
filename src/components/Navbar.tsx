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
                className={`object-contain transition-all duration-300 ${
                  theme === 'light' ? 'invert' : ''
                }`}
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
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="mx-3 xs:mx-4 sm:mx-5 mt-4 xs:mt-5 sm:mt-6 flex items-center justify-between">
          {/* Logo com fundo glass - AUMENTADA */}
          <a href="#home" className="shrink-0">
            <div className="rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 shadow-lg">
              <div className="relative w-10 xs:w-11 sm:w-12 h-10 xs:h-11 sm:h-12">
                <Image
                  src="/GR.svg"
                  alt="Gabriel Rossi Logo"
                  fill
                  className={`object-contain transition-all duration-300 ${
                    theme === 'light' ? 'invert' : ''
                  }`}
                  priority
                />
              </div>
            </div>
          </a>

          {/* Botão hamburguer com fundo glass circular - AUMENTADO */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="glass-liquid rounded-full p-3 xs:p-3.5 sm:p-4 shadow-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 text-gray-700 dark:text-white shrink-0"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, type: 'spring' }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 xs:w-6.5 sm:w-7 h-6 xs:h-6.5 sm:h-7" />
              ) : (
                <Menu className="w-6 xs:w-6.5 sm:w-7 h-6 xs:h-6.5 sm:h-7" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
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
            
            {/* Dropdown modernizado - AJUSTADO ALTURA */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-20 xs:top-24 sm:top-28 left-3 xs:left-4 sm:left-5 right-3 xs:right-4 sm:right-5 glass-liquid rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 xs:p-5 sm:p-6">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-1.5 xs:gap-2 mb-4 xs:mb-5">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`text-sm xs:text-base sm:text-lg font-medium py-3 xs:py-3.5 sm:py-4 px-4 xs:px-5 sm:px-6 rounded-xl sm:rounded-2xl transition-all ${
                        activeSection === link.href.replace('#', '')
                          ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent mb-4 xs:mb-5" />

                {/* Theme and Language Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 xs:gap-2.5 sm:gap-3"
                >
                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className="flex-1 glass-liquid rounded-xl sm:rounded-2xl py-3 xs:py-3.5 sm:py-4 px-3 xs:px-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                    >
                      {theme === 'dark' ? (
                        <Sun className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 text-yellow-400" />
                      ) : (
                        <Moon className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 text-blue-400" />
                      )}
                    </motion.div>
                    <span className="text-sm xs:text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
                      {theme === 'dark' ? 'Light' : 'Dark'}
                    </span>
                  </button>

                  {/* Language Buttons */}
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
                          setMobileMenuOpen(false);
                        }}
                        className={`glass-liquid rounded-xl sm:rounded-2xl py-3 xs:py-3.5 sm:py-4 px-3.5 xs:px-4 sm:px-4.5 transition-all hover:scale-105 ${
                          language === lang.code
                            ? 'bg-black/10 dark:bg-white/10 ring-2 ring-black/20 dark:ring-white/20'
                            : 'hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="text-xl xs:text-2xl sm:text-[26px]">{flagMap[lang.code]}</span>
                      </button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
