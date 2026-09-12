import type { Metadata } from "next";
import { NextMeeting } from "@/components/events/next-meeting";
import { PastMeetingsTable } from "@/components/events/past-meetings-table";
import { UpcomingEvents } from "@/components/events/upcoming-events";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "Events | NCMA MetroMD",
  description:
    "Dinner meetings, workshops and training sessions run most months. Tickets are on Eventbrite and the venue rotates around Metro Maryland.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | NCMA MetroMD",
    description:
      "The chapter's dinner meetings, workshops and training sessions. Tickets are on Eventbrite.",
    url: "/events",
  },
};

// Rendered per request so the Eventbrite listing is never served stale.
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let upcomingEvents: Event[] = [];
  let pastEvents: Event[] = [];
  let errorMessage: string | null = null;

  try {
    const events = await fetchEventbriteEvents();
    upcomingEvents = events.upcomingEvents;
    pastEvents = events.pastEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
  }

  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <p className="kick">Events</p>
      <h1 style={{ fontSize: "clamp(31px, 7.6vw, 54px)", maxWidth: "20ch", margin: "16px 0 20px" }}>
        Chapter events
      </h1>
      <p className="lede" style={{ fontSize: 20, maxWidth: "58ch", margin: "0 0 36px" }}>
        Dinner meetings, workshops and training sessions run most months.
        Tickets are on Eventbrite, and the venue rotates around Metro Maryland.
      </p>

      <NextMeeting
        event={upcomingEvents[0]}
        emptyCopy="The next dinner meeting is being scheduled. Registration opens on Eventbrite about four weeks ahead, and the newsletter goes out the same day."
        ctaLabel="Our Eventbrite page"
        ctaAsButton
        style={{ maxWidth: 760, padding: "26px 28px" }}
      />

      {errorMessage && (
        <p
          style={{
            marginTop: 20,
            fontSize: 16,
            color: "var(--color-accent-700)",
            maxWidth: "58ch",
          }}
        >
          The live calendar could not be loaded ({errorMessage}). The archive
          below is shown from the chapter&rsquo;s own records.
        </p>
      )}

      {/* The soonest listing already has the panel above, so the grid picks up
          from the one after it and the section disappears when there is none. */}
      {upcomingEvents.length > 1 && (
        <>
          <h2
            className="rule-section"
            style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "64px 0 4px", paddingTop: 24 }}
          >
            Also coming up
          </h2>
          <p style={{ fontSize: 17, color: "var(--color-neutral-700)", margin: 0 }}>
            Every listing links straight through to Eventbrite.
          </p>
          <UpcomingEvents events={upcomingEvents.slice(1)} />
        </>
      )}

      <h2
        className="rule-section"
        style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "64px 0 4px", paddingTop: 24 }}
      >
        Past meetings
      </h2>
      <p style={{ fontSize: 17, color: "var(--color-neutral-700)", margin: "0 0 8px" }}>
        Slides and recordings are posted in the member area once it opens.
      </p>
      <PastMeetingsTable events={pastEvents} />
    </main>
  );
}
