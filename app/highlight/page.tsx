import type { Metadata } from "next";
import Link from "next/link";
import { Headshot } from "@/components/shared/headshot";
import { PageHeader } from "@/components/shared/page-header";
import { people } from "@/data/board";
import { currentHighlight } from "@/data/highlights";

export const metadata: Metadata = {
  title: "Member Highlight | NCMA MetroMD",
  description: currentHighlight
    ? `This month NCMA MetroMD spotlights ${people[currentHighlight.person].name}. Share your own story to be featured: submissions are due by the 15th of each month.`
    : "Share your story and be featured on the NCMA MetroMD social media platforms. Submissions are due by the 15th of each month.",
  alternates: { canonical: "/highlight" },
  openGraph: {
    title: "Member Highlight | NCMA MetroMD",
    description: "Share your story and be featured on the NCMA MetroMD social media platforms.",
    url: "/highlight",
  },
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeD5xywj1I6ipFoBkv58rCnCgjUmgCrVxE92YZrw8ajPKJQFg/viewform";

export default function HighlightPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader kicker="Members" title="Member Highlight">
        <p className="lede">
          Each month the chapter spotlights one of our members: their journey, their work and
          what NCMA MetroMD has meant along the way.
        </p>
      </PageHeader>

      {currentHighlight && <Spotlight />}

      <section
        aria-labelledby="share-heading"
        className="rule-section"
        style={{ marginTop: 64, paddingTop: 32 }}
      >
        <h2 id="share-heading" style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "0 0 12px" }}>
          Want to be featured?
        </h2>
        <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "62ch", margin: "0 0 12px" }}>
          Share your story and be featured on our social media platforms. We love to showcase
          our members — fill out the form below by the <strong>15th of each month</strong>.
        </p>
        <p style={{ fontSize: 17, color: "var(--color-neutral-700)", maxWidth: "62ch", margin: 0 }}>
          Tell us about your professional journey, your accomplishments, and how NCMA Metro
          Maryland has contributed to your career growth. We look forward to highlighting
          your story.
        </p>
      <div style={{ marginTop: 48 }}>
        <iframe
          src={`${FORM_URL}?embedded=true`}
          title="Member Highlight submission form"
          width={640}
          height={978}
          style={{ border: 0, maxWidth: "100%" }}
        >
          Loading…
        </iframe>
        <p style={{ fontSize: 15, color: "var(--color-neutral-600)", marginTop: 16 }}>
          Form not loading?{" "}
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
            Open it in a new tab
          </a>
          .
        </p>
      </div>
      </section>
    </main>
  );
}

/** This month's featured member: photo, the chapter's introduction, and their own words. */
function Spotlight() {
  const h = currentHighlight!;
  const person = people[h.person];
  // A line that is only a quotation ("…") is set as a pull quote.
  const isPullQuote = (t: string) => /^\u201c.*\u201d$/.test(t);

  return (
    <section aria-labelledby="spotlight-heading" style={{ marginTop: 48 }}>
      <div
        className="grid-split"
        style={{ display: "grid", gridTemplateColumns: "minmax(0, 280px) 1fr", gap: 48, alignItems: "start" }}
      >
        <Link href={`/board#bio-${h.person}`} aria-label={`${person.name}: read bio on the Board page`}>
          <Headshot src={person.image} alt={person.name} sizes="(max-width: 900px) 100vw, 280px" />
        </Link>
        <div>
          <p className="kick">{h.month} spotlight</p>
          <h2 id="spotlight-heading" style={{ fontSize: "clamp(28px, 5.4vw, 42px)", margin: "12px 0 18px" }}>
            {h.headline}
          </h2>
          {h.intro.map((t, i) => (
            <p key={i} className="lede" style={{ maxWidth: "62ch", margin: "0 0 16px" }}>
              {t}
            </p>
          ))}
          <Link className="link-rule" href={`/board#bio-${h.person}`} style={{ fontSize: 16 }}>
            View her bio →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "68ch", marginTop: 48 }}>
        <h3 style={{ fontSize: "clamp(22px, 4vw, 28px)", margin: "0 0 20px" }}>{h.wordsHeading}</h3>
        <blockquote
          style={{
            margin: 0,
            padding: "4px 0 4px 24px",
            borderLeft: "4px solid var(--color-accent-300)",
          }}
        >
          {h.words.map((t, i) =>
            isPullQuote(t) ? (
              <p
                key={i}
                style={{
                  fontSize: "clamp(24px, 4.4vw, 32px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "var(--color-accent-800)",
                  margin: "28px 0",
                }}
              >
                {t}
              </p>
            ) : (
              <p key={i} style={{ fontSize: 19, lineHeight: 1.65, margin: "0 0 18px" }}>
                {t}
              </p>
            ),
          )}
          <footer style={{ fontSize: 17, fontWeight: 600, marginTop: 24 }}>— {h.signature}</footer>
        </blockquote>
      </div>
    </section>
  );
}
