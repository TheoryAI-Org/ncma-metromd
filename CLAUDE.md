# NCMA MetroMD — Next.js chapter site

Public marketing site for the NCMA Metro Maryland Chapter. Next.js 14 App Router,
Tailwind, TypeScript, deployed on Vercel. Currently being rebuilt on the
**Broadsheet** design system per the handoff in `claude_design/`.

## Commands

```bash
npm run dev            # dev server on :3000
npm run build          # production build — must pass before any commit
npm run lint           # next lint
npx tsc --noEmit       # typecheck
npm test               # vitest (added by the redesign work)
```

## Layout

| Path | Holds |
| --- | --- |
| `app/` | App Router routes; one directory per public page |
| `app/api/events/` | Eventbrite proxy — **do not break**, see below |
| `components/` | Shared React components |
| `components/ui/` | shadcn/ui primitives (Button, Card, Sheet) |
| `data/` | Typed seed content: board roster, insights articles, events fallback |
| `lib/eventbrite.ts` | Eventbrite API client and the `data/events.json` fallback |
| `.claude/specs/` | Redesign specs — read these before changing any page |
| `.claude/design-reference/` | Handoff prototype HTML, fonts stripped, for lookup |
| `claude_design/` | Untouched original handoff bundle |

## Design system

Tokens live in `app/globals.css` `:root` and are surfaced to Tailwind through
`tailwind.config.ts` (`bg-paper`, `text-ink`, `bg-surface`, `text-cyan-700`,
`text-magenta-700`, `text-neutral-700`, …). Component classes that are awkward as
utilities — `.pg`, `.kick`, `.lede`, `.bio`, `.btn*`, `.tag*`, `.input`, `.field`,
`.seg*`, `.table`, `.navlink`, `.card`, `.elev-*` — are defined in
`app/globals.css` under `@layer components`.

Rules that are easy to get wrong:

- **Never add a second styling system.** No CSS modules, no styled-components,
  no inline `style` props for anything the tokens cover.
- **Never hard-code a hex value.** Use a token. The two sanctioned exceptions are
  the membership CTA orange (`#c8551b` / hover `#a8450f`) and the dialog backdrop
  (`rgba(32,30,29,0.55)`), both documented in `.claude/specs/01-design-system.md`.
- **No rules, borders, or boxes between sections** — whitespace only. `.card` is
  for discrete listings, never for layout.
- Source Serif 4 for everything, headings and UI chrome included. No sans-serif.
- Accent-to-ground contrast is tuned to 3:1. Body copy in the accent uses
  `--color-accent-700`, never `--color-accent`.
- Every interactive element needs a hover tint and a `:focus-visible` ring.

## Eventbrite integration — do not regress

`lib/eventbrite.ts` fetches the chapter's org feed and falls back to
`data/events.json` when credentials are absent — which is the normal state today,
since the token has not been issued. `/` and `/events` are `force-dynamic` because
of it.

The env vars are **`EVENTBRITE_API_KEY`** and **`EVENTBRITE_ORGANIZATION_ID`** (see
`.env.local.example`). The org id is `80017286413`.

`fetchEventbriteEvents()` never throws — it catches and returns the fallback. Code
that wraps it in `try/catch` to show an error is therefore unreachable. Any change
here needs a test, and both pages must still render with no credentials set.

`app/api/events/route.ts` duplicates the same fetch-and-map logic with its own
local types. Nothing in `app/` calls it. Leave it alone unless a task says
otherwise; do not "fix" the duplication opportunistically.

## Working agreements

- Small, single-purpose commits. Run `npm run build` and `npm test` first.
- Comments follow the Google style guide and clean-code practice: short, explain
  *why* rather than restating the code, and only where a reader would otherwise
  be surprised. No commit trailers or co-author lines.
- The author of a change does not review it. See `.claude/agents/`.
