import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { CHAPTER_EMAIL, PRESIDENT_SIGNATURE } from "@/data/site";

/** The signature hand on the printed letter. Loaded only for this page. */
const script = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "President’s Letter | NCMA MetroMD",
  description:
    "Jennifer Hanks opens the 2026–2027 program year: Leveling Up MetroMD’s programming, partnerships, reach and impact across the acquisition community.",
  alternates: { canonical: "/presidents-letter" },
  openGraph: {
    title: "President’s Letter | NCMA MetroMD",
    description:
      "Level Up with Metro Maryland — the 2026–2027 program year letter from chapter president Jennifer Hanks.",
    url: "/presidents-letter",
  },
};

/** The three dated items in the Save the Date rail. */
const SAVE_THE_DATE = [
  { month: "Oct", day: "5", text: "Greenberg Traurig – 2nd Annual Small Business Summit" },
  { month: "Oct", day: "15", text: "Aprio – Federal Strategic Growth" },
  { month: "Nov", day: "12", text: "3rd Annual Metro Maryland Veterans Celebration" },
] as const;

const PANEL = {
  background: "var(--color-neutral-100)",
  border: "1px solid var(--color-neutral-300)",
  borderRadius: 4,
  padding: 28,
} as const;

const PANEL_H = {
  fontSize: 21,
  lineHeight: 1.15,
  letterSpacing: "0.01em",
  textTransform: "uppercase",
  color: "var(--navy)",
  margin: "0 0 14px",
} as const;

const BODY = {
  fontSize: 18,
  lineHeight: 1.62,
  color: "var(--color-neutral-800)",
} as const;

