import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  chapterSponsorships,
  eventSponsorships,
  sponsors,
  sponsorshipFlyer,
  sponsorshipOptions,
  showSponsorRoll,
  type SponsorshipTier,
} from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsorship | NCMA MetroMD",
  description:
    "MetroMD's partners expand access to professional development, strengthen government-industry dialogue, and support emerging leaders across the acquisition community.",
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: "Sponsorship | NCMA MetroMD",
    description:
      "Partner with NCMA Metro Maryland to strengthen the acquisition community.",
    url: "/sponsors",
  },
};

const H2 = {
  fontSize: "clamp(24px, 4.6vw, 32px)",
  margin: "64px 0 24px",
  paddingTop: 24,
} as const;

function TierTable({ tiers }: { tiers: SponsorshipTier[] }) {
  return (
    <div className="grid-2" style={{ gap: "0 48px" }}>
      {tiers.map((t) => (
        <div
          key={t.name}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 20,
            padding: "14px 0",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 700 }}>{t.name}</span>
          <span
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "var(--color-accent)",
              whiteSpace: "nowrap",
            }}
          >
            {t.price}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <p className="kick">Sponsorship</p>
      <h1 style={{ fontSize: "clamp(31px, 7.6vw, 54px)", maxWidth: "22ch", margin: "16px 0 20px" }}>
        Sponsorship keeps a seat at the table affordable
      </h1>
      <p className="lede" style={{ maxWidth: "62ch", margin: "0 0 18px" }}>
        MetroMD&rsquo;s growth has been made possible through organizations that
        believe strong acquisition communities create stronger outcomes for
        government, industry, and the people they serve.
      </p>
      <p className="lede" style={{ maxWidth: "62ch", margin: "0 0 30px" }}>
        Our partners do more than sponsor events. They help expand access to
        professional development, strengthen government-industry dialogue,
        support emerging leaders, and create opportunities for meaningful
        connection across the acquisition community.
      </p>
      <Link className="btn btn-primary btn-lg" href="/contact">
        Become a MetroMD Partner
      </Link>

      <h2 className="rule-section" style={H2}>
        Chapter sponsorship packages
      </h2>
      <p style={{ fontSize: 18, color: "var(--color-neutral-800)", maxWidth: "58ch", margin: "0 0 24px" }}>
        Year-round partnership across the whole program year.
      </p>
      <TierTable tiers={chapterSponsorships} />

      <h2 className="rule-section" style={H2}>
        Event sponsorship packages
      </h2>
      <p style={{ fontSize: 18, color: "var(--color-neutral-800)", maxWidth: "58ch", margin: "0 0 24px" }}>
        Support a single event, program, networking session or training.
      </p>
      <TierTable tiers={eventSponsorships} />

      <div
        style={{
          marginTop: 36,
          padding: 28,
          background: "var(--color-neutral-100)",
          border: "1px solid var(--color-neutral-300)",
          borderRadius: 4,
        }}
      >
        {sponsorshipFlyer.image && (
          <Image
            src={sponsorshipFlyer.image}
            alt={sponsorshipFlyer.alt}
            width={1100}
            height={1700}
            sizes="(max-width: 900px) 100vw, 820px"
            style={{
              width: "100%",
              maxWidth: 820,
              height: "auto",
              border: "1px solid var(--color-neutral-300)",
              borderRadius: 4,
              marginBottom: 22,
            }}
          />
        )}
        <h3 style={{ fontSize: 22, margin: "0 0 8px" }}>
          The full sponsorship prospectus
        </h3>
        <p style={{ fontSize: 17, color: "var(--color-neutral-800)", maxWidth: "58ch", margin: "0 0 18px" }}>
          Tier-by-tier benefits, chapter activities and the year&rsquo;s program are
          all set out in the 2026&ndash;2027 prospectus.
        </p>
        <a
          className="btn btn-secondary btn-lg"
          href={sponsorshipFlyer.pdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          View the prospectus (PDF)
        </a>
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

      {/* The whole sponsor roll is hidden until the sponsorship drive
          closes. Flip showSponsorRoll in data/sponsors.ts to bring it back. */}
      {showSponsorRoll && (
        <>
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
        </>
      )}
    </main>
  );
}
