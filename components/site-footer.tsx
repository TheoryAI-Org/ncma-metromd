import Link from "next/link";
import Image from "next/image";
import { footerGroups, type FooterLink } from "@/data/site";

const LINK_STYLE = { color: "#dce6f0", textDecoration: "none", fontSize: 17 };

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        className="footer-link"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        style={LINK_STYLE}
      >
        {link.name}
      </a>
    );
  }
  return (
    <Link className="footer-link" href={link.href} style={LINK_STYLE}>
      {link.name}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--navy)" }}>
      {/* The hover colour lives here rather than in globals.css because it only
          applies against the navy field. */}
      <style>{`.footer-link:hover { color: var(--color-accent-300); }`}</style>

      <div
        className="pg grid-4"
        style={{
          paddingTop: 48,
          paddingBottom: 48,
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: 44,
        }}
      >
        <div>
          {/* White chip while the logo PNG is opaque. */}
          <Image
            src="/images/ncma-metromd-logo.png"
            alt="NCMA Metro Maryland"
            width={200}
            height={88}
            style={{
              width: "100%",
              maxWidth: 208,
              height: "auto",
              background: "#fff",
              padding: "10px 14px",
              borderRadius: 4,
            }}
          />
          <p
            style={{
              fontSize: 17,
              color: "#b9cadb",
              margin: "16px 0 0",
              maxWidth: "34ch",
            }}
          >
            The Metro Maryland chapter of the National Contract Management
            Association. Chartered 2024.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div
            key={group.heading}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <h2 className="kick-sm" style={{ color: "#8fa8c1", margin: 0 }}>
              {group.heading}
            </h2>
            {group.links.map((link) => (
              <FooterAnchor key={link.name} link={link} />
            ))}
          </div>
        ))}
      </div>

      <div className="pg" style={{ paddingBottom: 40 }}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.22)",
            paddingTop: 18,
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            fontSize: 15,
            color: "#9fb4c9",
          }}
        >
          <div>
            &copy; 2026 NCMA MetroMD Chapter. An independent chapter of the
            National Contract Management Association.
          </div>
          <a
            className="footer-link"
            href="https://www.ncmahq.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#dce6f0", fontSize: 15 }}
          >
            ncmahq.org
          </a>
        </div>
      </div>
    </footer>
  );
}
