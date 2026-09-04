"use server";

import { contactRoutes } from "@/data/site";
import { emptyContactState, type ContactState } from "./contact-state";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Builds a mailto: URL for a validated submission. Returned only in response to
 * a real submit, so board addresses never appear in the served HTML.
 */
function mailtoFor(values: ContactState["values"]) {
  const route = contactRoutes.find((r) => r.topic === values.topic);
  if (!route) return undefined;
  const body = `From: ${values.name} <${values.email}>\n\n${values.message}`;
  return `mailto:${route.email}?subject=${encodeURIComponent(
    `MetroMD site: ${values.topic}`
  )}&body=${encodeURIComponent(body)}`;
}

/**
 * Handles the contact form.
 *
 * The topic chooses a recipient from `contactRoutes`; those addresses stay on
 * the server and are never rendered into the page. Validation runs here as
 * well as in the browser, because the client checks are only a convenience.
 *
 * Delivery goes through Resend when RESEND_API_KEY and CONTACT_FROM_EMAIL are
 * configured. Until they are, the action reports the missing configuration
 * rather than silently dropping the message, and the form falls back to
 * opening the sender's mail client.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    topic: String(formData.get("topic") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // A hidden field no person fills in; a bot filling it is the tell.
  if (String(formData.get("company") ?? "") !== "") {
    return { ok: true, errors: {}, values: emptyContactState.values };
  }

  const errors: ContactState["errors"] = {};
  const route = contactRoutes.find((r) => r.topic === values.topic);
  if (!route) errors.topic = "Pick a topic.";
  if (!values.name) errors.name = "Tell us your name.";
  if (!values.email) errors.email = "Enter an email address so the board can reply.";
  else if (!EMAIL.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.message) errors.message = "Write a message.";

  if (Object.keys(errors).length > 0 || !route) {
    return { ok: false, errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    // Delivery is not configured yet. Rather than dropping the message, offer
    // to hand it to the sender's own mail client.
    return { ok: false, errors: {}, values, mailto: mailtoFor(values) };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [route.email],
        // Replies go straight back to the visitor, not to the site.
        reply_to: values.email,
        subject: `MetroMD site: ${values.topic}`,
        text: [
          `Topic: ${values.topic}`,
          `From: ${values.name} <${values.email}>`,
          "",
          values.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the contact message:", await response.text());
      return {
        ok: false,
        errors: { form: "The message could not be sent. Try again in a moment." },
        values,
      };
    }
  } catch (error) {
    console.error("Contact message failed to send:", error);
    return {
      ok: false,
      errors: { form: "The message could not be sent. Try again in a moment." },
      values,
    };
  }

  return { ok: true, errors: {}, values: emptyContactState.values };
}
