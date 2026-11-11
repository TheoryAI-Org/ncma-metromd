/**
 * The Member Highlight form's action state. Lives outside actions.ts because a
 * "use server" module may only export async functions.
 */
export interface HighlightState {
  ok: boolean;
  /** Question id (or "path" / "form") to message, shown under its control. */
  errors: Record<string, string>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values: Record<string, string>;
}

export const emptyHighlightState: HighlightState = { ok: false, errors: {}, values: {} };
