---
name: globe-arcs
description: Dotted globe with animated arcs between cities, drawn on a plain <canvas> with no dependencies. Use when building or changing a globe, world map with flight/connection arcs, "remote / available worldwide" location card, or any dotted-earth visualization in React/Next.js — instead of reaching for three.js, cobe or globe.gl.
---

# globe-arcs

A dependency-free dotted globe on a 2D `<canvas>`: land mask baked into the
script, orthographic projection, arcs animated from an origin city to targets,
a pulsing origin point, ripples on arrival, optional city labels, rotation and
drag with inertia.

Reference implementation: [scripts/globe-arcs.js](scripts/globe-arcs.js)
(plain browser script, exposes `window.GlobeArcs.mount(canvas, options)`).
Port it to TypeScript inside a client component rather than loading it as a
global script.

## Technique

### Land mask
- `LAND` is a hex string encoding a 2° grid: 89 rows (lat 88 → −88) × 180
  columns (lon −180 → 178). Each hex char is 4 bits; bit `1` = land.
- Decoded once at module load into `dots: [sinLat, cosLat, lonRad]`.
- Columns are thinned toward the poles with `step = round(1 / cos(lat))` so
  dot density stays even on the sphere.

### Orthographic projection
- View center `(view.lat, view.lon)`. For a dot at `(φ, λ)`, with `Δλ = λ − view.lon`:
  - `x = cosφ · sinΔλ`
  - `y = cosφ₀ · sinφ − sinφ₀ · cosφ · cosΔλ`
  - `z = sinφ₀ · sinφ + cosφ₀ · cosφ · cosΔλ` (depth; `z > 0` faces the viewer)
- Screen: `(cx + R·x, cy − R·y)`. Back-facing dots (`z ≤ 0.02`) are skipped.
- Dot alpha and size scale with `z`, which gives the sphere its shading for free.
- Sphere body: black disc, faint radial gradient toward the rim, white stroke
  with `shadowBlur` for the glowing ring.

### Arcs
- Endpoints are unit vectors (`vec(lat, lon)`); `om` is the angle between them.
- Points along the arc: `slerp(from, to, om, u)` for `u ∈ [tail, head]`,
  lifted off the surface by `1 + h · sin(πu)`, where `h = 0.12 + 0.35 · om/π`
  (longer arcs fly higher).
- **Screen-space bend:** each point is also offset along the screen normal of
  the chord by `0.2 · chordLength · sin(πu)`, always bending upward. Without
  this, arcs that cross the globe's center read as straight lines.
- A segment is drawn if it is in front (`z > 0`) or lifted outside the disc
  (`r²(x²+y²) > 1`), so arcs stay visible as they pass over the limb.
- Opacity and width grow toward the head, giving a comet-like trail.

### Arc animation cycle
Each arc `i` starts at `i · stagger` and loops every `cycle` seconds:
1. **Grow** (`grow = 1.3s`): `head` goes 0 → 1, with a glowing head dot.
2. **Tail chases** (starts at `0.75 · grow`, lasts `chase = 0.9s`): `tail` goes 0 → 1.
3. **Ripple on arrival** (from `head = 1`, 1.6s): an expanding ring plus a fading
   dot at the destination; the city label fades with it.

The origin has two staggered pulsing rings plus a solid glowing point.

## `mount(canvas, options)` options

| Option | Default | Meaning |
|---|---|---|
| `size` | `440` | Canvas CSS size in px (square). |
| `radius` | `170` | Globe radius in px. |
| `origin` | São Paulo `{ lat: -23.55, lon: -46.63 }` | Where arcs start. |
| `targets` | `[]` | `{ name, lat, lon }[]` arc destinations. |
| `mode` | one-way | `'both'`: every odd arc runs target → origin (two-way traffic). |
| `rotate` | none | `'sway'` (oscillate around the start longitude) or `'spin'` (continuous). |
| `speed` | `0.18` sway / `6` spin | Sway frequency, or spin speed in °/s. |
| `amp` | `22` | Sway amplitude in degrees. |
| `lon`, `lat` | `-38`, `8` | Initial view center. |
| `labels` | `false` | Show the city name on arrival. |
| `originLabel` | — | Text shown next to the origin point (e.g. `"UTC−3"`). |
| `drag` | `false` | Drag to rotate, with inertia; eases back to the start after 2.5s idle. In the React port (`globeEngine.ts`), `"x"` limits it to horizontal drag and keeps `touch-action: pan-y`, so the page still scrolls vertically on phones. |
| `arcColor` | `#ffb21e` | Arc and ripple color (hex). |
| `headColor` | `#fff6dc` | Arc head and arrival dot (hex). |
| `pointColor` | `#ffb21e` | Origin point and its pulse (hex). |
| `dotColor` | `'200,200,200'` | Land dot RGB triplet (alpha is computed). |
| `cycle` | `5.4` | Seconds per arc loop. |
| `stagger` | `0.9` | Delay between consecutive arcs, in seconds. |

Returns `{ stop() }`, which cancels the frame loop and removes the listeners.

## React / Next.js usage

Port the script to a `"use client"` component; keep the math in a plain module
(no React state per frame). Sketch:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { mountGlobe, type GlobeOptions } from "./globeEngine"; // not "globeArcs.ts": clashes with GlobeArcs.tsx on case-insensitive filesystems

export default function GlobeArcs({ options, label }: { options: GlobeOptions; label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const globe = mountGlobe(canvas, wrap, options); // sizes itself from wrap via ResizeObserver
    return () => globe.destroy();              // cancelAnimationFrame + all listeners/observers
  }, [options]);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <canvas ref={canvasRef} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
```

Load it with `dynamic(() => import("./GlobeArcs"), { ssr: false })` so nothing
touches `window` or the canvas during SSR. Memoize `options` (module constant
or `useMemo`) so the effect doesn't remount every render.

## Performance rules
- Size the backing store with `devicePixelRatio`, capped at **2**; draw in CSS
  pixels via `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`.
- Resize with a `ResizeObserver` on the wrapper; derive radius from the size
  (don't hard-code `size`/`radius` in a responsive layout).
- Pause the loop when off-screen (`IntersectionObserver`) and when the tab is
  hidden (`visibilitychange`); resume without a time jump (shift `t0`).
- Keep per-frame work allocation-light: no React state updates, no new
  gradients beyond the sphere's one, no DOM reads inside the loop.
- Decode the land mask once at module scope, not per mount.

## Accessibility rules
- `prefers-reduced-motion: reduce` → draw one static frame (arcs mid-flight,
  e.g. `t = 2.2`) and never start the loop. Listen for changes to the query.
- Canvas gets `role="img"` and a descriptive, translated `aria-label`
  (e.g. "Globe showing connections from São Paulo to Lisbon, London, …").
- Drag is an enhancement only. Use pointer events with pointer capture on the
  canvas. For horizontal-only drag use `touch-action: pan-y` (page still scrolls
  vertically); use `touch-action: none` **only** for two-axis drag, otherwise the
  card would block page scrolling on phones.
- Compose drag with auto-rotation as an offset (`baseLon + sway + dragOffset`)
  instead of writing `view.lon` directly — otherwise the sway snaps the globe
  back the moment the pointer is released. Smooth with exponential easing
  (`1 - exp(-k·dt)`) and decay inertia with `exp(-friction·dt)` so it feels the
  same at 30 and 120 fps.
- Labels drawn on canvas are decorative; put any important text in the DOM.
