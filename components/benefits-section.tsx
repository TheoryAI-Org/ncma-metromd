import { Book, Users, CheckCircle } from "lucide-react"

export function BenefitsSection() {
  return (
    <section className="bg-[#4A4A4A] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-[#8DABC4] text-center mb-8">BENEFITS OF BEING A MEMBER</h2>
        <p className="text-white text-center mb-16 max-w-4xl mx-auto">
          NCMA promotes contract management through various means, including education, networking, publications,
          legislative and regulatory alerts, professional certifications, a code of ethics, awards, job postings, salary
          surveys, and a leadership development program.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="bg-[#8DABC4] w-24 h-24 mx-auto rounded-lg flex items-center justify-center">
              <Book className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-[#8DABC4] text-xl font-bold">RESOURCES</h3>
            <p className="text-white">
              Publications, webinars, online courses, seminars and conferences allow you to learn from subject matter
              experts and stay on top of your field!
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#8DABC4] w-24 h-24 mx-auto rounded-lg flex items-center justify-center">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-[#8DABC4] text-xl font-bold">NETWORKING</h3>
            <p className="text-white">
              Network with industry leaders, chapter peers and affiliates to share ideas, collaborate and help each
              other grow.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#8DABC4] w-24 h-24 mx-auto rounded-lg flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-[#8DABC4] text-xl font-bold">CREDENTIALS</h3>
            <p className="text-white">
              Recognized as a national standard in our profession, NCMA certifications can differentiate you from your
              peers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

