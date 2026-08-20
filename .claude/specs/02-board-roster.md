# 02 — Board & Leadership

The most content-heavy screen and the largest gap. Three tasks: the data (T3), the
card component (T4), the page (T5).

Authoritative source: `.claude/design-reference/site-v2.html`, lines **267–823**.
Card ids are `v2-bd-*` (officers), `v2-dir-*` (directors), `v2-adv-*` (advisors).
The handoff's "Content status" section corroborates every count below.

---

## T3 — `data/board.ts`: 41 members

### Shape

Extend the existing `BoardMember` interface. Keep `slug`, `name`, `email`,
`linkedin`, `photo`, `bio`; rename/add the rest so the card can render the design:

```ts
export type BoardBody = "officers" | "directors" | "advisors";

export interface BoardMember {
  /** Stable key, also the headshot filename. Unique across all three bodies. */
  slug: string;
  body: BoardBody;
  name: string;
  /** Card kicker, e.g. "VP — Communications". Verbatim from the design. */
  position: string;
  /** Sector label above the organization, e.g. "Government (Federal)". */
  sector: string;
  /** Employer or firm. Omitted where the roster has none. */
  organization?: string;
  email?: string;
  linkedin?: string;
  /** Path under /public. Omitted until the member submits a headshot. */
  photo?: string;
  /** Bio content as ordered blocks. Three of the twelve bios have more than one. */
  bio?: BioBlock[];
}

/**
 * Bio bodies are structured rather than HTML so the site renders them in its own
 * type styles. Matches the block model the deferred admin panel will store as
 * JSONB — see .claude/specs/05-deferred.md.
 */
export type BioBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };
```

Every field except `slug`, `body`, `name`, `position`, and `sector` is optional and
**must** be absent, not empty-string, when the roster has no value. The card keys
its rendering off presence.

`affiliation` and `role` are gone. Every consumer, already traced:

| File | Line | Uses | Becomes |
| --- | --- | --- | --- |
| `components/board-card.tsx` | 33, 34 | `member.role`, `member.affiliation` | `position`, `organization` |
| `app/page.tsx` | 210 | `member.role` (board preview kicker) | `position` |
| `app/page.tsx` | 244 | `author.role` (article byline) | `position` |
| `app/insights/page.tsx` | 68, 107 | `author.role` | `position` |
| `app/insights/[slug]/page.tsx` | 53 | `author.role` | `position` |
| `app/board/page.tsx` | 25 | `BOARD.map` over the flat list | `boardBody(...)` per section |
| `app/contact/page.tsx` | 36 | `BOARD.find` by slug | unchanged, but see below |

`organization` is optional — every site that renders it must handle its absence.
`app/insights/page.tsx` and `app/page.tsx` render `role` unconditionally today;
`position` is required so those stay safe, but do not paper over `organization`
with `?? ""`. Omit the element.

**Slug continuity — verified, no regression.** `data/insights.ts` references five
author slugs (`akinrogunde`, `hanks`, `belaineh`, `sistrunk`, `sheckles`) and
`app/contact/page.tsx` references five (`hanks`, `anderson`, `akinrogunde`,
`hopson`, `belaineh`). All ten exist in the new roster with the same slugs, so no
`.find()!` starts returning `undefined`. Keep it that way: if you rename any of
those slugs, fix the referrers in the same commit.

**Expected copy changes downstream, which are correct and not regressions.**
Several people's titles differ between the repo's current data and the design, and
the design wins. The visible effect is that article bylines and contact lines
change text:

| slug | Repo today | Design |
| --- | --- | --- |
| akinrogunde | VP, Training & Education | Director — Training |
| sheckles | Director of Networking | Director — Networking |
| sistrunk | Treasurer | VP — Treasurer |
| hanks | Board Chair, President | President |
| anderson | VP, Programs | Director — Programs |
| hopson | VP, Operations | VP — Operations |
| parson | Training & Education / Professional Development | Director — Training & Education |

Note that Dr. Patricia Akinrogunde and Renita Anderson move from Officers to
Directors, and Joye Sistrunk gains the VP prefix. Do not "correct" these back.

Two derived exports the pages need:

```ts
/** Members of one body, already in display order. */
export function boardBody(body: BoardBody): BoardMember[]

/** The four members in the home page's "Your board" preview. */
export const BOARD_PREVIEW_SLUGS = ["hanks", "thomas", "ibik", "belaineh"];
```

