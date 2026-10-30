// Social marks, inlined from the design so they inherit currentColor.

import { socials } from "@/data/site";

export function LinkedInIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4z" />
    </svg>
  );
}

export function InstagramIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EventbriteIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4.6 20 3v3.4L7.6 7.7v3.1L19 10v3.3l-11.4.7v3.2L20 16.6V20L4 18.4z" />
    </svg>
  );
}

const marks = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Eventbrite: EventbriteIcon,
} as const;

export function SocialLinks({
  size = 26,
  gap = 16,
}: {
  size?: number;
  gap?: number;
}) {
  return (
    <div style={{ display: "flex", gap, alignItems: "center" }}>
      {socials.map(({ name, href }) => {
        const Mark = marks[name];
        return (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            style={{ display: "inline-flex", color: "var(--color-accent-700)" }}
          >
            <Mark size={size} />
          </a>
        );
      })}
    </div>
  );
}
