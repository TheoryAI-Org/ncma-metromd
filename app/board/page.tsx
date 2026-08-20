import type { Metadata } from "next";
import { BoardCard } from "@/components/board-card";
import { boardBody, type BoardBody } from "@/data/board";

export const metadata: Metadata = {
  title: "Board | NCMA MetroMD Chapter",
  description:
    "Meet the volunteers who run the NCMA MetroMD Chapter — former contracting officers, engineers, CPAs and founders.",
};

interface Section {
  body: BoardBody;
  id?: string;
  kicker?: string;
  heading: string;
  lede?: string;
}

// Officers has no kicker or lede, matching the prototype — see 02-board-roster.md.
const SECTIONS: Section[] = [
  { body: "officers", heading: "Officers & Vice Presidents" },
  {
    body: "directors",
    kicker: "Directors",
    heading: "Directors",
    lede: "Directors lead the chapter's standing programs — training, networking, operations and outreach — alongside the officers.",
  },
  {
    body: "advisors",
    id: "advisors",
    kicker: "Advisory",
    heading: "Board of Advisors",
    lede: "Senior practitioners from industry and government who counsel the chapter on strategy, partnerships, and professional development.",
  },
];

function BoardSection({ body, id, kicker, heading, lede }: Section) {
  return (
    <div
      id={id}
      className={`${body === "officers" ? "mt-16" : "mt-[120px]"} ${
        id ? "scroll-mt-24" : ""
      }`}
    >
      {kicker && <div className="kick">{kicker}</div>}
      <h2 className={`max-w-[24ch] text-[44px] ${kicker ? "mt-2.5" : ""}`}>{heading}</h2>
      {lede && <p className="lede mt-5 max-w-[62ch]">{lede}</p>}

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {boardBody(body).map((member) => (
          <BoardCard key={member.slug} member={member} />
        ))}
      </div>
    </div>
  );
}

export default function BoardPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Leadership</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Meet the board
      </h1>
      <p className="lede">
        Volunteers run this chapter: former contracting officers, engineers,
        CPAs and founders. Their contact details are here on purpose — reach out.
      </p>

      {SECTIONS.map((section) => (
        <BoardSection key={section.body} {...section} />
      ))}
    </div>
  );
}
