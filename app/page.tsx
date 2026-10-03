import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";
import HeroBlob from "@/components/HeroBlob";
import HeroStage from "@/components/HeroStage";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";

export const dynamic = "force-dynamic";

function Label({ n, text }: { n: string; text: string }) {
  return (
    <div className="mb-12 flex items-center gap-4" data-reveal="fade">
      <span className="font-display text-sm italic" style={{ color: "var(--accent)" }}>{n}</span>
      <span className="h-px w-10" style={{ backgroundColor: "var(--accent-border)" }} />
      <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--text-muted)" }}>{text}</span>
    </div>
  );
}

export default function Home() {
  const content = getContent();
  const { about, socials, gallery, engagements, stats, projets } = content as any;

  return (
    <main className="relative min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />
      <ScrollProgress />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] overflow-hidden"><HeroBlob /></div>

      {/* ── HERO ── */}
      <HeroStage />

      {/* ── TICKER ── */}
      <div className="overflow-hidden py-5" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="flex" style={{ animation: "ticker 60s linear infinite", width: "max-content" }}>
          {[content.ticker, content.ticker].map((t: string, i: number) => (
            <p key={i} className="font-display whitespace-nowrap px-4 text-2xl italic md:text-3xl" style={{ color: "var(--text-muted)" }}>
              {t.split(/\s*·\s*/).filter(Boolean).map((w: string, j: number) => (
                <span key={j}>
                  {w}
                  <span className="mx-5 not-italic" style={{ color: "var(--accent)" }}>✦</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-6 py-28 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Label n="01" text="À propos" />
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]" data-mask>
              <span className="mask-line"><span>Le droit pour comprendre,</span></span>
              <span className="mask-line"><span><em style={{ color: "var(--accent)" }}>la chose publique</em> pour</span></span>
              <span className="mask-line"><span>agir. À Lyon.</span></span>
            </h2>
            <div data-reveal className="lg:pt-4">
              <p className="mb-8 text-base font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{about.teaser}</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="/about" className="group inline-flex items-center gap-2 text-sm" style={{ color: "var(--accent)" }}>
                  En savoir plus <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
                <a href={`mailto:${about.email}`} className="text-sm underline-offset-4 hover:underline" style={{ color: "var(--text-muted)" }}>{about.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="px-6 py-24 md:px-14 lg:px-20" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="mx-auto max-w-6xl">
          <Label n="02" text="Ce qui m'occupe" />
          <div className="grid gap-px overflow-hidden rounded-3xl md:grid-cols-3" style={{ backgroundColor: "var(--border)", border: "1px solid var(--border)" }}>
            {engagements.map((item: { icon: string; titre: string; desc: string }, i: number) => (
              <div key={i} className="group flex flex-col gap-6 p-8 transition-colors duration-500 hover:bg-[var(--accent-glow)]" style={{ backgroundColor: "var(--bg)" }} data-reveal data-delay={String(i + 1)}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl italic" style={{ color: "var(--accent)" }}>0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight" style={{ color: "var(--text)" }}>{item.titre}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section id="projets" className="px-6 py-28 md:px-14 lg:px-20" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl">
          <Label n="03" text="Projets" />
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {projets.map((p: { titre: string; desc: string; date: string; tag: string; lien: string }, i: number) => {
              const inner = (
                <div className="row-link grid items-baseline gap-3 py-8 md:grid-cols-[90px_1.2fr_1fr_200px] md:gap-8" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="font-display text-lg italic" style={{ color: "var(--text-muted)" }}>{p.date}</span>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl" style={{ color: "var(--text)" }}>{p.titre}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                  <div className="flex items-center gap-4 md:justify-end">
                    <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-widest" style={{ border: "1px solid var(--accent-border)", color: "var(--accent)" }}>{p.tag}</span>
                    {p.lien && <span className="row-arrow text-xl" style={{ color: "var(--text-muted)" }}>↗</span>}
                  </div>
                </div>
              );
              return (
                <div key={i} data-reveal data-delay={String(Math.min(i + 1, 5))}>
                  {p.lien ? <a href={p.lien} className="block">{inner}</a> : inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-6 py-20 md:px-14 lg:px-20" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((s: { value: number; suffix: string; label: string }, i: number) => (
              <AnimatedCounter key={i} target={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="overflow-hidden py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <Label n="04" text="Galerie" />
        </div>

        <div className="gallery-strip-wrap" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", overflow: "hidden" }}>
          <div className="gallery-strip" style={{ display: "flex", gap: "16px", width: "max-content" }}>
            {[...gallery, ...gallery].map((item: { url: string; caption: string; source: string }, i: number) => (
              <div key={i} className="gallery-item" style={{ width: "280px", height: "380px", flexShrink: 0 }}>
                {item.url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.caption} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: i % 2 === 0 ? "top" : "center" }} />
                    <div className="overlay">
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="font-display text-base text-white">{item.caption}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">{item.source}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Photo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <div className="mt-10 flex items-center gap-4" data-reveal="fade">
            <a href="https://instagram.com/evrardadr" target="_blank" rel="noopener noreferrer" className="gallery-ext-link text-xs uppercase tracking-widest transition-colors">Instagram ↗</a>
            <span style={{ color: "var(--border)" }}>·</span>
            <a href="https://vsco.co/evrardadr" target="_blank" rel="noopener noreferrer" className="gallery-ext-link text-xs uppercase tracking-widest transition-colors">VSCO ↗</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT / RÉSEAUX ── */}
      <section id="socials" className="px-6 py-28 md:px-14 lg:px-20" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
        <div className="mx-auto max-w-6xl">
          <Label n="05" text="Réseaux" />
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]" data-mask>
              <span className="mask-line"><span>Une idée, un projet,</span></span>
              <span className="mask-line"><span><em style={{ color: "var(--accent)" }}>parlons-en.</em></span></span>
            </h2>
            <div className="grid gap-2" data-reveal>
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={`${s.name}-${s.handle}`} {...s} />
              ))}
            </div>
          </div>
          <Link href="/contact" className="group mt-12 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-widest transition-transform hover:-translate-y-0.5" style={{ background: "var(--accent)", color: "var(--bg)" }}>
            Me contacter <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 pb-10 pt-20 md:px-14 lg:px-20" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="font-display select-none text-center text-[clamp(3.5rem,15vw,12rem)] italic leading-none" style={{ color: "var(--text-faint)" }} aria-hidden="true">Evrard André</p>
        <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between">
          <span className="font-display text-sm" style={{ color: "var(--text-muted)" }}>Evrard André</span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Lyon · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
