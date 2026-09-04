import type { Metadata } from "next";
import Link from "next/link";
import { CtaRow } from "@/components/shared/cta-row";
import { PageHeader } from "@/components/shared/page-header";
import { Headshot } from "@/components/shared/headshot";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { featuredArticle, moreArticles } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights | NCMA MetroMD",
  description:
    "Articles from the MetroMD board and membership on what is changing in acquisition and what it means at the desk.",
};

export default function InsightsPage() {
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
          Articles from the MetroMD board and membership on what is changing in acquisition
          and what it means at the desk. Each piece carries a byline, a headshot and a full
          article page.
        </p>
        <p style={{ fontSize: 15, color: "var(--color-neutral-700)", marginTop: 16 }}>
          <span className="tag tag-accent-2">Draft slate</span>
          &nbsp;&nbsp;Titles below are proposed from each author&apos;s stated focus — nothing
          publishes until the author approves the copy.
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
          <div className="kick">Featured · {featuredArticle.category}</div>
          <h2
            style={{
              fontSize: 46,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "16px 0 18px",
            }}
          >
            {featuredArticle.title}
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "58ch" }}>
            {featuredArticle.standfirst}
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 26 }}>
            <div style={{ width: 64, flex: "none" }}>
              <Headshot
                src={featuredArticle.authorImage}
                alt={featuredArticle.author}
                sizes="64px"
              />
            </div>
            <div>
              <div style={{ fontSize: 17 }}>{featuredArticle.author}</div>
              <div style={{ fontSize: 15, color: "var(--color-neutral-600)" }}>
                {featuredArticle.authorRole} · {featuredArticle.readingTime}
              </div>
            </div>
          </div>
          <Link
            className="btn btn-primary"
            style={{ marginTop: 24 }}
            href={`/insights/${featuredArticle.slug}`}
          >
            Read the article
          </Link>
        </div>

        <NewsletterSignup />
      </div>

      <h3 style={{ fontSize: 28, margin: "80px 0 28px" }}>More from the board</h3>
      <div
        className="grid-2"
        style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "44px 56px" }}
      >
        {moreArticles.map((article) => (
          <div
            key={article.slug}
            style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 24 }}
          >
            <Headshot
              src={article.authorImage}
              alt={article.author}
              sizes="110px"
            />
            <div>
              <div className="kick">{article.category}</div>
              <h4 style={{ fontSize: 23, margin: "8px 0 10px", lineHeight: 1.25 }}>
                <Link href={`/insights/${article.slug}`} style={{ textDecoration: "none" }}>
                  {article.title}
                </Link>
              </h4>
              <div style={{ fontSize: 16 }}>{article.author}</div>
              <div style={{ fontSize: 14, color: "var(--color-neutral-600)" }}>
                {article.authorRole}
              </div>
            </div>
          </div>
        ))}
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
