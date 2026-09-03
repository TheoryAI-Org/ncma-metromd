import Link from "next/link";
import Image from "next/image";
import { Headshot } from "@/components/shared/headshot";
import { SocialLinks } from "@/components/icons/social";
import { featuredBoard } from "@/data/board";
import { articles } from "@/data/insights";
import { sponsors } from "@/data/sponsors";
import {
  chapterFacts,
  EVENTBRITE_ORG_URL,
  NCMA_MEMBERSHIP_URL,
} from "@/data/site";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import { formatEventDate, formatTimeRange } from "@/lib/format";
import type { Event } from "@/types/event";

export const dynamic = "force-dynamic";

/** The three-row "This season" list: next events up, most recent meeting last. */
async function seasonRows(): Promise<
  { key: string; date: string; title: string; detail: string; tag: string; tagClass: string }[]
> {
  const { upcomingEvents, pastEvents } = await fetchEventbriteEvents();

  const rows = upcomingEvents.slice(0, 2).map((e: Event) => ({
    key: e.id,
    date: formatEventDate(e.date),
    title: e.title,
    detail: formatTimeRange(e.startTime, e.endTime),
    tag: "Registration open",
    tagClass: "tag tag-outline",
  }));

  const mostRecent = pastEvents[0];
  if (mostRecent) {
    rows.push({
      key: mostRecent.id,
      date: formatEventDate(mostRecent.date),
      title: mostRecent.title,
      detail: `Most recent meeting · ${formatTimeRange(mostRecent.startTime, mostRecent.endTime)}`,
      tag: "Past",
      tagClass: "tag tag-neutral",
    });
  }

  return rows;
}

