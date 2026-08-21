import fs from "node:fs";
import path from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NavBar } from "@/components/nav-bar";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({ usePathname }));

// jsdom doesn't implement scrollIntoView.
Element.prototype.scrollIntoView = vi.fn();

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
    // Scoped to the Sheet's own subtree: querying the whole document and
    // falling back to "whichever link came last" can't tell a genuine
    // mobile copy from an omission — it'd just re-match the desktop link.
    usePathname.mockReturnValue("/");
    const user = userEvent.setup();
    render(<NavBar />);

    const desktopHrefs = NAV_LABELS.map(
      (label) => screen.getByText(label).closest("a")?.getAttribute("href")
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const sheet = within(screen.getByRole("dialog"));
    // getByText throws on a missing label, so a dropped item fails here
    // rather than silently matching the desktop copy.
    const mobileHrefs = NAV_LABELS.map(
      (label) => sheet.getByText(label).closest("a")?.getAttribute("href")
    );

    // "Join us" renders in the Sheet too but isn't one of NAV_LABELS —
    // pinning the total count catches a duplicated or extra item that
    // per-label lookups alone would miss.
    expect(sheet.getAllByRole("link")).toHaveLength(NAV_LABELS.length + 1);
    expect(mobileHrefs).toEqual(desktopHrefs);
  });

  it("scrolls to #advisors when Advisory is clicked while already on /board", async () => {
    usePathname.mockReturnValue("/board");
    // Run the deferred rAF callback synchronously so the assertion doesn't
    // need to race the real animation-frame clock.
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    const user = userEvent.setup();
    render(
      <>
        <NavBar />
        <div id="advisors" />
      </>
    );

    await user.click(screen.getByText("Advisory").closest("a")!);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("does not preventDefault on the cross-page Advisory click", () => {
    // On any other page, "Advisory" must stay a real navigation to
    // /board#advisors — preventDefault here would silently strand the
    // click. fireEvent.click's return value is false only when the event
    // was cancelled.
    usePathname.mockReturnValue("/");
    render(<NavBar />);

    const link = screen.getByText("Advisory").closest("a")!;
    expect(fireEvent.click(link)).toBe(true);
  });

  it("keeps scroll-behavior: smooth guarded by prefers-reduced-motion", () => {
    // Belongs to the same fix as the Advisory scroll handler above — a
    // regression here would silently re-break reduced-motion users even
    // though nav-bar.tsx itself is untouched.
    const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(
      /@media \(prefers-reduced-motion:\s*no-preference\)\s*\{\s*html\s*\{\s*scroll-behavior:\s*smooth;/
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
