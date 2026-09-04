import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sponsorLevels, sponsors, sponsorshipOptions } from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors | NCMA MetroMD",
  description:
    "Sponsorship keeps a seat at the table affordable. Season levels, per-meeting and in-kind options for supporting the NCMA MetroMD Chapter.",
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: "Sponsors | NCMA MetroMD",
    description:
      "Sponsors underwrite dinner so government attendees can come at a reduced rate.",
    url: "/sponsors",
  },
};

const H2 = {
  fontSize: "clamp(24px, 4.6vw, 32px)",
  margin: "64px 0 24px",
  paddingTop: 24,
} as const;

export default function SponsorsPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <p className="kick">Sponsors</p>
      <h1 style={{ fontSize: "clamp(31px, 7.6vw, 54px)", maxWidth: "22ch", margin: "16px 0 20px" }}>
        Sponsorship keeps a seat at the table affordable
      </h1>
      <p className="lede" style={{ maxWidth: "58ch", margin: "0 0 30px" }}>
        Sponsors underwrite dinner so government attendees can come at a reduced
        rate, and pay for the training and student outreach the chapter runs
        between meetings.
      </p>
      <Link className="btn btn-primary btn-lg" href="/contact">
        Talk to us about sponsoring
      </Link>

      <h2 className="rule-section" style={H2}>
        Season levels
      </h2>
      {/* Prices are deliberately absent: the board has not set them. When they
          arrive, add a price line under each h3 at 18px/600. */}
      <div className="grid-2" style={{ gap: 28 }}>
        {sponsorLevels.map((level) => (
          <div key={level.name} className="card card-hover" style={{ padding: 24 }}>
            <h3 style={{ fontSize: "clamp(21px, 3.4vw, 24px)", fontWeight: 800, margin: "0 0 8px" }}>
              {level.name}
            </h3>
            <p style={{ fontSize: 17, color: "var(--color-neutral-800)", margin: 0 }}>
              {level.body}
            </p>
          </div>
        ))}
      </div>

      <h2 className="rule-section" style={H2}>
        Other ways to help
      </h2>
      <div className="grid-3" style={{ gap: 40 }}>
        {sponsorshipOptions.map((o) => (
          <div
            key={o.title}
            style={{ borderTop: "2px solid var(--color-text)", paddingTop: 16 }}
          >
            <div className="kick-sm" style={{ color: "var(--color-neutral-700)" }}>
              {o.kicker}
            </div>
            <h3 style={{ fontSize: 22, margin: "8px 0 6px" }}>{o.title}</h3>
            <p style={{ fontSize: 17, color: "var(--color-neutral-800)", margin: 0 }}>
              {o.body}
            </p>
          </div>
        ))}
      </div>

      <h2 className="rule-section" style={{ ...H2, marginBottom: 8 }}>
        This season&rsquo;s sponsors
      </h2>
      {sponsors.length > 0 ? (
        <>
          <p
            style={{
              fontSize: 18,
              color: "var(--color-neutral-800)",
              maxWidth: "58ch",
              margin: "0 0 24px",
            }}
          >
            The organisations underwriting this season of chapter programming.
          </p>
          <div
            className="grid-3"
            style={{ gap: "40px 48px", alignItems: "center" }}
          >
            {sponsors.map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: 120,
                }}
              >
                <Image
                  src={s.logo}
                  alt={s.name}
                  width={280}
                  height={120}
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    maxHeight: 120,
                    objectFit: "contain",
                    filter: "grayscale(1)",
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p
            style={{
              fontSize: 18,
              color: "var(--color-neutral-800)",
              maxWidth: "58ch",
              margin: "0 0 24px",
            }}
          >
            No sponsors are confirmed for the coming season yet. Logos appear
            here as they are signed, and the first names go out in the
            newsletter.
          </p>
          <div
            className="stack-md"
            style={{
              border: "1px dashed var(--color-neutral-400)",
              borderRadius: 4,
              padding: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: "var(--color-neutral-700)",
                maxWidth: "44ch",
              }}
            >
              Sponsor logos will be listed here, on every meeting invitation and
              in the newsletter.
            </div>
            <Link className="link-rule" href="/contact" style={{ flex: "none" }}>
              Be the first
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
