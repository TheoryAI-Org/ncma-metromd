// The Insights slate. Every piece is still a draft in the design — nothing
// publishes until the author signs off on the copy, hence `status`.

export interface Article {
  slug: string;
  category: string;
  title: string;
  /** Author name; matches a BoardMember.name in data/board.ts where possible. */
  author: string;
  authorRole: string;
  authorLinkedin: string | null;
  /** Headshot path under /public, or null when none has been supplied. */
  authorImage: string | null;
  readingTime: string;
  status: "draft" | "published";
  featured: boolean;
  standfirst: string;
}

export const articles: Article[] = [
  {
    slug: "training-calendar-far-overhaul",
    category: "Training & education",
    title: "Building a training calendar around the FAR overhaul",
    author: "Dr. Patricia Akinrogunde",
    authorRole: "VP, Training & Education",
    authorLinkedin: "https://www.linkedin.com/in/patricia-o-a-6285251a/",
    authorImage: null,
    readingTime: "6 min read",
    status: "draft",
    featured: true,
    standfirst:
      "Standfirst placeholder: two or three sentences from the author framing why the chapter is putting CMMC, the FAR overhaul, AI in GovCon and CMBOK sessions on this year's calendar, and what a member should take away from each.",
  },
  {
    slug: "contracting-officer-to-founder",
    category: "Acquisition",
    title: "From contracting officer to founder, and what carried over",
    author: "Jennifer Hanks",
    authorRole: "Board Chair, President",
    authorLinkedin: "https://www.linkedin.com/in/jahanks/",
    authorImage: "/images/board-hanks.jpeg",
    readingTime: "5 min read",
    status: "draft",
    featured: false,
    standfirst:
      "Standfirst placeholder. The opening paragraph sets up the argument in the author's own words — what changed, who it affects, and what the chapter is doing about it.",
  },
  {
    slug: "where-ai-helps-procurement",
    category: "Technology",
    title: "Where AI actually helps a procurement shop",
    author: "Bethlehem Belaineh",
    authorRole: "VP, Communications",
    authorLinkedin: "https://www.linkedin.com/in/bbelaineh",
    authorImage: "/images/board-belaineh.png",
    readingTime: "7 min read",
    status: "draft",
    featured: false,
    standfirst:
      "Standfirst placeholder. The opening paragraph sets up the argument in the author's own words — what changed, who it affects, and what the chapter is doing about it.",
  },
  {
    slug: "single-audit-in-plain-terms",
    category: "Compliance",
    title: "What auditors look for in a single audit, in plain terms",
    author: "Joye Sistrunk, CPA",
    authorRole: "Treasurer",
    authorLinkedin: null,
    authorImage: "/images/board-sistrunk.jpeg",
    readingTime: "6 min read",
    status: "draft",
    featured: false,
    standfirst:
      "Standfirst placeholder. The opening paragraph sets up the argument in the author's own words — what changed, who it affects, and what the chapter is doing about it.",
  },
  {
    slug: "networking-when-you-would-rather-not",
    category: "Careers",
    title: "Networking when you would rather not: a practical guide",
    author: "Megan (MJ) Sheckles",
    authorRole: "Director of Networking",
    authorLinkedin: null,
    authorImage: "/images/board-sheckles.jpeg",
    readingTime: "4 min read",
    status: "draft",
    featured: false,
    standfirst:
      "Standfirst placeholder. The opening paragraph sets up the argument in the author's own words — what changed, who it affects, and what the chapter is doing about it.",
  },
];

export const featuredArticle = articles.find((a) => a.featured)!;
export const moreArticles = articles.filter((a) => !a.featured);
