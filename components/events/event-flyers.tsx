import Image from "next/image";
import type { EventFlyer } from "@/data/flyers";

/** The flyers grid on /events: each flyer links to its event page, with the full flyer one button away. */
export function EventFlyers({ flyers }: { flyers: EventFlyer[] }) {
  return (
    <div className="grid-2" style={{ gap: 32, marginTop: 24, alignItems: "start" }}>
      {flyers.map((f) => {
        const file = encodeURI(f.file ?? f.image);
        return (
          <article key={f.id}>
            <a href={f.registerUrl} target="_blank" rel="noopener noreferrer" aria-label={`Event page: ${f.title}`}>
              <Image
                src={encodeURI(f.image)}
                alt={f.alt}
                width={f.width}
                height={f.height}
                sizes="(max-width: 900px) 100vw, 560px"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  border: "1px solid var(--color-neutral-200)",
                }}
              />
            </a>
            <h3 style={{ fontSize: 22, margin: "18px 0 6px" }}>{f.title}</h3>
            <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: "0 0 16px" }}>{f.when}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn btn-primary" href={f.registerUrl} target="_blank" rel="noopener noreferrer">
                Register on Eventbrite
              </a>
              <a className="btn btn-secondary" href={file} target="_blank" rel="noopener noreferrer">
                {f.file?.endsWith(".pdf") ? "Download PDF flyer" : "View full flyer"}
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
