"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface Node {
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  size: number;
  color: string;
  orbitSpeed: number;
  orbitRadius: number;
  angle: number;
  basePosition: [number, number, number];
}

export default function HeroConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    group: THREE.Group;
    nodes: Node[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    
    const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight),
      2,
      0.4,
      0.3
    );
    composer.addPass(bloomPass);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Main group
    const group = new THREE.Group();
    scene.add(group);

    // Generate nodes
    const nodes: Node[] = [];
    const colors = ['#60a5fa', '#818cf8', '#c084fc', '#22d3ee', '#a78bfa'];
    
    // Central node
    const centralGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const centralMaterial = new THREE.MeshStandardMaterial({
      color: '#a78bfa',
      emissive: '#a78bfa',
      emissiveIntensity: 1.5,
      toneMapped: false,
    });
    const centralMesh = new THREE.Mesh(centralGeometry, centralMaterial);
    group.add(centralMesh);
    nodes.push({
      position: new THREE.Vector3(0, 0, 0),
      mesh: centralMesh,
      size: 0.4,
      color: '#a78bfa',
      orbitSpeed: 0,
      orbitRadius: 0,
      angle: 0,
      basePosition: [0, 0, 0]
    });

    // Satellite nodes
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 2;
      const nodeSize = 0.15 + Math.random() * 0.1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const nodeGeometry = new THREE.SphereGeometry(nodeSize, 32, 32);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.5,
        toneMapped: false,
      });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      const basePos: [number, number, number] = [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      ];
      nodeMesh.position.set(basePos[0], basePos[1], basePos[2]);
      group.add(nodeMesh);
      
      nodes.push({
        position: new THREE.Vector3(basePos[0], basePos[1], basePos[2]),
        mesh: nodeMesh,
        size: nodeSize,
        color: color,
        orbitSpeed: 0.1 + Math.random() * 0.2,
        orbitRadius: 0.2 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2,
        basePosition: basePos
      });
    }

    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#60a5fa', transparent: true, opacity: 0.3 });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].basePosition[0] - nodes[j].basePosition[0], 2) +
          Math.pow(nodes[i].basePosition[1] - nodes[j].basePosition[1], 2) +
          Math.pow(nodes[i].basePosition[2] - nodes[j].basePosition[2], 2)
        );
        
        if (distance < 4) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(nodes[i].basePosition[0], nodes[i].basePosition[1], nodes[i].basePosition[2]),
            new THREE.Vector3(nodes[j].basePosition[0], nodes[j].basePosition[1], nodes[j].basePosition[2])
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          group.add(line);
        }
      }
    }

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      
      // Rotate group slowly
      group.rotation.y += 0.001;
      
      // Mouse parallax
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouse.y * 0.2, 0.05);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouse.x * 0.2 + time * 0.001, 0.05);
      
      // Animate nodes
      nodes.forEach((node, index) => {
        if (index > 0) { // Skip central node
          node.mesh.rotation.y += 0.005;
          node.mesh.rotation.x += 0.003;
          
          const x = node.basePosition[0] + Math.cos(time * node.orbitSpeed + node.angle) * node.orbitRadius;
          const y = node.basePosition[1] + Math.sin(time * node.orbitSpeed * 0.5 + node.angle) * node.orbitRadius * 0.5;
          const z = node.basePosition[2] + Math.sin(time * node.orbitSpeed + node.angle) * node.orbitRadius;
          
          node.mesh.position.set(x, y, z);
        }
      });

      composer.render();
      sceneRef.current!.animationId = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      composer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    sceneRef.current = { renderer, composer, group, nodes, animationId: 0 };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[600px] relative" />;
}