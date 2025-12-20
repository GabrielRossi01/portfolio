"use client";


import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';


export default function Earth3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const { language } = useLanguage();


  const remoteText = {
    'pt-BR': 'REMOTO',
    'en': 'REMOTE',
    'es': 'REMOTO',
  };


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
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 10,
      baseColor: [0.08, 0.08, 0.08],
      glowColor: [1.3, 1.3, 1.3],
      markerColor: [1, 0.5, 0],
      markers: [
        { location: [-23.5505, -46.6333], size: 0.1 },
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
      <div className="w-full h-full rounded-2xl border-2 border-white/5 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.008;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.008;
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            contain: 'layout paint size',
            opacity: 0,
            transition: 'opacity 1s ease',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      </div>


      <div className="absolute bottom-8 left-8 backdrop-blur-md bg-black/70 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-sm"></div>
            <div className="relative p-2.5 bg-white/10 rounded-full">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
              {remoteText[language]}
            </span>
            <span className="text-xl font-semibold text-white leading-tight tracking-tight">
              SÃO PAULO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
