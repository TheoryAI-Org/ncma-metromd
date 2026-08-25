import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/icons/social";

export function SiteFooter() {
  return (
    <footer>
      <div
        className="pg grid-split"
        style={{
          paddingTop: 56,
          paddingBottom: 56,
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
          borderTop: "1px solid var(--color-divider)",
        }}
      >
        <div>
          <Image
            src="/images/ncma-metromd-logo.png"
            alt="NCMA Metro Maryland"
            width={280}
            height={120}
            style={{ height: "auto", width: "100%", maxWidth: 280, objectFit: "contain" }}
          />
          <p
            style={{
              fontSize: 18,
              color: "var(--color-neutral-700)",
              marginTop: 12,
              maxWidth: "34ch",
            }}
          >
            The Metro Maryland chapter of the National Contract Management Association.
            Chartered 2024.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 16 }}>
          <div className="kick" style={{ fontSize: 20 }}>
            Chapter
          </div>
          <Link className="navlink" href="/about">
            Our chapter
          </Link>
          <Link className="navlink" href="/board">
            Board
          </Link>
          <Link className="navlink" href="/sponsors">
            Sponsors
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 16 }}>
          <div className="kick" style={{ fontSize: 20 }}>
            Members
          </div>
          <Link className="navlink" href="/events">
            Events
          </Link>
          <Link className="navlink" href="/certs">
            Certifications
          </Link>
          <Link className="navlink" href="/highlight">
            Monthly highlight
          </Link>
          <Link className="navlink" href="/login">
            Member sign in
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 16 }}>
          <div className="kick">Follow</div>
          <SocialLinks size={24} gap={14} />
        </div>
      </div>
    </footer>
  );
}
