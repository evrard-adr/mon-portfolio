import type { Metadata, Viewport } from "next";
import { SITE, NAME, KEYWORDS } from "@/lib/seo";
import { Bricolage_Grotesque, DM_Sans, Lexend } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import A11yWidget from "@/components/A11yWidget";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Evrard André — Communication politique & droit public (Lyon)",
    template: "%s · Evrard André",
  },
  description:
    "Evrard André, étudiant en droit public à Lyon : communication politique, stratégie politique, éléments de langage, réseaux sociaux et transports en commun. Portfolio et CV.",
  keywords: KEYWORDS,
  authors: [{ name: NAME, url: SITE }],
  creator: NAME,
  publisher: NAME,
  category: "politics",
  applicationName: NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "Evrard André — Communication politique & droit public",
    description: "Droit public · Communication politique · Stratégie politique · Transports en commun. Lyon.",
    url: SITE,
    siteName: NAME,
    locale: "fr_FR",
    type: "profile",
    firstName: "Evrard",
    lastName: "André",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evrard André — Communication politique & droit public",
    description: "Droit public · Communication politique · Stratégie politique · Transports en commun. Lyon.",
  },
  formatDetection: { telephone: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1128" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${dmSans.variable} ${lexend.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <Providers>
          <SmoothScroll />
<PageTransition>
            {children}
          </PageTransition>
          <A11yWidget />
          <Analytics />
          <ConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
