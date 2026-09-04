import type { Metadata } from "next";
import { membershipBenefits } from "@/data/site";

export const metadata: Metadata = {
  title: "Our chapter | NCMA MetroMD",
  description:
    "The NCMA MetroMD Chapter serves contract management professionals in the Maryland metropolitan area: what we do, who belongs here, and how to get involved.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our chapter | NCMA MetroMD",
    description:
      "Chartered in 2024, and still filling the room. What the Metro Maryland chapter does and how to take part.",
    url: "/about",
  },
};

const columns = [
  {
    title: "What we do",
    body: "Monthly dinner meetings with a speaker, virtual training sessions, certification study support and a kick-off each spring. Programming is planned by the board and shaped by what members ask for.",
  },
  {
    title: "Who belongs here",
    body: "Federal contracting officers and specialists, program and project staff, small business owners, and anyone who touches acquisition in Maryland. First-timers are welcome at any dinner. You do not have to be a member to come.",
  },
  {
    title: "How to get involved",
    body: "Come to a meeting, then take a committee seat. Members run study groups, edit the newsletter, host speakers and help with sponsorship. Say the word and the board will find you a place.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <p className="kick">Our chapter</p>
      <h1 style={{ fontSize: 54, maxWidth: "24ch", margin: "16px 0 22px" }}>
        Chartered in 2024, and still filling the room
      </h1>
      {/* Mission copy, verbatim from the chapter's own description. */}
      <p className="lede" style={{ margin: "0 0 8px" }}>
        The NCMA MetroMD Chapter serves contract management professionals in the
        Maryland metropolitan area. We were founded to give the Maryland
        acquisition community its own place to meet: a hub for industry
        collaboration, professional development, and mentorship, empowering
        contracting professionals to connect, grow, and lead across government
        and industry.
      </p>

      <div
        className="grid-3 rule-section"
        style={{ gap: 48, margin: "56px 0 0", paddingTop: 36 }}
      >
        {columns.map((c) => (
          <div key={c.title}>
            <h2 style={{ fontSize: 26, margin: "0 0 8px" }}>{c.title}</h2>
            <p style={{ fontSize: 17, color: "var(--color-neutral-800)", margin: 0 }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 38, margin: "72px 0 8px" }}>Why join NCMA</h2>
      <p
        style={{
          fontSize: 18,
          color: "var(--color-neutral-800)",
          maxWidth: "62ch",
          margin: "0 0 32px",
        }}
      >
        Membership is national, and the chapter is where it turns into people you
        know.
      </p>
      <div className="grid-3" style={{ gap: "40px 56px" }}>
        {membershipBenefits.map((b) => (
          <div
            key={b.title}
            style={{ borderTop: "1px solid var(--color-neutral-300)", paddingTop: 18 }}
          >
            <h3 style={{ margin: "0 0 6px" }}>{b.title}</h3>
            <p style={{ fontSize: 17, color: "var(--color-neutral-800)", margin: 0 }}>
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
