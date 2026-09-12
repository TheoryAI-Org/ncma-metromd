// Chapter-wide constants used across the site.

/** Canonical origin, used for metadata, JSON-LD and the sitemap. */
export const SITE_URL = "https://ncmametromd.org";

export const NCMA_MEMBERSHIP_URL = "https://www.ncmahq.org/membership";
export const NCMA_CERTIFICATIONS_URL = "https://www.ncmahq.org/certifications";
export const EVENTBRITE_ORG_URL =
  "https://www.eventbrite.com/o/metromd-chapter-of-ncma-80017286413";

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/ncma-metromd/" },
  { name: "Instagram", href: "https://www.instagram.com/ncmametromd/" },
  { name: "Eventbrite", href: EVENTBRITE_ORG_URL },
] as const;

export interface NavItem {
  name: string;
  href: string;
  /** Optional submenu; rendered as a dropdown in the header. */
  children?: readonly { name: string; href: string }[];
}

/**
 * The header carries exactly five links. Certifications, Insights, Highlight
 * and Advisory moved to the footer; those pages stay reachable.
 *
 * "Board & Advisory" opens a dropdown, but the three entries are anchors on the
 * single /board page rather than separate routes.
 */
export const navigation: readonly NavItem[] = [
  { name: "Our chapter", href: "/about" },
  {
    name: "Board & Advisory",
    href: "/board",
    children: [
      { name: "Officers", href: "/board#officers" },
      { name: "Directors", href: "/board#directors" },
      { name: "Board of Advisors", href: "/board#advisors" },
    ],
  },
  { name: "Events", href: "/events" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
] as const;

export interface FooterLink {
  name: string;
  href: string;
  /** External destinations open in a new tab. */
  external?: boolean;
}

export const footerGroups: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Chapter",
    links: [
      { name: "Our chapter", href: "/about" },
      { name: "Board & Advisory", href: "/board" },
      { name: "Board of Advisors", href: "/board#advisors" },
      { name: "Sponsors", href: "/sponsors" },
      { name: "Insights", href: "/insights" },
    ],
  },
  {
    heading: "Members",
    links: [
      { name: "Events", href: "/events" },
      { name: "Certifications", href: NCMA_CERTIFICATIONS_URL, external: true },
      { name: "Monthly highlight", href: "/highlight" },
      { name: "Member sign in", href: "/login" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Follow",
    links: socials.map((s) => ({ name: s.name, href: s.href, external: true })),
  },
];

/** Board members who own a particular inbound topic, shown on the contact page. */
/**
 * Board members who own a particular inbound topic. The contact form posts a
 * topic label and the server looks the address up here; addresses are never
 * rendered into the page.
 *
 * "Something else" has no dedicated owner yet and routes to the president.
 */
/**
 * The topics a visitor can pick on the contact form. Only the labels live here,
 * because this module reaches client components: the board addresses each topic
 * routes to are server-only and live in `data/contact-routes.ts`.
 */
export const contactTopics = [
  "Membership",
  "Programs and meetings",
  "Training and certification",
  "Sponsorship",
  "Newsletter",
  "Something else",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

export const chapterFacts = [
  { label: "When", value: "Most months, see the calendar" },
  { label: "Where", value: "Metro Maryland, venue rotates" },
  { label: "Who comes", value: "1102s, PMs, small business" },
] as const;

export const membershipBenefits = [
  {
    title: "Industry Connections",
    body: "Drive higher performance by attending events and education sessions which bring government and industry together to engage and learn from each other.",
  },
  {
    title: "Certification",
    body: "Professional designations of distinction, NCMA certifications carry the respect of your peers in the profession.",
  },
  {
    title: "Events",
    body: "Monthly meetings, talks and training opportunities.",
  },
  {
    title: "Peer Networking",
    body: "Learn from peers, ask questions, share ideas and discuss challenges.",
  },
  {
    title: "Publications",
    body: "Magazines, professional journals and NCMA books to help you stay ahead of the industry.",
  },
  {
    title: "Training",
    body: "Live or “on demand,” learn from subject matter experts about the “hottest” topics in the industry.",
  },
] as const;
