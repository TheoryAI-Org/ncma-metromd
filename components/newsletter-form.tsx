/**
 * Mailing-list capture. Presentational only — the redesign shipped this
 * inert and no list provider is wired up yet.
 *
 * TODO(forms): wire submission. The chapter's existing pattern for form
 * capture is the embedded Google Form on /highlight, which needs no backend.
 * The two options, in order of least new infrastructure:
 *   1. Point the fields at a Google Form (formResponse POST or an embed), the
 *      same as /highlight. No API route, no secrets, no new vendor.
 *   2. Add app/api/subscribe/route.ts calling a list provider (Mailchimp,
 *      Buttondown) with the key in .env.local alongside EVENTBRITE_API_KEY,
 *      following the server-only credential pattern in lib/eventbrite.ts.
 * Either way this becomes a client component with useState + useFormStatus.
 */

interface NewsletterFormProps {
  /** "inline" is the home page's two-up; "stacked" is the Insights sidebar. */
  variant?: "inline" | "stacked";
}

export function NewsletterForm({ variant = "inline" }: NewsletterFormProps) {
  if (variant === "stacked") {
    return (
      <div>
        <h3 className="text-[21px]">Get it by email</h3>
        <p className="mb-4 mt-2 text-base text-neutral-700">
          One note a month: new articles, the next dinner meeting, certification
          deadlines.
        </p>
        <div className="field mb-3">
          <label htmlFor="nl-name">Name</label>
          <input id="nl-name" className="input" type="text" placeholder="Your name" />
        </div>
        <div className="field mb-3">
          <label htmlFor="nl-email">Email</label>
          <input
            id="nl-email"
            className="input"
            type="email"
            placeholder="you@agency.gov"
          />
        </div>
        <div className="field mb-4">
          <label>I am</label>
          <div className="seg">
            <label className="seg-opt">
              <input type="radio" name="who" defaultChecked />
              Government
            </label>
            <label className="seg-opt">
              <input type="radio" name="who" />
              Industry
            </label>
            <label className="seg-opt">
              <input type="radio" name="who" />
              Student
            </label>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-block" disabled>
          Subscribe
        </button>
        <div className="mt-2.5 text-[13px] text-neutral-600">
          Chapter news only. Unsubscribe any time.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="ml-first">First name</label>
        <input id="ml-first" className="input" type="text" placeholder="First name" />
      </div>
      <div className="field">
        <label htmlFor="ml-last">Last name</label>
        <input id="ml-last" className="input" type="text" placeholder="Last name" />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="ml-email">Email address</label>
        <input
          id="ml-email"
          className="input"
          type="email"
          placeholder="you@agency.gov"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="button" className="btn btn-primary" disabled>
          Sign up
        </button>
        <span className="text-sm text-neutral-600">We respect your privacy.</span>
      </div>
    </div>
  );
}
