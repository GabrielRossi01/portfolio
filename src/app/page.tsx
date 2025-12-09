"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ThemeLanguageControls from '@/components/ThemeLanguageControls';
import LunarHorizonCSS from '@/components/LunarHorizonCSS';
import TechStackMarquee from '@/components/TechStackMarquee';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <ThemeLanguageControls />
      <LunarHorizonCSS />
      <TechStackMarquee />
      <AboutSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}