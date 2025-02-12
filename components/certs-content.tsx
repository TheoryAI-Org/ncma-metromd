import Link from "next/link";

export function CertsContent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            The CCCM, CFCM, CPCM, and CCMA are certifications awarded to candidates who meet rigorous standards, including experience, education, training, and knowledge. They are professional designations of distinction, and carry the respect of their peers in the profession. The NCMA professional certification program is designed to elevate professional standards, enhance individual performance, and distinguish those who demonstrate knowledge essential to the practice of contract management.
          </p>
          
          <p className="mb-8">
            <Link 
              href="https://www.ncmahq.org/certifications"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B365D] hover:text-[#2A4A7F] underline"
            >
              Click here
            </Link>{" "}
            to find out more about NCMA&apos;s certification programs!
          </p>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-[#1B365D] mb-4">
                CERTIFIED PROFESSIONAL CONTRACTS MANAGER (CPCM)
              </h2>
              <p className="text-gray-700">
                A Certified Professional Contracts Manager (CPCM) certification demonstrates that you have met NCMA&apos;s highest standards for education, training, and experience, and have demonstrated your knowledge of the contract management competencies in the Contract Management Body of Knowledge. It is NCMA&apos;s senior and most prestigious certification.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1B365D] mb-4">
                CERTIFIED FEDERAL CONTRACTS MANAGER (CFCM)
              </h2>
              <p className="text-gray-700">
                A Certified Federal Contracts Manager (CFCM) certification validates your education, training, experience and your knowledge of the Federal Acquisition Regulation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1B365D] mb-4">
                CERTIFIED COMMERCIAL CONTRACTS MANAGER (CCCM)
              </h2>
              <p className="text-gray-700">
                A Certified Commercial Contracts Manager (CCCM) certification validates your education, training, experience and your knowledge of the Uniform Commercial Code.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#1B365D] mb-4">
                CERTIFIED CONTRACT MANAGEMENT ASSOCIATE (CCMA)
              </h2>
              <p className="text-gray-700">
                The CCMA is an{" "}
                <Link
                  href="https://www.ansi.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1B365D] hover:text-[#2A4A7F] underline"
                >
                  ANAB-Accredited
                </Link>
                , entry-level certification based on the ANSI-Approved Contract Management Standard™ and designed to assure new professionals and decision-makers that the right knowledge has been achieved to practice contract management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