Note the preview slugs **change** — the design features Jennifer Hanks, Chyanne
Thomas, Patience Ibik, Bethlehem Belaineh, not Hopson and Sistrunk.

### Ordering

The prototype's document order already satisfies the handoff's rules, so
**preserve prototype order exactly**. Encode the rule in a comment above each
section so a future addition sorts correctly:

- **Officers & VPs** — Jennifer Hanks, Chyanne Thomas, Patience Ibik pinned first;
  the remaining ten alphabetical by last name.
- **Directors** — all eighteen alphabetical by last name.
- **Advisors** — Jennifer Hanks, Richard Hanks pinned first; the remaining eight
  alphabetical by last name.

### The roster

Positions, sectors, organizations and emails are verbatim. `LI` = the card has a
LinkedIn URL; copy the exact href from the prototype. `Bio` = the card's dialog
holds bio copy.

**Do not transcribe the bios by hand.** They are already extracted verbatim from
the prototype into `.claude/design-reference/bios.json`, keyed by prototype card id
(`v2-bd-hanks`, `v2-dir-parson`, …), each with the member's name and a `bio` array
of blocks in document order. Read that file and copy the strings across exactly —
em dashes, curly quotes, and the `™` in Jennifer Hanks's included. Do not
paraphrase, re-punctuate, or re-wrap.

Twelve members have bios. **Four have structure that must not be flattened:**

| slug | Blocks |
| --- | --- |
| parson | 4 paragraphs, then a 4-item bulleted list |
| robinson | 3 paragraphs |
| sheckles | 3 paragraphs |
| the other nine | 1 paragraph |

The repo's current `data/board.ts` flattens Parson's and Sheckles's bios into one
string each, and drops Parson's list entirely. That is a loss of structure the
design has — fix it, do not preserve it.

Jennifer Hanks and Richard Hanks each appear twice — once as an officer, once as
an advisor — with **different** positions and sectors. Dr. John Wilkinson likewise
appears as a director and as an advisor; the handoff confirms this is intentional.

**Wilkinson's two cards do not share a name string.** The prototype has
`Dr. John Wilkinson` on the director card and `Dr. John W. Wilkinson` — with the
middle initial — on the advisor card. Keep both verbatim. A test asserting his name
appears twice will never pass; assert the two distinct headings instead. Hanks and
Hanks *are* literal duplicates, so those two do get a count-of-two assertion.
Give the duplicates distinct slugs (`hanks` / `hanks-advisor`, `hanks-richard` /
`hanks-richard-advisor`, `wilkinson` / `wilkinson-advisor`).

**Organizations: use `.claude/design-reference/organizations.json`, not the tables
below.** Two cells in these tables were wrong on the first pass — McGraw's and
Marcinowski's organizations were recorded as absent when the prototype has both —
because the org line is not styled consistently across sections. It is 16px in most
cards, **14px with `nowrap` for McGraw**, and in the advisors section it sits
*before* the sector line rather than after. The corrected values are in the tables
now, but the JSON is the machine-checked extraction of all 41: 34 have an
organization, and the 7 that do not are all directors (Alexander-Sergeeff, Bracey,
Clark, Mills, Queen, Robinson, Scott).

#### Officers & Vice Presidents — 13

