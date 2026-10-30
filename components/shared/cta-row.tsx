import type { ReactNode } from "react";

/** The "heading + blurb on the left, one button on the right" band the design closes pages with. */
export function CtaRow({
  title,
  body,
  action,
  titleSize = 28,
}: {
  title: string;
  body: string;
  action: ReactNode;
  titleSize?: number;
}) {
  return (
    <div
      className="stack-md"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 40,
        marginTop: 72,
      }}
    >
      <div>
        <h3 style={{ fontSize: titleSize, marginBottom: 4 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 16, color: "var(--color-neutral-700)" }}>{body}</p>
      </div>
      {action}
    </div>
  );
}
