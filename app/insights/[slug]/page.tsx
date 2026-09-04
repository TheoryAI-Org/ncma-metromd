import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Headshot } from "@/components/shared/headshot";
import { articles } from "@/data/insights";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article not found | NCMA MetroMD" };
  return {
    title: `${article.title} | NCMA MetroMD`,
    description: article.standfirst,
  };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <main id="main" className="pg" style={{ paddingTop: 36, paddingBottom: 88, maxWidth: 760 }}>
      <Link className="btn btn-ghost" style={{ paddingLeft: 0 }} href="/insights">
        ← Insights
      </Link>

      <div className="kick" style={{ marginTop: 24 }}>
        {article.category}
      </div>
      <h1
        style={{
          fontSize: 54,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          margin: "18px 0 24px",
        }}
      >
        {article.title}
      </h1>

      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 36 }}>
        <div style={{ width: 56, flex: "none" }}>
          <Headshot
            src={article.authorImage}
            alt={article.author}
            sizes="56px"
          />
        </div>
        <div style={{ marginRight: "auto" }}>
          <div style={{ fontSize: 17 }}>{article.author}</div>
          <div style={{ fontSize: 15, color: "var(--color-neutral-600)" }}>
            {article.authorRole} · {article.readingTime}
          </div>
        </div>
        {article.authorLinkedin && (
          <a
            href={article.authorLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 15 }}
          >
            LinkedIn
          </a>
        )}
      </div>

      <p style={{ fontSize: 22, lineHeight: 1.55 }}>{article.standfirst}</p>

      <p className="bio" style={{ fontSize: 18 }}>
        Body placeholder. Article copy runs at this measure with generous leading; a full
        piece is roughly 800 to 1,200 words with two or three subheadings. Send the author’s
        draft and it drops straight in.
      </p>

      <h3 style={{ fontSize: 27, marginTop: 40 }}>A subheading</h3>
      <p className="bio" style={{ fontSize: 18 }}>
        Body placeholder. Pull quotes, links to the regulation, and references to the session
        where the topic was covered live all belong here.
      </p>

      <p
        style={{
          fontStyle: "italic",
          fontSize: 27,
          lineHeight: 1.35,
          margin: "40px 0",
          color: "var(--color-accent-800)",
        }}
      >
        A pull quote from the article sits here, set in the serif’s true italic.
      </p>

      <p className="bio" style={{ fontSize: 18 }}>
        Closing placeholder. The last paragraph points the reader at the next dinner meeting
        or training session on the topic.
      </p>

      <div
        className="stack-md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          marginTop: 56,
        }}
      >
        <div style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
          Written by a MetroMD board member. Members can pitch their own.
        </div>
        <Link className="btn btn-secondary" href="/contact">
          Pitch an article
        </Link>
      </div>
    </main>
  );
}