export default async function Home() {
  const rows = await seasonRows();
  const insightPreviews = articles.slice(0, 3);
  const sponsorSlots =
    sponsors.length > 0 ? sponsors.slice(0, 5) : new Array(5).fill(null);

  return (
    <main>
      {/* — hero — */}
      <div
        className="pg grid-split"
        style={{
          display: "grid",
          gridTemplateColumns: "1.45fr 1fr",
          gap: 64,
          paddingTop: 56,
          paddingBottom: 72,
          alignItems: "center",
        }}
      >
        <div>
          <div className="kick">MetroMD Chapter</div>
          <h1 style={{ fontSize: 52, maxWidth: "14ch", margin: "14px 0 22px" }}>
            Where Maryland&rsquo;s contract management community meets.
          </h1>
          <p className="lede">
            The National Contract Management Association (NCMA) is a professional association
            with 100 chapters and over 20,000 members dedicated to the profession of contract
            management.
          </p>
          <p className="lede">
            We are the MetroMD Chapter of NCMA, located in the Washington Metropolitan area.
            Our region is the heart of the biotech industry and the government agencies that
            support and promote the biotech and medical industry.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <a
              className="btn btn-primary btn-join"
              href={NCMA_MEMBERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Member
            </a>
            <Link
              className="btn btn-secondary"
              href="/about"
              style={{
                background: "var(--color-accent-100)",
                borderColor: "var(--color-accent-300)",
                color: "var(--color-accent-900)",
              }}
            >
              New here? Start with our chapter
            </Link>
          </div>
          <div
            className="grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 32,
              marginTop: 52,
            }}
          >
            {chapterFacts.map((fact) => (
              <div key={fact.label}>
                <div className="kick">{fact.label}</div>
                <div style={{ fontSize: 19, marginTop: 8 }}>{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="frame" style={{ width: "100%", aspectRatio: "4 / 5" }}>
            <Image
              src="/images/ncma-metromd-hero.jpeg"
              alt="NCMA MetroMD chapter members at a dinner meeting"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* — this season — */}
      <div
        className="pg grid-split"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 64,
          paddingBottom: 80,
        }}
      >
        <div>
          <h2 style={{ fontSize: 42, letterSpacing: "-0.015em", marginBottom: 12 }}>
            This season
          </h2>
          <p style={{ fontSize: 17, color: "var(--color-neutral-700)" }}>
            Tickets go through Eventbrite and the calendar runs March through January.
            Members save on every dinner.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Link className="btn btn-ghost" style={{ paddingLeft: 0 }} href="/events">
              Full calendar →
            </Link>
            <a
              className="btn btn-ghost"
              style={{ paddingLeft: 0 }}
              href={EVENTBRITE_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chapter page on Eventbrite →
            </a>
          </div>
          <div className="kick" style={{ marginTop: 32 }}>
            Follow the chapter
          </div>
          <div style={{ marginTop: 12 }}>
            <SocialLinks />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {rows.length === 0 ? (
            <p style={{ fontSize: 17, color: "var(--color-neutral-700)" }}>
              The next dinner meeting is being scheduled.{" "}
              <a href={EVENTBRITE_ORG_URL} target="_blank" rel="noopener noreferrer">
                Watch Eventbrite
              </a>{" "}
              for the announcement.
            </p>
          ) : (
            rows.map((row) => (
              <div
                key={row.key}
                className="grid-split"
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr auto",
                  gap: 24,
                  alignItems: "baseline",
                }}
              >
                <div style={{ fontSize: 16, color: "var(--color-neutral-600)" }}>{row.date}</div>
                <div>
                  <div style={{ fontSize: 24 }}>{row.title}</div>
                  <div style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
                    {row.detail}
                  </div>
                </div>
                <span className={row.tagClass}>{row.tag}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* — your board — */}
      <div className="pg" style={{ paddingBottom: 80 }}>
        <div
          className="stack-md"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div>
            <h2 style={{ fontSize: 42, letterSpacing: "-0.015em", margin: 0 }}>Your board</h2>
            <p
              style={{
                maxWidth: "62ch",
                marginTop: 10,
                fontSize: 17,
                color: "var(--color-neutral-700)",
              }}
            >
              Volunteers — agency veterans and small business owners — who plan the programs
              and answer their own email.
            </p>
          </div>
          <Link className="btn btn-ghost" href="/board">
            Meet everyone →
          </Link>
        </div>
        <div
          className="grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 32,
            marginTop: 36,
          }}
        >
          {featuredBoard.map((member) => (
            <div key={member.id}>
              <Headshot
                src={member.image}
                alt={member.name}
                sizes="(max-width: 900px) 100vw, 25vw"
              />
              <div style={{ fontSize: 22, marginTop: 14 }}>{member.name}</div>
              <div className="kick" style={{ marginTop: 4 }}>
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* — insights — */}
      <div className="pg" style={{ paddingBottom: 80 }}>
        <div
          className="stack-md"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <h2 style={{ fontSize: 42, letterSpacing: "-0.015em", margin: 0 }}>Insights</h2>
          <Link className="btn btn-ghost" href="/insights">
            All articles →
          </Link>
        </div>
        <p
          style={{
            maxWidth: "62ch",
            marginTop: 10,
            fontSize: 17,
            color: "var(--color-neutral-700)",
          }}
        >
          Board members writing about the work: the FAR overhaul, certification, and building
          a career in acquisition.
        </p>
        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 48,
            marginTop: 36,
          }}
        >
          {insightPreviews.map((article) => (
            <div key={article.slug}>
              <div className="kick">{article.category}</div>
              <h3 style={{ fontSize: 27, margin: "12px 0", lineHeight: 1.2 }}>
                <Link href={`/insights/${article.slug}`} style={{ textDecoration: "none" }}>
                  {article.title}
                </Link>
              </h3>
              <div style={{ fontSize: 16 }}>{article.author}</div>
              <div style={{ fontSize: 14, color: "var(--color-neutral-600)" }}>
                {article.authorRole} · Draft
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* — sponsors — */}
      <div className="pg" style={{ paddingBottom: 88 }}>
        <h2 style={{ fontSize: 34, letterSpacing: "-0.015em", margin: "0 0 8px" }}>
          Thank you to our generous sponsors
        </h2>
        <p style={{ fontSize: 17, color: "var(--color-neutral-700)", marginBottom: 32 }}>
          Sponsorship keeps dinner affordable for government attendees.
        </p>
        <div
          className="grid-5"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 40,
            alignItems: "center",
          }}
        >
          {sponsorSlots.map((sponsor, i) => (
            <div key={sponsor?.name ?? i} className="frame" style={{ aspectRatio: "3 / 2" }}>
              {sponsor ? (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  sizes="20vw"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <div className="frame-placeholder" aria-hidden="true">
                  Sponsor logo
                </div>
              )}
            </div>
          ))}
        </div>
        <Link className="btn btn-secondary" style={{ marginTop: 28 }} href="/sponsors">
          Become a sponsor
        </Link>
      </div>
    </main>
  );
}
