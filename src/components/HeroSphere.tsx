"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import OrbitalSphere3D from "@/components/OrbitalSphere3D";

interface HeroSphereProps {
  /** Hero visível na tela: fora dela o canvas para de desenhar. */
  active: boolean;
  reduceMotion: boolean;
}

// Fica num arquivo próprio para o three.js sair do bundle inicial
// (o Hero importa este componente com next/dynamic, só no desktop).
export default function HeroSphere({ active, reduceMotion }: HeroSphereProps) {
  const frameloop = reduceMotion ? "demand" : active ? "always" : "never";

  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
    >
      <Suspense fallback={null}>
        <OrbitalSphere3D />
      </Suspense>
    </Canvas>
  );
}
