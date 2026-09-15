"use server";

import { contactRoutes } from "@/data/contact-routes";
import { emptyContactState, type ContactState } from "./contact-state";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Handles the contact form.
 *
 * The topic chooses a recipient from `contactRoutes`; those addresses stay on
 * the server and are never rendered into the page. Every topic currently
 * delivers to the chapter inbox, with the owning board member named in the
 * body. Validation runs here as well as in the browser, because the client
 * checks are only a convenience.
 *
 * Delivery goes through Resend when RESEND_API_KEY and CONTACT_FROM_EMAIL are
 * configured. Until they are, the action refuses the submit and says so, rather
 * than silently dropping the message. It never hands the address back to the
 * browser, so board addresses stay on the server either way.
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
    // Delivery is not configured yet. Say so plainly; never disclose the
    // recipient's address to the browser as a way around it.
    console.error("Contact delivery is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.");
    return {
      ok: false,
      errors: {
        form: "Sending from the site is not switched on yet. Please try again later.",
      },
      values,
    };
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
          // Named so a shared inbox knows who the topic belongs to.
          `For: ${route.name}`,
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
