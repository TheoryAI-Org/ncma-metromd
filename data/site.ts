// Chapter-wide constants used across the site.

export const NCMA_MEMBERSHIP_URL = "https://www.ncmahq.org/membership";
export const NCMA_CERTIFICATIONS_URL = "https://www.ncmahq.org/certifications";
export const EVENTBRITE_ORG_URL =
  "https://www.eventbrite.com/o/metromd-chapter-of-ncma-80017286413";

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/ncma-metromd/" },
  { name: "Instagram", href: "https://www.instagram.com/ncmametromd/" },
  { name: "Eventbrite", href: EVENTBRITE_ORG_URL },
] as const;

export const navigation = [
  { name: "Our chapter", href: "/about" },
  { name: "Board", href: "/board" },
  { name: "Advisory", href: "/board#advisors" },
  { name: "Insights", href: "/insights" },
  { name: "Events", href: "/events" },
  { name: "Certifications", href: "/certs" },
  { name: "Highlight", href: "/highlight" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
] as const;

/** Board members who own a particular inbound topic, shown on the contact page. */
export const contactRoutes = [
  { topic: "Membership", name: "Jennifer Hanks", email: "jahanks@mmcgovsolutions.com" },
  { topic: "Programs", name: "Renita Anderson", email: "randerson@deftechno.com" },
  { topic: "Training", name: "Dr. Patricia Akinrogunde", email: "patricia@triplejoygroup.com" },
  { topic: "Sponsorship", name: "Sonya Hopson", email: "sonya@sageservicesgroupllc.com" },
  { topic: "Newsletter", name: "Bethlehem Belaineh", email: "be@theoryai.co" },
] as const;

export const chapterFacts = [
  { label: "When", value: "Third Thursday, 5:30 PM" },
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
