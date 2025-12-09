"use client";

import { motion } from 'framer-motion';
import Moon3D from './Moon3D';
import { ArrowDown } from 'lucide-react';

export default function HeroSection({ scrollY }: { scrollY: number }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Moon3D scrollY={scrollY} />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Back-End Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Building scalable systems and robust APIs with modern technologies
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-strong inline-block px-8 py-4 rounded-full"
          >
            <p className="text-lg text-gray-300">
              Node.js • Python • Go • Docker • Kubernetes
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ArrowDown className="w-6 h-6 text-purple-400" />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black pointer-events-none" />
    </section>
  );
}
