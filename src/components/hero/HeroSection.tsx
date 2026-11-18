"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./HeroSection.module.css";

// Brice Bold, servida pelo próprio site (pré-carregada). O fallback recebe
// métricas ajustadas, então o título não "pula" quando a fonte chega.
const display = localFont({
  src: "./fonts/Brice-Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--hero-display",
  display: "swap",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const ART_W = 1145;
const ART_H = 1373;
const EYES = [
  { left: 416, top: 514, w: 126, h: 130, cx: 62.6, cy: 64.4 },
  { left: 638, top: 517, w: 125, h: 130, cx: 61.9, cy: 64.2 },
];
const IRIS = 68;
// largura em que o personagem aparece: até 96vw no celular/tablet e no
// máximo ~820px no desktop (o otimizador escolhe o arquivo certo, já em 2x)
const CHARACTER_SIZES = "(max-width: 1023px) 96vw, 820px";
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

const HEAD_X = (6 / ART_W) * 100;
const HEAD_Y = (6 / ART_H) * 100;
const IRIS_X = (20 / IRIS) * 100;
const IRIS_Y = (16 / IRIS) * 100;

// Largura de cada texto do título em ems na Brice Bold (letter-spacing
// -0.02em), medida no Chrome. Proporção constante: tamanho = largura ÷ k.
const TITLE_EM: Record<string, number> = {
  "I’M GABRIEL": 6.7331,
  "SOU GABRIEL": 7.4061,
  "SOY GABRIEL": 7.325,
  "I’M": 1.6431,
  SOU: 2.3161,
  SOY: 2.235,
  GABRIEL: 4.8541,
};
// texto novo sem medida: estimativa conservadora (~0.7em por caractere)
const titleWidthEm = (text: string) => TITLE_EM[text] ?? text.length * 0.7;

const clamp = (v: number) => Math.max(-1, Math.min(1, v));
const smoothstep = (a: number, b: number, v: number) => {
  const x = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

export default function HeroSection() {
  const { t } = useLanguage();

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const irisRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lidRefs = useRef<(HTMLDivElement | null)[]>([]);
  const squish = useRef(0);
  const wakeRef = useRef<() => void>(() => {});

  // "I'M GABRIEL" → ["I'M", "GABRIEL"]: no celular cada parte vira uma linha
  const words = t.hero.bigTitle.split(" ");
  const titleLines =
    words.length > 1
      ? [words.slice(0, -1).join(" "), words[words.length - 1]]
      : words;

  // Título "ajustado à largura" só com CSS: o tamanho sai de
  // (largura útil) ÷ (largura do texto em ems). Sem medir no JS = sem
  // reflow forçado na hidratação e sem o palco "pular" (CLS).
  const titleStyle = {
    "--title-k": titleWidthEm(t.hero.bigTitle),
    "--title-k-lines": Math.max(...titleLines.map(titleWidthEm)),
  } as React.CSSProperties;

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tgt = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let px = 0;
    let py = 0;
    let pointerDirty = false;
    let lastMove = -Infinity;
    let visible = false;
    let raf = 0;
    let blinkTimer: ReturnType<typeof setTimeout> | undefined;
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let lastBody = "";
    let lastHead = "";
    let lastIris = "";

    const canRun = () => visible && !document.hidden;

    let heroH = root.offsetHeight || window.innerHeight;
    const ro = new ResizeObserver(() => {
      heroH = root.offsetHeight || window.innerHeight;
      lastScroll = -1;
    });
    ro.observe(root);

    let lastScroll = -1;
    const parallax = () => {
      const sy = Math.max(0, window.scrollY);
      if (sy === lastScroll) return;
      lastScroll = sy;
      const p = Math.min(1, sy / heroH);

      const title = titleRef.current;
      if (title) {
        title.style.translate = `0 ${(sy * 0.42).toFixed(2)}px`;
        title.style.opacity = (1 - smoothstep(0.05, 0.65, p)).toFixed(3);
      }
      if (stage) {
        stage.style.translate = `0 ${(sy * 0.16).toFixed(2)}px`;
        stage.style.scale = (1 - 0.06 * p).toFixed(4);
      }
      const textOpacity = (1 - smoothstep(0, 0.4, p)).toFixed(3);
      const textY = `0 ${(sy * -0.12).toFixed(2)}px`;
      [leftRef.current, rightRef.current].forEach((el) => {
        if (!el) return;
        el.style.translate = textY;
        el.style.opacity = textOpacity;
      });
    };

    const tick = (now: number) => {
      raf = 0;
      if (!canRun()) return;

      if (!reduce) parallax();

      if (pointerDirty) {
        const r = stage.getBoundingClientRect();
        tgt.x = clamp((px - (r.left + r.width / 2)) / (r.width * 0.9));
        tgt.y = clamp((py - (r.top + r.height * 0.4)) / (r.height * 0.7));
        pointerDirty = false;
      }

      const time = now / 1000;
      if (!reduce && now - lastMove > 2500) {
        tgt.x = 0.5 * Math.sin(time * 0.6);
        tgt.y = 0.22 * Math.sin(time * 0.9);
      }

      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;
      squish.current *= 0.88;
      if (squish.current < 0.002) squish.current = 0;

      const sq = squish.current;
      const breath = reduce ? 0 : Math.sin(time * 1.6) * 0.004;

      const body = `scale(${(1 + 0.07 * sq).toFixed(4)}, ${(1 - 0.09 * sq + breath).toFixed(4)})`;
      const head = `translate3d(${(cur.x * HEAD_X).toFixed(3)}%, ${(cur.y * HEAD_Y).toFixed(3)}%, 0) rotate(${(cur.x * 3.2).toFixed(2)}deg)`;
      const iris = `translate3d(${(cur.x * IRIS_X).toFixed(2)}%, ${(cur.y * IRIS_Y).toFixed(2)}%, 0)`;

      if (body !== lastBody && bodyRef.current) {
        bodyRef.current.style.transform = body;
        lastBody = body;
      }
      if (head !== lastHead && headRef.current) {
        headRef.current.style.transform = head;
        lastHead = head;
      }
      if (iris !== lastIris) {
        irisRefs.current.forEach((el) => {
          if (el) el.style.transform = iris;
        });
        lastIris = iris;
      }

      const settled =
        Math.abs(tgt.x - cur.x) < 0.001 &&
        Math.abs(tgt.y - cur.y) < 0.001 &&
        sq === 0;

      if (!reduce || !settled) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf && canRun()) raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const setLids = (value: string) =>
      lidRefs.current.forEach((el) => {
        if (el) el.style.transform = value;
      });

    const scheduleBlink = () => {
      blinkTimer = setTimeout(
        () => {
          if (canRun()) {
            setLids("scaleY(1)");
            openTimer = setTimeout(() => setLids("scaleY(0)"), 140);
          }
          scheduleBlink();
        },
        2600 + Math.random() * 2600,
      );
    };
    scheduleBlink();

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      pointerDirty = true;
      lastMove = performance.now();
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onVisibility = () => wake();
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      clearTimeout(blinkTimer);
      clearTimeout(openTimer);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      wakeRef.current = () => {};
    };
  }, []);

  const poke = () => {
    squish.current = 1;
    wakeRef.current();
  };

  return (
    <section
      ref={rootRef}
      id="home"
      className={`${styles.hero} ${display.variable}`}
    >
      <h1 ref={titleRef} className={styles.title} style={titleStyle}>
        <span className={styles.titleText}>
          {titleLines.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </span>
      </h1>

      <div ref={stageRef} className={styles.stage}>
        <button
          type="button"
          className={styles.character}
          onPointerDown={poke}
          aria-label={t.hero.pokeLabel}
        >
          <div className={styles.art} role="img" aria-label={t.hero.characterAlt}>
            <div ref={bodyRef} className={styles.bodyLayer}>
              <Image
                src="/hero/gabriel-body.webp"
                alt=""
                fill
                preload
                fetchPriority="high"
                sizes={CHARACTER_SIZES}
                quality={85}
                className={styles.layer}
                draggable={false}
              />
              <div ref={headRef} className={styles.headLayer}>
                <Image
                  src="/hero/gabriel-head.webp"
                  alt=""
                  fill
                  preload
                  fetchPriority="high"
                  sizes={CHARACTER_SIZES}
                  quality={85}
                  className={styles.layer}
                  draggable={false}
                />
                {EYES.map((e, i) => (
                  <div
                    key={i}
                    className={styles.eye}
                    style={{
                      left: pct(e.left, ART_W),
                      top: pct(e.top, ART_H),
                      width: pct(e.w, ART_W),
                      height: pct(e.h, ART_H),
                    }}
                  >
                    <div
                      ref={(el) => {
                        irisRefs.current[i] = el;
                      }}
                      className={styles.iris}
                      style={{
                        left: pct(e.cx - IRIS / 2, e.w),
                        top: pct(e.cy - IRIS / 2, e.h),
                        width: pct(IRIS, e.w),
                        height: pct(IRIS, e.h),
                      }}
                    />
                    <div
                      ref={(el) => {
                        lidRefs.current[i] = el;
                      }}
                      className={styles.lid}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>

      <div ref={leftRef} className={styles.bottomLeft}>
        <p>
          {t.hero.headlineStart}{" "}
          <span className={styles.accent}>{t.hero.headlineEnd}</span>
        </p>
      </div>

      <div ref={rightRef} className={styles.bottomRight}>
        <div className={styles.meta}>
          <span>{t.hero.name.toUpperCase()}</span>
          <span>{t.hero.title.toUpperCase()}</span>
          <span>{t.hero.location}</span>
        </div>
        <a href="#contact" className={styles.cta}>
          <Mail className={styles.ctaIcon} aria-hidden="true" />
          <span>{t.hero.ctaContact}</span>
        </a>
      </div>
    </section>
  );
}
