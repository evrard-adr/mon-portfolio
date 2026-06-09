"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)" }} />

      <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)" }}>Erreur inattendue</p>
      <h1 className="font-display font-extrabold text-6xl md:text-8xl mb-4" style={{ color: "var(--text)" }}>Oops.</h1>
      <p className="text-sm font-light text-center max-w-xs mb-10" style={{ color: "var(--text-muted)" }}>
        Une erreur s&apos;est produite. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all"
          style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
        >
          Réessayer
        </button>
        <Link href="/" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)" }}>
          Accueil →
        </Link>
      </div>
    </div>
  );
}
