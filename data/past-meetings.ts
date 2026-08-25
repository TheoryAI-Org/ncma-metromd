// The chapter's meeting archive, transcribed from the approved redesign.
//
// The events page renders the live Eventbrite feed. This list is the fallback
// shown when that feed is unavailable (no API credentials, or an API error),
// so the archive never renders empty. Eventbrite only returns a limited
// window of history, so this also preserves meetings older than that window.

import { EVENTBRITE_ORG_URL } from "./site";

export interface PastMeeting {
  date: string;
  title: string;
  venue: string | null;
  time: string;
  /** Eventbrite listing, or null once registration has closed. */
  ticketsUrl: string | null;
}

export const pastMeetings: PastMeeting[] = [
  { date: "Jun 16, 2026", title: "MetroMD + Defense Logistics Agency (DLA) June Dinner Meeting", venue: "The Westin Washington National Harbor", time: "4:00 – 8:30 PM", ticketsUrl: "https://www.eventbrite.com/e/metromd-defense-logistics-agency-dla-june-dinner-meeting-tickets-1266518594209" },
  { date: "Apr 30, 2026", title: "NCMA MetroMD Dinner Meeting", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Apr 17, 2026", title: "NCMA MetroMD Workshop — Developing a High-Impact Capability Statement", venue: "American Job Center National Harbor", time: "10:00 AM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Mar 20, 2026", title: "NCMA MetroMD Workshop — Developing a High-Impact Capability Statement", venue: "American Job Center National Harbor", time: "10:00 AM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Mar 19, 2026", title: "NCMA MetroMD’s Cocktails & Conversation", venue: "Topgolf National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Feb 27, 2026", title: "NCMA MetroMD Workshop — Master the Art & Science of Pricing", venue: "American Job Center National Harbor", time: "10:00 AM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Feb 25, 2026", title: "NCMA MetroMD Winter Networking Happy Hour — Facing the Future Together!", venue: "The Brass Tap", time: "6:00 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Dec 19, 2025", title: "NCMA MetroMD December Professional Development Training", venue: null, time: "10:00 AM EST", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Nov 13, 2025", title: "NCMA MetroMD Dinner Meeting & Food Drive", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Jun 19, 2025", title: "NCMA MetroMD Dinner Meeting", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "May 15, 2025", title: "NCMA MetroMD Dinner Meeting", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Apr 17, 2025", title: "NCMA MetroMD Dinner Meeting", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Mar 20, 2025", title: "MetroMD’s 1st Anniversary Dinner Celebration", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Feb 20, 2025", title: "NCMA MetroMD February 20th Dinner Meeting", venue: "The Westin Washington National Harbor", time: "5:30 PM", ticketsUrl: EVENTBRITE_ORG_URL },
  { date: "Jan 16, 2025", title: "NCMA MetroMD January Dinner Meeting", venue: null, time: "4:45 – 8:00 PM", ticketsUrl: "https://www.eventbrite.com/e/ncma-metromd-january-dinner-meeting-tickets-1132322389749" },
  { date: "Nov 21, 2024", title: "NCMA MetroMD Salute to Veterans November Dinner", venue: null, time: "5:30 – 8:00 PM", ticketsUrl: "https://www.eventbrite.com/e/ncma-metromd-salute-to-veterans-november-dinner-tickets-1073351516279" },
  { date: "Oct 31, 2024", title: "The CMBOK and FAR Connection", venue: null, time: "6:00 – 8:00 PM", ticketsUrl: "https://www.eventbrite.com/e/the-cmbok-and-far-connection-tickets-1069776924579" },
  { date: "Oct 17, 2024", title: "NCMA MetroMD October 17th Dinner Meeting", venue: null, time: "5:30 – 8:00 PM", ticketsUrl: "https://www.eventbrite.com/e/ncma-metromd-october-17th-dinner-meeting-tickets-1037291475727" },
  { date: "Aug 15, 2024", title: "NCMA MetroMD August 15th Dinner Meeting", venue: null, time: "5:30 – 8:00 PM", ticketsUrl: "https://www.eventbrite.com/e/ncma-metromd-august-15th-dinner-meeting-tickets-940907057337" },
  { date: "Jun 27, 2024", title: "NCMA MetroMD June Dinner Meeting", venue: null, time: "5:30 – 8:00 PM", ticketsUrl: null },
  { date: "May 16, 2024", title: "NCMA MetroMD May Dinner Meeting", venue: null, time: "5:30 – 8:00 PM", ticketsUrl: null },
  { date: "Apr 18, 2024", title: "NCMA MetroMD April Dinner Meeting", venue: null, time: "5:30 – 8:00 PM", ticketsUrl: null },
  { date: "Mar 21, 2024", title: "NCMA MetroMD Kick-Off", venue: null, time: "6:00 – 8:00 PM", ticketsUrl: null },
];
