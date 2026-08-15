import type { Metadata } from "next";
import { EventsContent } from "@/components/events-content";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "Events | NCMA MetroMD Chapter",
  description:
    "Monthly dinner meetings, training sessions and the spring kick-off. Tickets go through Eventbrite.",
};

// Rendered at request time so the Eventbrite listing is never stale.
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let upcomingEvents: Event[] = [];
  let pastEvents: Event[] = [];
  let errorMessage: string | null = null;

  try {
    ({ upcomingEvents, pastEvents } = await fetchEventbriteEvents());
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Calendar</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Events
      </h1>
      <p className="lede">
        Monthly dinner meetings, training sessions and the spring kick-off.
        Tickets go through Eventbrite and the listing here updates from the live
        feed.
      </p>

      {errorMessage && (
        <p className="mt-8 text-magenta-700">
          Error loading events: {errorMessage}
        </p>
      )}

      <EventsContent upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </div>
  );
}
