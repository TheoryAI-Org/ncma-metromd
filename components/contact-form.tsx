/**
 * Contact form. Presentational only — the redesign shipped this inert and
 * there is no mail transport in the project.
 *
 * TODO(forms): wire submission. Options, in order of least new infrastructure:
 *   1. Embed or POST to a Google Form, matching the pattern already used for
 *      the member highlight form on /highlight. No backend, no secrets.
 *   2. Add app/api/contact/route.ts that sends via Resend/SendGrid, with the
 *      key in .env.local next to EVENTBRITE_API_KEY and read server-side only,
 *      as lib/eventbrite.ts does. Route the message to the board address
 *      matching the selected Reason (see data/board.ts).
 * Either way this becomes a client component with useState + useFormStatus.
 * Until then the direct board mailto links beside it are the working path.
 */

const reasons = ["Membership", "Events", "Certification", "Sponsorship"];

export function ContactForm() {
  return (
    <div>
      <div className="field mb-4">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          className="input"
          type="text"
          placeholder="Your name"
        />
      </div>
      <div className="field mb-4">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          className="input"
          type="email"
          placeholder="you@agency.gov"
        />
      </div>
      <div className="field mb-4">
        <label>Reason</label>
        <div className="seg">
          {reasons.map((reason, i) => (
            <label className="seg-opt" key={reason}>
              <input type="radio" name="reason" defaultChecked={i === 0} />
              {reason}
            </label>
          ))}
        </div>
      </div>
      <div className="field mb-4">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          className="input"
          placeholder="How can the chapter help?"
        />
      </div>
      <button type="button" className="btn btn-primary" disabled>
        Send message
      </button>
      <p className="mt-3 text-sm text-neutral-600">
        This form is not connected yet — please use the addresses on the right.
      </p>
    </div>
  );
}
