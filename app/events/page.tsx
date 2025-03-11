import { NavBar } from "@/components/nav-bar";
import { EventsHero } from "@/components/events-hero";
import { JoinSection } from "@/components/join-section";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import { EventsGridServer } from "@/components/events-grid-server";

export default async function EventsPage() {
  // Fetch events from Eventbrite
  const { upcomingEvents, pastEvents } = await fetchEventbriteEvents();

  return (
    <main>
      <NavBar />
      <EventsHero />
      <EventsGridServer upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <JoinSection />
    </main>
  );
}
