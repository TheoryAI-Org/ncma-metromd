import { contactTopics } from "@/data/site";

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
}

export const emptyContactState: ContactState = {
  ok: false,
  errors: {},
  values: { topic: contactTopics[0], name: "", email: "", message: "" },
};
