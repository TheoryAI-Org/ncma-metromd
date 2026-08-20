# 03 — Page-level corrections

Every task here is an edit to a page that already exists and is already close.
Read the file before changing it. Do not rewrite what already matches.

---

## T3b — `app/contact/page.tsx`: the board-email regression

T3 dropped Dr. Patricia Akinrogunde's email from the roster, because the design's
board card for her does not show one. But `app/contact/page.tsx` builds its "Reach
the board directly" list by looking each topic's board member up by slug and
rendering `mailto:{member.email}` unconditionally — so the Training row now emits a
literal `mailto:undefined`. A dead link, silent, on the page whose whole job is
being reachable.

**The design has the address.** Its contact section carries all five explicitly,
Akinrogunde's included:

| Topic | Name | Address |
| --- | --- | --- |
| Membership | Jennifer Hanks | jahanks@mmcgovsolutions.com |
| Programs | Renita Anderson | randerson@deftechno.com |
| Training | Dr. Patricia Akinrogunde | patricia@triplejoygroup.com |
| Sponsorship | Sonya Hopson | sonya@sageservicesgroupllc.com |
| Newsletter | Bethlehem Belaineh | be@theoryai.co |

So the design treats the contact page's addresses as its own content, independent of
what each board card chooses to display. Follow that: give the page's `contacts`
array an explicit `email` per row, taken from the table above, and stop reading
`member.email`. Keep the slug only for the display name, so a name change in the
roster still flows through.

This removes the whole class of bug rather than patching one row — the page can no
longer emit a dead `mailto:` because a card omitted an address. Guard the name
lookup too: if a slug ever stops resolving, that `.find()!` is a crash.

## T6 — `components/nav-bar.tsx`: the Advisory item

The nav is otherwise correct: logo left with `mr-auto`, links right, `gap-x-[22px]`,
15–16px, `.navlink` with `data-on` for the active state, "Sign in" in
`text-neutral-600`, then a "Join us" `btn btn-primary`. Two changes.

**1. Add "Advisory"** between "Board" and "Insights", pointing at
`/board#advisors`. Nav order becomes: Our chapter, Board, Advisory, Insights,
Events, Certifications, Sponsors, Contact, Sign in, Join us.

**2. Make the anchor scroll behave.** The handoff: it "routes to the board page,
then scrolls to `#advisors` with `behavior: 'smooth'` and a 96px offset". The 96px
offset is already handled by `scroll-mt-24` on the target (spec `02`), so the
remaining job is smooth behaviour and the cross-page case.

The prototype's warning about locating "the actual scroll container rather than
assuming `window`" does **not** apply here: in this app the document scrolls, not a
wrapper `div`. Do not port that logic.

Implement it as the smallest thing that works:

- A plain `<Link href="/board#advisors">` already navigates and jumps correctly
  from another page — Next.js handles hash targets on navigation. Keep the `Link`.
- Add `scroll-behavior: smooth` to `html` in `app/globals.css`, wrapped in
  `@media (prefers-reduced-motion: no-preference)` so it respects the setting.
- The one case a plain `Link` gets wrong is clicking "Advisory" while already on
  `/board` with the hash already in the URL. Handle it with an `onClick` that,
  when `pathname === "/board"`, calls
  `document.getElementById("advisors")?.scrollIntoView({ behavior: "smooth" })`.
  Do not `preventDefault()` on the cross-page case.

`data-on` for Advisory: true when `pathname === "/board"`. That means Board and
Advisory both light up on `/board`, which is honest — they are the same page.

Mirror both changes into the mobile `Sheet` menu.

---

## T7 — `app/page.tsx`

Six corrections. Everything else on this page is already right.

**0. Give the page an `<h1>`.** The page currently has none — every heading on it
is an `<h2>`, which T2's tests verified. That is an SEO and screen-reader gap on
the site's most important page.

The handoff README's Home section specifies a "**Hero headline.** 64px,
`letter-spacing: -0.02em`, `line-height: 1.05`, margin `18px 0 22px`" — but the
prototype never drew one, and inventing chapter copy is not ours to do.

Decided with the repo owner, 2026-08-20: **promote the existing "MetroMD Chapter"
kicker to an `<h1>`, keeping the `.kick` styling.** Change the element, not the
appearance:

```tsx
<h1 className="kick">MetroMD Chapter</h1>
```

`.kick` sets its own 13px size, so the global `h1` rule needs no override — but
check the rendered size, because `app/globals.css` styles bare `h1` and specificity
between `@layer base` and `@layer components` matters here. If `.kick` loses, add
the size to the element rather than weakening either rule.

