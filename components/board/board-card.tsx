"use client";

import Image from "next/image";
import { useState } from "react";
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
  sizes = "(max-width: 820px) 100vw, (max-width: 1040px) 50vw, 25vw",
}: {
  member: BoardMember;
  /** Advisors show name and organisation only. */
  showRole?: boolean;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="person-card" onClick={() => setOpen(true)}>
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
