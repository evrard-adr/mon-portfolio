import { getContent } from "@/lib/content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CVPage() {
  const content = getContent();
  const { hero, cv, about } = content;

  return (
    <main className="min-h-screen bg-[#080808] font-body">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 bg-[#080808]/85 backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="font-display font-bold text-sm text-white hover:text-[#c9a96e] transition-colors">
          Evrard<span className="text-[#c9a96e]">.</span>
        </Link>
        <Link href="/" className="text-[11px] font-medium text-white/30 uppercase tracking-[0.12em] hover:text-white/80 transition-colors">
          ← Retour
        </Link>
      </nav>

      <div className="px-8 md:px-12 pt-36 pb-32 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-20 pb-16 border-b border-white/5">
          <p className="text-[#c9a96e] text-[10px] uppercase tracking-[0.3em] font-medium mb-6">Curriculum Vitae</p>
          <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-4">
            Evrard<br />
            <span className="text-white/20">André</span>
          </h1>
          <p className="text-white/30 text-sm font-light mt-4">{hero.title}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {/* Main */}
          <div className="md:col-span-2 space-y-16">

            {/* Formation */}
            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/40 mb-8 flex items-center gap-3">
                <span className="w-4 h-px bg-[#c9a96e]" /> Formation
              </h2>
              <div className="space-y-8">
                {cv.formations.map((f: { annee: string; titre: string; etablissement: string; description: string }, i: number) => (
                  <div key={i} className="pl-5 border-l border-white/8 hover:border-[#c9a96e]/40 transition-colors">
                    <p className="text-[#c9a96e] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{f.annee}</p>
                    <h3 className="font-display font-bold text-base text-white mb-0.5">{f.titre}</h3>
                    <p className="text-white/30 text-xs mb-2">{f.etablissement}</p>
                    <p className="text-white/25 font-light text-xs leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expériences */}
            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/40 mb-8 flex items-center gap-3">
                <span className="w-4 h-px bg-[#c9a96e]" /> Expériences
              </h2>
              <div className="space-y-8">
                {cv.experiences.map((e: { annee: string; titre: string; role: string; description: string }, i: number) => (
                  <div key={i} className="pl-5 border-l border-white/8 hover:border-[#c9a96e]/40 transition-colors">
                    <p className="text-[#c9a96e] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{e.annee}</p>
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
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5 flex items-center gap-3">
                <span className="w-4 h-px bg-[#c9a96e]" /> Compétences
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {cv.competences.map((c: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-[11px] text-white/50 font-light bg-white/[0.04] border border-white/8">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5 flex items-center gap-3">
                <span className="w-4 h-px bg-[#c9a96e]" /> Intérêts
              </h2>
              <ul className="space-y-2">
                {cv.interets.map((int: string, i: number) => (
                  <li key={i} className="text-white/30 font-light text-xs flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-[#c9a96e]/60 shrink-0" />
                    {int}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5 space-y-3">
              <h2 className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-white/40">Contact</h2>
              <a href={`mailto:${about.email}`} className="block text-white/40 text-xs hover:text-[#c9a96e] transition-colors">
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
