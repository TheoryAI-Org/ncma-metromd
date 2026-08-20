import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContactPage from "@/app/contact/page";
import { BOARD } from "@/data/board";

// The design's contact-section copy, verbatim, keyed by topic. An exact
// [topic, name, href] comparison — not "does this address appear somewhere"
// — is the only assertion that catches a swapped pair (right address, wrong
// topic or name) as well as a falsy-but-present address like `email: ""`.
const EXPECTED_CONTACTS = [
  ["Membership", "Jennifer Hanks", "mailto:jahanks@mmcgovsolutions.com"],
  ["Programs", "Renita Anderson", "mailto:randerson@deftechno.com"],
  ["Training", "Dr. Patricia Akinrogunde", "mailto:patricia@triplejoygroup.com"],
  ["Sponsorship", "Sonya Hopson", "mailto:sonya@sageservicesgroupllc.com"],
  ["Newsletter", "Bethlehem Belaineh", "mailto:be@theoryai.co"],
];

// The slugs behind those five rows, in the same order. The page looks the
// name up by slug, so a slug that stops resolving would silently fall back
// to the topic string instead of the member's name — assert the roster
// still has all five.
const EXPECTED_SLUGS = ["hanks", "anderson", "akinrogunde", "hopson", "belaineh"];

describe("/contact board addresses", () => {
  it("renders exactly the expected [topic, name, href] pairs, in order", () => {
    render(<ContactPage />);

    const mailtoLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));

    const pairs = mailtoLinks.map((link) => [
      link.parentElement?.textContent?.split("·")[0].trim(),
      link.textContent,
      link.getAttribute("href"),
    ]);

    expect(pairs).toEqual(EXPECTED_CONTACTS);
  });

  it("resolves every contact slug to a roster member", () => {
    for (const slug of EXPECTED_SLUGS) {
      expect(BOARD.find((m) => m.slug === slug)).toBeDefined();
    }
  });
});
