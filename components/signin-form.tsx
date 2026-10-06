"use client";

import { useState } from "react";
import { NCMA_MEMBERSHIP_URL } from "@/data/site";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * The member sign-in shell. It validates and reports that the member area is
 * not open; it deliberately does not call an auth provider.
 *
 * When auth lands, replace the notice with the real sign-in call and add a
 * forgot-password link, a generic failure message that does not reveal whether
 * an account exists, rate limiting, and a redirect target.
 */
export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tried, setTried] = useState(false);

  const emailBad = tried && !EMAIL.test(email);
  const passwordBad = tried && password.length === 0;
  const showNotice = tried && !emailBad && !passwordBad;

  return (
    <form
      className="form-panel"
      style={{ gap: 18 }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTried(true);
      }}
    >
      <div className="field">
        <label htmlFor="s-email">Email</label>
        <input
          id="s-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@agency.gov"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={emailBad ? true : undefined}
          aria-describedby={emailBad ? "s-email-err" : undefined}
        />
        {emailBad && (
          <div className="field-error" id="s-email-err">
            Enter the email address on your NCMA membership.
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="s-pw">Password</label>
        <input
          id="s-pw"
          name="password"
          type="password"
          autoComplete="current-password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={passwordBad ? true : undefined}
          aria-describedby={passwordBad ? "s-pw-err" : undefined}
        />
        {passwordBad && (
          <div className="field-error" id="s-pw-err">
            Enter your password.
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ justifyContent: "flex-start" }}
      >
        Sign in
      </button>

      {showNotice && (
        <div
          role="alert"
          style={{
            border: "1px solid var(--color-accent-300)",
            background: "var(--color-accent-100)",
            borderRadius: 4,
            padding: "14px 16px",
            fontSize: 16,
            color: "var(--color-accent-900)",
          }}
        >
          The member area is not open yet. Watch the newsletter for the launch.
        </div>
      )}

      <div
        style={{
          borderTop: "1px solid var(--color-neutral-300)",
          paddingTop: 18,
          fontSize: 17,
          color: "var(--color-neutral-800)",
        }}
      >
        Not a member yet? Membership goes through NCMA headquarters. Put MetroMD
        as your chapter preference.
      </div>
      <a
        className="btn btn-secondary"
        href={NCMA_MEMBERSHIP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Join NCMA
      </a>
    </form>
  );
}
