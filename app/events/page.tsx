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
  let errorMessage: string | null = null;

  console.log('Rendering EventsPage component');

  try {
    console.log('Fetching events from Eventbrite');
    // Fetch events from Eventbrite
    const events = await fetchEventbriteEvents();
    upcomingEvents = events.upcomingEvents;
    pastEvents = events.pastEvents;
    
    console.log('Events fetched successfully', {
      upcomingCount: upcomingEvents.length,
      pastCount: pastEvents.length
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    // Continue with empty arrays if there's an error
  }

  return (
    <>
      <EventsHero />
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-red-500">Error loading events: {errorMessage}</p>
        </div>
      )}
      <EventsGridServer upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      <JoinSection />
    </>
  );
}
