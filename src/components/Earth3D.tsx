"use client";

import { memo, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { MapPin } from "lucide-react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Earth3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<{ destroy: () => void } | null>(null);
  const rafRef = useRef<number | null>(null);
  const renderSizeRef = useRef(0);

  const { language } = useLanguage();

  const remoteText = {
    "pt-BR": "REMOTO",
    en: "REMOTE",
    es: "REMOTO",
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const updateSize = () => {
      const rect = container.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      /*
       * Usa o menor eixo para preservar o formato circular.
       * No mobile, a margem é maior para que o globo não
       * dispute espaço com o label inferior.
       */
      const availableSize = Math.min(rect.width, rect.height);
      const sizeFactor = isMobile ? 0.72 : 0.86;
      const renderSize = Math.max(160, availableSize * sizeFactor);
      const pixelSize = Math.round(renderSize * pixelRatio);

      renderSizeRef.current = pixelSize;

      canvas.style.width = `${renderSize}px`;
      canvas.style.height = `${renderSize}px`;
      canvas.style.left = `${(rect.width - renderSize) / 2}px`;
      canvas.style.top = `${(rect.height - renderSize) / 2}px`;
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(container);

    const initialSize = renderSizeRef.current || 320;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: pixelRatio,
      width: initialSize,
      height: initialSize,
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
        {
          location: [-23.5505, -46.6333],
          size: 0.1,
        },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }

        const currentSize = renderSizeRef.current || initialSize;

        state.phi = phiRef.current + pointerInteractionMovement.current;

        state.width = currentSize;
        state.height = currentSize;
      },
    });

    rafRef.current = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      resizeObserver.disconnect();

      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current =
      event.clientX - pointerInteractionMovement.current;

    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;

    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      const delta = event.clientX - pointerInteracting.current;

      pointerInteractionMovement.current = delta * 0.008;
    }
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null && event.touches[0]) {
      const delta = event.touches[0].clientX - pointerInteracting.current;

      pointerInteractionMovement.current = delta * 0.008;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-visible"
    >
      <div className="absolute inset-0 overflow-visible rounded-2xl border-2 border-white/5">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="absolute block max-w-none"
          style={{
            cursor: "grab",
            touchAction: "none",
            contain: "layout paint size style",
            opacity: 0,
            transition: "opacity 1s ease",
            transform: "translateZ(0)",
            borderRadius: "9999px",
          }}
        />
      </div>

      <div className="absolute bottom-6 left-6 z-10 flex flex-col items-start gap-2">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full blur-lg"
            style={{
              transform: "translateZ(0)",
            }}
          />

          <div className="relative rounded-full bg-gray-900/80 p-2 backdrop-blur-sm dark:bg-white/15">
            <MapPin className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300/90">
            {remoteText[language]}
          </span>

          <span
            className="text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-white"
            style={{
              fontFamily: "Instrument Serif, serif",
            }}
          >
            SÃO PAULO
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Earth3D);
