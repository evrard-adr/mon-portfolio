import { getContent } from "@/lib/content";
import Menu from "@/components/Menu";
import CVPrintButton from "@/components/CVPrintButton";
import { Suspense } from "react";
import AutoPrint from "@/components/AutoPrint";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CVPage() {
  const content = getContent();
  const { hero, cv, about } = content;

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Suspense><AutoPrint /></Suspense>
      <Menu />

      <div className="px-8 md:px-12 pt-36 pb-32 max-w-5xl mx-auto">
        <div className="mb-20 pb-16" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ border: "1px solid var(--accent-border)", backgroundColor: "var(--accent-glow)" }}>
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--accent)" }}>Curriculum Vitae</span>
            </div>
            <CVPrintButton />
          </div>

          <div className="flex items-end gap-8">
            <div>
              <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-2" style={{ color: "var(--text)" }}>
                Evrard
              </h1>
              <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6" style={{ color: "var(--accent)" }}>
                André
              </h1>
              <p className="text-sm font-light" style={{ color: "var(--text-muted)" }}>{hero.title}</p>
            </div>

            {/* Photo de profil ronde */}
            <div className="shrink-0 ml-auto print-profile">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden"
                style={{ border: "2px solid var(--accent-border)", boxShadow: "0 0 0 4px var(--accent-glow)" }}>
                <img
                  src="/gallery/profile.jpg"
                  alt="Evrard André"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-16">
            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] mb-8 flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                <span className="w-4 h-px" style={{ backgroundColor: "var(--accent)" }} /> Formation
              </h2>
              <div className="space-y-8">
                {cv.formations.map((f: { annee: string; titre: string; etablissement: string; description: string }, i: number) => (
                  <div key={i} className="pl-5 transition-colors" style={{ borderLeft: "1px solid var(--border)" }}>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: "var(--accent)" }}>{f.annee}</p>
                    <h3 className="font-display font-bold text-base mb-0.5" style={{ color: "var(--text)" }}>{f.titre}</h3>
                    <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{f.etablissement}</p>
                    <p className="font-light text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] mb-8 flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                <span className="w-4 h-px" style={{ backgroundColor: "var(--accent)" }} /> Expériences
              </h2>
              <div className="space-y-8">
                {cv.experiences.map((e: { annee: string; titre: string; role: string; description: string }, i: number) => (
                  <div key={i} className="pl-5 transition-colors" style={{ borderLeft: "1px solid var(--border)" }}>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: "var(--accent)" }}>{e.annee}</p>
                    <h3 className="font-display font-bold text-base mb-0.5" style={{ color: "var(--text)" }}>{e.titre}</h3>
                    <p className="text-xs mb-2 italic" style={{ color: "var(--text-muted)" }}>{e.role}</p>
                    <p className="font-light text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{e.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] mb-5 flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                <span className="w-4 h-px" style={{ backgroundColor: "var(--accent)" }} /> Compétences
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {cv.competences.map((c: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[11px] font-light" style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] mb-5 flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                <span className="w-4 h-px" style={{ backgroundColor: "var(--accent)" }} /> Intérêts
              </h2>
              <ul className="space-y-2">
                {cv.interets.map((int: string, i: number) => (
                  <li key={i} className="font-light text-xs flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                    {int}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>Contact</h2>
              <a href={`mailto:${about.email}`} className="block text-xs transition-colors" style={{ color: "var(--text-muted)" }}>
                {about.email}
              </a>
              {about.phone && (
                <a href={`tel:${about.phone.replace(/\s/g, "")}`} className="block text-xs transition-colors" style={{ color: "var(--text-muted)" }}>
                  {about.phone}
                </a>
              )}
              <p className="text-xs" style={{ color: "var(--text-faint)" }}>{about.location}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
