import type { Metadata } from "next";
import { BoardCard } from "@/components/board/board-card";
import { advisors, directors, officers, type BoardMember } from "@/data/board";

export const metadata: Metadata = {
  title: "Board | NCMA MetroMD",
  description:
    "The officers, directors and board of advisors who run the NCMA MetroMD Chapter. All volunteers, all reachable.",
  alternates: { canonical: "/board" },
  openGraph: {
    title: "Board | NCMA MetroMD",
    description:
      "The people who run the chapter: officers, directors and the board of advisors.",
    url: "/board",
  },
};

function Section({
  id,
  heading,
  people,
  intro,
  showRole = true,
}: {
  id?: string;
  heading: string;
  people: readonly BoardMember[];
  intro?: string;
  showRole?: boolean;
}) {
  return (
    <>
      <h2
        id={id}
        className="rule-section"
        style={{
          fontSize: 32,
          margin: `56px 0 ${intro ? 8 : 24}px`,
          paddingTop: 24,
          scrollMarginTop: 96,
        }}
      >
        {heading}
      </h2>
      {intro && (
        <p
          style={{
            fontSize: 18,
            color: "var(--color-neutral-800)",
            maxWidth: "60ch",
            margin: "0 0 24px",
          }}
        >
          {intro}
        </p>
      )}
      <div className="grid-4" style={{ gap: "36px 32px" }}>
        {people.map((m) => (
          <BoardCard key={m.id} member={m} showRole={showRole} />
        ))}
      </div>
    </>
  );
}

export default function BoardPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <p className="kick">Board</p>
      <h1 style={{ fontSize: 54, maxWidth: "22ch", margin: "16px 0 20px" }}>
        The people who run the chapter
      </h1>
      <p className="lede" style={{ fontSize: 20, maxWidth: "60ch", margin: 0 }}>
        Officers, directors and advisors, all volunteers. Select anyone to read
        their background.
      </p>

      <Section heading="Officers" people={officers} />
      <Section heading="Directors" people={directors} />
      {/* id="advisors" so the footer anchor lands here. */}
      <Section
        id="advisors"
        heading="Board of Advisors"
        people={advisors}
        intro="Senior practitioners from government and industry who advise the board."
        showRole={false}
      />
    </main>
  );
}
