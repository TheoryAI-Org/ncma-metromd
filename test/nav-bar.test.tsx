import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  "Advisory",
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
    // Board and Advisory share /board, so both light up — they're the same
    // page.
    usePathname.mockReturnValue("/board");
    render(<NavBar />);

    for (const label of ["Board", "Advisory"]) {
      expect(screen.getByText(label).closest("a")).toHaveAttribute(
        "data-on",
        "true"
      );
    }
    for (const label of NAV_LABELS.filter(
      (l) => l !== "Board" && l !== "Advisory"
    )) {
      expect(screen.getByText(label).closest("a")).toHaveAttribute(
        "data-on",
        "false"
      );
    }
  });

  it("renders Advisory pointing at /board#advisors", () => {
    usePathname.mockReturnValue("/");
    render(<NavBar />);

    expect(screen.getByText("Advisory").closest("a")).toHaveAttribute(
      "href",
      "/board#advisors"
    );
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

  it("does not light up Board for an unrelated sibling route", () => {
    // isOn is segment-aware (pathname === href or startsWith(`${href}/`)),
    // so a route that merely shares the "/board" prefix — e.g. a
    // hypothetical "/boardroom-rental" page with nothing to do with the
    // chapter board — lights up nothing.
    usePathname.mockReturnValue("/boardroom-rental");
    render(<NavBar />);

    for (const label of NAV_LABELS) {
      expect(screen.getByText(label).closest("a")).toHaveAttribute(
        "data-on",
        "false"
      );
    }
  });

  it("mirrors the desktop nav items in the mobile Sheet menu", async () => {
    // Assert the two lists match rather than hardcoding the mobile items a
    // second time, so the desktop and Sheet menus cannot silently drift.
    usePathname.mockReturnValue("/");
    const user = userEvent.setup();
    render(<NavBar />);

    const desktopHrefs = NAV_LABELS.map(
      (label) => screen.getByText(label).closest("a")?.getAttribute("href")
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const mobileHrefs = NAV_LABELS.map((label) => {
      const links = screen.getAllByText(label).map((el) => el.closest("a"));
      // Once the sheet is open, each label matches twice (desktop + mobile);
      // the mobile copy is the second one in document order.
      return links[links.length - 1]?.getAttribute("href");
    });

    expect(mobileHrefs).toEqual(desktopHrefs);
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
