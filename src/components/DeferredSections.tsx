"use client";

import { lazy } from "react";
import LazyHydrate from "@/components/LazyHydrate";

/*
 * Seções abaixo da dobra, cada uma num chunk próprio.
 *
 * React.lazy (e não next/dynamic): o next/dynamic pré-carrega no início os
 * chunks das seções renderizadas no servidor, o que trazia todo o JS (e o
 * framer-motion, duplicado) para a carga inicial. Com React.lazy, o servidor
 * continua renderizando o HTML completo, e no navegador o import() só roda
 * quando o LazyHydrate libera a seção (perto da tela ou na 1ª interação).
 *
 * estimatedHeight: altura aproximada usada enquanto a seção ainda não foi
 * renderizada (content-visibility); depois o navegador guarda a real.
 */
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ScrollingBanner = lazy(() => import("@/components/ScrollingBanner"));
const GithubActivity = lazy(() => import("@/components/GithubActivity"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function DeferredSections() {
  return (
    <>
      <LazyHydrate estimatedHeight={2700}>
        <AboutSection />
      </LazyHydrate>
      <LazyHydrate estimatedHeight={4000}>
        <ProjectsSection />
      </LazyHydrate>
      <LazyHydrate estimatedHeight={120}>
        <ScrollingBanner />
      </LazyHydrate>
      <LazyHydrate estimatedHeight={600}>
        <GithubActivity />
      </LazyHydrate>
      {/* o modal de sucesso do formulário é position: fixed; com
          content-visibility ele ficaria preso ao wrapper */}
      <LazyHydrate renderWhenVisible={false}>
        <ContactSection />
      </LazyHydrate>
      <LazyHydrate estimatedHeight={320}>
        <Footer />
      </LazyHydrate>
    </>
  );
}