| # | slug | Name | Position | Sector | Organization | Email | LI | Bio |
|---|---|---|---|---|---|---|---|---|
| 1 | hanks | Jennifer Hanks | President | Industry | Founder & CEO, MMC Government Solutions | jahanks@mmcgovsolutions.com | ✓ | ✓ |
| 2 | thomas | Chyanne Thomas | President-Elect | Industry | Founder & CEO, Aurelus Solutions LLC · Army Veteran | cthomas@aurelus.io | ✓ | ✓ |
| 3 | ibik | Patience Ibik | VP — Secretary | Industry | Resolute Consulting | patience.ibik@gmail.com | ✓ | — |
| 4 | belaineh | Bethlehem Belaineh | VP — Communications | Industry | Founder & CEO, Theory AI | be@theoryai.co | ✓ | ✓ |
| 5 | frazier | Monique Frazier | VP — University Outreach | Industry | Infosys Public Services | monique.frazier@infosys.com | ✓ | — |
| 6 | grimsley | Antavia Grimsley | VP — Programs | Government (Federal) | Elite Veteran Enterprises, LLC | antavia@eliteveteranenterprises.com | ✓ | — |
| 7 | hanks-richard | Richard Hanks | VP — Strategic Initiatives | Industry, Former Government (State/Local) | MMC Government Solutions | rdhanks@mmcgovsolutions.com | ✓ | — |
| 8 | hopson | Sonya Hopson | VP — Operations | Industry, Former Government (Federal) | Founder & CEO, Sage Services Group LLC | sonya@sageservicesgroupllc.com | ✓ | ✓ |
| 9 | ingol | Lester L. Ingol | VP — Membership | Industry, Former Government (Federal) | Chief Operating Officer, Blue Line Global, LLC | — | ✓ | ✓ |
| 10 | mcgraw | Darrell McGraw | VP — Development (Fundraising) | Industry | President & CEO, Q2 Consulting Solutions LLC | — | ✓ | ✓ |
| 11 | moore | COL Dawn Moore | VP — Government Relations & Policy | Government (Federal) | Office of the Chief, Army Reserve | dawn_eakins@yahoo.com | ✓ | — |
| 12 | pace | Dr. Cynthia Pace | VP — Training & Education | Industry | C. O. Pace, "The Leadership Guru," LLC | cpace@leadershipguru.com | ✓ | — |
| 13 | sistrunk | Joye Sistrunk, CPA | VP — Treasurer | Industry | President & CEO, Premier Group Services, Inc. | accounting@pgs-cpa.com | ✓ | ✓ |

Pace's organization uses curly quotes in the prototype (`"The Leadership Guru,"`);
keep them.

#### Directors — 18

| # | slug | Name | Position | Sector | Organization | Email | LI | Bio |
|---|---|---|---|---|---|---|---|---|
| 1 | akinrogunde | Dr. Patricia Akinrogunde | Director — Training | Government (Federal) | Founder & CEO, The Triple Joy Group, LLC | — | ✓ | ✓ |
| 2 | alexander-sergeeff | Stella Alexander-Sergeeff | Director — Mentoring | Industry | — | — | ✓ | — |
| 3 | anderson | Renita Anderson | Director — Programs | Industry | CEO, Defense Technology Integration (DTI), LLC | randerson@deftechno.com | ✓ | ✓ |
| 4 | bracey | Dr. LaShonda Bracey | Director — Social Media | Industry | — | info@lashondabracey.com | — | — |
| 5 | canery | Jon Canery | Director — Media | Industry | Coalmine Photography | jon.canery@coalminephotography.com | — | — |
| 6 | clark | Major Clark | Director — University Outreach | Industry | — | majclk3@verizon.net | — | — |
| 7 | gray | Sharlyn Gray | Director — Chapter Volunteers | Industry | Q.O.L Security Solutions | qolsecsolutions@outlook.com | — | — |
| 8 | irby | Serapis Irby | Director — Recruitment | Industry | Oasis Global Solutions | serapisg@gmail.com | — | — |
| 9 | jones | QC Jones | Director — Government Relations & Policy | Industry | Nolan Mackenzie | qcjones@nolanmac.com | — | — |
| 10 | mills | Vanetta Mills | Director — Records | Industry | — | — | — | — |
| 11 | parson | Dr. Stephanie Parson | Director — Training & Education | Industry | President & CEO, Crowned Grace International | saparson@crownedgrace.com | ✓ | ✓ |
| 12 | queen | Dr. Oliver Queen | Director — Program Operations | Government (Federal) | — | oliver.queen74@gmail.com | — | — |
| 13 | robinson | Brandon Robinson | Director — Operations | Industry | — | — | ✓ | ✓ |
| 14 | scott | Tracy Scott | Director — Association Relations | Industry | — | tracy.r.scott1@gmail.com | — | — |
| 15 | sheckles | Megan Sheckles | Director — Networking | Industry | Founder & CEO, Powered by MJ LLC | info@mjpowered.com | ✓ | ✓ |
| 16 | uddin | Akil Uddin | Director — Website Administration & Technology | Industry | AIN LLC | akil@ainintel.com | ✓ | — |
| 17 | venable | Christi Venable | Director — Wellness | Industry | Smile Therapy Services | cvenable@smiletherapyservices.com | ✓ | — |
| 18 | wilkinson | Dr. John Wilkinson | Director — Fellows | Industry | tHInc, LLC | jwilkinson@thinc-llc.com | ✓ | — |

