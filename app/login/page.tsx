import type { Metadata } from "next";
import { SignInForm } from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Member sign in | NCMA MetroMD",
  description:
    "Sign in to the NCMA MetroMD member area for meeting slides and recordings, study materials, the chapter roster and your event registrations.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

const included = [
  "Slides and recordings from past dinner meetings",
  "CPCM, CFCM, CCCM and CCMA study group materials",
  "Chapter roster and mentor matching",
  "Member rate at every event",
];

export default function LoginPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <div
        className="grid-split"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}
      >
        <div>
          <p className="kick">Members</p>
          <h1 style={{ margin: "16px 0 20px" }}>Sign in</h1>
          <p className="lede" style={{ fontSize: 20, maxWidth: "46ch", margin: "0 0 20px" }}>
            The member area holds the chapter roster, meeting slides and
            recordings, study materials and your event registrations.
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: 22,
              fontSize: 18,
              color: "var(--color-neutral-800)",
              lineHeight: 1.9,
            }}
          >
            {included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <SignInForm />
      </div>
    </main>
  );
}
