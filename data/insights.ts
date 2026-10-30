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
  /**
   * Draft awaiting the author's approval. Drafts show on preview builds and
   * local development only, with a "Draft" banner, and never on the live site.
   * Delete this flag once the author signs off on the copy.
   */
  draft?: boolean;
}

/** True on the live site (Vercel production), where drafts must not show. */
const isProduction = process.env.VERCEL_ENV === "production";

/** Articles visible in this build: approved ones always, drafts only off production. */
export function visibleArticles(): Article[] {
  return articles.filter((a) => !a.draft || !isProduction);
}

export function authorName(id: PersonId): string {
  return people[id].name;
}

export function articleFor(id: PersonId): Article | undefined {
  return visibleArticles().find((a) => a.author === id);
}

// Sample drafts written for each author to react to. Nothing here is approved:
// each stays `draft: true` (hidden on the live site) until its author signs off.
export const articles: Article[] = [
  {
    slug: "bridging-policy-and-execution",
    author: "jennifer-hanks",
    draft: true,
    title: "Bridging Policy and Execution: What Acquisition Modernization Asks of the Workforce",
    date: "2026-11-02",
    summary:
      "Modernization succeeds or stalls at the desk where policy turns into practice. A look at what that shift asks of contracting professionals and the organizations that support them.",
    body: [
      "Acquisition modernization is usually described in terms of systems: new platforms, new data standards, streamlined regulations. Those changes matter, but they only deliver results when the people who apply them every day understand not just what has changed, but why.",
      "The gap between policy and execution is where most reform efforts lose momentum. A rule can be rewritten in months; the habits, templates and review chains built around the old rule can take years to follow. Contracting officers and specialists are asked to move faster while still carrying full accountability for every decision they sign.",
      "Closing that gap starts with treating the workforce as part of the design, not the last step in implementation. When practitioners help shape new processes, the result reflects how work actually flows, and adoption follows because people recognize their own experience in the change.",
      "It also means investing in judgment, not just compliance. Modern acquisition rewards professionals who can weigh risk, ask good questions of industry and choose the right vehicle for the mission. Training that builds that judgment, through case studies, mentoring and honest discussion of trade-offs, pays off long after any single policy update.",
      "Industry has a role to play as well. Companies that take the time to understand an agency's constraints, and that communicate clearly and early, make it easier for the government to use the flexibilities modernization offers.",
      "This is the work NCMA MetroMD was founded to support: bringing government and industry into the same room, building relationships before there is a deadline, and helping professionals at every stage of their careers grow the skills modernization depends on.",
    ],
  },
  {
    slug: "leading-with-purpose",
    author: "chyanne-thomas",
    draft: true,
    title: "Leading with Purpose: Lessons from Service for the Next Generation of Contracting Leaders",
    date: "2026-11-02",
    summary:
      "The principles that guide leaders in uniform, from mission focus to care for the team, translate directly to building strong contracting organizations.",
    body: [
      "Leadership is often discussed as a title, but it is better understood as a practice. In the military, that practice is built around a clear mission, a shared sense of responsibility and a commitment to the people beside you. Those same principles are just as valuable in contract management.",
      "Start with the mission. Every acquisition exists to deliver something an agency and the public need. Leaders who keep that purpose in view help their teams make better decisions under pressure, because they know what matters most when priorities compete.",
      "Next, take care of your people. Contracting work is detailed, deadline-driven and often unseen when it goes well. Leaders who recognize that effort, protect their team's time and invest in their growth build organizations people want to stay in.",
      "Purpose-driven leadership also means leading yourself. Clarity about your own values and goals makes it easier to handle setbacks, give honest feedback and stay steady when the work gets hard. Personal growth and professional excellence are not separate tracks; each strengthens the other.",
      "Veterans bring these habits into the acquisition community in large numbers, and so do many who have never served. What they share is a belief that leadership is about the people you serve and the people you lead.",
      "As NCMA MetroMD grows, we want every member to see a place for themselves in that kind of leadership, whether they are new to the field or guiding a team of their own.",
    ],
  },
  {
    slug: "putting-ai-to-work-in-acquisition",
    author: "bethlehem-belaineh",
    draft: true,
    title: "Putting AI to Work in Acquisition, Responsibly",
    date: "2026-11-02",
    summary:
      "Artificial intelligence can take routine work off contracting professionals' plates. Getting real value from it depends on clear use cases, good data and people who stay in charge of the decisions.",
    body: [
      "Artificial intelligence is moving quickly from conference topic to everyday tool. For contracting professionals, the question is no longer whether AI will touch their work, but where it can genuinely help and where human judgment must stay firmly in charge.",
      "The most promising uses are the ones that remove friction without removing accountability: summarizing long documents, comparing requirements across solicitations, drafting first versions of routine correspondence and surfacing relevant clauses or past decisions. Each saves time while leaving the decision with a person.",
      "Good results start with a clear problem. Teams that begin with a specific, measurable pain point, such as the hours spent on market research or on assembling a file, get further than teams that begin with a tool and look for a use for it.",
      "Data and governance come next. AI is only as reliable as the information behind it, and acquisition data carries real sensitivity. Organizations need clear rules about what data a tool can see, how outputs are checked and who is responsible when something is wrong.",
      "Finally, adoption is a people effort. Professionals need training that shows both what these tools do well and where they fall short, so they can use them with confidence and catch errors before they matter.",
      "For government and industry alike, the opportunity is to let technology handle the repetitive work so people can spend more time on strategy, relationships and mission outcomes. NCMA MetroMD will keep bringing these conversations to our members as the tools and the guidance evolve.",
    ],
  },
  {
    slug: "change-management-in-acquisition",
    author: "monique-frazier",
    draft: true,
    title: "The People Side of Transformation: Why Change Management Belongs in Every Acquisition Initiative",
    date: "2026-11-02",
    summary:
      "New systems and processes deliver value only when people adopt them. Building change management and training into acquisition initiatives from the start makes that adoption far more likely.",
    body: [
      "Public sector organizations invest heavily in new systems, processes and policies. Yet many of those efforts fall short of their goals, not because the technology fails, but because the people expected to use it were never fully brought along.",
      "Organizational change management addresses that gap. It treats adoption as a planned outcome rather than an afterthought, with the same attention given to schedules and budgets. That means understanding who is affected, what will change for them and what support they need to succeed.",
      "In acquisition, the stakes are high. A new contract writing system, a revised approval process or a shift in policy touches professionals who are already managing heavy workloads and firm deadlines. Without clear communication and practical training, even well-designed changes can slow work down before they speed it up.",
      "Effective change efforts share a few traits: visible sponsorship from leaders, early involvement of the people doing the work, training matched to real tasks and a way to measure whether adoption is actually happening. When those pieces are in place, organizations see results sooner and sustain them longer.",
      "The same principles apply to growing the workforce itself. Students and early-career professionals entering contract management need structured paths into the field, mentors who can explain how the work really happens and exposure to both government and industry perspectives.",
      "Through its university outreach, NCMA MetroMD aims to connect the next generation with the professionals and organizations shaping the field, so that every transformation has people ready to carry it forward.",
    ],
  },
  {
    slug: "building-a-small-business-in-federal-contracting",
    author: "sonya-hopson",
    draft: true,
    title: "Operations First: Building a Small Business That Lasts in Federal Contracting",
    date: "2026-11-02",
    summary:
      "Winning a contract is only the beginning. Small businesses that invest early in operations, people and relationships are the ones positioned to perform and grow.",
    body: [
      "For many small businesses, federal contracting starts with a focus on winning the first award. That focus is understandable, but long-term success depends just as much on what happens after the award: delivering on time, managing people well and building a reputation agencies trust.",
      "Strong operations are the foundation. Clear processes for hiring, onboarding, timekeeping, invoicing and quality control may not be glamorous, but they determine whether a company can perform consistently and pass the reviews that come with government work.",
      "People are the next priority. In services contracting especially, a company's capability is its workforce. Investing in training and professional development, and creating a culture where employees can grow, improves performance and helps retain the talent clients rely on.",
      "Relationships matter at every stage. Agencies, prime contractors and fellow small businesses are all potential partners. Showing up at industry events, listening carefully to customer needs and following through on commitments builds the trust that leads to the next opportunity.",
      "Small businesses also benefit from knowing the programs and certifications available to them and from finding mentors who have navigated the same path. No company has to figure out the federal market alone.",
      "NCMA MetroMD brings together small business owners, larger firms and government professionals so these connections can happen naturally. Our goal is to help more companies not just enter the federal market, but thrive in it.",
    ],
  },
];
