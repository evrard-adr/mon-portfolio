import { getContent } from "@/lib/content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CVPage() {
  const content = getContent();
  const { hero, cv, about } = content;

  return (
    <main className="min-h-screen bg-[#070b08] font-body text-[#eef2ee]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 bg-[#070b08]/90 backdrop-blur-sm border-b border-[#1a2a1e]">
        <Link href="/" className="font-display font-extrabold text-sm text-white hover:text-[#4ade80] transition-colors">
          Evrard<span className="text-[#4ade80]">.</span>
        </Link>
        <Link href="/" className="text-[11px] font-medium text-white/30 uppercase tracking-[0.12em] hover:text-white transition-colors">
          ← Retour
        </Link>
      </nav>

      <div className="px-8 md:px-12 pt-36 pb-32 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-20 pb-16 border-b border-[#1a2a1e]">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5">
            <span className="text-[#4ade80] text-[10px] uppercase tracking-[0.25em] font-medium">Curriculum Vitae</span>
          </div>
          <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-2">
            Evrard
          </h1>
          <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl text-[#4ade80] leading-none tracking-tight mb-6">
            André
          </h1>
          <p className="text-white/30 text-sm font-light">{hero.title}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {/* Main */}
          <div className="md:col-span-2 space-y-16">
            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-8 flex items-center gap-3">
                <span className="w-4 h-px bg-[#4ade80]" /> Formation
              </h2>
              <div className="space-y-8">
                {cv.formations.map((f: { annee: string; titre: string; etablissement: string; description: string }, i: number) => (
                  <div key={i} className="pl-5 border-l border-[#1a2a1e] hover:border-[#4ade80]/40 transition-colors">
                    <p className="text-[#4ade80] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{f.annee}</p>
                    <h3 className="font-display font-bold text-base text-white mb-0.5">{f.titre}</h3>
                    <p className="text-white/30 text-xs mb-2">{f.etablissement}</p>
                    <p className="text-white/25 font-light text-xs leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-8 flex items-center gap-3">
                <span className="w-4 h-px bg-[#4ade80]" /> Expériences
              </h2>
              <div className="space-y-8">
                {cv.experiences.map((e: { annee: string; titre: string; role: string; description: string }, i: number) => (
                  <div key={i} className="pl-5 border-l border-[#1a2a1e] hover:border-[#4ade80]/40 transition-colors">
                    <p className="text-[#4ade80] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{e.annee}</p>
                    <h3 className="font-display font-bold text-base text-white mb-0.5">{e.titre}</h3>
                    <p className="text-white/30 text-xs mb-2 italic">{e.role}</p>
                    <p className="text-white/25 font-light text-xs leading-relaxed">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-5 flex items-center gap-3">
                <span className="w-4 h-px bg-[#4ade80]" /> Compétences
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {cv.competences.map((c: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[11px] text-white/50 font-light bg-[#0d1410] border border-[#1a2a1e]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/30 mb-5 flex items-center gap-3">
                <span className="w-4 h-px bg-[#4ade80]" /> Intérêts
              </h2>
              <ul className="space-y-2">
                {cv.interets.map((int: string, i: number) => (
                  <li key={i} className="text-white/30 font-light text-xs flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#4ade80]/60 shrink-0" />
                    {int}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#0d1410] border border-[#1a2a1e] p-5 space-y-3">
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/30">Contact</h2>
              <a href={`mailto:${about.email}`} className="block text-white/40 text-xs hover:text-[#4ade80] transition-colors">
                {about.email}
              </a>
              <p className="text-white/20 text-xs">{about.location}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
