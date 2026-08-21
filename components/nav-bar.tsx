"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ADVISORY_HREF = "/board#advisors";

const navigation = [
  { name: "Our chapter", href: "/our-chapter" },
  { name: "Board", href: "/board" },
  { name: "Advisory", href: ADVISORY_HREF },
  { name: "Insights", href: "/insights" },
  { name: "Events", href: "/events" },
  { name: "Certifications", href: "/certs" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Contact", href: "/contact" },
];

export function NavBar() {
  const pathname = usePathname();
  // Segment-aware: pathname === href covers the exact route, the
  // startsWith(`${href}/`) arm covers nested routes (e.g. an /insights
  // article), and neither arm matches an unrelated sibling like
  // /boardroom-rental.
  const isOn = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  // Advisory lives on /board, not at its own route, so it lights up
  // whenever Board does rather than via the generic href match.
  const isNavItemOn = (href: string) =>
    href === ADVISORY_HREF ? pathname === "/board" : isOn(href);

  // A same-URL <Link> click (already on /board#advisors) doesn't trigger a
  // navigation, so the browser never scrolls. Do it by hand in that one
  // case; every other click is a real navigation and Next.js handles the
  // hash target on its own.
  const scrollToAdvisors = () => {
    if (pathname === "/board") {
      // No explicit `behavior` — an explicit JS behavior overrides CSS
      // unconditionally, which would bypass the reduced-motion-guarded
      // `scroll-behavior: smooth` in app/globals.css. Deferred a frame so
      // it runs after Radix's react-remove-scroll releases the mobile
      // Sheet's `overflow:hidden` lock (SheetClose and this onClick fire
      // in the same click), otherwise the scroll can silently no-op.
      requestAnimationFrame(() => {
        document.getElementById("advisors")?.scrollIntoView();
      });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-paper">
      <div className="pg flex flex-wrap items-center gap-x-6 gap-y-3 pb-[18px] pt-5">
        <Link href="/" className="mr-auto flex flex-none items-center">
          <Image
            src="/images/ncma-metromd-logo.png"
            alt="NCMA Metro Maryland"
            width={105}
            height={46}
            priority
            className="h-[46px] w-[105px] min-w-[105px] flex-none object-contain"
          />
        </Link>

        {/* Desktop navigation — the full set only fits from lg up. */}
        <nav className="hidden flex-wrap items-center justify-end gap-x-[22px] gap-y-2 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navlink"
              data-on={isNavItemOn(item.href)}
              onClick={item.href === ADVISORY_HREF ? scrollToAdvisors : undefined}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="navlink text-neutral-600"
            data-on={isOn("/login")}
          >
            Sign in
          </Link>
          <a
            className="btn btn-primary"
            href="https://www.ncmahq.org/membership"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join us
          </a>
        </nav>

        {/* Mobile navigation — the redesign ships no mobile nav, so the
            existing Sheet menu is kept and restyled. */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            className="btn btn-primary hidden sm:inline-flex"
            href="https://www.ncmahq.org/membership"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join us
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-paper sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="text-left text-xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-5">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="navlink text-lg"
                      data-on={isNavItemOn(item.href)}
                      onClick={item.href === ADVISORY_HREF ? scrollToAdvisors : undefined}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="navlink text-lg text-neutral-600"
                    data-on={isOn("/login")}
                  >
                    Sign in
                  </Link>
                </SheetClose>
                <a
                  className="btn btn-primary mt-2 sm:hidden"
                  href="https://www.ncmahq.org/membership"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join us
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
