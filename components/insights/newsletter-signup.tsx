"use client";

import { useState } from "react";

const audiences = ["Government", "Industry", "Student"] as const;

/**
 * Newsletter sign-up. There is no list backend wired up yet, so the form
 * acknowledges locally and tells the reader the chapter will follow up — swap
 * `onSubmit` for the provider call once one is chosen.
 */
export function NewsletterSignup() {
  const [audience, setAudience] = useState<(typeof audiences)[number]>("Government");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <h4 style={{ fontSize: 21 }}>Get it by email</h4>
      <p style={{ fontSize: 16, color: "var(--color-neutral-700)" }}>
        One note a month: new articles, the next dinner meeting, certification deadlines.
      </p>

      {submitted ? (
        <p className="tag tag-accent" style={{ padding: "8px 12px" }}>
          Thanks — the chapter will be in touch.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="field" style={{ marginBottom: 12 }}>
            <label htmlFor="newsletter-name">Name</label>
            <input
              className="input"
              id="newsletter-name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label htmlFor="newsletter-email">Email</label>
            <input
              className="input"
              id="newsletter-email"
              type="email"
              placeholder="you@agency.gov"
              required
            />
          </div>
          <div className="field" style={{ marginBottom: 16 }}>
            <label>I am</label>
            <div className="seg">
              {audiences.map((who) => (
                <label key={who} className="seg-opt">
                  <input
                    type="radio"
                    name="who"
                    checked={audience === who}
                    onChange={() => setAudience(who)}
                  />
                  {who}
                </label>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            Subscribe
          </button>
          <div style={{ fontSize: 13, color: "var(--color-neutral-600)", marginTop: 10 }}>
            Chapter news only. Unsubscribe any time.
          </div>
        </form>
      )}
    </div>
  );
}
