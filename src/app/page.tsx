import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import DeferredSections from "@/components/DeferredSections";

// Server Component: todo o HTML sai do servidor. Navbar e hero hidratam na
// hora (são o que aparece primeiro); as seções de baixo só baixam e executam
// o JS quando chegam perto da tela ou na primeira interação.
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DeferredSections />
    </main>
  );
}
