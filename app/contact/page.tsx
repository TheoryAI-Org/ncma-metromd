import { NavBar } from "@/components/nav-bar";
import { ContactHero } from "@/components/contact-hero";
import { ContactForm } from "@/components/contact-form";
import { JoinSection } from "@/components/join-section";

export default function ContactPage() {
  return (
    <main>
      <NavBar />
      <ContactHero />
      <ContactForm />
      <JoinSection />
    </main>
  );
}