Note: the design shortens Megan Sheckles's card name (no `, SHRM-CP`) and drops
Akinrogunde's email. Match the design, not the repo's current values.

#### Board of Advisors — 10

| # | slug | Name | Position | Sector | Organization | Email | LI | Bio |
|---|---|---|---|---|---|---|---|---|
| 1 | hanks-advisor | Jennifer Hanks | Board of Advisors — President | Industry, Former Government (Federal) | MMC Government Solutions | jahanks@mmcgovsolutions.com | ✓ | — |
| 2 | hanks-richard-advisor | Richard Hanks | Board of Advisors — Chairperson | Industry, Former State/Local Government | MMC Government Solutions | rdhanks@mmcgovsolutions.com | ✓ | — |
| 3 | bizzell | Dr. Anton C. Bizzell | Board of Advisors | Industry, Former Government (Federal) | Bizzell Group | abizzell@bizzellus.com | ✓ | — |
| 4 | chappell | Brittney Chappell | Board of Advisors | Industry, Former Government (Federal) | Alpha and Omega | bvc0425@gmail.com | ✓ | — |
| 5 | marcinowski | Traci Marcinowski | Board of Advisors | Industry, Former Government (Federal) | Strategic Acquisition Solutions, LLC | tmarcinowski@strategicacqsolutions.com | ✓ | — |
| 6 | mccollum | Ray McCollum | Board of Advisors | Government | National Science Foundation | raymccollum@gmail.com | ✓ | — |
| 7 | mitchell | Calvin J. Mitchell | Board of Advisors | Industry, Former Government (Federal) | GDIT | calvin.mitchell@gdit.com | ✓ | — |
| 8 | smith | Jimmy D. Smith | Board of Advisors | Industry | PEI / Smith Consulting | jsmith@smithadvisoryconsulting.com | ✓ | — |
| 9 | tsui | Alexa Tsui | Board of Advisors | Industry | G2xchange | alexa@g2xchange.com | ✓ | — |
| 10 | wilkinson-advisor | Dr. John W. Wilkinson | Board of Advisors | Industry, Former Government (Federal) | tHInc, LLC | jwilkinson@thinc-llc.com | ✓ | — |

No advisor has a bio. Confirmed by the handoff: "Advisors (10) — none have bios".

### Headshots

Six already live in `public/images/board/` and are optimized — keep them:
`hanks.jpg`, `thomas.jpg`, `hopson.jpg`, `sheckles.jpg`, `sistrunk.jpg`,
`belaineh.jpg`.

Copy five more from `claude_design/design_handoff_ncma_metromd/design/public/images/`
into `public/images/board/`, renaming to the slug:

| Source | Destination | Assign to |
| --- | --- | --- |
| `board-ibik.jpeg` | `ibik.jpg` | `ibik` |
| `board-ingol.jpeg` | `ingol.jpg` | `ingol` |
| `board-moore.jpeg` | `moore.jpg` | `moore` |
| `board-clark.jpg` | `clark.jpg` | `clark` |
| `board-mitchell.jpeg` | `mitchell.jpg` | `mitchell` |

All five are between 26 KB and 123 KB — copy them straight across, no
re-encoding needed.

Two of these five are inferences, not declarations, and must be called out in the
implementation report:

- **Ibik.** Her board card in the prototype declares no `src`, but the home page
  preview (`v2-hb-3`) uses `board-ibik.jpeg` for her — so the file is hers.
- **Mitchell.** No card references `board-mitchell.jpeg`, and Calvin J. Mitchell
  is the only Mitchell on the roster. Filename match only.

Do **not** wire `board-joye-sistrunk.png` — `sistrunk.jpg` is already in place and
optimized; the PNG is an unused alternate.

Everyone else has no `photo`. That is **11 of 41 with a headshot and 30 rendering
an empty frame**, which is the designed state.

The handoff's prose says "only Brittney Chappell has a headshot" among advisors,
but no Chappell asset shipped in the bundle. The prototype is authoritative:
she renders an empty frame. Note this in the report.

---

## T4 — `components/board-card.tsx`

Structure, top to bottom, per the handoff and prototype:

**Heading level.** The prototype uses `<h4>` for the card name, which skips `h3`
after the section `<h2>`. Use `<h3>` — same visual size, correct document outline.
This is an intentional improvement over the prototype, not a deviation.

