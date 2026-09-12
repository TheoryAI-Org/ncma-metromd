import { formatEventDateLong, formatTimeRange, formatVenue } from "@/lib/format";
import { pastMeetings, type PastMeeting } from "@/data/past-meetings";
import type { Event } from "@/types/event";

/**
 * The meeting archive, newest first. Rows come from the live Eventbrite feed;
 * the transcribed archive in data/past-meetings.ts stands in when that feed is
 * unavailable, so the list never renders empty.
 */
export function PastMeetingsTable({
  events,
  limit,
}: {
  events: Event[];
  /** The home page shows only the two most recent meetings. */
  limit?: number;
}) {
  const all: PastMeeting[] =
    events.length > 0
      ? events.map((e) => ({
          date: formatEventDateLong(e.date),
          title: e.title,
          venue: formatVenue(e),
          time: formatTimeRange(e.startTime, e.endTime),
          ticketsUrl: e.eventUrl ?? null,
        }))
      : pastMeetings;

  const rows = limit ? all.slice(0, limit) : all;

  return (
    <div>
      {rows.map((row) => (
        <div className="meeting-row" key={`${row.date}-${row.title}`}>
          <div style={{ fontSize: 17, color: "var(--color-neutral-700)" }}>
            {row.date}
          </div>
          <div>
            <div style={{ fontSize: 21, fontWeight: 600 }}>{row.title}</div>
            {row.venue && (
              <div style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
                {row.venue}
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "var(--color-neutral-700)",
              whiteSpace: "nowrap",
            }}
          >
            {row.time}
          </div>
        </div>
      ))}
    </div>
  );
}
