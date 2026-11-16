// Globo de pontos com arcos animados, em <canvas> 2D e sem dependências.
// Porte de .claude/skills/globe-arcs/scripts/globe-arcs.js (veja o SKILL.md da skill).

const LAND =
  "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003ffe7afed40000000000000000000000000000000000bffe1fffff40002f00000000e00000000000000000030a0fbffffff000074000000000800000000000000003ec4c000fffff000000000070007fe000400000000000f00540003fffe0000000003000bff8002000000000000df4c2f801fff6000000000c062fffffe0f8000007fe060ff38df817ffe00000380008fffffffffffc00c0ffffff865c8fc0ffc000003ffc5bfeffffffffffffff9fffffffffe87b07e81e0007ff1fffffffffffffffff003ffffffffdd3c07c01c000fbfbfffffffffffffffff00fffffffff03c0038000007e7fffffffffffffffff7c01fd0fffffe00e0000000007f03fffffffffffffff100000802fffff00fe000000080e1ffffffffffffff80300002000fffffe0ff000000081c7fffffffffffffe00f00000000ffffff9ffc00000641bffffffffffffffe80c000000003fffffdffe000006e7ffffffffffffffffc04000000001fffffff800000001fffffffffffffffff800000000000fffffff87000000ffffffffffffffffff0000000000007ffffffc80000003fffd7fffffffffffe440000000000fffffff400000003ebf83fffffffffffc600000000000ffffffe00000003f0cf81ffffffffffe0000000000000ffffff800000003e82efffffffffffde08000000000007fffff800000003c066fffffffffffc608000000000003fffff0000000001f000ffffffffffe238000000000001fffff000000001ff000ffffffffffe0e0000000000000ffffc000000003ffce0ffffffffffe0000000000000003ffc4000000003ffffffeffffffffe0000000000000005fc0400000000fffffffeffffffffe0000000000000002fc0000000001ffffff7f1fffffffc00000000000000017c0000000001ffffff3f60ffffff800000000000000003c0a00000003ffffffbff07ffffe000000000000000003c6080000003ffffff9fe01fc7f0000000000000000001fc004000003ffffffdfe01f03f01000000000000000003c000000003ffffffef801e01f820000000000000000007800000003ffffffec000e00f800000000000000000001830000003fffffff0000c00382800000000000000000085e000001ffffffff00040010000000000000000000001ff800000fffffffe000200800c0000000000000000000ffc000007e7ffffe00000040400000000000000000000fff80000001ffffc00000149800000000000000000001fff80000001ffff8000000a3800000000000000000003fffc0000001ffff0000000c7a00000000000000000003ffff0000001fffe000000073a1d000000000000000003ffffe000000fffc000000020303e00000000000000003fffff8000007ffc000000010000f40000000000000001fffff8000007ffc000000003001d00000000000000001fffff0000007ffc000000000280080000000000000000fffff0000007ffe000000000004400000000000000000ffffe0000007ffe30000000001c4000000000000000007fffe000000fffe60000000007e6000000000000000001fffe000000fff86000000000fff000100000000000001fffc0000007ff06000000003fff800000000000000001fffc0000003ff0e00000001ffff800000000000000001ffe00000003ff0c00000001ffffc00000000000000001ffc00000003fe0000000000ffffe00000000000000001ffc00000003fe0000000000ffffe00000000000000001ff800000001fc0000000000ffffe00000000000000001ff800000000f80000000000fe7fe00000000000000001ff000000000e00000000000c03fc00000000000000003fc000000000000000000000000fc00400000000000003fc0000000000000000000000007000300000000000003e00000000000000000000000002800200000000000007c00000000000000000000000001800c00000000000003c00000000000000000000000000001000000000000007800000000000000000000000000003000000000000003c000000000000000000000000000000000000000000078000000000000000000000000000000000000000000070800000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000200000000000000c0000062000000000000000000000040000000000000fff81ffffffff000000000000000001e000000000201ffff9ffffffffffe000000000001800560000007ffffffffffffffffffffff00000000c01fffff000001ffffffffffffffffffffff8000007fffffffff800007fffffffffffffffffffffff00001fffffffffcc00307ffffffffffffffffffffffff800000fffffffff000780fffffffffffffffffffffffe000003ffffffffff8067fffffffffffffffffffffffff00003fffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const ROWS = 89;
