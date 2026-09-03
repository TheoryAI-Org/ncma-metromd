/**
 * Stand-in portrait for roster members whose headshot has not come in yet.
 * A head-and-shoulders silhouette on a brand tint, with the member's initials
 * so a grid of pending members still reads as distinct people rather than
 * repeated grey blocks. Deterministic: the same name always gets the same tint.
 */

// Alternating brand tints, drawn from the accent ramps in globals.css.
const TINTS = [
  { bg: "var(--color-accent-100)", figure: "var(--color-accent-300)", ink: "var(--color-accent-800)" },
  { bg: "var(--color-neutral-100)", figure: "var(--color-neutral-300)", ink: "var(--color-neutral-700)" },
  { bg: "var(--color-accent-2-100)", figure: "var(--color-accent-2-300)", ink: "var(--color-accent-2-800)" },
] as const;

/** First letters of the first and last name parts, ignoring titles and suffixes. */
function initialsOf(name: string) {
  const skip = /^(dr|mr|mrs|ms|col|maj|lt|capt|sgt|gen|prof)\.?$/i;
  const parts = name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((p) => p && !skip.test(p) && /[a-z]/i.test(p));
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function tintFor(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return TINTS[sum % TINTS.length];
}

export function AvatarPlaceholder({ name }: { name: string }) {
  const tint = tintFor(name);
  const initials = initialsOf(name);

  return (
    <svg
      viewBox="0 0 80 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${name} — headshot coming soon`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <rect width="80" height="100" fill={tint.bg} />
      {/* head and shoulders, clipped by the frame's own overflow */}
      <circle cx="40" cy="36" r="16" fill={tint.figure} />
      <path d="M9 100V79q0-21 31-21t31 21v21z" fill={tint.figure} />
      {initials && (
        <text
          x="40"
          y="36"
          textAnchor="middle"
          dominantBaseline="central"
          fill={tint.bg}
          style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.04em" }}
        >
          {initials}
        </text>
      )}
    </svg>
  );
}
