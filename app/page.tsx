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
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const PASTELS = ["var(--pink)", "var(--sky)", "var(--peach)", "#bfeccf"];

function Label({ letter, color, text }: { letter: string; color: string; text: string }) {
  return (
    <div className="mb-10 flex items-center gap-4" data-reveal="fade" style={{ ["--c" as string]: color }}>
      <span className="badge-line text-base">{letter}</span>
      <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text)" }}>{text}</span>
      <span className="stationline" />
    </div>
  );
}

const H2 = "font-display leading-[0.95] text-[clamp(2.6rem,8.4vw,7.4rem)]";

export default function Home() {
  const content = getContent();
  const { about, socials, gallery, engagements, stats, projets, creations, creationsLien } = content as any;
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
            <span key={i} className="font-display flex items-center whitespace-nowrap text-4xl md:text-6xl">
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
              { t: "Le droit public pour comprendre," },
              { t: "la communication", hl: true },
              { t: "pour convaincre, les transports en commun pour avancer." },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]" data-reveal>
            <p className="max-w-lg text-lg font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>{about.teaser}</p>
            <div className="flex flex-wrap items-start gap-4 md:justify-end">
              <Magnetic><a href={`mailto:${about.email}`} className="btn-pill">✉ Me contacter par mail →</a></Magnetic>
              <Magnetic><Link href="/about" className="btn-pill btn-ghost">En savoir plus</Link></Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="px-6 py-28 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="B" color="var(--l-b)" text="Ce que j'apporte" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {engagements.map((item: { icon: string; titre: string; desc: string }, i: number) => (
              <div
                key={i}
                className="card-brut flex flex-col gap-5 p-8"
                style={{ background: PASTELS[i % 4], color: "#0b1b4d", rotate: `${[-1.2, 0.8, -0.6, 1][i % 4]}deg` }}
                data-reveal
                data-delay={String(i + 1)}
              >
                <span className="font-display text-7xl leading-none">0{i + 1}</span>
                <h3 className="font-display text-2xl leading-tight">{item.titre}</h3>
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

      {/* ── CRÉATIONS ── */}
      <section id="creations" className="px-6 py-28 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="D" color="var(--l-d)" text="Mes créations" />
          <h2 className={`${H2} mb-6`} data-mask>
            <span className="mask-line"><span>Des posts qui</span></span>
            <span className="mask-line"><span><span className="hl-mark">donnent envie.</span></span></span>
          </h2>
          <p className="mb-14 max-w-xl text-lg font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Affiches, infographies et posts que je conçois pour le Parlement des Étudiants de Lyon : identité visuelle, animation des réseaux, mobilisation autour des événements.
          </p>
          <div className="grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
            {creations.map((c: { img: string; titre: string; desc: string }, i: number) => (
              <figure key={i} className="card-brut group overflow-hidden" style={{ rotate: `${[-1.5, 1, -0.8, 1.4][i % 4]}deg` }} data-reveal data-delay={String((i % 4) + 1)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={`${c.titre} — ${c.desc}`} loading="lazy" className="block aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption className="p-4" style={{ background: "var(--card)", borderTop: "2px solid var(--ink)" }}>
                  <p className="font-display text-base leading-tight md:text-lg">{c.titre}</p>
                  <p className="mt-1 text-xs font-medium leading-snug" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
                </figcaption>
              </figure>
            ))}
            <a href={creationsLien.url} target="_blank" rel="noopener noreferrer" className="card-brut flex aspect-[4/5] flex-col justify-between p-5 md:p-6 lg:aspect-auto" style={{ background: "var(--peach)", color: "#0b1b4d", rotate: "1deg" }}>
              <span className="font-display text-2xl leading-tight md:text-3xl">Tous les posts sur {creationsLien.label}</span>
              <span className="text-4xl">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="px-6 py-24 md:px-14 lg:px-20"
        style={{ background: "var(--navy)", color: "#f5f1e8", ["--accent" as string]: "#ffd6a5", ["--text-muted" as string]: "rgba(245,241,232,0.7)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4 md:gap-6">
            {stats.map((s: { value: number; suffix: string; label: string }, i: number) => (
              <AnimatedCounter key={i} target={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="overflow-hidden py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <Label letter="E" color="var(--l-b)" text="Galerie" />
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
            
          </div>
        </div>
      </section>

      {/* ── CONTACT / RÉSEAUX ── */}
      <section id="socials" className="px-6 py-32 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="A" color="var(--l-a)" text="Réseaux" />
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display leading-[0.95] text-[clamp(2.3rem,6vw,5.4rem)]" data-mask>
              <span className="mask-line"><span>Un collaborateur</span></span>
              <span className="mask-line"><span>pour votre équipe ?</span></span>
              <span className="mask-line"><em className="hl-mark whitespace-nowrap" style={{ color: "var(--accent)" }}>Parlons-en.</em></span>
            </h2>
            <div className="grid gap-3" data-reveal>
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={`${s.name}-${s.handle}`} {...s} />
              ))}
            </div>
          </div>
          <div className="mt-14">
            <Magnetic><a href={`mailto:${about.email}`} className="btn-pill">✉ Me contacter par mail →</a></Magnetic>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
