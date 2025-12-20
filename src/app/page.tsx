"use client";

import Navbar from '@/components/Navbar';
import LunarHorizonCSS from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollingBanner from '@/components/ScrollingBanner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LunarHorizonCSS />
      <AboutSection />
      <ProjectsSection />
      <ScrollingBanner />
      <ContactSection />
      <Footer />
    </main>
  );
}
