import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BoardPage from "@/app/board/page";

describe("BoardPage", () => {
  it("renders the three section headings", () => {
    render(<BoardPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Officers & Vice Presidents" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Directors" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Board of Advisors" })
    ).toBeInTheDocument();
  });

  it("gives the advisors section the #advisors anchor the nav targets", () => {
    const { container } = render(<BoardPage />);
    expect(container.querySelector("#advisors")).toBeInTheDocument();
  });

  it("renders all 41 members as <h3> card names", () => {
    render(<BoardPage />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(41);
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

  it("does not render the invented footer sections", () => {
    render(<BoardPage />);
    expect(screen.queryByText("Serve on the board")).not.toBeInTheDocument();
    expect(screen.queryByText("Write for Insights")).not.toBeInTheDocument();
  });
});
