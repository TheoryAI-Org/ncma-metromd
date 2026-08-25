// Sponsorship levels and the current sponsor roll.

export const sponsorLevels = [
  {
    name: "Platinum",
    accent: "var(--color-accent-2-700)",
    body: "Top billing across the season: named on every meeting, logo on the site, newsletter and all event material, a reserved table at each dinner, and a speaking slot.",
  },
  {
    name: "Gold",
    accent: "var(--color-accent-700)",
    body: "Logo on the site and newsletter, recognition from the podium at every meeting, and reserved seating at dinners.",
  },
  {
    name: "Silver",
    accent: "var(--color-neutral-700)",
    body: "Logo on the site and in the newsletter, with recognition at the meetings you attend.",
  },
  {
    name: "Bronze",
    accent: "var(--color-neutral-700)",
    body: "Name listed on the site and in the newsletter — the entry point for small businesses.",
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
    title: "Venue & training",
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
