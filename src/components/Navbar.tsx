"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon, Globe, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";
import { pauseSmoothScroll, scrollToTarget } from "@/lib/smoothScroll";
import styles from "./Navbar.module.css";

const SECTION_IDS = ["home", "about", "projects", "github-activity", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const navigatingRef = useRef(false);
  const navigationId = useRef(0);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const indicatorReady = useRef(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    //
    // As seções carregadas com dynamic() (Contribuições, Contato) podem ter o
    // nó trocado pelo React depois da hidratação. Por isso guardamos
    // id → elemento e, a cada mudança no DOM, trocamos o que ficou velho; o
    // MutationObserver nunca se desliga.
    let io: IntersectionObserver | null = null;
    const tracked = new Map<string, Element>();

    const syncSections = () => {
      if (!io) return;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        const prev = tracked.get(id);
        if (el === prev) return;
        if (prev) io!.unobserve(prev);
        if (el) {
          io!.observe(el);
          tracked.set(id, el);
        } else {
          tracked.delete(id);
        }
      });
    };

    const createObserver = () => {
      io?.disconnect();
      tracked.clear();
      const bottom = Math.max(0, window.innerHeight - 101);
      io = new IntersectionObserver(
        (entries) => {
          if (navigatingRef.current) return;
          const hit = entries.find(
            (entry) => entry.isIntersecting && entry.target.isConnected,
          );
          if (hit) setActiveSection(hit.target.id);
        },
        { rootMargin: `-100px 0px -${bottom}px 0px` },
      );
      syncSections();
    };

    createObserver();

    // Fim da página: se a última seção for curta e não alcançar a linha de
    // 100px, ela vira ativa ao chegar no fundo. A altura do documento fica em
    // cache (ResizeObserver), então o scroll só lê scrollY/innerHeight.
    const lastId = SECTION_IDS[SECTION_IDS.length - 1];
    let docHeight = document.documentElement.scrollHeight;
    const docRo = new ResizeObserver(() => {
      docHeight = document.documentElement.scrollHeight;
    });
    docRo.observe(document.body);

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (navigatingRef.current) return;
        if (window.scrollY + window.innerHeight >= docHeight - 4) {
          setActiveSection(lastId);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

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

    // no máximo uma sincronização por frame, mesmo com muitas mutações
    let syncFrame = 0;
    const mo = new MutationObserver(() => {
      if (syncFrame) return;
      syncFrame = requestAnimationFrame(() => {
        syncFrame = 0;
        syncSections();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
      docRo.disconnect();
      cancelAnimationFrame(syncFrame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
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


  // indicador da seção ativa: uma pílula só, posicionada sobre o link ativo
  // (substitui o layoutId do framer-motion; a transição é CSS)
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const link = linkRefs.current[activeSection];
    if (!indicator || !link) return;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.height = `${link.offsetHeight}px`;
    indicator.style.transform = `translate3d(${link.offsetLeft}px, ${link.offsetTop}px, 0)`;
    if (!indicatorReady.current) {
      // primeira posição sem animar; a partir daí, desliza
      indicatorReady.current = true;
      requestAnimationFrame(() => indicator.classList.add(styles.indicatorAnimated));
    }
  }, [activeSection, language]);

  // dropdown de idioma: fecha com clique fora ou Esc
  useEffect(() => {
    if (!languageDropdownOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageDropdownOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [languageDropdownOpen]);

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      {/* Desktop: logo, menu e controles numa única linha, centralizados no eixo vertical */}
      <div className="pointer-events-none fixed inset-x-0 top-6 z-50 hidden h-15 items-center justify-between px-6 lg:flex">
        <div className={`pointer-events-auto ${styles.enterFromLeft}`}>
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
        </div>

        <nav
          className={`pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${styles.enterFromTop}`}
        >
          <div className="glass-liquid relative rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2">
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className={`${styles.indicator} bg-black/10 dark:bg-white/10`}
            />
            {navLinks.map((link) => (
              <a
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.href.replace("#", "")] = el;
                }}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.href)}
                aria-current={isActive(link.href) ? "true" : undefined}
                className={`relative whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-full ${
                  isActive(link.href)
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-transparent"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className={`pointer-events-auto flex items-center gap-2 ${styles.enterFromRight}`}>
          <button
            onClick={toggleTheme}
            className="glass-liquid rounded-full p-3 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Toggle theme"
          >
            <span
              className={`${styles.spin} block`}
              style={{ transform: `rotate(${theme === "dark" ? 0 : 180}deg)` }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </span>
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLanguageDropdownOpen((open) => !open)}
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
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  languageDropdownOpen ? "rotate-180" : ""
                } ${theme === "dark" ? "text-white/70" : "text-gray-700"}`}
              />
            </button>

            <div
              inert={!languageDropdownOpen}
              className={`absolute top-full right-0 z-50 mt-2 min-w-[180px] origin-top-right overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/95 ${styles.popover} ${
                languageDropdownOpen ? styles.popoverOpen : ""
              }`}
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
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 z-50 lg:hidden ${styles.enterFromTop}`}>
        <div className="mx-3 xs:mx-4 sm:mx-5 mt-4 xs:mt-5 sm:mt-6 flex items-center justify-between">
          <a href="#home" onClick={(event) => handleLinkClick(event, "#home")} className="shrink-0">
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
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="glass-liquid rounded-full p-3 xs:p-3.5 sm:p-4 shadow-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 text-gray-700 dark:text-white shrink-0 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`${styles.spin} block`}
              style={{ transform: `rotate(${mobileMenuOpen ? 90 : 0}deg)` }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 xs:w-6.5 sm:w-7 h-6 xs:h-6.5 sm:h-7" />
              ) : (
                <Menu className="w-6 xs:w-6.5 sm:w-7 h-6 xs:h-6.5 sm:h-7" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Menu do celular: sempre montado, mostrado/escondido por CSS
          (invisível e inerte quando fechado, então não custa pintura) */}
      <div
        inert={!mobileMenuOpen}
        className={`fixed inset-0 z-40 lg:hidden ${styles.overlay} ${
          mobileMenuOpen ? styles.overlayOpen : ""
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

        <div
          className={`absolute top-20 xs:top-24 sm:top-28 left-3 xs:left-4 sm:left-5 right-3 xs:right-4 sm:right-5 glass-liquid rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden ${styles.panel}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 xs:p-5 sm:p-6">
            <nav className="flex flex-col gap-1.5 xs:gap-2 mb-4 xs:mb-5">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  style={{ "--stagger": `${index * 50}ms` } as React.CSSProperties}
                  className={`${styles.stagger} text-sm xs:text-base sm:text-lg font-medium py-3 xs:py-3.5 sm:py-4 px-4 xs:px-5 sm:px-6 rounded-xl sm:rounded-2xl ${
                    isActive(link.href)
                      ? "bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="h-px bg-linear-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent mb-4 xs:mb-5" />

            <div
              style={{ "--stagger": "300ms" } as React.CSSProperties}
              className={`${styles.stagger} flex items-center gap-2 xs:gap-2.5 sm:gap-3`}
            >
              <button
                onClick={toggleTheme}
                className="flex-1 glass-liquid rounded-xl sm:rounded-2xl py-3 xs:py-3.5 sm:py-4 px-3 xs:px-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span
                  className={`${styles.spin} block`}
                  style={{ transform: `rotate(${theme === "dark" ? 0 : 180}deg)` }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 xs:w-5.5 sm:w-6 h-5 xs:h-5.5 sm:h-6 text-blue-400" />
                  )}
                </span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
