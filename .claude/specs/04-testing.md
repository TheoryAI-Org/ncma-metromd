# 04 — Test harness and baseline tests

The repo has no tests, no runner, and no `test` script. This is T2 and it lands
before any page is touched, because it is the only thing that can substantiate
"nothing broke".

## T2 — Harness

Vitest + React Testing Library, jsdom environment. Dev dependencies only:

```
vitest  @vitejs/plugin-react  jsdom
@testing-library/react  @testing-library/dom  @testing-library/jest-dom
@testing-library/user-event
```

Pin to versions compatible with React 18 — `@testing-library/react@^14`, not v16.

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
    include: ["test/**/*.test.{ts,tsx}"],
  },
  resolve: {
    // Mirrors the "@/*" path alias in tsconfig.json.
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

`test/setup.ts` imports `@testing-library/jest-dom/vitest`.

Scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

Add `test/` and `vitest.config.ts` to the `content` globs in
`tailwind.config.ts`? **No** — tests are not rendered. Leave the globs alone.

Two things need stubbing for component tests:

- `next/image` — render a plain `<img>`. Put the mock in `test/setup.ts` via
  `vi.mock("next/image", ...)` so every test gets it.
- `next/navigation` — `usePathname` is used by `components/nav-bar.tsx`. Mock it
  per-test so each case can set the current path.

## Baseline tests — write these in T2, before the redesign edits

These lock in current behaviour. They must pass **before** T3–T10 and still pass
after. If one starts failing, that is the regression signal.

### `test/eventbrite.test.ts` — the integration that must not regress

`lib/eventbrite.ts` is the highest-risk file in the repo: it is the only external
dependency, and its token is not issued, so the fallback path is the *live* path.

- With no `EVENTBRITE_PRIVATE_TOKEN` set, `fetchEventbriteEvents()` resolves and
  returns events from `data/events.json` — it does not throw and does not return
  empty.
- Events are split into `upcomingEvents` and `pastEvents` against a fixed "now"
  (inject or freeze the clock — do not let the test depend on today's date).
- `upcomingEvents` is ascending by date; `pastEvents` is descending.
- When `fetch` rejects, the function still resolves via the fallback rather than
  propagating.
- Every returned event satisfies the `Event` type: non-empty `id` and `title`, a
  parseable `date`.

Read `lib/eventbrite.ts` first and test what it actually does. If its real
behaviour differs from the above, **test the real behaviour and report the
difference** — do not change the implementation to match this spec.

### `test/pages.test.tsx` — route smoke tests

For each server-component page that takes no async data (`/our-chapter`, `/board`,
`/certs`, `/sponsors`, `/contact`, `/login`, `/insights`, `/highlight`): render it
and assert its `<h1>` text. Cheap, and it catches the class of break where a data
shape change makes a page throw.

`/` and `/events` are `async` and hit Eventbrite. Render them with the fetch
mocked to reject, and assert they still produce their heading — this is the
"degrades to the Eventbrite link beside it" behaviour the code comments promise.

### `test/nav-bar.test.tsx`

- Renders every nav label.
- `data-on` is set on exactly the item matching `usePathname()`.
- "Join us" has `target="_blank"` and `rel` containing both `noopener` and
  `noreferrer`.

## Redesign tests — add alongside the task that introduces the behaviour

### `test/board-data.test.ts` (with T3)

- `boardBody("officers")`, `("directors")`, `("advisors")` have length 13, 18, 10.
- Total roster is 41.
- Every `slug` is unique across all three bodies.
- Officers start `["hanks", "thomas", "ibik"]`; advisors start
  `["hanks-advisor", "hanks-richard-advisor"]`.
- Within each body, the members after the pinned ones are non-descending by last
  name. Derive the last name in the test the same way the ordering rule does and
  assert the sort — this is what catches a future misfiled addition.
- Exactly 12 members have a `bio`; no advisor has one.
- Exactly 11 have a `photo`, and **every** `photo` path exists on disk under
  `public/` (`fs.existsSync`). This is the test that catches a typo'd filename,
  which Next.js would otherwise surface only as a broken image in production.
- Every `linkedin`, where present, starts with `https://`.
- Every `email`, where present, contains `@` and no whitespace.
- No optional field is present as an empty string.

### `test/board-card.test.tsx` (with T4)

- A member with a bio renders a "Read bio" trigger; one without renders none.
- A member with a LinkedIn URL renders an anchor with
  `aria-label="<Name> on LinkedIn"`, `target="_blank"`, and `rel` containing
  `noopener` and `noreferrer`; one without renders no anchor at all — assert
  absence, not just that it is empty.
- A member with no organization or email renders neither line.
- Sector starting "Government" gets the magenta class; "Industry, Former
  Government (Federal)" does not.
- Clicking "Read bio" reveals the bio text; Escape hides it again.

### `test/board-page.test.tsx` (with T5)

- All three section headings render.
- The advisors wrapper has `id="advisors"`.
- 41 member names appear on the page. Jennifer Hanks, Richard Hanks and Dr. John
  Wilkinson appear twice each — assert the counts, since a naive dedupe would be a
  real bug.

### `test/sponsor-grid.test.tsx` (with T8)

- `variant="wall"` renders 20 slots; `variant="strip"` renders 5.
- No slot carries a border or `bg-surface` class in `wall` — the handoff's
  no-tinted-frame rule, asserted rather than eyeballed.

## What not to test

- Exact pixel values and Tailwind class strings beyond the few that encode a
  documented rule (the sector colour, the no-frame rule). Class-string assertions
  are brittle and the reviewer checks fidelity by reading.
- Next.js framework behaviour — routing, `next/font`, metadata generation.
- The newsletter and contact forms submitting anywhere. They are mockups by
  design; assert only that submitting does not throw.

## Gate

Every task ends with all four green:

```bash
npx tsc --noEmit && npm run lint && npm run build && npm test
```
