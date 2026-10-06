"use server";

import {
  emptyNewsletterState,
  newsletterAudiences,
  type NewsletterState,
} from "./newsletter-state";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Which Resend audience a sign-up joins.
 *
 * Resend contacts carry no custom fields, so the "I am" answer cannot ride
 * along on the contact itself. Give each segment its own audience to keep it,
 * or set RESEND_AUDIENCE_ID alone and every sign-up lands in one list.
 */
function audienceId(audience: string): string | undefined {
  const perSegment: Record<string, string | undefined> = {
    Government: process.env.RESEND_AUDIENCE_ID_GOVERNMENT,
    Industry: process.env.RESEND_AUDIENCE_ID_INDUSTRY,
    Student: process.env.RESEND_AUDIENCE_ID_STUDENT,
  };
  return perSegment[audience] ?? process.env.RESEND_AUDIENCE_ID;
}

/**
 * Whether the sign-up can actually reach Resend. The page asks this on the
 * server and renders the form disabled with a "Coming soon" note when it is
 * false, so nobody hands over an address the chapter would never receive.
 */
export async function newsletterIsLive(): Promise<boolean> {
  return Boolean(process.env.RESEND_API_KEY && audienceId(newsletterAudiences[0]));
}

/**
 * Adds a sign-up to the chapter's Resend audience.
 *
 * Validation runs here as well as in the browser, because the client checks
 * are only a convenience. If Resend is not configured the action refuses the
 * submit and says so, rather than silently dropping the address.
 */
export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    audience: String(formData.get("who") ?? "").trim(),
  };

  // A hidden field no person fills in; a bot filling it is the tell.
  if (String(formData.get("company") ?? "") !== "") {
    return { ok: true, errors: {}, values: emptyNewsletterState.values };
  }

  const errors: NewsletterState["errors"] = {};
  if (!values.name) errors.name = "Tell us your name.";
  if (!values.email) errors.email = "Enter an email address.";
  else if (!EMAIL.test(values.email)) errors.email = "Enter a valid email address.";
  if (!newsletterAudiences.some((a) => a === values.audience)) {
    errors.audience = "Pick one.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audience = audienceId(values.audience);
  if (!apiKey || !audience) {
    console.error(
      "Newsletter sign-up is not configured: set RESEND_API_KEY and RESEND_AUDIENCE_ID."
    );
    return {
      ok: false,
      errors: { form: "Sign-up is not switched on yet. Please try again later." },
      values,
    };
  }

  // Resend splits a contact into first and last name; the rest of what was
  // typed goes into the last name so nothing is dropped.
  const [firstName, ...rest] = values.name.split(/\s+/);

  try {
    const response = await fetch(
      `https://api.resend.com/audiences/${audience}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          first_name: firstName,
          last_name: rest.join(" "),
          unsubscribed: false,
        }),
      }
    );

    if (!response.ok) {
      console.error("Resend rejected the newsletter sign-up:", await response.text());
      return {
        ok: false,
        errors: { form: "The sign-up could not be saved. Try again in a moment." },
        values,
      };
    }
  } catch (error) {
    console.error("Newsletter sign-up failed:", error);
    return {
      ok: false,
      errors: { form: "The sign-up could not be saved. Try again in a moment." },
      values,
    };
  }

  return { ok: true, errors: {}, values: emptyNewsletterState.values };
}
