import { NavBar } from "@/components/nav-bar";
import { EventsHero } from "@/components/events-hero";
import { EventsGrid } from "@/components/events-grid";
import { JoinSection } from "@/components/join-section";

export default function EventsPage() {
  return (
    <main>
      <NavBar />
      <EventsHero />
      <EventsGrid />
      <JoinSection />
    </main>
  );
}
