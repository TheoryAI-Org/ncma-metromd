import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/insights/article-body";
import { AuthorByline } from "@/components/insights/author-byline";
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
        <AuthorByline
          member={{ ...author, personId: article.author, role: byline?.title ?? "", id: `article-${article.author}` }}
          org={byline?.org}
          date={formatEventDateLong(article.date)}
          editor={editor ? `${people[editor.person].name}, ${editor.title}` : undefined}
        />
        <ArticleBody blocks={article.body} />
      </article>
    </main>
  );
}
