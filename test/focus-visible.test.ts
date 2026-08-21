import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * A component may suppress the browser's default outline only if it also
 * supplies a replacement: either a `focus-visible:ring-*` utility in the
 * same file, or the suppression sits on a Radix primitive's `*Content` root
 * (Radix focuses those panels, tabindex="-1", on open — the panel itself
 * isn't the thing a keyboard user is navigating to, so no ring is owed).
 * app/globals.css is the one place that defines the base pairing itself:
 * `:focus { outline: none }` plus a `:focus-visible` rule that restores a
 * real outline. See .claude/specs/01-design-system.md, "T1b".
 */
const SUPPRESSES_OUTLINE = /outline-none|outline:\s*none/g;

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

// Exact Tailwind ring-width tokens only — "focus-visible:ring-ring" sets a
// ring *color*, not a width, and produces no visible ring without one of
// these alongside it.
function hasReplacementRing(content: string): boolean {
  const tokens = content.match(/[^\s"'`]+/g) ?? [];
  return tokens.some(
    (token) => token === "focus-visible:ring" || /^focus-visible:ring-\d+$/.test(token)
  );
}

// The nearest JSX tag opened before `index` — a crude but sufficient scan
// for "is this suppression on a Radix *Content root".
function isRadixContentRoot(content: string, index: number): boolean {
  const before = content.slice(Math.max(0, index - 1000), index);
  const tags = Array.from(before.matchAll(/<([A-Za-z][\w.]*)\b/g));
  const last = tags.at(-1)?.[1];
  return !!last && last.endsWith("Content");
}

function hasFocusVisibleReplacement(cssContent: string): boolean {
  return /:focus-visible\s*\{[^}]*outline:\s*(?!none\b)[^;]+;/.test(cssContent);
}

describe("focus outline suppression", () => {
  const root = process.cwd();
  const files = [
    ...sourceFiles(path.join(root, "components")),
    ...sourceFiles(path.join(root, "app")),
    ...sourceFiles(path.join(root, "lib")),
  ];

  it("pairs every outline suppression with a replacement ring or a Radix Content root", () => {
    const offenders: string[] = [];

    for (const file of files) {
      const rel = path.relative(root, file).replace(/\\/g, "/");
      const content = fs.readFileSync(file, "utf8");
      const isCss = rel.endsWith(".css");

      let match: RegExpExecArray | null;
      SUPPRESSES_OUTLINE.lastIndex = 0;
      while ((match = SUPPRESSES_OUTLINE.exec(content))) {
        const sanctioned = isCss
          ? hasFocusVisibleReplacement(content)
          : hasReplacementRing(content) || isRadixContentRoot(content, match.index);
        if (!sanctioned) {
          offenders.push(`${rel}@${match.index}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it("keeps the global :focus / :focus-visible pairing in app/globals.css", () => {
    const content = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
    expect(content).toMatch(/:focus\s*\{\s*outline:\s*none;?\s*\}/);
    expect(content).toMatch(
      /:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-accent\)/
    );
  });

  it("keeps the Sheet close button's ring on focus-visible:, not bare focus:", () => {
    const content = fs.readFileSync(path.join(root, "components/ui/sheet.tsx"), "utf8");
    expect(hasReplacementRing(content)).toBe(true);
    expect(content).toMatch(/focus-visible:outline-none/);
    // A bare "focus:outline-none"/"focus:ring-*" token (not "-visible")
    // means the ring fires on mouse focus too, not just keyboard.
    const tokens = content.match(/[^\s"'`]+/g) ?? [];
    const bareFocusRing = tokens.some((token) => /^focus:(outline-none|ring(-\d+)?)$/.test(token));
    expect(bareFocusRing).toBe(false);
  });
});
