"use client";

import { useEffect, useRef } from "react";
import { LinkedInIcon } from "@/components/icons/social";
import type { BoardMember } from "@/data/board";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The bio overlay. Escape and a backdrop click close it; clicks inside the
 * panel do not. Focus moves to the Close button on open, is constrained to the
 * panel while it is open, and returns to the card that opened it on close.
 */
export function BioDialog({
  member,
  onClose,
}: {
  member: BoardMember;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Remember whatever had focus so it can be handed back on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="anim-fade"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(32,30,29,0.6)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 20px",
        overflowY: "auto",
      }}
    >
      <div
        ref={panelRef}
        className="anim-rise elev-lg"
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg)",
          borderRadius: 4,
          maxWidth: 760,
          width: "100%",
          padding: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(24px, 5.5vw, 32px)", fontWeight: 800, margin: 0 }}>
              {member.name}
            </h2>
            {member.role && (
              <div
                className="kick-sm"
                style={{
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  color: "var(--color-accent-700)",
                  marginTop: 6,
                }}
              >
                {member.role}
              </div>
            )}
            {member.org && (
              <div
                style={{
                  fontSize: 18,
                  color: "var(--color-neutral-700)",
                  marginTop: 6,
                }}
              >
                {member.org}
              </div>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            aria-label="Close"
            style={{ flex: "none", fontSize: 16, padding: "10px 14px" }}
          >
            Close
          </button>
        </div>

        {/* Nothing below the header for a member with neither a bio nor a
            LinkedIn profile, so the rule would sit over empty space. */}
        {(member.bio || member.linkedin) && (
          <hr
            style={{
              border: 0,
              borderTop: "2px solid var(--color-divider)",
              margin: "22px 0",
            }}
          />
        )}

        {member.bio && (
          <p className="bio" style={{ margin: 0 }}>
            {member.bio}
          </p>
        )}

        {member.linkedin && (
          /* The mark carries the meaning; the word is there so the target is
             not icon-only. `aria-hidden` on the SVG keeps it out of the name. */
          <a
            className="bio-linkedin"
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: member.bio ? 22 : 0 }}
          >
            <LinkedInIcon size={18} />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
}
