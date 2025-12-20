"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative w-full mt-auto overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Image
          src="/footer.jpeg"
          alt="Orange background image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 mb-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 mb-4 hover:scale-105 transition"
              aria-label="Scroll to top"
            >
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition">
                <ArrowUp className="w-5 h-5 text-white" />
              </div>
              <div className="relative w-11 h-11">
                <Image
                  src="/GR.svg"
                  alt="Gabriel Rossi Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </button>

            <p className="text-white/85 text-sm max-w-xs font-light">
              {t.about.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">
              {t.footer.quickLinks}
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/80 hover:text-white transition text-sm font-light"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center lg:items-start"
          >
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">
              {t.footer.socialLinks}
            </h3>
            <div className="flex gap-3">
              {[
                {
                  href: "https://github.com/GabrielRossi01",
                  icon: <Github />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/gabriel-rossi-155baa324/",
                  icon: <Linkedin />,
                  label: "LinkedIn",
                },
                {
                  href: "mailto:rossi17006@gmail.com",
                  icon: <Mail />,
                  label: "Email",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition"
                >
                  <span className="w-5 h-5 text-white block">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-6 border-t border-white/20 text-center"
        >
          <p className="text-white/75 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Portfolio. {t.footer.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
