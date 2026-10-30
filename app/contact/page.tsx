import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContactByEmail } from "@/components/contact-email";
import { contactIsLive } from "./actions";
import { socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | NCMA MetroMD",
  description:
    "Ask our team. Pick a topic and your message goes to the board member who handles it. Most replies come within a few days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | NCMA MetroMD",
    description: "Ask the NCMA MetroMD board about membership, programs, training or sponsorship.",
    url: "/contact",
  },
};

// Rendered per request so RESEND_API_KEY is read live: setting the key
// brings the form back without a rebuild.
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  // Delivery needs a Resend key. Without one the form would refuse every
  // message, so the page offers plain email links instead.
  const live = await contactIsLive();

  return (
    <main id="main" className="pg" style={{ paddingTop: 56 }}>
      <div
        className="grid-split"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}
      >
        <div>
          <p className="kick">Contact</p>
          <h1 style={{ maxWidth: "18ch", margin: "16px 0 20px" }}>Ask Our Team</h1>
          <p className="lede" style={{ fontSize: 20, maxWidth: "46ch", margin: "0 0 28px" }}>
            Pick a topic and your message goes to the board member who handles
            it. Most replies come within a few days.
          </p>

          {/* Board addresses stay server-side: the topic routes the message. */}
          <div
            className="rule-section"
            style={{ paddingTop: 24, display: "grid", gap: 18 }}
          >
            <div>
              <h2 className="kick-sm" style={{ color: "var(--color-neutral-700)", margin: 0 }}>
                Meetings
              </h2>
              <div style={{ fontSize: 19, marginTop: 4 }}>
                Most months, venue rotates around Metro Maryland
              </div>
            </div>
            <div>
              <h2 className="kick-sm" style={{ color: "var(--color-neutral-700)", margin: 0 }}>
                Follow
              </h2>
              <div style={{ display: "flex", gap: 18, marginTop: 6, fontSize: 18 }}>
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {live ? <ContactForm /> : <ContactByEmail />}
      </div>
    </main>
  );
}
