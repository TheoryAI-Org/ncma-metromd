import { people, type PersonId } from "./board";

/**
 * Insights authors and their articles.
 *
 * Each author is listed on /insights with their headshot (from data/board.ts)
 * and the byline below. Until an author has an article, their card says
 * "Article coming soon"; add an entry to `articles` with their `author` id and
 * the card links to the full article at /insights/<slug>.
 */
export interface InsightsAuthor {
  person: PersonId;
  /** Byline title, as the chapter wants it printed. */
  title: string;
}

export const insightsAuthors: InsightsAuthor[] = [
  { person: "jennifer-hanks", title: "President, NCMA MetroMD" },
  { person: "chyanne-thomas", title: "President-Elect, NCMA MetroMD" },
  { person: "bethlehem-belaineh", title: "VP — Communications, NCMA MetroMD" },
  {
    person: "monique-frazier",
    title:
      "VP — University Outreach, NCMA MetroMD · U.S. Practice Lead – Organizational Change Management & Training, Infosys Public Services",
  },
  {
    person: "sonya-hopson",
    title: "VP — Operations, NCMA MetroMD · Founder & CEO, Sage Services Group LLC",
  },
];

export interface Article {
  /** URL segment: /insights/<slug>. */
  slug: string;
  author: PersonId;
  title: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  /** One or two sentences for the card and search results. */
  summary: string;
  /** The article text, one string per paragraph. */
  body: string[];
}

/** Approved articles only: nothing goes here until the author signs off on the copy. */
export const articles: Article[] = [];

export function authorName(id: PersonId): string {
  return people[id].name;
}

export function articleFor(id: PersonId): Article | undefined {
  return articles.find((a) => a.author === id);
}

export function bylineFor(id: PersonId): string {
  return insightsAuthors.find((a) => a.person === id)?.title ?? "";
}
