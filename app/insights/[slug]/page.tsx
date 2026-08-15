import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Headshot } from "@/components/headshot";
import { BOARD } from "@/data/board";
import { ARTICLES, getArticle } from "@/data/insights";

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | NCMA MetroMD Chapter`,
    description: article.standfirst,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const author = BOARD.find((m) => m.slug === article.authorSlug)!;

  return (
    <article className="pg max-w-[760px] pb-[88px] pt-9">
      <Link className="btn btn-ghost pl-0" href="/insights">
        ← Insights
      </Link>

      <div className="kick mt-6">{article.category}</div>
      <h1 className="mb-6 mt-4 text-[38px] leading-[1.08] tracking-[-0.02em] sm:text-[46px] lg:text-[54px]">
        {article.title}
      </h1>

      <div className="mb-9 flex flex-wrap items-center gap-4">
        <Headshot
          src={author.photo}
          alt={author.name}
          className="h-[70px] w-14 flex-none"
          sizes="56px"
          placeholder="Photo"
        />
        <div className="mr-auto">
          <div className="text-[17px]">{author.name}</div>
          <div className="text-[15px] text-neutral-600">
            {author.role} · {article.readingTimeMinutes} min read
          </div>
        </div>
        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px]"
          >
            LinkedIn
          </a>
        )}
      </div>

      {article.status === "draft" && (
        <p className="mb-8">
          <span className="tag tag-accent-2">Draft</span>{" "}
          <span className="text-[15px] text-neutral-700">
            This piece is not final — the copy below is placeholder pending the
            author&apos;s draft.
          </span>
        </p>
      )}

      <p className="text-[22px] leading-[1.55]">{article.standfirst}</p>

      {article.body.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="mt-10 text-[27px]">
              {block.text}
            </h2>
          );
        }
        if (block.type === "pullquote") {
          return (
            <p
              key={i}
              className="my-10 text-[27px] italic leading-[1.35] text-cyan-800"
            >
              {block.text}
            </p>
          );
        }
        return (
          <p key={i} className="bio mt-6 text-lg">
            {block.text}
          </p>
        );
      })}

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
        <div className="text-base text-neutral-700">
          Written by a MetroMD board member. Members can pitch their own.
        </div>
        <Link className="btn btn-secondary" href="/contact">
          Pitch an article
        </Link>
      </div>
    </article>
  );
}
