import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();
  const { hero, about, socials } = content;

  return (
    <main className="min-h-screen bg-[#070b08] font-body text-[#eef2ee]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 bg-[#070b08]/90 backdrop-blur-sm border-b border-white/5">
        <span className="font-display font-extrabold text-sm text-white tracking-tight">
          Evrard<span className="text-[#4ade80]">.</span>
        </span>
        <div className="flex items-center gap-7 text-[11px] font-medium text-white/30 uppercase tracking-[0.12em]">
          <a href="#about" className="hover:text-white transition-colors">À propos</a>
          <a href="#socials" className="hover:text-white transition-colors">Réseaux</a>
          <Link href="/cv" className="hover:text-white transition-colors">CV</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-20 overflow-hidden">

        {/* Glows verts */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4ade80]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22c55e]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4ade80]/3 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-5xl w-full relative">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-[#4ade80] text-[10px] uppercase tracking-[0.25em] font-medium">Portfolio 2025</span>
          </div>

          {/* Nom */}
          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight mb-10">
            <span className="block text-7xl md:text-8xl lg:text-9xl text-white">Evrard</span>
            <span className="block text-7xl md:text-8xl lg:text-9xl text-[#4ade80]">André</span>
          </h1>

          {/* Sous-titre + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-4">
            <div className="border-l-2 border-[#4ade80]/30 pl-5 max-w-xs">
              <p className="text-white/50 text-sm font-light leading-relaxed">{hero.subtitle}</p>
              <p className="text-[#4ade80] text-[10px] uppercase tracking-[0.2em] mt-2 font-medium">{hero.title}</p>
            </div>
            <Link
              href="/cv"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/25 text-[#4ade80] text-xs uppercase tracking-widest hover:bg-[#4ade80]/20 transition-all"
            >
              Voir le CV →
            </Link>
          </div>
        </div>

        {/* Numéro déco */}
        <div className="absolute bottom-10 right-12 text-white/4 font-display font-extrabold text-[100px] leading-none select-none pointer-events-none">
          01
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-[#1a2a1e] py-3 bg-[#0d1410] overflow-hidden">
        <p className="whitespace-nowrap text-[#4ade80]/20 font-display font-bold text-[11px] uppercase tracking-[0.25em]">
          {Array(8).fill("Droit  ·  Mobilité Urbaine  ·  Lyon  ·  Communication  ·  Violoncelle  ·  Transports 2050  · ").join("")}
        </p>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-8 md:px-12 py-28">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14">
            <span className="text-[#4ade80] text-[10px] uppercase tracking-[0.3em] font-medium">01 — À propos</span>
            <span className="flex-1 h-px bg-[#1a2a1e] max-w-xs" />
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-8">
                Étudiant.<br />
                <span className="text-[#4ade80]">Engagé.</span><br />
                <span className="text-white/20">Curieux.</span>
              </h2>
              <p className="text-white/40 font-light text-sm leading-loose">{about.text}</p>
            </div>

            <div className="space-y-2">
              {[
                { label: "Formation", value: "Licence de Droit", sub: "Université Jean Moulin Lyon 3" },
                { label: "Localisation", value: "Lyon, France", sub: null },
                { label: "Rôle national", value: "Resp. Communication", sub: "Parlement des Étudiants — 25 sections" },
                { label: "Rôle local", value: "Resp. Communication", sub: "Parlement des Étudiants de Lyon" },
                { label: "Passions", value: "Mobilité & transports 2050", sub: "Violoncelle · Piano" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-3.5 rounded-xl bg-[#0d1410] border border-[#1a2a1e] hover:border-[#4ade80]/30 transition-colors">
                  <span className="text-[#4ade80] text-[9px] uppercase tracking-widest font-medium pt-0.5 w-20 shrink-0">{item.label}</span>
                  <div>
                    <p className="text-white/80 text-sm font-medium">{item.value}</p>
                    {item.sub && <p className="text-white/25 text-xs mt-0.5">{item.sub}</p>}
                  </div>
                </div>
              ))}
              <a
                href={`mailto:${about.email}`}
                className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#4ade80]/8 border border-[#4ade80]/20 hover:bg-[#4ade80]/15 transition-colors group"
              >
                <span className="text-[#4ade80] text-[9px] uppercase tracking-widest font-medium">Email</span>
                <span className="text-white/40 text-xs group-hover:text-white/70 transition-colors">{about.email} →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="px-8 md:px-12 py-20 border-t border-[#1a2a1e] bg-[#0d1410]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-[#4ade80] text-[10px] uppercase tracking-[0.3em] font-medium">Engagements</span>
            <span className="flex-1 h-px bg-[#1a2a1e] max-w-xs" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "⚖️", titre: "Droit", desc: "Licence à l'Université Jean Moulin Lyon 3 — passion pour le droit constitutionnel et public." },
              { icon: "🚇", titre: "Mobilité 2050", desc: "Passionné par l'avenir des transports en commun et les enjeux de déplacement à horizon 2075." },
              { icon: "🎻", titre: "Musique", desc: "Violoncelliste et pianiste — la musique comme discipline et expression personnelle." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[#1a2a1e] bg-[#070b08] hover:border-[#4ade80]/30 hover:bg-[#0d1410] transition-all group">
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-[#4ade80] transition-colors">{item.titre}</h3>
                <p className="text-white/30 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section id="socials" className="px-8 md:px-12 py-28 border-t border-[#1a2a1e]">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14">
            <span className="text-[#4ade80] text-[10px] uppercase tracking-[0.3em] font-medium">02 — Réseaux</span>
            <span className="flex-1 h-px bg-[#1a2a1e] max-w-xs" />
          </div>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <div className="shrink-0">
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
                Me<br />retrouver
              </h2>
              <p className="text-white/25 text-xs mt-4 max-w-[160px] font-light leading-relaxed">Suivez mon actualité sur les réseaux</p>
            </div>
            <div className="flex-1 grid sm:grid-cols-2 gap-2 w-full max-w-lg">
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={s.name} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-12 py-10 border-t border-[#1a2a1e] flex items-center justify-between">
        <span className="font-display font-bold text-xs text-white/10 uppercase tracking-widest">Evrard André</span>
        <span className="text-white/10 text-xs">© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
