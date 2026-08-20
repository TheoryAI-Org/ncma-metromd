import Image from "next/image";
import Link from "next/link";
import { Headshot } from "@/components/headshot";
import { NewsletterForm } from "@/components/newsletter-form";
import { SocialLinks, SOCIAL_LINKS } from "@/components/social-links";
import { SponsorGrid } from "@/components/sponsor-grid";
import { BOARD, BOARD_PREVIEW_SLUGS } from "@/data/board";
import { ARTICLES } from "@/data/insights";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import type { Event } from "@/types/event";

// The "This season" strip reads the live Eventbrite feed, so the page is
// rendered per request like /events.
export const dynamic = "force-dynamic";

const boardPreview = BOARD_PREVIEW_SLUGS.map(
  (slug) => BOARD.find((m) => m.slug === slug)!
);
const articlePreview = ARTICLES.slice(0, 3);

function formatEventDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(start: string, end: string) {
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

function SeasonRow({ event, past }: { event: Event; past: boolean }) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-2 sm:grid-cols-[150px_1fr] sm:gap-6 lg:grid-cols-[150px_1fr_auto]">
      <div className="text-base text-neutral-600">{formatEventDate(event.date)}</div>
      <div>
        <div className="text-2xl">
          {event.eventUrl ? (
            <a
              href={event.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-cyan-700"
            >
              {event.title}
            </a>
          ) : (
            event.title
          )}
        </div>
        <div className="text-base text-neutral-700">
          {formatTimeRange(event.startTime, event.endTime)}
        </div>
      </div>
      <span
        className={`tag ${past ? "tag-neutral" : "tag-outline"} justify-self-start`}
      >
        {past ? "Past" : "Registration open"}
      </span>
    </div>
  );
}

