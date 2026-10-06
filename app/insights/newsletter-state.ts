/**
 * The newsletter form's action state. This lives outside the actions module
 * because a "use server" module may only export async functions.
 */
export interface NewsletterState {
  ok: boolean;
  /** Field name to message. Rendered under the control it belongs to. */
  errors: Partial<Record<"name" | "email" | "audience" | "form", string>>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values: { name: string; email: string; audience: string };
}

export const newsletterAudiences = ["Government", "Industry", "Student"] as const;

export type NewsletterAudience = (typeof newsletterAudiences)[number];

export const emptyNewsletterState: NewsletterState = {
  ok: false,
  errors: {},
  values: { name: "", email: "", audience: newsletterAudiences[0] },
};
