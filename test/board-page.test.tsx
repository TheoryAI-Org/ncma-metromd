import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BoardPage from "@/app/board/page";

// BoardSection renders its <h2> as a direct child of the id-bearing wrapper
// div, so parentElement is the section root — scoping assertions to it
// catches a heading bound to the wrong body (or the wrong id) in a way a
// document-wide querySelector or getAllByRole count never can.
function section(heading: HTMLElement): HTMLElement {
  return heading.parentElement as HTMLElement;
}

describe("BoardPage", () => {
  it("renders Officers with its 13 members, scoped to its own section", () => {
    render(<BoardPage />);
    const officers = section(
      screen.getByRole("heading", { level: 2, name: "Officers & Vice Presidents" })
    );
    expect(within(officers).getAllByRole("heading", { level: 3 })).toHaveLength(13);
    expect(
      within(officers).getByRole("heading", { level: 3, name: "Chyanne Thomas" })
    ).toBeInTheDocument();
  });

  it("renders Directors with its 18 members, scoped to its own section", () => {
    render(<BoardPage />);
    const directors = section(screen.getByRole("heading", { level: 2, name: "Directors" }));
    expect(within(directors).getAllByRole("heading", { level: 3 })).toHaveLength(18);
    expect(
      within(directors).getByRole("heading", { level: 3, name: "Jon Canery" })
    ).toBeInTheDocument();
  });

  it("renders Board of Advisors with its 10 members, scoped to its own section", () => {
    render(<BoardPage />);
    const advisors = section(
      screen.getByRole("heading", { level: 2, name: "Board of Advisors" })
    );
    expect(within(advisors).getAllByRole("heading", { level: 3 })).toHaveLength(10);
    expect(
      within(advisors).getByRole("heading", { level: 3, name: "Dr. Anton C. Bizzell" })
    ).toBeInTheDocument();
  });

  it("gives the advisors section the #advisors anchor, its own heading, and the scroll offset", () => {
    const { container } = render(<BoardPage />);
    const anchor = container.querySelector("#advisors") as HTMLElement | null;
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveClass("scroll-mt-24");
    expect(
      within(anchor as HTMLElement).getByRole("heading", { level: 2, name: "Board of Advisors" })
    ).toBeInTheDocument();
  });

  it("renders Jennifer Hanks and Richard Hanks twice each — officer and advisor entries", () => {
    render(<BoardPage />);
    // A naive dedupe by slug or name would drop one of each; the roster gives
    // them distinct slugs (hanks/hanks-advisor, hanks-richard/-advisor) but
    // identical display names, so both cards render.
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Jennifer Hanks" })
    ).toHaveLength(2);
    expect(
      screen.getAllByRole("heading", { level: 3, name: "Richard Hanks" })
    ).toHaveLength(2);
  });

  it("renders both Wilkinson cards, director and advisor", () => {
    render(<BoardPage />);
    // Unlike the Hanks pair, the design's advisor record for Wilkinson carries
    // a middle initial the director record lacks (data/board.ts: "Dr. John
    // Wilkinson" vs "Dr. John W. Wilkinson"), so these are two distinct
    // headings rather than one literal duplicate. Asserting both by their
    // exact names still catches a dedupe keyed on the base name.
    expect(
      screen.getByRole("heading", { level: 3, name: "Dr. John Wilkinson" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Dr. John W. Wilkinson" })
    ).toBeInTheDocument();
  });

  it('does not render the placeholder "Nine volunteers" copy', () => {
    render(<BoardPage />);
    expect(screen.queryByText(/Nine volunteers/)).not.toBeInTheDocument();
  });

  it("does not render the invented footer sections", () => {
    render(<BoardPage />);
    expect(screen.queryByText("Serve on the board")).not.toBeInTheDocument();
    expect(screen.queryByText("Write for Insights")).not.toBeInTheDocument();
  });
});
