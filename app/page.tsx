import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BoardCard } from "@/components/board/board-card";
import { NextMeeting } from "@/components/events/next-meeting";
import { PastMeetingsTable } from "@/components/events/past-meetings-table";
import { featuredBoard } from "@/data/board";
import { NCMA_MEMBERSHIP_URL } from "@/data/site";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "NCMA MetroMD Chapter | National Contract Management Association",
  description:
    "Where Maryland's contract management community meets. Chartered in 2024 and part of a national association of 100 chapters and more than 20,000 contract management professionals.",
  alternates: { canonical: "/" },
};

// Rendered per request so the Eventbrite listing is never served stale.
export const dynamic = "force-dynamic";

const stats = [
  { figure: "2024", label: "Chartered in Maryland" },
  { figure: "13", label: "Officers on the chapter board" },
  { figure: "20,000+", label: "NCMA members nationwide" },
  { figure: "4", label: "Certifications with chapter study groups" },
];

const reasons = [
  "Monthly dinner meetings with a speaker",
  "CPCM, CFCM, CCCM and CCMA study groups",
  "Member rate at every chapter event",
  "Mentoring and the chapter roster",
];

export default async function HomePage() {
  let upcomingEvents: Event[] = [];
  let pastEvents: Event[] = [];

  try {
    const events = await fetchEventbriteEvents();
    upcomingEvents = events.upcomingEvents;
    pastEvents = events.pastEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <main id="main">
      <section className="hero">
        <Image
          src="/images/ncma-metromd-hero.jpeg"
          alt="Members talking before a MetroMD dinner meeting"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "grayscale(1) contrast(1.04)" }}
        />
        {/* A neutral dark scrim, deliberately not navy, so the photograph
            reads black and white behind the copy. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(32,30,29,0.92) 0%, rgba(32,30,29,0.76) 46%, rgba(32,30,29,0.2) 100%)",
          }}
        />
        <div
          className="pg"
          style={{
            position: "relative",
            height: "100%",
            paddingTop: 72,
            paddingBottom: 72,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p className="kick" style={{ color: "#ff9783", margin: 0 }}>
            Metro Maryland Chapter
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 8.5vw, 62px)",
              lineHeight: 1.05,
              color: "#fff",
              maxWidth: "20ch",
              margin: "18px 0 20px",
            }}
          >
            Where Maryland&rsquo;s contract management community meets.
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.55,
              color: "#eae7e7",
              maxWidth: "50ch",
              margin: "0 0 30px",
            }}
          >
            Chartered in 2024 and part of a national association of 100 chapters
            and more than 20,000 contract management professionals.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }} className="stack-sm">
            <a
              className="btn btn-lg btn-on-dark"
              href={NCMA_MEMBERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a member
            </a>
            <Link className="btn btn-lg btn-outline-light" href="/events">
              Come to a meeting
            </Link>
          </div>
        </div>
      </section>

      <section className="pg" aria-label="The chapter at a glance">
        <div className="stat-strip">
          {stats.map((s) => (
            <div className="stat-cell" key={s.label}>
              <div className="stat-figure">{s.figure}</div>
              <div
                style={{
                  fontSize: 16,
                  color: "var(--color-neutral-700)",
                  marginTop: 8,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pg" style={{ paddingTop: 60 }}>
        <div
          className="grid-split"
          style={{ gridTemplateColumns: "1fr 1.4fr", gap: 64 }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(26px, 5.2vw, 38px)", margin: "0 0 12px" }}>This season</h2>
            <p
              style={{
                fontSize: 18,
                color: "var(--color-neutral-800)",
                margin: "0 0 20px",
              }}
            >
              Meetings, workshops and training run most months. Tickets go
              through Eventbrite, and members pay a reduced rate at every dinner.
            </p>
            <Link className="link-rule" href="/events">
              Full calendar
            </Link>
          </div>
          <div>
            <NextMeeting
              event={upcomingEvents[0]}
              emptyCopy="The next dinner meeting is being scheduled. Registration will open on Eventbrite about four weeks ahead."
              ctaLabel="Watch our Eventbrite page"
            />
            <div style={{ marginTop: 10 }}>
              <PastMeetingsTable events={pastEvents} limit={2} />
            </div>
          </div>
        </div>
      </section>

      <section className="pg" style={{ paddingTop: 64 }}>
        <div
          className="stack-md"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(26px, 5.2vw, 38px)", margin: "0 0 10px" }}>Your board</h2>
            <p
              style={{
                fontSize: 18,
                color: "var(--color-neutral-800)",
                maxWidth: "58ch",
                margin: 0,
              }}
            >
              Volunteers from agencies and small businesses plan the programs and
              answer their own email.
            </p>
          </div>
          <Link className="link-rule" href="/board" style={{ flex: "none" }}>
            Meet everyone
          </Link>
        </div>
        <div className="grid-4 grid-people" style={{ gap: 32, marginTop: 32 }}>
          {featuredBoard.map((m) => (
            <BoardCard key={m.id} member={m} />
          ))}
        </div>
      </section>

      <section className="pg" style={{ marginTop: 64 }}>
        <div
          className="grid-split rule-section"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
            paddingTop: 36,
          }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(25px, 4.8vw, 34px)", margin: "0 0 10px" }}>Why people join</h2>
            <p style={{ fontSize: 18, color: "var(--color-neutral-800)", margin: 0 }}>
              Membership runs through NCMA headquarters. Put MetroMD as your
              chapter preference and the local benefits follow.
            </p>
            <Link className="link-rule" href="/about" style={{ marginTop: 18 }}>
              What membership includes
            </Link>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 22,
              fontSize: 18,
              color: "var(--color-neutral-800)",
              lineHeight: 1.9,
            }}
          >
            {reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
