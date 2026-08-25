"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, NCMA_MEMBERSHIP_URL } from "@/data/site";

/**
 * The link list, shared by the desktop bar and the mobile drawer so a nav
 * change only has to be made once. The drawer passes a larger size and closes
 * itself on navigation.
 */
function NavItems({
  isCurrent,
  fontSize,
  onNavigate,
}: {
  isCurrent: (href: string) => boolean;
  fontSize?: number;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="navlink"
          style={fontSize ? { fontSize } : undefined}
          data-on={isCurrent(item.href)}
          onClick={onNavigate}
        >
          {item.name}
        </Link>
      ))}
      <Link
        href="/login"
        className="navlink"
        style={{ fontSize, color: "var(--color-neutral-600)" }}
        onClick={onNavigate}
      >
        Sign in
      </Link>
      <a
        className="btn btn-primary"
        href={NCMA_MEMBERSHIP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        Join us
      </a>
    </>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // "/board#advisors" and "/board" both live on the board page; compare paths only.
  const isCurrent = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        background: "var(--color-bg)",
        zIndex: 20,
      }}
    >
      <div
        className="pg"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 26,
          paddingTop: 20,
          paddingBottom: 18,
        }}
      >
        <Link
          href="/"
          className="navlink"
          style={{ marginRight: "auto", display: "flex", alignItems: "center", flex: "none" }}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/ncma-metromd-logo.png"
            alt="NCMA Metro Maryland"
            width={105}
            height={46}
            priority
            style={{ height: 46, width: 105, objectFit: "contain" }}
          />
        </Link>

        <nav className="hidden lg:flex" style={{ gap: 22, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <NavItems isCurrent={isCurrent} />
        </nav>

        <button
          type="button"
          className="btn btn-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="pg lg:hidden flex"
          style={{
            paddingBottom: 24,
            borderBottom: "1px solid var(--color-divider)",
            flexDirection: "column",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <NavItems isCurrent={isCurrent} fontSize={18} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
