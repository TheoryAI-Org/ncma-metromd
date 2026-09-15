import type { Metadata } from "next";
import { NextMeeting } from "@/components/events/next-meeting";
import { PastMeetingsTable } from "@/components/events/past-meetings-table";
import { UpcomingEvents } from "@/components/events/upcoming-events";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "Chapter Events | NCMA MetroMD",
  description:
    "MetroMD programs are built around the issues shaping today's acquisition community — modernization, emerging technology, business growth, small business participation, leadership, compliance and workforce development.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | NCMA MetroMD",
    description:
      "Where the acquisition community comes together. Tickets are on Eventbrite.",
    url: "/events",
  },
};

// Rendered per request so the Eventbrite listing is never served stale.
export const dynamic = "force-dynamic";

// Moved here from the home page, which now opens with Our Story instead.
const stats = [
  { figure: "2024", label: "Chartered in Maryland" },
  { figure: "13", label: "Officers on the chapter board" },
  { figure: "20,000+", label: "NCMA members nationwide" },
  { figure: "4", label: "Certifications with chapter study groups" },
];

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
      <p className="kick">Chapter Events</p>
      <h1 style={{ fontSize: "clamp(31px, 7.6vw, 54px)", maxWidth: "20ch", margin: "16px 0 20px" }}>
        Where the Acquisition Community Comes Together
      </h1>
      <p className="lede" style={{ fontSize: 20, maxWidth: "58ch", margin: "0 0 36px" }}>
        MetroMD programs are designed around the real issues shaping today’s
        acquisition community, including acquisition modernization, emerging
        technology, business growth, small business participation, leadership,
        compliance, workforce development, and government-industry collaboration.
      </p>
      <p className="lede" style={{ fontSize: 20, maxWidth: "58ch", margin: "0 0 36px" }}>
        Our events bring together practitioners, executives, entrepreneurs,
        attorneys, advisors, educators, and public-sector leaders to exchange
        ideas, build relationships, and strengthen both the profession and the
        communities we serve.
      </p>

      <section aria-label="The chapter at a glance" style={{ marginBottom: 40 }}>
        <div className="stat-strip">
          {stats.map((s) => (
            <div className="stat-cell" key={s.label}>
              <div className="stat-figure">{s.figure}</div>
              <div style={{ fontSize: 16, color: "var(--color-neutral-700)", marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

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
