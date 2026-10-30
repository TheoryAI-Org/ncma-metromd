import Image from "next/image";
import type { Sponsor } from "@/data/sponsors";

/**
 * "Thank you to our sponsors": a logo strip that scrolls on its own. The list
 * is drawn twice so the loop is seamless; the copy is hidden from screen
 * readers. Hovering or focusing a logo pauses it, and visitors who ask for
 * reduced motion get a still, wrapped row instead.
 */
export function SponsorMarquee({
  sponsors,
  /** Set when the page already supplies the .pg container (e.g. /sponsors). */
  inPage = false,
}: {
  sponsors: Sponsor[];
  inPage?: boolean;
}) {
  if (sponsors.length === 0) return null;
  // Slower for longer lists so each logo stays on screen about as long.
  const duration = `${Math.max(20, sponsors.length * 5)}s`;

  const logos = (copy: boolean) =>
    sponsors.map((s) => {
      const img = (
        <Image
          src={s.logo}
          alt={copy ? "" : s.name}
          width={320}
          height={128}
          unoptimized={s.logo.endsWith(".svg")}
          className="marquee-logo"
        />
      );
      return (
        <li key={`${copy ? "copy-" : ""}${s.name}`} className="marquee-item" aria-hidden={copy || undefined}>
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined}>
              {img}
            </a>
          ) : (
            img
          )}
        </li>
      );
    });

  return (
    <section className={inPage ? undefined : "pg"} aria-labelledby="sponsor-thanks" style={{ paddingTop: 64 }}>
      <p className="kick">Our sponsors</p>
      <h2 id="sponsor-thanks" style={{ fontSize: "clamp(24px, 4.6vw, 32px)", margin: "12px 0 8px" }}>
        Thank you to our sponsors
      </h2>
      <p style={{ fontSize: 18, color: "var(--color-neutral-800)", maxWidth: "58ch", margin: "0 0 28px" }}>
        Their support keeps chapter programs affordable and open to the whole
        acquisition community.
      </p>
      <div className="marquee">
        <ul className="marquee-track" style={{ animationDuration: duration }}>
          {logos(false)}
          {logos(true)}
        </ul>
      </div>
    </section>
  );
}
