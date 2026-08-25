import Image from "next/image";
import { formatEventDateShort, formatTimeRange } from "@/lib/format";
import type { Event } from "@/types/event";

/** The design's upcoming block: a card per live Eventbrite listing. */
export function UpcomingEvents({ events }: { events: Event[] }) {
  return (
    <div
      className="grid-3"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,minmax(0,1fr))",
        gap: 40,
        marginTop: 28,
      }}
    >
      {events.map((event) => (
        <a
          key={event.id}
          href={event.eventUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="frame" style={{ aspectRatio: "16 / 9" }}>
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="frame-placeholder" aria-hidden="true">
                NCMA MetroMD
              </div>
            )}
          </div>
          <div className="kick" style={{ marginTop: 14 }}>
            {formatEventDateShort(event.date)} ·{" "}
            {formatTimeRange(event.startTime, event.endTime)}
          </div>
          <h4 style={{ fontSize: 23, margin: "8px 0 6px", lineHeight: 1.25 }}>{event.title}</h4>
          {event.venue && (
            <div style={{ fontSize: 15, color: "var(--color-neutral-700)" }}>{event.venue}</div>
          )}
          <div style={{ fontSize: 15, color: "var(--color-neutral-600)", marginTop: 6 }}>
            {event.description}
          </div>
        </a>
      ))}
    </div>
  );
}
