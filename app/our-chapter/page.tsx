import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our chapter | NCMA MetroMD Chapter",
  description:
    "Chartered in 2024, the NCMA MetroMD Chapter is a hub for industry collaboration, professional development and mentorship across the Maryland acquisition community.",
};

const whatWeDo = [
  {
    title: "What we do",
    body: "Monthly dinner meetings with a speaker, virtual training sessions, certification study support and a kick-off each spring. Programming is planned by the board and shaped by what members ask for.",
  },
  {
    title: "Who belongs here",
    body: "Federal contracting officers and specialists, program and project staff, small business owners, and anyone who touches acquisition in Maryland. First-timers are welcome at any dinner — you do not have to be a member to come.",
  },
  {
    title: "How to get involved",
    body: "Come to a meeting, then take a committee seat. Members run study groups, edit the newsletter, host speakers and help with sponsorship. Say the word and the board will find you a place.",
  },
];

const whyJoin = [
  {
    title: "Industry Connections",
    body: "Drive higher performance by attending events and education sessions which bring government and industry together to engage and learn from each other.",
  },
  {
    title: "Certification",
    body: "Professional designations of distinction, NCMA certifications carry the respect of your peers in the profession.",
  },
  {
    title: "Events",
    body: "Monthly meetings, talks and training opportunities.",
  },
  {
    title: "Peer Networking",
    body: "Learn from peers, ask questions, share ideas and discuss challenges.",
  },
  {
    title: "Publications",
    body: "Magazines, professional journals and NCMA books to help you stay ahead of the industry.",
  },
  {
    title: "Training",
    body: "Live or “on demand,” learn from subject matter experts about the “hottest” topics in the industry.",
  },
];

export default function OurChapterPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Our chapter</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Chartered in 2024, and still filling the room
      </h1>
      <p className="lede">
        The NCMA MetroMD Chapter serves contract management professionals in the
        Maryland metropolitan area. We were founded to give the Maryland
        acquisition community its own place to meet — a hub for industry
        collaboration, professional development, and mentorship, empowering
        contracting professionals to connect, grow, and lead across government and
        industry.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-14">
        {whatWeDo.map((item) => (
          <div key={item.title}>
            <h2 className="mb-3 text-[26px]">{item.title}</h2>
            <p className="text-base text-neutral-700">{item.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-7 mt-20 text-4xl tracking-[-0.015em] lg:text-[42px]">
        Why join NCMA
      </h2>
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {whyJoin.map((item) => (
          <div key={item.title}>
            <h3 className="mb-2 text-[21px]">{item.title}</h3>
            <p className="m-0 text-base text-neutral-700">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-[72px] flex flex-wrap items-center justify-between gap-10">
        <div>
          <h3 className="mb-1 text-[28px]">Ready to join?</h3>
          <div className="text-base text-neutral-700">
            Register through NCMA Headquarters and put “MetroMD” as your Chapter
            Preference.
          </div>
        </div>
        <a
          className="btn btn-primary"
          href="https://www.ncmahq.org/membership"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join now
        </a>
      </div>
    </div>
  );
}
