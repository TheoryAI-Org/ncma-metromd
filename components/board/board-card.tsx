"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BioDialog } from "@/components/board/bio-dialog";
import type { BoardMember } from "@/data/board";

/**
 * First letters of the first two name words, after stripping honorifics.
 * 20 of the 42 people have no headshot; the initials tile is the intended
 * treatment for them, not a placeholder waiting to be filled.
 */
export function initialsOf(name: string) {
  return name
    .replace(/^(Dr\.|COL|Mr\.|Ms\.)\s+/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/**
 * One roster card: a button that opens the member's bio. Flex column, not
 * block, so cards with and without a photo align identically.
 */
export function BoardCard({
  member,
  showRole = true,
  anchor = false,
  sizes = "(max-width: 820px) 100vw, (max-width: 1040px) 50vw, 25vw",
}: {
  member: BoardMember;
  /** Advisors show name and organisation only. */
  showRole?: boolean;
  /**
   * Give this card the person's link target, /board#bio-<person id>. Visiting
   * that link scrolls here and opens the bio. Only one seat per person sets it.
   */
  anchor?: boolean;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorId = `bio-${member.personId}`;

  // Open the bio when the page is reached through this person's link
  // (e.g. the byline on an Insights article), including later hash changes.
  useEffect(() => {
    if (!anchor) return;
    const openFromHash = () => {
      if (window.location.hash !== `#${anchorId}`) return;
      buttonRef.current?.scrollIntoView({ block: "center" });
      setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [anchor, anchorId]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="person-card"
        id={anchor ? anchorId : undefined}
        style={{ scrollMarginTop: 96 }}
        onClick={() => setOpen(true)}
      >
        {member.image ? (
          <div className="frame frame-portrait">
            <Image
              src={member.image}
              alt=""
              fill
              sizes={sizes}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="frame-placeholder" aria-hidden="true">
            {initialsOf(member.name)}
          </div>
        )}

        <div style={{ fontSize: 20, fontWeight: 600, marginTop: 14 }}>
          {member.name}
        </div>

        {showRole && member.role && (
          <div
            className="kick-sm"
            style={{ letterSpacing: "0.1em", color: "var(--color-accent-700)", marginTop: 4 }}
          >
            {member.role}
          </div>
        )}

        {/* Omitted entirely rather than reserving empty space. */}
        {member.org && (
          <div
            style={{ fontSize: 15, color: "var(--color-neutral-700)", marginTop: 6 }}
          >
            {member.org}
          </div>
        )}
      </button>

      {open && <BioDialog member={member} onClose={() => setOpen(false)} />}
    </>
  );
}
