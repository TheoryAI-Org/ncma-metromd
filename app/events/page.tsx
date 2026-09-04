import type { Metadata } from "next";
import { NextMeeting } from "@/components/events/next-meeting";
import { PastMeetingsTable } from "@/components/events/past-meetings-table";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "Events | NCMA MetroMD",
  description:
    "Dinner meetings run March through January, third Thursday at 5:30 PM. Tickets are on Eventbrite and the venue rotates around Metro Maryland.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | NCMA MetroMD",
    description:
      "Third Thursday, 5:30 PM. The chapter's dinner meetings, training sessions and spring kick-off.",
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
      <h1 style={{ fontSize: 54, maxWidth: "20ch", margin: "16px 0 20px" }}>
        Third Thursday, 5:30 PM
      </h1>
      <p className="lede" style={{ fontSize: 20, maxWidth: "58ch", margin: "0 0 36px" }}>
        Dinner meetings run March through January. Tickets are on Eventbrite, and
        the venue rotates around Metro Maryland.
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

      <h2
        className="rule-section"
        style={{ fontSize: 32, margin: "64px 0 4px", paddingTop: 24 }}
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
