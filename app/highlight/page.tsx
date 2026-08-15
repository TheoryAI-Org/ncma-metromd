import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member highlight | NCMA MetroMD Chapter",
  description:
    "Share your professional journey and be featured on the NCMA MetroMD social media channels.",
};

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeD5xywj1I6ipFoBkv58rCnCgjUmgCrVxE92YZrw8ajPKJQFg/viewform?embedded=true";

/**
 * Not part of the redesign, but the chapter's only working form, so it is kept
 * and restyled rather than dropped. The embedded Google Form is also the
 * cheapest precedent for wiring the contact and newsletter forms.
 */
export default function HighlightPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Members</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[56px]">
        Monthly highlight
      </h1>
      <p className="lede">
        We love to showcase our members on our social media channels. To be
        featured, fill out the form below by the{" "}
        <strong>15th of each month</strong>.
      </p>
      <p className="mt-4 max-w-[60ch] text-[17px] text-neutral-700">
        Share your professional journey, accomplishments, and how NCMA Metro
        Maryland has contributed to your career growth. We look forward to
        highlighting your story.
      </p>

      <div className="mt-12 overflow-x-auto">
        <iframe
          src={GOOGLE_FORM_URL}
          title="Member highlight submission form"
          width={640}
          height={978}
          className="w-full max-w-[640px] border-0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
