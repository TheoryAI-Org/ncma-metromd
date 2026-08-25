import type { Metadata } from "next";
import { CtaRow } from "@/components/shared/cta-row";
import { PageHeader } from "@/components/shared/page-header";
import { membershipBenefits, NCMA_MEMBERSHIP_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Our chapter | NCMA MetroMD",
  description:
    "The NCMA MetroMD Chapter serves contract management professionals in the Maryland metropolitan area — a hub for industry collaboration, professional development, and mentorship.",
};

const pillars = [
  {
    title: "What we do",
    body: "Monthly dinner meetings with a speaker, virtual training sessions, certification study support and a kick-off each spring. Programming is planned by the board and shaped by what members ask for.",
  },
  {
    title: "Who belongs here",
    body: "Federal contracting officers and specialists, program and project staff, small business owners, and anyone who touches acquisition in Maryland. First-timers are welcome at any dinner — you do not have to be a member to come.",
  },
  {
    title: "How to get involved",
    body: "Come to a meeting, then take a committee seat. Members run study groups, edit the newsletter, host speakers and help with sponsorship. Say the word and the board will find you a place.",
  },
];

export default function AboutPage() {
  return (
    <main className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader
        kicker="Our chapter"
       
        title="Chartered in 2024, and still filling the room"
      >
        <p className="lede">
          The NCMA MetroMD Chapter serves contract management professionals in the Maryland
          metropolitan area. We were founded to give the Maryland acquisition community its
          own place to meet — a hub for industry collaboration, professional development, and
          mentorship, empowering contracting professionals to connect, grow, and lead across
          government and industry.
        </p>
      </PageHeader>

      <div
        className="grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 56,
          marginTop: 64,
        }}
      >
        {pillars.map((pillar) => (
          <div key={pillar.title}>
            <h3 style={{ fontSize: 26 }}>{pillar.title}</h3>
            <p style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>{pillar.body}</p>
          </div>
        ))}
      </div>

      <h2
        id="why-join"
        style={{ fontSize: 42, letterSpacing: "-0.015em", margin: "80px 0 28px", scrollMarginTop: 96 }}
      >
        Why join NCMA
      </h2>
      <div
        className="grid-3"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px 56px" }}
      >
        {membershipBenefits.map((benefit) => (
          <div key={benefit.title}>
            <h4 style={{ fontSize: 21, marginBottom: 8 }}>{benefit.title}</h4>
            <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: 0 }}>
              {benefit.body}
            </p>
          </div>
        ))}
      </div>

      <CtaRow
        title="Ready to join?"
        body="Register through NCMA Headquarters and put “MetroMD” as your Chapter Preference."
        action={
          <a
            className="btn btn-primary"
            href={NCMA_MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join now
          </a>
        }
      />
    </main>
  );
}
