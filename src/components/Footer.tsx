"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import AnimatedLogo from './AnimatedLogo';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="relative w-full mt-auto overflow-hidden">
      {/* Mountain Background Image */}
      <div className="absolute inset-0 z-0">
        <Image  
          src="/footer.jpg"
          alt="Mountain background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-2 xs:px-3 sm:px-4 lg:px-6 py-6 xs:py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-4 xs:mb-6 sm:mb-8">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4 transition-all hover:scale-105"
              aria-label="Scroll to top"
            >
              <div className="p-1 xs:p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all">
                <ArrowUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <AnimatedLogo className="w-20 h-5 xs:w-24 xs:h-6 sm:w-28 sm:h-7 lg:w-36 lg:h-10" />
            </button>
            <p className="text-white/70 text-xs xs:text-xs sm:text-sm text-center md:text-left">
              {t.about.subtitle}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-semibold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4">Links Rápidos</h3>
            <nav className="flex flex-col gap-1 xs:gap-1.5 sm:gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors text-xs xs:text-xs sm:text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-white font-semibold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4">Redes Sociais</h3>
            <div className="flex gap-1.5 xs:gap-2 sm:gap-3">
              <a
                href="https://github.com/GabrielRossi01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-rossi-155baa324/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
              </a>
              <a
                href="mailto:rossi17006@gmail.com"
                className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4 xs:pt-5 sm:pt-8 border-t border-white/20 text-center"
        >
          <p className="text-white/60 text-xs xs:text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Portfolio. {t.footer.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}