**The card has two variants, and the difference is measured, not guessed.** All 41
cards were extracted and tallied. Three properties are perfectly consistent within
each body, which makes them design intent:

| | Officers (13) | Directors (18) | Advisors (10) |
| --- | --- | --- | --- |
| Name size | 30px | 28px | 24px |
| Name margin | `10px 0 4px` | `10px 0 4px` | `6px 0 2px` |
| Field order | position → **sector → organization** | position → **sector → organization** | position → **organization → sector** |

So advisors get a compressed card: smaller name, tighter margins, and the
organization *above* the sector rather than below it. 10 of 10 advisor cards agree
on all three. Implement the variant.

**The advisor sector's own styling is drift — normalise it.** Unlike the three
properties above, the advisor sector label is styled three different ways across
ten cards (7× 13px/`0.1em`, 3× 12px/`0.06em`), and one organization is 14px where
the other nine are 16px. Inconsistent within a section is noise, not intent, so use
the README's single sector treatment — **11px / `0.05em`** — for all three bodies,
and 16px for every organization. Same reasoning as the drift table in
`01-design-system.md`: perfect consistency proves intent, disagreement proves the
opposite.

Stray `white-space: nowrap` on the position line (present on 5 director cards, absent
on 13) is drift too. The position keeps `nowrap` per the README; the sector does not,
for the overflow reason below.

1. **Headshot** — 4:5 frame, `bg-surface`, `object-cover`. Empty (no placeholder
   text, just the surface fill) when there is no photo. `components/headshot.tsx`
   already does this; change its default `placeholder` to render **nothing** for
   board cards — the handoff says "Render an empty 4:5 frame in `--color-surface`
   when no image exists", and 25 cards reading "Headshot" is visual noise. Keep
   the prop so `/insights` can still pass "Photo" if wanted.
2. **LinkedIn icon** — the existing 22×22 inline SVG, `fill="currentColor"`,
   `text-cyan-700`, `mt-3`, `target="_blank" rel="noopener noreferrer"`,
   `aria-label="<Name> on LinkedIn"`. **Omit the element entirely** when there is
   no URL — never a dead link.
3. **Name** — `<h3>`, `font-weight: 700`, `letter-spacing: -0.01em`,
   `line-height: 1.15`, margin `10px 0 4px`. **The size varies by body** — this is
   a deliberate hierarchy, see `01-design-system.md`:

   | Body | Size |
   | --- | --- |
   | officers | 30px |
   | directors | 28px |
   | advisors | 24px |

   Derive it from `member.body` inside the card rather than threading a prop
   through every call site. Tailwind: `font-bold tracking-[-0.01em]
   leading-[1.15] mt-2.5 mb-1` plus the mapped size class.
   When there is no LinkedIn icon the name takes the icon's top margin instead
   (the existing `mt-4` fallback is right).
4. **Position** — card kicker: 12px, uppercase, `letter-spacing: 0.06em`,
   `text-cyan-700`, `whitespace-nowrap`. Use `.kick` with
   `text-xs tracking-[0.06em]` overrides rather than a new class.
5. **Sector label** — 11px, uppercase, `letter-spacing: 0.05em`, `mt-1.5`.
   Colour by rule: `text-magenta-700` when the sector **starts with**
   `"Government"`, otherwise `text-neutral-700`. Implement it as
   `sector.startsWith("Government")` and let the data decide — never a hardcoded
   list of names, which drifts.

   **Five members go magenta**, verified by parsing all 41 rows: Grimsley and Moore
   (officers), Akinrogunde and Queen (directors), McCollum (advisors). **Ten stay
   neutral despite containing the word** — every "Industry, Former Government (…)"
   and "Industry, Former State/Local Government" variant. That is the handoff's rule
   as written, and its visible effect is that ten people who *are* ex-government
   read as Industry. Flag it to the designer; do not widen the match to fix it.

   Assert the count of 5 in the test, so a later "fix" from `startsWith` to
   `includes` fails loudly instead of quietly turning ten more labels magenta.
   Drop `whitespace-nowrap` here: the handoff explicitly flags that Richard
   Hanks's label ("Industry, Former Government (State/Local)") overflows its
   column below ~1000px. Let it wrap.
