// Sponsorship levels and the current sponsor roll.

/**
 * The 2026-2027 sponsorship flyer, shown on /sponsors in place of the old
 * season-level cards. Both files are supplied by the chapter; until they are
 * added to public/, leave this null and the page shows a short standing note
 * instead of a broken image.
 *
 * To publish it, drop the two files in and fill this in, e.g.
 *   { image: "/sponsorship/flyer-2026-2027.png",
 *     pdf:   "/sponsorship/flyer-2026-2027.pdf",
 *     alt:   "NCMA Metro Maryland 2026-2027 sponsorship opportunities" }
 */
export const sponsorshipFlyer: {
  image: string;
  pdf: string;
  alt: string;
} | null = null;

/**
 * The sponsor roll is hidden until the sponsorship drive closes. Flip to true
 * to bring the "This season's sponsors" section back.
 */
export const showSponsorRoll = false;

export const sponsorLevels = [
  {
    name: "Platinum",
    body: "Top billing across the season: named on every meeting, logo on the site, newsletter and all event material, a reserved table at each dinner, and a speaking slot.",
  },
  {
    name: "Gold",
    body: "Logo on the site and newsletter, recognition from the podium at every meeting, and reserved seating at dinners.",
  },
  {
    name: "Silver",
    body: "Logo on the site and in the newsletter, with recognition at the meetings you attend.",
  },
  {
    name: "Bronze",
    body: "Name listed on the site and in the newsletter. The entry point for small businesses.",
  },
] as const;

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
