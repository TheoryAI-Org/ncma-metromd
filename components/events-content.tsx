import Link from "next/link";
import { SOCIAL_LINKS } from "@/components/social-links";
import type { Event } from "@/types/event";

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function EventRows({ events }: { events: Event[] }) {
  return (
    <div className="flex flex-col gap-7">
      {events.map((event) => (
        <div
          key={event.id}
          className="grid grid-cols-1 items-baseline gap-2 sm:grid-cols-[150px_1fr] sm:gap-6 lg:grid-cols-[150px_1fr_auto]"
        >
          <div className="text-base text-neutral-600">{formatDate(event.date)}</div>
          <div>
            <div className="text-2xl">{event.title}</div>
            <div className="text-base text-neutral-700">
              {formatTime(event.startTime)} – {formatTime(event.endTime)}
            </div>
          </div>
          {event.eventUrl && (
            <a
              className="btn btn-secondary justify-self-start"
              href={event.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tickets
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

interface EventsContentProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export function EventsContent({ upcomingEvents, pastEvents }: EventsContentProps) {
  return (
    <>
      <h2 className="mb-4 mt-14 text-[28px]">Upcoming</h2>
      {upcomingEvents.length > 0 ? (
        <EventRows events={upcomingEvents} />
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div>
            <div className="text-[26px]">Nothing published yet this season</div>
            <div className="mt-1 max-w-[60ch] text-base text-neutral-700">
              This list pulls from the chapter&apos;s Eventbrite organizer page —
              new listings appear here automatically.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={SOCIAL_LINKS.eventbrite}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Eventbrite
            </a>
            <Link className="btn btn-secondary" href="/insights">
              Get the newsletter
            </Link>
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <>
          <h2 className="mb-4 mt-16 text-[28px]">Past meetings</h2>
          {/* Wide table scrolls in its own container rather than the page. */}
          <div className="overflow-x-auto">
            <table className="table min-w-[640px]">
              <thead>
                <tr>
                  <th className="w-[130px]">Date</th>
                  <th>Event</th>
                  <th className="w-[160px]">Time</th>
                  <th className="w-[120px]">Tickets</th>
                </tr>
              </thead>
              <tbody>
                {pastEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{formatDate(event.date)}</td>
                    <td>{event.title}</td>
                    <td>
                      {formatTime(event.startTime)} – {formatTime(event.endTime)}
                    </td>
                    <td>
                      {event.eventUrl ? (
                        <a
                          href={event.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Eventbrite
                        </a>
                      ) : (
                        <span className="text-neutral-600">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
