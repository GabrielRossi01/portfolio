"use client";

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail } from 'lucide-react';
import * as THREE from 'three';

function MoonHorizon() {
  const moonRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (moonRef.current) {
      // Rotação muito lenta para dar sensação de escala massiva
      moonRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={[0, -8, 0]}>
      {/* Esfera massiva da Lua - apenas a parte superior visível */}
      <mesh ref={moonRef} position={[0, 0, 0]}>
        <sphereGeometry args={[12, 128, 128]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
          emissive="#0a0a0a"
          emissiveIntensity={0.2}
        >
          {/* Textura de crateras procedural via displacement */}
        </meshStandardMaterial>
      </mesh>

      {/* Wireframe overlay sutil para detalhes de crateras */}
      <mesh position={[0, 0, 0]} rotation={moonRef.current?.rotation || [0, 0, 0]}>
        <sphereGeometry args={[12.05, 64, 64]} />
        <meshBasicMaterial
          wireframe
          color="#333333"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Rim light intenso - backlight dramático */}
      <pointLight 
        position={[0, 2, -15]} 
        intensity={8} 
        color="#00d9ff"
        distance={35}
      />
      
      {/* Segundo rim light para o contorno */}
      <pointLight 
        position={[8, 0, -12]} 
        intensity={5} 
        color="#8b5cf6"
        distance={30}
      />

      {/* Luz de preenchimento suave */}
      <pointLight 
        position={[-5, 5, 10]} 
        intensity={0.8} 
        color="#4a90e2"
        distance={25}
      />
    </group>
  );
}

export default function LunarHorizon() {
  const { t } = useLanguage();

  return (
    <section id="home" className="w-full h-screen relative">
      {/* Canvas 3D com a Lua */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={['#000000']} />
          
          {/* Luz ambiente muito suave */}
          <ambientLight intensity={0.05} />
          
          {/* Lua com Horizon */}
          <Suspense fallback={null}>
            <MoonHorizon />
          </Suspense>

          {/* Estrelas sutis no espaço profundo */}
          <Stars 
            radius={100} 
            depth={50} 
            count={3000} 
            factor={3} 
            saturation={0} 
            fade 
            speed={0.3}
          />
        </Canvas>
      </div>

      {/* Gradient overlay para melhor contraste do texto */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/60 pointer-events-none" />
      
      {/* Hero Content */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4">
        <div className="text-center max-w-4xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl text-gray-400 mb-4">
              {t.hero.greeting}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
              {t.hero.name}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 drop-shadow-lg">
              {t.hero.title}
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-full glass-strong hover:scale-105 transition-all duration-300 flex items-center gap-2 text-white font-medium shadow-2xl"
            >
              <Mail className="w-5 h-5" />
              {t.hero.ctaContact}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="/cv.pdf"
              download
              className="group relative px-8 py-4 rounded-full glass hover:scale-105 transition-all duration-300 flex items-center gap-2 text-white font-medium border border-white/20 shadow-2xl"
            >
              <Download className="w-5 h-5" />
              {t.hero.ctaCV}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}