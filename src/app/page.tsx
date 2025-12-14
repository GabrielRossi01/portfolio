"use client";

import Navbar from '@/components/Navbar';
import ThemeLanguageControls from '@/components/ThemeLanguageControls';
import LunarHorizonCSS from '@/components/LunarHorizonCSS';
import TechStackMarquee from '@/components/TechStackMarquee';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ThemeLanguageControls />
      <LunarHorizonCSS />
      <TechStackMarquee />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}