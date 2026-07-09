import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScroll } from "@/components/experience/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vida-immobilien.de"),
  title: {
    default: "Vida Immobilien | Cinematic Real Estate München",
    template: "%s | Vida Immobilien",
  },
  description:
    "Eine cinematic Journey durch exklusive Immobilien in München. Kaufberatung, Bewertung und diskrete Vermarktung – erlebt als scroll-gesteuerte 3D-Inszenierung.",
  openGraph: {
    title: "Vida Immobilien | Cinematic Real Estate München",
    description:
      "Scroll-gesteuerte 3D-Journey durch das Vida-Immobilien-Haus – vom Portal bis zum Penthouse.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <div className="grain-layer" aria-hidden />
        <SmoothScroll>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
