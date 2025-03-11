import { NavBar } from "@/components/nav-bar";
import { EventsHero } from "@/components/events-hero";
import { JoinSection } from "@/components/join-section";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import { EventsGridServer } from "@/components/events-grid-server";
import { Event } from "@/types/event";

// Set export const dynamic = 'force-dynamic' to ensure the page is rendered at request time
export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  let upcomingEvents: Event[] = [];
  let pastEvents: Event[] = [];

  try {
    // Fetch events from Eventbrite
    const events = await fetchEventbriteEvents();
    upcomingEvents = events.upcomingEvents;
    pastEvents = events.pastEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    // Continue with empty arrays if there's an error
  }

  return (
    <main>
      <NavBar />
      <EventsHero />
      <EventsGridServer upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <JoinSection />
    </main>
  );
}
