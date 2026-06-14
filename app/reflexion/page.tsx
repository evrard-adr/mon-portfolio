import { getContent } from "@/lib/content";
import Menu from "@/components/Menu";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ReflexionPage() {
  const content = getContent() as any;
  const { reflexion } = content;

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />

      <article className="px-8 md:px-16 lg:px-24 pt-36 pb-32 max-w-3xl mx-auto">

        {/* En-tête */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="text-[10px] uppercase tracking-[0.25em] transition-colors"
              style={{ color: "var(--text-muted)" }}>
              ← Accueil
            </Link>
            <span style={{ color: "var(--border)" }}>·</span>
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
              Note de réflexion
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: "1px solid var(--accent-border)", backgroundColor: "var(--accent-glow)" }}>
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--accent)" }}>
                {reflexion.date}
              </span>
            </div>
            {reflexion.tag && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--text-muted)" }}>
                  {reflexion.tag}
                </span>
              </div>
            )}
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-8"
            style={{ color: "var(--text)" }}>
            {reflexion.titre}
          </h1>

          <p className="text-base md:text-lg font-light leading-relaxed border-l-2 pl-5"
            style={{ color: "var(--text-muted)", borderColor: "var(--accent-border)" }}>
            {reflexion.chapeau}
          </p>

          {/* Séparateur */}
          <div className="flex items-center gap-4 mt-10">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
              Evrard André
            </span>
          </div>
        </div>

        {/* Corps de l'article */}
        <div className="space-y-8">
          {reflexion.contenu.map((bloc: { type: string; text: string }, i: number) => {
            if (bloc.type === "heading") {
              return (
                <h2 key={i} className="font-display font-bold text-xl md:text-2xl pt-6"
                  style={{ color: "var(--text)" }}>
                  {bloc.text}
                </h2>
              );
            }
            if (bloc.type === "quote") {
              return (
                <blockquote key={i} className="relative px-8 py-6 rounded-2xl my-10"
                  style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)" }}>
                  <span className="absolute top-4 left-6 font-display text-5xl leading-none select-none"
                    style={{ color: "var(--accent)", opacity: 0.4 }}>"</span>
                  <p className="font-display font-bold text-lg md:text-xl leading-snug relative z-10"
                    style={{ color: "var(--text)" }}>
                    {bloc.text}
                  </p>
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-base font-light leading-[1.9] text-justify"
                style={{ color: "var(--text-muted)" }}>
                {bloc.text}
              </p>
            );
          })}
        </div>

        {/* Pied d'article */}
        <div className="mt-20 pt-10 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-faint)" }}>
              Écrit par
            </p>
            <p className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>Evrard André</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Étudiant en Droit · Lyon 3
            </p>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all"
            style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>
            Me contacter →
          </Link>
        </div>

      </article>
    </main>
  );
}
