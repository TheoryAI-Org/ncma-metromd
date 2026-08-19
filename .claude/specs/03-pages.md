# 03 — Page-level corrections

Every task here is an edit to a page that already exists and is already close.
Read the file before changing it. Do not rewrite what already matches.

---

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

Five corrections. Everything else on this page is already right.

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

```css
/* The membership CTA is the design's one sanctioned exception to the cyan
   primary — see .claude/specs/01-design-system.md. */
.btn-membership {
  background: #c8551b;
  border-color: #c8551b;
  color: #f3f2f2;
}
.btn-membership:hover {
  background: #a8450f;
  border-color: #a8450f;
  color: #f3f2f2;
}
```

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

## T9 — `components/newsletter-form.tsx`: the segmented control

The `/insights` "Get it by email" block is missing the design's third field. Add
it, in the `variant="stacked"` layout only — the home page's mailing-list block
uses First name / Last name / Email and has no segment.

```
field  Name    input  "Your name"
field  Email   input  "you@agency.gov"
field  "I am"  .seg with three .seg-opt radios: Government, Industry, Student
                Government checked by default
btn btn-primary btn-block  "Subscribe"
note  13px text-neutral-600  "Chapter news only. Unsubscribe any time."
```

`.seg` and `.seg-opt` already exist in `app/globals.css`. Each `.seg-opt` is a
`<label>` wrapping a visually-hidden `<input type="radio" name="segment">` — that
is what `.seg-opt:has(input:checked)` keys off, and it keeps the control keyboard-
navigable. Give the group a `<fieldset>` with a `<legend class="sr-only">` or an
`aria-label`, since "I am" is a `<label>` pointing at nothing.

The form is a **non-functional mockup** per the handoff — "Fields render but
nothing is wired... Connect to whichever platform the chapter picks (Mailchimp,
Constant Contact, or Resend) — this is an open decision." Do not invent an
endpoint. Keep the existing behaviour, whatever it is, and make sure submitting
does not navigate or throw.

---

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
