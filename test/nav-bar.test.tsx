import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NavBar } from "@/components/nav-bar";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({ usePathname }));

afterEach(() => {
  vi.clearAllMocks();
});

// The items rendered by the desktop <nav>; the mobile Sheet duplicates are
// not in the DOM until the sheet is opened, so these each match once.
const NAV_LABELS = [
  "Our chapter",
  "Board",
  "Insights",
  "Events",
  "Certifications",
  "Sponsors",
  "Contact",
  "Sign in",
];

describe("NavBar", () => {
  it("renders every nav label", () => {
    usePathname.mockReturnValue("/");
    render(<NavBar />);

    for (const label of NAV_LABELS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("sets data-on only on the item matching the current path", () => {
    usePathname.mockReturnValue("/board");
    render(<NavBar />);

    expect(screen.getByText("Board").closest("a")).toHaveAttribute(
      "data-on",
      "true"
    );
    for (const label of NAV_LABELS.filter((l) => l !== "Board")) {
      expect(screen.getByText(label).closest("a")).toHaveAttribute(
        "data-on",
        "false"
      );
    }
  });

  it("keeps Insights on for a nested article route", () => {
    // pathname.startsWith(href), not ===, so a nested route like an article
    // page under /insights should still light up the Insights nav item.
    usePathname.mockReturnValue("/insights/where-ai-helps-procurement");
    render(<NavBar />);

    expect(screen.getByText("Insights").closest("a")).toHaveAttribute(
      "data-on",
      "true"
    );
    for (const label of NAV_LABELS.filter((l) => l !== "Insights")) {
      expect(screen.getByText(label).closest("a")).toHaveAttribute(
        "data-on",
        "false"
      );
    }
  });

  it("documents a prefix collision: an unrelated /board* route also lights up Board", () => {
    // TODO(nav-bar): pathname.startsWith(href) means any route beginning
    // with "/board" — e.g. a hypothetical "/boardroom-rental" page with
    // nothing to do with the chapter board — would also highlight the Board
    // nav item. That's arguably wrong, but fixing components/nav-bar.tsx is
    // out of scope for T2 (test harness only); this pins today's behaviour
    // so the fix, when it lands, is a deliberate assertion change.
    usePathname.mockReturnValue("/boardroom-rental");
    render(<NavBar />);

    expect(screen.getByText("Board").closest("a")).toHaveAttribute(
      "data-on",
      "true"
    );
  });

  it("opens Join us in a new tab with both rel safety keywords", () => {
    usePathname.mockReturnValue("/");
    render(<NavBar />);

    const joinLinks = screen.getAllByRole("link", { name: "Join us" });
    expect(joinLinks.length).toBe(2);
    for (const link of joinLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      const rel = link.getAttribute("rel") ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });
});
