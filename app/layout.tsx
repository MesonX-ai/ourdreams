import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CgHeader } from "@/components/cg/CgHeader";
import { CgFooter } from "@/components/cg/CgFooter";
import { CgTalkToSalesPanel } from "@/components/cg/CgTalkToSalesPanel";
import { CgScrollProgress } from "@/components/cg/CgScrollProgress";
import { CgCursorAura } from "@/components/cg/CgCursorAura";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  fallback: ["Georgia", "serif"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ourdreams.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Our Dreams Gifting Platform & Marketplace",
    template: "%s · OurDreams",
  },
  description:
    "We automate everything but the smile. OurDreams takes the heavy lifting out of swag and gifting — marketplace, multi-recipient sending, virtual swag closet, and gift automation, all from one vendor of record.",
  openGraph: {
    title: "Our Dreams Gifting Platform & Marketplace",
    description: "We automate everything but the smile. Trusted by 20,000+ companies for gifting.",
    type: "website",
    siteName: "OurDreams",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <CgScrollProgress />
          <CgCursorAura />
          <CgHeader />
          <CgTalkToSalesPanel />
          <main id="main" className="relative">{children}</main>
          <CgFooter />
        </Providers>
      </body>
    </html>
  );
}
