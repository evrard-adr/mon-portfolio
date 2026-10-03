import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Lexend } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import A11yWidget from "@/components/A11yWidget";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";

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
  metadataBase: new URL("https://evrard-andre.vercel.app"),
  title: "Evrard André",
  description: "Evrard André, étudiant en droit public à Lyon 3 et responsable communication du Parlement des Étudiants. Communication, réseaux sociaux, transports en commun.",
  keywords: ["Evrard André", "droit", "Lyon", "Parlement des Étudiants", "communication", "portfolio"],
  authors: [{ name: "Evrard André" }],
  openGraph: {
    title: "Evrard André — Droit public & communication",
    description: "Droit public · Communication · Transports en commun",
    url: "https://evrard-andre.vercel.app",
    siteName: "Evrard André",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evrard André — Droit public & communication",
    description: "Droit public · Communication · Transports en commun",
  },
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
        </Providers>
      </body>
    </html>
  );
}
