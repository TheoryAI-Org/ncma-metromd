import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { CtaRow } from "@/components/shared/cta-row";
import {
  SPONSOR_PLACEHOLDER_SLOTS,
  sponsorLevels,
  sponsors,
  sponsorshipOptions,
} from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors | NCMA MetroMD",
  description:
    "Sponsorship keeps dinner affordable for government attendees and puts your name in front of the Washington-area acquisition community.",
};

export default function SponsorsPage() {
  const slots: (typeof sponsors)[number][] | null[] =
    sponsors.length > 0 ? sponsors : new Array(SPONSOR_PLACEHOLDER_SLOTS).fill(null);

  return (
    <main className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader kicker="Partners" title="Sponsors">
        <p className="lede">
          Sponsorship keeps dinner affordable for government attendees and puts your name in
          front of the Washington-area acquisition community. Four levels, one conversation.
        </p>
      </PageHeader>

      <div
        className="grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,minmax(0,1fr))",
          gap: 48,
          marginTop: 64,
        }}
      >
        {sponsorLevels.map((level) => (
          <div key={level.name}>
            <div className="kick" style={{ color: level.accent }}>
              Level
            </div>
            <h3 style={{ fontSize: 30, margin: "10px 0 12px" }}>{level.name}</h3>
            <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: 0 }}>
              {level.body}
            </p>
          </div>
        ))}
      </div>

      <div
        className="grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,minmax(0,1fr))",
          gap: 48,
          marginTop: 72,
        }}
      >
        {sponsorshipOptions.map((option) => (
          <div key={option.title}>
            <div className="kick">{option.kicker}</div>
            <h4 style={{ fontSize: 23, margin: "10px 0" }}>{option.title}</h4>
            <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: 0 }}>
              {option.body}
            </p>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 28, margin: "80px 0 24px" }}>Current sponsors</h3>
      <div
        className="grid-2-sm"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: "56px 48px",
          maxWidth: 1000,
          alignItems: "center",
        }}
      >
        {slots.map((sponsor, i) => (
          <div
            key={sponsor?.name ?? i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              minHeight: 120,
            }}
          >
            {sponsor ? (
              <SponsorLogo sponsor={sponsor} />
            ) : (
              <div
                className="frame"
                style={{ width: "100%", height: 120, position: "relative" }}
              >
                <div className="frame-placeholder" aria-hidden="true">
                  Sponsor logo
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <CtaRow
        title="Talk to us about sponsoring"
        body="The VP of Operations handles sponsorship and can send the current packet."
        titleSize={23}
        action={
          <Link className="btn btn-primary" href="/contact">
            Request the packet
          </Link>
        }
      />
    </main>
  );
}

function SponsorLogo({ sponsor }: { sponsor: (typeof sponsors)[number] }) {
  const logo = (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={360}
      height={200}
      style={{ maxWidth: "100%", maxHeight: 200, width: "auto", height: "auto" }}
    />
  );
  return sponsor.href ? (
    <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
      {logo}
    </a>
  ) : (
    logo
  );
}
