import Image from "next/image";
import Link from "next/link";
import type { BoardMember } from "@/data/board";

/** First letters of the first two name words (for authors without a photo). */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/**
 * The byline at the top of an article. The author's photo and name link to
 * their bio on the Board page (/board#bio-<person id>), which scrolls to their
 * card and opens it.
 */
export function AuthorByline({
  member,
  org,
  date,
  editor,
}: {
  /** The author, with `role` set to their chapter title. */
  member: BoardMember;
  org?: string;
  date: string;
  /** "Name, title" for the "Edited by" line. */
  editor?: string;
}) {
  const muted = { fontSize: 15, color: "var(--color-neutral-700)" } as const;

  return (
    <div style={{ marginBottom: 32 }}>
      <Link
        className="byline-card"
        href={`/board#bio-${member.personId}`}
        aria-label={`${member.name}: read bio on the Board page`}
      >
        <span className="byline-photo">
          {member.image ? (
            <Image src={member.image} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
          ) : (
            <span className="byline-initials" aria-hidden="true">
              {initials(member.name)}
            </span>
          )}
        </span>
        <span style={{ display: "block" }}>
          <span className="byline-name">{member.name}</span>
          <span style={{ ...muted, display: "block" }}>{member.role}</span>
          {org && <span style={{ ...muted, display: "block" }}>{org}</span>}
          <span className="byline-more">View bio →</span>
        </span>
      </Link>
      <div style={{ ...muted, marginTop: 10 }}>{date}</div>
      {editor && <div style={{ ...muted, fontStyle: "italic", marginTop: 4 }}>Edited by {editor}</div>}
    </div>
  );
}
