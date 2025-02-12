import { NavBar } from "@/components/nav-bar";
import { CertsHero } from "@/components/certs-hero";
import { CertsContent } from "@/components/certs-content";
import { JoinSection } from "@/components/join-section";

export default function CertsPage() {
  return (
    <main>
      <NavBar />
      <CertsHero />
      <CertsContent />
      <JoinSection />
    </main>
  );
}
