# Review checklist

For the `design-reviewer` agent. Work top to bottom; the first section is the one
that matters most.

## 1. Regressions

- [ ] `npm run build` passes. Every route still compiles.
- [ ] `npm test` passes, **including the T2 baseline tests**. A baseline test
      failing is a regression, not a test to update — unless the spec explicitly
      changed that behaviour.
- [ ] `npx tsc --noEmit` and `npm run lint` clean.
- [ ] `lib/eventbrite.ts` still falls back to `data/events.json` with no
      `EVENTBRITE_PRIVATE_TOKEN`. `/` and `/events` still render without a token.
- [ ] No route that previously rendered now throws. Check every consumer of
      `data/board.ts` — the `role` → `position` and `affiliation` → `organization`
      rename reaches `app/page.tsx`, `app/contact/page.tsx`, `app/insights/page.tsx`,
      `app/insights/[slug]/page.tsx`, and `data/insights.ts`.
- [ ] `data/insights.ts` `authorSlug` values still resolve. Several referenced
      slugs moved bodies or changed (`hopson`, `sistrunk`, `sheckles`,
      `akinrogunde`, `anderson`, `parson`); a `.find()` returning `undefined`
      behind a `!` is a runtime crash, not a type error.
- [ ] No `!` non-null assertion on a `.find()` that can now miss.

## 2. Correctness

- [ ] Roster counts are exactly 13 / 18 / 10, total 41.
- [ ] Ordering matches `02-board-roster.md`: pinned members first, then
      alphabetical by last name, in all three bodies.
- [ ] Jennifer Hanks, Richard Hanks and Dr. John Wilkinson each appear twice with
      **different** positions and sectors, under distinct slugs.
- [ ] Every `photo` path exists on disk. Open the directory and check; do not
      trust the string.
- [ ] Bios are verbatim — spot-check three against the prototype, including the
      `™` in Jennifer Hanks's and the curly quotes in Dr. Cynthia Pace's
      organization.
- [ ] No dead links: no LinkedIn anchor without a URL, no `mailto:` without an
      address, no "Read bio" without a bio.
- [ ] Every external link has `target="_blank"` **and** `rel="noopener noreferrer"`.

## 3. Spec deviation

- [ ] `--color-bg` is `#ffffff` and `--color-surface` is `#f3f2f2`. The shadcn HSL
      layer was re-derived, not left pointing at the old ground.
- [ ] Card name is 28px / 700 / `-0.01em` / 1.15 — not the prototype's 30px.
- [ ] Card position kicker is 12px / `0.06em`; page kickers are 13px / `0.1em`.
- [ ] Sector label is 11px / `0.05em`, magenta only when the string **starts with**
      "Government". "Industry, Former Government (Federal)" must be neutral.
- [ ] `#advisors` exists with `scroll-mt-24` (96px).
- [ ] "Become a Member" is `#c8551b`, hover `#a8450f`, text `#f3f2f2` — via a
      `.btn-membership` class, not an inline style.
- [ ] The second hero CTA is `accent-100` / `accent-300` / `accent-900`, hover
      `accent-200`.
- [ ] Sponsors has four levels with the specified kicker colours (Platinum
      magenta, Gold cyan, Silver and Bronze neutral), three secondary options, and
      twenty logo slots.
- [ ] Sponsor wall slots have **no** border, **no** `bg-surface`, **no**
      aspect-ratio box. This was iterated on repeatedly per the handoff.
- [ ] "Nine volunteers" is gone from `/board` copy, `/board` metadata, and the
      home page board-preview blurb.
- [ ] The invented "Serve on the board" and "Write for Insights" blocks are gone
      from `/board`.
- [ ] None of the prototype drift in `01-design-system.md` got ported: no Times
      New Roman, no Lora, no `#D97C36`, no `#E8960D`, no `#5E6487`, no italic h1,
      no 40–50px kicker, no 658px logo.

## 4. Accessibility

- [ ] Every icon-only link has an `aria-label`.
- [ ] Every input has a real associated `<label>`; the segmented radio group has a
      `<fieldset>`/`<legend>` or an `aria-label`.
- [ ] Every `<Image>` and `<img>` has an `alt`. Decorative frames use `alt=""`.
- [ ] Bio dialog: closes on ×, on backdrop click, and on **Escape**; focus is
      contained while open and returns to the trigger on close; body scroll is
      locked. Radix gives all of this — verify it was not disabled with
      `onEscapeKeyDown`, `onInteractOutside`, or `modal={false}`.
- [ ] Dialog overlay `z-index` is above the `z-30` sticky nav.
- [ ] No `outline: none` or `focus:outline-none` without a replacement ring.
- [ ] Empty headshot frames are not announced as meaningful images.
- [ ] `scroll-behavior: smooth` is behind `prefers-reduced-motion:
      no-preference`.

## 5. Design system

- [ ] No raw hex outside the two sanctioned exceptions.
- [ ] No inline `style` prop for anything a token covers.
- [ ] No second styling system — no CSS modules, no styled-components.
- [ ] No sans-serif anywhere, UI chrome included.
- [ ] No border, rule, or `.card` used as section separation. Whitespace only.
- [ ] Body copy in the accent uses `--color-accent-700`, never `--color-accent`.
- [ ] No ad-hoc `box-shadow` — `--shadow-sm/md/lg` only.
- [ ] Never both accents in the same small component.

## 6. Responsive

- [ ] No horizontal page scroll at 320px. The sector labels and the `/events`
      table are the likely offenders.
- [ ] Board grids: 3 → 2 → 1. Sponsor wall: 2 → 1.
- [ ] Gutter is 40px at ≥1180px, 24px below.
- [ ] Nav wraps below `lg` and the Sheet menu carries the full item set, Advisory
      included.

## 7. Quality

- [ ] Comments explain *why*, are short, and follow the Google style guide. No
      comment restates its code. No comment narrates the change itself
      ("changed this to…", "added per spec").
- [ ] No duplicated markup that should be a shared component — particularly the
      three board sections and the two board-card variants (page vs. home preview).
- [ ] No needless `"use client"`. A page with no state, no effects and no handlers
      is a server component.
- [ ] No dead code, no unused imports, no leftover exports (`BOARD` if nothing
      imports it, `role`/`affiliation` if the rename is complete).
