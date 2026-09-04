import { EVENTBRITE_ORG_URL } from "@/data/site";
import { formatEventDateLong, formatTimeRange } from "@/lib/format";
import type { Event } from "@/types/event";

/**
 * The "Next meeting" panel shared by the home page and the events page.
 *
 * When Eventbrite has no upcoming listing the honest empty state is rendered
 * rather than a fabricated date. When a real event exists it replaces the
 * notice in place.
 */
export function NextMeeting({
  event,
  emptyCopy,
  ctaLabel,
  /** The home page uses a plain link; the events page uses the accent button. */
  ctaAsButton = false,
  style,
}: {
  event?: Event | null;
  emptyCopy: string;
  ctaLabel: string;
  ctaAsButton?: boolean;
  style?: React.CSSProperties;
}) {
  const cta = ctaAsButton ? "btn btn-primary btn-lg" : "link-rule";

  return (
    <div className="notice" style={style}>
      <div className="kick-sm" style={{ color: "var(--color-accent-700)" }}>
        Next meeting
      </div>

      {event ? (
        <>
          <p
            style={{
              fontSize: 17,
              color: "var(--color-accent-900)",
              margin: "8px 0 2px",
            }}
          >
            {formatEventDateLong(event.date)}
            {event.startTime && event.endTime
              ? `, ${formatTimeRange(event.startTime, event.endTime)}`
              : ""}
          </p>
          <h3 style={{ margin: "0 0 4px", color: "var(--color-accent-900)" }}>
            {event.title}
          </h3>
          {event.venue && (
            <p
              style={{
                fontSize: 17,
                color: "var(--color-accent-900)",
                margin: 0,
              }}
            >
              {event.venue}
            </p>
          )}
          <a
            className={cta}
            href={event.eventUrl ?? EVENTBRITE_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 16 }}
          >
            Register on Eventbrite
          </a>
        </>
      ) : (
        <>
          <p
            style={{
              fontSize: 19,
              color: "var(--color-accent-900)",
              margin: "8px 0 0",
              maxWidth: "52ch",
            }}
          >
            {emptyCopy}
          </p>
          <a
            className={cta}
            href={EVENTBRITE_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 16 }}
          >
            {ctaLabel}
          </a>
        </>
      )}
    </div>
  );
}
