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
  {
    person: "chyanne-thomas",
    title: "President-Elect, NCMA MetroMD",
    org: "Founder & CEO, Aurelus Solutions",
  },
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

/**
 * One block of article text. A plain string is a paragraph; the others are a
 * section heading or a bulleted / numbered list. Text may use **bold**,
 * *italic* and [link text](https://...).
 */
export type ArticleBlock = string | { h2: string } | { ul: string[] } | { ol: string[] };

export interface Article {
  /** URL segment: /insights/<slug>. */
  slug: string;
  author: PersonId;
  title: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  /** One or two sentences for the card and search results. */
  summary: string;
  /** The article text, in blocks (see ArticleBlock). */
  body: ArticleBlock[];
  /** Credited as "Edited by" under the byline. */
  editor?: PersonId;
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

// Entries marked `draft: true` are samples awaiting their author's sign-off and
// stay hidden on the live site; entries without it are approved and published.
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
    slug: "quantum-is-already-here",
    author: "chyanne-thomas",
    editor: "bethlehem-belaineh",
    title: "Quantum Is Already Here: Why Small GovCon Firms Can't Afford to Wait",
    date: "2026-10-30",
    summary:
      "Adversaries are already harvesting encrypted data to decrypt later, and federal post-quantum deadlines now reach contractors directly. Why small GovCon firms should start their migration now, and where to begin this quarter.",
    body: [
      { h2: "Quantum isn't coming. It's here." },
      "We keep talking about quantum computing as a future event, a “Q-Day” somewhere over the horizon. That framing is the most dangerous thing about it. The threat to your data did not start the day a quantum computer breaks encryption. It started the day someone copied your encrypted data and decided to keep it.",
      "Security professionals call this **“harvest now, decrypt later.”** An adversary does not need a working quantum computer today. They only need to collect your traffic, your files and your client communications now, store them cheaply, and wait. When the machine arrives, everything they saved opens at once.",
      "So the right question is not “When will quantum be here?” It is “How long does my data need to stay secret, and is that longer than the time we have left?” For anyone holding contract data, personnel records, pricing, technical drawings or mission information, the honest answer is: we should be acting as if quantum is already here.",
      { h2: "How much of your data has already been taken?" },
      "Ask yourself a hard question: how much of your organization's data has already been stolen? Most small firms cannot answer it. A breach that copies encrypted files often leaves no visible damage, so it never gets reported, investigated or even noticed.",
      "Now think about what moves between a government client and its vendors every day:",
      {
        ul: [
          "Proposals, pricing and labor rates",
          "Controlled Unclassified Information (CUI) and technical data",
          "Personnel files, clearances and badge records",
          "System designs, network diagrams and credentials",
          "Email threads, contract modifications and deliverables",
        ],
      },
      "Every one of those exchanges is protected today by public-key encryption, the same math a large quantum computer is expected to break. If that traffic was captured last year, it is not safe just because it was encrypted. It is simply waiting.",
      "That makes this a shared risk. The agency can modernize its own systems, but if a subcontractor's email, file share or VPN still runs on vulnerable cryptography, the data leaks through the weakest link. In the government supply chain, small businesses are very often that link.",
      { h2: "The federal clock is already running" },
      "This is no longer a research topic. It is a compliance schedule, and it reaches contractors directly.",
      "NIST published the first three post-quantum encryption standards, FIPS 203, 204 and 205, in August 2024. On June 22, 2026, the President signed the executive order *Securing the Nation Against Advanced Cryptographic Attacks*, which turned those standards into deadlines ([Crowell & Moring summary](https://www.crowell.com/en/insights/client-alerts/twin-executive-orders-seek-to-spur-quantum-leap-in-technology-and-cybersecurity)). The dates that matter to a vendor:",
      {
        ul: [
          "**Around December 19, 2026:** the FAR Council's proposed rule on contractor post-quantum compliance is due, 180 days after the order.",
          "**Around March 2027:** a second proposed FAR rule is due, requiring covered contractors to run vulnerability disclosure programs that cover cryptographic weaknesses. CISA is also defining a “cryptographic bill of materials” for hardware and software.",
          "**December 31, 2030:** covered federal contractors must comply with NIST's post-quantum standards.",
          "**2030 to 2031:** agencies must move their high-value and high-impact systems to post-quantum cryptography.",
        ],
      },
      "Two things are still open. The order does not define “covered contractor,” and the proposed rule has not yet been published. That uncertainty is not a reason to wait. Primes will not wait for the final rule to protect their own compliance; expect them to start asking subcontractors for evidence of cryptographic readiness well before 2030.",
      { h2: "Why small businesses feel this differently" },
      "A large prime can treat quantum readiness as a line item. It has a CISO, a security budget and the cash to absorb a multi-year migration. Even if the price tag is large, it can spend freely and keep bidding.",
      "A small business does not have that cushion. The same requirement can mean replacing a VPN, upgrading a firewall, renegotiating a cloud contract and retraining a two-person IT team, all while still delivering on current task orders. If the work is squeezed into the last year before a deadline, it competes with payroll.",
      "That is exactly why small firms should start now. Spread over four years, migration becomes a series of planned refresh decisions. Compressed into one, it becomes an emergency that can cost you a recompete.",
      "A practical cost analysis does not need to be complicated. It should answer five questions:",
      {
        ol: [
          "**What do we have?** Every system, device and service that encrypts or signs data.",
          "**What is already on a refresh cycle?** Equipment you will replace anyway before 2030 is a cheap upgrade path if you buy quantum-ready now.",
          "**What depends on someone else?** Cloud, email, payroll and managed-service providers will do much of the work for you, but only if you confirm their roadmap.",
          "**What can't be upgraded?** Older hardware and embedded devices may need full replacement. These are your biggest costs, so find them first.",
          "**What does inaction cost?** A lost recompete, an ineligible bid or a breach of client data will cost far more than a planned migration.",
        ],
      },
      "The cheapest quantum migration is the one you fold into purchases you were already going to make.",
      { h2: "It's not just data: hardware, sensing and opportunity" },
      "Encryption gets the headlines, but quantum touches far more of the business.",
      "**Hardware.** Cryptography lives inside physical devices: routers, firewalls, badge readers, laptops with hardware security chips, IoT sensors, even printers. Many cannot be patched to new algorithms. A vendor that delivers or maintains equipment for an agency needs to know which products in its catalog are quantum-ready and which are dead ends. CISA's coming cryptographic bill of materials will make that question part of acquisition.",
      "**Sensing and navigation.** Quantum sensors measure time, gravity and magnetic fields with extreme precision, and could offer an alternative to GPS. The June 2026 innovation order directs the Department of War to field at least three next-generation quantum sensing projects by September 30, 2028. That means new requirements for integration, testing, logistics and support.",
      "**Opportunity.** The same orders launch a national push on quantum computing, networking, supply chain and workforce. Agencies will need help with cryptographic inventories, migration planning, training and program support. Small businesses that understand quantum now can be the vendors helping agencies and primes through the transition, not just the ones being asked to comply.",
      { h2: "Where to start this quarter" },
      "You do not need a quantum physicist to begin. You need a plan and an owner.",
      {
        ol: [
          "**Name a quantum-readiness lead.** Federal agencies had to do this within 30 days of the order. A small business can do it this week, even if it is a part-time role.",
          "**Build a cryptographic inventory.** List where your firm encrypts or signs anything: email, VPN, websites, file sharing, cloud storage, laptops, phones, badge systems and any equipment you deliver to clients.",
          "**Rank by data lifespan.** Anything that must stay secret for more than five years (CUI, proposals, personnel data, technical designs) is already at risk from harvest-now, decrypt-later. Protect that first.",
          "**Ask your providers the hard question.** Send cloud, email, MSP and hardware vendors one line: “What is your post-quantum roadmap, and when will our services support NIST FIPS 203, 204 and 205?” Their answers shape your cost analysis.",
          "**Buy for crypto-agility.** From today on, make quantum readiness a requirement in every technology purchase, so each refresh moves you forward.",
          "**Watch the FAR rule and comment on it.** The proposed rule due around December 2026 will define who is covered. Small businesses should make their voices heard during the comment period.",
          "**Talk to your primes and clients.** Ask what they expect from subcontractors. Being the vendor who raises it first is a competitive advantage.",
        ],
      },
      { h2: "Why wait for the risk before we mitigate it?" },
      "We would never wait for a breach to install a firewall. We would never wait for an audit to start writing our security plan. Quantum deserves the same discipline.",
      "The data your firm shares with government clients today could be read tomorrow by someone who saved it years ago. The rules are being written right now. The firms that start early will spread the cost, keep their eligibility and earn their clients' trust. The firms that wait will pay more, in a hurry, under pressure.",
      "Let's position ourselves to be aware, to understand what we need to migrate, and to act as if quantum is already here. Because for our data, it already is.",
      { h2: "Sources" },
      {
        ul: [
          "[Crowell & Moring: Twin Executive Orders Seek to Spur Quantum Leap in Technology and Cybersecurity](https://www.crowell.com/en/insights/client-alerts/twin-executive-orders-seek-to-spur-quantum-leap-in-technology-and-cybersecurity) (June 25, 2026)",
          "[Cooley: Quantum Computing EOs Create Immediate Compliance Deadlines](https://www.cooley.com/news/insight/2026/2026-07-29-quantum-computing-eos-create-immediate-compliance-deadlines-new-federal-partnership-opportunities) (July 29, 2026)",
          "[Wiley: Key Takeaways from the Quantum and PQC Executive Orders](https://www.wiley.law/alert-The-Next-Frontier-of-Quantum-Innovation-Key-Takeaways-from-President-Trumps-Quantum-and-Post-Quantum-Cryptography-Executive-Orders) (June 30, 2026)",
        ],
      },
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