This is zero visual change and zero invented copy, and it reverses in one line the
moment the designer supplies a headline. Leave a short comment saying so, and
update `test/pages.test.tsx` — T2 asserts `/` has **no** `h1`, and that assertion
must flip to asserting it has one. That is the baseline-drift signal working as
intended, not a test to delete.

**1. Hero image.** `src` becomes `/images/ncma-metromd-hero.jpeg` — the file the
handoff names, already present in `public/images/`. The current
`/images/hero-chapter.jpg` is the National Harbor photograph, which the handoff
lists as a regional photo for "hero slots and accent sections", not the homepage
hero. Alt text: "NCMA MetroMD chapter members at a dinner meeting" stays.
`/images/hero-chapter.jpg` becomes unreferenced — **leave the file in place**, it
is a design asset with a listed purpose.

**2. "Become a Member" is orange.** This is the handoff's one deliberate exception
to the cyan primary. Add a variant to `app/globals.css` rather than an inline
style, because it is a stateful button:

`.btn-membership` already exists in `app/globals.css` from T1, but its resting
fill needs correcting from `#c8551b` to **`#b04a15`** for AA contrast — the
reasoning is in `01-design-system.md`. Change the two `background`/`border-color`
values in the resting rule and extend the comment to record why the value differs
from the handoff. Leave the hover rule alone.

Apply `btn btn-membership` to the hero CTA only. The "Join us" nav button, the
"Join now" buttons on `/` and `/our-chapter`, and the `/login` "Join NCMA" button
all keep their current variants — the design only tints the hero one.

**3. The second CTA is a cyan tint.** "New here? Start with our chapter" takes
`background: var(--color-accent-100)`, `border-color: var(--color-accent-300)`,
`color: var(--color-accent-900)`, hover `--color-accent-200`. Same treatment — a
`.btn-tint` variant in `app/globals.css`, not inline styles.

**4. Board preview.** `BOARD_PREVIEW_SLUGS` changes to Hanks, Thomas, Ibik,
Belaineh (spec `02`). Each card shows a 4:5 headshot, the name at 22px, and the
**position** as a 13px `.kick` — note the field is now `position`, not `role`.
Grid stays `grid-cols-2 lg:grid-cols-4`, `gap-8`.

**5. Copy.** "Nine volunteers — agency veterans and small business owners — who
plan the programs and answer their own email." → drop "Nine". The prototype reads
"Volunteers — agency veterans and small business owners — who plan the programs
and answer their own email."

CTA row gap is `14px` in the prototype; `gap-3.5` is already correct.

---

## T8 — `app/sponsors/page.tsx` and `components/sponsor-grid.tsx`

The current page invents three tiers. The design has four named levels, then three
secondary options, then a 2-column logo grid.

**Page lede** — replace "Three levels, one conversation" with the design's:
"Sponsorship keeps dinner affordable for government attendees and puts your name in
front of the Washington-area acquisition community. Four levels, one conversation."
(Note "Washington-area", not "Maryland".)

