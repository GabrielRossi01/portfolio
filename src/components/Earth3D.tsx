"use client";

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { MapPin, Radio, Activity } from 'lucide-react';

export default function Earth3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

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
      
      // MUDANÇA: Aumentei o brilho do mapa terrestre
      mapBrightness: 10,
      
      baseColor: [0.08, 0.08, 0.08],
      
      // MUDANÇA: Aumentei MUITO o brilho (Glow). Valores acima de 1 criam "bloom".
      // [1.3, 1.3, 1.3] cria um halo branco intenso ao redor do globo P&B.
      glowColor: [1.3, 1.3, 1.3], 
      
      markerColor: [1, 0.5, 0], // Laranja vibrante mantido

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
      {/* MUDANÇA DE BACKGROUND: 
         Troquei o tom cinza/slate por um gradiente de "espaço profundo" mais rico 
         (Indigo profundo -> Zinco escuro -> Preto total) para fazer o laranja e o brilho branco saltarem.
         Usei bg-gradient-to-b (padrão tailwind) em vez de bg-linear-to-b.
      */}
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

      <div className="absolute bottom-8 left-4 xs:bottom-6 xs:left-6 w-auto min-w-60 backdrop-blur-xl bg-black/60 p-4 rounded-3xl border border-white/15 shadow-2xl shadow-orange-500/10 overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
        
        {/* Efeito de brilho laranja sutil no topo do card ao passar o mouse */}
        <div className="absolute inset-x-0 h-px top-0 bg-linear-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex flex-col gap-3 relative z-10">
         
          {/* Corpo Principal: Localização */}
          <div className="flex items-center gap-3 pl-1">
            <div className="bg-orange-500/20 p-2 rounded-full">
               <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium">
                Remote
              </span>
              <span className="text-lg font-bold text-white leading-tight">
                São Paulo
              </span>
            </div>
          </div>

           {/* Rodapé do Card: Visualizador de Rede/Dados */}
           

        </div>
      </div>
    </div>
  );
}