import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";

const chapterLinks = [
  { name: "Our chapter", href: "/our-chapter" },
  { name: "Board", href: "/board" },
  { name: "Sponsors", href: "/sponsors" },
];

const memberLinks = [
  { name: "Events", href: "/events" },
  { name: "Certifications", href: "/certs" },
  { name: "Member highlight", href: "/highlight" },
  { name: "Member sign in", href: "/login" },
];

export function SiteFooter() {
  return (
    <footer className="pg grid grid-cols-1 gap-10 border-t border-divider py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
      <div>
        <Image
          src="/images/ncma-metromd-logo.png"
          alt="NCMA Metro Maryland"
          width={100}
          height={44}
          className="h-11 w-[100px] object-contain"
        />
        <p className="mt-3 max-w-[34ch] text-[15px] text-neutral-700">
          The Metro Maryland chapter of the National Contract Management
          Association. Chartered 2024.
        </p>
      </div>

      <div className="flex flex-col gap-2 text-base">
        <div className="kick">Chapter</div>
        {chapterLinks.map((item) => (
          <Link key={item.href} href={item.href} className="navlink text-left text-base">
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-2 text-base">
        <div className="kick">Members</div>
        {memberLinks.map((item) => (
          <Link key={item.href} href={item.href} className="navlink text-left text-base">
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-3 text-base">
        <div className="kick">Follow</div>
        <SocialLinks size={22} />
      </div>
    </footer>
  );
}
