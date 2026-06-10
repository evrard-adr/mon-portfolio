import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";
import HeroBlob from "@/components/HeroBlob";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();
  const { hero, about, socials, gallery } = content;

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)", opacity: 3 }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)" }} />

        <div className="max-w-5xl w-full relative">
          <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full" style={{ border: "1px solid var(--accent-border)", backgroundColor: "var(--accent-glow)" }}
            data-reveal="fade">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--accent)" }}>Portfolio 2025</span>
          </div>

          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight mb-0" data-reveal data-delay="1">
            <span className="block text-7xl md:text-8xl lg:text-9xl" style={{ color: "var(--text)" }}>Evrard</span>
            <span className="block text-7xl md:text-8xl lg:text-9xl" style={{ color: "var(--accent)" }}>André</span>
          </h1>

          <HeroBlob />

          <div className="flex flex-col sm:flex-row sm:items-center gap-6" data-reveal data-delay="2">
            <div className="pl-5 max-w-xs" style={{ borderLeft: "2px solid var(--accent-border)" }}>
              <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{hero.subtitle}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-2 font-medium" style={{ color: "var(--accent)" }}>{hero.title}</p>
            </div>
            <Link href="/cv" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all" style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>
              Voir le CV →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 right-12 font-display font-extrabold text-[100px] leading-none select-none pointer-events-none" style={{ color: "var(--text-faint)" }}>
          01
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="py-3 overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="flex" style={{ animation: "ticker 30s linear infinite", width: "max-content" }}>
          {Array(2).fill(null).map((_, i) => (
            <p key={i} className="whitespace-nowrap font-display font-bold text-[11px] uppercase tracking-[0.25em] px-4" style={{ color: "var(--text-faint)" }}>
              Droit &nbsp;·&nbsp; Mobilité Urbaine &nbsp;·&nbsp; Lyon &nbsp;·&nbsp; Communication &nbsp;·&nbsp; Violoncelle &nbsp;·&nbsp; Transports 2050 &nbsp;·&nbsp; Parlement des Étudiants &nbsp;·&nbsp; Piano &nbsp;·&nbsp;
            </p>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-8 md:px-12 py-28">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>01 — À propos</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div data-reveal>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mb-8" style={{ color: "var(--text)" }}>
                Étudiant.<br />
                <span style={{ color: "var(--accent)" }}>Engagé.</span><br />
                <span style={{ color: "var(--text-muted)" }}>Curieux.</span>
              </h2>
              <p className="font-light text-sm leading-loose" style={{ color: "var(--text-muted)" }}>{about.text}</p>
            </div>

            <div className="space-y-2" data-reveal data-delay="2">
              {[
                { label: "Formation", value: "Licence de Droit", sub: "Université Jean Moulin Lyon 3" },
                { label: "Localisation", value: "Lyon, France", sub: null },
                { label: "Rôle national", value: "Resp. Communication", sub: "Parlement des Étudiants — 25 sections" },
                { label: "Rôle local", value: "Resp. Communication", sub: "Parlement des Étudiants de Lyon" },
                { label: "Passions", value: "Mobilité & transports 2050", sub: "Violoncelle · Piano" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-3.5 rounded-xl transition-colors" style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}>
                  <span className="text-[9px] uppercase tracking-widest font-medium pt-0.5 w-20 shrink-0" style={{ color: "var(--accent)" }}>{item.label}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.value}</p>
                    {item.sub && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.sub}</p>}
                  </div>
                </div>
              ))}
              <a href={`mailto:${about.email}`} className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-all group" style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)" }}>
                <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Email</span>
                <span className="text-xs transition-colors" style={{ color: "var(--text-muted)" }}>{about.email} →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="px-8 md:px-12 py-20" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-12" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>Engagements</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "⚖️", titre: "Droit", desc: "Licence à l'Université Jean Moulin Lyon 3 — passion pour le droit constitutionnel et public.", delay: "1" },
              { icon: "🚇", titre: "Mobilité 2050", desc: "Passionné par l'avenir des transports en commun et les enjeux de déplacement à horizon 2075.", delay: "2" },
              { icon: "🎻", titre: "Musique", desc: "Violoncelliste et pianiste — la musique comme discipline et expression personnelle.", delay: "3" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl transition-all group" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg)" }}
                data-reveal data-delay={item.delay}>
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="font-display font-bold text-base mb-2" style={{ color: "var(--text)" }}>{item.titre}</h3>
                <p className="text-xs leading-relaxed font-light" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="px-8 md:px-12 py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>02 — Galerie</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((item: { url: string; caption: string; source: string }, i: number) => (
              <div key={i} className="gallery-item aspect-square" data-reveal="scale" data-delay={String((i % 5) + 1)}>
                {item.url ? (
                  <>
                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                    <div className="overlay">
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-xs font-medium">{item.caption}</p>
                        <p className="text-white/60 text-[10px] uppercase tracking-widest mt-0.5">{item.source}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Photo</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-8" data-reveal="fade">
            <a href="https://instagram.com/evrard_adr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors gallery-ext-link">
              Instagram ↗
            </a>
            <span style={{ color: "var(--border)" }}>·</span>
            <a href="https://vsco.co/evrardadr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors gallery-ext-link">
              VSCO ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIALS ── */}
      <section id="socials" className="px-8 md:px-12 py-28" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>03 — Réseaux</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <div className="shrink-0" data-reveal>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: "var(--text)" }}>
                Me<br />retrouver
              </h2>
              <p className="text-xs mt-4 max-w-[160px] font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>Suivez mon actualité sur les réseaux</p>
            </div>
            <div className="flex-1 grid sm:grid-cols-2 gap-2 w-full max-w-lg" data-reveal data-delay="2">
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={s.handle} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-12 py-10 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Evrard André</span>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
