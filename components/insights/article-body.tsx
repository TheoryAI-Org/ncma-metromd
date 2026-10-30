import type { ReactNode } from "react";
import type { ArticleBlock } from "@/data/insights";

/**
 * Inline markup used in article text: **bold**, *italic* and [text](url).
 * External links open in a new tab.
 */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = m.index;
    if (m[1] !== undefined) out.push(<strong key={key}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={key}>{m[2]}</em>);
    else {
      const external = /^https?:\/\//.test(m[4]);
      out.push(
        <a
          key={key}
          className="link-rule"
          href={m[4]}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {m[3]}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const P: React.CSSProperties = { fontSize: 19, lineHeight: 1.65, margin: "0 0 20px" };
const LIST: React.CSSProperties = { fontSize: 19, lineHeight: 1.6, margin: "0 0 24px", paddingLeft: 28 };

/** Renders an article's blocks: paragraphs, section headings and lists. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i} style={P}>{inline(b)}</p>;
        if ("h2" in b)
          return (
            <h2 key={i} style={{ fontSize: "clamp(22px, 4vw, 28px)", margin: "40px 0 14px" }}>
              {inline(b.h2)}
            </h2>
          );
        const items = "ul" in b ? b.ul : b.ol;
        const ListTag = "ul" in b ? "ul" : "ol";
        return (
          <ListTag key={i} style={{ ...LIST, listStyle: "ul" in b ? "disc" : "decimal" }}>
            {items.map((item, j) => (
              <li key={j} style={{ marginBottom: 8 }}>
                {inline(item)}
              </li>
            ))}
          </ListTag>
        );
      })}
    </>
  );
}
