import type { Metadata } from "next";
import Link from "next/link";
import { BoardCard } from "@/components/board-card";
import { BOARD } from "@/data/board";

export const metadata: Metadata = {
  title: "Board | NCMA MetroMD Chapter",
  description:
    "Meet the nine volunteers who run the NCMA MetroMD Chapter — former contracting officers, engineers, CPAs and founders.",
};

export default function BoardPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Leadership</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Meet the board
      </h1>
      <p className="lede">
        Nine volunteers run this chapter: former contracting officers, engineers,
        CPAs and founders. Their contact details are here on purpose — reach out.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {BOARD.map((member) => (
          <BoardCard key={member.slug} member={member} />
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2">
        <div>
          <h2 className="text-[28px]">Serve on the board</h2>
          <p className="mb-5 mt-2 text-base text-neutral-700">
            Officers are elected annually and committee seats open through the
            year — programs, newsletter, certification study groups, sponsorship.
          </p>
          <Link href="/contact" className="btn btn-secondary">
            Express interest
          </Link>
        </div>
        <div>
          <h2 className="text-[28px]">Write for Insights</h2>
          <p className="mb-5 mt-2 text-base text-neutral-700">
            Board members and members publish short practice pieces. Pitches are
            one paragraph.
          </p>
          <Link href="/insights" className="btn btn-secondary">
            Read Insights
          </Link>
        </div>
      </div>
    </div>
  );
}
