import Image from "next/image";

interface HeadshotProps {
  src?: string;
  alt: string;
  /** Tailwind aspect ratio class; the system frames portraits at 4:5. */
  className?: string;
  sizes?: string;
  placeholder?: string;
}

/**
 * A 4:5 portrait frame. Members who have not submitted a headshot get an
 * empty surface-toned frame — the board roster is 30 of 41 photo-less, and a
 * repeated placeholder word reads as noise at that scale. Pass `placeholder`
 * explicitly (e.g. "Photo") for contexts, like /insights, that want one.
 */
export function Headshot({
  src,
  alt,
  className = "aspect-[4/5]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  placeholder,
}: HeadshotProps) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        placeholder && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
            {placeholder}
          </div>
        )
      )}
    </div>
  );
}
