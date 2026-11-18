'use client';

import { useEffect, useRef, useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import styles from './BlueprintPipeline.module.css';

/* Fonte das anotações, só para este componente. Sem preload: o card fica
   abaixo da dobra e não deve disputar banda com a hero. */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--bp-font',
  display: 'swap',
  preload: false,
});

/* ---------- Isometric geometry (computed once) ---------- */
const OX = 150;
const OY = 118;
type V3 = [number, number, number];
const P = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * 0.866, OY + (x + y) * 0.5 - z];
const pt = (p: [number, number]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const poly = (pts: V3[]) => pts.map((a) => pt(P(a[0], a[1], a[2]))).join(' ');
const box = (x: number, y: number, z: number, w: number, d: number, h: number) => ({
  top: poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]),
  left: poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]),
  right: poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]),
});
const seg = (a: V3, b: V3) => {
  const p = P(...a);
  const q = P(...b);
  return { x1: p[0], y1: p[1], x2: q[0], y2: q[1] };
};
const matrixAt = (p: [number, number]) => `matrix(0.866 0.5 0 1 ${p[0].toFixed(1)} ${p[1].toFixed(1)})`;

const G = (() => {
  const belt = box(0, 0, 0, 330, 80, 14);
  const rollers = Array.from({ length: 10 }, (_, i) => seg([30 + i * 30, 0, 14], [30 + i * 30, 80, 14]));
  const legs = ([[30, 0], [30, 80], [300, 0], [300, 80]] as const).map(([x, y]) => seg([x, y, 0], [x, y, -46]));
  const crate = {
    ...box(-10, 17, 14, 46, 46, 40),
    tape: seg([13, 17, 54], [13, 63, 54]),
    label: poly([[2, 63, 22], [24, 63, 22], [24, 63, 36], [2, 63, 36]]),
    textT: matrixAt(P(4, 63, 31)),
  };
  const a1 = P(0, 80, 0);
  const a2 = P(150, -22, 130);
  const a3 = P(330, 80, 0);
  return {
    belt,
    rollers,
    legs,
    crate,
    gantryBack: box(146, -22, 0, 8, 8, 122),
    gantryFront: box(146, 94, 0, 8, 8, 122),
    bar: box(146, -22, 122, 8, 124, 8),
    scan: poly([[150, 0, 120], [150, 80, 120], [150, 80, 14], [150, 0, 14]]),
    lamp: P(150, 40, 121),
    edgeBack: seg([0, 0, 14], [330, 0, 14]),
    edgeFront: seg([0, 80, 14], [330, 80, 14]),
    notes: [
      { a: a1, leader: `${pt(a1)} ${a1[0] - 30},${a1[1] + 46} ${a1[0] - 70},${a1[1] + 46}`, t: [a1[0] - 70, a1[1] + 62], delay: '1.2s' },
      { a: a2, leader: `${pt(a2)} ${a2[0]},${a2[1] - 34} ${a2[0] + 40},${a2[1] - 34}`, t: [a2[0] + 46, a2[1] - 30], delay: '1.5s' },
      { a: a3, leader: `${pt(a3)} ${a3[0] + 26},${a3[1] + 26} ${a3[0] + 56},${a3[1] + 26}`, t: [a3[0] + 60, a3[1] + 30], delay: '1.8s' },
    ],
    dim: {
      main: seg([0, 104, 0], [330, 104, 0]),
      t1: seg([0, 98, 0], [0, 110, 0]),
      t2: seg([330, 98, 0], [330, 110, 0]),
      textT: matrixAt(P(100, 116, 0)),
    },
  };
})();

/* Static positions are the fallback for prefers-reduced-motion (animations override them). */
/* Each crate enters as feedback ("FB") and leaves the review gate as a shipped version. */
const CRATES = [
  { id: 'a', tagIn: 'FB', tagOut: 'v1', delay: '0s', still: 'translate(60px,35px)' },
  { id: 'b', tagIn: 'FB', tagOut: 'v2', delay: '-3s', still: 'translate(150px,87px)' },
  { id: 'c', tagIn: 'FB', tagOut: 'v3', delay: '-6s', still: 'translate(240px,139px)' },
];

export type BlueprintLabels = {
  steps: [{ title: string; sub: string }, { title: string; sub: string }, { title: string; sub: string }];
  dimension: string;
  ariaLabel: string;
};

const DEFAULT_LABELS: BlueprintLabels = {
  steps: [
    { title: '01 · FEEDBACK', sub: 'client request in' },
    { title: '02 · REVIEW', sub: 'shared preview + QA' },
    { title: '03 · SHIPPED', sub: 'client sees it live' },
  ],
  dimension: 'ASYNC UPDATES · EVERY STEP',
  ariaLabel: 'Isometric blueprint of a conveyor: feedback boxes pass a review gate and come out shipped',
};

