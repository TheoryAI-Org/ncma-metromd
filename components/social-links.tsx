/**
 * The chapter's three live social destinations. Facebook and YouTube were
 * placeholders in the redesign and are intentionally omitted until they exist.
 */
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/ncma-metromd/",
  instagram: "https://www.instagram.com/ncmametromd/",
  eventbrite: "https://www.eventbrite.com/o/metromd-chapter-of-ncma-80017286413",
} as const;

interface SocialLinksProps {
  size?: number;
  className?: string;
}

export function SocialLinks({ size = 24, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-flex text-cyan-700 hover:text-cyan"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4z" />
        </svg>
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="inline-flex text-cyan-700 hover:text-cyan"
      >
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
      </a>
      <a
        href={SOCIAL_LINKS.eventbrite}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Eventbrite"
        className="inline-flex text-cyan-700 hover:text-cyan"
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4 4.6 20 3v3.4L7.6 7.7v3.1L19 10v3.3l-11.4.7v3.2L20 16.6V20L4 18.4z" />
        </svg>
      </a>
    </div>
  );
}
