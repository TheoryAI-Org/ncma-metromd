import type { Metadata } from "next";
import Link from "next/link";
import { Headshot } from "@/components/headshot";
import { NewsletterForm } from "@/components/newsletter-form";
import { BOARD } from "@/data/board";
import { ARTICLES, FEATURED_SLUG } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights | NCMA MetroMD Chapter",
  description:
    "Articles from the MetroMD board and membership on what is changing in acquisition and what it means at the desk.",
};

const featured = ARTICLES.find((a) => a.slug === FEATURED_SLUG)!;
const rest = ARTICLES.filter((a) => a.slug !== FEATURED_SLUG);
const authorOf = (slug: string) => BOARD.find((m) => m.slug === slug)!;
const anyDrafts = ARTICLES.some((a) => a.status === "draft");

export default function InsightsPage() {
  const featuredAuthor = authorOf(featured.authorSlug);

  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Thought leadership</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Insights
      </h1>
      <p className="lede">
        Articles from the MetroMD board and membership on what is changing in
        acquisition and what it means at the desk. Each piece carries a byline, a
        headshot and a full article page.
      </p>

      {anyDrafts && (
        <p className="mt-4 flex flex-wrap items-center gap-3 text-[15px] text-neutral-700">
          <span className="tag tag-accent-2">Draft slate</span>
          Titles below are proposed from each author&apos;s stated focus — nothing
          publishes until the author approves the copy.
        </p>
      )}

      {/* ── Featured + subscribe ── */}
      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <div className="kick">Featured · {featured.category}</div>
          <h2 className="my-4 text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[40px] lg:text-[46px]">
            <Link
              href={`/insights/${featured.slug}`}
              className="text-ink hover:text-cyan-700"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="max-w-[58ch] text-[19px] leading-[1.6]">
            {featured.standfirst}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Headshot
              src={featuredAuthor.photo}
              alt={featuredAuthor.name}
              className="h-20 w-16 flex-none"
              sizes="64px"
              placeholder="Photo"
            />
            <div>
              <div className="text-[17px]">{featuredAuthor.name}</div>
              <div className="text-[15px] text-neutral-600">
                {featuredAuthor.position} · {featured.readingTimeMinutes} min read
              </div>
            </div>
          </div>
          <Link className="btn btn-primary mt-6" href={`/insights/${featured.slug}`}>
            Read the article
          </Link>
        </div>

        <NewsletterForm variant="stacked" />
      </div>

      {/* ── More from the board ── */}
      <h2 className="mb-7 mt-20 text-[28px]">More from the board</h2>
      <div className="grid grid-cols-1 gap-x-14 gap-y-11 md:grid-cols-2">
        {rest.map((article) => {
          const author = authorOf(article.authorSlug);
          return (
            <div
              key={article.slug}
              className="grid grid-cols-[80px_1fr] gap-4 sm:grid-cols-[110px_1fr] sm:gap-6"
            >
              <Headshot
                src={author.photo}
                alt={author.name}
                sizes="110px"
                placeholder="Photo"
              />
              <div>
                <div className="kick">{article.category}</div>
                <h3 className="mb-2.5 mt-2 text-[23px] leading-[1.25]">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="text-ink hover:text-cyan-700"
                  >
                    {article.title}
                  </Link>
                </h3>
                <div className="text-base">{author.name}</div>
                <div className="text-sm text-neutral-600">{author.position}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-[72px] flex flex-wrap items-center justify-between gap-10">
        <div>
          <h3 className="mb-1 text-[23px]">Pitch an article</h3>
          <div className="text-base text-neutral-700">
            Members write 800–1,200 words from their own practice. Send a paragraph
            and we will schedule it.
          </div>
        </div>
        <Link className="btn btn-primary" href="/contact">
          Send a pitch
        </Link>
      </div>
    </div>
  );
}
