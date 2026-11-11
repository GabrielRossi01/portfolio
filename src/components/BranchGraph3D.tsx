"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Grafo de git deitado num piso 3D: o piso gira sem parar (toca-discos) e a
// câmera balança devagar. Projeção feita à mão num canvas 2D, sem libs.

type Cor = "orange" | "blue" | "green" | "purple";

interface Ramo {
  nome: string;
  cor: Cor;
  pontos: [number, number][]; // (x, z) no piso
  commits: number[]; // índices em `pontos`
  rotulo?: number; // índice do commit que recebe a etiqueta
  cabeca?: boolean; // ponta do main, com anel pulsando
}

const PALETA: Record<"dark" | "light", Record<Cor, string>> = {
  dark: { orange: "#fb923c", blue: "#60a5fa", green: "#4ade80", purple: "#c084fc" },
  light: { orange: "#ea580c", blue: "#2563eb", green: "#16a34a", purple: "#9333ea" },
};

const ss = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

// desvia do eixo z0 para z1 a partir de `sai` e volta a partir de `volta`
function caminho(
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  sai: number,
  volta: number | null,
  zVolta = z0,
  largura = 0.32,
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const x = x0 + ((x1 - x0) * i) / 60;
    let z = z0 + (z1 - z0) * ss((x - sai) / largura);
    if (volta !== null) z += (zVolta - z1) * ss((x - volta) / largura);
    pts.push([x, z]);
  }
  return pts;
}

const indice = (pts: [number, number][], x: number) =>
  pts.reduce((m, p, i) => (Math.abs(p[0] - x) < Math.abs(pts[m][0] - x) ? i : m), 0);

function montarRamos(): Ramo[] {
  const main = caminho(-1.25, 1.1, 0, 0, 0, null);
  const feat = caminho(-0.85, 0.62, 0, -0.55, -0.85, 0.3);
  const ai = caminho(-0.25, 1.05, -0.55, -1.05, -0.25, null);
  const fix = caminho(-0.3, 1.1, 0, 0.55, -0.3, 0.78);

  const com = (pts: [number, number][], xs: number[]) => xs.map((x) => indice(pts, x));

  return [
    { nome: "feat/ai-assistant", cor: "green", pontos: ai, commits: com(ai, [0.25, 0.6, 1.05]), rotulo: 1 },
    { nome: "feat/customer", cor: "blue", pontos: feat, commits: com(feat, [-0.3, 0.05]), rotulo: 1 },
    { nome: "fix/feedback", cor: "purple", pontos: fix, commits: com(fix, [0.3, 0.55]), rotulo: 1 },
    {
      nome: "main",
      cor: "orange",
      pontos: main,
      commits: com(main, [-1.05, -0.55, 0.0, 0.62, 1.1]),
      rotulo: 4,
      cabeca: true,
    },
  ];
}

