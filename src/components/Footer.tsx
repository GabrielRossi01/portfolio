"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/smooth-scroll";

const linkClasses =
  "group inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-gray-800 transition-colors hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:text-base dark:text-gray-200 dark:hover:text-orange-400";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.about, href: "#about" },
  ];

  const contactLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/gabriel-oliveira-rossi/",
      external: true,
    },
    {
      name: "GitHub",
      href: "https://github.com/GabrielRossi01",
      external: true,
    },
    {
      name: t.contactInfo.emailLabel,
      href: "mailto:rossi17006@gmail.com",
      external: false,
    },
  ];

  const scrollToTop = () => {
    const home = document.getElementById("home");
    if (home) scrollToElement(home, 0);
  };

  return (
    <footer className="relative mt-auto w-full border-t border-black/10 bg-gray-50 text-gray-800 dark:border-white/10 dark:bg-[#111111] dark:text-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid max-w-md grid-cols-2 gap-8 sm:gap-16"
        >
          <div>
            <h2
              id="footer-main-heading"
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-600 sm:mb-4 sm:text-[11px] dark:text-gray-400"
            >
              {t.footer.mainLabel}
            </h2>

            <nav
              aria-labelledby="footer-main-heading"
              className="flex flex-col gap-1"
            >
              {quickLinks.map((link) => (
                <a key={link.href} href={link.href} className={linkClasses}>
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2
              id="footer-contact-heading"
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-600 sm:mb-4 sm:text-[11px] dark:text-gray-400"
            >
              {t.footer.contactLabel}
            </h2>

            <nav
              aria-labelledby="footer-contact-heading"
              className="flex flex-col gap-1"
            >
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={linkClasses}
                >
                  {link.name}

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </nav>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-7 sm:mt-16 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-sm font-medium leading-relaxed text-gray-900 sm:text-base dark:text-gray-100">
              &copy; {year} Gabriel Rossi. {t.footer.rights}
            </p>

            <p className="mt-1.5 text-xs font-medium leading-relaxed text-gray-600 sm:text-sm dark:text-gray-400">
              {t.footer.signature}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 text-xs font-medium text-gray-700 transition-colors hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:text-sm dark:text-gray-300 dark:hover:text-orange-400"
          >
            {t.footer.backToTop}

            <ArrowUp
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-1"
            />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
