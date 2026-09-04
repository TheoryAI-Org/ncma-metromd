import { contactRoutes } from "@/data/site";

/**
 * The contact form's action state. This lives outside actions.ts because a
 * "use server" module may only export async functions.
 */
export interface ContactState {
  ok: boolean;
  /** Field name to message. Rendered under the control it belongs to. */
  errors: Partial<Record<"topic" | "name" | "email" | "message" | "form", string>>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values: { topic: string; name: string; email: string; message: string };
  /**
   * Set when site-side delivery is not configured: a mailto: URL the browser
   * can hand to the sender's own mail client. Present only in a response to a
   * real submit, so board addresses stay out of the served HTML.
   */
  mailto?: string;
}

export const emptyContactState: ContactState = {
  ok: false,
  errors: {},
  values: { topic: contactRoutes[0].topic, name: "", email: "", message: "" },
};
