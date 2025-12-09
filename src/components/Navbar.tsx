"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
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
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            >
                <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeSection === link.href.replace('#', '')
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-transparent'
                                }`}
                        >
                            {activeSection === link.href.replace('#', '') && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{link.name}</span>
                        </a>
                    ))}
                </div>
            </motion.nav>

            {/* Mobile Navbar */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm"
            >
                <div className="glass-strong rounded-full px-6 py-3 flex items-center justify-between">
                    <span className="text-lg font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Portfolio
                    </span>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-full hover:bg-transparent transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
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
                            className="absolute right-0 top-0 h-full w-[80%] max-w-sm glass-strong border-l border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full p-8">
                                <div className="flex items-center justify-between mb-12">
                                    <span className="text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        Menu
                                    </span>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-full hover:bg-transparent transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-4 flex-1">
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            onClick={handleLinkClick}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`text-lg font-medium py-3 px-4 rounded-xl transition-all ${activeSection === link.href.replace('#', '')
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-gray-400 hover:text-white hover:bg-transparent'
                                                }`}
                                        >
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                {/* Theme and Language Controls in Mobile Menu */}
                                <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-4"
                                    >
                                        {/* Theme Switcher */}
                                        <button
                                            onClick={toggleTheme}
                                            className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/10 transition-all group"
                                        >
                                            <span className="text-sm font-medium text-gray-300">Theme</span>
                                            <div className="flex items-center gap-2">
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
                                            </div>
                                        </button>

                                        {/* Language Switcher */}
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                                                className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/10 transition-all"
                                            >
                                                <span className="text-sm font-medium text-gray-300">Language</span>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-5 h-5 text-cyan-400" />
                                                    <span className="text-xs font-bold text-white">{language}</span>
                                                </div>
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
                                                        <div className="ml-4 space-y-2">
                                                            {languages.map((lang) => (
                                                                <button
                                                                    key={lang.code}
                                                                    onClick={() => {
                                                                        setLanguage(lang.code);
                                                                        setLanguageDropdownOpen(false);
                                                                    }}
                                                                    className={`w-full text-left py-2 px-4 rounded-lg transition-all ${language === lang.code
                                                                            ? 'bg-white/10 text-white font-bold'
                                                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                                        }`}
                                                                >
                                                                    {lang.label}
                                                                </button>
                                                            ))}
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