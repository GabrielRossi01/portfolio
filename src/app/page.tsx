"use client";

import Navbar from '@/components/Navbar';
import LunarHorizonCSS from '@/components/HeroSection';
import TechStackMarquee from '@/components/TechStackMarquee';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LunarHorizonCSS />
      <TechStackMarquee />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}