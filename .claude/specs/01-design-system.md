# 01 — Design system: tokens, classes, and prototype drift

## T1 — The one token change that matters

`app/globals.css` currently ports Broadsheet's *default* ground. The design
overrides it at page level (`.claude/design-reference/site-v2.html`, top of file):

```css
:root { --color-bg: #ffffff; --color-surface: #f3f2f2; }
body  { background: #ffffff; }
```

The handoff confirms this is deliberate: `--color-bg` is `#ffffff`, "**Overridden**
from Broadsheet's default `#f3f2f2` at the client's request", and `--color-surface`
is `#f3f2f2` — "Headshot frames, tinted panels, editor preview pane".

**Change exactly two lines** in `app/globals.css`:

```
--color-bg: #f3f2f2;      →  --color-bg: #ffffff;
--color-surface: #eae9e9;  →  --color-surface: #f3f2f2;
```

Then re-derive the shadcn compatibility layer in the same `:root`, because
`--background`, `--card`, and `--popover` are HSL restatements of the old ground
and will now be a shade darker than the page:

```
--background:        0 4% 95%  →  0 0% 100%
--card:              0 4% 95%  →  0 0% 100%
--popover:           0 4% 95%  →  0 0% 100%
--primary-foreground: 0 4% 95% →  0 0% 100%
--destructive-foreground: 0 4% 95% → 0 0% 100%
--secondary:         0 2% 92%  →  0 4% 95%   /* was surface; follows it up */
--muted:             0 2% 92%  →  0 4% 95%
--accent:            0 2% 92%  →  0 4% 95%
```

Leave every other token alone. `tailwind.config.ts` needs no change — it reads
these through `var()`.

**Consequence to check:** anything that relied on `bg-paper` reading as light grey
against a white `--color-surface` now reads inverted. Sweep every page for
`bg-surface` and `bg-paper` and confirm each is still the intended one. Known
users: `components/headshot.tsx` (frame — correct, wants `surface`), the bio dialog
panel (`bg-paper` — correct, wants white), `.input` (`--color-bg` — correct, white
field), `.card` (`--color-bg` — correct), `/login`'s `.card.elev-sm` panel.

## Token reference

Complete list is in the handoff under "Design tokens" and in
`claude_design/design_handoff_ncma_metromd/design/_ds/broadsheet-*/styles.css`.
The ramps are already correct in `app/globals.css` — do not retune them.

| Role | Token | Tailwind |
| --- | --- | --- |
| Page ground | `--color-bg` `#ffffff` | `bg-paper` |
| Tinted surface | `--color-surface` `#f3f2f2` | `bg-surface` |
| Body copy | `--color-text` `#201e1d` | `text-ink` |
| Cyan accent | `--color-accent` `#0088b0` | `text-cyan` / `bg-cyan` |
| Cyan for text | `--color-accent-700` `#006786` | `text-cyan-700` |
| Magenta accent | `--color-accent-2` `#d6006c` | `text-magenta` |
| Magenta for text | `--color-accent-2-700` `#aa0b56` | `text-magenta-700` |
| Secondary text | `--color-neutral-700` `#605d5d` | `text-neutral-700` |
| Divider | `--color-divider` | `border-divider` |

Two sanctioned values outside the ramps, and only these two:

- **Membership CTA orange** — fill and border **`#b04a15`**, text `#f3f2f2`, hover
  `#a8450f`. Deliberate exception per the handoff. Used only on "Become a Member".

  **The resting fill is darkened from the handoff's `#c8551b`, on purpose.** The
  handoff's pair measures **3.94:1**, under the 4.5:1 AA bar for the `.btn`'s 15px
  regular label — and the fill is the constraint, not the label: even pure white on
  `#c8551b` only reaches 4.40:1. `#b04a15` is the same hue, measures **4.90:1**
  with the specified `#f3f2f2` label, and sits between the handoff's own resting
  and hover oranges, so the button reads as the same colour. Hover `#a8450f` was
  already compliant at 5.33:1 and is unchanged.

  Decided with the repo owner, 2026-08-20, after the T1 review measured it. Flag it
  to the designer: it is a one-value deviation from "colors are final", taken
  because the site's most prominent CTA failing AA is the worse outcome.
- **Dialog backdrop** — `rgba(32,30,29,0.55)`. Already in `components/board-card.tsx`.

Type scale, spacing (120px between sections, 56px/48px grid gaps, 40px gutter
dropping to 24px below 1180px), radius (2px), and shadows are all already
implemented correctly. Use `--shadow-lg` for the bio dialog; write no ad-hoc
`box-shadow`.

## T1b — Focus rings: the rule was never ported

**This section described a rule the codebase does not have.** Grepping
`app/globals.css` for `focus` returns exactly one hit — `.input:focus`. The
Broadsheet sheet's global pair

```css
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
::selection { background: color-mix(in srgb, var(--color-accent) 30%, transparent); }
```

was never carried across when the tokens were ported. So today every `.btn`,
`.navlink`, card email link, LinkedIn icon and "Read bio" trigger falls back to the
browser's default focus ring rather than the design's 2px cyan one. Found during
T4; it is repo-wide and predates this work.

Worse, two components actively **suppress** the outline and substitute something
thinner:

| File | Line | Suppression |
| --- | --- | --- |
| `components/ui/button.tsx` | 8 | `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring` |
| `components/ui/sheet.tsx` | 67 | `focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2` |