const COLS = 180;
const D = Math.PI / 180;

type Vec3 = [number, number, number];
type Dot = [sinLat: number, cosLat: number, lonRad: number];

// máscara de terra (grade de 2°) decodificada uma vez, com menos pontos perto dos polos
let dotsCache: Dot[] | null = null;
function landDots(): Dot[] {
  if (dotsCache) return dotsCache;
  let bits = "";
  for (const ch of LAND) bits += parseInt(ch, 16).toString(2).padStart(4, "0");
  const dots: Dot[] = [];
  for (let r = 0; r < ROWS; r++) {
    const lat = 88 - 2 * r;
    const step = Math.max(1, Math.round(1 / Math.cos(lat * D)));
    for (let c = 0; c < COLS; c++) {
      if (c % step) continue;
      if (bits[r * COLS + c] === "1") {
        const la = lat * D;
        dots.push([Math.sin(la), Math.cos(la), (-180 + 2 * c) * D]);
      }
    }
  }
  dotsCache = dots;
  return dots;
}

function vec(lat: number, lon: number): Vec3 {
  const a = lat * D;
  const b = lon * D;
  return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)];
}

function slerp(a: Vec3, b: Vec3, om: number, t: number): Vec3 {
  if (om < 1e-6) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

export type GeoPoint = { lat: number; lon: number };
export type GlobeTarget = GeoPoint & { name: string };

export type GlobeOptions = {
  origin?: GeoPoint;
  targets: GlobeTarget[];
  /** "both": arcos ímpares vão do destino para a origem */
  mode?: "oneway" | "both";
  rotate?: "sway" | "spin" | "none";
  /** frequência do balanço, ou °/s no giro */
  speed?: number;
  /** amplitude do balanço, em graus */
  amp?: number;
  lon?: number;
  lat?: number;
  labels?: boolean;
  originLabel?: string;
  /** true: arrasta nos dois eixos; "x": só para os lados (mantém a rolagem vertical no celular) */
  drag?: boolean | "x";
  arcColor?: string;
  headColor?: string;
  pointColor?: string;
  /** trio RGB dos pontos de terra, ex.: "200,200,200" */
  dotColor?: string;
  cycle?: number;
  stagger?: number;
  /** raio do globo como fração do lado menor do container (função = recalculada a cada resize) */
  radiusRatio?: number | (() => number);
  /** quanto o canvas passa do container em cada lado (fração do lado), para os arcos não serem cortados */
  bleed?: number;
};

type Arc = { from: Vec3; to: Vec3; end: GeoPoint; om: number; h: number; name: string };

export function mountGlobe(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  o: GlobeOptions,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };

  const dots = landDots();
  const origin = o.origin ?? { lat: -23.55, lon: -46.63 };
  const A = vec(origin.lat, origin.lon);
  const arcs: Arc[] = o.targets.map((t, i) => {
    const B = vec(t.lat, t.lon);
    const om = Math.acos(Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])));
    const rev = o.mode === "both" && i % 2 === 1;
    return {
      from: rev ? B : A,
      to: rev ? A : B,
      end: rev ? origin : t,
      om,
      h: 0.12 + (0.35 * om) / Math.PI,
      name: t.name,
    };
  });

  const arcColor = o.arcColor ?? "#ffb21e";
  const headColor = o.headColor ?? "#fff6dc";
  const pointColor = o.pointColor ?? "#ffb21e";
  const dotColor = o.dotColor ?? "200,200,200";
  const baseLat = o.lat ?? 8;
  const baseLon = o.lon ?? -38;
  const view = { lon: baseLon, lat: baseLat };
  const dragAxis = o.drag === "x" ? "x" : o.drag ? "both" : null;
  const radiusRatio = o.radiusRatio ?? 0.42;
  const bleed = o.bleed ?? 0.1;
  const fontFamily = getComputedStyle(canvas).fontFamily || "sans-serif";

  // geometria em pixels CSS, recalculada no resize
  let size = 0;
  let R = 0;
  let cx = 0;
  let cy = 0;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduce = motionQuery.matches;
  let inView = true;
  let pageVisible = document.visibilityState !== "hidden";

  let raf = 0;
  let running = false;
  let elapsed = 0;
  let prev = 0;

  // rotação automática: giro acumulado e fase do balanço (congelam durante o arrasto)
  let spinLon = 0;
  let swayT = 0;

  // arrasto: o globo segue o alvo com suavização e, ao soltar, continua com inércia
  let drag: { x: number; y: number; lon: number; lat: number; lastT: number } | null = null;
  let offLon = 0;
  let targetLon = 0;
  let lat = baseLat;
  let targetLat = baseLat;
  let vel = 0; // °/s
  let lastInput = -1e9;

  function updateView() {
    const sway =
      o.rotate === "sway" ? (o.amp ?? 22) * Math.sin(swayT * (o.speed ?? 0.18)) : 0;
    view.lon = baseLon + spinLon + sway + offLon;
    view.lat = lat;
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    const side = Math.min(rect.width, rect.height);
    if (!side) return;
    size = side * (1 + 2 * bleed);
    R = side * (typeof radiusRatio === "function" ? radiusRatio() : radiusRatio);
    cx = size / 2;
    cy = size / 2;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.style.left = `${(rect.width - size) / 2}px`;
    canvas.style.top = `${(rect.height - size) / 2}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!running) draw(reduce ? 2.2 : elapsed);
  }

  function proj(v: Vec3, r: number, cp0: number, sp0: number) {
    const lon = Math.atan2(v[1], v[0]);
    const sl = v[2];
    const cl = Math.sqrt(Math.max(0, 1 - sl * sl));
    const dl = lon - view.lon * D;
    const cd = Math.cos(dl);
    const x = cl * Math.sin(dl);
    const y = cp0 * sl - sp0 * cl * cd;
    const z = sp0 * sl + cp0 * cl * cd;
    // [x tela, y tela, profundidade, distância² ao centro em raios]
    return [cx + R * r * x, cy - R * r * y, z, r * r * (x * x + y * y)];
  }

  function frame(now: number) {
    // tempo real (só corta saltos grandes); a rotação usa passo menor, como no original
    const real = Math.min(0.25, Math.max(0, (now - prev) / 1000));
    const dt = Math.min(0.05, real);
    prev = now;
    elapsed += real;
    const t = elapsed;

    if (!drag) {
      swayT += dt;
      if (o.rotate === "spin") spinLon += (o.speed ?? 6) * dt;
    }

    if (dragAxis) {
      if (!drag) {
        // inércia com atrito independente da taxa de quadros
        targetLon += vel * dt;
        vel *= Math.exp(-3 * dt);
        if (Math.abs(vel) < 0.5) vel = 0;
        // depois de um tempo parado, volta devagar para a posição inicial
        if (o.rotate !== "spin" && vel === 0 && now - lastInput > 4000) {
          const back = 1 - Math.exp(-0.6 * dt);
          targetLon -= targetLon * back;
          targetLat += (baseLat - targetLat) * back;
        }
      }
      const follow = 1 - Math.exp(-14 * dt);
      offLon += (targetLon - offLon) * follow;
      lat += (targetLat - lat) * follow;
    }

    updateView();
    draw(t);
    raf = requestAnimationFrame(frame);
  }

  function draw(t: number) {
    if (!size) return;
    const c = ctx!;
    const cp0 = Math.cos(view.lat * D);
    const sp0 = Math.sin(view.lat * D);
    c.clearRect(0, 0, size, size);

    // esfera + anel com brilho
    c.save();
    c.beginPath();
    c.arc(cx, cy, R, 0, Math.PI * 2);
    c.fillStyle = "#000";
    c.fill();
    const g = c.createRadialGradient(cx, cy, R * 0.55, cx, cy, R);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(255,255,255,0.10)");
    c.fillStyle = g;
    c.fill();
    c.shadowColor = "rgba(255,255,255,0.85)";
    c.shadowBlur = Math.max(14, R * 0.15);
    c.lineWidth = Math.max(2, R * 0.017);
    c.strokeStyle = "#f5f5f5";
    c.stroke();
    c.restore();

    // pontos de terra (tamanho acompanha o raio)
    const scale = R / 170;
    const l0 = view.lon * D;
    for (const d of dots) {
      const dl = d[2] - l0;
      const cd = Math.cos(dl);
      const z = sp0 * d[0] + cp0 * d[1] * cd;
      if (z <= 0.02) continue;
      const x = d[1] * Math.sin(dl);
      const y = cp0 * d[0] - sp0 * d[1] * cd;
      c.fillStyle = `rgba(${dotColor},${(0.18 + 0.62 * z).toFixed(2)})`;
      const s = (0.8 + 0.7 * z) * scale;
      c.fillRect(cx + R * x - s / 2, cy - R * y - s / 2, s, s);
    }

    // arcos: cresce → cauda persegue → onda na chegada
    const cycle = o.cycle ?? 5.4;
    const stagger = o.stagger ?? 0.9;
    const grow = 1.3;
    const chase = 0.9;
    arcs.forEach((a, i) => {
      if (t - i * stagger < 0) return;
      const lt = (((t - i * stagger) % cycle) + cycle) % cycle;
      const head = Math.min(1, lt / grow);
      const tail = Math.max(0, Math.min(1, (lt - grow * 0.75) / chase));
      if (tail >= 1) {
        ripple(a.end, lt - grow, cp0, sp0, a.name, scale);
        return;
      }

      // curvatura em tela, para o arco não parecer reto quando cruza o centro
      const s0 = proj(a.from, 1, cp0, sp0);
      const e0 = proj(a.to, 1, cp0, sp0);
      const dx = e0[0] - s0[0];
      const dy = e0[1] - s0[1];
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      let nx = -dy / len;
      let ny = dx / len;
      if (ny > 0) {
        nx = -nx;
        ny = -ny;
      }
      const bend = 0.2 * len;

      const N = 56;
      const pts: number[][] = [];
      for (let k = 0; k <= N; k++) {
        const u = tail + ((head - tail) * k) / N;
        const sn = Math.sin(Math.PI * u);
        const p = proj(slerp(a.from, a.to, a.om, u), 1 + a.h * sn, cp0, sp0);
        p[0] += nx * bend * sn;
        p[1] += ny * bend * sn;
        p.push(k / N);
        pts.push(p);
      }

      c.save();
      c.lineCap = "round";
      for (let k = 1; k < pts.length; k++) {
        const p1 = pts[k - 1];
        const p2 = pts[k];
        if (!(p2[2] > 0 || p2[3] > 1)) continue;
        c.strokeStyle = hexA(arcColor, 0.15 + 0.85 * p2[4]);
        c.lineWidth = (1 + 1.2 * p2[4]) * scale;
        c.beginPath();
        c.moveTo(p1[0], p1[1]);
        c.lineTo(p2[0], p2[1]);
        c.stroke();
      }
      const hp = pts[pts.length - 1];
      if (head < 1 && (hp[2] > 0 || hp[3] > 1)) {
        c.shadowColor = arcColor;
        c.shadowBlur = 14 * scale;
        c.fillStyle = headColor;
        c.beginPath();
        c.arc(hp[0], hp[1], 2.6 * scale, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
      if (head >= 1) ripple(a.end, lt - grow, cp0, sp0, a.name, scale);
    });

    // origem pulsando
    const op = proj(A, 1, cp0, sp0);
    if (op[2] > 0) {
      for (let r = 0; r < 2; r++) {
        const ph = (t * 0.7 + r * 0.5) % 1;
        c.beginPath();
        c.arc(op[0], op[1], (4 + ph * 22) * scale, 0, Math.PI * 2);
        c.strokeStyle = hexA(pointColor, 0.7 * (1 - ph));
        c.lineWidth = 1.5;
        c.stroke();
      }
      c.save();
      c.shadowColor = pointColor;
      c.shadowBlur = 16 * scale;
      c.fillStyle = pointColor;
      c.beginPath();
      c.arc(op[0], op[1], 4.5 * scale, 0, Math.PI * 2);
      c.fill();
      c.restore();
      if (o.originLabel) label(op[0], op[1], o.originLabel, 1);
    }
  }

  function ripple(end: GeoPoint, rt: number, cp0: number, sp0: number, name: string, scale: number) {
    if (rt < 0 || rt > 1.6) return;
    const c = ctx!;
    const p = proj(vec(end.lat, end.lon), 1, cp0, sp0);
    if (p[2] <= 0) return;
    const k = Math.min(1, rt / 0.9);
    c.beginPath();
    c.arc(p[0], p[1], (2 + k * 14) * scale, 0, Math.PI * 2);
    c.strokeStyle = hexA(arcColor, 0.8 * (1 - k));
    c.lineWidth = 1.4;
    c.stroke();
    c.fillStyle = hexA(headColor, 1 - rt / 1.6);
    c.beginPath();
    c.arc(p[0], p[1], 2.2 * scale, 0, Math.PI * 2);
    c.fill();
    if (o.labels && name) label(p[0], p[1], name, Math.min(1, (1.6 - rt) * 2));
  }

  function label(x: number, y: number, text: string, alpha: number) {
    const c = ctx!;
    c.save();
    c.globalAlpha = Math.max(0, alpha);
    c.font = `500 11px ${fontFamily}`;
    const w = c.measureText(text).width + 14;
    let lx = x + 10;
    const ly = y - 24;
    if (lx + w > size - 4) lx = x - 10 - w;
    c.fillStyle = "rgba(20,20,20,0.92)";
    c.strokeStyle = "rgba(255,255,255,0.18)";
    c.beginPath();
    c.roundRect(lx, ly, w, 20, 10);
    c.fill();
    c.stroke();
    c.fillStyle = "#f2f2f2";
    c.fillText(text, lx + 7, ly + 14);
    c.restore();
  }

  // laço só roda visível, na tela e sem reduced-motion
  function sync() {
    const shouldRun = !reduce && inView && pageVisible && size > 0;
    if (shouldRun && !running) {
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
    if (reduce) draw(2.2);
  }

  const onMotionChange = () => {
    reduce = motionQuery.matches;
    sync();
  };
  const onVisibility = () => {
    pageVisible = document.visibilityState !== "hidden";
    sync();
  };

  function onDown(e: PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag = { x: e.clientX, y: e.clientY, lon: targetLon, lat: targetLat, lastT: e.timeStamp };
    vel = 0;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ponteiro já liberado: o arrasto segue só enquanto estiver sobre o canvas
    }
    canvas.style.cursor = "grabbing";
  }
  function onMove(e: PointerEvent) {
    if (!drag || !R) return;
    // ~1 raio arrastado = ~1 radiano: a superfície acompanha o dedo em qualquer tamanho
    const next = drag.lon - ((e.clientX - drag.x) * 60) / R;
    const step = (e.timeStamp - drag.lastT) / 1000;
    if (step > 0) vel = 0.7 * ((next - targetLon) / step) + 0.3 * vel;
    drag.lastT = e.timeStamp;
    targetLon = next;
    if (dragAxis === "both") {
      targetLat = Math.max(-35, Math.min(45, drag.lat + ((e.clientY - drag.y) * 42) / R));
    }
    lastInput = performance.now();
    if (!running) {
      offLon = targetLon;
      lat = targetLat;
      updateView();
      draw(reduce ? 2.2 : elapsed);
    }
  }
  function onUp(e: PointerEvent) {
    if (!drag) return;
    // soltou parado: sem inércia; arremesso rápido: limitado para não girar demais
    if (e.timeStamp - drag.lastT > 90) vel = 0;
    vel = Math.max(-360, Math.min(360, vel));
    drag = null;
    canvas.style.cursor = "grab";
    lastInput = performance.now();
  }

  if (dragAxis) {
    canvas.style.cursor = "grab";
    // só horizontal: a rolagem vertical da página continua funcionando no celular
    canvas.style.touchAction = dragAxis === "x" ? "pan-y" : "none";
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("lostpointercapture", onUp);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  intersectionObserver.observe(container);
  motionQuery.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  sync();

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
      if (dragAxis) {
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
        canvas.removeEventListener("lostpointercapture", onUp);
      }
    },
  };
}
