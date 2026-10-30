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
  /** Chapter title for the byline, as the chapter wants it printed. */
  title: string;
  /** Second byline line (e.g. their company role), when the chapter wants it shown. */
  org?: string;
}

export const insightsAuthors: InsightsAuthor[] = [
  { person: "jennifer-hanks", title: "President, NCMA MetroMD" },
  { person: "chyanne-thomas", title: "President-Elect, NCMA MetroMD" },
  { person: "bethlehem-belaineh", title: "VP — Communications, NCMA MetroMD" },
  {
    person: "monique-frazier",
    title: "VP — University Outreach, NCMA MetroMD",
    org: "U.S. Practice Lead – Organizational Change Management & Training, Infosys Public Services",
  },
  {
    person: "sonya-hopson",
    title: "VP — Operations, NCMA MetroMD",
    org: "Founder & CEO, Sage Services Group LLC",
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
