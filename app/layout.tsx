import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: "Muhidin",
    lastName: "Misbah",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

// Lets search engines show a name, role and profiles for the site.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhidin Misbah",
  jobTitle: "Senior Software Engineer",
  url: SITE_URL,
  email: "mailto:misbahmuhidin@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
  worksFor: { "@type": "Organization", name: "Cooperative Bank of Oromia" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Adama Science and Technology University" },
  sameAs: ["https://github.com/MuhidinM", "https://www.linkedin.com/in/muhidinm"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#121212] text-zinc-100 antialiased selection:bg-cobalt-500/40`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CursorSpotlight />
        <div className="relative z-[3] min-h-screen">{children}</div>
      </body>
    </html>
  );
}
