"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, Group } from "three";

export default function OrbitalSphere3D() {
  const groupRef = useRef<Group>(null);
  const sphereRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !sphereRef.current) {
      return;
    }

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x +=
      (pointerY * 0.18 - groupRef.current.rotation.x) * 0.025;
    groupRef.current.rotation.z +=
      (pointerX * 0.12 - groupRef.current.rotation.z) * 0.025;

    sphereRef.current.rotation.y -= delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Halo externo */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshBasicMaterial
          color="#ff681f"
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>

      {/* Núcleo escuro da esfera */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshBasicMaterial color="#110b08" transparent opacity={0.92} />
      </mesh>

      {/* Wireframe principal */}
      <mesh scale={1.01}>
        <sphereGeometry args={[1.35, 28, 18]} />
        <meshBasicMaterial
          color="#ff6b22"
          wireframe
          transparent
          opacity={0.64}
          depthWrite={false}
        />
      </mesh>

      {/* Linha orbital horizontal */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.42, 0.012, 12, 96]} />
        <meshBasicMaterial
          color="#ff7b2f"
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>

      {/* Linha orbital inclinada 1 */}
      <mesh rotation={[Math.PI / 3.2, 0.25, 0.2]}>
        <torusGeometry args={[1.48, 0.01, 12, 96]} />
        <meshBasicMaterial
          color="#ff9a54"
          transparent
          opacity={0.78}
          depthWrite={false}
        />
      </mesh>

      {/* Linha orbital inclinada 2 */}
      <mesh rotation={[-Math.PI / 4, 0.7, 0.45]}>
        <torusGeometry args={[1.52, 0.008, 12, 96]} />
        <meshBasicMaterial
          color="#f4511e"
          transparent
          opacity={0.62}
          depthWrite={false}
        />
      </mesh>

      {/* Pequeno núcleo luminoso */}
      <mesh scale={0.11}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#ffb27a" transparent opacity={0.9} />
      </mesh>

      {/* Pontos orbitais */}
      <mesh position={[1.78, 0.35, 0.18]} scale={0.045}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffb27a" />
      </mesh>

      <mesh position={[-1.68, -0.5, 0.3]} scale={0.03}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ff7b2f" />
      </mesh>

      <mesh position={[0.4, 1.62, -0.3]} scale={0.025}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffd0ad" />
      </mesh>
    </group>
  );
}
