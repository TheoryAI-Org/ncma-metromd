import { NCMA_MEMBERSHIP_URL } from "@/data/site";

/**
 * The join band that sits directly above the footer on every page.
 *
 * The field is the accent-700 step rather than the base accent: no tint of
 * #ec3013 clears 4.5:1 against 18px white copy, so the field goes darker
 * instead of the copy going lighter.
 */
export function MembershipBand() {
  return (
    <section
      aria-label="Membership"
      style={{ background: "var(--color-accent-700)", marginTop: 80 }}
    >
      <div
        className="pg stack-md"
        style={{
          paddingTop: 44,
          paddingBottom: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "clamp(26px, 5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.015em",
              color: "#fff",
              margin: "0 0 6px",
            }}
          >
            Join the chapter
          </h2>
          <p style={{ fontSize: 18, color: "#fff", margin: 0, maxWidth: "52ch" }}>
            Register through NCMA headquarters and put MetroMD as your chapter
            preference.
          </p>
        </div>
        <a
          className="btn btn-lg btn-inverse"
          href={NCMA_MEMBERSHIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: "none", padding: "15px 26px" }}
        >
          Become a member
        </a>
      </div>
    </section>
  );
}
