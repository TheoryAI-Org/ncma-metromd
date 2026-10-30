import { SITE_URL, socials } from "@/data/site";

/**
 * Organization markup for the chapter. Event markup is deliberately not
 * emitted: data/events.json has no upcoming entries, and marking up past
 * meetings as live events would misrepresent them.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NCMA MetroMD Chapter",
    alternateName: "NCMA Metro Maryland Chapter",
    url: SITE_URL,
    logo: `${SITE_URL}/images/ncma-metromd-logo.png`,
    description:
      "The Metro Maryland chapter of the National Contract Management Association. Chartered 2024.",
    foundingDate: "2024",
    areaServed: "Maryland, United States",
    parentOrganization: {
      "@type": "Organization",
      name: "National Contract Management Association",
      url: "https://www.ncmahq.org",
    },
    sameAs: socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
