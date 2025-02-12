import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[500px] flex items-center justify-center text-center overflow-hidden">
      <Image
        src="/images/ncma-metromd-hero.jpeg"
        alt="Business professionals networking in a modern office space"
        fill
        priority
        className="object-cover"
        quality={90}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">NCMA MetroMD Chapter</h1>
        <a href="https://www.ncmahq.org/membership" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
            Become a Member
          </Button>
        </a>
      </div>
    </div>
  )
}

