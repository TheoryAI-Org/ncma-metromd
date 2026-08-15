import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications | NCMA MetroMD Chapter",
  description:
    "The CCCM, CFCM, CPCM and CCMA are NCMA certifications awarded to candidates who meet rigorous standards of experience, education, training and knowledge.",
};

const certifications = [
  {
    abbr: "CPCM",
    name: "Certified Professional Contracts Manager",
    body: "A CPCM certification demonstrates that you have met NCMA’s highest standards for education, training, and experience, and have demonstrated your knowledge of the contract management competencies in the Contract Management Body of Knowledge. It is NCMA’s senior and most prestigious certification.",
  },
  {
    abbr: "CFCM",
    name: "Certified Federal Contracts Manager",
    body: "A CFCM certification validates your education, training, experience and your knowledge of the Federal Acquisition Regulation.",
  },
  {
    abbr: "CCCM",
    name: "Certified Commercial Contracts Manager",
    body: "A CCCM certification validates your education, training, experience and your knowledge of the Uniform Commercial Code.",
  },
];

export default function CertsPage() {
  return (
    <div className="pg pb-[88px] pt-12">
      <div className="kick">Professional credentials</div>
      <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[64px]">
        Certifications
      </h1>
      <p className="lede">
        The CCCM, CFCM, CPCM, and CCMA are certifications awarded to candidates
        who meet rigorous standards, including experience, education, training,
        and knowledge. They are professional designations of distinction, and
        carry the respect of their peers in the profession.
      </p>
      <p className="mt-4 text-[17px]">
        <a
          href="https://www.ncmahq.org/certifications"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find out more about NCMA’s certification programs
        </a>
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-x-16">
        {certifications.map((cert) => (
          <div key={cert.abbr}>
            <div className="kick">{cert.abbr}</div>
            <h2 className="mb-3 mt-2.5 text-[28px]">{cert.name}</h2>
            <p className="m-0 text-base text-neutral-700">{cert.body}</p>
          </div>
        ))}

        <div>
          <div className="kick">CCMA</div>
          <h2 className="mb-3 mt-2.5 text-[28px]">
            Certified Contract Management Associate
          </h2>
          <p className="m-0 text-base text-neutral-700">
            The CCMA is an{" "}
            <a href="https://www.ansi.org/" target="_blank" rel="noopener noreferrer">
              ANAB-Accredited
            </a>
            , entry-level certification based on the ANSI-Approved Contract
            Management Standard™ and designed to assure new professionals and
            decision-makers that the right knowledge has been achieved to practice
            contract management.
          </p>
        </div>
      </div>

      <div className="mt-[72px] flex flex-wrap items-center justify-between gap-10">
        <div>
          <h3 className="mb-1 text-[28px]">Studying? You are not on your own</h3>
          <p className="m-0 max-w-[60ch] text-base text-neutral-700">
            MetroMD runs study sessions and pairs candidates with certified
            members. Ask the VP of Training &amp; Education.
          </p>
        </div>
        <Link className="btn btn-secondary" href="/contact">
          Ask the chapter
        </Link>
      </div>
    </div>
  );
}