export default async function Home() {
  let upcomingEvents: Event[] = [];
  let pastEvents: Event[] = [];
  try {
    ({ upcomingEvents, pastEvents } = await fetchEventbriteEvents());
  } catch {
    // The strip degrades to the Eventbrite link beside it rather than failing.
  }

  // Up to three: upcoming first, topped up with the most recent past meetings
  // so the section is never empty between seasons.
  const season = [
    ...upcomingEvents.slice(0, 3).map((e) => ({ event: e, past: false })),
    ...pastEvents.slice(0, 3).map((e) => ({ event: e, past: true })),
  ].slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="pg grid grid-cols-1 items-end gap-12 pb-16 pt-14 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <div>
          <div className="kick">MetroMD Chapter</div>
          <p className="lede mt-3">
            The National Contract Management Association (NCMA) is a professional
            association with 100 chapters and over 20,000 members dedicated to the
            profession of contract management.
          </p>
          <p className="lede mt-4">
            We are the MetroMD Chapter of NCMA, located in the Washington
            Metropolitan area. Our region is the heart of the biotech industry and
            the government agencies that support and promote the biotech and
            medical industry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              className="btn btn-primary"
              href="https://www.ncmahq.org/membership"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Member
            </a>
            <Link className="btn btn-secondary" href="/our-chapter">
              New here? Start with our chapter
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              ["When", "Third Thursday, 5:30 PM"],
              ["Where", "Metro Maryland, venue rotates"],
              ["Who comes", "1102s, PMs, small business"],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="kick">{term}</dt>
                <dd className="mt-2 text-[19px]">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative aspect-[4/5] w-full bg-surface">
          <Image
            src="/images/hero-chapter.jpg"
            alt="NCMA MetroMD chapter members at a dinner meeting"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── This season ── */}
      <section className="pg grid grid-cols-1 gap-12 pb-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="mb-3 text-4xl tracking-[-0.015em] lg:text-[42px]">
            This season
          </h2>
          <p className="text-[17px] text-neutral-700">
            Tickets go through Eventbrite and the calendar runs March through
            January. Members save on every dinner.
          </p>
          <div className="mt-2 flex flex-col items-start">
            <Link className="btn btn-ghost pl-0" href="/events">
              Full calendar →
            </Link>
            <a
              className="btn btn-ghost pl-0"
              href={SOCIAL_LINKS.eventbrite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chapter page on Eventbrite →
            </a>
          </div>
          <div className="kick mt-8">Follow the chapter</div>
          <SocialLinks size={26} className="mt-3" />
        </div>
        <div className="flex flex-col gap-7">
          {season.length > 0 ? (
            season.map(({ event, past }) => (
              <SeasonRow key={event.id} event={event} past={past} />
            ))
          ) : (
            <div>
              <div className="text-2xl">Nothing published yet this season</div>
              <p className="mt-2 text-base text-neutral-700">
                New listings appear here automatically from the chapter&apos;s
                Eventbrite organizer page.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Your board ── */}
      <section className="pg pb-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl tracking-[-0.015em] lg:text-[42px]">
              Your board
            </h2>
            <p className="mt-2.5 max-w-[62ch] text-[17px] text-neutral-700">
              Nine volunteers — agency veterans and small business owners — who
              plan the programs and answer their own email.
            </p>
          </div>
          <Link className="btn btn-ghost" href="/board">
            Meet everyone →
          </Link>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {boardPreview.map((member) => (
            <div key={member.slug}>
              <Headshot
                src={member.photo}
                alt={member.name}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="mt-3.5 text-[22px]">{member.name}</div>
              <div className="kick mt-1">{member.position}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="pg pb-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="text-4xl tracking-[-0.015em] lg:text-[42px]">Insights</h2>
          <Link className="btn btn-ghost" href="/insights">
            All articles →
          </Link>
        </div>
        <p className="mt-2.5 max-w-[62ch] text-[17px] text-neutral-700">
          Board members writing about the work: the FAR overhaul, certification,
          and building a career in acquisition.
        </p>
        <div className="mt-9 grid grid-cols-1 gap-12 md:grid-cols-3">
          {articlePreview.map((article) => {
            const author = BOARD.find((m) => m.slug === article.authorSlug)!;
            return (
              <div key={article.slug}>
                <div className="kick">{article.category}</div>
                <h3 className="my-3 text-[27px] leading-[1.2]">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="text-ink hover:text-cyan-700"
                  >
                    {article.title}
                  </Link>
                </h3>
                <div className="text-base">{author.name}</div>
                <div className="text-sm text-neutral-600">
                  {author.position} ·{" "}
                  {article.status === "draft" ? "Draft" : "Published"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Sponsors ── */}
      <section className="pg pb-[88px]">
        <h2 className="mb-2 text-[30px] tracking-[-0.015em] lg:text-[34px]">
          Thank you to our generous sponsors
        </h2>
        <p className="mb-8 text-[17px] text-neutral-700">
          Sponsorship keeps dinner affordable for government attendees.
        </p>
        <SponsorGrid count={5} />
        <Link className="btn btn-secondary mt-7 inline-flex" href="/sponsors">
          Become a sponsor
        </Link>
      </section>

      {/* ── Mailing list ── */}
      <section className="pg grid grid-cols-1 items-start gap-12 pb-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-2 text-[30px] tracking-[-0.015em] lg:text-[34px]">
            Join our mailing list
          </h2>
          <p className="max-w-[46ch] text-[17px] text-neutral-700">
            Sign up to receive news and updates about chapter events and training.
          </p>
        </div>
        <NewsletterForm />
      </section>

      {/* ── Join ── */}
      <section className="pg grid grid-cols-1 items-end gap-12 pb-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <h2 className="text-4xl leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[56px]">
          Join the leading association for contract management professionals in
          North America.
        </h2>
        <div>
          <p className="text-[17px]">
            Register from the NCMA Headquarters sign-up form. Remember to put
            &ldquo;MetroMD&rdquo; as your Chapter Preference.
          </p>
          <a
            className="btn btn-primary mt-5"
            href="https://www.ncmahq.org/membership"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join now
          </a>
        </div>
      </section>
    </>
  );
}
