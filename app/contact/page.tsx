import type { Metadata } from "next";
import { BOARD } from "@/data/board";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "Contact | NCMA MetroMD Chapter",
  description:
    "Reach the NCMA MetroMD board about membership, programs, training, sponsorship or the newsletter.",
};

/**
 * Which board member fields which kind of enquiry. The address is the design's
 * own contact-section copy — a board card can omit an email (Akinrogunde's
 * does) without breaking this page. The name is looked up by slug so a roster
 * rename still flows through; `?? topic` guards a slug that stops resolving
 * instead of crashing.
 */
const contacts = [
  { topic: "Membership", slug: "hanks", email: "jahanks@mmcgovsolutions.com" },
  { topic: "Programs", slug: "anderson", email: "randerson@deftechno.com" },
  { topic: "Training", slug: "akinrogunde", email: "patricia@triplejoygroup.com" },
  { topic: "Sponsorship", slug: "hopson", email: "sonya@sageservicesgroupllc.com" },
  { topic: "Newsletter", slug: "belaineh", email: "be@theoryai.co" },
];

export default function ContactPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Say hello</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Contact
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <ContactForm />

        <div>
          <h2 className="text-[21px]">Reach the board directly</h2>
          <div className="mt-3 flex flex-col gap-2 text-base">
            {contacts.map(({ topic, slug, email }) => {
              const name = BOARD.find((m) => m.slug === slug)?.name ?? topic;
              return (
                <div key={topic}>
                  {topic} · <a href={`mailto:${email}`}>{name}</a>
                </div>
              );
            })}
          </div>

          <h2 className="mt-9 text-[21px]">Follow the chapter</h2>
          <SocialLinks className="mt-3" />
          <div className="mt-3 text-[13px] text-neutral-600">
            LinkedIn, Instagram and Eventbrite are live.
          </div>
        </div>
      </div>
    </div>
  );
}
