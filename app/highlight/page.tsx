import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Monthly Highlight | NCMA MetroMD",
  description:
    "Share your story and be featured on the NCMA MetroMD social media platforms. Submissions are due by the 15th of each month.",
  alternates: { canonical: "/highlight" },
  // Unpublished until there is content to show: linked from nowhere and kept
  // out of the sitemap, so it should not be indexed either.
  robots: { index: false, follow: false },
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeD5xywj1I6ipFoBkv58rCnCgjUmgCrVxE92YZrw8ajPKJQFg/viewform";

export default function HighlightPage() {
  return (
    <main id="main" className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader kicker="Members" title="Monthly Highlight">
        <p className="lede">
          Share your story and be featured on our social media platforms. We love to showcase
          our members — fill out the form below by the <strong>15th of each month</strong>.
        </p>
        <p style={{ fontSize: 17, color: "var(--color-neutral-700)", maxWidth: "62ch" }}>
          Tell us about your professional journey, your accomplishments, and how NCMA Metro
          Maryland has contributed to your career growth. We look forward to highlighting
          your story.
        </p>
      </PageHeader>

      <div style={{ marginTop: 48 }}>
        <iframe
          src={`${FORM_URL}?embedded=true`}
          title="Monthly Highlight submission form"
          width={640}
          height={978}
          style={{ border: 0, maxWidth: "100%" }}
        >
          Loading…
        </iframe>
        <p style={{ fontSize: 15, color: "var(--color-neutral-600)", marginTop: 16 }}>
          Form not loading?{" "}
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
            Open it in a new tab
          </a>
          .
        </p>
      </div>
    </main>
  );
}