type Props = { labels?: BlueprintLabels; className?: string };

export default function BlueprintPipeline({ labels = DEFAULT_LABELS, className }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  /* Draw the lines when the card first scrolls into view; pause the loops while it is off-screen. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rootClass = [styles.root, mono.variable, started ? styles.started : '', visible ? '' : styles.paused, className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <svg ref={ref} viewBox="0 0 580 392" className={rootClass} role="img" aria-label={labels.ariaLabel}>
      {/* guides and corner marks */}
      <line x1={-30} y1={22} x2={610} y2={22} className={styles.guide} />
      <line x1={-30} y1={376} x2={610} y2={376} className={styles.guide} />
      {[[12, 16], [556, 16], [12, 370], [556, 370]].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y}l12 12M${x + 12} ${y}l-12 12`} className={styles.mark} />
      ))}

      {G.legs.map((l, i) => <line key={i} {...l} className={`${styles.draw} ${styles.leg}`} />)}

      <polygon points={G.gantryBack.left} className={`${styles.draw} ${styles.frame}`} />
      <polygon points={G.gantryBack.right} className={`${styles.draw} ${styles.frame}`} />

      <polygon points={G.belt.left} className={`${styles.draw} ${styles.beltSide}`} />
      <polygon points={G.belt.right} className={`${styles.draw} ${styles.beltSide}`} />
      <polygon points={G.belt.top} className={`${styles.draw} ${styles.beltTop}`} />
      {G.rollers.map((r, i) => <line key={i} {...r} className={styles.roller} />)}
      <line {...G.edgeBack} className={styles.march} />
      <line {...G.edgeFront} className={styles.march} />

      <polygon points={G.scan} className={`${styles.pulse} ${styles.scan}`} />

      {CRATES.map((c) => (
        <g key={c.id} className={styles.ride} style={{ animationDelay: c.delay, transform: c.still }}>
          <polygon points={G.crate.left} className={`${styles.hit} ${styles.crateLeft}`} style={{ animationDelay: c.delay }} />
          <polygon points={G.crate.right} className={`${styles.hit} ${styles.crateRight}`} style={{ animationDelay: c.delay }} />
          <polygon points={G.crate.top} className={`${styles.hit} ${styles.crateTop}`} style={{ animationDelay: c.delay }} />
          <line {...G.crate.tape} className={styles.tape} />
          <polygon points={G.crate.label} className={styles.sticker} />
          <text transform={G.crate.textT} className={`${styles.crateTag} ${styles.tagIn}`} style={{ animationDelay: c.delay }}>{c.tagIn}</text>
          <text transform={G.crate.textT} className={`${styles.crateTag} ${styles.tagOut}`} style={{ animationDelay: c.delay }}>{c.tagOut}</text>
        </g>
      ))}

      <polygon points={G.gantryFront.left} className={`${styles.draw} ${styles.frameFront}`} style={{ animationDelay: '0.5s' }} />
      <polygon points={G.gantryFront.right} className={`${styles.draw} ${styles.frameFront}`} style={{ animationDelay: '0.5s' }} />
      <polygon points={G.bar.left} className={`${styles.draw} ${styles.frameFront}`} style={{ animationDelay: '0.7s' }} />
      <polygon points={G.bar.right} className={`${styles.draw} ${styles.frameFront}`} style={{ animationDelay: '0.7s' }} />
      <polygon points={G.bar.top} className={`${styles.draw} ${styles.barTop}`} style={{ animationDelay: '0.7s' }} />
      <circle cx={G.lamp[0]} cy={G.lamp[1]} r={3} className={`${styles.pulse} ${styles.lamp}`} />

      {G.notes.map((n, i) => (
        <g key={i} className={styles.fadeIn} style={{ animationDelay: n.delay }}>
          <polyline points={n.leader} className={styles.leader} />
          <circle cx={n.a[0]} cy={n.a[1]} r={2.5} className={styles.dot} />
          <text x={n.t[0]} y={n.t[1]} className={styles.noteTitle}>{labels.steps[i].title}</text>
          <text x={n.t[0]} y={n.t[1] + 14} className={styles.noteSub}>{labels.steps[i].sub}</text>
        </g>
      ))}

      <g className={styles.fadeIn} style={{ animationDelay: '1.6s' }}>
        <line {...G.dim.main} className={styles.leader} />
        <line {...G.dim.t1} className={styles.leader} />
        <line {...G.dim.t2} className={styles.leader} />
        <text transform={G.dim.textT} className={styles.dimText}>{labels.dimension}</text>
      </g>
    </svg>
  );
}