export default function PresidentsLetterPage() {
  return (
    <main id="main" style={{ paddingBottom: 0 }}>
      {/* ---- Masthead: brand line left, harbour photograph right ---- */}
      <section className="pl-masthead">
        <div className="pl-masthead-brand">
          <Image
            src="/images/ncma-metromd-logo.png"
            alt="NCMA Metro Maryland"
            width={340}
            height={150}
            priority
            style={{ width: "100%", maxWidth: 320, height: "auto" }}
          />
          <p className="pl-pillars">People&nbsp;&nbsp;|&nbsp;&nbsp;Partnerships&nbsp;&nbsp;|&nbsp;&nbsp;Possibilities</p>
          <p className="pl-tagline">Advancing acquisition excellence together.</p>
        </div>
        <div className="pl-masthead-photo">
          <Image
            src="/images/NCAMA_Picture.webp"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <div className="pg" style={{ paddingTop: 40, paddingBottom: 72 }}>
        {/* ---- Headline, portrait and the letter itself ---- */}
        <div className="pl-lede">
          <div>
            <p className="kick-sm" style={{ color: "var(--color-neutral-700)", margin: 0 }}>
              NCMA Metro Maryland · 2026–2027 Program Year
            </p>
            <h1 className="pl-title">
              Level Up with
              <br />
              <span style={{ color: "#2f7bd0" }}>Metro Maryland</span>
            </h1>

            <h2 style={{ fontSize: 21, color: "var(--navy)", margin: "0 0 14px" }}>
              Dear Metro Maryland Partners and Supporters,
            </h2>
            <p style={{ ...BODY, maxWidth: "62ch", margin: "0 0 18px" }}>
              As we launch a new program year, NCMA Metro Maryland is building on the
              strong foundation established under Richard Hanks’ leadership. As Richard
              passes the torch, I am honored to lead the Chapter into our next phase as we
              focus on ‘Leveling Up’ our programming, partnerships, reach, and impact
              across the acquisition and contract management community.
            </p>
            <p style={{ ...BODY, maxWidth: "62ch", margin: 0 }}>
              Our sponsors and partners have been central to our growth — helping us expand
              programming, strengthen professional connections, and create opportunities
              that extend beyond our events. Members have shared stories of new jobs,
              partnerships, and even contract wins that began through Metro Maryland
              connections.
            </p>
          </div>

          <aside className="pl-portrait">
            <div className="pl-portrait-frame">
              <Image
                src="/images/board-hanks.jpeg"
                alt="Jennifer Hanks"
                fill
                sizes="(max-width: 900px) 60vw, 260px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="pl-portrait-plate">
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.01em" }}>
                Jennifer Hanks
              </div>
              <div style={{ fontSize: 16, opacity: 0.85, marginTop: 4 }}>President</div>
              <div style={{ fontSize: 16, opacity: 0.85 }}>NCMA Metro Maryland Chapter</div>
            </div>
            <p className="pl-shout">Same community. Bigger possibilities.</p>
            <p className="pl-shout pl-shout-quiet">Learn. Lead. Grow. Belong.</p>
          </aside>
        </div>

        {/* ---- Three panels ---- */}
        <div className="pl-panels">
          <div style={PANEL}>
            <h3 style={PANEL_H}>Leveling up this program year</h3>
            <p style={{ ...BODY, fontSize: 17, margin: 0 }}>
              This year, we are expanding federal agency and Industry Day engagement,
              leadership and business-growth programming, university partnerships, and
              practical professional development for contracting professionals, seasoned
              and emerging business owners, and the teams who support them.
            </p>
          </div>

          <div style={PANEL}>
            <h3 style={PANEL_H}>Introducing The Contracting Edge</h3>
            <p style={{ ...BODY, fontSize: 17, margin: "0 0 12px" }}>
              <em>The Contracting Edge: Build Expertise. Strengthen Your Business.</em> is
              our new four-part virtual series for contracting and acquisition
              professionals, business owners, business development, operations and program
              management professionals, and staff who support contracting activities.
              Topics include the Contract Management Standard, CMBOK, certification
              pathways, and the NCMA Fellow application process.
            </p>
            <p style={{ fontSize: 16, color: "var(--color-accent)", fontWeight: 600, margin: 0 }}>
              See the enclosed flyer for dates, pricing, and session details.
            </p>
          </div>

          <div style={PANEL}>
            <h3 style={PANEL_H}>Save the date</h3>
            <ol className="pl-timeline">
              {SAVE_THE_DATE.map((e) => (
                <li key={e.text} className="pl-timeline-item">
                  <span className="pl-timeline-date">
                    <span className="pl-timeline-month">{e.month}</span>
                    <span className="pl-timeline-day">{e.day}</span>
                  </span>
                  <span className="pl-timeline-text">{e.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---- Partner with us ---- */}
        <section className="pl-partner">
          <h2 style={{ ...PANEL_H, fontSize: 26, margin: "0 0 16px" }}>Partner with us</h2>
          <p style={{ ...BODY, maxWidth: "88ch", margin: "0 0 14px" }}>
            Sponsorship is critical to what we are able to accomplish. Your investment
            supports accessible professional development, stronger government-industry
            connections, workforce development, and meaningful opportunities for members —
            while providing your organization year-round visibility and engagement with
            government, industry, small businesses, students, and emerging talent.
          </p>
          <p style={{ ...BODY, maxWidth: "88ch", margin: "0 0 14px" }}>
            Our 2026–2027 sponsorship opportunities are included in the enclosed flyer. We
            welcome traditional sponsorships and creative partnership ideas that create
            value for your organization and the broader acquisition community.
          </p>
          <p style={{ ...BODY, maxWidth: "88ch", margin: 0 }}>
            To discuss sponsorship opportunities, please contact me or Darrell McGraw, Vice
            President of Sponsorship, at{" "}
            <a href={`mailto:${CHAPTER_EMAIL}`} style={{ fontWeight: 700 }}>
              {CHAPTER_EMAIL}
            </a>
            .
          </p>
          <div style={{ marginTop: 26, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link className="btn btn-primary btn-lg" href="/sponsors">
              Become a MetroMD Partner
            </Link>
            <Link className="btn btn-lg" href="/contact">
              Contact the chapter
            </Link>
          </div>
        </section>

        {/* ---- Sign-off ---- */}
        <section className="pl-signoff">
          <p className="pl-signoff-script">Let’s Level Up — together.</p>
          <div className="pl-signoff-name">
            <div style={{ fontSize: 16, color: "var(--color-neutral-700)", marginBottom: 6 }}>
              Warm regards,
            </div>
            {/* Her scanned signature when there is one; set in a signature hand
                otherwise, so the sign-off never falls back to plain type. */}
            {PRESIDENT_SIGNATURE ? (
              <Image
                src={PRESIDENT_SIGNATURE}
                alt="Jennifer Hanks’ signature"
                width={320}
                height={110}
                style={{ width: "100%", maxWidth: 230, height: "auto", margin: "2px 0 6px" }}
              />
            ) : (
              <div
                className={script.className}
                aria-hidden="true"
                style={{
                  fontSize: 44,
                  lineHeight: 1.1,
                  color: "var(--navy)",
                  margin: "2px 0 4px",
                }}
              >
                Jennifer Hanks
              </div>
            )}
            <div style={{ fontSize: 19, fontWeight: 800, color: "var(--navy)" }}>
              Jennifer Hanks
            </div>
            <div style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
              President, NCMA Metro Maryland Chapter
            </div>
            {!PRESIDENT_SIGNATURE && (
              <p
                style={{
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "var(--color-neutral-600)",
                  margin: "10px 0 0",
                  maxWidth: "34ch",
                }}
              >
                The original letter was signed by Jennifer Hanks; the script above
                is decorative.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* ---- Closing band ---- */}
      <section className="pl-band">
        <div className="pg pl-band-inner">
          <ul className="pl-band-verbs">
            {["Engage.", "Develop.", "Connect.", "Make an Impact."].map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p className="pl-band-claim">
            A stronger acquisition community for a brighter tomorrow.
          </p>
        </div>
      </section>
    </main>
  );
}
