import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Files where suppressing the browser outline is deliberate: the button and
 * the sheet's close button both swap it for an equivalent-weight ring, and
 * app/globals.css defines the global `:focus { outline: none }` /
 * `:focus-visible` pairing itself. A match anywhere else means a component
 * dropped the design system's focus-visible ring without providing a
 * replacement — see .claude/specs/01-design-system.md, "T1b".
 */
const SANCTIONED = new Set([
  "components/ui/button.tsx",
  "components/ui/sheet.tsx",
  "app/globals.css",
]);

const SUPPRESSES_OUTLINE = /outline-none|outline:\s*none/;

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      sourceFiles(full, out);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

describe("focus outline suppression", () => {
  const root = process.cwd();
  const files = [
    ...sourceFiles(path.join(root, "components")),
    ...sourceFiles(path.join(root, "app")),
  ];

  it("is limited to the sanctioned ring-substitution and base-rule files", () => {
    const offenders = files
      .map((file) => path.relative(root, file).replace(/\\/g, "/"))
      .filter((rel) => !SANCTIONED.has(rel))
      .filter((rel) =>
        SUPPRESSES_OUTLINE.test(fs.readFileSync(path.join(root, rel), "utf8"))
      );

    expect(offenders).toEqual([]);
  });

  it("keeps the sanctioned suppressions in place", () => {
    for (const rel of Array.from(SANCTIONED)) {
      const content = fs.readFileSync(path.join(root, rel), "utf8");
      expect(SUPPRESSES_OUTLINE.test(content)).toBe(true);
    }
  });
});