export default function BranchGraph3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const modo = theme === "light" ? "light" : "dark";
    const cores = PALETA[modo];
    const ramos = montarRamos();
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1;
    const medir = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    medir();

    const desenhar = (tempo: number) => {
      const s = tempo / 1000;
      const giro = -0.35 + s * ((Math.PI * 2) / 48); // 1 volta a cada 48s
      const pitch = 0.5 + Math.sin(s * 0.45) * 0.07; // balanço da câmera
      const cg = Math.cos(giro), sg = Math.sin(giro);
      const sp = Math.sin(pitch), cp = Math.cos(pitch);
      // escala pensada para o pior caso: árvore de ponta, com o commit mais
      // próximo da câmera ainda dentro do card
      const escala = Math.min(w * 0.36, h * 0.62);
      const D = 3.6;
      const cx = w / 2, cy = h * 0.5;

      // (x, z) do piso → tela; z positivo = longe da câmera
      const proj = (x: number, z: number) => {
        const xr = x * cg - z * sg;
        const zr = x * sg + z * cg;
        const prof = D + zr * cp;
        const f = (escala * D) / prof;
        return { x: cx + xr * f, y: cy - zr * sp * f, prof, f: f / escala };
      };
      // 0 (fundo) … 1 (frente)
      const perto = (prof: number) => Math.min(1, Math.max(0, (D + 1.4 - prof) / 2.8));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // piso quadriculado, sumindo nas bordas
      const L = 1.6, passo = 0.2;
      ctx.lineWidth = 1;
      for (let i = -L; i <= L + 1e-6; i += passo) {
        for (const [a, b] of [
          [proj(i, -L), proj(i, L)],
          [proj(-L, i), proj(L, i)],
        ]) {
          const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          const base = modo === "dark" ? "255,255,255" : "0,0,0";
          const borda = 1 - Math.abs(i) / L;
          const alfa = (modo === "dark" ? 0.07 : 0.08) * borda;
          g.addColorStop(0, `rgba(${base},0)`);
          g.addColorStop(0.5, `rgba(${base},${alfa})`);
          g.addColorStop(1, `rgba(${base},0)`);
          ctx.strokeStyle = g;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // linhas dos ramos, segmento a segmento para a espessura seguir a profundidade
      ctx.lineCap = "round";
      for (const r of ramos) {
        const pts = r.pontos.map(([x, z]) => proj(x, z));
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i];
          const n = perto((a.prof + b.prof) / 2);
          ctx.strokeStyle = cores[r.cor];
          ctx.globalAlpha = 0.45 + n * 0.55;
          ctx.lineWidth = 1.2 + 1.6 * a.f;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        // pulso de commit correndo pelo ramo
        if (!reduzido) {
          const t = (s * 0.12 + r.pontos.length * 0.013 + ramos.indexOf(r) * 0.27) % 1;
          const p = pts[Math.floor(t * (pts.length - 1))];
          const brilho = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10 * p.f);
          brilho.addColorStop(0, cores[r.cor]);
          brilho.addColorStop(1, `${cores[r.cor]}00`); // mesma cor, alfa 0 (evita borrão cinza)
          ctx.globalAlpha = 0.55 * Math.sin(t * Math.PI);
          ctx.fillStyle = brilho;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10 * p.f, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // commits, do fundo para a frente
      const nos = ramos.flatMap((r) =>
        r.commits.map((ci, k) => {
          const [x, z] = r.pontos[ci];
          const p = proj(x, z);
          const cabeca = Boolean(r.cabeca && k === r.commits.length - 1);
          return { ...p, cor: cores[r.cor], cabeca };
        }),
      );
      nos.sort((a, b) => b.prof - a.prof);
      const fundo = modo === "dark" ? "#0b0b0c" : "#ffffff";
      for (const n of nos) {
        const raio = (n.cabeca ? 5.5 : 4) * (0.7 + n.f * 0.5);
        if (n.cabeca) {
          const fase = reduzido ? 0.4 : (s * 0.6) % 1;
          ctx.strokeStyle = n.cor;
          ctx.globalAlpha = 0.6 * (1 - fase);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, raio + 4 + fase * 14, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.fillStyle = n.cor;
          ctx.shadowColor = n.cor;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(n.x, n.y, raio, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.globalAlpha = 0.55 + perto(n.prof) * 0.45;
          ctx.fillStyle = fundo;
          ctx.strokeStyle = n.cor;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(n.x, n.y, raio, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // etiquetas sempre de pé, presas ao commit por uma haste
      const etiquetas = ramos
        .filter((r) => r.rotulo !== undefined)
        .map((r) => {
          const [x, z] = r.pontos[r.commits[r.rotulo!]];
          return { r, p: proj(x, z) };
        })
        .sort((a, b) => b.p.prof - a.p.prof);

      ctx.font = "500 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";
      for (const { r, p } of etiquetas) {
        const cor = cores[r.cor];
        const haste = 30 + p.f * 6;
        const tw = ctx.measureText(r.nome).width;
        const bw = tw + 26, bh = 22;
        const bx = p.x - bw / 2, by = p.y - haste - bh;
        const alfa = r.cabeca ? 1 : 0.6 + perto(p.prof) * 0.4;

        ctx.globalAlpha = alfa;
        ctx.strokeStyle = cor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - 6);
        ctx.lineTo(p.x, by + bh);
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 6);
        if (r.cabeca) {
          ctx.fillStyle = cor;
          ctx.fill();
        } else {
          ctx.fillStyle = modo === "dark" ? "rgba(12,12,14,0.92)" : "rgba(255,255,255,0.95)";
          ctx.fill();
          ctx.stroke();
        }
        ctx.fillStyle = r.cabeca ? (modo === "dark" ? "#160a02" : "#ffffff") : cor;
        ctx.beginPath();
        ctx.arc(bx + 10, by + bh / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = r.cabeca ? (modo === "dark" ? "#160a02" : "#ffffff") : modo === "dark" ? "#f4f4f5" : "#18181b";
        ctx.fillText(r.nome, bx + 18, by + bh / 2 + 0.5);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let visivel = false;
    const laco = (t: number) => {
      desenhar(t);
      raf = requestAnimationFrame(laco);
    };
    const parar = () => cancelAnimationFrame(raf);
    const iniciar = () => {
      parar();
      if (reduzido) desenhar(0);
      else raf = requestAnimationFrame(laco);
    };

    // só anima quando o card está na tela
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) iniciar();
      else parar();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      medir();
      if (reduzido || !visivel) desenhar(0);
    });
    ro.observe(canvas);

    desenhar(0);

    return () => {
      parar();
      io.disconnect();
      ro.disconnect();
    };
  }, [theme]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
