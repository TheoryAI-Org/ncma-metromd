"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, NCMA_MEMBERSHIP_URL, type NavItem } from "@/data/site";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** Name of the desktop submenu that is open, or null when none is. */
  const [menu, setMenu] = useState<string | null>(null);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Escape closes the mobile panel and any open submenu; navigating closes
  // them via onClick below.
  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, menu]);

  useEffect(() => () => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
  }, []);

  /**
   * A short close delay keeps the submenu open while the pointer crosses the
   * gap between the trigger and the panel.
   */
  const openMenu = (name: string) => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    setMenu(name);
  };
  const closeMenu = () => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(() => setMenu(null), 120);
  };

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
          {navigation.map((item) =>
            item.children ? (
              <DesktopMenu
                key={item.name}
                item={item}
                current={currentOf(item.href)}
                isOpen={menu === item.name}
                onOpen={() => openMenu(item.name)}
                onClose={closeMenu}
                onNavigate={() => setMenu(null)}
              />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="navlink"
                aria-current={currentOf(item.href)}
              >
                {item.name}
              </Link>
            ),
          )}
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
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  color: "var(--color-text)",
                  textDecoration: "none",
                  fontSize: 19,
                  fontWeight: 500,
                  padding: "14px 0",
                  borderBottom: item.children
                    ? undefined
                    : "1px solid var(--color-neutral-300)",
                }}
              >
                {item.name}
              </Link>
              {/* No disclosure control on mobile: the submenu is three links,
                  so they sit indented under the parent instead. */}
              {item.children?.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    color: "var(--color-neutral-700)",
                    textDecoration: "none",
                    fontSize: 17,
                    padding: "12px 0 12px 20px",
                    borderBottom: "1px solid var(--color-neutral-300)",
                  }}
                >
                  {child.name}
                </Link>
              ))}
            </div>
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

/**
 * A header link that also opens a submenu. The trigger stays a real link to the
 * parent page, and the panel opens on hover or on focus within, so it is
 * reachable by keyboard without a separate toggle button.
 */
function DesktopMenu({
  item,
  current,
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: {
  item: NavItem;
  current: "page" | undefined;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const panelId = `nav-menu-${item.href.replace(/\W+/g, "-")}`;

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        href={item.href}
        className="navlink"
        aria-current={current}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onNavigate}
      >
        {item.name}
        <span aria-hidden="true" style={{ marginLeft: 6, fontSize: 11 }}>
          ▾
        </span>
      </Link>

      {/* The panel stays mounted and is hidden when closed, so the three
          anchors are always in the document and `aria-controls` always
          resolves. */}
      <div
        id={panelId}
        hidden={!isOpen}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          marginTop: 6,
          minWidth: 178,
          /* Drives visibility directly: an inline `display` would otherwise
             override the browser's default rule for the `hidden` attribute. */
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          padding: "4px 0",
          background: "var(--color-surface)",
          border: "2px solid var(--color-divider)",
          borderRadius: 4,
          boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
        }}
      >
        {item.children?.map((child) => (
          <Link
            key={child.name}
            href={child.href}
            onClick={onNavigate}
            className="navmenu-item"
          >
            {child.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
