import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Headshot } from "@/components/shared/headshot";
import { people } from "@/data/board";
import { articles, bylineFor } from "@/data/insights";
import { formatEventDateLong } from "@/lib/format";

// Only articles listed in data/insights.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const title = `${article.title} | Insights | NCMA MetroMD`;
  return {
    title,
    description: article.summary,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { title, description: article.summary, url: `/insights/${article.slug}`, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const author = people[article.author];

  return (
    <main id="main" className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <Link className="link-rule" href="/insights" style={{ fontSize: 16 }}>
        ← All Insights
      </Link>
      <article style={{ maxWidth: "68ch", marginTop: 28 }}>
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
            <div style={{ fontSize: 15, color: "var(--color-neutral-700)" }}>{bylineFor(article.author)}</div>
            <div style={{ fontSize: 15, color: "var(--color-neutral-700)" }}>{formatEventDateLong(article.date)}</div>
          </div>
        </div>
        {article.body.map((para, i) => (
          <p key={i} style={{ fontSize: 19, lineHeight: 1.65, margin: "0 0 20px" }}>
            {para}
          </p>
        ))}
      </article>
    </main>
  );
}
