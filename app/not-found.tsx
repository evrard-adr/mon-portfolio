import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)" }} />

      <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)" }}>Page introuvable</p>
      <h1 className="font-display font-extrabold leading-none mb-4" style={{ fontSize: "clamp(5rem, 20vw, 12rem)", color: "var(--text)" }}>
        404
      </h1>
      <p className="text-sm font-light text-center max-w-xs mb-10" style={{ color: "var(--text-muted)" }}>
        Cette page n&apos;existe pas ou a été déplacée.
      </p>

      <Link
        href="/"
        className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all"
        style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
      >
        Retour à l&apos;accueil →
      </Link>

      <div className="absolute bottom-10 right-12 font-display font-extrabold select-none pointer-events-none" style={{ fontSize: "clamp(4rem, 15vw, 10rem)", color: "var(--text-faint)" }}>
        Evrard.
      </div>
    </div>
  );
}
