"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/app/insights/newsletter-actions";
import {
  emptyNewsletterState,
  newsletterAudiences,
  type NewsletterAudience,
  type NewsletterState,
} from "@/app/insights/newsletter-state";

function SubscribeButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary btn-block" type="submit" disabled={disabled || pending}>
      {pending ? "Signing up…" : "Subscribe"}
    </button>
  );
}

/**
 * Newsletter sign-up. Submitting adds the reader to the chapter's Resend
 * audience.
 *
 * `live` comes from the server: it is false until Resend is configured, and
 * the form then renders disabled behind a "Coming soon" note rather than
 * taking an address the chapter would never receive.
 */
export function NewsletterSignup({ live }: { live: boolean }) {
  const [state, formAction] = useActionState<NewsletterState, FormData>(
    subscribeToNewsletter,
    emptyNewsletterState
  );
  const [audience, setAudience] = useState<NewsletterAudience>(newsletterAudiences[0]);

  return (
    <div>
      <h4 style={{ fontSize: 21 }}>Get it by email</h4>
      <p style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
        One note a month: chapter news, the next dinner meeting, certification deadlines.
      </p>

      {!live && (
        <p style={{ fontSize: 15, color: "var(--color-neutral-700)", margin: "0 0 16px" }}>
          <span className="tag tag-accent-2">Coming soon</span>
          &nbsp;&nbsp;Sign-up opens once the chapter&rsquo;s mailing list is switched on.
        </p>
      )}

      {state.ok ? (
        <p className="tag tag-accent" style={{ padding: "8px 12px" }}>
          Thanks — you are on the list.
        </p>
      ) : (
        <form action={formAction}>
          <fieldset disabled={!live} style={{ border: 0, margin: 0, padding: 0 }}>
            {/* A hidden field no person fills in; a bot filling it is the tell. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px" }}
            />

            <div className="field" style={{ marginBottom: 12 }}>
              <label htmlFor="newsletter-name">Name</label>
              <input
                className="input"
                id="newsletter-name"
                name="name"
                type="text"
                placeholder="Your name"
                defaultValue={state.values.name}
                aria-describedby={state.errors.name ? "newsletter-name-err" : undefined}
                required
              />
              {state.errors.name && (
                <div className="field-error" id="newsletter-name-err">
                  {state.errors.name}
                </div>
              )}
            </div>

            <div className="field" style={{ marginBottom: 12 }}>
              <label htmlFor="newsletter-email">Email</label>
              <input
                className="input"
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="you@agency.gov"
                defaultValue={state.values.email}
                aria-describedby={state.errors.email ? "newsletter-email-err" : undefined}
                required
              />
              {state.errors.email && (
                <div className="field-error" id="newsletter-email-err">
                  {state.errors.email}
                </div>
              )}
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label>I am</label>
              <div className="seg">
                {newsletterAudiences.map((who) => (
                  <label key={who} className="seg-opt">
                    <input
                      type="radio"
                      name="who"
                      value={who}
                      checked={audience === who}
                      onChange={() => setAudience(who)}
                    />
                    {who}
                  </label>
                ))}
              </div>
              {state.errors.audience && (
                <div className="field-error">{state.errors.audience}</div>
              )}
            </div>

            <SubscribeButton disabled={!live} />
          </fieldset>

          {state.errors.form && (
            <div className="field-error" style={{ marginTop: 10 }}>
              {state.errors.form}
            </div>
          )}
          <div style={{ fontSize: 13, color: "var(--color-neutral-600)", marginTop: 10 }}>
            Chapter news only. Unsubscribe any time.
          </div>
        </form>
      )}
    </div>
  );
}
