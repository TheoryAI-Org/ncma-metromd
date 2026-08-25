import Image from "next/image";

/**
 * A portrait frame. Renders the member's photo when one has been supplied and
 * the design's grey placeholder block when it has not — the roster is filled in
 * as headshots come in, so both states are permanent.
 */
export function Headshot({
  src,
  alt,
  placeholder = "Headshot",
  sizes = "(max-width: 900px) 100vw, 33vw",
}: {
  src: string | null;
  alt: string;
  placeholder?: string;
  sizes?: string;
}) {
  return (
    <div className="frame frame-portrait">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="frame-placeholder" aria-hidden="true">
          {placeholder}
        </div>
      )}
    </div>
  );
}
