import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchEventbriteEvents } from "@/lib/eventbrite";
import eventsSnapshot from "@/data/events.json";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function setCredentials() {
  process.env.EVENTBRITE_API_KEY = "test-key";
  process.env.EVENTBRITE_ORGANIZATION_ID = "test-org";
}

function clearCredentials() {
  delete process.env.EVENTBRITE_API_KEY;
  delete process.env.EVENTBRITE_ORGANIZATION_ID;
}

/** Builds one raw Eventbrite API event in the shape the client maps from. */
function rawEvent(overrides: {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  logoUrl?: string;
}) {
  const { id, title, date, startTime, endTime, logoUrl } = overrides;
  return {
    id,
    name: { text: title },
    description: { text: "Check ticket prices on event" },
    start: { local: `${date}T${startTime}:00` },
    end: { local: `${date}T${endTime}:00` },
    ...(logoUrl ? { logo: { url: logoUrl } } : {}),
    url: `https://www.eventbrite.com/e/${id}`,
  };
}

function okResponse(events: unknown[]) {
  return {
    ok: true,
    status: 200,
    json: async () => ({ pagination: { has_more_items: false }, events }),
  };
}

describe("fetchEventbriteEvents", () => {
  beforeEach(() => {
    // The function logs on every call by design (T11 removes this); tests
    // only need to keep it off the terminal, not assert on it.
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    clearCredentials();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("falls back to the snapshot, with an empty upcoming list, when the API key is missing", async () => {
    delete process.env.EVENTBRITE_API_KEY;
    process.env.EVENTBRITE_ORGANIZATION_ID = "test-org";

    const result = await fetchEventbriteEvents();

    expect(result.upcomingEvents).toEqual([]);
    expect(result.pastEvents).toHaveLength(9);
    expect(result.pastEvents).toEqual(eventsSnapshot.pastEvents);
  });

  it("falls back to the snapshot, with an empty upcoming list, when the organization id is missing", async () => {
    process.env.EVENTBRITE_API_KEY = "test-key";
    delete process.env.EVENTBRITE_ORGANIZATION_ID;

    const result = await fetchEventbriteEvents();

    expect(result.upcomingEvents).toEqual([]);
    expect(result.pastEvents).toEqual(eventsSnapshot.pastEvents);
  });

  it("never throws, and falls back to the snapshot, when fetch rejects", async () => {
    setCredentials();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );

    await expect(fetchEventbriteEvents()).resolves.toEqual({
      upcomingEvents: [],
      pastEvents: eventsSnapshot.pastEvents,
    });
  });

  it("falls back to the snapshot when the API responds with a non-ok status", async () => {
    setCredentials();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00"));

    // If the `!response.ok` guard were ever deleted, this event would
    // survive `.json()` and land in upcomingEvents, since its date is after
    // the frozen clock above. That's what proves the guard is doing
    // something, rather than the fallback being incidental to a crash.
    const upcomingRaw = rawEvent({
      id: "should-not-surface",
      title: "Should Not Surface",
      date: "2025-06-20",
      startTime: "17:30",
      endTime: "20:00",
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
        json: async () => ({
          pagination: { has_more_items: false },
          events: [upcomingRaw],
        }),
      })
    );

    const result = await fetchEventbriteEvents();

    expect(result.upcomingEvents).toEqual([]);
    expect(result.pastEvents).toEqual(eventsSnapshot.pastEvents);
  });

  it("splits a successful payload into upcoming and past against the current time", async () => {
    setCredentials();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00"));

    const pastRaw = rawEvent({
      id: "past-meeting",
      title: "Past Meeting",
      date: "2025-06-14",
      startTime: "17:30",
      endTime: "20:00",
    });
    const upcomingRaw = rawEvent({
      id: "upcoming-meeting",
      title: "Upcoming Meeting",
      date: "2025-06-20",
      startTime: "17:30",
      endTime: "20:00",
      logoUrl: "https://img.evbuc.com/upcoming.jpg",
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(okResponse([upcomingRaw, pastRaw]))
    );

    const result = await fetchEventbriteEvents();

    expect(result.upcomingEvents).toHaveLength(1);
    expect(result.upcomingEvents[0].id).toBe("upcoming-meeting");
    // Past events came from the live feed here, not the fallback snapshot.
    expect(result.pastEvents).toHaveLength(1);
    expect(result.pastEvents[0].id).toBe("past-meeting");

    for (const event of [...result.upcomingEvents, ...result.pastEvents]) {
      expect(event.id.length).toBeGreaterThan(0);
      expect(event.title.length).toBeGreaterThan(0);
      expect(event.date).toMatch(DATE_RE);
      expect(event.startTime).toMatch(TIME_RE);
      expect(event.endTime).toMatch(TIME_RE);
    }
  });

  it("falls back to the snapshot for past events when the live payload has none, while keeping live upcoming events", async () => {
    setCredentials();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00"));

    const upcomingRaw = rawEvent({
      id: "only-upcoming",
      title: "Only Upcoming",
      date: "2025-06-20",
      startTime: "17:30",
      endTime: "20:00",
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse([upcomingRaw])));

    const result = await fetchEventbriteEvents();

    expect(result.upcomingEvents).toHaveLength(1);
    expect(result.upcomingEvents[0].id).toBe("only-upcoming");
    expect(result.pastEvents).toEqual(eventsSnapshot.pastEvents);
  });

  it("caps live past events at 10 (documents gap #12 in 00-overview.md, pending T11)", async () => {
    setCredentials();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00"));

    const pastRaws = Array.from({ length: 12 }, (_, i) =>
      rawEvent({
        id: `past-${i}`,
        title: `Past Meeting ${i}`,
        date: "2025-01-01",
        startTime: "17:30",
        endTime: "20:00",
      })
    );
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse(pastRaws)));

    const result = await fetchEventbriteEvents();

    expect(result.pastEvents).toHaveLength(10);
  });
});
