import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { BOARD, BOARD_PREVIEW_SLUGS, boardBody, type BoardBody } from "@/data/board";

/**
 * Last name for sort-order assertions: strip a trailing ", suffix" (e.g.
 * ", CPA"), then take the final whitespace-separated token. Mirrors how a
 * human alphabetizes these names regardless of leading titles or ranks.
 */
function lastName(fullName: string): string {
  const withoutSuffix = fullName.split(",")[0];
  const tokens = withoutSuffix.trim().split(/\s+/);
  return tokens[tokens.length - 1];
}

function expectNonDescendingByLastName(members: Array<{ name: string }>) {
  const names = members.map((m) => lastName(m.name));
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
}

describe("board roster", () => {
  it("has 41 members total", () => {
    expect(BOARD).toHaveLength(41);
  });

  it("splits into 13 officers, 18 directors, 10 advisors", () => {
    expect(boardBody("officers")).toHaveLength(13);
    expect(boardBody("directors")).toHaveLength(18);
    expect(boardBody("advisors")).toHaveLength(10);
  });

  it("has a unique slug across all three bodies", () => {
    const slugs = BOARD.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("pins Jennifer Hanks, Chyanne Thomas, Patience Ibik first among officers", () => {
    const slugs = boardBody("officers").map((m) => m.slug);
    expect(slugs.slice(0, 3)).toEqual(["hanks", "thomas", "ibik"]);
  });

  it("pins Jennifer Hanks, Richard Hanks first among advisors", () => {
    const slugs = boardBody("advisors").map((m) => m.slug);
    expect(slugs.slice(0, 2)).toEqual(["hanks-advisor", "hanks-richard-advisor"]);
  });

  it("orders the unpinned officers alphabetically by last name", () => {
    expectNonDescendingByLastName(boardBody("officers").slice(3));
  });

  it("orders all directors alphabetically by last name", () => {
    expectNonDescendingByLastName(boardBody("directors"));
  });

  it("orders the unpinned advisors alphabetically by last name", () => {
    expectNonDescendingByLastName(boardBody("advisors").slice(2));
  });

  it("gives exactly 12 members a bio, and no advisor one", () => {
    const withBio = BOARD.filter((m) => m.bio);
    expect(withBio).toHaveLength(12);
    expect(boardBody("advisors").some((m) => m.bio)).toBe(false);
  });

  it("gives exactly 34 members an organization", () => {
    const withOrganization = BOARD.filter((m) => m.organization);
    expect(withOrganization).toHaveLength(34);
  });

  it("gives exactly 11 members a photo, each resolving to a real file", () => {
    const withPhoto = BOARD.filter((m) => m.photo);
    expect(withPhoto).toHaveLength(11);
    for (const member of withPhoto) {
      const filePath = path.join(process.cwd(), "public", member.photo!);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  it("only ever gives a linkedin value that starts with https://", () => {
    for (const member of BOARD) {
      if (member.linkedin) {
        expect(member.linkedin.startsWith("https://")).toBe(true);
      }
    }
  });

  it("only ever gives an email containing @ and no whitespace", () => {
    for (const member of BOARD) {
      if (member.email) {
        expect(member.email).toContain("@");
        expect(/\s/.test(member.email)).toBe(false);
      }
    }
  });

  it("never uses an empty string for an optional field", () => {
    const optionalKeys = ["organization", "email", "linkedin", "photo"] as const;
    for (const member of BOARD) {
      for (const key of optionalKeys) {
        expect(member[key]).not.toBe("");
      }
      if (member.bio) {
        expect(member.bio.length).toBeGreaterThan(0);
      }
    }
  });

  it("assigns every member to one of the three known bodies", () => {
    const bodies: BoardBody[] = ["officers", "directors", "advisors"];
    for (const member of BOARD) {
      expect(bodies).toContain(member.body);
    }
  });

  it("resolves every home page preview slug", () => {
    for (const slug of BOARD_PREVIEW_SLUGS) {
      expect(BOARD.find((m) => m.slug === slug)).toBeDefined();
    }
  });
});
