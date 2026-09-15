import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BoardCard } from "@/components/board/board-card";
import { featuredBoard } from "@/data/board";
import { CHAPTER_EMAIL, NCMA_HQ_URL, NCMA_MEMBERSHIP_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "NCMA MetroMD Chapter | National Contract Management Association",
  description:
    "Where Maryland's contract management community meets. Chartered in 2024 and part of a national association of 100 chapters and more than 20,000 contract management professionals.",
  alternates: { canonical: "/" },
};

const memberBenefits = [
  "Monthly chapter gatherings featuring engaging speakers and timely topics",
  "CPCM, CFCM, CCCM, and CCMA certification study groups",
  "Member pricing for chapter events and professional development programs",
  "Mentoring, relationship-building, and access to the MetroMD member network",
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <Image
          src="/images/NCAMA_Picture.webp"
          alt="The Capital Wheel and marina at National Harbor at sunset"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {/* A neutral dark scrim, deliberately not navy, holding the headline
            legible over the sunset. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(32,30,29,0.92) 0%, rgba(32,30,29,0.76) 46%, rgba(32,30,29,0.2) 100%)",
          }}
        />
        <div
          className="pg"
          style={{
            position: "relative",
            height: "100%",
            paddingTop: 72,
            paddingBottom: 72,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p className="kick" style={{ color: "#ff9783", margin: 0 }}>
            Metro Maryland Chapter
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 8.5vw, 62px)",
              lineHeight: 1.05,
              color: "#fff",
              maxWidth: "20ch",
              margin: "18px 0 20px",
            }}
          >
            Where Maryland&rsquo;s contract management community meets.
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.55,
              color: "#eae7e7",
              maxWidth: "50ch",
              margin: "0 0 30px",
            }}
          >
            Chartered in 2024 and part of a national association of 100 chapters
            and more than 20,000 contract management professionals.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }} className="stack-sm">
            <a
              className="btn btn-lg btn-on-dark"
              href={NCMA_MEMBERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a member
            </a>
            <Link className="btn btn-lg btn-outline-light" href="/events">
              Come to a meeting
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story replaces the metrics strip and the calendar block, both of
          which now live on /events. */}
      <section className="pg" style={{ paddingTop: 64 }}>
        <p className="kick">Our Story</p>
        <h2
          style={{
            fontSize: "clamp(26px, 5.2vw, 40px)",
            maxWidth: "24ch",
            margin: "14px 0 20px",
          }}
        >
          Built for Our Community. Connected to the Profession.
        </h2>
        <div className="grid-split" style={{ gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <p style={{ fontSize: 19, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: 0 }}>
            March 21, 2024, NCMA Metro Maryland was founded with a simple idea:
            bring the knowledge, relationships, professional development, and
            opportunities of the broader acquisition community closer to the
            professionals who live and work east of the Potomac.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: 0 }}>
            What began as a vision for greater access has grown into a dynamic
            community connecting government, industry, small businesses,
            academia, emerging professionals, and acquisition leaders across
            Prince George&rsquo;s County and surrounding communities.
          </p>
        </div>

        <div
          className="grid-split rule-section"
          style={{ gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 44, paddingTop: 36 }}
        >
          <div>
            <h3 style={{ fontSize: "clamp(22px, 4vw, 28px)", margin: "0 0 12px" }}>
              From Vision to Community
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: "0 0 14px" }}>
              NCMA MetroMD began with a commitment to bring the profession closer
              to home. Under the leadership of inaugural President Richard D.
              Hanks and a dedicated group of founding leaders and volunteers,
              that vision became a thriving professional community.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: "0 0 14px" }}>
              From our inaugural gathering in 2024, MetroMD grew by creating
              something intentionally different: a welcoming environment where
              government and industry professionals could learn together, develop
              meaningful relationships, exchange ideas, and strengthen the
              acquisition community.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: 0 }}>
              That foundation continues to guide us today.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "clamp(22px, 4vw, 28px)", margin: "0 0 12px" }}>
              The Next Chapter: From Growth to Greater Impact
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: "0 0 14px" }}>
              Today, NCMA MetroMD is building on that foundation with an expanded
              focus on professional development, government-industry engagement,
              strategic partnerships, emerging leaders, small-business
              participation, and the issues shaping the future of the acquisition
              profession.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: 0 }}>
              Our next chapter is about more than growing attendance. It is about
              increasing impact by creating programs, relationships, and
              opportunities that help our members and partners navigate a rapidly
              changing federal marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="pg" style={{ paddingTop: 64 }}>
        <div
          className="stack-md"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(26px, 5.2vw, 38px)", margin: "0 0 10px" }}>Your board</h2>
            <p
              style={{
                fontSize: 18,
                color: "var(--color-neutral-800)",
                maxWidth: "58ch",
                margin: 0,
              }}
            >
              Volunteers from agencies and small businesses plan the programs and
              answer their own email.
            </p>
          </div>
          <Link className="link-rule" href="/board" style={{ flex: "none" }}>
            Meet everyone
          </Link>
        </div>
        <div
          className="grid-4 grid-people"
          style={{ gap: 32, marginTop: 32, gridTemplateColumns: "repeat(5, 1fr)" }}
        >
          {featuredBoard.map((m) => (
            <BoardCard key={m.id} member={m} />
          ))}
        </div>
      </section>

      <section className="pg" style={{ marginTop: 64, paddingBottom: 16 }}>
        <div
          className="grid-split rule-section"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
            paddingTop: 36,
          }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(25px, 4.8vw, 34px)", margin: "0 0 12px" }}>
              Make MetroMD Your Professional Home
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: "0 0 14px" }}>
              Join MetroMD and become part of a welcoming NCMA chapter built to
              help you connect locally, grow professionally, and contribute
              meaningfully.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: "0 0 14px" }}>
              While your NCMA membership is managed through{" "}
              <a href={NCMA_HQ_URL} target="_blank" rel="noopener noreferrer">
                NCMA headquarters
              </a>
              , your chapter experience comes to life right here with MetroMD.
              When you join or renew, simply select Metro Maryland as your chapter
              preference to connect with our local programs, events, and
              professional network. To help us welcome you personally, please
              email us at{" "}
              <a href={`mailto:${CHAPTER_EMAIL}`}>{CHAPTER_EMAIL}</a> so we can
              connect with you directly and help you get involved.
            </p>
            <Link className="link-rule" href="/about" style={{ marginTop: 4 }}>
              Explore membership benefits
            </Link>
          </div>
          <div>
            <h3 style={{ fontSize: 20, margin: "0 0 12px" }}>
              As a MetroMD member, you can take advantage of:
            </h3>
            <ul
              style={{
                margin: "0 0 18px",
                paddingLeft: 22,
                fontSize: 18,
                color: "var(--color-neutral-800)",
                lineHeight: 1.8,
              }}
            >
              {memberBenefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--color-neutral-800)", margin: 0 }}>
              Whether you are new to the profession, advancing your career, or
              looking to stay connected to the acquisition community, MetroMD
              gives you a place to learn, lead, contribute, and build meaningful
              relationships.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
