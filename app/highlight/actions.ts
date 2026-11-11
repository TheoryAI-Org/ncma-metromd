"use server";

import { highlightPaths, type HighlightPath } from "@/data/highlight-form";
import { CHAPTER_EMAIL } from "@/data/site";
import { emptyHighlightState, type HighlightState } from "./highlight-state";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Also copied on every submission. Kept here, on the server, so the address is
 * never rendered into the page.
 */
const COPY_TO = ["be@theoryai.co"];

/** Whether submissions can be delivered (Resend is configured). */
export async function highlightIsLive(): Promise<boolean> {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Handles the Member Highlight form. Validates against data/highlight-form.ts
 * (again here, since browser checks are only a convenience) and emails the
 * answers to the chapter inbox with a copy to COPY_TO, replying to the
 * submitter. Without RESEND_API_KEY it refuses the submit and says so rather
 * than dropping it.
 */
export async function submitHighlight(
  _prev: HighlightState,
  formData: FormData
): Promise<HighlightState> {
  // A hidden field no person fills in; a bot filling it is the tell.
  if (String(formData.get("company") ?? "") !== "") {
    return { ok: true, errors: {}, values: {} };
  }

  const path = String(formData.get("path") ?? "") as HighlightPath;
  const values: Record<string, string> = { path };
  const errors: Record<string, string> = {};

  const questions = highlightPaths[path];
  if (!questions) {
    return { ok: false, errors: { path: "Choose Member or Small Business." }, values };
  }

  for (const q of questions) {
    const v = String(formData.get(`q_${q.id}`) ?? "").trim().slice(0, 5000);
    values[q.id] = v;
    if (q.required && !v) errors[q.id] = "This question is required.";
    else if (q.type === "email" && v && !EMAIL.test(v)) errors[q.id] = "Enter a valid email address.";
    else if (q.type === "choice" && v && !q.options.includes(v)) errors[q.id] = "Choose one of the options.";
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Member Highlight delivery is not configured: set RESEND_API_KEY.");
    return {
      ok: false,
      errors: { form: "Submissions from the site are not switched on yet. Please try again later." },
      values,
    };
  }

  const replyTo = questions.find((q) => q.type === "email");
  const who =
    values.fullName || values.contactName || values.businessName || values.email || "Unknown";
  const text = [
    `Member Highlight submission (${path})`,
    "",
    ...questions.flatMap((q) => [q.label, values[q.id] || "(no answer)", ""]),
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || CHAPTER_EMAIL,
        to: [CHAPTER_EMAIL],
        cc: COPY_TO,
        ...(replyTo && values[replyTo.id] && { reply_to: values[replyTo.id] }),
        subject: `Member Highlight submission: ${who} (${path})`,
        text,
      }),
    });
    if (!response.ok) {
      console.error("Resend rejected the highlight submission:", await response.text());
      return { ok: false, errors: { form: "Your submission could not be sent. Try again in a moment." }, values };
    }
  } catch (error) {
    console.error("Highlight submission failed to send:", error);
    return { ok: false, errors: { form: "Your submission could not be sent. Try again in a moment." }, values };
  }

  return { ...emptyHighlightState, ok: true };
}
