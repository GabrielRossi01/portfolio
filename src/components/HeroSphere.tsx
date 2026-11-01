"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import OrbitalSphere3D from "@/components/OrbitalSphere3D";

// Separado do HeroSection para o Three.js ficar num chunk próprio,
// carregado só quando a esfera aparece (telas a partir de 768px).
export default function HeroSphere({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <Canvas
      className="cursor-grab active:cursor-grabbing"
      camera={{
        position: [0, 0, 4.8],
        fov: 42,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={reduceMotion ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <OrbitalSphere3D />
      </Suspense>
    </Canvas>
  );
}