**Four levels** — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-12`, `mt-16`.
Each: a "Level" kicker, a 30px `<h2>`, a 16px `text-neutral-700` body. Kicker
colour differs per tier and is the only place magenta appears on this page:

| Level | Kicker colour | Body |
| --- | --- | --- |
| Platinum | `text-magenta-700` | Top billing across the season: named on every meeting, logo on the site, newsletter and all event material, a reserved table at each dinner, and a speaking slot. |
| Gold | `text-cyan-700` (the `.kick` default) | Logo on the site and newsletter, recognition from the podium at every meeting, and reserved seating at dinners. |
| Silver | `text-neutral-700` | Logo on the site and in the newsletter, with recognition at the meetings you attend. |
| Bronze | `text-neutral-700` | Name listed on the site and in the newsletter — the entry point for small businesses. |

**Three secondary options** — `grid-cols-1 md:grid-cols-3`, `gap-12`, `mt-[72px]`.
Kicker, then a 23px `<h3>`, then body:

| Kicker | Heading | Body |
| --- | --- | --- |
| Per meeting | Dinner sponsor | Underwrite one dinner meeting: welcome remarks, table signage, and your material at each seat. |
| In kind | Venue & training | Host a session in your space or supply an instructor. Credited the same as a cash sponsor. |
| Ask | Something else | Scholarships, student outreach and training underwriting are all open to discussion. |

**Current sponsors grid** — `<h2>` at 28px, `mt-20 mb-6`. Then
`components/sponsor-grid.tsx` reworked to the design's spec, which the handoff says
"was iterated on repeatedly":

- `grid-cols-1 sm:grid-cols-2`, `gap-y-14 gap-x-12`, `max-w-[1000px]`,
  `items-center`.
- **Twenty** slots.
- Each slot: `flex items-center justify-start min-h-[120px]`, holding a logo at
  `max-w-full max-h-[200px] object-contain`.
- **No tinted frame.** The logos sit on the page background — no `bg-surface`, no
  border, no aspect-ratio box. The handoff is emphatic: "The logos must not be
  cropped and must sit on the page background with no tinted frame."

The twenty logo files **are not in the repo** — the handoff: "Sponsor logos are
**not** in the repo — they were dropped directly into the prototype's image slots
and live only in that file's local storage. Ask the client for the twenty logo
files." So the grid renders twenty empty `min-h-[120px]` slots for now. Give
`SponsorGrid` an optional `logos?: { name: string; src: string; href?: string }[]`
prop so wiring them later is a data change, not a rewrite, and default `count` to
20.

The home page calls `<SponsorGrid count={5} />` and the design's home strip is a
5-column `aspect-[3/2]` `bg-surface` grid — a **different** treatment from the
sponsors page. Keep them separate: give `SponsorGrid` a `variant` of `"strip"`
(home: 5 columns, 3:2 surface frames) or `"wall"` (sponsors: the spec above).

Closing CTA block already matches.

---

## T9 — `components/newsletter-form.tsx`: accessibility only

**Re-checked against the file: the segmented control is already there.** The
`variant="stacked"` layout renders Name, Email, an "I am" `.seg` with Government /
Industry / Student radios (Government `defaultChecked`), a `btn btn-primary
btn-block` Subscribe, and the 13px "Chapter news only. Unsubscribe any time."
note. That matches the design. The `variant="inline"` home layout correctly has no
segment.

Two small things remain. This task is those and nothing else.

**1. The radio group has no accessible name.** `<label>I am</label>` points at
nothing — it is a bare label with no `htmlFor` and no wrapped control, so screen
readers announce three unrelated radios. Wrap the group:

```tsx
<fieldset className="field mb-4">
  <legend>I am</legend>
  <div className="seg"> … </div>
