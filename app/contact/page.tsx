import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/icons/social";
import { contactRoutes } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | NCMA MetroMD",
  description:
    "Reach the NCMA MetroMD board about membership, events, certification or sponsorship.",
};

export default function ContactPage() {
  return (
    <main className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader kicker="Say hello" title="Contact" />

      <div
        className="grid-split"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 64,
          marginTop: 40,
        }}
      >
        <ContactForm />

        <div>
          <h4 style={{ fontSize: 21 }}>Reach the board directly</h4>
          <div
            className="bmeta"
            style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 16 }}
          >
            {contactRoutes.map((route) => (
              <div key={route.topic}>
                {route.topic} · <a href={`mailto:${route.email}`}>{route.name}</a>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: 21, marginTop: 36 }}>Follow the chapter</h4>
          <SocialLinks size={24} gap={14} />
          <div style={{ fontSize: 13, color: "var(--color-neutral-600)", marginTop: 12 }}>
            LinkedIn, Instagram and Eventbrite are live.
          </div>
        </div>
      </div>
    </main>
  );
}
