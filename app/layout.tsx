import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Lexend } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import A11yWidget from "@/components/A11yWidget";
import PageTransition from "@/components/PageTransition";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
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
  title: "Evrard André — Étudiant en Droit & Communication",
  description: "Portfolio d'Evrard André, étudiant en licence de droit à Lyon 3, responsable communication au Parlement des Étudiants.",
  keywords: ["Evrard André", "droit", "Lyon", "Parlement des Étudiants", "communication", "portfolio"],
  authors: [{ name: "Evrard André" }],
  openGraph: {
    title: "Evrard André — Portfolio",
    description: "Étudiant en Droit · Responsable Communication · Parlement des Étudiants",
    url: "https://evrard-andre.vercel.app",
    siteName: "Evrard André",
    images: [{ url: "https://evrard-andre.vercel.app/gallery/profile.jpg", width: 1200, height: 630, alt: "Evrard André" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evrard André — Portfolio",
    description: "Étudiant en Droit · Responsable Communication · Parlement des Étudiants",
    images: ["https://evrard-andre.vercel.app/gallery/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${dmSans.variable} ${lexend.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <Providers>
<PageTransition>
            {children}
          </PageTransition>
          <A11yWidget />
        </Providers>
      </body>
    </html>
  );
}
