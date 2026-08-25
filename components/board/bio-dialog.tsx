"use client";

import { useEffect, useRef } from "react";

/**
 * The design's bio overlay: a click-outside / Escape-dismissable panel. Focus is
 * moved into the panel on open and the page behind it is locked from scrolling.
 */
export function BioDialog({
  name,
  bio,
  onClose,
}: {
  name: string;
  bio: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(32,30,29,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${name} biography`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg)",
          maxWidth: 760,
          width: "100%",
          maxHeight: "82vh",
          overflow: "auto",
          padding: "44px 48px 48px",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
        }}
      >
        <button
          type="button"
          className="btn btn-icon"
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, fontSize: 22 }}
        >
          ×
        </button>
        <h3 style={{ fontSize: 32, margin: "0 0 20px", maxWidth: "32ch" }}>{name}</h3>
        <p className="bio" style={{ maxWidth: "none" }}>
          {bio}
        </p>
      </div>
    </div>
  );
}
