"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSphere = dynamic(() => import("@/components/HeroSphere"), {
  ssr: false,
});

const DESKTOP_QUERY = "(min-width: 768px)";

export default function OrangePlanetHero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement>(null);
  const [showSphere, setShowSphere] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  // A esfera só existe no desktop e só carrega quando a página fica ociosa:
  // o three.js (~250 KB) não disputa banda nem CPU com a primeira pintura.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      if (!query.matches) {
        setShowSphere(false);
        return;
      }

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setShowSphere(true), {
          timeout: 2000,
        });
      } else {
        timeoutId = setTimeout(() => setShowSphere(true), 600);
      }
    };

    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  // Fora da tela o canvas para de desenhar.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) =>
      setHeroInView(entry.isIntersecting),
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "12%"]);
  const sphereY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-linear-to-b from-white to-neutral-50 dark:from-black dark:to-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60 dark:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 75% 52%, rgba(255, 94, 27, 0.08), transparent 32%)",
        }}
      />

      {showSphere && (
        <motion.div
          className="
            fade-in
            absolute
            top-1/2
            z-0
            hidden
            h-[clamp(300px,34vw,540px)]
            w-[clamp(300px,34vw,540px)]
            -translate-y-1/2
            md:block
            md:left-[58%]
            lg:left-[60%]
            xl:left-[61%]
            2xl:left-[62%]
          "
          style={{ y: reduceMotion ? 0 : sphereY }}
          aria-hidden="true"
        >
          <HeroSphere active={heroInView} reduceMotion={reduceMotion} />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 flex min-h-svh w-full items-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-20"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl text-center md:max-w-[48%] md:text-left">
            <p className="hero-in mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-gray-700 dark:border-white/15 dark:text-gray-300">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {t.hero.eyebrow}
            </p>

            <h1
              className="hero-in mb-5 max-w-2xl text-center leading-[1.08] sm:mb-6 md:text-left"
              style={{
                fontSize: "clamp(1.95rem, 4vw, 4rem)",
                letterSpacing: "-0.035em",
                animationDelay: "60ms",
              }}
            >
              <span className="font-light text-[#1a1a1a] dark:text-white">
                {t.hero.headlineStart}{" "}
              </span>

              <span className="gradient-orange-accent italic">
                {t.hero.headlineEnd}
              </span>
            </h1>

            <p
              className="hero-in mx-auto mb-8 max-w-lg font-light text-gray-700 md:mx-0 dark:text-gray-300"
              style={{
                fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                animationDelay: "160ms",
              }}
            >
              {t.hero.greeting} <strong className="font-medium text-gray-900 dark:text-white">{t.hero.name}</strong>
              {t.hero.connector} {t.hero.title}
            </p>

            <div
              className="hero-in flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start"
              style={{ animationDelay: "260ms" }}
            >
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gray-900 px-7 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-[0.98] sm:text-base dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {t.hero.ctaProjects}
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/15 px-7 text-sm font-medium text-gray-900 transition hover:border-black/30 hover:bg-black/5 active:scale-[0.98] sm:text-base dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
