"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Moon3D({ scrollY }: { scrollY: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    moon: THREE.Mesh;
    animationId: number;
  } | null>(null);
  const scrollYRef = useRef(scrollY);

  // Update scroll ref
  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 1);
    purpleLight.position.set(-5, 5, 5);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 0.5);
    blueLight.position.set(5, -5, -5);
    scene.add(blueLight);

    // Moon sphere
    const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.8,
      metalness: 0.2,
      emissive: '#8b5cf6',
      emissiveIntensity: 0.2,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // Moon glow
    const glowGeometry = new THREE.SphereGeometry(2.3, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: '#8b5cf6',
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Animation loop
    const animate = () => {
      moon.rotation.y += 0.002;
      moon.position.y = scrollYRef.current * 0.0005;
      glow.position.y = moon.position.y;

      renderer.render(scene, camera);
      sceneRef.current!.animationId = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    sceneRef.current = { renderer, moon, animationId: 0 };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      renderer.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}