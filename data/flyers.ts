import { EVENTBRITE_ORG_URL } from "./site";
import type { Event } from "@/types/event";

export interface EventFlyer {
  id: string;
  title: string;
  /** Short line under the title: when and where. */
  when: string;
  /** Just the date(s), for the home page teaser. */
  dateLabel: string;
  /** Image shown on the page (a PNG preview when the flyer itself is a PDF). */
  image: string;
  width: number;
  height: number;
  alt: string;
  /** Full flyer to open or download; defaults to the image. */
  file?: string;
  /** Fallback link when no matching Eventbrite listing is found. */
  registerUrl: string;
  /** Dates (YYYY-MM-DD) of this flyer's Eventbrite listings, used to find its event page. */
  eventDates: string[];
  /** Last day the flyer is shown (YYYY-MM-DD, Eastern time). */
  showUntil: string;
}

/**
 * Flyers shown on /events (and teased on the home page). Drop the file in
 * public/images, add an entry here, and it disappears on its own after
 * `showUntil`.
 */
export const eventFlyers: EventFlyer[] = [
  {
    id: "october-2026-dinner",
    title: "Strengthening Internal Accounting and Compliance Controls",
    when: "Dinner meeting · Thursday, October 15, 2026 · 5:30–8:00 PM · Westin National Harbor",
    dateLabel: "Thursday, October 15",
    image: "/images/NCMA MetroMD October 15, 2026 Speaker Flyer.png",
    width: 1275,
    height: 1650,
    alt: "Flyer for the October 15, 2026 dinner meeting, Strengthening Internal Accounting and Compliance Controls, with speakers Jeff Ryder and Eric Poppe, CPA, of Aprio at the Westin National Harbor. Tickets: Government $50, NCMA Member $70, Non-Member $85, Reserved Seats $100.",
    file: "/images/NCMA MetroMD October 15, 2026 Speaker Flyer.pdf",
    registerUrl: EVENTBRITE_ORG_URL,
    eventDates: ["2026-10-15"],
    showUntil: "2026-10-15",
  },
  {
    id: "contracting-edge-2026",
    title: "The Contracting Edge: four-part virtual training series",
    when: "Live online · Second Friday of each month, 12:00–1:00 PM ET · October 9, 2026 – January 8, 2027",
    dateLabel: "Second Fridays, through January 8, 2027",
    image: "/images/Contracting Edge Flyer.png",
    width: 1247,
    height: 1261,
    alt: "Flyer for The Contracting Edge, a four-part virtual training series on the second Friday of each month from 12:00 to 1:00 PM ET: October 9, 2026 CMS Training; November 13, 2026 CMBOK Training; December 11, 2026 General Certifications Overview; January 8, 2027 NCMA Fellow Application Process. Single session $15, two sessions $28, three sessions $40, full series $50.",
    registerUrl: EVENTBRITE_ORG_URL,
    eventDates: ["2026-10-09", "2026-11-13", "2026-12-11", "2027-01-08"],
    showUntil: "2027-01-08",
  },
];

/** Flyers whose event has not passed yet, in Eastern time. */
export function currentFlyers(now: Date = new Date()): EventFlyer[] {
  const today = now.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  return eventFlyers.filter((f) => f.showUntil >= today);
}

/**
 * Points each flyer at its own Eventbrite listing, found by date in the live
 * event list. Upcoming listings are checked first (soonest first), so a series
 * links to its next session. Flyers with no match keep their fallback link.
 */
export function withEventLinks(flyers: EventFlyer[], events: Event[]): EventFlyer[] {
  return flyers.map((f) => {
    const match = events.find((e) => e.eventUrl && f.eventDates.includes(e.date));
    return match?.eventUrl ? { ...f, registerUrl: match.eventUrl } : f;
  });
}
