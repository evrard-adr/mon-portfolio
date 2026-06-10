import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Lexend } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import A11yWidget from "@/components/A11yWidget";

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
  title: "Evrard André",
  description: "Étudiant en Droit — Université Jean Moulin Lyon 3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${dmSans.variable} ${lexend.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <A11yWidget />
        </Providers>
      </body>
    </html>
  );
}
