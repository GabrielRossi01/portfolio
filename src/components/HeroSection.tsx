"use client";

import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import OrbitalSphere3D from "@/components/OrbitalSphere3D";

export default function OrangePlanetHero() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);

  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

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

      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[-3%]
          left-1/2
          z-0
          h-[min(78vw,390px)]
          w-[min(78vw,390px)]
          -translate-x-1/2
          md:bottom-auto
          md:left-auto
          md:right-[1%]
          md:top-1/2
          md:h-[min(48vw,620px)]
          md:w-[min(48vw,620px)]
          md:-translate-y-1/2
          lg:right-[-1%]
          xl:right-[-3%]
        "
        style={{
          y: reduceMotion ? 0 : sphereY,
          scale: reduceMotion ? 1 : sphereScale,
        }}
        aria-hidden="true"
      >
        <Canvas
          camera={{
            position: [0, 0, 4.8],
            fov: 42,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop={reduceMotion ? "demand" : "always"}
        >
          <Suspense fallback={null}>
            <OrbitalSphere3D />
          </Suspense>
        </Canvas>
      </motion.div>

      <motion.div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
          px-5
          py-32
          sm:px-8
          lg:px-12
          xl:px-20
        "
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 flex flex-col items-center gap-2 sm:mb-6 md:items-start"
            >
              <div
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-3 py-1.5 text-xs font-light sm:px-4 sm:py-2 sm:text-sm"
                style={{
                  background: isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.04)",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.12)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {!reduceMotion && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: isDark
                        ? "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)"
                        : "linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.12) 50%, transparent 100%)",
                    }}
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1.2,
                    }}
                  />
                )}

                <span className="relative z-10 h-2 w-2 rounded-full bg-green-500" />

                <span
                  className="relative z-10"
                  style={{
                    color: isDark
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(30, 30, 30, 0.85)",
                  }}
                >
                  {t.hero.badge}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-5 max-w-2xl px-0 text-center leading-[1.08] sm:mb-6 md:text-left"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
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
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                }}
              >
                {t.hero.headlineEnd}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mb-7 max-w-lg px-0 text-center font-light sm:mb-8 md:text-left"
              style={{
                fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)",
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