`--ring` is already re-pointed at the cyan in the shadcn compatibility layer, so
these are on-palette — but 1px is thinner than the design's 2px, and `sheet.tsx`
keys off `:focus` rather than `:focus-visible`, so it shows the ring on mouse click
too.

**The task:**

1. Add the three global rules above to `app/globals.css` under `@layer base`, using
   the tokens. Put them near the existing `a` rules.
2. Raise `components/ui/button.tsx` from `ring-1` to `ring-2` so it matches the
   system's weight. Leave the `outline-none` — a ring *plus* an outline double-draws;
   the ring is the deliberate substitute here, and it is the same colour and now the
   same width.
3. Change `components/ui/sheet.tsx`'s close button from `focus:` to
   `focus-visible:`, so the ring stops appearing on mouse click.
4. Do **not** add per-element focus styles anywhere. One global rule is the point.

**Verify by keyboard, not by reading.** Tab through `/board` and confirm a visible
2px cyan ring lands on: a nav link, the "Join us" button, a card's LinkedIn icon,
a card's email link, "Read bio", the dialog's close button, and — after the dialog
opens — that focus is contained inside it. Then tab `/contact` for the form
controls and the segmented radio group.

`:focus { outline: none }` before `:focus-visible` is the standard pattern and is
what the design system itself does; it is safe in every browser that supports
`:focus-visible`, which is all current ones. Note that
`app/globals.css` currently defines `.input:focus` (not `:focus-visible`) with
`outline-offset: -1px`; that is intentional for form fields, matching the
prototype's `.input:focus-visible { border-color: var(--color-accent); outline-offset: 0 }`.

## Prototype drift — overrides deliberately NOT ported

Per decision 2 in `00-overview.md`, the following inline styles in
`.claude/design-reference/site-v2.html` contradict the handoff README and are
treated as unmanaged prototype experiments. **Do not port any of them.** Listed
here so the designer can confirm.

| Line | Override in prototype | README says | Action |
| --- | --- | --- | --- |
| 269 | Board kicker `font-size: 40px; font-family: Times New Roman` | Kicker 13px; "No sans-serif anywhere" and Source Serif throughout | 13px `.kick` |
| 270 | Board h1 `font-style: italic; color: #D97C36` | Page h1 44–56px, palette colors only | Upright, `text-ink` |
| 701 | Advisory kicker `font-size: 40px` | Kicker 13px | 13px `.kick` |
| 702 | "Board of Advisors" h2 `color: #E8960D` | Section h2 44px, palette colors only | `text-ink` |
| 825 | Insights kicker `font-size: 40px` | Kicker 13px | 13px `.kick` |
| 826 | Insights h1 `font-style: italic` | Page h1, upright | Upright |
| 935 | Events kicker `font-size: 40px` | Kicker 13px | 13px `.kick` |
| 983 | Certs kicker `font-size: 50px` | Kicker 13px | 13px `.kick` |
| 990–1005 | CPCM/CFCM/CCCM/CCMA kickers `font-size: 40px` | Kicker 13px | 13px `.kick` |
| 1165 | Footer blurb `font-family: Lora; color: #5E6487; font-size: 18px; width: 311px; height: 70px` | Source Serif, palette colors, no fixed pixel boxes | `text-[15px] text-neutral-700` |
| 1164 | Footer logo `height: 134px; width: 658px` | Logo at header scale | 44px tall |
| 1167, 1173 | Footer column kickers `font-size: 20px` | Kicker 13px | 13px `.kick` |

**The handoff's prose contradicts the handoff's own roster data.** Its Content
status section says "COL Dawn Moore is the only Government (Federal) sector label
among the officers; Dr. Oliver Queen among the directors." Parsing all 41 cards
shows Antavia Grimsley also carries Government (Federal) among the officers, and
Dr. Patricia Akinrogunde among the directors — five magenta labels in total, not
two. The card data wins; the prose is stale. Flagged so the designer can confirm
which is right, since it changes how many labels read magenta.

Also noted, not drift but worth the designer's eye:

- **Card name size is a per-section hierarchy, and it is deliberate.** The
  README's type table gives one value ("Card name h4 — 28px"), but the prototype
  sizes the name by which body the card is in, perfectly consistently — 13 of 13
  officers at 30px, 18 of 18 directors at 28px, 10 of 10 advisors at 24px. Nothing
  that uniform is an accident, and it reads as intended emphasis: officers largest,
  advisors smallest. **Port the hierarchy**, not the README's single value. This is
  the one place where the prototype overrides the README, and it does so because
  the consistency proves intent where the drift entries above prove the opposite.
- **Board h1 size.** Prototype uses 64px; the README's table says "Page h1 44–56px".
  The existing implementation already clamps to `lg:text-[64px]` and matches every
  other page h1 on the site, so **keep 64px** for internal consistency and treat
  the README's range as a guide rather than a cap.
- **Officers section has no kicker and no lede** in the prototype, unlike Directors
  and Advisors. Matched as-is; see `00-overview.md` assumptions.

## Card kickers are NOT drift

`class="kick" style="font-size:12px;letter-spacing:0.06em"` inside a board card is
the README's specified card kicker (12px, `0.06em`). Port it as a modifier, not as
the 13px page kicker.
