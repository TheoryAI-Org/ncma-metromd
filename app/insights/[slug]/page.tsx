import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/insights/article-body";
import { Headshot } from "@/components/shared/headshot";
import { people } from "@/data/board";
import { insightsAuthors, visibleArticles } from "@/data/insights";
import { formatEventDateLong } from "@/lib/format";

// Only articles visible in this build exist (drafts are hidden on the live
// site); anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = visibleArticles().find((a) => a.slug === slug);
  if (!article) return {};
  const author = people[article.author].name;
  const title = `${article.title} | Insights | NCMA MetroMD`;
  return {
    title,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    authors: [{ name: author }],
    openGraph: {
      title,
      description: article.summary,
      url: `/insights/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: [author],
    },
    ...(article.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = visibleArticles().find((a) => a.slug === slug);
  if (!article) notFound();
  const author = people[article.author];
  const byline = insightsAuthors.find((a) => a.person === article.author);
  const editor = article.editor && insightsAuthors.find((a) => a.person === article.editor);

  return (
    <main id="main" className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <Link className="link-rule" href="/insights" style={{ fontSize: 16 }}>
        ← All Insights
      </Link>
      <article style={{ maxWidth: "68ch", marginTop: 28 }}>
        {article.draft && (
          <p
            role="note"
            style={{
              background: "var(--color-accent-100)",
              borderLeft: "4px solid var(--color-accent-700)",
              padding: "12px 16px",
              fontSize: 16,
              margin: "0 0 24px",
            }}
          >
            <strong>Draft for author review.</strong> This sample has not been
            approved by the author and is not shown on the live site.
          </p>
        )}
        <p className="kick">Insights</p>
        <h1 style={{ fontSize: "clamp(30px, 6vw, 48px)", lineHeight: 1.1, margin: "14px 0 20px" }}>
          {article.title}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 64, flex: "none" }}>
            <Headshot src={author.image} alt={author.name} sizes="64px" />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{author.name}</div>
            {byline && <div style={{ fontSize: 15, color: "var(--color-neutral-700)" }}>{byline.title}</div>}
            {byline?.org && <div style={{ fontSize: 15, color: "var(--color-neutral-700)" }}>{byline.org}</div>}
            <div style={{ fontSize: 15, color: "var(--color-neutral-700)" }}>{formatEventDateLong(article.date)}</div>
            {editor && (
              <div style={{ fontSize: 15, color: "var(--color-neutral-700)", fontStyle: "italic", marginTop: 4 }}>
                Edited by {people[editor.person].name}, {editor.title}
              </div>
            )}
          </div>
        </div>
        <ArticleBody blocks={article.body} />
      </article>
    </main>
  );
}
