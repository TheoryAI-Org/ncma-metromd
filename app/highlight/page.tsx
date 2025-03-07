import { NavBar } from "@/components/nav-bar";
import { HighlightHero } from "@/components/highlight-hero";
import { HighlightContent } from "@/components/highlight-content";
import { JoinSection } from "@/components/join-section";

export default function HighlightPage() {
  return (
    <main>
      <NavBar />
      <HighlightHero />
      <HighlightContent />
      <JoinSection />
    </main>
  );
} 