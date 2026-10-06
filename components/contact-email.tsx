import { CHAPTER_EMAIL, contactTopics } from "@/data/site";

/**
 * Shown in place of the contact form while delivery is not configured.
 *
 * Each topic is a mailto with the subject prefilled, which keeps the triage
 * line the form would have put in the message and needs no mail service, no
 * API key and no verified domain. The address is already published on the
 * president's letter and the sponsorship flyer, so linking it here gives
 * nothing away that is not already public.
 */
export function ContactByEmail() {
  return (
    <div
      className="form-panel"
      style={{ display: "grid", gap: 18, alignContent: "start" }}
    >
      <div>
        <h2 style={{ fontSize: 24, margin: "0 0 8px" }}>Email the chapter</h2>
        <p
          style={{
            fontSize: 17,
            color: "var(--color-neutral-800)",
            margin: 0,
            maxWidth: "46ch",
          }}
        >
          Pick the closest subject and your message reaches the board member who
          handles it. Most replies come within a few days.
        </p>
      </div>

      <ul style={{ display: "grid", gap: 10, margin: 0, padding: 0, listStyle: "none" }}>
        {contactTopics.map((topic) => (
          <li key={topic}>
            <a
              className="link-rule"
              href={`mailto:${CHAPTER_EMAIL}?subject=${encodeURIComponent(
                `MetroMD site: ${topic}`
              )}`}
            >
              {topic}
            </a>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: 0 }}>
        Or write to us directly at{" "}
        <a href={`mailto:${CHAPTER_EMAIL}`} style={{ fontWeight: 600 }}>
          {CHAPTER_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
