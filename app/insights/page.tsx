import type { Metadata } from "next";
import Link from "next/link";
import { CtaRow } from "@/components/shared/cta-row";
import { PageHeader } from "@/components/shared/page-header";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { AuthorCard } from "@/components/insights/author-card";
import { people } from "@/data/board";
import { articleFor, articles, insightsAuthors } from "@/data/insights";
import { formatEventDateLong } from "@/lib/format";
import { newsletterIsLive } from "./newsletter-actions";

export const metadata: Metadata = {
  title: "Insights | NCMA MetroMD",
  description:
    "Articles from the NCMA MetroMD board on what is changing in acquisition and what it means at the desk.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | NCMA MetroMD",
    description:
      "Articles from the NCMA MetroMD board on what is changing in acquisition.",
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
          Chapter leaders write on what is changing in acquisition and what it
          means at the desk, each piece with a byline and a full article page.
        </p>
        {articles.length === 0 && (
          <p style={{ fontSize: 15, color: "var(--color-neutral-700)", marginTop: 16 }}>
            <span className="tag tag-accent-2">Coming soon</span>
            &nbsp;&nbsp;Nothing publishes until the authors approve their copy.
          </p>
        )}
      </PageHeader>

      <section aria-labelledby="authors-heading" style={{ marginTop: 56 }}>
        <h2 id="authors-heading" style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "0 0 24px" }}>
          Our authors
        </h2>
        <div className="grid-3" style={{ gap: "40px 32px" }}>
          {insightsAuthors.map((a) => {
            const article = articleFor(a.person);
            return (
              <AuthorCard
                key={a.person}
                member={{ ...people[a.person], personId: a.person, role: a.title, id: `insights-${a.person}` }}
                byline={a.org}
                article={
                  article && {
                    href: `/insights/${article.slug}`,
                    title: article.title,
                    date: formatEventDateLong(article.date),
                  }
                }
              />
            );
          })}
        </div>
      </section>

      <div
        className="grid-split rule-section"
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 64,
          marginTop: 64,
          paddingTop: 36,
        }}
      >
        <div>
          <h2 style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "0 0 16px" }}>
            Get new articles first
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "58ch", margin: 0 }}>
            Join the newsletter and you will get each article the day it goes up,
            along with the next dinner meeting and certification deadlines.
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
