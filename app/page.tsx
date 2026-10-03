import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";
import HeroStage from "@/components/HeroStage";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedCounter from "@/components/AnimatedCounter";
import Marquee from "@/components/Marquee";
import ScrubText from "@/components/ScrubText";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PASTELS = ["var(--pink)", "var(--sky)", "var(--peach)"];

function Label({ letter, color, text }: { letter: string; color: string; text: string }) {
  return (
    <div className="mb-10 flex items-center gap-4" data-reveal="fade" style={{ ["--c" as string]: color }}>
      <span className="badge-line text-base">{letter}</span>
      <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text)" }}>{text}</span>
      <span className="stationline" />
    </div>
  );
}

const H2 = "font-display leading-[1] text-[clamp(2.4rem,7.2vw,6.4rem)]";

export default function Home() {
  const content = getContent();
  const { about, socials, gallery, engagements, stats, projets } = content as any;
  const tickerWords: string[] = (content.ticker as string).split(/\s*·\s*/).filter(Boolean);

  return (
    <main className="relative min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />
      <ScrollProgress />

      {/* ── HERO ── */}
      <HeroStage />

      {/* ── TICKER ── */}
      <div className="relative z-10 py-5" style={{ background: "var(--navy)", color: "#f5f1e8" }}>
        <Marquee duration={70}>
          {tickerWords.map((w, i) => (
            <span key={i} className="font-display flex items-center whitespace-nowrap text-3xl italic md:text-5xl">
              {w}
              <span className="mx-6 flex items-center gap-1 md:mx-9" aria-hidden="true"><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-a)" }} /><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-b)" }} /><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-c)" }} /><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-d)" }} /></span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-6 py-32 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Label letter="A" color="var(--l-a)" text="À propos" />
          <ScrubText
            className={`${H2} mb-14`}
            parts={[
              { t: "Le droit pour comprendre," },
              { t: "la chose publique", hl: true },
              { t: "pour agir. À Lyon." },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]" data-reveal>
            <p className="max-w-lg text-lg font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>{about.teaser}</p>
            <div className="flex flex-wrap items-start gap-4 md:justify-end">
              <Magnetic><Link href="/about" className="btn-pill">En savoir plus →</Link></Magnetic>
              <Magnetic><a href={`mailto:${about.email}`} className="btn-pill btn-ghost">{about.email}</a></Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="px-6 py-28 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="B" color="var(--l-b)" text="Ce qui m'occupe" />
          <div className="grid gap-8 md:grid-cols-3">
            {engagements.map((item: { icon: string; titre: string; desc: string }, i: number) => (
              <div
                key={i}
                className="card-brut flex flex-col gap-5 p-8"
                style={{ background: PASTELS[i % 3], color: "#0b1b4d", rotate: `${[-1.2, 0.8, -0.6][i % 3]}deg` }}
                data-reveal
                data-delay={String(i + 1)}
              >
                <span className="font-display text-7xl leading-none">0{i + 1}</span>
                <h3 className="font-display text-3xl leading-tight">{item.titre}</h3>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(11,27,77,0.75)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section id="projets" className="px-6 py-32 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Label letter="C" color="var(--l-c)" text="Projets" />
          <div style={{ borderTop: "2px solid var(--ink)" }}>
            {projets.map((p: { titre: string; desc: string; date: string; tag: string; lien: string }, i: number) => {
              const inner = (
                <div className="row-link grid items-baseline gap-3 py-9 md:grid-cols-[90px_1.2fr_1fr_210px] md:gap-8" style={{ borderBottom: "2px solid var(--ink)" }}>
                  <span className="font-display text-lg" style={{ color: "var(--text-muted)" }}>{p.date}</span>
                  <h3 className="font-display text-2xl leading-tight md:text-4xl" style={{ color: "var(--text)" }}>{p.titre}</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                  <div className="flex items-center gap-4 md:justify-end">
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ border: "2px solid currentColor" }}>{p.tag}</span>
                    {p.lien && <span className="row-arrow text-2xl">↗</span>}
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
      <section
        className="px-6 py-24 md:px-14 lg:px-20"
        style={{ background: "var(--navy)", color: "#f5f1e8", ["--accent" as string]: "#ffd6a5", ["--text-muted" as string]: "rgba(245,241,232,0.7)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((s: { value: number; suffix: string; label: string }, i: number) => (
              <AnimatedCounter key={i} target={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="overflow-hidden py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <Label letter="D" color="var(--l-d)" text="Galerie" />
        </div>
        <div className="py-6">
          <Marquee duration={90} slowOnHover>
            {gallery.map((item: { url: string; caption: string; source: string }, i: number) => (
              <div key={i} className="gallery-item mr-6" style={{ width: "280px", height: "380px", flexShrink: 0 }}>
                {item.url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.caption} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: i % 2 === 0 ? "top" : "center" }} />
                    <div className="overlay">
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="font-display text-lg text-white">{item.caption}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-white/70">{item.source}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: "var(--bg2)" }}>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Photo</span>
                  </div>
                )}
              </div>
            ))}
          </Marquee>
        </div>
        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <div className="mt-10 flex items-center gap-3" data-reveal="fade">
            <a href="https://instagram.com/evrardadr" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost" style={{ padding: ".5rem 1.1rem", fontSize: ".75rem" }}>Instagram ↗</a>
            <a href="https://vsco.co/evrardadr" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost" style={{ padding: ".5rem 1.1rem", fontSize: ".75rem" }}>VSCO ↗</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT / RÉSEAUX ── */}
      <section id="socials" className="px-6 py-32 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="A" color="var(--l-a)" text="Réseaux" />
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display leading-[0.95] text-[clamp(2.3rem,6vw,5.4rem)]" data-mask>
              <span className="mask-line"><span>Une idée,</span></span>
              <span className="mask-line"><span>un projet ?</span></span>
              <span className="mask-line"><em className="hl-mark whitespace-nowrap" style={{ color: "var(--accent)" }}>Parlons-en.</em></span>
            </h2>
            <div className="grid gap-3" data-reveal>
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={`${s.name}-${s.handle}`} {...s} />
              ))}
            </div>
          </div>
          <div className="mt-14">
            <Magnetic><Link href="/contact" className="btn-pill">Me contacter →</Link></Magnetic>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="overflow-hidden px-6 pb-8 pt-16 md:px-14 lg:px-20" style={{ background: "var(--navy)", color: "#f5f1e8" }}>
        <p className="font-display select-none whitespace-nowrap text-center italic leading-none text-[clamp(2.6rem,11vw,10.5rem)]" style={{ color: "var(--pink)" }} aria-hidden="true">Evrard André</p>
        <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between text-xs" style={{ color: "rgba(245,241,232,0.7)" }}>
          <span className="font-display text-base" style={{ color: "#f5f1e8" }}>Evrard André</span>
          <span>Lyon · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
