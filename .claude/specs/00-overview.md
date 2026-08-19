# Redesign — assessment, decisions, and task plan

Source of truth for this work: `claude_design/design_handoff_ncma_metromd/README.md`
(the handoff). Prototype markup, fonts stripped for readability, is mirrored in
`.claude/design-reference/`. The original bundle in `claude_design/` is never
edited.

## Where the branch already is

`ncma-website-modernazation-work` is **not** a greenfield start. Five commits have
already ported most of the design system and rebuilt most public routes. What
exists and is broadly correct:

- Broadsheet tokens in `app/globals.css` `:root`, surfaced to Tailwind in
  `tailwind.config.ts` (`paper`, `surface`, `ink`, `neutral-*`, `cyan-*`,
  `magenta-*`, radius, shadows).
- Component classes under `@layer components`: `.pg`, `.kick`, `.lede`, `.bio`,
  `.btn` + variants, `.tag` + variants, `.field`, `.input`, `.seg`, `.card`,
  `.elev-*`, `.table`, `.navlink`.
- Source Serif 4 loaded via `next/font/google` at 400/600 with true italic.
- Routes: `/`, `/our-chapter`, `/board`, `/insights`, `/insights/[slug]`,
  `/events`, `/certs`, `/sponsors`, `/contact`, `/login`, `/highlight`.
- A working Eventbrite client with a `data/events.json` fallback.

## Gaps, in the order they will be closed

| # | Gap | Spec |
| --- | --- | --- |
| 1 | `--color-bg` is `#f3f2f2`; the design overrides it to `#ffffff` and moves `#f3f2f2` to `--color-surface` | `01` |
| 2 | No test harness anywhere in the repo | `04` |
| 3 | Board roster holds 9 of 41 people; no three-section split, no pinned ordering, no sector labels, no `#advisors` anchor | `02` |
| 4 | Nav has no "Advisory" item and no smooth-scroll-to-anchor behaviour | `03` |
| 5 | Home CTAs are cyan `btn-primary` / plain `btn-secondary`; the design wants membership orange and a cyan-tint secondary | `03` |
| 6 | Sponsors has 3 invented tiers; the design has 4 named levels plus 3 secondary options and 20 logo slots | `03` |
| 7 | Home hero uses `hero-chapter.jpg`; the design specifies `ncma-metromd-hero.jpeg` | `03` |
| 8 | Home "This season" and board preview copy still say "Nine volunteers" | `03` |
| 9 | Insights subscribe block's "I am" radio group has no accessible name (the segmented control itself is already built) | `03` |
| 10 | Board page carries two invented sections not in the design | `03` |
| 11 | `/events` shows no venue beneath each title — `Event` has no venue field and the API request does not expand it | `03` |
| 12 | `lib/eventbrite.ts` caps past events at 10 while the design lists 23, and logs the API key length and env var names on every request | `03` |

## Decisions taken (confirmed with the repo owner, 2026-08-20)

1. **Scope is the public site only.** `/admin` and the Supabase backend are a
   separate round of work, blocked on a Supabase project and on the five open
   decisions in the handoff. `.claude/specs/05-deferred.md` records what was left
   and why.
2. **The handoff README's tokens win over the prototype's inline styles.** The
   prototype carries late unmanaged experiments that contradict the README; they
   are treated as accidents, not intent. Every one is logged in `01`.
3. **Vitest + React Testing Library.** Added before any page is touched, so
   "nothing broke" is a claim something checks.
4. **Seed all 41 board members and render the gaps.** Empty 4:5 surface frame
   where there is no headshot, no "Read bio" where there is no bio, no LinkedIn
   icon where there is no URL. The four vacant positions stay off the site, as in
   the design.

## Assumptions, stated rather than asked

- **`/our-chapter` keeps its path.** The handoff calls this page `/about`, but the
  live site already links to `/our-chapter` and renaming it breaks inbound links
  for no design benefit. Nav label stays "Our chapter".
- **`/highlight` stays.** Not in the handoff, but it is the chapter's only working
  form. Kept and left on-system.
- **`/insights/[slug]` stays.** The design's article view is a section; the repo
  already models it as a proper route, which the handoff asks for.
- **The Officers & VPs section gets no kicker and no lede.** The README describes
  all three board sections as kicker + h2 + lede, but the prototype gives Officers
  only an h2 — and copy is final per the handoff, so inventing a lede is worse
  than matching the markup. Flagged for the designer in `01`.

## Task plan

Each task is one implementer run, one reviewer run, one commit. A task is not done
until the reviewer returns PASS or PASS WITH NITS.

| Task | Spec | Touches |
| --- | --- | --- |
| T1 Ground colour and token correction | `01` | `app/globals.css`, `tailwind.config.ts` |
| T2 Test harness + baseline tests | `04` | `package.json`, `vitest.config.ts`, `test/` |
| T3 Board roster data — all 41 members | `02` | `data/board.ts` |
| T4 Board card + bio dialog | `02` | `components/board-card.tsx`, `components/headshot.tsx` |
| T5 Board page — three sections, anchor | `02` | `app/board/page.tsx` |
| T6 Nav — Advisory item and anchor scroll | `03` | `components/nav-bar.tsx` |
| T7 Home page corrections | `03` | `app/page.tsx` |
| T8 Sponsors page — four levels | `03` | `app/sponsors/page.tsx`, `components/sponsor-grid.tsx` |
| T9 Subscribe control accessibility | `03` | `components/newsletter-form.tsx`, `app/globals.css` |
| T11 Events venue line + Eventbrite hygiene | `03` | `types/event.ts`, `lib/eventbrite.ts`, `components/events-content.tsx`, `data/events.json` |
| T10 Responsive and focus sweep | `03` | as needed |

Order matters at both ends. **T1 and T2 come first** — T1 changes what every page
renders against, and T2 is what proves the rest did no harm. **T10 comes last**,
whatever its number: it is a sweep over everything the other tasks touched, so it
cannot run before they are done. The rows in between are listed in dependency
order (data before the component that renders it, component before the page).
