"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BioDialog } from "@/components/board/bio-dialog";
import { initialsOf } from "@/components/board/board-card";
import type { BoardMember } from "@/data/board";

/**
 * An Insights author: the photo and name open the same bio overlay the Board
 * page uses. Under it sits the author's article link, or a coming-soon tag.
 */
export function AuthorCard({
  member,
  byline,
  article,
}: {
  /** The person, with `role` set to their chapter title (shown in the bio overlay). */
  member: BoardMember;
  /** Optional second byline line under the title on the card. */
  byline?: string;
  article?: { href: string; title: string; date: string; draft?: boolean };
}) {
  const [open, setOpen] = useState(false);

  return (
    <article>
      <button
        type="button"
        className="person-card"
        onClick={() => setOpen(true)}
        aria-label={`${member.name}: read bio`}
      >
        {member.image ? (
          <div className="frame frame-portrait">
            <Image
              src={member.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 360px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="frame-placeholder" aria-hidden="true">
            {initialsOf(member.name)}
          </div>
        )}
        <div style={{ fontSize: 22, fontWeight: 600, marginTop: 16 }}>{member.name}</div>
        <div style={{ fontSize: 16, color: "var(--color-neutral-700)", marginTop: 4 }}>
          {member.role}
        </div>
        {byline && (
          <div style={{ fontSize: 15, color: "var(--color-neutral-700)", marginTop: 4 }}>{byline}</div>
        )}
      </button>

      <div style={{ marginTop: 12 }}>
        {article ? (
          <>
            <p style={{ fontSize: 14, color: "var(--color-neutral-700)", margin: "0 0 4px" }}>
              {article.draft && <span className="tag tag-accent-2" style={{ marginRight: 8 }}>Draft</span>}
              {article.date}
            </p>
            <Link className="link-rule" href={article.href} style={{ fontSize: 18 }}>
              {article.title}
            </Link>
          </>
        ) : (
          <span className="tag tag-accent-2">Article coming soon</span>
        )}
      </div>

      {open && <BioDialog member={member} onClose={() => setOpen(false)} />}
    </article>
  );
}
