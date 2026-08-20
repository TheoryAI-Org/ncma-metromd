import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";
import EventsPage from "@/app/events/page";
import OurChapterPage from "@/app/our-chapter/page";
import BoardPage from "@/app/board/page";
import CertsPage from "@/app/certs/page";
import SponsorsPage from "@/app/sponsors/page";
import ContactPage from "@/app/contact/page";
import LoginPage from "@/app/login/page";
import InsightsPage from "@/app/insights/page";
import HighlightPage from "@/app/highlight/page";

beforeEach(() => {
  // Matches the normal dev/prod state: no Eventbrite credentials issued yet.
  delete process.env.EVENTBRITE_API_KEY;
  delete process.env.EVENTBRITE_ORGANIZATION_ID;
  // Belt and suspenders: even if credentials were present, the fetch itself
  // still fails, so fetchEventbriteEvents falls back either way.
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("static server-component pages", () => {
  const cases: Array<[name: string, Page: () => JSX.Element, heading: string]> = [
    ["/our-chapter", OurChapterPage, "Chartered in 2024, and still filling the room"],
    ["/board", BoardPage, "Meet the board"],
    ["/certs", CertsPage, "Certifications"],
    ["/sponsors", SponsorsPage, "Sponsors"],
    ["/contact", ContactPage, "Contact"],
    ["/login", LoginPage, "Sign in"],
    ["/insights", InsightsPage, "Insights"],
    ["/highlight", HighlightPage, "Monthly highlight"],
  ];

  it.each(cases)("%s renders its <h1>", (_path, Page, heading) => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: heading })
    ).toBeInTheDocument();
  });
});

describe("pages that hit Eventbrite", () => {
  it("/events still renders its heading when the feed fetch fails", async () => {
    render(await EventsPage());

    expect(
      screen.getByRole("heading", { level: 1, name: "Events" })
    ).toBeInTheDocument();
  });

  it("/ renders without an h1, but keeps the Eventbrite link when the feed fetch fails", async () => {
    // No credentials means fetchEventbriteEvents returns an empty upcoming
    // list and the data/events.json snapshot for past events (never []), so
    // the "This season" strip shows the three most recent past meetings
    // rather than the "Nothing published yet" empty state.
    render(await Home());

    // TODO(T7): the home page is getting an <h1> (the "MetroMD Chapter"
    // kicker promoted to one). This assertion is a drift signal T7 must
    // update deliberately, not a rule to preserve.
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
    expect(
      screen.getByRole("heading", { level: 2, name: "This season" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("NCMA MetroMD January Dinner Meeting")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Chapter page on Eventbrite →" })
    ).toBeInTheDocument();
  });

  it("/events still renders its heading with credentials set and fetch rejecting", async () => {
    // With no credentials, the code short-circuits before ever calling
    // fetch — the try/catch around fetchEventbriteEvents() in
    // app/events/page.tsx is never reached. Setting credentials here forces
    // the live path, so this is what actually proves that catch block's
    // errorMessage branch is unreachable at the page level.
    process.env.EVENTBRITE_API_KEY = "test-key";
    process.env.EVENTBRITE_ORGANIZATION_ID = "test-org";

    render(await EventsPage());

    expect(
      screen.getByRole("heading", { level: 1, name: "Events" })
    ).toBeInTheDocument();
    expect(screen.queryByText(/Error loading events/)).toBeNull();
  });
});
