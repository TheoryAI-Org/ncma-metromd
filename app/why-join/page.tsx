import { NavBar } from "@/components/nav-bar"
import { WhyJoinHero } from "@/components/why-join-hero"
import { BenefitsGrid } from "@/components/benefits-grid"
import { JoinSection } from "@/components/join-section"

export default function WhyJoinPage() {
  return (
    <main>
      <NavBar />
      <WhyJoinHero />
      <BenefitsGrid />
      <JoinSection />
    </main>
  )
}

