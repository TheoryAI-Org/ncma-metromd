"use client";

import { useState } from "react";
import { Headshot } from "@/components/shared/headshot";
import { BioDialog } from "@/components/board/bio-dialog";
import { LinkedInIcon } from "@/components/icons/social";
import type { BoardMember } from "@/data/board";

const DENSITIES = {
  officer: { nameSize: 30, weight: 700, margin: "10px 0 4px" },
  director: { nameSize: 28, weight: 700, margin: "10px 0 4px" },
  advisor: { nameSize: 24, weight: 600, margin: "6px 0 2px" },
} as const;

/**
 * One roster card. `size` follows the design's three densities: officers get the
 * largest name, directors sit a step down, advisors smaller still.
 */
export function BoardCard({
  member,
  size = "officer",
}: {
  member: BoardMember;
  size?: keyof typeof DENSITIES;
}) {
  const [showBio, setShowBio] = useState(false);

  const density = DENSITIES[size];
  // Federal-government members are marked in the design's second accent.
  const sectorColor = member.sector?.startsWith("Government")
    ? "var(--color-accent-2-700)"
    : "var(--color-neutral-700)";

  return (
    <div>
      <Headshot src={member.image} alt={member.name} />

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          style={{ display: "inline-flex", marginTop: 12, color: "var(--color-accent-700)" }}
        >
          <LinkedInIcon size={22} />
        </a>
      )}

      <h4
        style={{
          fontSize: density.nameSize,
          fontWeight: density.weight,
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          margin: density.margin,
        }}
      >
        {member.name}
      </h4>

      <div className="kick" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
        {member.role}
      </div>

      {member.sector && (
        <div
          className="kick"
          style={{ fontSize: 11, letterSpacing: "0.05em", color: sectorColor, marginTop: 6 }}
        >
          {member.sector}
        </div>
      )}

      {member.org && (
        <div style={{ fontSize: 16, color: "var(--color-neutral-700)", marginTop: 6 }}>
          {member.org}
        </div>
      )}

      {member.email && (
        <div className="bmeta" style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
          <a href={`mailto:${member.email}`} style={{ overflowWrap: "anywhere" }}>
            {member.email}
          </a>
        </div>
      )}

      {member.bio && (
        <button
          type="button"
          className="btn btn-ghost"
          style={{ marginTop: 10, paddingLeft: 0 }}
          onClick={() => setShowBio(true)}
        >
          Read bio
        </button>
      )}

      {showBio && member.bio && (
        <BioDialog name={member.name} bio={member.bio} onClose={() => setShowBio(false)} />
      )}
    </div>
  );
}
