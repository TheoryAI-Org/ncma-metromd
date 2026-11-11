"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitHighlight } from "@/app/highlight/actions";
import { emptyHighlightState, type HighlightState } from "@/app/highlight/highlight-state";
import {
  highlightPathOptions,
  highlightPaths,
  type HighlightPath,
  type HighlightQuestion,
} from "@/data/highlight-form";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg" disabled={disabled || pending}>
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}

function Required() {
  return (
    <span aria-hidden="true" style={{ color: "var(--color-accent-700)" }}>
      {" "}*
    </span>
  );
}

function Question({ q, value, error }: { q: HighlightQuestion; value?: string; error?: string }) {
  const id = `hl-${q.id}`;
  const described = error ? `${id}-err` : undefined;
  const errorEl = error && (
    <div className="field-error" id={`${id}-err`}>
      {error}
    </div>
  );

  if (q.type === "choice") {
    return (
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }} aria-describedby={described}>
        <legend style={{ fontWeight: 600, marginBottom: 8 }}>
          {q.label}
          {q.required && <Required />}
        </legend>
        <div className="seg" role="radiogroup">
          {q.options.map((o) => (
            <label key={o} className="seg-opt">
              <input type="radio" name={`q_${q.id}`} value={o} defaultChecked={value === o} />
              {o}
            </label>
          ))}
        </div>
        {errorEl}
      </fieldset>
    );
  }

  return (
    <div className="field">
      <label htmlFor={id}>
        {q.label}
        {q.required && <Required />}
      </label>
      {q.type === "textarea" ? (
        <textarea
          id={id}
          name={`q_${q.id}`}
          rows={5}
          className="input"
          defaultValue={value}
          aria-required={q.required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
        />
      ) : (
        <input
          id={id}
          name={`q_${q.id}`}
          type={q.type}
          autoComplete={q.autoComplete}
          className="input"
          defaultValue={value}
          aria-required={q.required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
        />
      )}
      {errorEl}
    </div>
  );
}

/**
 * The Member Highlight submission form. The first question picks the Member
 * or Small Business questions (data/highlight-form.ts); answers are emailed
 * to the chapter by the server action. `live` is false until email delivery
 * is configured, and the form then renders disabled with a note.
 */
export function HighlightForm({ live }: { live: boolean }) {
  const [state, formAction] = useActionState<HighlightState, FormData>(
    submitHighlight,
    emptyHighlightState
  );
  const [path, setPath] = useState<HighlightPath | "">(
    (state.values.path as HighlightPath) || ""
  );
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const errors = { ...state.errors, ...clientErrors };
  const questions = path ? highlightPaths[path] : [];

  if (state.ok) {
    return (
      <div
        role="status"
        style={{
          border: "2px solid var(--color-text)",
          borderRadius: 4,
          padding: 32,
          background: "var(--color-accent-100)",
          maxWidth: 720,
        }}
      >
        <h3 style={{ fontSize: 26, margin: "0 0 10px" }}>Thank you for sharing your story</h3>
        <p style={{ fontSize: 18, color: "var(--color-accent-900)", margin: "0 0 18px" }}>
          Your submission is on its way to the NCMA MetroMD team. We&rsquo;ll be in touch if
          you&rsquo;re selected for an upcoming highlight.
        </p>
        <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      className="form-panel"
      action={formAction}
      noValidate
      style={{ maxWidth: 720 }}
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        const next: Record<string, string> = {};
        if (!path) next.path = "Choose Member or Small Business.";
        for (const q of questions) {
          const v = String(data.get(`q_${q.id}`) ?? "").trim();
          if (q.required && !v) next[q.id] = "This question is required.";
          else if (q.type === "email" && v && !EMAIL.test(v)) next[q.id] = "Enter a valid email address.";
        }
        setClientErrors(next);
        if (Object.keys(next).length > 0) e.preventDefault();
      }}
    >
      {!live && (
        <p style={{ fontSize: 15, color: "var(--color-neutral-700)", margin: 0 }}>
          <span className="tag tag-accent-2">Coming soon</span>
          &nbsp;&nbsp;Submissions open once the chapter&rsquo;s email delivery is switched on.
        </p>
      )}

      <fieldset disabled={!live} style={{ border: 0, margin: 0, padding: 0, display: "grid", gap: 22 }}>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }}
        />
        <p style={{ fontSize: 15, color: "var(--color-neutral-700)", margin: 0 }}>
          <span style={{ color: "var(--color-accent-700)" }}>*</span> Indicates required question
        </p>

        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8 }}>
            Are you a member or a business?
            <Required />
          </legend>
          <div className="seg" role="radiogroup">
            {highlightPathOptions.map((o) => (
              <label key={o} className="seg-opt">
                <input
                  type="radio"
                  name="path"
                  value={o}
                  checked={path === o}
                  onChange={() => {
                    setPath(o);
                    setClientErrors({});
                  }}
                />
                {o}
              </label>
            ))}
          </div>
          {errors.path && <div className="field-error">{errors.path}</div>}
        </fieldset>

        {/* Keyed by path so switching answers starts the other list fresh. */}
        <div key={path} style={{ display: "grid", gap: 22 }}>
          {questions.map((q) => (
            <Question key={q.id} q={q} value={state.values[q.id]} error={errors[q.id]} />
          ))}
        </div>

        {path && <SubmitButton disabled={!live} />}
      </fieldset>

      {errors.form && (
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
          {errors.form}
        </div>
      )}
    </form>
  );
}
