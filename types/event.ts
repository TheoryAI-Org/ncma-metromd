export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  imageUrl?: string;
  eventUrl?: string;
  /** Venue name from Eventbrite, when the listing carries one. */
  venue?: string | null;
  /** Eventbrite's online_event flag; virtual listings carry no venue. */
  isOnline?: boolean;
} 