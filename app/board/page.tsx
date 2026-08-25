import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BoardCard } from "@/components/board/board-card";
import { advisors, directors, officers } from "@/data/board";

export const metadata: Metadata = {
  title: "Meet the board | NCMA MetroMD",
  description:
    "The volunteers who run the NCMA MetroMD Chapter — officers, vice presidents, directors and the Board of Advisors, with contact details.",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,minmax(0,1fr))",
  gap: "56px 48px",
  marginTop: 56,
} as const;

export default function BoardPage() {
  return (
    <main className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader
        kicker="Leadership"
        kickerSize={40}
        title="Meet the board"
        titleStyle={{ fontStyle: "italic", color: "#D97C36" }}
      >
        <p className="lede">
          Volunteers run this chapter: former contracting officers, engineers, CPAs and
          founders. Their contact details are here on purpose — reach out.
        </p>
      </PageHeader>

      <h2 style={{ fontSize: 44, margin: "64px 0 0", maxWidth: "24ch" }}>
        Officers &amp; Vice Presidents
      </h2>
      <div className="grid-3" style={gridStyle}>
        {officers.map((member) => (
          <BoardCard key={member.id} member={member} size="officer" />
        ))}
      </div>

      <div style={{ marginTop: 120 }}>
        <div className="kick">Directors</div>
        <h2 style={{ fontSize: 44, margin: "10px 0 0", maxWidth: "24ch" }}>Directors</h2>
        <p className="lede" style={{ marginTop: 20, maxWidth: "62ch" }}>
          Directors lead the chapter’s standing programs — training, networking, operations
          and outreach — alongside the officers.
        </p>
        <div className="grid-3" style={gridStyle}>
          {directors.map((member) => (
            <BoardCard key={member.id} member={member} size="director" />
          ))}
        </div>
      </div>

      <div id="advisors" style={{ marginTop: 120, scrollMarginTop: 96 }}>
        <div className="kick" style={{ fontSize: 40, lineHeight: 1.1 }}>
          Advisory
        </div>
        <h2 style={{ fontSize: 44, margin: "10px 0 0", maxWidth: "24ch", color: "#E8960D" }}>
          Board of Advisors
        </h2>
        <p className="lede" style={{ marginTop: 20, maxWidth: "62ch" }}>
          Senior practitioners from industry and government who counsel the chapter on
          strategy, partnerships, and professional development.
        </p>
        <div className="grid-3" style={gridStyle}>
          {advisors.map((member) => (
            <BoardCard key={member.id} member={member} size="advisor" />
          ))}
        </div>
      </div>
    </main>
  );
}
