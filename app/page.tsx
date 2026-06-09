import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();
  const { hero, about, socials } = content;

  return (
    <main className="min-h-screen bg-[#080808] font-body">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 bg-[#080808]/85 backdrop-blur-sm border-b border-white/5">
        <span className="font-display font-bold text-sm text-white tracking-tight">
          Evrard<span className="text-[#c9a96e]">.</span>
        </span>
        <div className="flex items-center gap-7 text-[11px] font-medium text-white/30 uppercase tracking-[0.12em]">
          <a href="#about" className="hover:text-white/80 transition-colors">À propos</a>
          <a href="#socials" className="hover:text-white/80 transition-colors">Réseaux</a>
          <Link href="/cv" className="hover:text-white/80 transition-colors">CV</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-20 overflow-hidden">

        {/* Glow subtil */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a96e]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#c9a96e]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl w-full">

          {/* Label haut */}
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-5 h-px bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-[10px] uppercase tracking-[0.3em] font-medium">Portfolio — 2025</span>
          </div>

          {/* Nom principal */}
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-7xl md:text-8xl lg:text-9xl text-white leading-[0.92] tracking-tight">
              Evrard
            </h1>
            <h1 className="font-display font-extrabold text-7xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight"
              style={{ WebkitTextStroke: "1.5px #c9a96e", color: "transparent" }}>
              André
            </h1>
          </div>

          {/* Ligne séparateur + description */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 mt-12">
            <div className="w-full h-px bg-white/6 md:hidden" />
            <div className="md:border-l md:border-white/10 md:pl-8 max-w-sm">
              <p className="text-white/40 text-sm font-light leading-relaxed">
                {hero.subtitle}
              </p>
              <p className="text-[#c9a96e] text-[11px] uppercase tracking-[0.2em] mt-3 font-medium">
                {hero.title}
              </p>
            </div>
            <div className="hidden md:block flex-1 h-px bg-white/6" />
            <Link
              href="/cv"
              className="shrink-0 inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full text-white/60 text-xs uppercase tracking-widest hover:border-[#c9a96e]/50 hover:text-white transition-all"
            >
              Voir le CV <span className="text-[#c9a96e]">→</span>
            </Link>
          </div>
        </div>

        {/* Index bas droit */}
        <div className="absolute bottom-10 right-12 text-white/15 font-display font-extrabold text-[80px] leading-none select-none pointer-events-none">
          01
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y border-white/5 py-3.5 bg-[#0a0a0a] overflow-hidden">
        <p className="whitespace-nowrap text-white/10 font-display font-bold text-xs uppercase tracking-[0.2em]">
          {Array(8).fill("Droit  ·  Mobilité  ·  Lyon  ·  Communication  ·  Musique  · ").join("")}
        </p>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-8 md:px-12 py-28">
        <div className="max-w-5xl">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-14">
            <span className="text-[#c9a96e] text-[10px] uppercase tracking-[0.3em] font-medium">01 — À propos</span>
            <span className="flex-1 h-px bg-white/5 max-w-xs" />
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Texte */}
            <div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-8">
                Étudiant.<br />
                <span className="text-white/30">Engagé.</span><br />
                <span className="text-white/15">Curieux.</span>
              </h2>
              <p className="text-white/40 font-light text-sm leading-loose">
                {about.text}
              </p>
            </div>

            {/* Cards */}
            <div className="space-y-2.5">
              {[
                { label: "Formation", value: "Licence de Droit", sub: "Université Jean Moulin Lyon 3" },
                { label: "Localisation", value: about.location, sub: null },
                { label: "Rôle principal", value: "Resp. Communication", sub: "Parlement des Étudiants — France (25 sections)" },
                { label: "Passions", value: "Mobilité & transports 2050", sub: "Violoncelle · Piano" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-[#c9a96e] text-[9px] uppercase tracking-widest font-medium pt-0.5 w-20 shrink-0">{item.label}</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">{item.value}</p>
                    {item.sub && <p className="text-white/25 text-xs mt-0.5">{item.sub}</p>}
                  </div>
                </div>
              ))}
              <a
                href={`mailto:${about.email}`}
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-[#c9a96e]/8 border border-[#c9a96e]/15 hover:bg-[#c9a96e]/12 transition-colors group"
              >
                <span className="text-[#c9a96e] text-[9px] uppercase tracking-widest font-medium">Email</span>
                <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors">{about.email} →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section id="socials" className="px-8 md:px-12 py-28 border-t border-white/5">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14">
            <span className="text-[#c9a96e] text-[10px] uppercase tracking-[0.3em] font-medium">02 — Réseaux</span>
            <span className="flex-1 h-px bg-white/5 max-w-xs" />
          </div>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight shrink-0">
              Me<br />retrouver
            </h2>
            <div className="flex-1 grid sm:grid-cols-2 gap-2 w-full max-w-lg">
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={s.name} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-12 py-10 border-t border-white/5 flex items-center justify-between">
        <span className="font-display font-bold text-xs text-white/15 uppercase tracking-widest">Evrard André</span>
        <span className="text-white/10 text-xs">© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
