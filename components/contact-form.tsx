"use client";

import { useState } from "react";
import { contactRoutes } from "@/data/site";

const reasons = ["Membership", "Events", "Certification", "Sponsorship"] as const;
type Reason = (typeof reasons)[number];

/** Which board member each reason routes to, falling back to the president. */
const routeFor: Record<Reason, string> = {
  Membership: "Membership",
  Events: "Programs",
  Certification: "Training",
  Sponsorship: "Sponsorship",
};

export function ContactForm() {
  const [reason, setReason] = useState<Reason>("Membership");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const recipient =
    contactRoutes.find((r) => r.topic === routeFor[reason]) ?? contactRoutes[0];

  // There is no form backend on this site, so submitting opens the sender's mail
  // client addressed to the board member who owns the selected reason.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${reason}] Website enquiry from ${name || "a visitor"}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:${recipient.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field" style={{ marginBottom: 16 }}>
        <label htmlFor="contact-name">Name</label>
        <input
          className="input"
          id="contact-name"
          type="text"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field" style={{ marginBottom: 16 }}>
        <label htmlFor="contact-email">Email</label>
        <input
          className="input"
          id="contact-email"
          type="email"
          placeholder="you@agency.gov"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field" style={{ marginBottom: 16 }}>
        <label>Reason</label>
        <div className="seg">
          {reasons.map((r) => (
            <label key={r} className="seg-opt">
              <input
                type="radio"
                name="reason"
                checked={reason === r}
                onChange={() => setReason(r)}
              />
              {r}
            </label>
          ))}
        </div>
      </div>

      <div className="field" style={{ marginBottom: 16 }}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          className="input"
          id="contact-message"
          placeholder="How can the chapter help?"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Send message
      </button>
      <div style={{ fontSize: 13, color: "var(--color-neutral-600)", marginTop: 10 }}>
        Goes to {recipient.name} ({recipient.topic}) in your mail client.
      </div>
    </form>
  );
}
