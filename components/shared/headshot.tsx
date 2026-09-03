import Image from "next/image";
import { AvatarPlaceholder } from "@/components/shared/avatar-placeholder";


export function Headshot({
  src,
  alt,
  placeholder,
  sizes = "(max-width: 900px) 100vw, 33vw",
}: {
  src: string | null;
  alt: string;
  /** When set, shows this grey label instead of the person silhouette. */
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
      ) : placeholder ? (
        <div className="frame-placeholder" aria-hidden="true">
          {placeholder}
        </div>
      ) : (
        <AvatarPlaceholder name={alt} />
      )}
    </div>
  );
}
