/**
 * Sponsor logo wall.
 *
 * The chapter has no sponsor logos on file yet, so this renders the
 * redesign's empty 3:2 frames. Once logos arrive, replace `count` with a
 * SPONSORS array in data/ (same shape as data/board.ts) and map over it.
 */
interface SponsorGridProps {
  count: number;
  className?: string;
}

export function SponsorGrid({ count, className = "" }: SponsorGridProps) {
  return (
    <div
      className={`grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex aspect-[3/2] items-center justify-center bg-surface text-sm text-neutral-500"
        >
          Sponsor logo
        </div>
      ))}
    </div>
  );
}
