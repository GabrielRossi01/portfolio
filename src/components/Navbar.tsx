"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon, Globe, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";
import { pauseSmoothScroll, scrollToTarget } from "@/lib/smoothScroll";

const SECTION_IDS = ["home", "about", "projects", "github-activity", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const navigatingRef = useRef(false);
  const navigationId = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contributions, href: "#github-activity" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const languages: {
    code: Language;
    label: string;
    flag: string;
    fullName: string;
  }[] = [
    { code: "en", label: "EN", flag: "US", fullName: "English" },
    { code: "pt-BR", label: "PT", flag: "BR", fullName: "Português" },
    { code: "es", label: "ES", flag: "ES", fullName: "Español" },
  ];

  useEffect(() => {
    // Seção ativa = a que cruza a linha a 100px do topo. Uma faixa de 1px no
    // IntersectionObserver evita ler o layout a cada evento de scroll.
    // Algumas seções são carregadas com dynamic(), então observamos de novo
    // quando o DOM muda.
    let io: IntersectionObserver | null = null;
    const observed = new Set<Element>();

    const observeSections = () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && io && !observed.has(el)) {
          io.observe(el);
          observed.add(el);
        }
      });
    };

    const createObserver = () => {
      io?.disconnect();
      observed.clear();
      const bottom = Math.max(0, window.innerHeight - 101);
      io = new IntersectionObserver(
        (entries) => {
          if (navigatingRef.current) return;
          const hit = entries.find((entry) => entry.isIntersecting);
          if (hit) setActiveSection(hit.target.id);
        },
        { rootMargin: `-100px 0px -${bottom}px 0px` },
      );
      observeSections();
    };

    createObserver();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createObserver, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // se o usuário assumir o scroll no meio do caminho, o observer volta a mandar
    const release = () => {
      navigatingRef.current = false;
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);

    const mo = new MutationObserver(() => {
      if (observed.size < SECTION_IDS.length) observeSections();
      else mo.disconnect();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    pauseSmoothScroll(mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Durante a rolagem disparada por um clique, o indicador vai direto para o
  // destino e o observer não o arrasta por cada seção do caminho (isso gerava
  // uma animação de layout por seção e travava a navegação).
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    const id = href.replace("#", "");
    const navId = ++navigationId.current;
    navigatingRef.current = true;
    setActiveSection(id);

    const finish = () => {
      if (navigationId.current !== navId) return;
      navigatingRef.current = false;
    };
    // rede de segurança caso a rolagem seja interrompida antes do fim
    setTimeout(finish, 1800);

    if (mobileMenuOpen) {
      // espera o menu liberar o scroll do body antes de rolar
      setMobileMenuOpen(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => scrollToTarget(href, finish)),
      );
    } else {
      scrollToTarget(href, finish);
    }
  };

  return (
    <>
      {/* Desktop: logo, menu e controles numa única linha, centralizados no eixo vertical */}
      <div className="pointer-events-none fixed inset-x-0 top-6 z-50 hidden h-15 items-center justify-between px-6 lg:flex">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto"
      >
        <a
          href="#home"
          onClick={(event) => handleLinkClick(event, "#home")}
          className="block group p-1"
          aria-label="Gabriel Rossi"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/GR.svg"
              alt="Gabriel Rossi Logo"
              fill
              sizes="40px"
              className={`object-contain transition-[filter] duration-300 ${theme === "light" ? "invert" : ""}`}
              preload
            />
          </div>
        </a>
      </motion.div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="glass-liquid rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleLinkClick(event, link.href)}
              aria-current={
                activeSection === link.href.replace("#", "") ? "true" : undefined
              }
              className={`relative whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-full ${
                activeSection === link.href.replace("#", "")
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-transparent"
              }`}
            >
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>
      </motion.nav>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto flex items-center gap-2"
      >
        <button
          onClick={toggleTheme}
          className="glass-liquid rounded-full p-3 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 0 : 180 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </motion.div>
        </button>

        <div className="relative">
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="glass-liquid rounded-full pl-3 pr-3.5 py-3 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            aria-label="Change language"
            aria-expanded={languageDropdownOpen}
          >
            <Globe
              className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            />

            <span
              className={`text-xs sm:text-sm font-semibold uppercase ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {languages.find((l) => l.code === language)?.label}
            </span>
            <motion.div
              animate={{ rotate: languageDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                className={`w-3.5 h-3.5 ${
                  theme === "dark" ? "text-white/70" : "text-gray-700"
                }`}
              />
            </motion.div>
          </button>

          <AnimatePresence>
            {languageDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="
                  absolute
                  top-full
                  right-0          
                  z-50
                  mt-2
                  min-w-[180px]
                  overflow-hidden
                  rounded-2xl
                  border
                border-black/10
                bg-white/95
                  shadow-xl
                  backdrop-blur-xl
                  dark:border-white/10
                  dark:bg-[#151515]/95
                "
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`w-full text-left py-3 px-4 text-sm transition-all flex items-center gap-3 cursor-pointer ${
                      language === lang.code
                        ? "bg-black/5 dark:bg-white/10"
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`w-6 text-[10px] font-bold tracking-wide ${
                        theme === "dark" ? "text-white/70" : "text-gray-600"
                      }`}
                    >
                      {lang.flag}
                    </span>

                    <span
                      className={`flex-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      } ${language === lang.code ? "font-semibold" : "font-normal"}`}
                    >
                      {lang.fullName}
                    </span>
                    {language === lang.code && (
                      <Check className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      </div>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
      >
        <div className="mx-3 xs:mx-4 sm:mx-5 mt-4 xs:mt-5 sm:mt-6 flex items-center justify-between">
          <a href="#home" className="shrink-0">
            <div className="rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 shadow-lg">
              <div className="relative w-10 xs:w-11 sm:w-12 h-10 xs:h-11 sm:h-12">
                <Image
                  src="/GR.svg"
                  alt="Gabriel Rossi Logo"
                  fill
                  className={`object-contain transition-all duration-300 ${
                    theme === "light" ? "invert" : ""
                  }`}
                  sizes="48px"
                  preload
                />
              </div>
            </div>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="glass-liquid rounded-full p-3 xs:p-3.5 sm:p-4 shadow-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 text-gray-700 dark:text-white shrink-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, type: "spring" }}
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-20 xs:top-24 sm:top-28 left-3 xs:left-4 sm:left-5 right-3 xs:right-4 sm:right-5 glass-liquid rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 xs:p-5 sm:p-6">
                <nav className="flex flex-col gap-1.5 xs:gap-2 mb-4 xs:mb-5">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`text-sm xs:text-base sm:text-lg font-medium py-3 xs:py-3.5 sm:py-4 px-4 xs:px-5 sm:px-6 rounded-xl sm:rounded-2xl transition-all ${
                        activeSection === link.href.replace("#", "")
                          ? "bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                <div className="h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent mb-4 xs:mb-5" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 xs:gap-2.5 sm:gap-3"
                >
                  <button
                    onClick={toggleTheme}
                    className="flex-1 glass-liquid rounded-xl sm:rounded-2xl py-3 xs:py-3.5 sm:py-4 px-3 xs:px-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotate: theme === "dark" ? 0 : 180 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 text-yellow-400" />
                      ) : (
                        <Moon className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 text-blue-400" />
                      )}
                    </motion.div>
                    <span className="text-sm xs:text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
                      {theme === "dark" ? t.theme.light : t.theme.dark}
                    </span>
                  </button>

                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`glass-liquid rounded-xl sm:rounded-2xl py-3 xs:py-3.5 sm:py-4 px-3.5 xs:px-4 sm:px-4.5 transition-all hover:scale-105 cursor-pointer flex flex-col items-center gap-1 ${
                        language === lang.code
                          ? "bg-black/10 dark:bg-white/10 ring-2 ring-black/20 dark:ring-white/20"
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold ${
                          theme === "dark" ? "text-white/70" : "text-gray-600"
                        }`}
                      >
                        {lang.flag}
                      </span>

                      <span
                        className={`text-xs xs:text-sm font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
