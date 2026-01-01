"use client";

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import LunarHorizonCSS from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ScrollingBanner from '@/components/ScrollingBanner';

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <div className="h-screen bg-background" />,
});
const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="h-screen bg-background" />,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32 bg-background" />,
});

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
