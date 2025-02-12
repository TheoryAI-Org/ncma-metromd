import Image from "next/image";
import { Button } from "@/components/ui/button";

export function JoinSection() {
  return (
    <section className="py-8 md:py-16 px-4 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-6 md:mb-8">
          JOIN US
        </h2>
        <div className="space-y-4 md:space-y-6 mb-8">
          <p className="text-[#4A4A4A] text-sm md:text-base">
            Join the leading association for contract management professionals
            in North America!
          </p>
          <p className="text-[#4A4A4A] text-sm md:text-base">
            Register today from the NCMA Headquarters sign-up form.
          </p>
          <p className="text-[#4A4A4A] italic text-sm md:text-base">
            Remember to put "MetroMD" as your Chapter Preference!
          </p>
        </div>
        <a
          href="https://www.ncmahq.org/membership"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="default"
            size="lg"
            className="bg-[#1B365D] hover:bg-[#2A4A7F] text-white px-6 md:px-8 w-full sm:w-auto"
          >
            JOIN NOW
          </Button>
        </a>
      </div>
    </section>
  );
}
