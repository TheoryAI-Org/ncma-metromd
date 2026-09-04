"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, NCMA_MEMBERSHIP_URL } from "@/data/site";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Escape closes the mobile panel; navigating closes it via onClick below.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * The current page drives `aria-current`, and the stylesheet keys the visual
   * state off that attribute rather than a class.
   */
  const currentOf = (href: string) => {
    const path = href.split("#")[0];
    const isOn = path === "/" ? pathname === "/" : pathname.startsWith(path);
    return isOn ? ("page" as const) : undefined;
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "var(--color-surface)",
        borderBottom: "2px solid var(--color-divider)",
      }}
    >
      <div
        className="pg"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 36,
          paddingTop: 14,
          paddingBottom: 14,
        }}
      >
        <Link
          href="/"
          aria-label="NCMA Metro Maryland, home"
          style={{ flex: "none", display: "flex", alignItems: "center" }}
          onClick={() => setOpen(false)}
        >
          {/* The logo PNG has an opaque white background, so it sits on a white
              chip. Drop the chip once a transparent PNG or SVG is supplied. */}
          <Image
            src="/images/ncma-metromd-logo.png"
            alt="NCMA Metro Maryland"
            width={120}
            height={53}
            priority
            style={{
              height: 50,
              width: "auto",
              background: "#fff",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden nav:flex"
          style={{ gap: 26, alignItems: "center", marginRight: "auto" }}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="navlink"
              aria-current={currentOf(item.href)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div
          className="hidden nav:flex"
          style={{ gap: 16, alignItems: "center", flex: "none" }}
        >
          <Link
            href="/login"
            style={{
              color: "var(--color-neutral-700)",
              textDecoration: "none",
              fontSize: 17,
              fontWeight: 500,
            }}
          >
            Sign in
          </Link>
          <a
            className="btn btn-primary"
            href={NCMA_MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a member
          </a>
        </div>

        <button
          type="button"
          className="btn btn-secondary nav:hidden"
          style={{ marginLeft: "auto" }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main, mobile"
          className="pg nav:hidden"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 2,
            paddingTop: 8,
            paddingBottom: 20,
            borderBottom: "2px solid var(--color-divider)",
            background: "var(--color-neutral-100)",
          }}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                color: "var(--color-text)",
                textDecoration: "none",
                fontSize: 19,
                fontWeight: 500,
                padding: "14px 0",
                borderBottom: "1px solid var(--color-neutral-300)",
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            style={{
              color: "var(--color-neutral-700)",
              textDecoration: "none",
              fontSize: 19,
              fontWeight: 500,
              padding: "14px 0",
            }}
          >
            Sign in
          </Link>
          <a
            className="btn btn-primary btn-lg"
            href={NCMA_MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ marginTop: 8 }}
          >
            Become a member
          </a>
        </nav>
      )}
    </header>
  );
}
