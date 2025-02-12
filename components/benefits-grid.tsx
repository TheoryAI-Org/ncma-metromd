import { Hexagon, CheckSquare, Calendar, Users, FileText, Laptop } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BenefitsGrid() {
  const benefits = [
    {
      icon: Hexagon,
      title: "Industry Connections",
      description:
        "Drive higher performance by attending events and education sessions which bring government and industry together to engage and learn from each other.",
    },
    {
      icon: CheckSquare,
      title: "Certification",
      description:
        "Professional designations of distinction, NCMA certifications carry the respect of your peers in the profession.",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Monthly meetings, talks and training opportunities.",
    },
    {
      icon: Users,
      title: "Peer Networking",
      description: "Learn from peers, ask questions, share ideas and discuss challenges.",
    },
    {
      icon: FileText,
      title: "Publications",
      description: "Magazines, professional journals and NCMA books to help you stay ahead of the industry.",
    },
    {
      icon: Laptop,
      title: "Training",
      description: 'Live or "on demand," learn from subject matter experts about the "hottest" topics in the industry.',
    },
  ]

  return (
    <section className="py-8 md:py-16 px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1B365D] mb-8 md:mb-12">
        Reasons to Join NCMA
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border-none shadow-lg">
            <CardHeader className="text-center space-y-2 md:space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto text-[#8DABC4]">
                <benefit.icon className="w-full h-full" />
              </div>
              <CardTitle className="text-lg md:text-xl font-bold text-[#1B365D]">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-[#4A4A4A] text-sm md:text-base">
              <p>{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

