"use client";

import { useEffect, useRef, memo } from 'react';
import createGlobe from 'cobe';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Earth3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const { language } = useLanguage();

  const remoteText = {
    'pt-BR': 'REMOTO',
    'en': 'REMOTE',
    'es': 'REMOTO',
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize, { passive: true });
    onResize();

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 1.5),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 8000,
      mapBrightness: 6,
      baseColor: [0.08, 0.08, 0.08],
      markerColor: [1, 0.5, 0],
      glowColor: [1, 1, 1],
      markers: [
        { location: [-23.5505, -46.6333], size: 0.1 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    rafRef.current = requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta * 0.008;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta * 0.008;
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full aspect-square rounded-2xl border-2 border-white/5 overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerOut={handlePointerUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            contain: 'layout paint size style',
            opacity: 0,
            transition: 'opacity 1s ease',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <div className="absolute bottom-8 left-8 flex flex-col items-start gap-2">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-lg"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="relative p-2 bg-gray-900/80 dark:bg-white/15 backdrop-blur-sm rounded-full">
            <MapPin className="w-6 h-6 text-white dark:text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-700 dark:text-gray-300/90 font-semibold tracking-widest uppercase">
            {remoteText[language]}
          </span>
          <span
            className="text-2xl font-bold text-gray-900 dark:text-white leading-none tracking-tight"
            style={{ fontFamily: 'Instrument Serif, serif' }}
          >
            SÃO PAULO
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Earth3D);
