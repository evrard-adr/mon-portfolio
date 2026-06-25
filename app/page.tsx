import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";
import HeroBlob from "@/components/HeroBlob";
import AnimatedCounter from "@/components/AnimatedCounter";
import HeroPDFButton from "@/components/HeroPDFButton";
import Typewriter from "@/components/Typewriter";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();
  const { hero, about, socials, gallery, badge, engagements, stats, projets } = content as any;

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 overflow-hidden">

        {/* Fond animé derrière tout */}
        <HeroBlob />

        <div className="max-w-5xl w-full mx-auto relative" style={{ zIndex: 1 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ border: "1px solid var(--accent-border)", backgroundColor: "var(--accent-glow)" }}
            data-reveal="fade">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--accent)" }}>Portfolio 2026</span>
          </div>

          {badge?.visible && (
            <div className="inline-flex items-center gap-2 mb-10 ml-3 px-3 py-1.5 rounded-full" style={{ border: "1px solid var(--accent-border)", backgroundColor: "var(--accent-glow)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--accent)" }}>{badge.text}</span>
            </div>
          )}

          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight mb-6" data-reveal data-delay="1">
            <span className="block text-7xl md:text-8xl lg:text-9xl" style={{ color: "var(--text)" }}>Evrard</span>
            <span className="block text-7xl md:text-8xl lg:text-9xl" style={{ color: "var(--accent)" }}>André</span>
          </h1>

          <div className="mb-10" data-reveal data-delay="2">
            <Typewriter />
          </div>

          <div className="flex items-center gap-3" data-reveal data-delay="3">
            <Link href="/cv" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all" style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>
              Voir le CV →
            </Link>
            <HeroPDFButton />
          </div>
        </div>

      </section>

      {/* ── TICKER ── */}
      <div className="py-3 overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="flex" style={{ animation: "ticker 30s linear infinite", width: "max-content" }}>
          {[content.ticker, content.ticker].map((t: string, i: number) => (
            <p key={i} className="whitespace-nowrap font-display font-bold text-[11px] uppercase tracking-[0.25em] px-4" style={{ color: "var(--text-faint)" }}>
              {t} &nbsp;·&nbsp;
            </p>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-8 md:px-16 lg:px-24 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>01 — À propos</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div data-reveal>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mb-8" style={{ color: "var(--text)" }}>
                Droit.<br />
                <span style={{ color: "var(--accent)" }}>Mobilités.</span><br />
                <span style={{ color: "var(--text-muted)" }}>Lyon.</span>
              </h2>
              <p className="font-light text-sm leading-loose text-justify" style={{ color: "var(--text-muted)" }}>{about.text}</p>
            </div>

            <div className="space-y-2" data-reveal data-delay="2">
              {[
                { label: "Formation", value: "Licence de Droit", sub: "Université Jean Moulin Lyon 3" },
                { label: "Localisation", value: "Lyon, France", sub: null },
                { label: "Rôle national", value: "Resp. Communication", sub: "Parlement des Étudiants · 25 sections" },
                { label: "Rôle local", value: "Resp. Communication", sub: "Parlement des Étudiants de Lyon" },
                { label: "Passions", value: "Mobilités & transports 2050", sub: "Violoncelle · Piano" },
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
              {about.phone && (
                <a href={`tel:${about.phone.replace(/\s/g, "")}`} className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-all" style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}>
                  <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Téléphone</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{about.phone} →</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-20" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>Engagements</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {engagements.map((item: { icon: string; titre: string; desc: string }, i: number) => (
              <div key={i} className="p-6 rounded-2xl transition-all group" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg)" }}
                data-reveal data-delay={String(i + 1)}>
                <span className="text-2xl mb-4 block">{item.icon}</span>
                <h3 className="font-display font-bold text-base mb-2" style={{ color: "var(--text)" }}>{item.titre}</h3>
                <p className="text-xs leading-relaxed font-light" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section id="projets" className="px-8 md:px-16 lg:px-24 py-28" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>02 — Projets</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {projets.map((p: { titre: string; desc: string; date: string; tag: string; lien: string }, i: number) => (
              <div key={i} className="group p-6 rounded-2xl flex flex-col gap-4 transition-all" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg)" }} data-reveal data-delay={String(i + 1)}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ backgroundColor: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>{p.tag}</span>
                  <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>{p.date}</span>
                </div>
                <h3 className="font-display font-bold text-base leading-tight" style={{ color: "var(--text)" }}>{p.titre}</h3>
                <p className="text-xs leading-relaxed font-light flex-1" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                {p.lien && (
                  <a href={p.lien} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--accent)" }}>Voir →</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-20" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((s: { value: number; suffix: string; label: string }, i: number) => (
              <AnimatedCounter key={i} target={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-28" style={{ borderTop: "1px solid var(--border)", overflow: "hidden" }}>
        <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>03 — Galerie</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>
        </div>

        {/* Full-width marquee strip */}
        <div className="gallery-strip-wrap" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", overflow: "hidden" }}>
          <div className="gallery-strip" style={{ display: "flex", gap: "12px", width: "max-content" }}>
            {[...gallery, ...gallery].map((item: { url: string; caption: string; source: string }, i: number) => (
              <div
                key={i}
                className="gallery-item"
                style={{ width: "280px", height: "360px", flexShrink: 0, borderRadius: "16px", overflow: "hidden", position: "relative" }}
              >
                {item.url ? (
                  <>
                    <img
                      src={item.url}
                      alt={item.caption}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: i % 2 === 0 ? "top" : "center" }}
                    />
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
        </div>

        <div className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex items-center gap-4 mt-8" data-reveal="fade">
            <a href="https://instagram.com/evrardadr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors gallery-ext-link">
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
      <section id="socials" className="px-8 md:px-16 lg:px-24 py-28" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>04 — Réseaux</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            <div className="shrink-0" data-reveal>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: "var(--text)" }}>
                Me<br />retrouver
              </h2>
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
      <footer className="px-8 md:px-16 lg:px-24 py-10" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Evrard André</span>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
