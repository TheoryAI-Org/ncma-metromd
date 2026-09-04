import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SITE_URL } from "@/data/site";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { SiteFooter } from "@/components/site-footer";
import { MembershipBand } from "@/components/membership-band";
import { OrganizationJsonLd } from "@/components/organization-json-ld";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  // Lets each page's `alternates.canonical` and OpenGraph `url` be relative.
  metadataBase: new URL(SITE_URL),
  title: "NCMA MetroMD Chapter | National Contract Management Association",
  description: "The NCMA MetroMD Chapter serves contract management professionals in the Maryland metropolitan area. Join us for professional development, networking, and certification opportunities.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords: [
    "NCMA",
    "National Contract Management Association",
    "MetroMD Chapter",
    "Contract Management",
    "Government Contracting",
    "Professional Development",
    "Certification",
    "CPCM",
    "CFCM",
    "CCCM",
    "CCMA",
    "Maryland",
    "Networking Events",
    "Contract Management Training"
  ],
  authors: [{ name: "NCMA MetroMD Chapter" }],
  creator: "NCMA MetroMD Chapter",
  publisher: "National Contract Management Association",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ncmametromd.org",
    siteName: "NCMA MetroMD Chapter",
    title: "NCMA MetroMD Chapter | National Contract Management Association",
    description: "The NCMA MetroMD Chapter serves contract management professionals in the Maryland metropolitan area. Join us for professional development, networking, and certification opportunities.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "NCMA MetroMD Chapter"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCMA MetroMD Chapter",
    description: "The NCMA MetroMD Chapter serves contract management professionals in the Maryland metropolitan area.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        {/* First focusable element on every page. */}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <NavBar />
          {/* Each page supplies its own <main id="main">, the skip-link target. */}
          <div style={{ flex: "1 0 auto" }}>{children}</div>
          <MembershipBand />
          <SiteFooter />
        </div>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
