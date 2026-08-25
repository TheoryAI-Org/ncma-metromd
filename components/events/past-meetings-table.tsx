import { formatEventDate, formatTimeRange } from "@/lib/format";
import { pastMeetings, type PastMeeting } from "@/data/past-meetings";
import type { Event } from "@/types/event";

/**
 * The meeting archive. Rows come from the live Eventbrite feed; the transcribed
 * archive in data/past-meetings.ts stands in when that feed is unavailable, so
 * the table never renders empty.
 */
export function PastMeetingsTable({ events }: { events: Event[] }) {
  const rows: PastMeeting[] =
    events.length > 0
      ? events.map((e) => ({
          date: formatEventDate(e.date),
          title: e.title,
          venue: e.venue ?? null,
          time: formatTimeRange(e.startTime, e.endTime),
          ticketsUrl: e.eventUrl ?? null,
        }))
      : pastMeetings;

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 130 }}>Date</th>
            <th>Event</th>
            <th style={{ width: 160 }}>Time</th>
            <th style={{ width: 120 }}>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.date}-${row.title}`}>
              <td style={{ whiteSpace: "nowrap" }}>{row.date}</td>
              <td>
                {row.title}
                {row.venue && (
                  <div
                    style={{ fontSize: 14, color: "var(--color-neutral-700)", marginTop: 2 }}
                  >
                    {row.venue}
                  </div>
                )}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
              <td>
                {row.ticketsUrl ? (
                  <a href={row.ticketsUrl} target="_blank" rel="noopener noreferrer">
                    Eventbrite
                  </a>
                ) : (
                  <span style={{ color: "var(--color-neutral-600)" }}>Closed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
