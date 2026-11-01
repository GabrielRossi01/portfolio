"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroSphere = dynamic(() => import("@/components/HeroSphere"), {
  ssr: false,
});

export default function OrangePlanetHero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // A esfera (Three.js) só entra depois que a página fica ociosa,
  // para não disputar a thread principal com o primeiro paint.
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), {
        timeout: 2500,
      });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(() => setIdle(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const showSphere = isDesktop && idle;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [1, 0.5, 0],
  );

  const contentY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);

  const sphereY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "6%", "12%"],
  );

  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  const isDark = theme === "dark";

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      style={{
        background: isDark
          ? "#000000"
          : "linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 75% 52%, rgba(255, 94, 27, 0.08), transparent 32%)"
            : "radial-gradient(circle at 75% 52%, rgba(255, 94, 27, 0.05), transparent 32%)",
        }}
      />

      {showSphere && (
        <motion.div
          className="
            pointer-events-auto
            absolute
            top-1/2
            z-0
            hidden
            h-[clamp(300px,34vw,540px)]
            w-[clamp(300px,34vw,540px)]
            -translate-y-1/2
            cursor-grab
            md:block
            md:left-[58%]
            lg:left-[60%]
            xl:left-[61%]
            2xl:left-[62%]
          "
          style={{
            y: reduceMotion ? 0 : sphereY,
            scale: reduceMotion ? 1 : sphereScale,
          }}
          aria-hidden="true"
        >
          <HeroSphere reduceMotion={reduceMotion} />
        </motion.div>
      )}

      <motion.div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
          px-5
          py-20
          sm:px-8
          sm:py-32
          lg:px-12
          xl:px-20
        "
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl text-center md:max-w-[48%] md:text-left">

            {/* sem opacity inicial: o h1 é o LCP e precisa aparecer no primeiro paint */}
            <motion.h1
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-5 max-w-2xl px-0 text-center leading-[1.08] sm:mb-6 md:text-left"
              style={{
                fontSize: "clamp(1.85rem, 4vw, 4rem)",
                letterSpacing: "-0.035em",
              }}
            >
              <span
                className="font-light"
                style={{
                  color: isDark ? "#ffffff" : "#1a1a1a",
                  textShadow: isDark
                    ? "0 4px 28px rgba(0, 0, 0, 0.7)"
                    : "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                {t.hero.headlineStart}{" "}
              </span>

              <span
                className="gradient-orange-accent"
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                }}
              >
                {t.hero.headlineEnd}
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 15 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-7 max-w-lg px-0 text-center font-light sm:mb-8 md:text-left"
              style={{
                fontSize: "clamp(0.88rem, 1.05vw, 1.05rem)",
                color: isDark
                  ? "rgba(255, 255, 255, 0.84)"
                  : "rgba(30, 30, 30, 0.82)",
              }}
            >
              {t.hero.greeting} {t.hero.name}
              {t.hero.connector} {t.hero.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full cursor-pointer overflow-hidden rounded-full sm:w-auto"
              >
                <div
                  className="flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1 sm:px-7 sm:py-3.5 sm:text-base"
                  style={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.045)",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.16)"
                      : "1px solid rgba(0, 0, 0, 0.09)",
                    boxShadow: isDark
                      ? "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.24)"
                      : "inset 0 1px 1px rgba(255, 255, 255, 0.7), 0 8px 24px rgba(0, 0, 0, 0.08)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    color: isDark
                      ? "rgba(255, 255, 255, 0.92)"
                      : "rgba(30, 30, 30, 0.9)",
                  }}
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t.hero.ctaContact}</span>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
