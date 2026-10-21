import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorSpotlight } from "@/components/cursor-spotlight";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhidin Misbah — Senior Software Engineer",
  description:
    "Senior software engineer in Addis Ababa with four years building production systems: React and Next.js frontends, backend APIs, and Kubernetes and CI/CD infrastructure.",
  icons: [
    {
      media: "(prefers-color-scheme:light)",
      url: "/logo.png",
      href: "/logo.png",
    },
    {
      media: "(prefers-color-scheme:dark)",
      url: "/logo-dark.png",
      href: "/logo-dark.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#121212] text-stone-100 antialiased`}
      >
        <CursorSpotlight />
        <div className="relative z-[3] min-h-screen">{children}</div>
      </body>
    </html>
  );
}
