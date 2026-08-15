import type { Metadata } from "next";
import Link from "next/link";
import { SponsorGrid } from "@/components/sponsor-grid";

export const metadata: Metadata = {
  title: "Sponsors | NCMA MetroMD Chapter",
  description:
    "Sponsorship keeps dinner affordable for government attendees and puts your name in front of the Maryland acquisition community.",
};

const tiers = [
  {
    kicker: "Annual",
    name: "Chapter partner",
    body: "Named on every meeting, logo on the site and newsletter, a table at each dinner, and a speaking slot in the season.",
  },
  {
    kicker: "Per meeting",
    name: "Dinner sponsor",
    body: "Underwrite one dinner meeting: welcome remarks, table signage, and your material at each seat.",
  },
  {
    kicker: "In kind",
    name: "Venue & training",
    body: "Host a session in your space or supply an instructor. Credited the same as a cash sponsor.",
  },
];

export default function SponsorsPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Partners</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Sponsors
      </h1>
      <p className="lede">
        Sponsorship keeps dinner affordable for government attendees and puts your
        name in front of the Maryland acquisition community. Three levels, one
        conversation.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-14">
        {tiers.map((tier) => (
          <div key={tier.name}>
            <div className="kick">{tier.kicker}</div>
            <h2 className="mb-3 mt-2.5 text-[30px]">{tier.name}</h2>
            <p className="text-base text-neutral-700">{tier.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-6 mt-20 text-[28px]">Current sponsors</h2>
      <SponsorGrid count={4} />

      <div className="mt-[72px] flex flex-wrap items-center justify-between gap-10">
        <div>
          <h3 className="mb-1 text-[23px]">Talk to us about sponsoring</h3>
          <div className="max-w-[60ch] text-base text-neutral-700">
            The VP of Operations handles sponsorship and can send the current
            packet.
          </div>
        </div>
        <Link className="btn btn-primary" href="/contact">
          Request the packet
        </Link>
      </div>
    </div>
  );
}