6. **Organization** — 16px, `text-neutral-700`, `mt-1.5`. Omit when absent.
7. **Email** — 15px link, `text-cyan-700`, `overflow-wrap: anywhere`, `mt-2`.
   `mailto:`. Omit when absent.
8. **"Read bio"** — `btn btn-ghost pl-0 mt-2.5`. **Only when a bio exists.**

### Bio dialog

Keep Radix `@radix-ui/react-dialog` — it already gives Escape-to-close, focus
containment, and body-scroll lock, all three of which the handoff asks for and the
prototype lacks. Do not hand-roll a dialog.

Match these values:

- Overlay: `fixed inset-0 z-[200] bg-[rgba(32,30,29,0.55)]`. Radix closes on
  overlay click by default.
- Panel: `bg-paper max-w-[760px] w-full max-h-[82vh] overflow-auto shadow-lg`,
  padding `44px 48px 48px` — `pt-11 px-12 pb-12` at `sm:` and up, tighter below.
- Close button: `btn btn-icon absolute top-4 right-4`, glyph `×`,
  `aria-label="Close"`.
- Title: `<Dialog.Title>` at 32px, `max-w-[32ch]`, `mb-5`.
- Body: render `member.bio.map(...)` over the blocks. A `p` block becomes
  `<p class="bio">`; a `ul` block becomes `<ul class="bio">` with `pl-5` and
  `list-disc`, one `<li>` per item. Every block after the first carries `mt-5`
  (the handoff's "`margin-top: 20px` between them"). Do not join blocks into one
  string and do not drop the list.

`<Dialog.Description>` renders a single `<p>`, so multi-paragraph bios cannot go
inside it. Put the paragraphs in a plain `<div>` and either point
`aria-describedby` at that div or drop `Dialog.Description` and give
`Dialog.Content` an `aria-describedby={undefined}` — Radix warns when a described-by
target is missing, and a nested `<p>` inside a `<p>` is invalid HTML that React
will not render as intended.

`z-[200]` matters: the nav is `z-30` and Radix portals to `body`, so the overlay
must sit above it.

---

## T5 — `app/board/page.tsx`

```
.pg  pt-12  pb-[88px]
  kicker  "Leadership"                     .kick
  h1      "Meet the board"                 64px / -0.02em / 1.05, margin 18px 0 22px
  lede    (copy below)

  section  Officers & Vice Presidents      mt-16   (prototype: margin-top 64px)
    h2    44px, max-w-[24ch]
    grid  3 cols, gap 56px 48px, mt-14

  section  Directors                       mt-[120px]
    kicker "Directors"
    h2    "Directors"                      44px, max-w-[24ch]
    lede  mt-5, max-w-[62ch]
    grid  3 cols, gap 56px 48px, mt-14

  section  id="advisors"                   mt-[120px]  scroll-mt-24
    kicker "Advisory"
    h2    "Board of Advisors"              44px, max-w-[24ch]
    lede  mt-5, max-w-[62ch]
    grid  3 cols, gap 56px 48px, mt-14
```

Copy, verbatim:

- Page lede: "Volunteers run this chapter: former contracting officers, engineers,
  CPAs and founders. Their contact details are here on purpose — reach out."
  (The current page says "Nine volunteers run this chapter" — drop the number.)
- Directors lede: "Directors lead the chapter's standing programs — training,
  networking, operations and outreach — alongside the officers."
- Advisors lede: "Senior practitioners from industry and government who counsel
  the chapter on strategy, partnerships, and professional development."

The Officers section has no kicker and no lede — matching the prototype. See
`00-overview.md` assumptions.

`scroll-mt-24` is Tailwind for `scroll-margin-top: 96px`, which the handoff
specifies for the `#advisors` anchor.

**Remove** the "Serve on the board" and "Write for Insights" blocks at the foot of
the current page. They are not in the design and the page already ends on the
advisors grid.

Grid responsive: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with
`gap-x-12 gap-y-14` — tablet 2 columns, mobile 1, per the handoff.

Update the page `metadata.description`: it currently says "the nine volunteers".

---

## Tests this must satisfy

See `04-testing.md`. In summary: the three bodies contain exactly 13, 18 and 10
members; the first three officers, first eighteen directors and first two advisors
are in the specified order; every `photo` path resolves to a file that exists;
`linkedin` is either absent or an `https://` URL; a member without a bio renders no
"Read bio" trigger; a member without a LinkedIn URL renders no anchor.
