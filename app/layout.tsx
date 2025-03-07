import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NCMA MetroMD Chapter | National Contract Management Association",
  description: "The NCMA MetroMD Chapter serves contract management professionals in the Maryland metropolitan area. Join us for professional development, networking, and certification opportunities.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
