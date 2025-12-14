"use client";

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { MapPin } from 'lucide-react';

export default function Earth3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0); // Track rotation

  useEffect(() => {
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: -0.8,
      theta: 0.4,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 16000,
      mapBrightness: 8,
      baseColor: [0.08, 0.08, 0.12],
      markerColor: [0.2, 0.8, 0.4],
      glowColor: [0.1, 0.6, 1],
      markers: [
        { location: [-23.5505, -46.6333], size: 0.08 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        
        state.phi = -0.8 + phiRef.current + pointerInteractionMovement.current;
        state.theta = 0.4;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    setTimeout(() => canvasRef.current && (canvasRef.current.style.opacity = '1'));
    
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full rounded-2xl border-2 overflow-hidden flex items-center justify-center bg-linear-to-b from-gray-900 via-slate-900 to-black">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = 'grabbing';
            }
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = 'grab';
            }
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) {
              canvasRef.current.style.cursor = 'grab';
            }
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.005;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.005;
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            contain: 'layout paint size',
            opacity: 0,
            transition: 'opacity 1s ease',
          }}
        />
      </div>

      {/* Location Badge */}
      <div className="absolute bottom-4 left-4 xs:bottom-6 xs:left-6 flex items-center gap-2 backdrop-blur-md bg-black/40 px-4 py-3 xs:px-5 xs:py-3 rounded-full border border-white/10 hover:border-white/20 transition-colors">
        <MapPin className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-400" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs xs:text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Remote
          </span>
          <span className="text-xs xs:text-sm font-bold text-white">
            Sao Paulo
          </span>
        </div>
      </div>
    </div>
  );
}