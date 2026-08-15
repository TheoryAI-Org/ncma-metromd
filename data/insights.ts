/**
 * Insights articles.
 *
 * Every entry is currently a DRAFT: the titles were proposed from each
 * author's stated focus in the redesign, and the body copy is placeholder
 * pending the author's own draft. `status` gates the "Draft slate" notice on
 * the index — flip an article to "published" once its copy lands.
 *
 * See README "Insights authoring" for how to move this to a CMS when the
 * volume justifies it.
 */

export type ArticleStatus = "draft" | "published";

export interface Article {
  slug: string;
  title: string;
  category: string;
  /** Matches a BoardMember.slug in data/board.ts — byline and headshot. */
  authorSlug: string;
  status: ArticleStatus;
  readingTimeMinutes: number;
  /** Opening paragraph, also used as the card summary and page description. */
  standfirst: string;
  /** Body blocks. Placeholder until the author's draft arrives. */
  body: Array<
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "pullquote"; text: string }
  >;
}

export const ARTICLES: Article[] = [
  {
    slug: "training-calendar-far-overhaul",
    title: "Building a training calendar around the FAR overhaul",
    category: "Training & education",
    authorSlug: "akinrogunde",
    status: "draft",
    readingTimeMinutes: 6,
    standfirst:
      "Standfirst placeholder: two or three sentences from the author framing why the chapter is putting CMMC, the FAR overhaul, AI in GovCon and CMBOK sessions on this year's calendar, and what a member should take away from each.",
    body: [
      {
        type: "paragraph",
        text: "Body placeholder. Article copy runs at this measure with generous leading; a full piece is roughly 800 to 1,200 words with two or three subheadings. Send the author's draft and it drops straight in.",
      },
      { type: "heading", text: "A subheading" },
      {
        type: "paragraph",
        text: "Body placeholder. Pull quotes, links to the regulation, and references to the session where the topic was covered live all belong here.",
      },
      {
        type: "pullquote",
        text: "A pull quote from the article sits here, set in the serif's true italic.",
      },
      {
        type: "paragraph",
        text: "Closing placeholder. The last paragraph points the reader at the next dinner meeting or training session on the topic.",
      },
    ],
  },
  {
    slug: "contracting-officer-to-founder",
    title: "From contracting officer to founder, and what carried over",
    category: "Acquisition",
    authorSlug: "hanks",
    status: "draft",
    readingTimeMinutes: 5,
    standfirst:
      "Standfirst placeholder: what the author took from nearly two decades in federal acquisition into running a firm, and which instincts turned out not to transfer.",
    body: [
      {
        type: "paragraph",
        text: "Body placeholder. Send the author's draft and it drops straight in.",
      },
    ],
  },
  {
    slug: "where-ai-helps-procurement",
    title: "Where AI actually helps a procurement shop",
    category: "Technology",
    authorSlug: "belaineh",
    status: "draft",
    readingTimeMinutes: 5,
    standfirst:
      "Standfirst placeholder: a practical read on which parts of the acquisition workflow current tooling genuinely speeds up, and which it only appears to.",
    body: [
      {
        type: "paragraph",
        text: "Body placeholder. Send the author's draft and it drops straight in.",
      },
    ],
  },
  {
    slug: "single-audit-in-plain-terms",
    title: "What auditors look for in a single audit, in plain terms",
    category: "Compliance",
    authorSlug: "sistrunk",
    status: "draft",
    readingTimeMinutes: 6,
    standfirst:
      "Standfirst placeholder: the questions an auditor is actually asking during a single audit, and the documentation that answers them ahead of time.",
    body: [
      {
        type: "paragraph",
        text: "Body placeholder. Send the author's draft and it drops straight in.",
      },
    ],
  },
  {
    slug: "networking-when-you-would-rather-not",
    title: "Networking when you would rather not: a practical guide",
    category: "Careers",
    authorSlug: "sheckles",
    status: "draft",
    readingTimeMinutes: 4,
    standfirst:
      "Standfirst placeholder: how to get value out of a dinner meeting without working the room, written for people who find the room hard work.",
    body: [
      {
        type: "paragraph",
        text: "Body placeholder. Send the author's draft and it drops straight in.",
      },
    ],
  },
];

/** The piece given the lead slot on the Insights index. */
export const FEATURED_SLUG = "training-calendar-far-overhaul";

export const getArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
