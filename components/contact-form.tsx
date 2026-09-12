"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { contactTopics } from "@/data/site";
import { submitContact } from "@/app/contact/actions";
import { emptyContactState, type ContactState } from "@/app/contact/contact-state";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={pending}
      style={{ justifyContent: "flex-start" }}
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <div className="field-error" id={`${id}-err`}>
          {error}
        </div>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    emptyContactState
  );
  // Client-side checks run first as a convenience; the action revalidates.
  const [clientErrors, setClientErrors] = useState<ContactState["errors"]>({});

  const errors = { ...state.errors, ...clientErrors };

  if (state.ok) {
    return (
      <div
        role="status"
        style={{
          border: "2px solid var(--color-text)",
          borderRadius: 4,
          padding: 32,
          background: "var(--color-accent-100)",
        }}
      >
        <h2 style={{ fontSize: 28, margin: "0 0 10px" }}>Message sent</h2>
        <p style={{ fontSize: 18, color: "var(--color-accent-900)", margin: "0 0 18px" }}>
          It is on its way to the board member who handles that topic. Expect a
          reply within a few days.
        </p>
        {/* A fresh mount clears the action state and returns the form. */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      className="form-panel"
      action={formAction}
      noValidate
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        const next: ContactState["errors"] = {};
        const email = String(data.get("email") ?? "").trim();
        if (!String(data.get("name") ?? "").trim()) next.name = "Tell us your name.";
        if (!email) next.email = "Enter an email address so the board can reply.";
        else if (!EMAIL.test(email)) next.email = "Enter a valid email address.";
        if (!String(data.get("message") ?? "").trim()) next.message = "Write a message.";
        setClientErrors(next);
        if (Object.keys(next).length > 0) e.preventDefault();
      }}
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />

      <Field id="c-topic" label="What is this about?" error={errors.topic}>
        <select
          id="c-topic"
          name="topic"
          className="input"
          defaultValue={state.values.topic}
        >
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field id="c-name" label="Your name" error={errors.name}>
        <input
          id="c-name"
          name="name"
          type="text"
          autoComplete="name"
          className="input"
          defaultValue={state.values.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "c-name-err" : undefined}
        />
      </Field>

      <Field id="c-email" label="Email" error={errors.email}>
        <input
          id="c-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@agency.gov"
          className="input"
          defaultValue={state.values.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "c-email-err" : undefined}
        />
      </Field>

      <Field id="c-msg" label="Message" error={errors.message}>
        <textarea
          id="c-msg"
          name="message"
          rows={5}
          className="input"
          defaultValue={state.values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "c-msg-err" : undefined}
        />
      </Field>

      <SubmitButton />

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

      <p style={{ fontSize: 15, color: "var(--color-neutral-700)", margin: 0 }}>
        We use your email only to reply. Nothing is added to a mailing list
        without asking.
      </p>
    </form>
  );
}
