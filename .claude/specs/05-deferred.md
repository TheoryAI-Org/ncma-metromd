# 05 — Deferred: the admin panel and Supabase backend

Out of scope for this round by decision (see `00-overview.md`). Recorded so the
next round starts from the assessment rather than redoing it.

## What the handoff asks for

- **`/admin`** — six tabs behind sign-in: Dashboard, Articles, Editor, Board
  roster, Media, Users. Mockups in
  `.claude/design-reference/admin-screens.html`; the section inside the main
  prototype is `site-v2.html` lines 1191–1390. Full written specification in
  `.claude/design-reference/admin-spec.html`.
- **Supabase** — runnable SQL in `.claude/design-reference/supabase-schema.html`:
  three enums (`content_status`, `user_role`, `board_body`), a `profiles` table
  extending `auth.users`, tables for `board_members`, `articles`, `newsletters`,
  `events`, `sponsors`, `site_copy`, a single `revisions` table with a
  before-update trigger per content table, RLS policies, and three public storage
  buckets (`headshots`, `media`, `logos`).
- **`@supabase/ssr`** so sessions work in server components and middleware.
  Service-role key server-side only.
- Public pages read `status = 'published'` rows, enforced by RLS rather than
  application code, with ISR or an on-demand revalidation webhook so a publish
  appears within seconds.

## Why it is deferred

1. **No Supabase project and no keys.** Nothing can be built against it, and a
   schema written without being run against a real project is unverified.
2. **A block editor is the largest single piece of work in the handoff** —
   structured JSONB blocks, a formatting toolbar, paste-from-Word normalisation,
   drag-to-reposition images, autosave, live preview, and restorable revisions. It
   is a project, not a task.
3. **Five open decisions gate the data model**, all listed in the handoff and all
   needing the client:
   - Eventbrite — does the panel replace the feed, supplement it with chapter-only
     listings, or only edit presentation while Eventbrite stays source of record?
     This decides whether `events` is a table or a cache.
   - Newsletter delivery — which platform, and does the panel push or export?
   - Board self-service — should members eventually edit their own bios? Changes
     the role model, so it must be decided before RLS is written, not after.
   - Draft rule — is a member with a bio but no headshot publishable? The handoff
     flags this one itself: "**Confirm this rule with the client before enforcing
     it.**" It matters: applying it today drops the roster from 41 to about 8.
   - Deployment path — confirmed: the redesign replaces the site at the root, not
     at `/redesign/`.
4. **Shipping an unauthenticated `/admin`** to make the screens clickable would put
   a route that looks like a content management interface on a public production
   domain. Not worth it for a demo.

## What this round did that the next round should reuse

`data/board.ts` now holds all 41 members with the exact field set the
`board_members` table needs — `body`, `full_name`, `position`, `organization`,
`sector`, `email`, `linkedin_url`, `bio`, `headshot_path`, `sort_order`. It is the
seed data for the migration, so the roster never has to be re-entered by hand.
That was the handoff's instruction: "Seed the database from the design files rather
than re-entering the roster by hand."

## Also not built, and not part of the admin work

- **Sponsor logos.** Twenty slots render empty because the files were never in the
  handoff — they lived only in the prototype's browser local storage. They need to
  come from the client. `SponsorGrid` takes a `logos` prop so wiring them is a data
  change.
- **Mailing list.** No platform chosen, so the form stays a mockup.
- **Contact form.** Same. `/highlight`'s embedded Google Form is the cheapest
  working precedent if the chapter wants something before a platform decision.
