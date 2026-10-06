import type { ReactNode } from "react";

/** The kicker / headline / lede stack every interior page in the design opens with. */
export function PageHeader({
  kicker,
  kickerSize,
  title,
  titleSize = 64,
  titleStyle,
  children,
}: {
  kicker: string;
  kickerSize?: number;
  title: string;
  titleSize?: number;
  titleStyle?: React.CSSProperties;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="kick" style={kickerSize ? { fontSize: kickerSize, lineHeight: 1.1 } : undefined}>
        {kicker}
      </div>
      <h1
        style={{
          fontSize: titleSize,
          letterSpacing: "-0.02em",
          margin: "18px 0 22px",
          lineHeight: 1.05,
          ...titleStyle,
        }}
      >
        {title}
      </h1>
      {children}
    </>
  );
}
