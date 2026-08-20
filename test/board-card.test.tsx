import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { BoardCard } from "@/components/board-card";
import { BOARD, type BoardMember } from "@/data/board";

const BASE: BoardMember = {
  slug: "test-member",
  body: "officers",
  name: "Test Member",
  position: "VP — Testing",
  sector: "Industry",
};

describe("BoardCard", () => {
  it("renders a Read bio trigger only when a bio is present", () => {
    const triggerName = `Read ${BASE.name}'s bio`;
    const { rerender } = render(<BoardCard member={BASE} />);
    expect(screen.queryByRole("button", { name: triggerName })).not.toBeInTheDocument();

    rerender(<BoardCard member={{ ...BASE, bio: [{ type: "p", text: "Bio copy." }] }} />);
    expect(screen.getByRole("button", { name: triggerName })).toBeInTheDocument();
  });

  it("renders a LinkedIn anchor only when a URL is present, absent not just empty", () => {
    const { rerender } = render(<BoardCard member={BASE} />);
    expect(
      screen.queryByRole("link", { name: `${BASE.name} on LinkedIn` })
    ).not.toBeInTheDocument();

    rerender(
      <BoardCard member={{ ...BASE, linkedin: "https://www.linkedin.com/in/test/" }} />
    );
    const link = screen.getByRole("link", { name: `${BASE.name} on LinkedIn` });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/test/");
    expect(link).toHaveAttribute("target", "_blank");
    const rel = link.getAttribute("rel") ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });

  it("renders no organization or email line when both are absent", () => {
    const { container } = render(<BoardCard member={BASE} />);
    // The organization line is the only element with this exact class pair;
    // querying by text would miss an organization rendered with an empty string.
    expect(container.querySelector(".text-base.text-neutral-700")).not.toBeInTheDocument();
    // Accessible name matching can't target a mailto link by its href scheme —
    // the accessible name is the link text, never the href — so query the DOM.
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
  });

  it("renders organization and a mailto link when both are present", () => {
    render(
      <BoardCard
        member={{ ...BASE, organization: "Acme, Inc.", email: "test@example.com" }}
      />
    );
    expect(screen.getByText("Acme, Inc.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "test@example.com" })).toHaveAttribute(
      "href",
      "mailto:test@example.com"
    );
  });

  it("colors a sector starting with Government magenta", () => {
    render(<BoardCard member={{ ...BASE, sector: "Government (Federal)" }} />);
    expect(screen.getByText("Government (Federal)")).toHaveClass("text-magenta-700");
  });

  it("keeps a sector merely containing Government neutral", () => {
    render(
      <BoardCard member={{ ...BASE, sector: "Industry, Former Government (Federal)" }} />
    );
    expect(screen.getByText("Industry, Former Government (Federal)")).toHaveClass(
      "text-neutral-700"
    );
  });

  it("colors by the startsWith rule for sectors absent from today's roster, not a hardcoded list", () => {
    // Pins the rule rather than today's data — a literal list of known sector
    // strings would pass every existing case while missing a new one.
    const { rerender } = render(
      <BoardCard member={{ ...BASE, sector: "Government (Municipal)" }} />
    );
    expect(screen.getByText("Government (Municipal)")).toHaveClass("text-magenta-700");

    rerender(<BoardCard member={{ ...BASE, sector: "Former Government" }} />);
    expect(screen.getByText("Former Government")).toHaveClass("text-neutral-700");
  });

  it("keeps whitespace-nowrap on the position line but not the sector line", () => {
    render(<BoardCard member={BASE} />);
    expect(screen.getByText(BASE.position)).toHaveClass("whitespace-nowrap");
    expect(screen.getByText(BASE.sector)).not.toHaveClass("whitespace-nowrap");
  });

  it("closes the bio dialog on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<BoardCard member={{ ...BASE, bio: [{ type: "p", text: "Bio copy." }] }} />);

    const trigger = screen.getByRole("button", { name: `Read ${BASE.name}'s bio` });
    await user.click(trigger);
    expect(screen.getByText("Bio copy.")).toBeInTheDocument();
    // Modal (the default, unset): background scroll is locked while open.
    // A non-modal dialog leaves this absent.
    expect(document.body).toHaveAttribute("data-scroll-locked");

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Bio copy.")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("sizes and spaces the name by body: 30/28/24px, mt-2.5 mb-1 except advisors' mt-1.5 mb-0.5", () => {
    // linkedin must be set so the name takes the nameStyle.mt/.mb branch —
    // without it every body falls back to the shared "mt-4" and the
    // per-body margin never renders.
    const withLinkedin = { ...BASE, linkedin: "https://www.linkedin.com/in/test/" };

    const { rerender } = render(<BoardCard member={{ ...withLinkedin, body: "officers" }} />);
    expect(screen.getByRole("heading", { name: BASE.name })).toHaveClass(
      "text-[30px]",
      "mt-2.5",
      "mb-1"
    );

    rerender(<BoardCard member={{ ...withLinkedin, body: "directors" }} />);
    expect(screen.getByRole("heading", { name: BASE.name })).toHaveClass(
      "text-[28px]",
      "mt-2.5",
      "mb-1"
    );

    rerender(<BoardCard member={{ ...withLinkedin, body: "advisors" }} />);
    expect(screen.getByRole("heading", { name: BASE.name })).toHaveClass(
      "text-[24px]",
      "mt-1.5",
      "mb-0.5"
    );
  });

  it("orders advisor fields position -> organization -> sector, unlike the other bodies", () => {
    const officer = render(
      <BoardCard
        member={{ ...BASE, body: "officers", organization: "Acme, Inc.", sector: "Industry" }}
      />
    );
    const officerText = officer.container.textContent ?? "";
    expect(officerText.indexOf("Industry")).toBeLessThan(officerText.indexOf("Acme, Inc."));
    officer.unmount();

    const advisor = render(
      <BoardCard
        member={{ ...BASE, body: "advisors", organization: "Acme, Inc.", sector: "Industry" }}
      />
    );
    const advisorText = advisor.container.textContent ?? "";
    expect(advisorText.indexOf("Acme, Inc.")).toBeLessThan(advisorText.indexOf("Industry"));
  });

  it("has exactly 5 of the 41 roster members with a sector starting with Government", () => {
    const magenta = BOARD.filter((m) => m.sector.startsWith("Government"));
    expect(magenta).toHaveLength(5);
    expect(magenta.map((m) => m.slug).sort()).toEqual(
      ["akinrogunde", "grimsley", "mccollum", "moore", "queen"].sort()
    );
  });

  it("keeps every roster sector that contains but does not start with Government neutral", () => {
    // Every "Industry, Former Government (…)" / "…State/Local Government"
    // variant — ten members per the spec — must stay neutral, not magenta.
    const containsButNotStarts = BOARD.filter(
      (m) => m.sector.includes("Government") && !m.sector.startsWith("Government")
    );
    expect(containsButNotStarts).toHaveLength(10);
    for (const member of containsButNotStarts) {
      const { container, unmount } = render(<BoardCard member={member} />);
      expect(within(container).getByText(member.sector)).toHaveClass("text-neutral-700");
      unmount();
    }
  });
});
