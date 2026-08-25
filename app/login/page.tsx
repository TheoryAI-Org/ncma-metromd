import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { NCMA_MEMBERSHIP_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Member sign in | NCMA MetroMD",
  description:
    "The MetroMD member area holds the chapter roster, meeting slides and recordings, study materials and your event registrations.",
};

const perks = [
  "Slides and recordings from past dinner meetings",
  "CPCM, CFCM, CCCM and CCMA study group materials",
  "Chapter roster and mentor matching",
  "Member rate at every event",
];

export default function LoginPage() {
  return (
    <main
      className="pg grid-split"
      style={{
        paddingTop: 56,
        paddingBottom: 96,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 72,
        alignItems: "start",
      }}
    >
      <div>
        <PageHeader kicker="Members" title="Sign in" titleSize={56} />
        <p className="lede" style={{ fontSize: 19 }}>
          The member area holds the chapter roster, meeting slides and recordings, study
          materials and your event registrations.
        </p>
        <ul
          style={{
            fontSize: 17,
            color: "var(--color-neutral-700)",
            paddingLeft: 20,
            lineHeight: 2,
          }}
        >
          {perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </div>

      <div className="card elev-sm" style={{ padding: 32 }}>
        {/* No authentication provider is wired up yet — these fields are the
            design's shell, disabled so the page cannot imply a working login. */}
        <div className="field" style={{ marginBottom: 16 }}>
          <label htmlFor="login-email">Email</label>
          <input
            className="input"
            id="login-email"
            type="email"
            placeholder="you@agency.gov"
            disabled
          />
        </div>
        <div className="field" style={{ marginBottom: 16 }}>
          <label htmlFor="login-password">Password</label>
          <input
            className="input"
            id="login-password"
            type="password"
            placeholder="••••••••"
            disabled
          />
        </div>
        <button className="btn btn-primary btn-block" type="button" disabled>
          Sign in
        </button>
        <div style={{ fontSize: 13, color: "var(--color-neutral-600)", marginTop: 10 }}>
          The member area is not open yet. Watch the newsletter for the launch.
        </div>

        <div style={{ fontSize: 15, color: "var(--color-neutral-700)", marginTop: 20 }}>
          Not a member yet? Membership is through NCMA Headquarters — put “MetroMD” as your
          Chapter Preference.
        </div>
        <a
          className="btn btn-secondary"
          href={NCMA_MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 12 }}
        >
          Join NCMA
        </a>
        <div style={{ fontSize: 13, marginTop: 20 }}>
          <Link href="/contact">Need help? Contact the board</Link>
        </div>
      </div>
    </main>
  );
}
