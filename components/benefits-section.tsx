import { Book, Users, CheckCircle } from "lucide-react"

export function BenefitsSection() {
  return (
    <section className="bg-[#1B365D] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-white text-center mb-8">Benefits of Being a Member</h2>
        <p className="text-white/90 text-center mb-16 max-w-4xl mx-auto leading-relaxed">
          NCMA promotes contract management through various means, including education, networking, publications,
          legislative and regulatory alerts, professional certifications, a code of ethics, awards, job postings, salary
          surveys, and a leadership development program.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <div className="bg-white w-24 h-24 mx-auto rounded-lg flex items-center justify-center">
              <Book className="w-12 h-12 text-[#1B365D]" />
            </div>
            <h3 className="text-white text-xl font-bold">Resources</h3>
            <p className="text-white/90">
              Publications, webinars, online courses, seminars and conferences allow you to learn from subject matter
              experts and stay on top of your field!
            </p>
          </div>

          <div className="space-y-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <div className="bg-white w-24 h-24 mx-auto rounded-lg flex items-center justify-center">
              <Users className="w-12 h-12 text-[#1B365D]" />
            </div>
            <h3 className="text-white text-xl font-bold">Networking</h3>
            <p className="text-white/90">
              Network with industry leaders, chapter peers and affiliates to share ideas, collaborate and help each
              other grow.
            </p>
          </div>

          <div className="space-y-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <div className="bg-white w-24 h-24 mx-auto rounded-lg flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-[#1B365D]" />
            </div>
            <h3 className="text-white text-xl font-bold">Credentials</h3>
            <p className="text-white/90">
              Recognized as a national standard in our profession, NCMA certifications can differentiate you from your
              peers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

