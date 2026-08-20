import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "@/app/contact/page";

// The five addresses the design's contact section specifies verbatim. This
// list is expected to catch the same bug it was written to prevent: an
// address is not the only thing that must be right, so we check that every
// mailto: href resolves to a real address, not just that these five appear.
const EXPECTED_ADDRESSES = [
  "jahanks@mmcgovsolutions.com",
  "randerson@deftechno.com",
  "patricia@triplejoygroup.com",
  "sonya@sageservicesgroupllc.com",
  "be@theoryai.co",
];

describe("/contact board addresses", () => {
  it("never emits a mailto: href containing \"undefined\"", () => {
    render(<ContactPage />);

    const mailtoLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));

    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const link of mailtoLinks) {
      expect(link.getAttribute("href")).not.toContain("undefined");
    }
  });

  it("renders all five expected addresses, Akinrogunde's (emailless board card) included", () => {
    render(<ContactPage />);

    const mailtoHrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => !!href?.startsWith("mailto:"));

    for (const address of EXPECTED_ADDRESSES) {
      expect(mailtoHrefs).toContain(`mailto:${address}`);
    }
  });
});