</fieldset>
```

`.field > label` styles the current label; `<legend>` will need the same treatment,
so extend that rule in `app/globals.css` to `.field > label, .field > legend`
rather than adding a new class. Check the result still sits flush left — browsers
give `<legend>` default padding that needs zeroing.

**2. The radios need a stable `name` per instance.** Both variants can appear on
one page in principle, and `name="who"` is global to the document. Keep `who` if
only the stacked variant uses radios today, but note it in the report if you see a
page rendering both.

**Leave the rest alone.** In particular:

- The form is a **non-functional mockup** per the handoff — "Fields render but
  nothing is wired… Connect to whichever platform the chapter picks (Mailchimp,
  Constant Contact, or Resend) — this is an open decision." Do not invent an
  endpoint or a client-side handler.
- The `disabled` Subscribe and Sign up buttons are a deliberate reading of that:
  the design draws an enabled button, but a button that looks live and does
  nothing is worse than one that says so. Keep `disabled`. The existing file-level
  `TODO(forms)` comment already records both wiring options; keep it.

## T11 — `/events`: the venue line

`/events` is already the closest page to the design — the past-meetings table has
the right columns, the right `.table` styling, and an `overflow-x-auto` wrapper.
One design requirement is missing, and it needs a data change to satisfy.

The handoff describes the events table as "date, title with venue beneath (14px,
`--color-neutral-700`), time, and a link to Eventbrite", and the prototype renders
it that way — e.g. "The Westin Washington National Harbor" under the dinner
meetings. **`types/event.ts` has no venue field and `lib/eventbrite.ts` never maps
one**, so the line cannot render today.

1. **Add `venue?: string`** to the `Event` interface. Optional — the design itself
   shows several rows with no venue (the December training, the January dinner).
2. **Map it from the API.** Eventbrite does not return venue on the events list by
   default; the request needs `expand=venue`, and the mapped value is
   `event.venue?.name`. Add `expand=venue` to the query string in
   `lib/eventbrite.ts` and extend the local `EventbriteEvent` interface. Leave
   `app/api/events/route.ts` alone — nothing calls it.
3. **Render it** in `components/events-content.tsx`, in the table body only:
   beneath the title, `text-sm text-neutral-700 mt-0.5`, and only when present.
   The prototype's markup is
   `<div style="font-size:14px;color:var(--color-neutral-700);margin-top:2px">`.
   Do **not** add it to `EventRows` (the upcoming list) — the design's upcoming
   section does not show venue.
4. **`endTime` becomes optional.** 13 of the design's 23 rows show a single time
   ("5:30 PM"), not a range — the range form ("4:00 – 8:30 PM") is the minority.
   `Event.endTime` is currently required, so those rows cannot be represented
   without inventing an end time. Make it `endTime?: string` and render the range
   only when it exists.

   This touches three formatters: `formatTimeRange` in `app/page.tsx`,
   `formatTime`'s two call sites in `components/events-content.tsx`, and the
   mapping in `lib/eventbrite.ts` (the API does return an end, so live events keep
   theirs). Have the shared behaviour live in one helper rather than three — but do
   not go further and refactor the date formatters; they are fine.

5. **Expand the fallback from 9 rows to 23.** Decided with the repo owner,
   2026-08-20. The design's table is a fuller archive than the snapshot, and
   expanding it is what makes the venue line visible at all before the Eventbrite
   token exists.

   **Use `.claude/design-reference/events-table.json`** — the complete extraction,
   already in `Event` shape: 23 rows sorted date-descending, unique ids of the form
   `YYYY-MM-DD-<title-slug>`, 13 with `venue`, 10 with `endTime`, 19 with
   `eventUrl`. Do not retype it and do not re-derive the times.

   The 4 rows without an `eventUrl` (June, May, April 2024 and the Kick-Off) are
   the ones the design renders as "Closed" rather than as a link, and
   `components/events-content.tsx` already does exactly that when `eventUrl` is
   absent — so no code change is needed for them. Verify that still holds.

   Every one of the 23 is in the past as of 2026-08-20, so none can wrongly surface
   as upcoming. Note in `data/events.json` — or in the comment above
   `PAST_EVENTS_FALLBACK` — that these rows are a snapshot taken from the redesign
   handoff, so a future reader knows their provenance and that live API data
   supersedes them.

   Keep `upcomingEvents: []`. The code deliberately never backfills upcoming
   events, and inventing future meetings would be worse than showing none.

Two further problems in `lib/eventbrite.ts`, both in scope because this task edits
the file:

5. **Raise the past-events cap.** `pastEvents.slice(0, 10)` silently truncates,
   while the design's table shows 23 rows and the handoff calls the page a full
   archive ("Past meetings"). Remove the slice. If a cap is wanted later it should
   be a paged UI, not a silent drop.
6. **Remove the console logging.** The function logs on every request, including
   the API key's length and the names of every `EVENTBRITE`/`NEXT_PUBLIC` env var
   present. That is noise in production logs and needless detail about the
   deployment's configuration. Delete the `console.log` calls. **Keep** the
   `console.warn` for missing credentials and the `console.error` in the catch —
   those are the two cases an operator needs to see.

Do not otherwise restructure the function. Its fallback contract is what the T2
tests pin down; if you change a return shape, the tests must change with it and the
report must say so. Note that T2 includes a test documenting the 10-item cap — it
was written knowing T11 removes it, so update that test deliberately and say so.

**Open: should the fallback grow from 9 rows to 23?** The design's table lists 23
past meetings; the snapshot has 9. Expanding it would complete the archive and make
13 venues visible. Against it: the handoff calls the design's rows "placeholder data
pending the API key", so they may not be authoritative chapter history — though they
carry specific venue names and real Eventbrite ticket URLs, which argues they are
real. Do not decide this yourself; the answer will be added here before T11 runs.
Note that every one of the 23 rows is in the past as of 2026-08-20, so none would
wrongly surface as upcoming.

## T10 — Responsive and focus sweep

Not a rebuild; a pass over what T1–T9 touched.

- **Gutter.** `.pg` is `max-width: 1180px`, `padding: 0 40px`, dropping to 24px
  below 1180px. Already correct in `app/globals.css`; confirm nothing overrides it.
- **Board grids** collapse 3 → 2 (tablet) → 1 (mobile).
- **Sponsor wall** collapses 2 → 1.
- **Nav wraps** below `lg`; the Sheet menu covers narrow widths.
- **No horizontal page scroll at 320px.** The likely offenders are the long sector
  labels and organization names — spec `02` already drops `whitespace-nowrap` from
  the sector label for exactly this reason. Check the `/events` table too; wrap it
  in `overflow-x-auto` if it pushes the page.
- **Focus ring visible on every interactive element** — nav links, buttons, card
  email links, LinkedIn icons, "Read bio", dialog close, form controls, segmented
  control options. `:focus-visible { outline: 2px solid var(--color-accent);
  outline-offset: 2px }` is global; the job is confirming nothing suppresses it.
- **Hover tint on every interactive element.** No bare colour-only hovers on
  buttons.
