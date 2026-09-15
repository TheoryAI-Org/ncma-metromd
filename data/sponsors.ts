// Sponsorship levels and the current sponsor roll.

/**
 * The one-page sponsorship flyer, embedded on /sponsors so visitors see it
 * without downloading anything. `image` is an optional raster of the same
 * artwork: set it and the page shows that instead of the PDF embed, which is
 * kinder to phone browsers, several of which will not render a PDF inline.
 */
export const sponsorshipFlyer: {
  image: string | null;
  pdf: string;
  alt: string;
} = {
  image: null,
  pdf: "/sponsorship/ncma-metromd-sponsorship-flyer.pdf",
  alt: "NCMA Metro Maryland 2026-2027 sponsorship flyer",
};

/**
 * The sponsor roll is hidden until the sponsorship drive closes. Flip to true
 * to bring the "This season's sponsors" section back.
 */
export const showSponsorRoll = false;

export interface SponsorshipTier {
  name: string;
  price: string;
}

/**
 * The 2026-2027 packages, in the two groups the flyer uses. Benefits per tier
 * are set out in the flyer PDF rather than repeated here, so the two cannot
 * drift apart.
 */
export const chapterSponsorships: SponsorshipTier[] = [
  { name: "Title Sponsor", price: "$25,000" },
  { name: "Platinum Sponsor", price: "$10,000" },
  { name: "Gold Sponsor", price: "$5,000" },
];

export const eventSponsorships: SponsorshipTier[] = [
  { name: "Event Title Sponsor", price: "$5,000" },
  { name: "Program Sponsor", price: "$2,500" },
  { name: "Network Sponsor", price: "$1,000" },
  { name: "Training Sponsor", price: "$500" },
];

export const sponsorshipOptions = [
  {
    kicker: "Per meeting",
    title: "Dinner sponsor",
    body: "Underwrite one dinner meeting: welcome remarks, table signage, and your material at each seat.",
  },
  {
    kicker: "In kind",
    title: "Venue and training",
    body: "Host a session in your space or supply an instructor. Credited the same as a cash sponsor.",
  },
  {
    kicker: "Ask",
    title: "Something else",
    body: "Scholarships, student outreach and training underwriting are all open to discussion.",
  },
] as const;

/**
 * Current sponsors. The design reserves 20 logo slots and none have been
 * supplied yet — add `{ name, logo: "/images/sponsors/acme.png", href }`
 * entries here and the grid fills in automatically.
 */
export interface Sponsor {
  name: string;
  logo: string;
  href?: string;
}

export const sponsors: Sponsor[] = [];

/** How many empty slots to draw while the logos are being collected. */
export const SPONSOR_PLACEHOLDER_SLOTS = 20;
