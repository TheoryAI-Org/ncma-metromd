import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { CtaRow } from "@/components/shared/cta-row";
import { NCMA_CERTIFICATIONS_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Certifications | NCMA MetroMD",
  description:
    "CPCM, CFCM, CCCM and CCMA — NCMA's professional certifications, and the study support the MetroMD chapter runs for candidates.",
};

const certifications = [
  {
    code: "CPCM",
    name: "Certified Professional Contracts Manager",
    body: (
      <>
        A CPCM certification demonstrates that you have met NCMA’s highest standards for
        education, training, and experience, and have demonstrated your knowledge of the
        contract management competencies in the Contract Management Body of Knowledge. It is
        NCMA’s senior and most prestigious certification.
      </>
    ),
  },
  {
    code: "CFCM",
    name: "Certified Federal Contracts Manager",
    body: (
      <>
        A CFCM certification validates your education, training, experience and your
        knowledge of the Federal Acquisition Regulation.
      </>
    ),
  },
  {
    code: "CCCM",
    name: "Certified Commercial Contracts Manager",
    body: (
      <>
        A CCCM certification validates your education, training, experience and your
        knowledge of the Uniform Commercial Code.
      </>
    ),
  },
  {
    code: "CCMA",
    name: "Certified Contract Management Associate",
    body: (
      <>
        The CCMA is an{" "}
        <a href="https://www.ansi.org/" target="_blank" rel="noopener noreferrer">
          ANAB-Accredited
        </a>
        , entry-level certification based on the ANSI-Approved Contract Management Standard™
        and designed to assure new professionals and decision-makers that the right knowledge
        has been achieved to practice contract management.
      </>
    ),
  },
];

export default function CertsPage() {
  return (
    <main className="pg" style={{ paddingTop: 48, paddingBottom: 88 }}>
      <PageHeader kicker="Professional credentials" kickerSize={50} title="Certifications">
        <p className="lede">
          The CCCM, CFCM, CPCM, and CCMA are certifications awarded to candidates who meet
          rigorous standards, including experience, education, training, and knowledge. They
          are professional designations of distinction, and carry the respect of their peers
          in the profession.
        </p>
        <p style={{ marginTop: 16, fontSize: 17 }}>
          <a href={NCMA_CERTIFICATIONS_URL} target="_blank" rel="noopener noreferrer">
            Find out more about NCMA’s certification programs
          </a>
        </p>
      </PageHeader>

      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "48px 64px",
          marginTop: 64,
        }}
      >
        {certifications.map((cert) => (
          <div key={cert.code}>
            <div className="kick" style={{ fontSize: 40, lineHeight: 1.1 }}>
              {cert.code}
            </div>
            <h3 style={{ fontSize: 28, margin: "10px 0 12px" }}>{cert.name}</h3>
            <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: 0 }}>
              {cert.body}
            </p>
          </div>
        ))}
      </div>

      <CtaRow
        title="Studying? You are not on your own"
        body="MetroMD runs study sessions and pairs candidates with certified members. Ask the VP of Training & Education."
        action={
          <Link className="btn btn-secondary" href="/contact">
            Ask the chapter
          </Link>
        }
      />
    </main>
  );
}
