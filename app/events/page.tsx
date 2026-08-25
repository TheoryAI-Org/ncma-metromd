import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { UpcomingEvents } from "@/components/events/upcoming-events";
import { PastMeetingsTable } from "@/components/events/past-meetings-table";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import { EVENTBRITE_ORG_URL } from "@/data/site";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "Our Events | NCMA MetroMD",
  description:
    "Monthly dinner meetings, training sessions and the spring kick-off. Tickets go through Eventbrite and the listing updates from the live feed.",
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
    <main className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader kicker="Calendar" title="Our Events">
        <p className="lede">
          Monthly dinner meetings, training sessions and the spring kick-off. Tickets go
          through Eventbrite and the listing here updates from the live feed.
        </p>
      </PageHeader>

      <h3 style={{ fontSize: 28, margin: "56px 0 16px" }}>Upcoming</h3>
      <div
        className="stack-md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
          {upcomingEvents.length > 0
            ? `${upcomingEvents.length} event${upcomingEvents.length === 1 ? "" : "s"} open for registration.`
            : "Nothing is open for registration right now — the next meeting is being scheduled."}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            className="btn btn-primary"
            href={EVENTBRITE_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Eventbrite
          </a>
          <Link className="btn btn-secondary" href="/insights">
            Get the newsletter
          </Link>
        </div>
      </div>

      {errorMessage && (
        <p style={{ marginTop: 20, fontSize: 15, color: "var(--color-accent-2-700)" }}>
          The live calendar could not be loaded ({errorMessage}). The archive below is shown
          from the chapter’s own records.
        </p>
      )}

      {upcomingEvents.length > 0 && <UpcomingEvents events={upcomingEvents} />}

      <h3 style={{ fontSize: 28, margin: "64px 0 16px" }}>Past meetings</h3>
      <PastMeetingsTable events={pastEvents} />
    </main>
  );
}
