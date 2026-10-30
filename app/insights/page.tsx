import type { Metadata } from "next";
import Link from "next/link";
import { CtaRow } from "@/components/shared/cta-row";
import { PageHeader } from "@/components/shared/page-header";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { newsletterIsLive } from "./newsletter-actions";

export const metadata: Metadata = {
  title: "Insights | NCMA MetroMD",
  description:
    "Articles from the MetroMD board and membership are coming soon. Sign up to hear when the first pieces publish.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | NCMA MetroMD",
    description:
      "Articles from the MetroMD board and membership are coming soon.",
    url: "/insights",
  },
};

export default async function InsightsPage() {
  // Disabled with a "Coming soon" note until Resend is configured.
  const live = await newsletterIsLive();

  return (
    <main id="main" className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader
        kicker="Thought leadership"
        kickerSize={40}
        title="Insights"
        titleSize={50}
        titleStyle={{ fontStyle: "italic" }}
      >
        <p className="lede">
          Coming soon. The board is writing a slate of articles on what is changing in
          acquisition and what it means at the desk — each with a byline and a full
          article page.
        </p>
        <p style={{ fontSize: 15, color: "var(--color-neutral-700)", marginTop: 16 }}>
          <span className="tag tag-accent-2">Coming soon</span>
          &nbsp;&nbsp;Nothing publishes until the authors approve their copy.
        </p>
      </PageHeader>

      <div
        className="grid-split"
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 64,
          marginTop: 56,
        }}
      >
        <div>
          <h2 style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "0 0 16px" }}>
            Nothing published yet
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "58ch", margin: 0 }}>
            The first pieces are in draft with their authors. Join the newsletter and
            you will get them the day they go up, along with the next dinner meeting
            and certification deadlines.
          </p>
        </div>

        <NewsletterSignup live={live} />
      </div>

      <CtaRow
        title="Pitch an article"
        titleSize={23}
        body="Members write 800–1,200 words from their own practice. Send a paragraph and we will schedule it."
        action={
          <Link className="btn btn-primary" href="/contact">
            Send a pitch
          </Link>
        }
      />
    </main>
  );
}
