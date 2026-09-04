// Date and time formatting shared by the home page and the events calendar.
// Eventbrite hands back local wall-clock strings ("2026-06-16", "17:30"), so
// these parse them as local time rather than letting Date treat them as UTC.

function parseLocalDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatEventDate(date: string): string {
  return parseLocalDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventDateShort(date: string): string {
  return parseLocalDate(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

/**
 * Ranges are spelled "4:45 to 8:00 PM", not with a dash. The chapter's copy
 * rules call this out explicitly.
 */
export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} to ${formatTime(end)}`;
}

/** "January 16, 2025" — the long form used in meeting rows. */
export function formatEventDateLong(date: string): string {
  return parseLocalDate(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
